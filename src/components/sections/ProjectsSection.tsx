import React, { useState } from "react";
import { Project } from "../../types/portfolio";
import { PixelCard } from "../ui/PixelCard";
import { PixelBadge } from "../ui/PixelBadge";
import { PixelButton } from "../ui/PixelButton";
import { ProjectModal } from "../ui/ProjectModal";
import { Star, GitFork, AlertTriangle, Play, HelpCircle, FileCheck, Layers, Cpu, ShieldAlert, Award } from "lucide-react";

interface ProjectsSectionProps {
  projects: Project[];
  recruiterMode: boolean;
}

type FilterType = "Featured" | "Fullstack" | "Backend" | "Frontend" | "Cloud" | "Algorithms" | "Experiments";

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects, recruiterMode }) => {
  const [activeFilter, setActiveFilter] = useState<FilterType>("Featured");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filters: { label: string; value: FilterType }[] = [
    { label: "⭐ Featured", value: "Featured" },
    { label: "⚙️ Backend", value: "Backend" },
    { label: "🖥️ Frontend", value: "Frontend" },
    { label: "🌐 Full-Stack", value: "Fullstack" },
    { label: "☁️ Cloud / DevOps", value: "Cloud" },
    { label: "🏆 Algorithms", value: "Algorithms" },
    { label: "🧪 Experiments", value: "Experiments" },
  ];

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === "Featured") return project.featured;
    
    const stack = project.techStack.map(s => s.toLowerCase());
    const name = project.id.toLowerCase();
    
    if (activeFilter === "Backend") {
      return stack.includes("go") || stack.includes("golang") || stack.includes("gin") || stack.includes("rabbitmq") || stack.includes("postgres") || stack.includes("postgresql") || stack.includes("redis");
    }
    if (activeFilter === "Frontend") {
      return stack.includes("react") || stack.includes("next.js") || stack.includes("typescript") || stack.includes("vite") || stack.includes("javascript");
    }
    if (activeFilter === "Fullstack") {
      return name === "pocketatlas" || name === "logiquote";
    }
    if (activeFilter === "Cloud") {
      return stack.includes("docker") || stack.includes("devops") || stack.includes("cloud") || stack.includes("rabbitmq");
    }
    if (activeFilter === "Algorithms") {
      return name.includes("anidle") || name.includes("banking") || project.primaryLanguage.toLowerCase() === "c++" || name.includes("interview");
    }
    if (activeFilter === "Experiments") {
      return name === "simple-banking-system" || name === "learning-rabbitmq" || name === "trending-product-api" || name === "anidle";
    }
    return true;
  });

  const difficultyColors = {
    Easy: "emerald",
    Medium: "blue",
    Hard: "gold",
    Expert: "red"
  } as const;

  const statusColors = {
    Completed: "emerald",
    "In Development": "blue",
    Prototype: "gold",
    Archived: "slate",
    Unknown: "slate"
  } as const;

  // RPG Card render
  const renderRPGCard = (project: Project) => {
    return (
      <PixelCard
        key={project.id}
        variant={project.featured ? "gold" : "slate"}
        glowing={project.featured}
        onClick={() => setSelectedProject(project)}
        className="flex flex-col h-full group"
      >
        <div className="flex justify-between items-start gap-2 border-b border-[#2e3440] pb-2 mb-3">
          <div className="flex flex-col gap-1">
            <span className="font-press text-[8px] text-[#4c566a] select-none">
              {project.featured ? "🛡️ MAIN QUEST" : "⚔️ SIDE QUEST"}
            </span>
            <h3 className="font-press text-[10px] text-[#ededed] leading-relaxed uppercase group-hover:text-[#d4af37] transition-colors">
              {project.name}
            </h3>
          </div>
          <div className="flex flex-col items-end gap-1.5">
            <PixelBadge variant={difficultyColors[project.difficulty]}>
              {project.difficulty}
            </PixelBadge>
            <PixelBadge variant={statusColors[project.status]}>
              {project.status}
            </PixelBadge>
          </div>
        </div>

        <p className="font-vt text-base leading-snug text-zinc-400 flex-1 mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Quest Info */}
        <div className="bg-[#0b0c10] p-2 border border-[#2e3440] mb-4 space-y-1 font-vt text-sm text-[#4c566a]">
          <div>
            <span className="text-[#d4af37]">ROLE:</span> <span className="text-zinc-300">{project.role}</span>
          </div>
          {project.stars > 0 && (
            <div className="flex items-center gap-1.5 text-zinc-300">
              <Star className="w-3.5 h-3.5 text-[#d4af37]" /> {project.stars} Stars
            </div>
          )}
        </div>

        {/* Tech Badges */}
        <div className="flex flex-wrap gap-1 mb-3">
          {project.techStack.slice(0, 3).map((tech) => (
            <span key={tech} className="bg-[#1e2230] border border-[#2e3440] px-1.5 py-0.5 font-vt text-xs text-[#00a8ff]">
              {tech}
            </span>
          ))}
          {project.techStack.length > 3 && (
            <span className="text-[#4c566a] font-vt text-xs self-center ml-1">
              +{project.techStack.length - 3} more
            </span>
          )}
        </div>

        <div className="pt-2 border-t border-[#2e3440] text-right">
          <span className="font-press text-[7px] text-[#d4af37] flex items-center justify-end gap-1 group-hover:translate-x-1 transition-transform">
            OPEN JOURNAL &raquo;
          </span>
        </div>
      </PixelCard>
    );
  };

  // Recruiter Card render
  const renderRecruiterCard = (project: Project) => {
    return (
      <div 
        key={project.id}
        onClick={() => setSelectedProject(project)}
        className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-amber-500/50 hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col h-full group"
      >
        <div className="flex justify-between items-start gap-4 mb-3">
          <div>
            <h3 className="text-zinc-100 font-bold text-base group-hover:text-amber-500 transition-colors">
              {project.name}
            </h3>
            <span className="text-xs text-amber-500 font-medium">{project.role}</span>
          </div>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider
            ${project.status === "Completed" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : 
              project.status === "In Development" ? "bg-blue-500/10 text-blue-400 border-blue-500/20" : 
              "bg-amber-500/10 text-amber-400 border-amber-500/20"}`}
          >
            {project.status}
          </span>
        </div>

        <p className="text-xs text-zinc-400 leading-relaxed flex-1 line-clamp-3 mb-4">
          {project.description}
        </p>

        {/* Stats metadata */}
        <div className="flex gap-4 mb-4 text-zinc-500 text-xs font-semibold">
          <span className="flex items-center gap-1">Difficulty: <span className="text-zinc-300 font-bold">{project.difficulty}</span></span>
          {project.stars > 0 && (
            <span className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-amber-500" /> {project.stars}
            </span>
          )}
        </div>

        {/* Stack list */}
        <div className="flex flex-wrap gap-1.5 pt-3 border-t border-zinc-800">
          {project.techStack.map((tech) => (
            <span key={tech} className="bg-zinc-950 border border-zinc-800/80 rounded px-2 py-0.5 text-[10px] text-zinc-400">
              {tech}
            </span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section id="projects" className="py-12 px-4 max-w-6xl mx-auto scroll-mt-20">
      
      {/* Title */}
      <div className="text-center mb-8">
        {recruiterMode ? (
          <>
            <span className="text-amber-500 text-xs font-semibold uppercase tracking-widest block mb-1">
              Technical Case Studies
            </span>
            <h2 className="text-2xl font-bold text-zinc-100">Project Showcase</h2>
          </>
        ) : (
          <>
            <h2 className="font-press text-sm text-[#d4af37] uppercase tracking-widest select-none">
              🗺️ DUNGEON MAP (PROJECTS) 🗺️
            </h2>
            <p className="font-vt text-lg text-[#4c566a] mt-2 select-none">
              Select a dungeon chamber to read its Quest Journal (Mini Case Study)
            </p>
          </>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-8 max-w-3xl mx-auto">
        {filters.map((filter) => {
          const active = activeFilter === filter.value;
          if (recruiterMode) {
            return (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer
                  ${active 
                    ? "bg-amber-500 text-zinc-950 border-amber-500" 
                    : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-zinc-200"
                  }`}
              >
                {filter.label.split(" ").slice(1).join(" ") || filter.label}
              </button>
            );
          } else {
            return (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={`px-2.5 py-1.5 border-2 text-[8px] font-press uppercase select-none transition-all duration-75 cursor-pointer
                  ${active 
                    ? "bg-[#d4af37] text-black border-[#d4af37]" 
                    : "bg-[#151821] text-[#ededed] border-[#4c566a] hover:bg-[#1e2230]"
                  }
                  shadow-[0_-2px_0_-1px_#0b0c10,0_2px_0_-1px_#0b0c10,-2px_0_0_-1px_#0b0c10,2px_0_0_-1px_#0b0c10]
                `}
              >
                {filter.label}
              </button>
            );
          }
        })}
      </div>

      {/* Grid List */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => 
            recruiterMode ? renderRecruiterCard(project) : renderRPGCard(project)
          )}
        </div>
      ) : (
        <div className="text-center py-12">
          {recruiterMode ? (
            <p className="text-zinc-500 text-sm">No projects found matching the active filter.</p>
          ) : (
            <div className="inline-block p-4 border-2 border-dashed border-[#4c566a] font-vt text-lg text-[#4c566a] select-none">
              🔒 DUNGEON IS LOCKED (No matching projects found)
            </div>
          )}
        </div>
      )}

      {/* Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          isOpen={true}
          onClose={() => setSelectedProject(null)}
          recruiterMode={recruiterMode}
        />
      )}
    </section>
  );
};
