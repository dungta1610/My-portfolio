"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { HologramMode } from "../lib/effects/hologramModes";
import { Project } from "../types/portfolio";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

interface ReactorContextType {
  activeSection: string;
  hoveredProjectId: string | null;
  hoveredSkillGroup: string | null;
  inspectingProject: Project | null;
  recruiterMode: boolean;
  reducedMotion: boolean;
  currentMode: HologramMode;
  terminalSceneOverride: HologramMode | null;
  setActiveSection: (section: string) => void;
  setHoveredProjectId: (id: string | null) => void;
  setHoveredSkillGroup: (group: string | null) => void;
  setInspectingProject: (project: Project | null) => void;
  setRecruiterMode: (mode: boolean) => void;
  setTerminalSceneOverride: (mode: HologramMode | null) => void;
}

const ReactorContext = createContext<ReactorContextType | undefined>(undefined);

export const ReactorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeSection, setActiveSection] = useState("hero");
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);
  const [hoveredSkillGroup, setHoveredSkillGroup] = useState<string | null>(null);
  const [inspectingProject, setInspectingProject] = useState<Project | null>(null);
  const [recruiterMode, setRecruiterMode] = useState(false);
  const [terminalSceneOverride, setTerminalSceneOverride] = useState<HologramMode | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  // Resolve active mode based on the priority matrix
  const getResolvedMode = (): HologramMode => {
    if (recruiterMode) {
      return "recruiter";
    }

    // Terminal override has higher priority than visual hovers
    if (terminalSceneOverride) {
      return terminalSceneOverride;
    }

    // Inspecting Project takes high priority
    if (inspectingProject) {
      const pId = inspectingProject.id.toLowerCase();
      if (pId === "stockflow" || pId === "token-transfer-monitor" || pId === "simple-banking-system") {
        return "stockflow";
      }
      if (pId === "pocketatlas" || pId === "logiquote") {
        return "pocketAtlas";
      }
      return "github";
    }

    // Hovered Project takes priority
    if (hoveredProjectId) {
      const pId = hoveredProjectId.toLowerCase();
      if (pId === "stockflow" || pId === "token-transfer-monitor" || pId === "simple-banking-system") {
        return "stockflow";
      }
      if (pId === "pocketatlas" || pId === "logiquote") {
        return "pocketAtlas";
      }
      return "github";
    }

    // Hovered Skill Group takes priority
    if (hoveredSkillGroup) {
      const group = hoveredSkillGroup.toLowerCase();
      if (group === "backend" || group === "database") {
        return "skills";
      }
      if (group === "frontend") {
        return "skills";
      }
      if (group === "cloud" || group === "tool") {
        return "skills";
      }
      if (group === "ai") {
        return "skills";
      }
      if (group === "github" || group === "theory") {
        return "github";
      }
    }

    // Section Scroll fallback
    switch (activeSection) {
      case "projects":
        return "stockflow";
      case "skills":
        return "skills";
      case "achievements":
        return "github";
      case "contact":
        return "contact";
      case "hero":
      case "resume":
      default:
        return "idle";
    }
  };

  const currentMode = getResolvedMode();

  return (
    <ReactorContext.Provider
      value={{
        activeSection,
        hoveredProjectId,
        hoveredSkillGroup,
        inspectingProject,
        recruiterMode,
        reducedMotion,
        currentMode,
        terminalSceneOverride,
        setActiveSection,
        setHoveredProjectId,
        setHoveredSkillGroup,
        setInspectingProject,
        setRecruiterMode,
        setTerminalSceneOverride,
      }}
    >
      {children}
    </ReactorContext.Provider>
  );
};

export const useReactorState = () => {
  const context = useContext(ReactorContext);
  if (!context) {
    throw new Error("useReactorState must be used within a ReactorProvider");
  }
  return context;
};
