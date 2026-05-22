import React, { useState } from "react";
import { SAVED_RESOURCES } from "../../data/resources";
import { DashboardCard } from "../ui/DashboardCard";
import { DashboardBadge } from "../ui/DashboardBadge";
import { DashboardButton } from "../ui/DashboardButton";
import { BookOpen, Globe, Code, Box, PlayCircle, ExternalLink, Database } from "lucide-react";
import { SavedResource } from "../../types/portfolio";

interface ResourcesProps {
  recruiterMode: boolean;
}

const ResourceCard: React.FC<{
  item: SavedResource;
  typeColors: Record<SavedResource['type'], "blue" | "emerald" | "purple" | "slate" | "red" | "gold" | "cyan" | "violet">;
  typeIcons: Record<SavedResource['type'], React.ComponentType<any>>;
}> = ({ item, typeColors, typeIcons }) => {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = typeIcons[item.type];

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="h-full"
    >
      <DashboardCard 
        variant={typeColors[item.type]} 
        glowing={isHovered}
        className={`flex flex-col justify-between h-full relative overflow-hidden transition-all duration-300 ${
          isHovered ? "-translate-y-1.5" : ""
        }`}
      >
        <div className="z-10">
          <div className="flex justify-between items-start gap-2 border-b border-zinc-800/80 pb-2.5 mb-3">
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 bg-zinc-950 border flex items-center justify-center text-cyan-400 rounded transition-transform duration-300
                ${isHovered ? "border-cyan-400 scale-105 rotate-3" : "border-zinc-800"}`}>
                <Icon className="w-4 h-4" />
              </div>
              <h3 className="font-mono text-xs font-semibold text-zinc-100 uppercase tracking-wide leading-relaxed line-clamp-1">
                {item.title}
              </h3>
            </div>
            <DashboardBadge variant={typeColors[item.type]}>{item.type}</DashboardBadge>
          </div>

          <p className="text-xs text-zinc-400 mb-4 leading-relaxed font-sans">
            {item.note}
          </p>
        </div>

        <div className="z-10">
          {/* Tag List */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {item.tags.map((tag) => (
              <span key={tag} className="font-mono text-[9px] text-cyan-400/80 bg-cyan-950/20 border border-cyan-800/20 rounded px-1.5 py-0.5">
                #{tag}
              </span>
            ))}
          </div>

          <div className="pt-2.5 border-t border-zinc-800/80 flex justify-between items-center">
            <span className="font-mono text-[9px] text-zinc-500">SAVED: {item.savedDate}</span>
            <a 
              href={item.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-mono text-[10px] text-cyan-400 hover:text-cyan-300 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
            >
              ACCESS NODE <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </DashboardCard>
    </div>
  );
};

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
    repo: "cyan" as const,
    blog: "emerald" as const,
    article: "purple" as const,
    tool: "slate" as const,
    video: "red" as const,
    course: "gold" as const,
  };

  // Dashboard Resource Render
  const renderDashboard = () => {
    return (
      <section id="resources" className="py-16 px-4 max-w-5xl mx-auto scroll-mt-20">
        <div className="text-center mb-10">
          <span className="text-cyan-400 font-mono text-xs uppercase tracking-widest block mb-2">
            [SYS_DB] RESOURCE VAULT
          </span>
          <h2 className="text-3xl font-extrabold text-zinc-100 tracking-tight">
            Knowledge Resource Vault
          </h2>
          <p className="text-sm text-zinc-400 mt-2 max-w-xl mx-auto font-mono">
            Sleek bookmark database containing architectural digests, engineering guides, and learning resources.
          </p>
        </div>

        {/* Tag Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {allTags.map((tag) => {
            const active = selectedTag === tag;
            return (
              <DashboardButton
                key={tag}
                variant={active ? "cyan" : "slate"}
                recruiterMode={recruiterMode}
                onClick={() => setSelectedTag(tag)}
                className="font-mono text-[10px] cursor-pointer"
              >
                {tag}
              </DashboardButton>
            );
          })}
        </div>

        {/* Grid List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredResources.map((item, idx) => (
            <ResourceCard key={idx} item={item} typeColors={typeColors} typeIcons={typeIcons} />
          ))}
        </div>
      </section>
    );
  };

  // Recruiter View
  const renderRecruiter = () => {
    return (
      <section id="resources" className="py-16 px-6 max-w-5xl mx-auto scroll-mt-20">
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

  return recruiterMode ? renderRecruiter() : renderDashboard();
};
