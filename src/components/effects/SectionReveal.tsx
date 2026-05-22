"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
  /** Delay in ms before the reveal animation starts */
  delay?: number;
}

/**
 * Wraps a section and reveals it with a subtle fade-up animation
 * when it first enters the viewport. One-shot: only triggers once.
 * Respects prefers-reduced-motion.
 */
export const SectionReveal: React.FC<SectionRevealProps> = ({
  children,
  className = "",
  delay = 0,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsRevealed(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const triggerReveal = () => {
            setIsRevealed(true);
          };

          if (delay > 0) {
            setTimeout(triggerReveal, delay);
          } else {
            triggerReveal();
          }
          observer.unobserve(el); // one-shot
        }
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -60px 0px",
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [prefersReducedMotion, delay]);

  return (
    <div
      ref={ref}
      className={`section-reveal relative ${isRevealed ? "section-reveal-visible" : ""} ${className}`}
    >
      {children}
    </div>
  );
};
