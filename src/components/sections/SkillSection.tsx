import React, { useState } from "react";
import { DashboardCard } from "../ui/DashboardCard";
import { DashboardBadge } from "../ui/DashboardBadge";
import { DashboardButton } from "../ui/DashboardButton";
import { Lock, Cpu, Code, Database, BookOpen, Settings } from "lucide-react";
import { SkillNode } from "../../types/portfolio";
import { useReactorState } from "../../context/ReactorContext";

interface SkillSectionProps {
  recruiterMode: boolean;
}

export const SkillSection: React.FC<SkillSectionProps> = ({ recruiterMode }) => {
  const [selectedGroup, setSelectedGroup] = useState<string>("All");
  const { setHoveredSkillGroup } = useReactorState();

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
    { label: "ALL NODES", value: "All", icon: Cpu },
    { label: "LANGUAGES & CORE", value: "theory", icon: Code },
    { label: "BACKEND CORE", value: "backend", icon: Settings },
    { label: "DATABASES", value: "database", icon: Database },
    { label: "FRONTEND CORE", value: "frontend", icon: BookOpen },
  ];

  const filteredSkills = selectedGroup === "All"
    ? skills
    : skills.filter(s => s.category === selectedGroup);

  // Dashboard Skill Node Render
  const renderDashboardNode = (skill: SkillNode, idx: number) => {
    if (!skill.unlocked) {
      return (
        <DashboardCard
          key={idx}
          variant="slate"
          glowing={false}
          className="p-4 border-dashed border-zinc-800/60 bg-zinc-950/40 opacity-40 select-none"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Lock className="w-4 h-4 text-rose-500/80" />
              <div>
                <h4 className="font-mono text-xs font-semibold text-zinc-500">
                  {skill.name}
                </h4>
                <span className="font-mono text-[9px] text-rose-500/60 tracking-wider">
                  SYS_ROADMAP
                </span>
              </div>
            </div>
          </div>
        </DashboardCard>
      );
    }

    const levelColors = skill.isMain ? "bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)]" : "bg-violet-500 shadow-[0_0_8px_rgba(139,92,246,0.8)]";

    return (
      <DashboardCard
        key={idx}
        variant={skill.isMain ? "cyan" : "violet"}
        glowing={skill.isMain}
        tabIndex={0}
        onMouseEnter={() => setHoveredSkillGroup(skill.category)}
        onMouseLeave={() => setHoveredSkillGroup(null)}
        onFocus={() => setHoveredSkillGroup(skill.category)}
        onBlur={() => setHoveredSkillGroup(null)}
        className="p-4 select-none relative overflow-hidden group hover:scale-[1.02] transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-cyan-500/50"
      >
        <div className="flex flex-col gap-2.5 z-10">
          <div className="flex items-center justify-between">
            <h4 className={`font-mono text-sm font-semibold tracking-wide ${skill.isMain ? "text-cyan-400" : "text-violet-400"}`}>
              {skill.name}
            </h4>
            {skill.isMain && (
              <DashboardBadge variant="cyan" className="text-[8px] px-1 py-0.5">
                PRIMARY
              </DashboardBadge>
            )}
          </div>
          
          <div className="flex items-center justify-between mt-1">
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 w-3.5 rounded-sm transition-all duration-300 ${
                    i < skill.level ? levelColors : "bg-zinc-800"
                  }`}
                />
              ))}
            </div>
            <span className="font-mono text-[10px] text-zinc-500">
              LVL {skill.level}/5
            </span>
          </div>
        </div>
      </DashboardCard>
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
              {skill.unlocked ? skill.isMain ? "Primary" : "Secondary" : "Roadmap Lock"}
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
    <section id="skills" className="py-16 px-4 max-w-5xl mx-auto scroll-mt-20">
      
      {/* Title */}
      <div className="text-center mb-10">
        {recruiterMode ? (
          <>
            <span className="text-amber-500 text-xs font-semibold uppercase tracking-widest block mb-1">
              Technical Skill Set
            </span>
            <h2 className="text-2xl font-bold text-zinc-100">Capability Matrix</h2>
          </>
        ) : (
          <>
            <span className="text-cyan-400 font-mono text-xs uppercase tracking-widest block mb-2">
              [SYS_TELEMETRY] CAPABILITIES
            </span>
            <h2 className="text-3xl font-extrabold text-zinc-100 tracking-tight">
              Capability Matrix
            </h2>
            <p className="text-sm text-zinc-400 mt-2 max-w-xl mx-auto font-mono">
              Real-time snapshot of programming languages, infrastructure nodes, and system capabilities.
            </p>
          </>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {categories.map((cat) => {
          const IconComponent = cat.icon;
          const active = selectedGroup === cat.value;
          return (
            <DashboardButton
              key={cat.value}
              variant={active ? "cyan" : "slate"}
              recruiterMode={recruiterMode}
              onClick={() => setSelectedGroup(cat.value)}
              onMouseEnter={() => setHoveredSkillGroup(cat.value === "All" ? null : cat.value)}
              onMouseLeave={() => setHoveredSkillGroup(null)}
              onFocus={() => setHoveredSkillGroup(cat.value === "All" ? null : cat.value)}
              onBlur={() => setHoveredSkillGroup(null)}
              className="flex items-center gap-2 cursor-pointer font-mono"
            >
              <IconComponent className="w-3.5 h-3.5" />
              <span>{cat.label}</span>
            </DashboardButton>
          );
        })}
      </div>

      {/* Tree Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredSkills.map((skill, idx) => 
          recruiterMode ? renderRecruiterNode(skill, idx) : renderDashboardNode(skill, idx)
        )}
      </div>

    </section>
  );
};
