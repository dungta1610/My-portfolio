import React, { useState } from "react";
import { SAVED_RESOURCES } from "../../data/resources";
import { PixelCard } from "../ui/PixelCard";
import { PixelBadge } from "../ui/PixelBadge";
import { BookOpen, Globe, Code, Box, PlayCircle, ExternalLink, Hash, Database } from "lucide-react";

interface ResourcesProps {
  recruiterMode: boolean;
}

export const Resources: React.FC<ResourcesProps> = ({ recruiterMode }) => {
  const [selectedTag, setSelectedTag] = useState<string>("All");

  // Extract all unique tags
  const allTags = ["All", ...Array.from(new Set(SAVED_RESOURCES.flatMap(r => r.tags)))];

  const filteredResources = selectedTag === "All"
    ? SAVED_RESOURCES
    : SAVED_RESOURCES.filter(r => r.tags.includes(selectedTag));

  const typeIcons = {
    repo: Code,
    blog: Globe,
    article: BookOpen,
    tool: Box,
    video: PlayCircle,
    course: Database,
  };

  const typeColors = {
    repo: "blue" as const,
    blog: "emerald" as const,
    article: "purple" as const,
    tool: "slate" as const,
    video: "red" as const,
    course: "gold" as const,
  };

  // RPG Resource Render
  const renderRPG = () => {
    return (
      <section id="resources" className="py-12 px-4 max-w-5xl mx-auto scroll-mt-20">
        <h2 className="font-press text-sm text-[#ffd700] mb-4 text-center uppercase tracking-widest select-none pixel-text-shadow">
          🐉 DRAGON EGG VAULT (RESOURCES) 🐉
        </h2>
        <p className="font-vt text-lg text-[#94a3b8] mb-8 text-center select-none">
          Bookmarks and scrolls saved on my development journey
        </p>

        {/* Tag Filters */}
        <div className="flex flex-wrap justify-center gap-1.5 mb-8">
          {allTags.map((tag) => {
            const active = selectedTag === tag;
            return (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-2 py-1 border-2 text-[8px] font-press uppercase select-none cursor-pointer
                  ${active 
                    ? "bg-[#ffd700] text-black border-[#ffd700]" 
                    : "bg-[#151821] text-[#ededed] border-[#4c566a] hover:bg-[#1e2230]"
                  }
                  shadow-[0_-2px_0_-1px_#0b0c10,0_2px_0_-1px_#0b0c10,-2px_0_0_-1px_#0b0c10,2px_0_0_-1px_#0b0c10]
                `}
              >
                {tag}
              </button>
            );
          })}
        </div>

        {/* Grid List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredResources.map((item, idx) => {
            const Icon = typeIcons[item.type];
            return (
              <PixelCard key={idx} variant={typeColors[item.type]} className="flex flex-col justify-between group">
                <div>
                  <div className="flex justify-between items-start gap-2 border-b border-[#2e3440] pb-2 mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-[#0b0c10] border border-[#ffd700] flex items-center justify-center text-[#ffd700] shadow-sm select-none">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="font-press text-[9px] text-[#ededed] uppercase leading-relaxed line-clamp-1">
                        {item.title}
                      </h3>
                    </div>
                    <PixelBadge variant={typeColors[item.type]}>{item.type}</PixelBadge>
                  </div>

                  <p className="font-vt text-base text-zinc-400 mb-4 leading-relaxed">
                    {item.note}
                  </p>
                </div>

                <div>
                  {/* Tag List */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {item.tags.map((tag) => (
                      <span key={tag} className="font-vt text-xs text-[#ffd700] bg-[#0b0c10] border border-[#2e3440] px-1.5 py-0.5">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-[#2e3440] flex justify-between items-center">
                    <span className="font-vt text-xs text-[#94a3b8]">Saved: {item.savedDate}</span>
                    <a 
                      href={item.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="font-press text-[7px] text-[#ffd700] hover:text-[#ffea7f] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                    >
                      CLAIM ITEM <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>
                </div>
              </PixelCard>
            );
          })}
        </div>
      </section>
    );
  };

  // Recruiter View
  const renderRecruiter = () => {
    return (
      <section id="resources" className="py-12 px-6 max-w-5xl mx-auto scroll-mt-20">
        <div className="mb-8">
          <span className="text-amber-500 text-xs font-semibold uppercase tracking-widest block mb-1">
            Resource Curation
          </span>
          <h2 className="text-2xl font-bold text-zinc-100">Engineering Library</h2>
        </div>

        {/* Tag Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {allTags.map((tag) => {
            const active = selectedTag === tag;
            return (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1 text-xs font-semibold rounded-lg border transition-all cursor-pointer
                  ${active 
                    ? "bg-amber-500 text-zinc-950 border-amber-500" 
                    : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-zinc-200"
                  }`}
              >
                {tag}
              </button>
            );
          })}
        </div>

        {/* List Layout */}
        <div className="space-y-4">
          {filteredResources.map((item, idx) => {
            const Icon = typeIcons[item.type];
            return (
              <div 
                key={idx} 
                className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-zinc-700 transition-colors flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-zinc-950 rounded-lg text-zinc-400 mt-0.5">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-baseline gap-2">
                      <h3 className="text-zinc-200 font-bold text-base">{item.title}</h3>
                      <span className="text-[10px] text-zinc-500 font-semibold uppercase bg-zinc-950 border border-zinc-800 rounded px-1.5">
                        {item.type}
                      </span>
                    </div>
                    <p className="text-zinc-400 text-xs mt-1 max-w-2xl">{item.note}</p>
                    
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {item.tags.map((tag) => (
                        <span key={tag} className="text-[10px] text-zinc-500 font-medium">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <a 
                  href={item.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs font-bold text-amber-500 hover:text-amber-400 transition-colors whitespace-nowrap self-end md:self-auto cursor-pointer"
                >
                  Visit Resource <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            );
          })}
        </div>
      </section>
    );
  };

  return recruiterMode ? renderRecruiter() : renderRPG();
};
