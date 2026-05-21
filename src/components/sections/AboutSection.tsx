import React from "react";
import { PixelCard } from "../ui/PixelCard";
import { PixelBadge } from "../ui/PixelBadge";
import { Compass, Shield, Sword, BookOpen, Star } from "lucide-react";

interface AboutSectionProps {
  recruiterMode: boolean;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ recruiterMode }) => {
  const weapons = ["Golang", "TypeScript", "C/C++", "ReactJS", "Next.js", "SQL"];
  
  const strengths = [
    { name: "Problem Solving", desc: "Algorithmic thinking honed via ICPC and Mock exam preparation." },
    { name: "Backend Core Logic", desc: "Designing ACID flows, transaction safety, and clean REST interfaces." },
    { name: "UI System Assembly", desc: "Building responsive Next.js views mapping from Figma components." },
    { name: "API Interfacing", desc: "Integration of event buses, third-party hooks, and LLM structured schemas." },
    { name: "Engineering Docs", desc: "Writing readable readme repositories and architectural blueprints." }
  ];

  // RPG View
  const renderRPG = () => {
    return (
      <section id="about" className="py-12 px-4 max-w-5xl mx-auto scroll-mt-20">
        <h2 className="font-press text-sm text-[#d4af37] mb-8 text-center uppercase tracking-widest select-none">
          ⚔️ HERO CHARACTER SHEET ⚔️
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Attributes and Weapons card */}
          <PixelCard variant="slate" className="space-y-4">
            <h3 className="font-press text-[10px] text-[#ff4757] uppercase border-b border-[#2e3440] pb-2 flex items-center gap-2">
              <Sword className="w-4 h-4 text-[#ff4757]" /> Equipped Weapons
            </h3>
            
            <p className="font-vt text-lg text-zinc-300 leading-relaxed">
              These are the technical languages and frameworks equipped for active development pipelines:
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2">
              {weapons.map((w, idx) => (
                <div key={idx} className="flex items-center gap-2 font-vt text-lg bg-[#0b0c10] p-2 border border-[#2e3440]">
                  <span className="text-[#d4af37]">&#9733;</span>
                  <span>{w}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-[#2e3440]">
              <h4 className="font-press text-[8px] text-[#00a8ff] uppercase mb-1.5">
                Current Quest Route
              </h4>
              <p className="font-vt text-lg text-zinc-400">
                Gaining deep experience in event-driven backend microservices, containerization workflows, and custom server-side LLM integrations.
              </p>
            </div>
          </PixelCard>

          {/* Passive Traits & Strengths Card */}
          <PixelCard variant="slate" className="space-y-4">
            <h3 className="font-press text-[10px] text-[#2ed573] uppercase border-b border-[#2e3440] pb-2 flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#2ed573]" /> Passive Traits (Strengths)
            </h3>
            
            <div className="space-y-3">
              {strengths.map((trait, idx) => (
                <div key={idx} className="bg-[#0b0c10] p-2.5 border border-[#2e3440]">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-press text-[7px] text-[#2ed573]">{trait.name}</span>
                    <span className="font-press text-[6px] text-[#4c566a]">PASSIVE</span>
                  </div>
                  <p className="font-vt text-base text-zinc-400 leading-tight">
                    {trait.desc}
                  </p>
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
              {weapons.map((tech) => (
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

  return recruiterMode ? renderRecruiter() : renderRPG();
};
