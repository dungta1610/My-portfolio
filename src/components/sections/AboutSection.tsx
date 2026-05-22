import React from "react";
import { DashboardCard } from "../ui/DashboardCard";
import { DashboardBadge } from "../ui/DashboardBadge";
import { Compass, Shield, Cpu, BookOpen, Terminal } from "lucide-react";

interface AboutSectionProps {
  recruiterMode: boolean;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ recruiterMode }) => {
  const tools = ["Golang", "TypeScript", "C/C++", "ReactJS", "Next.js", "SQL"];
  
  const strengths = [
    { name: "Problem Solving", desc: "Algorithmic thinking honed via ICPC and Mock exam preparation." },
    { name: "Backend Core Logic", desc: "Designing ACID flows, transaction safety, and clean REST interfaces." },
    { name: "UI System Assembly", desc: "Building responsive Next.js views mapping from Figma components." },
    { name: "API Interfacing", desc: "Integration of event buses, third-party hooks, and LLM structured schemas." },
    { name: "Engineering Docs", desc: "Writing readable readme repositories and architectural blueprints." }
  ];

  // Dashboard / Interactive Mode View
  const renderDashboard = () => {
    return (
      <section id="about" className="py-12 px-4 max-w-5xl mx-auto scroll-mt-20">
        <div className="flex items-center justify-center gap-2 mb-8 select-none">
          <Terminal className="w-5 h-5 text-cyan-400 text-glow-cyan animate-pulse" />
          <h2 className="font-mono text-sm text-cyan-400 text-glow-cyan uppercase tracking-widest text-center">
            // OPERATOR SPECIFICATION MATRIX
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Attributes and Weapons card */}
          <DashboardCard variant="slate" className="space-y-4">
            <h3 className="font-mono text-xs text-rose-400 uppercase border-b border-slate-800 pb-2 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-rose-400" /> SYSTEM TOOLCHAIN (ACTIVE EQUIP)
            </h3>
            
            <p className="text-sm text-slate-300 leading-relaxed">
              These are the core engineering languages and framework components utilized in current active production pipelines:
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2">
              {tools.map((w, idx) => (
                <div key={idx} className="flex items-center gap-2 font-mono text-xs bg-[#05070d]/60 p-2.5 border border-slate-800 rounded">
                  <span className="text-cyan-400 font-bold select-none">&gt;</span>
                  <span className="text-slate-200">{w}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-800">
              <h4 className="font-mono text-[10px] text-cyan-400 uppercase mb-1.5 tracking-wider">
                // SYSTEM CORE EXPANSION
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Currently extending competencies in event-driven backend microservices, containerization workflows, and structural LLM output schemas.
              </p>
            </div>
          </DashboardCard>

          {/* Passive Traits & Strengths Card */}
          <DashboardCard variant="slate" className="space-y-4">
            <h3 className="font-mono text-xs text-emerald-400 uppercase border-b border-slate-800 pb-2 flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-400" /> CORE OPERATIONAL CAPABILITIES
            </h3>
            
            <div className="space-y-3">
              {strengths.map((trait, idx) => (
                <div key={idx} className="bg-[#05070d]/60 p-3 border border-slate-800 rounded">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-mono text-[10px] text-emerald-400 font-bold">{trait.name}</span>
                    <span className="font-mono text-[8px] text-slate-500 uppercase tracking-widest">ACTIVE</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-normal">
                    {trait.desc}
                  </p>
                </div>
              ))}
            </div>
          </DashboardCard>

        </div>
      </section>
    );
  };

  // Recruiter View (Clean Clean CV)
  const renderRecruiter = () => {
    return (
      <section id="about" className="py-12 px-6 max-w-5xl mx-auto scroll-mt-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          
          <div className="md:col-span-1">
            <span className="text-amber-500 text-xs font-semibold uppercase tracking-widest block mb-1">
              Philosophy
            </span>
            <h2 className="text-2xl font-bold text-zinc-100 mb-4">Core Principles</h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              I focus on building production-ready architectures that balance scalability requirements with client-side user experience. My background in competitive programming teaches me to prioritize time and space efficiency in database design and server systems.
            </p>
          </div>

          <div className="md:col-span-2 space-y-6">
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-zinc-200 text-sm font-semibold mb-4 flex items-center gap-2">
                <Compass className="w-4 h-4 text-amber-500" /> Core Competencies
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {strengths.map((trait, idx) => (
                  <div key={idx} className="border-l-2 border-amber-500/50 pl-3">
                    <h4 className="text-zinc-300 font-semibold text-xs">{trait.name}</h4>
                    <p className="text-zinc-500 text-xs mt-1 leading-normal">{trait.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="text-xs text-zinc-400 font-medium mr-2 self-center">Primary Stack:</span>
              {tools.map((tech) => (
                <span 
                  key={tech} 
                  className="bg-zinc-950 border border-zinc-800 rounded px-2.5 py-1 text-xs text-zinc-400"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

        </div>
      </section>
    );
  };

  return recruiterMode ? renderRecruiter() : renderDashboard();
};
