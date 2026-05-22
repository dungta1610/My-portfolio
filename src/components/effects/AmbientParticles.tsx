"use client";

import React, { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { EFFECT_CONFIG } from "../../lib/effects/effectConfig";

interface AmbientParticlesProps {
  recruiterMode: boolean;
  activeSection?: string;
  hoveredProjectId?: string | null;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  color: string;
  colorType: "cyan" | "violet" | "emerald" | "amber";
  pulseSpeed: number;
  pulseOffset: number;
}

export const AmbientParticles: React.FC<AmbientParticlesProps> = ({
  recruiterMode,
  activeSection = "hero",
  hoveredProjectId = null,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Refs for animation loop updates without canvas re-creation
  const activeSectionRef = useRef(activeSection);
  const hoveredProjectIdRef = useRef(hoveredProjectId);

  useEffect(() => {
    activeSectionRef.current = activeSection;
  }, [activeSection]);

  useEffect(() => {
    hoveredProjectIdRef.current = hoveredProjectId;
  }, [hoveredProjectId]);

  useEffect(() => {
    if (prefersReducedMotion || recruiterMode) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Load configs
    const cfg = EFFECT_CONFIG.particles;
    const isMobile = window.innerWidth < 768;
    const maxParticles = isMobile ? cfg.mobileCount : cfg.desktopCount;

    const colorMap = {
      cyan: "rgba(6, 182, 212, ",
      violet: "rgba(139, 92, 246, ",
      emerald: "rgba(16, 185, 129, ",
      amber: "rgba(245, 158, 11, ",
    };

    particlesRef.current = [];
    const keys = Object.keys(colorMap) as (keyof typeof colorMap)[];

    for (let i = 0; i < maxParticles; i++) {
      const type = keys[Math.floor(Math.random() * keys.length)];
      particlesRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * cfg.baseSpeed * 1.5,
        vy: -cfg.baseSpeed - Math.random() * cfg.baseSpeed * 2.0, // float upwards
        radius: 0.8 + Math.random() * 1.6,
        alpha: 0.08 + Math.random() * 0.25,
        color: colorMap[type],
        colorType: type,
        pulseSpeed: 0.004 + Math.random() * 0.008,
        pulseOffset: Math.random() * Math.PI * 2,
      });
    }

    let lastSection = activeSectionRef.current;
    let burstStrength = 1.0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const particles = particlesRef.current;

      const currentSection = activeSectionRef.current;
      const hoveredProject = hoveredProjectIdRef.current;

      // Section transition burst trigger
      if (currentSection !== lastSection) {
        burstStrength = 3.5; // Temporarily speed up particles on page scroll section changes
        lastSection = currentSection;
      }

      // Decay the burst strength slowly back to baseline
      burstStrength += (1.0 - burstStrength) * 0.04;

      // Map sections to highlighted color nodes
      let sectionPrimaryColor: "cyan" | "violet" | "emerald" | "amber" = "cyan";
      if (currentSection === "skills") sectionPrimaryColor = "emerald";
      else if (currentSection === "projects") sectionPrimaryColor = "cyan";
      else if (currentSection === "achievements" || currentSection === "blog" || currentSection === "resources") {
        sectionPrimaryColor = "violet";
      } else if (currentSection === "contact") {
        sectionPrimaryColor = "amber";
      }

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Apply burst velocity multiplier
        const currentVx = p.vx * burstStrength;
        const currentVy = p.vy * burstStrength;

        p.x += currentVx;
        p.y += currentVy;

        // Apply a subtle gravity draw to the center region if a project is hovered (focusing energy)
        if (hoveredProject) {
          const dx = canvas.width / 2 - p.x;
          const dy = canvas.height / 2 - p.y;
          const dist = Math.hypot(dx, dy);
          if (dist > 100) {
            p.x += (dx / dist) * 0.15;
            p.y += (dy / dist) * 0.15;
          }
        }

        // Wrap particles around borders
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) {
          p.y = canvas.height;
          p.x = Math.random() * canvas.width;
        }
        if (p.y > canvas.height) p.y = 0;

        // Make particles of the active section's color type glow brighter
        let glowBoost = 1.0;
        if (p.colorType === sectionPrimaryColor) {
          glowBoost = 2.0;
        }
        if (hoveredProject) {
          glowBoost *= 1.4; // Boost all particle glow on interaction
        }

        const currentAlpha = Math.min(
          0.85,
          p.alpha * glowBoost * (0.55 + 0.45 * Math.sin(Date.now() * p.pulseSpeed + p.pulseOffset))
        );

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * (glowBoost > 1.2 ? 1.2 : 1.0), 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${currentAlpha})`;
        ctx.fill();

        // Draw double-ring glow for highlighted section particles
        if (p.colorType === sectionPrimaryColor && currentAlpha > 0.3) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 3.5, 0, Math.PI * 2);
          ctx.fillStyle = `${p.color}${currentAlpha * 0.15})`;
          ctx.fill();
        }
      }

      // Draw vector connector links between nearby particles
      ctx.lineWidth = 0.5;
      const connectDist = cfg.connectDistance;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];

          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.hypot(dx, dy);

          if (dist < connectDist) {
            // Links fade out as distance increases
            let lineAlpha = (1 - dist / connectDist) * 0.05 * burstStrength;

            // Highlight connections if they involve particles of the active section's primary color
            if (p1.colorType === sectionPrimaryColor || p2.colorType === sectionPrimaryColor) {
              lineAlpha *= 1.8;
            }

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);

            // Connect using gradient/mix colors
            if (p1.colorType === "cyan") {
              ctx.strokeStyle = `rgba(6, 182, 212, ${lineAlpha})`;
            } else if (p1.colorType === "violet") {
              ctx.strokeStyle = `rgba(139, 92, 246, ${lineAlpha})`;
            } else if (p1.colorType === "emerald") {
              ctx.strokeStyle = `rgba(16, 185, 129, ${lineAlpha})`;
            } else {
              ctx.strokeStyle = `rgba(245, 158, 11, ${lineAlpha})`;
            }
            ctx.stroke();
          }
        }
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [prefersReducedMotion, recruiterMode]);

  if (prefersReducedMotion || recruiterMode) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none select-none"
      style={{ zIndex: -1 }}
      aria-hidden="true"
    />
  );
};
