import React from "react";
import { PixelCard } from "../ui/PixelCard";
import { PixelBadge } from "../ui/PixelBadge";
import { Trophy, Star, Award, Shield, Sparkles } from "lucide-react";

interface AchievementsProps {
  recruiterMode: boolean;
}

export const Achievements: React.FC<AchievementsProps> = ({ recruiterMode }) => {
  const honors = [
    {
      title: "Honorable Mention",
      event: "ICPC Vietnam National Programming Contest 2022",
      rpgItem: "Bronze Sigil of Algorithms",
      desc: "Ranked among top teams in the national collegiate programming contest solving complex algorithmic challenges under strict time limits.",
      color: "blue" as const
    },
    {
      title: "Top 23 Teams (Semifinalist)",
      event: "WDA 2026 Competition",
      rpgItem: "Chronicle of the Web Scribes",
      desc: "Advanced to the semifinal round out of numerous developer teams, presenting advanced web architectures and system designs.",
      color: "purple" as const
    },
    {
      title: "Third Prize",
      event: "Vung Tau IT Summer Camp Contest 2023",
      rpgItem: "Summer Crest of Speed",
      desc: "Competed in intensive algorithm camps and secured 3rd place in final programming match trials.",
      color: "gold" as const
    },
    {
      title: "Consolation Prize",
      event: "Dong Nai Informatics Contest 2024",
      rpgItem: "Provincial Seal of Informatics",
      desc: "Recognized for top programming scores in the regional collegiate informatics tournament.",
      color: "slate" as const
    },
    {
      title: "Consolation Prize",
      event: "Dong Nai Informatics Contest 2022",
      rpgItem: "Provincial Seal of Informatics",
      desc: "Awarded high standing in regional informatics competition testing general structures and algorithms.",
      color: "slate" as const
    }
  ];

  // RPG Trophy Room View
  const renderRPG = () => {
    return (
      <section id="achievements" className="py-12 px-4 max-w-5xl mx-auto scroll-mt-20">
        <h2 className="font-press text-sm text-[#ffd700] mb-8 text-center uppercase tracking-widest select-none pixel-text-shadow">
          🏆 THE TROPHY ROOM (RELICS) 🏆
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {honors.map((item, idx) => (
            <PixelCard 
              key={idx} 
              variant={item.color} 
              className="flex flex-col justify-between relative overflow-visible group hover:scale-[1.02] transition-transform"
            >
              <div>
                {/* Visual Relic Icon Display */}
                <div className="w-12 h-12 bg-[#0b0c10] border-2 border-[#ffd700] flex items-center justify-center text-[#ffd700] mb-4 shadow-[0_0_10px_rgba(255,215,0,0.2)]">
                  <Trophy className="w-5 h-5 animate-sparkle" />
                </div>

                <div className="mb-2">
                  <span className="font-press text-[7px] text-[#94a3b8] block uppercase mb-1">
                    RELIC: {item.rpgItem}
                  </span>
                  <h3 className="font-press text-[9px] text-[#ffd700] uppercase leading-relaxed">
                    {item.title}
                  </h3>
                  <p className="font-vt text-base text-zinc-300 font-semibold mt-1">
                    {item.event}
                  </p>
                </div>

                <p className="font-vt text-sm text-zinc-400 mt-2 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-4 pt-2 border-t border-[#2e3440] text-right">
                <PixelBadge variant={item.color}>ACQUIRED</PixelBadge>
              </div>
            </PixelCard>
          ))}
        </div>
      </section>
    );
  };

  // Recruiter Trophy Room View
  const renderRecruiter = () => {
    return (
      <section id="achievements" className="py-12 px-6 max-w-5xl mx-auto scroll-mt-20">
        <div className="mb-8">
          <span className="text-amber-500 text-xs font-semibold uppercase tracking-widest block mb-1">
            Awards & Recognition
          </span>
          <h2 className="text-2xl font-bold text-zinc-100">Achievements</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {honors.map((item, idx) => (
            <div 
              key={idx} 
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 flex items-start gap-4 hover:border-zinc-700 transition-colors"
            >
              <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-lg text-amber-500">
                <Award className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-zinc-100 font-bold text-base leading-snug">{item.title}</h3>
                <span className="text-xs text-amber-500 font-medium block">{item.event}</span>
                <p className="text-zinc-400 text-xs leading-relaxed mt-2">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  };

  return recruiterMode ? renderRecruiter() : renderRPG();
};
