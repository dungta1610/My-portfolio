import React from "react";
import Image from "next/image";
import { Mail, FileText, ArrowRight, Terminal, Cpu } from "lucide-react";
import { Github } from "../ui/Icons";
import { GitHubProfileStats } from "../../types/portfolio";
import { DashboardCard } from "../ui/DashboardCard";
import { DashboardButton } from "../ui/DashboardButton";
import { DashboardBadge } from "../ui/DashboardBadge";
import { HolographicSystemCore } from "../effects/HolographicSystemCore";
import { AmbientParticles } from "../effects/AmbientParticles";
import { SafeEffect } from "../effects/SafeEffect";

interface CommandCenterHeroProps {
  stats: GitHubProfileStats | null;
  recruiterMode: boolean;
  hoveredProjectId?: string | null;
  activeSection?: string;
}

export const CommandCenterHero: React.FC<CommandCenterHeroProps> = ({ 
  stats, 
  recruiterMode, 
  hoveredProjectId = null,
  activeSection = "hero"
}) => {
  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 72;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  // Regular Dashboard Layout
  const renderDashboard = () => {
    return (
      <section id="hero" className="py-12 px-4 max-w-5xl mx-auto">
        <DashboardCard variant="blue" glowing className="relative overflow-hidden bg-[#070b16]/75 border-cyan-500/20">
          
          {/* Section Indicator */}
          <div className="absolute top-0 right-0 bg-cyan-500/10 border-b border-l border-cyan-500/20 text-cyan-400 font-mono text-[9px] px-3 py-1 uppercase tracking-widest select-none">
            [SYS_STATUS: ACTIVE]
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mt-4">
            
            {/* Left Column: Profile, Credentials, Bio, Action Buttons */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-5">
              
              {/* Header profile with Avatar */}
              <div className="flex items-center gap-4 select-none">
                <div className="relative group shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500 to-violet-500 rounded-full blur-sm opacity-40 group-hover:opacity-75 transition-opacity duration-300" />
                  <div className="w-20 h-20 bg-[#070b16] border border-cyan-500/20 rounded-full p-1 relative overflow-hidden z-10">
                    <Image
                      src={stats?.avatarUrl || "https://avatars.githubusercontent.com/u/86794511?v=4"}
                      alt="Ta Duc Dung"
                      width={80}
                      height={80}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 z-20">
                    <DashboardBadge variant="blue">OP_NODE: 20</DashboardBadge>
                  </div>
                </div>

                <div>
                  <h1 className="text-xl md:text-2xl font-extrabold text-slate-100 tracking-tight leading-none uppercase">
                    Ta Duc Dung
                  </h1>
                  <p className="font-mono text-[10px] text-rose-400 uppercase tracking-widest mt-1.5 select-none flex items-center gap-1">
                    <Terminal className="w-3 h-3" /> Software Engineer (Systems & UI)
                  </p>
                  <p className="font-mono text-[10px] text-cyan-400 font-bold mt-1 tracking-wider uppercase">
                    DUNG TA // JUNTAAA
                  </p>
                </div>
              </div>

              {/* Attributes metrics sheet */}
              <div className="relative">
                <div className="absolute -top-2 right-3 font-mono text-[8px] text-violet-400/80 bg-[#05070d] border border-violet-500/30 px-1.5 py-0.5 rounded uppercase tracking-widest select-none pointer-events-none z-20">
                  NODE TRACE
                </div>
                <div className="grid grid-cols-2 gap-2 font-mono text-[10px] bg-[#05070d]/60 p-3.5 border border-slate-800 rounded-lg">
                  <div>
                    <span className="text-slate-500 uppercase">SYS_ATK (Go/C++):</span> <span className="text-cyan-400 font-bold ml-1">99/99</span>
                  </div>
                  <div>
                    <span className="text-slate-500 uppercase">UI_DEF (Next.js):</span> <span className="text-cyan-400 font-bold ml-1">88/99</span>
                  </div>
                  <div>
                    <span className="text-slate-500 uppercase">COMP_DEX (Algorithms):</span> <span className="text-cyan-400 font-bold ml-1">90/99</span>
                  </div>
                  <div>
                    <span className="text-slate-500 uppercase">ARCH_INT (Systems):</span> <span className="text-cyan-400 font-bold ml-1">92/99</span>
                  </div>
                  <div>
                    <span className="text-slate-500 uppercase">REPOS_CLEARED:</span> <span className="text-amber-400 font-bold ml-1">{stats?.publicRepos || 14}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 uppercase">PARTY_MEMBERS:</span> <span className="text-violet-400 font-bold ml-1">{stats?.followers || 4} Followers</span>
                  </div>
                </div>
              </div>

              {/* Bio Block */}
              <div className="bg-[#0b132b]/30 p-3.5 border-l-2 border-cyan-500 rounded-r-lg text-xs leading-relaxed text-slate-300">
                &ldquo;Aspiring Software Engineer focused on problem-solving, scalable systems, and building reliable user interfaces for AI-driven, cloud-based products.&rdquo;
                <div className="mt-2 text-[10px] font-mono text-slate-400 flex items-center gap-1">
                  <span className="text-cyan-400 font-bold">Active Directive:</span> Seeking backend/microservices roles and practical AI integrations.
                </div>
              </div>

              {/* System diagnostics panel */}
              <div className="relative">
                <div className="absolute -top-2 right-3 font-mono text-[8px] text-cyan-400/80 bg-[#05070d] border border-cyan-500/30 px-1.5 py-0.5 rounded uppercase tracking-widest select-none pointer-events-none z-20">
                  TELEMETRY
                </div>
                <div className="bg-[#05070d]/90 border border-slate-800 rounded-lg p-3 flex flex-col gap-1.5 relative overflow-hidden select-none">
                  <div className="flex items-center gap-1.5 font-mono text-[9px] text-cyan-400 uppercase tracking-wider border-b border-slate-800 pb-1.5">
                    <Cpu className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                    <span>Diagnostics</span>
                  </div>
                  <div className="font-mono text-[10px] space-y-1 text-slate-400">
                    <div className="flex justify-between">
                      <span>CPU_LOAD:</span>
                      <span className="text-emerald-400 font-bold">12%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>CORE_TEMP:</span>
                      <span className="text-emerald-400 font-bold">41°C</span>
                    </div>
                    <div className="flex justify-between">
                      <span>SYS_CORE:</span>
                      <span className="text-cyan-400 font-bold">STABLE</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2 pt-1">
                <DashboardButton variant="blue" onClick={() => handleScroll("projects")} className="flex items-center gap-1.5 text-xs py-1.5 px-3">
                  Missions <ArrowRight className="w-3 h-3" />
                </DashboardButton>
                
                <DashboardButton variant="slate" onClick={() => handleScroll("resume")} className="text-xs py-1.5 px-3">
                  Timeline
                </DashboardButton>

                <a href="https://github.com/dungta1610" target="_blank" rel="noopener noreferrer">
                  <DashboardButton variant="slate" className="flex items-center gap-1.5 text-xs py-1.5 px-3">
                    <Github className="w-3.5 h-3.5" /> GitHub
                  </DashboardButton>
                </a>

                <DashboardButton variant="red" onClick={() => handleScroll("contact")} className="text-xs py-1.5 px-3">
                  Signal
                </DashboardButton>
              </div>
            </div>

            {/* Right Column: 3D Hologram */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              
              {/* Interactive 3D Core Hologram (visual container) */}
              <div className="w-full bg-[#05070d]/30 border border-slate-800/80 rounded-xl relative overflow-hidden h-[480px] shrink-0" id="hologram-core-container">
                {/* Slow pulsing radial projection glow backdrop */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.06)_0%,transparent_75%)] animate-hologram-pulse-slow pointer-events-none z-0" />
                
                {/* HUD corner framing brackets */}
                <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-cyan-500/30 pointer-events-none z-10" />
                <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-cyan-500/30 pointer-events-none z-10" />
                <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-cyan-500/30 pointer-events-none z-10" />
                <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-cyan-500/30 pointer-events-none z-10" />

                {/* Floating HUD labels */}
                <div className="absolute top-4 left-4 font-mono text-[8px] text-cyan-400/40 uppercase tracking-widest pointer-events-none z-10 select-none">
                  [SYS.STATUS: ACTIVE]
                </div>
                <div className="absolute top-4 right-4 font-mono text-[8px] text-cyan-400/40 uppercase tracking-widest pointer-events-none z-10 select-none flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-cyan-500 animate-pulse" />
                  <span>CORE ACTIVE</span>
                </div>
                <div className="absolute bottom-4 left-4 font-mono text-[8px] text-slate-500/60 uppercase tracking-widest pointer-events-none z-10 select-none">
                  ARCH VIEW // DUNG_CTL
                </div>

                <SafeEffect>
                  <AmbientParticles
                    recruiterMode={recruiterMode}
                    activeSection={activeSection}
                    hoveredProjectId={hoveredProjectId}
                  />
                  <HolographicSystemCore
                    active={true}
                    hoveredProjectId={hoveredProjectId}
                    activeSection={activeSection}
                  />
                </SafeEffect>
              </div>
            </div>

          </div>

        </DashboardCard>
      </section>
    );
  };

  // Recruiter Layout (Clean Minimalist Form)
  const renderRecruiter = () => {
    return (
      <section id="hero" className="py-16 px-6 max-w-5xl mx-auto">
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 md:p-10 shadow-xl flex flex-col md:flex-row gap-8 items-center">
          
          {/* Left Avatar */}
          <div className="flex flex-col items-center gap-4">
            <div className="w-36 h-36 bg-zinc-800 border border-zinc-700 rounded-full overflow-hidden p-1">
              <Image
                src={stats?.avatarUrl || "https://avatars.githubusercontent.com/u/86794511?v=4"}
                alt="Ta Duc Dung"
                width={144}
                height={144}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="text-center">
              <h2 className="text-lg font-bold text-zinc-100">Ta Duc Dung</h2>
              <p className="text-zinc-500 text-xs mt-0.5 font-medium">Hanoi/HCM Timezone (VN)</p>
            </div>
          </div>

          {/* Right Bio & Core Credentials */}
          <div className="flex-1 space-y-6">
            <div>
              <span className="text-amber-500 text-xs font-semibold uppercase tracking-widest block mb-1">
                Candidate Profile
              </span>
              <h1 className="text-3xl md:text-4xl font-extrabold text-zinc-100 tracking-tight leading-tight">
                Software Engineer
              </h1>
              <p className="text-zinc-400 text-sm mt-2 font-medium leading-relaxed">
                Aspiring Software Engineer focused on problem-solving, building scalable microservices, database optimizations, and clean Next.js/React frontends.
              </p>
            </div>

            {/* Metrics cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-3.5 text-center">
                <span className="text-2xl font-bold text-zinc-200">{stats?.publicRepos || 14}</span>
                <p className="text-zinc-500 text-[10px] uppercase font-semibold mt-1">Repositories</p>
              </div>
              <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-3.5 text-center">
                <span className="text-2xl font-bold text-emerald-400">3.6<span className="text-zinc-500 text-sm">/4.0</span></span>
                <p className="text-zinc-500 text-[10px] uppercase font-semibold mt-1">GPA</p>
              </div>
              <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-3.5 text-center">
                <span className="text-2xl font-bold text-blue-400">6+</span>
                <p className="text-zinc-500 text-[10px] uppercase font-semibold mt-1">Languages</p>
              </div>
              <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-3.5 text-center">
                <span className="text-2xl font-bold text-purple-400">5</span>
                <p className="text-zinc-500 text-[10px] uppercase font-semibold mt-1">Achievements</p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 pt-2">
              <button 
                onClick={() => handleScroll("projects")}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-amber-500 text-zinc-950 font-bold hover:bg-amber-400 active:scale-95 transition-all text-sm cursor-pointer"
              >
                View Case Studies
              </button>

              <button 
                onClick={() => handleScroll("resume")}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-lg border border-zinc-700 bg-zinc-800 text-zinc-100 hover:bg-zinc-700 transition-colors text-sm cursor-pointer"
              >
                <FileText className="w-4 h-4 text-zinc-400" /> Professional Experience
              </button>

              <a 
                href="https://github.com/dungta1610" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-zinc-800 bg-zinc-950 hover:bg-zinc-900 text-zinc-300 hover:text-zinc-100 transition-colors text-sm cursor-pointer"
              >
                <Github className="w-4 h-4" /> GitHub
              </a>
            </div>
          </div>

        </div>
      </section>
    );
  };

  return recruiterMode ? renderRecruiter() : renderDashboard();
};
