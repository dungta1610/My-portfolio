import React from "react";

interface DashboardBadgeProps {
  variant?: "gold" | "slate" | "red" | "blue" | "emerald" | "purple" | "cyan" | "violet" | "stone";
  children: React.ReactNode;
  className?: string;
  recruiterMode?: boolean;
}

export const DashboardBadge: React.FC<DashboardBadgeProps> = ({
  variant = "slate",
  children,
  className = "",
  recruiterMode = false,
}) => {
  // Recruiter mode is simpler and clean
  if (recruiterMode) {
    const recruiterStyles = {
      gold: "bg-amber-100 text-amber-800 border-amber-200",
      slate: "bg-zinc-100 text-zinc-800 border-zinc-200",
      stone: "bg-zinc-100 text-zinc-800 border-zinc-200",
      red: "bg-red-100 text-red-800 border-red-200",
      blue: "bg-blue-100 text-blue-800 border-blue-200",
      cyan: "bg-cyan-100 text-cyan-800 border-cyan-200",
      emerald: "bg-emerald-100 text-emerald-800 border-emerald-200",
      purple: "bg-purple-100 text-purple-800 border-purple-200",
      violet: "bg-violet-100 text-violet-800 border-violet-200",
    };

    return (
      <span
        className={`inline-block px-2.5 py-0.5 rounded text-xs font-medium border
          ${recruiterStyles[variant as keyof typeof recruiterStyles] || recruiterStyles.slate} ${className}`}
      >
        {children}
      </span>
    );
  }

  // Dashboard styled badges (sleek micro-tags)
  const styles = {
    gold: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    slate: "bg-slate-500/10 text-slate-300 border-slate-500/20",
    stone: "bg-neutral-500/10 text-neutral-300 border-neutral-500/20",
    red: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    blue: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    cyan: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    emerald: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    purple: "bg-violet-500/10 text-violet-400 border-violet-500/20",
    violet: "bg-violet-500/10 text-violet-400 border-violet-500/20",
  };

  return (
    <span
      className={`inline-block px-2 py-0.5 border rounded font-mono text-[10px] tracking-wider uppercase select-none leading-none
        ${styles[variant as keyof typeof styles] || styles.slate} ${className}`}
    >
      {children}
    </span>
  );
};
