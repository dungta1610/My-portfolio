import React, { useEffect } from "react";
import { X, ExternalLink, ShieldCheck, Trophy, Sparkles, AlertTriangle } from "lucide-react";
import { Github } from "./Icons";
import { Project } from "../../types/portfolio";
import { PixelBadge } from "./PixelBadge";
import { PixelButton } from "./PixelButton";
import { PixelCard } from "./PixelCard";

interface ProjectModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
  recruiterMode: boolean;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  isOpen,
  onClose,
  recruiterMode,
}) => {
  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isOpen]);

  if (!isOpen) return null;

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

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // RPG Layout Render
  const renderRPGContent = () => {
    return (
      <PixelCard variant="gold" showDragon={true} className="max-h-[85vh] max-w-3xl w-full mx-4 relative p-0 overflow-visible flex flex-col">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 border-2 border-[#94a3b8] bg-[#2e3440] hover:border-[#ff4757] p-1 font-press text-[8px] text-white hover:text-[#ff4757] cursor-pointer z-30
            shadow-[0_-2px_0_-1px_#0b0c10,0_2px_0_-1px_#0b0c10,-2px_0_0_-1px_#0b0c10,2px_0_0_-1px_#0b0c10]"
        >
          [X]
        </button>

        {/* Scrollable Container */}
        <div className="overflow-y-auto p-6 w-full h-full max-h-[calc(85vh-8px)] relative">
          {/* Modal Header */}
          <div className="mb-6 border-b-4 border-[#4c566a] pb-4 pr-8">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <PixelBadge variant={difficultyColors[project.difficulty]}>
                DIFF: {project.difficulty}
              </PixelBadge>
              <PixelBadge variant={statusColors[project.status]}>
                {project.status}
              </PixelBadge>
            </div>
            <h2 className="font-press text-base text-[#ffd700] mb-2 leading-relaxed uppercase select-none">
              ⚔️ QUEST: {project.name}
            </h2>
            <p className="font-vt text-lg text-[#cbd5e1] mt-1">
              <span className="text-[#ff6b81]">ROLE:</span> {project.role}
            </p>
          </div>

          {/* Modal Body */}
          <div className="space-y-6 text-[#ededed]">
            {/* Summary / Overview */}
            <div>
              <h3 className="font-press text-[10px] text-[#ff4757] mb-2 uppercase tracking-wide">
                📜 QUEST BRIEFING
              </h3>
              <p className="font-vt text-lg leading-relaxed text-zinc-150">
                {project.description}
              </p>
            </div>

            {/* Equipped Gear / Tech Stack */}
            <div>
              <h3 className="font-press text-[10px] text-[#00a8ff] mb-2 uppercase tracking-wide">
                🛡️ EQUIPPED GEAR (TECH STACK)
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span 
                    key={tech} 
                    className="bg-[#2e3440] border border-[#4c566a] px-2 py-0.5 font-vt text-base text-[#00a8ff]"
                  >
                    +{tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Main Features / Treasures Found */}
            {project.mainFeatures && project.mainFeatures.length > 0 && (
              <div>
                <h3 className="font-press text-[10px] text-[#2ed573] mb-2 uppercase tracking-wide">
                  💎 LOOT SECURED (KEY FEATURES)
                </h3>
                <ul className="list-none space-y-2 font-vt text-lg pl-1">
                  {project.mainFeatures.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-zinc-150">
                      <span className="text-[#2ed573] select-none">&#9670;</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Architecture Summary */}
            {project.architectureNotes && (
              <div>
                <h3 className="font-press text-[10px] text-[#8e44ad] mb-2 uppercase tracking-wide">
                  🗺️ DUNGEON MAP LAYOUT (ARCHITECTURE)
                </h3>
                <p className="font-vt text-lg leading-relaxed text-zinc-150 bg-[#0b0c10] border-2 border-[#4c566a] p-3">
                  {project.architectureNotes}
                </p>
              </div>
            )}

            {/* Boss Battles / Technical Challenges */}
            {project.technicalChallenges && project.technicalChallenges.length > 0 && (
              <div>
                <h3 className="font-press text-[10px] text-[#ff4757] mb-3 uppercase tracking-wide flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-[#ff4757]" /> BOSS BATTLES (CHALLENGES & SOLUTIONS)
                </h3>
                <div className="space-y-4">
                  {project.technicalChallenges.map((challenge, idx) => (
                    <div 
                      key={idx} 
                      className="border-2 border-[#ff4757]/60 bg-[#1c1214] p-4 shadow-[inset_0_0_10px_rgba(255,71,87,0.1)]"
                    >
                      <h4 className="font-press text-[8px] text-[#ff4757] mb-2 uppercase leading-normal">
                        BOSS: {challenge.title}
                      </h4>
                      <p className="font-vt text-base text-zinc-150 mb-2 leading-relaxed">
                        <span className="text-[#ff6b81] font-semibold">ATTACK:</span> {challenge.description}
                      </p>
                      <p className="font-vt text-base text-[#2ed573] leading-relaxed">
                        <span className="text-[#57e28c] font-semibold">COUNTER-STRATEGY:</span> {challenge.resolution}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Lessons Learned */}
            {project.lessonsLearned && project.lessonsLearned.length > 0 && (
              <div>
                <h3 className="font-press text-[10px] text-[#ffd700] mb-2 uppercase tracking-wide flex items-center gap-1">
                  <Trophy className="w-3.5 h-3.5 text-[#ffd700]" /> GUILD EXPERIENCE GAINED
                </h3>
                <ul className="list-none space-y-1.5 font-vt text-lg pl-1">
                  {project.lessonsLearned.map((lesson, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-zinc-150">
                      <span className="text-[#ffd700] select-none">+</span>
                      <span>{lesson}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Next improvements / Next Quest */}
            {project.nextImprovements && project.nextImprovements.length > 0 && (
              <div>
                <h3 className="font-press text-[10px] text-[#00a8ff] mb-2 uppercase tracking-wide">
                  🔮 NEXT QUESTS (FUTURE IMPROVEMENTS)
                </h3>
                <ul className="list-none space-y-1.5 font-vt text-lg pl-1">
                  {project.nextImprovements.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-zinc-150">
                      <span className="text-[#00a8ff] select-none">&#187;</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Modal Actions */}
          <div className="mt-8 pt-4 border-t-4 border-[#4c566a] flex flex-wrap gap-3">
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              <PixelButton variant="gold" className="flex items-center gap-1.5">
                <Github className="w-3 h-3" /> GitHub
              </PixelButton>
            </a>
            {project.liveDemoUrl ? (
              <a href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer">
                <PixelButton variant="emerald" className="flex items-center gap-1.5">
                  <ExternalLink className="w-3 h-3" /> Live Demo
                </PixelButton>
              </a>
            ) : (
              <PixelButton variant="slate" disabled className="flex items-center gap-1.5 opacity-60">
                <ExternalLink className="w-3 h-3" /> Offline / No Demo
              </PixelButton>
            )}
          </div>
        </div>
      </PixelCard>
    );
  };

  // Recruiter Layout Render
  const renderRecruiterContent = () => {
    return (
      <div className="bg-zinc-900 border border-zinc-800 p-8 max-h-[85vh] overflow-y-auto max-w-3xl w-full mx-4 rounded-xl shadow-2xl relative text-zinc-300 font-sans">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 text-zinc-400 hover:text-zinc-100 p-1 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6 border-b border-zinc-800 pb-4 pr-8">
          <div className="flex items-center gap-3 mb-2">
            <span className={`px-2.5 py-0.5 rounded text-xs font-semibold uppercase tracking-wider
              ${project.status === "Completed" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : 
                project.status === "In Development" ? "bg-blue-500/10 text-blue-400 border border-blue-500/20" : 
                "bg-amber-500/10 text-amber-400 border border-amber-500/20"}`}
            >
              {project.status}
            </span>
            <span className="text-zinc-500 text-xs font-medium">Difficulty: {project.difficulty}</span>
          </div>
          <h2 className="text-2xl font-bold text-zinc-100">{project.name}</h2>
          <p className="text-sm text-amber-500 font-semibold mt-1">Role: {project.role}</p>
        </div>

        {/* Modal Body */}
        <div className="space-y-6">
          {/* Overview */}
          <div>
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-zinc-400" /> Executive Summary
            </h3>
            <p className="text-sm leading-relaxed text-zinc-300">
              {project.description}
            </p>
          </div>

          {/* Tech Stack */}
          <div>
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">
              Technology Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span 
                  key={tech} 
                  className="bg-zinc-800 border border-zinc-700 rounded-md px-2.5 py-1 text-xs text-zinc-300 font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Key Deliverables */}
          {project.mainFeatures && project.mainFeatures.length > 0 && (
            <div>
              <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">
                Key Features & Deliverables
              </h3>
              <ul className="list-disc pl-5 space-y-1.5 text-sm text-zinc-300">
                {project.mainFeatures.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Architecture Notes */}
          {project.architectureNotes && (
            <div>
              <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">
                Architecture & System Design
              </h3>
              <div className="text-sm leading-relaxed text-zinc-300 bg-zinc-950 border border-zinc-800 p-4 rounded-lg">
                {project.architectureNotes}
              </div>
            </div>
          )}

          {/* Boss Battles / Technical Challenges */}
          {project.technicalChallenges && project.technicalChallenges.length > 0 && (
            <div>
              <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-3">
                Technical Challenges & Solutions
              </h3>
              <div className="space-y-4">
                {project.technicalChallenges.map((challenge, idx) => (
                  <div 
                    key={idx} 
                    className="border border-zinc-800 bg-zinc-950/60 p-5 rounded-lg"
                  >
                    <h4 className="text-sm font-semibold text-zinc-200 mb-1 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                      {challenge.title}
                    </h4>
                    <div className="pl-3 mt-2 space-y-2">
                      <p className="text-xs text-zinc-400 leading-relaxed">
                        <span className="font-semibold text-zinc-300">Problem:</span> {challenge.description}
                      </p>
                      <p className="text-xs text-emerald-400 leading-relaxed">
                        <span className="font-semibold text-emerald-500">Solution:</span> {challenge.resolution}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Lessons Learned */}
          {project.lessonsLearned && project.lessonsLearned.length > 0 && (
            <div>
              <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">
                Engineering Takeaways
              </h3>
              <ul className="list-disc pl-5 space-y-1 text-sm text-zinc-300">
                {project.lessonsLearned.map((lesson, idx) => (
                  <li key={idx}>{lesson}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Future Work */}
          {project.nextImprovements && project.nextImprovements.length > 0 && (
            <div>
              <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">
                Planned Enhancements
              </h3>
              <ul className="list-disc pl-5 space-y-1 text-sm text-zinc-300">
                {project.nextImprovements.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Modal Actions */}
        <div className="mt-8 pt-4 border-t border-zinc-800 flex justify-end gap-3">
          {project.liveDemoUrl && (
            <a 
              href={project.liveDemoUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 text-sm rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold transition-colors cursor-pointer"
            >
              <ExternalLink className="w-4 h-4" /> View Live Demo
            </a>
          )}
          <a 
            href={project.githubUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 text-sm rounded-lg border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-semibold transition-colors cursor-pointer"
          >
            <Github className="w-4 h-4" /> View Source Code
          </a>
        </div>
      </div>
    );
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      {recruiterMode ? renderRecruiterContent() : renderRPGContent()}
    </div>
  );
};
