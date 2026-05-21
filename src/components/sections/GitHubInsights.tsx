import React from "react";
import { GitHubProfileStats, Project } from "../../types/portfolio";
import { PixelCard } from "../ui/PixelCard";
import { PixelBadge } from "../ui/PixelBadge";
import { Star, GitFork, BookOpen, Calendar, ShieldCheck, Activity } from "lucide-react";

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
    Go: "bg-[#00a8ff] shadow-[0_0_8px_rgba(0,168,255,0.4)]",
    Golang: "bg-[#00a8ff] shadow-[0_0_8px_rgba(0,168,255,0.4)]",
    TypeScript: "bg-[#d4af37] shadow-[0_0_8px_rgba(212,175,55,0.4)]",
    "React/NextJS": "bg-[#2ed573] shadow-[0_0_8px_rgba(46,213,115,0.4)]",
    JavaScript: "bg-[#8e44ad] shadow-[0_0_8px_rgba(142,68,173,0.4)]",
    Python: "bg-[#ff4757] shadow-[0_0_8px_rgba(255,71,87,0.4)]",
  };

  const recruiterLangColors: Record<string, string> = {
    Go: "bg-blue-500",
    Golang: "bg-blue-500",
    TypeScript: "bg-amber-500",
    "React/NextJS": "bg-emerald-500",
    JavaScript: "bg-purple-500",
    Python: "bg-red-500",
  };

  // RPG View
  const renderRPG = () => {
    return (
      <section id="insights" className="py-12 px-4 max-w-5xl mx-auto scroll-mt-20">
        <h2 className="font-press text-sm text-[#d4af37] mb-8 text-center uppercase tracking-widest select-none">
          🔮 GUILD INTELLIGENCE (GITHUB INSIGHTS) 🔮
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Top Spell Mastery (Languages) */}
          <PixelCard variant="slate" className="space-y-4">
            <h3 className="font-press text-[10px] text-[#00a8ff] uppercase border-b border-[#2e3440] pb-2 flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#00a8ff]" /> SPELL MASTERY (TOP LANGUAGES)
            </h3>
            
            <p className="font-vt text-lg text-zinc-300">
              Mana allocation and code writing volume calculated across public domains:
            </p>

            <div className="space-y-4 pt-2">
              {topLanguages.map((lang, idx) => {
                const colorClass = languageColors[lang.language] || "bg-[#4c566a]";
                return (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between font-press text-[8px]">
                      <span>{lang.language}</span>
                      <span className="text-[#00a8ff]">{lang.percentage}%</span>
                    </div>
                    <div className="h-3 bg-[#0b0c10] border border-[#2e3440] p-0.5 relative">
                      <div 
                        className={`h-full ${colorClass}`}
                        style={{ width: `${lang.percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </PixelCard>

          {/* Recently Unlocked Dungeons (Recently updated repos) */}
          <PixelCard variant="slate" className="space-y-4">
            <h3 className="font-press text-[10px] text-[#2ed573] uppercase border-b border-[#2e3440] pb-2 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#2ed573]" /> RECENT DUNGEON ACTIVITY
            </h3>

            <p className="font-vt text-lg text-zinc-300 mb-2">
              Recently traversed code regions and completed logs:
            </p>

            <div className="space-y-3 pt-1">
              {recentUpdates.map((repo) => (
                <div key={repo.id} className="bg-[#0b0c10] p-2.5 border border-[#2e3440] flex justify-between items-center gap-2">
                  <div className="min-w-0 flex-1">
                    <h4 className="font-press text-[8px] text-[#d4af37] truncate uppercase">
                      {repo.name}
                    </h4>
                    <p className="font-vt text-base text-[#4c566a] flex items-center gap-1.5 mt-0.5 select-none">
                      <Calendar className="w-3.5 h-3.5" /> Updated: {new Date(repo.lastUpdated).toLocaleDateString()}
                    </p>
                  </div>
                  <PixelBadge variant={repo.featured ? "gold" : "slate"}>
                    {repo.primaryLanguage || "None"}
                  </PixelBadge>
                </div>
              ))}
            </div>
          </PixelCard>

        </div>
      </section>
    );
  };

  // Recruiter View
  const renderRecruiter = () => {
    return (
      <section id="insights" className="py-12 px-6 max-w-5xl mx-auto scroll-mt-20">
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

  return recruiterMode ? renderRecruiter() : renderRPG();
};
