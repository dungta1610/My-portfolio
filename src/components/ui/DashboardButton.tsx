import React from "react";

interface DashboardButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "gold" | "slate" | "red" | "blue" | "emerald" | "cyan" | "violet";
  recruiterMode?: boolean;
  children: React.ReactNode;
}

export const DashboardButton: React.FC<DashboardButtonProps> = ({
  variant = "slate",
  recruiterMode = false,
  children,
  className = "",
  disabled,
  type = "button",
  ...props
}) => {
  // Recruiter mode uses high-contrast clean borders and standard rounded buttons
  if (recruiterMode) {
    const recruiterBgs = {
      gold: "bg-amber-500 hover:bg-amber-600 text-black font-semibold",
      slate: "bg-zinc-800 hover:bg-zinc-700 text-zinc-100 border border-zinc-700 font-medium",
      red: "bg-red-600 hover:bg-red-700 text-white font-semibold",
      blue: "bg-blue-600 hover:bg-blue-700 text-white font-semibold",
      cyan: "bg-cyan-600 hover:bg-cyan-700 text-white font-semibold",
      emerald: "bg-emerald-600 hover:bg-emerald-700 text-white font-semibold",
      violet: "bg-violet-600 hover:bg-violet-700 text-white font-semibold",
    };

    return (
      <button
        type={type}
        disabled={disabled}
        className={`px-4 py-2 rounded-md text-sm transition-all duration-200 active:scale-[0.98]
          ${recruiterBgs[variant as keyof typeof recruiterBgs] || recruiterBgs.slate}
          ${disabled ? "opacity-50 cursor-not-allowed active:scale-100" : "cursor-pointer"}
          ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }

  // Dashboard modern styling
  const styleVariants = {
    gold: "border-amber-500/35 hover:border-amber-400 text-amber-400 bg-amber-500/5 hover:bg-amber-500/10 shadow-[0_0_15px_rgba(245,158,11,0.05)] focus:ring-amber-500/50",
    slate: "border-indigo-500/25 hover:border-indigo-400 text-zinc-300 bg-indigo-500/5 hover:bg-indigo-500/10 shadow-[0_0_15px_rgba(99,102,241,0.03)] focus:ring-indigo-500/50",
    red: "border-rose-500/35 hover:border-rose-400 text-rose-400 bg-rose-500/5 hover:bg-rose-500/10 shadow-[0_0_15px_rgba(244,63,94,0.05)] focus:ring-rose-500/50",
    blue: "border-cyan-500/35 hover:border-cyan-400 text-cyan-400 bg-cyan-500/5 hover:bg-cyan-500/10 shadow-[0_0_15px_rgba(6,182,212,0.05)] focus:ring-cyan-500/50",
    cyan: "border-cyan-500/35 hover:border-cyan-400 text-cyan-400 bg-cyan-500/5 hover:bg-cyan-500/10 shadow-[0_0_15px_rgba(6,182,212,0.05)] focus:ring-cyan-500/50",
    emerald: "border-emerald-500/35 hover:border-emerald-400 text-emerald-400 bg-emerald-500/5 hover:bg-emerald-500/10 shadow-[0_0_15px_rgba(16,185,129,0.05)] focus:ring-emerald-500/50",
    violet: "border-violet-500/35 hover:border-violet-400 text-violet-400 bg-violet-500/5 hover:bg-violet-500/10 shadow-[0_0_15px_rgba(139,92,246,0.05)] focus:ring-violet-500/50",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      className={`px-4 py-2 border rounded-lg font-mono text-xs uppercase tracking-wider select-none transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#05070d]
        ${styleVariants[variant as keyof typeof styleVariants] || styleVariants.slate}
        ${disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"}
        ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
