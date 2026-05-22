import React, { useState } from "react";
import { Project } from "../../types/portfolio";
import { DashboardCard } from "../ui/DashboardCard";
import { DashboardBadge } from "../ui/DashboardBadge";
import { DashboardButton } from "../ui/DashboardButton";
import { MissionInspection } from "../projects/MissionInspection";
import { Star, Terminal, Layers } from "lucide-react";

interface ProjectsSectionProps {
  projects: Project[];
  recruiterMode: boolean;
  onHoverProjectChange?: (projectId: string | null) => void;
}

type FilterType = "Featured" | "Fullstack" | "Backend" | "Frontend" | "Cloud" | "Algorithms" | "Experiments";

// Sub-component for Dashboard project card
const DashboardProjectCard: React.FC<{
  project: Project;
  onClick: () => void;
  onHover?: (id: string | null) => void;
}> = ({ project, onClick, onHover }) => {
  const [isHovered, setIsHovered] = useState(false);

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

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (onHover) onHover(project.id);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (onHover) onHover(null);
  };

  const handleFocus = () => {
    setIsHovered(true);
    if (onHover) onHover(project.id);
  };

  const handleBlur = () => {
    setIsHovered(false);
    if (onHover) onHover(null);
  };

  return (
    <div
      id={`project-card-${project.id}`}
      data-project-id={project.id}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      tabIndex={0}
      className="h-full focus:outline-none"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <DashboardCard
        variant={project.featured ? "gold" : "slate"}
        glowing={project.featured || isHovered}
        onClick={onClick}
        className={`flex flex-col h-full group transition-all duration-300 relative overflow-hidden ${
          isHovered ? "-translate-y-1.5" : ""
        }`}
      >

        <div className="flex justify-between items-start gap-2 border-b border-slate-800 pb-3 mb-4 z-20">
          <div className="flex flex-col gap-1">
            <span className="font-mono text-[9px] text-slate-500 select-none tracking-wider">
              {project.featured ? "SYS // CRITICAL MISSION" : "SYS // AUXILIARY"}
            </span>
            <h3 className="font-mono text-xs text-slate-100 font-bold uppercase tracking-wider group-hover:text-cyan-400 transition-colors">
              {project.name}
            </h3>
          </div>
          <div className="flex flex-col items-end gap-1.5 shrink-0">
            <DashboardBadge variant={difficultyColors[project.difficulty]}>
              {project.difficulty}
            </DashboardBadge>
            <DashboardBadge variant={statusColors[project.status]}>
              {project.status}
            </DashboardBadge>
          </div>
        </div>

        <p className="text-xs leading-relaxed text-slate-300 flex-1 mb-4 line-clamp-3 z-20">
          {project.description}
        </p>

        {/* Quest Info */}
        <div className="bg-[#05070d]/90 p-3 border border-slate-800/80 rounded-lg mb-4 space-y-1 font-mono text-[10px] text-slate-400 z-20">
          <div>
            <span className="text-cyan-500 font-bold">ROLE:</span> <span className="text-slate-200">{project.role}</span>
          </div>
          {project.stars > 0 && (
            <div className="flex items-center gap-1.5 text-slate-200">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500/10" /> {project.stars} Stars
            </div>
          )}
        </div>

        {/* Tech Badges */}
        <div className="flex flex-wrap gap-1 mb-4 z-20">
          {project.techStack.slice(0, 3).map((tech) => (
            <span key={tech} className="bg-[#0b132b] border border-cyan-500/10 rounded px-2 py-0.5 font-mono text-[10px] text-cyan-400">
              {tech}
            </span>
          ))}
          {project.techStack.length > 3 && (
            <span className="text-slate-500 font-mono text-[10px] self-center ml-1">
              +{project.techStack.length - 3} more
            </span>
          )}
        </div>

        <div className="flex pt-3 border-t border-slate-800 text-right z-20">
          <span className="w-full font-mono text-[10px] text-cyan-400 font-bold tracking-wider flex items-center justify-end gap-1 group-hover:translate-x-1 transition-transform select-none">
            OPEN CASE STUDY //
          </span>
        </div>
      </DashboardCard>
    </div>
  );
};

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects, recruiterMode, onHoverProjectChange }) => {
  const [activeFilter, setActiveFilter] = useState<FilterType>("Featured");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filters: { label: string; value: FilterType }[] = [
    { label: "Featured", value: "Featured" },
    { label: "Backend", value: "Backend" },
    { label: "Frontend", value: "Frontend" },
    { label: "Full-Stack", value: "Fullstack" },
    { label: "Cloud / DevOps", value: "Cloud" },
    { label: "Algorithms", value: "Algorithms" },
    { label: "Experiments", value: "Experiments" },
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

  // Recruiter Card render
  const renderRecruiterCard = (project: Project) => {
    return (
      <div
        key={project.id}
        tabIndex={0}
        onClick={() => setSelectedProject(project)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setSelectedProject(project);
          }
        }}
        onMouseEnter={() => onHoverProjectChange?.(project.id)}
        onMouseLeave={() => onHoverProjectChange?.(null)}
        onFocus={() => onHoverProjectChange?.(project.id)}
        onBlur={() => onHoverProjectChange?.(null)}
        className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-amber-500/50 hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col h-full group focus:outline-none focus:border-amber-500/50"
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
      <div className="text-center mb-8 select-none">
        {recruiterMode ? (
          <>
            <span className="text-amber-500 text-xs font-semibold uppercase tracking-widest block mb-1">
              Technical Case Studies
            </span>
            <h2 className="text-2xl font-bold text-zinc-100">Project Showcase</h2>
          </>
        ) : (
          <>
            <div className="flex items-center justify-center gap-2 mb-2">
              <Layers className="w-5 h-5 text-cyan-400 text-glow-cyan animate-pulse" />
              <h2 className="font-mono text-sm text-cyan-400 text-glow-cyan uppercase tracking-widest text-center">
                // ACTIVE MISSION DIRECTORY
              </h2>
            </div>
            <p className="font-mono text-xs text-slate-500 mt-2">
              Select an operational chamber to examine its Case Study dossier
            </p>
          </>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-8 max-w-3xl mx-auto">
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
                {filter.label}
              </button>
            );
          } else {
            return (
              <DashboardButton
                key={filter.value}
                variant={active ? "blue" : "slate"}
                onClick={() => setActiveFilter(filter.value)}
                className="py-1 px-3"
              >
                {filter.label}
              </DashboardButton>
            );
          }
        })}
      </div>

      {/* Grid List */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => 
            recruiterMode ? (
              renderRecruiterCard(project)
            ) : (
              <DashboardProjectCard 
                key={project.id} 
                project={project} 
                onClick={() => setSelectedProject(project)} 
                onHover={onHoverProjectChange}
              />
            )
          )}
        </div>
      ) : (
        <div className="text-center py-12">
          {recruiterMode ? (
            <p className="text-zinc-500 text-sm">No projects found matching the active filter.</p>
          ) : (
            <div className="inline-block p-4 border border-dashed border-cyan-500/25 rounded-lg font-mono text-xs text-slate-500 select-none">
              [SYSTEM_LOCK // NO MATCHING DATA SIGNALS DETECTED]
            </div>
          )}
        </div>
      )}

      {/* Slide-over Inspector */}
      {selectedProject && (
        <MissionInspection
          project={selectedProject}
          isOpen={true}
          onClose={() => setSelectedProject(null)}
          recruiterMode={recruiterMode}
        />
      )}
    </section>
  );
};
