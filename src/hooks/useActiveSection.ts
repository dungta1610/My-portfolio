"use client";

import { useState, useEffect } from "react";

interface SectionMetrics {
  top: number;
  left: number;
  width: number;
  height: number;
}

export function useActiveSection(sections: string[]) {
  const [activeSection, setActiveSection] = useState<string>(sections[0] || "");
  const [metrics, setMetrics] = useState<SectionMetrics | null>(null);

  const updateMetrics = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const scrollY = window.scrollY || window.pageYOffset;
    const scrollX = window.scrollX || window.pageXOffset;

    setMetrics({
      top: rect.top + scrollY,
      left: rect.left + scrollX,
      width: rect.width,
      height: rect.height,
    });
  };

  useEffect(() => {
    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        {
          threshold: 0.15,
          rootMargin: "-10% 0px -40% 0px", // triggers when entering viewport
        }
      );
      observer.observe(el);
      return { observer, el };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) {
          obs.observer.unobserve(obs.el);
        }
      });
    };
  }, [sections]);

  // Update metrics when active section changes or window resizes
  useEffect(() => {
    if (!activeSection) return;

    updateMetrics(activeSection);

    const handleResize = () => {
      updateMetrics(activeSection);
    };

    window.addEventListener("resize", handleResize);
    // Periodically update in case of dynamic content loads (e.g. GitHub client API fetches)
    const interval = setInterval(() => {
      updateMetrics(activeSection);
    }, 1500);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearInterval(interval);
    };
  }, [activeSection]);

  return { activeSection, metrics };
}
