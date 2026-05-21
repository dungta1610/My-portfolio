import React from "react";

interface PixelCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "gold" | "slate" | "stone" | "red" | "blue" | "emerald" | "purple";
  glowing?: boolean;
  showDragon?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

// ── DRAGON COLOR SCHEMES BASED ON CARD VARIANT ──
const dragonColors = {
  red: {
    body: "#dc2626",      // Primary red
    bodyDark: "#991b1b",  // Dark red for shadow
    bodyLight: "#ef4444", // Highlight red
    belly: "#facc15",     // Yellow belly
    bellyDark: "#f59e0b", // Orange belly shadow
    wing: "#7f1d1d",      // Dark maroon wing
    wingDark: "#4c0519",  // Deep wing shadow
    eye: "#facc15",       // Yellow eye
    horn: "#7f1d1d",      // Horns
    fire: "#ff4500",      // Flame primary
    fireLight: "#ffeb3b", // Flame highlight
  },
  gold: {
    body: "#eab308",      // Gold body
    bodyDark: "#a16207",
    bodyLight: "#fef08a",
    belly: "#ffffff",
    bellyDark: "#e2e8f0",
    wing: "#854d0e",
    wingDark: "#451a03",
    eye: "#06b6d4",       // Cyan glowing eye
    horn: "#451a03",
    fire: "#eab308",
    fireLight: "#ffffff",
  },
  blue: {
    body: "#2563eb",
    bodyDark: "#1e3a8a",
    bodyLight: "#60a5fa",
    belly: "#93c5fd",
    bellyDark: "#3b82f6",
    wing: "#1d4ed8",
    wingDark: "#172554",
    eye: "#eab308",
    horn: "#172554",
    fire: "#3b82f6",
    fireLight: "#93c5fd",
  },
  emerald: {
    body: "#059669",
    bodyDark: "#065f46",
    bodyLight: "#34d399",
    belly: "#a7f3d0",
    bellyDark: "#10b981",
    wing: "#047857",
    wingDark: "#022c22",
    eye: "#eab308",
    horn: "#022c22",
    fire: "#10b981",
    fireLight: "#a7f3d0",
  },
  purple: {
    body: "#9333ea",
    bodyDark: "#6b21a8",
    bodyLight: "#c084fc",
    belly: "#f3e8ff",
    bellyDark: "#a855f7",
    wing: "#7e22ce",
    wingDark: "#3b0764",
    eye: "#22c55e",       // Green glowing eye
    horn: "#3b0764",
    fire: "#ec4899",
    fireLight: "#fbcfe8",
  },
  slate: {
    body: "#64748b",
    bodyDark: "#475569",
    bodyLight: "#94a3b8",
    belly: "#cbd5e1",
    bellyDark: "#64748b",
    wing: "#334155",
    wingDark: "#1e293b",
    eye: "#38bdf8",
    horn: "#1e293b",
    fire: "#94a3b8",
    fireLight: "#f1f5f9",
  },
  stone: {
    body: "#4b5563",
    bodyDark: "#374151",
    bodyLight: "#9ca3af",
    belly: "#cbd5e1",
    bellyDark: "#4b5563",
    wing: "#1f2937",
    wingDark: "#111827",
    eye: "#ef4444",
    horn: "#111827",
    fire: "#f97316",
    fireLight: "#fde047",
  },
};

// ── UPGRADED, ANIMATED DYNAMIC BABY DRAGON COMPONENT ──
export const TinyPixelDragon: React.FC<{ variant: keyof typeof dragonColors }> = ({ variant }) => {
  const c = dragonColors[variant] || dragonColors.stone;
  
  return (
    <svg
      viewBox="0 0 32 32"
      className="absolute pointer-events-none select-none drop-shadow-[0_4px_8px_rgba(0,0,0,0.85)] z-25 transition-all hover:scale-110 duration-200"
      style={{
        width: "48px",   // Sized to 48px
        height: "48px",
        top: "-35px",    // Sitting perfectly on the top-right corner
        right: "-15px",
        shapeRendering: "crispEdges",
        overflow: "visible",
      }}
    >
      <defs>
        <style>{`
          @keyframes dragon-breathe {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-0.6px) scaleY(1.02); }
          }
          .dragon-body-group {
            animation: dragon-breathe 2.4s ease-in-out infinite;
            transform-origin: bottom center;
          }
          
          @keyframes wing-flap-anim {
            0%, 100% { transform: rotate(0deg); }
            50% { transform: rotate(-15deg) translateY(0.5px); }
          }
          .dragon-wing-group {
            animation: wing-flap-anim 0.8s steps(2) infinite;
          }
          
          @keyframes tail-wag-anim {
            0%, 100% { transform: rotate(0deg); }
            50% { transform: rotate(6deg) translateY(0.2px); }
          }
          .dragon-tail-group {
            animation: tail-wag-anim 1.2s steps(2) infinite;
          }

          @keyframes eye-blink-anim {
            0%, 90%, 100% { opacity: 1; }
            95% { opacity: 0; }
          }
          .dragon-eye {
            animation: eye-blink-anim 4.5s infinite;
          }

          @keyframes fire-breath-anim {
            0%, 75% { opacity: 0; transform: translate(0, 0) scale(0); }
            78% { opacity: 1; transform: translate(-2px, 1px) scale(0.7); }
            82% { opacity: 1; transform: translate(-6px, 2px) scale(1.1); }
            86% { opacity: 0.8; transform: translate(-12px, 3px) scale(0.9); }
            90% { opacity: 0; transform: translate(-18px, 4px) scale(0.6); }
            100% { opacity: 0; }
          }
          .dragon-fire-particle-1 {
            animation: fire-breath-anim 3.5s infinite;
          }
          .dragon-fire-particle-2 {
            animation: fire-breath-anim 3.5s infinite 0.2s;
          }
          .dragon-fire-particle-3 {
            animation: fire-breath-anim 3.5s infinite 0.4s;
          }
        `}</style>
      </defs>

      {/* Flame Breath Particles emitting from snout at X=4.2, Y=8 */}
      <g>
        <g className="dragon-fire-particle-1">
          <rect x="2.5" y="8" width="2" height="2" fill={c.fire} />
          <rect x="3.5" y="9" width="1" height="1" fill={c.fireLight} />
        </g>
        <g className="dragon-fire-particle-2">
          <rect x="1.5" y="9" width="2" height="1" fill={c.fire} />
          <rect x="1.5" y="9.5" width="1" height="0.5" fill={c.fireLight} />
        </g>
        <g className="dragon-fire-particle-3">
          <rect x="0.5" y="10" width="1.5" height="1.5" fill={c.fire} />
        </g>
      </g>

      {/* Tail (curves back and wraps, drawn behind body) */}
      <g className="dragon-tail-group" style={{ transformOrigin: "18px 21px" }}>
        <rect x="18" y="21" width="2" height="2" fill={c.bodyDark} />
        <rect x="20" y="22.5" width="2" height="1.5" fill={c.body} />
        <rect x="22" y="24" width="2.5" height="1.5" fill={c.body} />
        <rect x="23" y="23" width="1" height="2.5" fill={c.bodyDark} />
        <rect x="24" y="25" width="3" height="1.5" fill={c.body} />
        <rect x="26.5" y="23.5" width="2" height="2" fill={c.bodyLight} />
        <rect x="28" y="21.5" width="1.5" height="2.5" fill={c.horn} />
        <rect x="29.5" y="20" width="1" height="2.5" fill={c.horn} />
        <rect x="29" y="22.5" width="1.5" height="1" fill={c.wingDark} />
      </g>

      {/* Body Group (Head, Neck, Torso, Horns, Spikes, Claws) */}
      <g className="dragon-body-group">
        {/* Horns */}
        <rect x="15" y="5" width="2" height="1" fill={c.horn} />
        <rect x="17" y="4" width="2" height="1" fill={c.horn} />
        <rect x="19" y="3" width="2" height="1" fill={c.horn} />
        <rect x="21" y="2" width="2.5" height="1" fill={c.horn} />
        
        <rect x="16" y="7" width="2" height="1" fill={c.horn} />
        <rect x="18" y="7" width="2" height="1" fill={c.horn} />
        <rect x="20" y="6.5" width="2.5" height="1" fill={c.horn} />

        {/* Head Skull */}
        <rect x="11" y="5" width="6" height="3.5" fill={c.body} />
        <rect x="12" y="4" width="4.5" height="1.2" fill={c.bodyLight} />
        
        {/* Snout (facing left, thick & majestic) */}
        <rect x="5" y="7.5" width="6.5" height="2" fill={c.body} />
        <rect x="4.2" y="8" width="1.5" height="1" fill={c.bodyLight} />
        <rect x="4.7" y="7" width="1" height="1" fill={c.bodyDark} />
        <rect x="6" y="9.5" width="5.5" height="1.5" fill={c.bodyDark} />
        
        <rect x="5" y="9" width="6" height="0.5" fill={c.bodyDark} />
        <rect x="6.2" y="9" width="0.8" height="0.8" fill="#ffffff" />

        {/* Eyes (glowing & fierce) */}
        <g className="dragon-eye">
          <rect x="10.5" y="6" width="1.5" height="1.5" fill={c.eye} />
          <rect x="10.2" y="6.5" width="0.8" height="0.8" fill="#ffffff" />
          <rect x="10.2" y="5" width="2.5" height="0.8" fill={c.bodyLight} />
        </g>
        
        {/* Back Spikes */}
        <rect x="16" y="11" width="1" height="1" fill={c.horn} />
        <rect x="17.2" y="13" width="1" height="1" fill={c.horn} />
        <rect x="18.5" y="16" width="1" height="1" fill={c.horn} />
        <rect x="19" y="19" width="1" height="1" fill={c.horn} />

        {/* Neck */}
        <rect x="12" y="11" width="4" height="5" fill={c.body} />
        <rect x="14.5" y="11" width="1.5" height="4" fill={c.bodyDark} />

        {/* Torso & Chest */}
        <rect x="12" y="16" width="6.5" height="6.5" fill={c.body} />
        <rect x="16" y="16" width="2.5" height="6" fill={c.bodyDark} />
        
        {/* Underbelly plates */}
        <rect x="11" y="12" width="1" height="4" fill={c.belly} />
        <rect x="11.5" y="13" width="0.5" height="2.5" fill={c.bellyDark} />
        
        <rect x="10.5" y="16" width="1.5" height="5" fill={c.belly} />
        <rect x="11" y="17" width="1" height="4.2" fill={c.bellyDark} />

        {/* Front arm & claws */}
        <rect x="13.5" y="16.5" width="2" height="1.5" fill={c.body} />
        <rect x="12.5" y="18" width="1.5" height="1.5" fill={c.body} />
        <rect x="10.5" y="18" width="2.2" height="1" fill={c.bodyLight} />
        <rect x="9.5" y="18" width="1" height="1.2" fill="#e2e8f0" />
        <rect x="10" y="19.2" width="0.7" height="0.7" fill="#cbd5e1" />

        {/* Hind leg & foot (standing on border) */}
        <rect x="16.5" y="19" width="3" height="3" fill={c.bodyDark} />
        <rect x="15" y="21.5" width="2" height="1.5" fill={c.body} />
        <rect x="14" y="23" width="0.8" height="1" fill="#cbd5e1" />
        <rect x="15" y="23" width="0.8" height="1" fill="#e2e8f0" />
        <rect x="16" y="23" width="0.8" height="1" fill="#cbd5e1" />
      </g>

      {/* Near Wing (drawn in front of body) */}
      <g className="dragon-wing-group" style={{ transformOrigin: "17px 15px" }}>
        {/* Shadowed far wing */}
        <g opacity="0.4" transform="translate(2px, -2px) scale(0.9)">
          <rect x="17" y="11.5" width="8" height="1.5" fill={c.wingDark} />
          <rect x="18" y="13" width="7" height="4" fill={c.wingDark} />
        </g>
        
        {/* Near wing structure & membranes */}
        <rect x="17" y="14.5" width="2" height="1.5" fill={c.bodyDark} />
        <rect x="18" y="12" width="6" height="1.2" fill={c.bodyLight} />
        <rect x="23.5" y="11.5" width="2.2" height="1.2" fill={c.bodyLight} />
        <rect x="25" y="12.5" width="1" height="1.5" fill={c.bodyLight} />
        <rect x="21" y="13.2" width="1.2" height="3" fill={c.body} />
        <rect x="23.5" y="13.2" width="1.2" height="4.5" fill={c.body} />
        
        <rect x="19" y="13.2" width="2" height="2.5" fill={c.wing} />
        <rect x="20.5" y="14" width="2.8" height="3" fill={c.wing} />
        <rect x="22.5" y="15" width="1.2" height="2.5" fill={c.wing} />
        
        <rect x="19.5" y="15.7" width="1.2" height="1" fill={c.wingDark} />
        <rect x="21.5" y="17" width="1.5" height="1" fill={c.wingDark} />
      </g>
    </svg>
  );
};

export const PixelCard: React.FC<PixelCardProps> = ({
  variant = "stone",
  glowing = false,
  showDragon = true,
  children,
  className = "",
  onClick,
  ...props
}) => {
  const borderClasses = {
    gold: "pixel-border-gold border-[#ffd700]",
    slate: "pixel-border-slate border-[#4c566a]",
    red: "pixel-border-red border-[#ff4757]",
    blue: "pixel-border-blue border-[#00a8ff]",
    emerald: "pixel-border-emerald border-[#2ed573]",
    purple: "pixel-border-purple border-[#8e44ad]",
    stone: "pixel-border-stone border-[#4a5568]",
  };

  const glowClasses = glowing
    ? "shadow-[0_0_15px_rgba(255,215,0,0.4)]"
    : "";

  const clickableClasses = onClick
    ? "cursor-pointer transition-transform hover:-translate-y-1 hover:brightness-110 active:translate-y-0 duration-150"
    : "";

  return (
    <div
      onClick={onClick}
      className={`bg-[#151821] p-4 text-[#ededed] relative ${borderClasses[variant]} ${glowClasses} ${clickableClasses} ${className}`}
      {...props}
    >
      {/* Dynamic Tiny Pixel Dragon perched on the top-right border */}
      {showDragon && <TinyPixelDragon variant={variant} />}
      
      {/* Card Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};
