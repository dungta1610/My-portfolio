import React, { useState } from "react";
import { DashboardCard } from "../ui/DashboardCard";
import { DashboardBadge } from "../ui/DashboardBadge";
import { Trophy, Award, Shield, Cpu, Terminal } from "lucide-react";

interface AchievementsProps {
  recruiterMode: boolean;
}

const SignalCard: React.FC<{ item: any; idx: number }> = ({ item, idx }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="h-full"
    >
      <DashboardCard 
        variant={item.color} 
        glowing={isHovered}
        className="flex flex-col justify-between h-full relative overflow-hidden transition-all duration-300 hover:-translate-y-1"
      >
        <div className="z-10">
          {/* Cybernetic Icon Display */}
          <div className={`w-12 h-12 bg-zinc-950/80 border flex items-center justify-center mb-4 transition-all duration-300 rounded-lg relative overflow-hidden
            ${isHovered 
              ? "border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)] scale-105" 
              : "border-zinc-800 shadow-[0_0_8px_rgba(0,0,0,0.3)]"
            }`}
          >
            {item.color === "gold" ? (
              <Trophy className={`w-5 h-5 transition-transform duration-300 text-amber-400 ${isHovered ? "scale-110 rotate-6" : ""}`} />
            ) : item.color === "purple" ? (
              <Cpu className={`w-5 h-5 transition-transform duration-300 text-violet-400 ${isHovered ? "scale-110" : ""}`} />
            ) : (
              <Award className={`w-5 h-5 transition-transform duration-300 text-cyan-400 ${isHovered ? "scale-110" : ""}`} />
            )}
            
            {/* Sliding diagonal shine layer */}
            <div className={`absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full rotate-45 transition-transform duration-700 ${isHovered ? "translate-x-full" : ""}`} />
          </div>

          <div className="mb-2">
            <span className="font-mono text-[9px] text-zinc-500 block uppercase tracking-wider mb-1">
              SYS_SIGNAL: {item.signalCode}
            </span>
            <h3 className="font-mono text-xs font-bold text-zinc-100 uppercase tracking-wide leading-relaxed">
              {item.title}
            </h3>
            <p className="text-sm text-zinc-300 font-semibold mt-1">
              {item.event}
            </p>
          </div>

          <p className="text-xs text-zinc-400 mt-2 leading-relaxed font-sans">
            {item.desc}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between z-10">
          <span className="font-mono text-[9px] text-zinc-600">VERIFIED</span>
          <DashboardBadge variant={item.color}>ACQUIRED</DashboardBadge>
        </div>
      </DashboardCard>
    </div>
  );
};

export const Achievements: React.FC<AchievementsProps> = ({ recruiterMode }) => {
  const honors = [
    {
      title: "Honorable Mention",
      event: "ICPC Vietnam National Programming Contest 2022",
      signalCode: "ICPC_VN_NAT_22",
      desc: "Ranked among top teams in the national collegiate programming contest solving complex algorithmic challenges under strict time limits.",
      color: "blue" as const
    },
    {
      title: "Top 23 Teams (Semifinalist)",
      event: "WDA 2026 Competition",
      signalCode: "WDA_SEMIFINAL_26",
      desc: "Advanced to the semifinal round out of numerous developer teams, presenting advanced web architectures and system designs.",
      color: "purple" as const
    },
    {
      title: "Third Prize",
      event: "Vung Tau IT Summer Camp Contest 2023",
      signalCode: "VT_CAMP_PRIZE_23",
      desc: "Competed in intensive algorithm camps and secured 3rd place in final programming match trials.",
      color: "gold" as const
    },
    {
      title: "Consolation Prize",
      event: "Dong Nai Informatics Contest 2024",
      signalCode: "DN_INF_CONTEST_24",
      desc: "Recognized for top programming scores in the regional collegiate informatics tournament.",
      color: "slate" as const
    },
    {
      title: "Consolation Prize",
      event: "Dong Nai Informatics Contest 2022",
      signalCode: "DN_INF_CONTEST_22",
      desc: "Awarded high standing in regional informatics competition testing general structures and algorithms.",
      color: "slate" as const
    }
  ];

  // Dashboard Signals View
  const renderDashboard = () => {
    return (
      <section id="achievements" className="py-16 px-4 max-w-5xl mx-auto scroll-mt-20">
        <div className="text-center mb-10">
          <span className="text-cyan-400 font-mono text-xs uppercase tracking-widest block mb-2">
            [SYS_LOGS] VERIFIED CREDENTIALS
          </span>
          <h2 className="text-3xl font-extrabold text-zinc-100 tracking-tight">
            Signals & Achievements
          </h2>
          <p className="text-sm text-zinc-400 mt-2 max-w-xl mx-auto font-mono">
            Cryptographic signatures of algorithmic performance, design competitions, and collegiate honors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {honors.map((item, idx) => (
            <SignalCard key={idx} item={item} idx={idx} />
          ))}
        </div>
      </section>
    );
  };

  // Recruiter View
  const renderRecruiter = () => {
    return (
      <section id="achievements" className="py-16 px-6 max-w-5xl mx-auto scroll-mt-20">
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

  return recruiterMode ? renderRecruiter() : renderDashboard();
};
