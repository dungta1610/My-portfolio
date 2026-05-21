import React, { useState } from "react";
import { PixelCard } from "../ui/PixelCard";
import { PixelBadge } from "../ui/PixelBadge";
import { Check, Lock, Cpu, Sparkles, Database, Code, BookOpen, Settings } from "lucide-react";
import { SkillNode } from "../../types/portfolio";

interface SkillSectionProps {
  recruiterMode: boolean;
}

export const SkillSection: React.FC<SkillSectionProps> = ({ recruiterMode }) => {
  const [selectedGroup, setSelectedGroup] = useState<string>("All");

  const skills: SkillNode[] = [
    // Languages
    { name: "Golang", level: 5, category: "backend", isMain: true, unlocked: true },
    { name: "TypeScript", level: 4, category: "frontend", isMain: true, unlocked: true },
    { name: "C/C++", level: 4, category: "theory", isMain: true, unlocked: true },
    { name: "SQL", level: 4, category: "database", isMain: true, unlocked: true },
    { name: "JavaScript", level: 4, category: "frontend", isMain: false, unlocked: true },
    { name: "Python", level: 3, category: "theory", isMain: false, unlocked: true },
    
    // Frontend
    { name: "ReactJS", level: 4, category: "frontend", isMain: true, unlocked: true },
    { name: "NextJS", level: 4, category: "frontend", isMain: true, unlocked: true },
    { name: "Tailwind CSS", level: 4, category: "frontend", isMain: false, unlocked: true },
    { name: "REST API Integration", level: 4, category: "frontend", isMain: false, unlocked: true },
    
    // Backend & DB
    { name: "Gin (HTTP)", level: 4, category: "backend", isMain: false, unlocked: true },
    { name: "PostgreSQL", level: 4, category: "database", isMain: true, unlocked: true },
    { name: "Redis", level: 4, category: "database", isMain: false, unlocked: true },
    { name: "RabbitMQ", level: 4, category: "backend", isMain: true, unlocked: true },
    { name: "Microservices", level: 3, category: "backend", isMain: false, unlocked: true },
    
    // Tools & Theory
    { name: "Docker", level: 3, category: "tool", isMain: false, unlocked: true },
    { name: "Git & GitHub", level: 4, category: "tool", isMain: false, unlocked: true },
    { name: "Algorithms & CP", level: 5, category: "theory", isMain: true, unlocked: true },
    { name: "AI/LLM Integration", level: 3, category: "ai", isMain: false, unlocked: true },
    { name: "Documentation", level: 4, category: "tool", isMain: false, unlocked: true },

    // Locked nodes (future research path)
    { name: "Kubernetes", level: 1, category: "tool", isMain: false, unlocked: false },
    { name: "Distributed Systems", level: 1, category: "theory", isMain: false, unlocked: false }
  ];

  const categories = [
    { label: "All nodes", value: "All", icon: Cpu },
    { label: "Languages & Core", value: "theory", icon: Code },
    { label: "Backend Core", value: "backend", icon: Settings },
    { label: "Databases", value: "database", icon: Database },
    { label: "Frontend Core", value: "frontend", icon: BookOpen },
  ];

  const filteredSkills = selectedGroup === "All"
    ? skills
    : skills.filter(s => s.category === selectedGroup);

  // RPG Skill Node Render
  const renderRPGNode = (skill: SkillNode, idx: number) => {
    if (!skill.unlocked) {
      return (
        <div 
          key={idx}
          className="p-3 relative border-4 flex items-center justify-between bg-[#0b0c10] border-[#2e3440] opacity-45 shadow-[inset_0_0_8px_rgba(0,0,0,0.8)] select-none"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-5 h-5 flex items-center justify-center">
              <Lock className="w-3.5 h-3.5 text-[#ff4757]" />
            </div>
            <div>
              <h4 className="font-press text-[9px] text-[#ededed]">
                {skill.name}
              </h4>
              <div className="flex gap-0.5 mt-1">
                <span className="font-press text-[7px] text-[#ff4757] uppercase tracking-tight">
                  LOCKED
                </span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <PixelCard 
        key={idx}
        variant={skill.isMain ? "gold" : "slate"}
        showDragon={false}
        className="p-3 flex items-center justify-between transition-all select-none"
      >
        <div className="flex items-center gap-2.5">
          {/* Unlock symbol */}
          <div className="w-5 h-5 flex items-center justify-center">
            <span className={`font-press text-[8px] ${skill.isMain ? "text-[#ffd700]" : "text-[#2ed573]"}`}>
              &#9670;
            </span>
          </div>
          <div>
            <h4 className={`font-press text-[9px] ${skill.isMain ? "text-[#ffd700]" : "text-[#ededed]"}`}>
              {skill.name}
            </h4>
            <div className="flex gap-0.5 mt-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <span 
                  key={i} 
                  className={`font-press text-[7px] ${i < skill.level ? "text-[#ffd700]" : "text-[#94a3b8]"}`}
                >
                  &#9733;
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Floating Indicator */}
        {skill.isMain && (
          <span className="absolute -top-2.5 -right-2 bg-[#ff4757] text-white font-press text-[6px] px-1 py-0.5 uppercase tracking-wide shadow-md z-20">
            MASTER
          </span>
        )}
      </PixelCard>
    );
  };

  // Recruiter Skill Node Render
  const renderRecruiterNode = (skill: SkillNode, idx: number) => {
    return (
      <div 
        key={idx}
        className={`bg-zinc-900 border p-4 rounded-xl flex items-center justify-between
          ${skill.unlocked 
            ? skill.isMain 
              ? "border-amber-500/30 bg-amber-500/[0.02]" 
              : "border-zinc-800"
            : "border-zinc-950 opacity-40"
          }`}
      >
        <div className="flex-1">
          <div className="flex justify-between items-baseline mb-1.5">
            <span className={`text-sm font-semibold ${skill.isMain ? "text-zinc-100" : "text-zinc-300"}`}>
              {skill.name}
            </span>
            <span className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider">
              {skill.unlocked ? skill.isMain ? "Primary" : "Secondary" : "Planned Quest"}
            </span>
          </div>

          {skill.unlocked ? (
            <div className="h-1.5 w-full bg-zinc-950 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full ${skill.isMain ? "bg-amber-500" : "bg-zinc-600"}`}
                style={{ width: `${(skill.level / 5) * 100}%` }}
              />
            </div>
          ) : (
            <div className="flex items-center gap-1 text-[10px] text-zinc-500">
              <Lock className="w-3 h-3 text-red-500" /> Learning Roadmap
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <section id="skills" className="py-12 px-4 max-w-5xl mx-auto scroll-mt-20">
      
      {/* Title */}
      <div className="text-center mb-8">
        {recruiterMode ? (
          <>
            <span className="text-amber-500 text-xs font-semibold uppercase tracking-widest block mb-1">
              Technical Skill Set
            </span>
            <h2 className="text-2xl font-bold text-zinc-100">Capability Matrix</h2>
          </>
        ) : (
          <>
            <h2 className="font-press text-sm text-[#ffd700] uppercase tracking-widest select-none pixel-text-shadow">
              🌲 ACTIVE SKILL TREE 🌲
            </h2>
            <p className="font-vt text-lg text-[#94a3b8] mt-2 select-none">
              Explore capabilities and upcoming unlocks in the tech stack
            </p>
          </>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map((cat) => {
          const IconComponent = cat.icon;
          const active = selectedGroup === cat.value;
          if (recruiterMode) {
            return (
              <button
                key={cat.value}
                onClick={() => setSelectedGroup(cat.value)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer
                  ${active
                    ? "bg-amber-500 text-zinc-950 border-amber-500"
                    : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-zinc-200"
                  }`}
              >
                <IconComponent className="w-3.5 h-3.5" />
                {cat.label}
              </button>
            );
          } else {
            return (
              <button
                key={cat.value}
                onClick={() => setSelectedGroup(cat.value)}
                className={`px-3 py-1.5 border-2 text-[8px] font-press uppercase select-none transition-all duration-75 cursor-pointer
                  ${active
                    ? "bg-[#ffd700] text-black border-[#ffd700]"
                    : "bg-[#151821] text-[#ededed] border-[#4c566a]"
                  }
                  shadow-[0_-2px_0_-1px_#0b0c10,0_2px_0_-1px_#0b0c10,-2px_0_0_-1px_#0b0c10,2px_0_0_-1px_#0b0c10]
                `}
              >
                {cat.label}
              </button>
            );
          }
        })}
      </div>

      {/* Tree Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredSkills.map((skill, idx) => 
          recruiterMode ? renderRecruiterNode(skill, idx) : renderRPGNode(skill, idx)
        )}
      </div>

    </section>
  );
};
