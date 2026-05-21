import React from "react";

interface PixelCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "gold" | "slate" | "red" | "blue" | "emerald" | "purple";
  glowing?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

export const PixelCard: React.FC<PixelCardProps> = ({
  variant = "slate",
  glowing = false,
  children,
  className = "",
  onClick,
  ...props
}) => {
  const borderClasses = {
    gold: "pixel-border-gold border-[#d4af37]",
    slate: "pixel-border-slate border-[#4c566a]",
    red: "pixel-border-red border-[#ff4757]",
    blue: "pixel-border-blue border-[#00a8ff]",
    emerald: "pixel-border-emerald border-[#2ed573]",
    purple: "pixel-border-purple border-[#8e44ad]",
  };

  const glowClasses = glowing
    ? "shadow-[0_0_15px_rgba(212,175,55,0.4)]"
    : "";

  const clickableClasses = onClick
    ? "cursor-pointer transition-transform hover:-translate-y-1 hover:brightness-110 active:translate-y-0 duration-150"
    : "";

  return (
    <div
      onClick={onClick}
      className={`bg-[#151821] p-4 text-[#ededed] ${borderClasses[variant]} ${glowClasses} ${clickableClasses} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
