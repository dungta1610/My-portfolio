import React from "react";
import { GitHubProfileStats, Project } from "../../types/portfolio";
import { DashboardCard } from "../ui/DashboardCard";
import { DashboardBadge } from "../ui/DashboardBadge";
import { BookOpen, Calendar, Activity, Terminal } from "lucide-react";

interface GitHubInsightsProps {
  stats: GitHubProfileStats | null;
  projects: Project[];
  recruiterMode: boolean;
}

export const GitHubInsights: React.FC<GitHubInsightsProps> = ({
  stats,
  projects,
  recruiterMode,
}) => {
  const topLanguages = stats?.topLanguages || [
    { language: "Go", percentage: 55 },
    { language: "TypeScript", percentage: 25 },
    { language: "React/NextJS", percentage: 12 },
    { language: "Python", percentage: 8 }
  ];

  // Recently updated projects
  const recentUpdates = [...projects]
    .sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
    .slice(0, 3);

  const languageColors: Record<string, string> = {
    Go: "bg-[#06b6d4] shadow-[0_0_8px_rgba(6,182,212,0.4)]",
    Golang: "bg-[#06b6d4] shadow-[0_0_8px_rgba(6,182,212,0.4)]",
    TypeScript: "bg-[#f59e0b] shadow-[0_0_8px_rgba(245,158,11,0.4)]",
    "React/NextJS": "bg-[#10b981] shadow-[0_0_8px_rgba(16,185,129,0.4)]",
    JavaScript: "bg-[#8b5cf6] shadow-[0_0_8px_rgba(139,92,246,0.4)]",
    Python: "bg-[#ef4444] shadow-[0_0_8px_rgba(239,68,68,0.4)]",
  };

  const recruiterLangColors: Record<string, string> = {
    Go: "bg-blue-500",
    Golang: "bg-blue-500",
    TypeScript: "bg-amber-500",
    "React/NextJS": "bg-emerald-500",
    JavaScript: "bg-purple-500",
    Python: "bg-red-500",
  };

  // Dashboard Telemetry View
  const renderDashboard = () => {
    return (
      <section id="insights" className="py-16 px-4 max-w-5xl mx-auto scroll-mt-20">
        <div className="text-center mb-10">
          <span className="text-cyan-400 font-mono text-xs uppercase tracking-widest block mb-2">
            [SYS_INFRA] METRICS & DIAGNOSTICS
          </span>
          <h2 className="text-3xl font-extrabold text-zinc-100 tracking-tight">
            Telemetry Analytics
          </h2>
          <p className="text-sm text-zinc-400 mt-2 max-w-xl mx-auto font-mono">
            Automated code profiling metrics from active repositories and compilation servers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Top Language Distribution */}
          <DashboardCard variant="slate" glowing={false} className="space-y-4">
            <h3 className="font-mono text-xs font-bold text-cyan-400 border-b border-zinc-800/80 pb-2.5 flex items-center gap-2 uppercase tracking-wider">
              <Activity className="w-4 h-4 text-cyan-400" /> SYSTEM_LANGUAGE_METRICS
            </h3>
            
            <p className="text-xs text-zinc-400 font-mono leading-relaxed">
              Allocation of byte count and module definitions parsed from VCS indexes:
            </p>

            <div className="space-y-4 pt-2">
              {topLanguages.map((lang, idx) => {
                const colorClass = languageColors[lang.language] || "bg-zinc-700";
                return (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between font-mono text-[10px]">
                      <span className="text-zinc-350">{lang.language}</span>
                      <span className="text-cyan-400">{lang.percentage}%</span>
                    </div>
                    <div className="h-2 w-full bg-zinc-950/80 border border-zinc-800/60 p-0.5 rounded-sm relative">
                      <div 
                        className={`h-full rounded-sm ${colorClass}`}
                        style={{ width: `${lang.percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </DashboardCard>

          {/* Recently updated repositories */}
          <DashboardCard variant="slate" glowing={false} className="space-y-4">
            <h3 className="font-mono text-xs font-bold text-violet-400 border-b border-zinc-800/80 pb-2.5 flex items-center gap-2 uppercase tracking-wider">
              <BookOpen className="w-4 h-4 text-violet-400" /> ACTIVE_VCS_SUBSYSTEMS
            </h3>

            <p className="text-xs text-zinc-400 font-mono leading-relaxed mb-2">
              Recently updated source control systems and local packages:
            </p>

            <div className="space-y-3.5 pt-1">
              {recentUpdates.map((repo) => (
                <div key={repo.id} className="bg-zinc-950/60 p-3 border border-zinc-800/50 rounded-lg flex justify-between items-center gap-2">
                  <div className="min-w-0 flex-1">
                    <h4 className="font-mono text-xs font-bold text-zinc-100 truncate uppercase flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5 text-cyan-400" /> {repo.name}
                    </h4>
                    <p className="font-mono text-[9px] text-zinc-500 flex items-center gap-1.5 mt-1 select-none">
                      <Calendar className="w-3 h-3" /> UPDATED: {new Date(repo.lastUpdated).toLocaleDateString()}
                    </p>
                  </div>
                  <DashboardBadge variant={repo.featured ? "gold" : "slate"}>
                    {repo.primaryLanguage || "Repo"}
                  </DashboardBadge>
                </div>
              ))}
            </div>
          </DashboardCard>

        </div>
      </section>
    );
  };

  // Recruiter View
  const renderRecruiter = () => {
    return (
      <section id="insights" className="py-16 px-6 max-w-5xl mx-auto scroll-mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Languages */}
          <div>
            <h3 className="text-zinc-200 font-bold text-base mb-4">Language Distribution</h3>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-4">
              {topLanguages.map((lang, idx) => {
                const colorClass = recruiterLangColors[lang.language] || "bg-zinc-600";
                return (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold text-zinc-400">
                      <span>{lang.language}</span>
                      <span className="text-zinc-200">{lang.percentage}%</span>
                    </div>
                    <div className="h-2 w-full bg-zinc-950 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${colorClass}`}
                        style={{ width: `${lang.percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Activity updates */}
          <div>
            <h3 className="text-zinc-200 font-bold text-base mb-4">Recent Commits & Activity</h3>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-3">
              {recentUpdates.map((repo) => (
                <div 
                  key={repo.id} 
                  className="bg-zinc-950 border border-zinc-850 p-3 rounded-lg flex justify-between items-center"
                >
                  <div className="min-w-0">
                    <h4 className="text-zinc-300 font-bold text-sm truncate">{repo.name}</h4>
                    <span className="text-[10px] text-zinc-500 mt-1 block">
                      Last update: {new Date(repo.lastUpdated).toLocaleDateString()}
                    </span>
                  </div>
                  <span className="bg-zinc-800 border border-zinc-700 rounded px-2 py-0.5 text-[10px] text-zinc-400 font-semibold uppercase">
                    {repo.primaryLanguage || "Repo"}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    );
  };

  return recruiterMode ? renderRecruiter() : renderDashboard();
};
