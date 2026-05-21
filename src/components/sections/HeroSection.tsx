import React from "react";
import { Mail, FileText, ArrowRight, Swords } from "lucide-react";
import { Github } from "../ui/Icons";
import { GitHubProfileStats } from "../../types/portfolio";
import { PixelCard } from "../ui/PixelCard";
import { PixelButton } from "../ui/PixelButton";
import { PixelBadge } from "../ui/PixelBadge";
import { PixelCampfire } from "../ui/PixelCampfire";

interface HeroSectionProps {
  stats: GitHubProfileStats | null;
  recruiterMode: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ stats, recruiterMode }) => {
  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // RPG Layout
  const renderRPG = () => {
    return (
      <section id="hero" className="py-12 px-4 max-w-5xl mx-auto">
        <PixelCard variant="gold" glowing className="relative overflow-visible">
          
          {/* Section Indicator */}
          <div className="absolute top-0 right-0 bg-[#ffd700] text-black font-press text-[8px] px-3 py-1 uppercase shadow-md select-none">
            🛡️ ACTIVE HERO
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center mt-4">
            
            {/* Left: Avatar & Pixel Frames */}
            <div className="flex flex-col items-center">
               <PixelCard variant="gold" showDragon={false} className="w-40 h-40 p-0.5 relative group overflow-visible">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={stats?.avatarUrl || "https://avatars.githubusercontent.com/u/86794511?v=4"}
                  alt="Ta Duc Dung Avatar"
                  className="w-full h-full object-cover pixelated"
                />
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 z-20">
                  <PixelBadge variant="gold">LEVEL 20</PixelBadge>
                </div>
              </PixelCard>
              
              <h2 className="font-press text-[12px] text-[#ededed] mt-6 tracking-wide text-center">
                DUNG TA
              </h2>
              <p className="font-vt text-lg text-[#94a3b8] mt-1 text-center select-none">
                &lt;juntaaa / dungta1610&gt;
              </p>

              {/* Cozy Campfire campsite */}
              <div className="mt-6 w-full max-w-[180px] bg-[#10121a]/85 border-2 border-[#4c566a] p-2.5 flex flex-col items-center relative overflow-hidden select-none shadow-[inset_0_0_8px_rgba(0,0,0,0.8)]">
                <div className="font-press text-[7px] text-[#ff4757] uppercase mb-2 animate-pulse tracking-widest text-center">
                  🔥 Resting at Bonfire
                </div>
                <PixelCampfire className="w-full" />
              </div>
            </div>

            {/* Middle: Stats & Attributes */}
            <div className="md:col-span-2 space-y-5">
              <div className="border-b border-[#2e3440] pb-2">
                <h1 className="font-press text-lg md:text-xl text-[#ffd700] pixel-text-shadow tracking-wider uppercase leading-snug">
                  Ta Duc Dung
                </h1>
                <p className="font-press text-[9px] text-[#ff4757] uppercase tracking-wider mt-1 select-none">
                  ⚔️ Software Engineer (Systems & UI)
                </p>
              </div>

              {/* Character Attributes Sheet */}
              <div className="grid grid-cols-2 gap-3 font-vt text-lg bg-[#0b0c10] p-4 border-2 border-[#4c566a]">
                <div>
                  <span className="text-[#94a3b8] uppercase">ATK (Go / C++):</span> <span className="text-white">99/99</span>
                </div>
                <div>
                  <span className="text-[#94a3b8] uppercase">DEF (Next.js):</span> <span className="text-white">88/99</span>
                </div>
                <div>
                  <span className="text-[#94a3b8] uppercase">DEX (Algorithms):</span> <span className="text-white">90/99</span>
                </div>
                <div>
                  <span className="text-[#94a3b8] uppercase">INT (Systems):</span> <span className="text-white">92/99</span>
                </div>
                <div>
                  <span className="text-[#94a3b8] uppercase">REPOS CLEARED:</span> <span className="text-[#ffd700]">{stats?.publicRepos || 14}</span>
                </div>
                <div>
                  <span className="text-[#94a3b8] uppercase">PARTY MEMBERS:</span> <span className="text-[#00a8ff]">{stats?.followers || 4} Followers</span>
                </div>
              </div>

              {/* Bio description */}
              <div className="bg-[#1e2230]/40 p-3.5 border-l-4 border-[#ffd700] font-vt text-lg leading-relaxed text-zinc-150">
                &ldquo;Aspiring Software Engineer focused on problem-solving, scalable systems, and building reliable user interfaces for AI-driven, cloud-based products.&rdquo;
                <div className="mt-2 text-sm text-[#94a3b8]">
                  <span className="text-[#ffd700]">Current Quest:</span> Seeking backend/microservices roles and practical AI integrations.
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 pt-2">
                <PixelButton variant="gold" onClick={() => handleScroll("projects")} className="flex items-center gap-1.5">
                  Enter Dungeons <ArrowRight className="w-3.5 h-3.5" />
                </PixelButton>
                
                <PixelButton variant="slate" onClick={() => handleScroll("resume")}>
                  Guild Records
                </PixelButton>

                <a href="https://github.com/dungta1610" target="_blank" rel="noopener noreferrer">
                  <PixelButton variant="slate" className="flex items-center gap-1.5">
                    <Github className="w-3.5 h-3.5" /> GitHub
                  </PixelButton>
                </a>

                <PixelButton variant="red" onClick={() => handleScroll("contact")}>
                  Meet at Tavern
                </PixelButton>
              </div>

            </div>

          </div>

        </PixelCard>
      </section>
    );
  };

  // Recruiter Layout
  const renderRecruiter = () => {
    return (
      <section id="hero" className="py-16 px-6 max-w-5xl mx-auto">
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 md:p-10 shadow-xl flex flex-col md:flex-row gap-8 items-center">
          
          {/* Left Avatar */}
          <div className="flex flex-col items-center gap-4">
            <div className="w-36 h-36 bg-zinc-800 border border-zinc-700 rounded-full overflow-hidden p-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={stats?.avatarUrl || "https://avatars.githubusercontent.com/u/86794511?v=4"}
                alt="Ta Duc Dung"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="text-center">
              <h2 className="text-lg font-bold text-zinc-100">Ta Duc Dung</h2>
              <p className="text-zinc-500 text-xs mt-0.5">Hanoi/HCM Timezone (VN)</p>
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
                <span className="text-2xl font-bold text-[#00a8ff]">6+</span>
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

  return recruiterMode ? renderRecruiter() : renderRPG();
};
