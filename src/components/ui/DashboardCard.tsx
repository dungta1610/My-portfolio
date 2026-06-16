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
  const [isHovered, setIsHovered] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});
  const [flickering, setFlickering] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const handleMouseEnter = () => {
    if (!recruiterMode) {
      setIsHovered(true);
      if (!reducedMotion) {
        setFlickering(true);
        setTimeout(() => setFlickering(false), 300);
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!recruiterMode && !isHovered) {
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
      gold: "border-zinc-800",
      slate: "border-zinc-800",
      stone: "border-zinc-800",
      red: "border-zinc-800",
      blue: "border-zinc-800",
      cyan: "border-zinc-800",
      emerald: "border-zinc-800",
      purple: "border-zinc-800",
      violet: "border-zinc-800",
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
  const borderColors = {
    gold: "rgba(245, 158, 11, 0.22)",
    slate: "rgba(6, 182, 212, 0.18)",
    stone: "rgba(115, 115, 115, 0.15)",
    red: "rgba(239, 68, 68, 0.22)",
    blue: "rgba(6, 182, 212, 0.22)",
    cyan: "rgba(6, 182, 212, 0.22)",
    emerald: "rgba(16, 185, 129, 0.22)",
    purple: "rgba(139, 92, 246, 0.22)",
    violet: "rgba(139, 92, 246, 0.22)",
  };

  const borderColorsActive = {
    gold: "rgba(245, 158, 11, 0.55)",
    slate: "rgba(6, 182, 212, 0.45)",
    stone: "rgba(115, 115, 115, 0.35)",
    red: "rgba(239, 68, 68, 0.55)",
    blue: "rgba(6, 182, 212, 0.65)",
    cyan: "rgba(6, 182, 212, 0.65)",
    emerald: "rgba(16, 185, 129, 0.55)",
    purple: "rgba(139, 92, 246, 0.55)",
    violet: "rgba(139, 92, 246, 0.55)",
  };

  const glowStyles = {
    gold: "shadow-[0_0_25px_rgba(245,158,11,0.08),inset_0_0_12px_rgba(245,158,11,0.05)]",
    slate: "shadow-[0_0_25px_rgba(6,182,212,0.06),inset_0_0_12px_rgba(6,182,212,0.04)]",
    stone: "shadow-[0_0_25px_rgba(115,115,115,0.05),inset_0_0_12px_rgba(115,115,115,0.04)]",
    red: "shadow-[0_0_25px_rgba(239,68,68,0.08),inset_0_0_12px_rgba(239,68,68,0.05)]",
    blue: "shadow-[0_0_25px_rgba(6,182,212,0.08),inset_0_0_12px_rgba(6,182,212,0.05)]",
    cyan: "shadow-[0_0_25px_rgba(6,182,212,0.08),inset_0_0_12px_rgba(6,182,212,0.05)]",
    emerald: "shadow-[0_0_25px_rgba(16,185,129,0.08),inset_0_0_12px_rgba(16,185,129,0.05)]",
    purple: "shadow-[0_0_25px_rgba(139,92,246,0.08),inset_0_0_12px_rgba(139,92,246,0.05)]",
    violet: "shadow-[0_0_25px_rgba(139,92,246,0.08),inset_0_0_12px_rgba(139,92,246,0.05)]",
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
    ? "cursor-pointer hover:shadow-[0_0_30px_rgba(6,182,212,0.15),inset_0_0_16px_rgba(6,182,212,0.1)] hover:-translate-y-1 active:translate-y-0"
    : "";

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-xl border backdrop-blur-md transition-all duration-300 p-6 group
        ${glowing ? glowStyles[variant] : "shadow-[0_4px_30px_rgba(0,0,0,0.4),inset_0_0_10px_rgba(6,182,212,0.03)]"}
        ${flickering ? "animate-hologram-flicker" : ""}
        ${hoverClasses} ${className}`}
      style={{
        borderColor: isHovered ? borderColorsActive[variant] : borderColors[variant],
        background: isHovered ? "rgba(10, 16, 40, 0.55)" : "rgba(9, 13, 26, 0.45)",
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
            background: `radial-gradient(circle 120px at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(255, 255, 255, 0.05), transparent 80%)`,
          }}
        />
      )}

      {/* Local light sweep shimmer overlay */}
      {!recruiterMode && !reducedMotion && (
        <div 
          className="absolute inset-0 pointer-events-none overflow-hidden z-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        >
          <div className="absolute inset-0 w-[50%] h-[200%] -top-[50%] -left-[60%] bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent transform rotate-30 transition-transform duration-1000 group-hover:translate-x-[250%]" />
        </div>
      )}

      {/* Premium Tech corner elements */}
      <div 
        className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l rounded-tl-lg pointer-events-none transition-colors duration-300" 
        style={{ borderColor: isHovered ? borderColorsActive[variant] : borderColors[variant] }}
      />
      <div 
        className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r rounded-tr-lg pointer-events-none transition-colors duration-300" 
        style={{ borderColor: isHovered ? borderColorsActive[variant] : borderColors[variant] }}
      />
      <div 
        className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l rounded-bl-lg pointer-events-none transition-colors duration-300" 
        style={{ borderColor: isHovered ? borderColorsActive[variant] : borderColors[variant] }}
      />
      <div 
        className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r rounded-br-lg pointer-events-none transition-colors duration-300" 
        style={{ borderColor: isHovered ? borderColorsActive[variant] : borderColors[variant] }}
      />

      {/* Decorative top border gradient line */}
      <div 
        className={`absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r ${borderGradient[variant]} pointer-events-none`}
      />

      <div className="relative z-10">{children}</div>
    </div>
  );
};
