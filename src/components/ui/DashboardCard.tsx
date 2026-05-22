import React, { useState, useRef, useEffect } from "react";

interface DashboardCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "gold" | "slate" | "stone" | "red" | "blue" | "emerald" | "purple" | "cyan" | "violet";
  glowing?: boolean;
  recruiterMode?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({
  variant = "slate",
  glowing = false,
  recruiterMode = false,
  children,
  className = "",
  onClick,
  ...props
}) => {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!recruiterMode) {
      setIsHovered(true);
    }
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);

    if (recruiterMode || reducedMotion) return;

    const xPercent = (x / rect.width) - 0.5;
    const yPercent = (y / rect.height) - 0.5;

    const rotX = yPercent * -4;
    const rotY = xPercent * 4;

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.008, 1.008, 1.008) translateY(-2px)`,
      transition: "transform 0.08s ease-out",
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (recruiterMode || reducedMotion) return;

    setTiltStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1) translateY(0px)",
      transition: "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
    });
  };
  // Recruiter mode uses high-contrast clean borders and solid bg, no glows
  if (recruiterMode) {
    const recruiterBorders = {
      gold: "border-amber-600/30",
      slate: "border-zinc-800",
      stone: "border-zinc-800",
      red: "border-red-800/30",
      blue: "border-blue-800/30",
      cyan: "border-cyan-800/30",
      emerald: "border-emerald-800/30",
      purple: "border-purple-800/30",
      violet: "border-violet-800/30",
    };

    return (
      <div
        onClick={onClick}
        className={`bg-zinc-900/90 text-zinc-100 p-6 rounded-lg border ${
          recruiterBorders[variant as keyof typeof recruiterBorders] || "border-zinc-800"
        } ${onClick ? "cursor-pointer hover:bg-zinc-900/100 active:scale-[0.99] transition-all" : ""} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }

  // Dashboard styling mapping for cybernetic panels
  const accentColors = {
    gold: "rgba(245, 158, 11, 0.2)",
    slate: "rgba(148, 163, 184, 0.15)",
    stone: "rgba(115, 115, 115, 0.15)",
    red: "rgba(239, 68, 68, 0.2)",
    blue: "rgba(6, 182, 212, 0.2)",
    cyan: "rgba(6, 182, 212, 0.2)",
    emerald: "rgba(16, 185, 129, 0.2)",
    purple: "rgba(139, 92, 246, 0.2)",
    violet: "rgba(139, 92, 246, 0.2)",
  };

  const glowStyles = {
    gold: "shadow-[0_0_20px_rgba(245,158,11,0.08)]",
    slate: "shadow-[0_0_20px_rgba(148,163,184,0.05)]",
    stone: "shadow-[0_0_20px_rgba(115,115,115,0.05)]",
    red: "shadow-[0_0_20px_rgba(239,68,68,0.08)]",
    blue: "shadow-[0_0_20px_rgba(6,182,212,0.08)]",
    cyan: "shadow-[0_0_20px_rgba(6,182,212,0.08)]",
    emerald: "shadow-[0_0_20px_rgba(16,185,129,0.08)]",
    purple: "shadow-[0_0_20px_rgba(139,92,246,0.08)]",
    violet: "shadow-[0_0_20px_rgba(139,92,246,0.08)]",
  };

  const borderGradient = {
    gold: "from-amber-500/20 via-amber-500/5 to-transparent",
    slate: "from-slate-500/15 via-slate-500/5 to-transparent",
    stone: "from-neutral-500/15 via-neutral-500/5 to-transparent",
    red: "from-rose-500/20 via-rose-500/5 to-transparent",
    blue: "from-cyan-500/20 via-cyan-500/5 to-transparent",
    cyan: "from-cyan-500/20 via-cyan-500/5 to-transparent",
    emerald: "from-emerald-500/20 via-emerald-500/5 to-transparent",
    purple: "from-violet-500/20 via-violet-500/5 to-transparent",
    violet: "from-violet-500/20 via-violet-500/5 to-transparent",
  };

  const isClickable = !!onClick;
  const hoverClasses = isClickable
    ? "cursor-pointer hover:border-cyan-500/40 hover:shadow-[0_0_25px_rgba(6,182,212,0.12)] hover:-translate-y-1 active:translate-y-0"
    : "";

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-xl bg-[#090d1a]/60 border backdrop-blur-md transition-all duration-300 p-6 group
        ${glowing ? glowStyles[variant] : "shadow-[0_4px_30px_rgba(0,0,0,0.3)]"}
        ${hoverClasses} ${className}`}
      style={{
        borderColor: accentColors[variant] || "rgba(99, 102, 241, 0.15)",
        ...props.style,
        ...tiltStyle,
      }}
      {...props}
    >
      {/* Premium Glass reflection and spotlight overlay */}
      {!recruiterMode && (
        <div 
          className="absolute inset-0 rounded-xl pointer-events-none overflow-hidden z-0 select-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 120px at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(255, 255, 255, 0.06), transparent 80%)`,
          }}
        />
      )}

      {/* Premium Tech corner elements */}
      <div 
        className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l rounded-tl-lg pointer-events-none" 
        style={{ borderColor: accentColors[variant] }}
      />
      <div 
        className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r rounded-tr-lg pointer-events-none" 
        style={{ borderColor: accentColors[variant] }}
      />
      <div 
        className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l rounded-bl-lg pointer-events-none" 
        style={{ borderColor: accentColors[variant] }}
      />
      <div 
        className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r rounded-br-lg pointer-events-none" 
        style={{ borderColor: accentColors[variant] }}
      />

      {/* Decorative top border gradient line */}
      <div 
        className={`absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r ${borderGradient[variant]} pointer-events-none`}
      />

      <div className="relative z-10">{children}</div>
    </div>
  );
};
