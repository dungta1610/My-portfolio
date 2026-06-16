"use client";

import React, { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

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
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Limit particles to localized projector dust cloud
    const maxParticles = 32;

    const colorMap = {
      cyan: "rgba(6, 182, 212, ",
      violet: "rgba(139, 92, 246, ",
      emerald: "rgba(16, 185, 129, ",
      amber: "rgba(245, 158, 11, ",
    };

    particlesRef.current = [];
    const keys = Object.keys(colorMap) as (keyof typeof colorMap)[];

    // Use width and height of canvas (scaled down to layout coordinates)
    const getLayoutDims = () => {
      const rect = canvas.getBoundingClientRect();
      return { w: rect.width || 400, h: rect.height || 480 };
    };

    const dims = getLayoutDims();

    for (let i = 0; i < maxParticles; i++) {
      const type = keys[Math.floor(Math.random() * keys.length)];
      particlesRef.current.push({
        x: Math.random() * dims.w,
        y: Math.random() * dims.h,
        vx: (Math.random() - 0.5) * 0.15, // Extremely slow drift
        vy: -0.05 - Math.random() * 0.1, // Float upwards slowly
        radius: 0.5 + Math.random() * 0.7, // Minimal size: 0.5px to 1.2px
        alpha: 0.05 + Math.random() * 0.10, // Low opacity: 0.05 to 0.15
        color: colorMap[type],
        colorType: type,
        pulseSpeed: 0.003 + Math.random() * 0.006,
        pulseOffset: Math.random() * Math.PI * 2,
      });
    }

    let lastSection = activeSectionRef.current;
    let burstStrength = 1.0;

    const render = () => {
      const { w, h } = getLayoutDims();
      if (w === 0 || h === 0) {
        animationFrameRef.current = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, w, h);
      const particles = particlesRef.current;

      const currentSection = activeSectionRef.current;
      const hoveredProject = hoveredProjectIdRef.current;

      // Section transition burst trigger
      if (currentSection !== lastSection) {
        burstStrength = 2.5; // Faint burst on section scroll
        lastSection = currentSection;
      }

      // Decay the burst strength slowly back to baseline
      burstStrength += (1.0 - burstStrength) * 0.04;

      let sectionPrimaryColor: "cyan" | "violet" | "emerald" | "amber" = "cyan";
      if (currentSection === "skills") {
        sectionPrimaryColor = "emerald";
      } else if (currentSection === "projects") {
        sectionPrimaryColor = "cyan";
      } else if (currentSection === "achievements") {
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
          const dx = w / 2 - p.x;
          const dy = h / 2 - p.y;
          const dist = Math.hypot(dx, dy);
          if (dist > 60) {
            p.x += (dx / dist) * 0.1;
            p.y += (dy / dist) * 0.1;
          }
        }

        // Wrap particles around borders of local canvas
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) {
          p.y = h;
          p.x = Math.random() * w;
        }
        if (p.y > h) p.y = 0;

        // Make particles of the active section's color type glow brighter
        let glowBoost = 1.0;
        if (p.colorType === sectionPrimaryColor) {
          glowBoost = 1.5;
        }
        if (hoveredProject) {
          glowBoost *= 1.2;
        }

        const currentAlpha = Math.min(
          0.6,
          p.alpha * glowBoost * (0.6 + 0.4 * Math.sin(Date.now() * p.pulseSpeed + p.pulseOffset))
        );

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${currentAlpha})`;
        ctx.fill();
      }

      // Draw vector connector links between nearby dust nodes (very faint/short)
      ctx.lineWidth = 0.4;
      const connectDist = 35;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];

          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.hypot(dx, dy);

          if (dist < connectDist) {
            let lineAlpha = (1 - dist / connectDist) * 0.02 * burstStrength;

            if (p1.colorType === sectionPrimaryColor || p2.colorType === sectionPrimaryColor) {
              lineAlpha *= 1.4;
            }

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);

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
      className="absolute inset-0 w-full h-full pointer-events-none select-none z-10"
      style={{ mixBlendMode: "screen" }}
      aria-hidden="true"
    />
  );
};
