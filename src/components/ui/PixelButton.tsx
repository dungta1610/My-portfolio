import React from "react";

interface PixelButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "gold" | "slate" | "red" | "blue" | "emerald";
  children: React.ReactNode;
}

export const PixelButton: React.FC<PixelButtonProps> = ({
  variant = "slate",
  children,
  className = "",
  disabled,
  type = "button",
  ...props
}) => {
  const bgColors = {
    gold: "bg-[#d4af37] text-black border-[#d4af37] hover:bg-[#f3e5ab] active:bg-[#aa7c11] focus:ring-[#d4af37]",
    slate: "bg-[#2e3440] text-[#ededed] border-[#4c566a] hover:bg-[#434c5e] active:bg-[#20242c] focus:ring-[#4c566a]",
    red: "bg-[#ff4757] text-white border-[#ff4757] hover:bg-[#ff6b81] active:bg-[#ff1f30] focus:ring-[#ff4757]",
    blue: "bg-[#00a8ff] text-white border-[#00a8ff] hover:bg-[#33b8ff] active:bg-[#0088cc] focus:ring-[#00a8ff]",
    emerald: "bg-[#2ed573] text-black border-[#2ed573] hover:bg-[#57e28c] active:bg-[#20a355] focus:ring-[#2ed573]",
  };

  const borderShadows = {
    gold: "shadow-[0_-4px_0_-2px_#0b0c10,0_4px_0_-2px_#0b0c10,-4px_0_0_-2px_#0b0c10,4px_0_0_-2px_#0b0c10,inset_0_0_0_2px_#5a450c]",
    slate: "shadow-[0_-4px_0_-2px_#0b0c10,0_4px_0_-2px_#0b0c10,-4px_0_0_-2px_#0b0c10,4px_0_0_-2px_#0b0c10,inset_0_0_0_2px_#1c202a]",
    red: "shadow-[0_-4px_0_-2px_#0b0c10,0_4px_0_-2px_#0b0c10,-4px_0_0_-2px_#0b0c10,4px_0_0_-2px_#0b0c10,inset_0_0_0_2px_#8b0000]",
    blue: "shadow-[0_-4px_0_-2px_#0b0c10,0_4px_0_-2px_#0b0c10,-4px_0_0_-2px_#0b0c10,4px_0_0_-2px_#0b0c10,inset_0_0_0_2px_#0056b3]",
    emerald: "shadow-[0_-4px_0_-2px_#0b0c10,0_4px_0_-2px_#0b0c10,-4px_0_0_-2px_#0b0c10,4px_0_0_-2px_#0b0c10,inset_0_0_0_2px_#006400]"
  };

  return (
    <button
      type={type}
      disabled={disabled}
      className={`px-4 py-2 border-4 font-press text-[10px] uppercase select-none transition-all outline-none duration-75
        ${bgColors[variant]} ${borderShadows[variant]}
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-[0_-2px_0_-1px_#0b0c10,0_2px_0_-1px_#0b0c10,-2px_0_0_-1px_#0b0c10,2px_0_0_-1px_#0b0c10]"} 
        ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
