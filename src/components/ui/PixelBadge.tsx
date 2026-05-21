import React from "react";

interface PixelBadgeProps {
  variant?: "gold" | "slate" | "red" | "blue" | "emerald" | "purple";
  children: React.ReactNode;
  className?: string;
}

export const PixelBadge: React.FC<PixelBadgeProps> = ({
  variant = "slate",
  children,
  className = "",
}) => {
  const badgeColors = {
    gold: "bg-[#d4af37] text-black border-[#d4af37]",
    slate: "bg-[#2e3440] text-[#ededed] border-[#4c566a]",
    red: "bg-[#ff4757] text-white border-[#ff4757]",
    blue: "bg-[#00a8ff] text-white border-[#00a8ff]",
    emerald: "bg-[#2ed573] text-black border-[#2ed573]",
    purple: "bg-[#8e44ad] text-white border-[#8e44ad]",
  };

  const shadowClasses = "shadow-[0_-2px_0_-1px_#0b0c10,0_2px_0_-1px_#0b0c10,-2px_0_0_-1px_#0b0c10,2px_0_0_-1px_#0b0c10]";

  return (
    <span
      className={`inline-block px-2 py-0.5 border-2 font-press text-[8px] tracking-wide select-none leading-tight uppercase
        ${badgeColors[variant]} ${shadowClasses} ${className}`}
    >
      {children}
    </span>
  );
};
