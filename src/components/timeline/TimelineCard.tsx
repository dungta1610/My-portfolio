"use client";

import React, { useState, useRef, useEffect } from "react";
import { DashboardCard } from "../ui/DashboardCard";
import { Calendar, Briefcase, GraduationCap } from "lucide-react";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

export interface InspectionNode {
  label: string;
  value: string;
  side: "left" | "right";
  topPercent: number; // Anchor point on the card (vertical %)
  nodeY: number;      // Node position (vertical %)
}

interface TimelineCardProps {
  title: string;
  organization: string;
  time: string;
  location: string;
  description: string[];
  type: string; // "job" | "education"
  recruiterMode: boolean;
  inspectionNodes: InspectionNode[];
}

export const TimelineCard: React.FC<TimelineCardProps> = ({
  title,
  organization,
  time,
  location,
  description,
  type,
  recruiterMode,
  inspectionNodes = [],
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isTapped, setIsTapped] = useState(false);
  const cardWrapperRef = useRef<HTMLDivElement>(null);
  
  const prefersReducedMotion = usePrefersReducedMotion();
  
  const isEdu = type === "education";
  const isActive = !recruiterMode && (isHovered || isFocused || isTapped);

  // Close inspection on click/touch outside
  useEffect(() => {
    if (recruiterMode) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (cardWrapperRef.current && !cardWrapperRef.current.contains(event.target as Node)) {
        setIsTapped(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [recruiterMode]);

  const handleCardClick = (e: React.MouseEvent) => {
    if (recruiterMode) return;
    
    // Toggle tapped state for touch screens
    setIsTapped((prev) => !prev);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (recruiterMode) return;
    
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsTapped((prev) => !prev);
    }
  };

  // Recruiter Mode: high-contrast, flat, static layout
  if (recruiterMode) {
    return (
      <div className="relative">
        {/* Timeline Dot */}
        <span className={`absolute -left-12 top-1.5 w-8 h-8 rounded-full border border-zinc-900 flex items-center justify-center
          ${isEdu ? "bg-blue-500/10 text-blue-400" : "bg-zinc-800 text-zinc-400"}`}
          aria-hidden="true"
        >
          {isEdu ? <GraduationCap className="w-4 h-4" /> : <Briefcase className="w-4 h-4" />}
        </span>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
          <div>
            <h3 className="text-lg font-bold text-zinc-100">{title}</h3>
            <p className="text-sm text-zinc-400 mt-0.5">{organization}</p>
          </div>
          <div className="mt-1 sm:mt-0 text-xs text-zinc-500 flex flex-col sm:items-end">
            <span className="font-semibold text-zinc-400">{time}</span>
            <span className="mt-0.5">{location}</span>
          </div>
        </div>

        <ul className="list-disc pl-5 mt-3 space-y-1 text-sm text-zinc-400 leading-relaxed">
          {description.map((bullet, bIdx) => (
            <li key={bIdx}>{bullet}</li>
          ))}
        </ul>

        {/* Flat Static chips at bottom for Recruiter Mode */}
        {inspectionNodes && inspectionNodes.length > 0 && (
          <div className="mt-4 pt-3 border-t border-zinc-800/60 flex flex-wrap gap-2">
            {inspectionNodes.map((node, nIdx) => (
              <div 
                key={nIdx} 
                className="bg-zinc-900 border border-zinc-800 rounded px-2.5 py-0.5 text-[11px] font-mono text-zinc-400"
              >
                <span className="text-zinc-600 mr-1.5">{node.label}:</span>
                <span className="font-semibold text-zinc-200">{node.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Dashboard / Interactive Mode
  const leftNodes = inspectionNodes.filter((node) => node.side === "left");
  const rightNodes = inspectionNodes.filter((node) => node.side === "right");

  return (
    <div
      ref={cardWrapperRef}
      className="relative outline-none group/timeline-card"
      tabIndex={0}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
      onClick={handleCardClick}
      aria-label={`Timeline item: ${title} at ${organization}. Press Enter or Space to toggle system inspection details.`}
    >
      {/* LEFT SIDE HOLOGRAPHIC BRANCHES (Desktop only) */}
      <div 
        className={`hidden lg:block absolute top-0 bottom-0 left-0 w-[140px] -translate-x-full pointer-events-none transition-opacity duration-300 ${
          isActive ? "opacity-100" : "opacity-0"
        }`}
      >
        {isActive && leftNodes.length > 0 && (
          <>
            <svg 
              className="absolute inset-0 w-full h-full pointer-events-none" 
              viewBox="0 0 140 100" 
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {leftNodes.map((node, index) => {
                const lineClass = prefersReducedMotion ? "" : "hologram-line-active";
                const lineStyle = prefersReducedMotion ? {} : { animationDelay: `${index * 0.08}s` };
                
                return (
                  <g key={index}>
                    <path
                      d={`M 140 ${node.topPercent} L 100 ${node.topPercent} L 85 ${node.nodeY} L 15 ${node.nodeY}`}
                      fill="none"
                      stroke={isEdu ? "rgba(6, 182, 212, 0.4)" : "rgba(139, 92, 246, 0.4)"}
                      strokeWidth="1.2"
                      vectorEffect="non-scaling-stroke"
                      className={lineClass}
                      style={lineStyle}
                    />
                    {/* Connection anchor dot at card border */}
                    <circle
                      cx="140"
                      cy={node.topPercent}
                      r="2.5"
                      fill={isEdu ? "#06b6d4" : "#8b5cf6"}
                      className={prefersReducedMotion ? "" : "animate-pulse"}
                    />
                    {/* Node junction terminal dot */}
                    <circle
                      cx="15"
                      cy={node.nodeY}
                      r="2"
                      fill={isEdu ? "#06b6d4" : "#8b5cf6"}
                    />
                  </g>
                );
              })}
            </svg>

            {leftNodes.map((node, index) => {
              const nodeClass = prefersReducedMotion ? "opacity-100" : "hologram-node-active";
              const nodeStyle = prefersReducedMotion 
                ? {} 
                : { animationDelay: `${(index * 0.08) + 0.25}s` };

              return (
                <div
                  key={index}
                  className={`absolute left-0 -translate-y-1/2 pointer-events-auto z-20 ${nodeClass}`}
                  style={{ 
                    top: `${node.nodeY}%`,
                    ...nodeStyle
                  }}
                >
                  <div className={`backdrop-blur-md bg-[#05070d]/90 border rounded px-2 py-1 min-w-[110px] max-w-[125px] shadow-lg transition-all duration-300
                    ${isEdu 
                      ? "border-cyan-500/25 shadow-cyan-950/20 hover:border-cyan-400" 
                      : "border-violet-500/25 shadow-violet-950/20 hover:border-violet-400"
                    }`}
                  >
                    <div className="font-mono text-[7.5px] uppercase tracking-wider text-slate-500 select-none">
                      {node.label}
                    </div>
                    <div className={`text-[9.5px] font-semibold break-words mt-0.5
                      ${isEdu ? "text-cyan-200" : "text-violet-200"}`}
                    >
                      {node.value}
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>

      {/* RIGHT SIDE HOLOGRAPHIC BRANCHES (Desktop only) */}
      <div 
        className={`hidden lg:block absolute top-0 bottom-0 right-0 w-[140px] translate-x-full pointer-events-none transition-opacity duration-300 ${
          isActive ? "opacity-100" : "opacity-0"
        }`}
      >
        {isActive && rightNodes.length > 0 && (
          <>
            <svg 
              className="absolute inset-0 w-full h-full pointer-events-none" 
              viewBox="0 0 140 100" 
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {rightNodes.map((node, index) => {
                const lineClass = prefersReducedMotion ? "" : "hologram-line-active";
                const lineStyle = prefersReducedMotion ? {} : { animationDelay: `${index * 0.08}s` };
                
                return (
                  <g key={index}>
                    <path
                      d={`M 0 ${node.topPercent} L 40 ${node.topPercent} L 55 ${node.nodeY} L 125 ${node.nodeY}`}
                      fill="none"
                      stroke={isEdu ? "rgba(6, 182, 212, 0.4)" : "rgba(139, 92, 246, 0.4)"}
                      strokeWidth="1.2"
                      vectorEffect="non-scaling-stroke"
                      className={lineClass}
                      style={lineStyle}
                    />
                    {/* Connection anchor dot at card border */}
                    <circle
                      cx="0"
                      cy={node.topPercent}
                      r="2.5"
                      fill={isEdu ? "#06b6d4" : "#8b5cf6"}
                      className={prefersReducedMotion ? "" : "animate-pulse"}
                    />
                    {/* Node junction terminal dot */}
                    <circle
                      cx="125"
                      cy={node.nodeY}
                      r="2"
                      fill={isEdu ? "#06b6d4" : "#8b5cf6"}
                    />
                  </g>
                );
              })}
            </svg>

            {rightNodes.map((node, index) => {
              const nodeClass = prefersReducedMotion ? "opacity-100" : "hologram-node-active";
              const nodeStyle = prefersReducedMotion 
                ? {} 
                : { animationDelay: `${(index * 0.08) + 0.25}s` };

              return (
                <div
                  key={index}
                  className={`absolute right-0 -translate-y-1/2 pointer-events-auto z-20 ${nodeClass}`}
                  style={{ 
                    top: `${node.nodeY}%`,
                    ...nodeStyle
                  }}
                >
                  <div className={`backdrop-blur-md bg-[#05070d]/90 border rounded px-2 py-1 min-w-[110px] max-w-[125px] shadow-lg transition-all duration-300
                    ${isEdu 
                      ? "border-cyan-500/25 shadow-cyan-950/20 hover:border-cyan-400" 
                      : "border-violet-500/25 shadow-violet-950/20 hover:border-violet-400"
                    }`}
                  >
                    <div className="font-mono text-[7.5px] uppercase tracking-wider text-slate-500 select-none">
                      {node.label}
                    </div>
                    <div className={`text-[9.5px] font-semibold break-words mt-0.5
                      ${isEdu ? "text-cyan-200" : "text-violet-200"}`}
                    >
                      {node.value}
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>

      {/* CORE TIMELINE CARD */}
      <DashboardCard 
        variant={isEdu ? "blue" : "slate"} 
        glowing={isActive}
        className={`transition-all duration-300 select-none ${
          isActive 
            ? isEdu 
              ? "border-cyan-400/50 shadow-[0_0_20px_rgba(6,182,212,0.15)] scale-[1.01]" 
              : "border-violet-400/50 shadow-[0_0_20px_rgba(139,92,246,0.15)] scale-[1.01]"
            : ""
        } ${isFocused ? "ring-1 ring-cyan-400/30" : ""}`}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-800 pb-3 mb-4">
          <div>
            <h3 className="font-mono text-xs text-cyan-400 font-bold uppercase flex items-center gap-2">
              {isEdu ? (
                <GraduationCap className="w-4 h-4 text-cyan-400" />
              ) : (
                <Briefcase className="w-4 h-4 text-violet-400" />
              )}
              {title}
            </h3>
            <p className="text-sm font-semibold text-slate-200 mt-1">
              {organization}
            </p>
          </div>
          <div className="mt-2 md:mt-0 flex flex-col md:items-end font-mono text-[10px]">
            <span className="text-slate-400 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" /> {time}
            </span>
            <span className="text-slate-500 mt-0.5">{location}</span>
          </div>
        </div>

        <ul className="space-y-2 text-sm text-slate-300">
          {description.map((bullet, bIdx) => (
            <li key={bIdx} className="flex items-start gap-2">
              <span className="text-cyan-500 font-mono select-none mt-0.5">»</span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>

        {/* MOBILE DETAILS CHIP GRID (Mobile only, expansion style) */}
        {isActive && inspectionNodes && inspectionNodes.length > 0 && (
          <div 
            className={`mt-4 pt-3 border-t lg:hidden transition-all duration-300 ${
              prefersReducedMotion ? "" : "animate-hologram-node-fade-in"
            } ${isEdu ? "border-cyan-900/30" : "border-violet-900/30"}`}
          >
            <div className="grid grid-cols-2 gap-2">
              {inspectionNodes.map((node, index) => (
                <div 
                  key={index} 
                  className={`bg-slate-950/60 border rounded p-2 flex flex-col justify-center
                    ${isEdu ? "border-cyan-950 text-cyan-200" : "border-violet-950 text-violet-200"}`}
                >
                  <span className="font-mono text-[7.5px] uppercase tracking-wider text-slate-500 select-none">
                    {node.label}
                  </span>
                  <span className="text-[9.5px] font-semibold truncate mt-0.5">
                    {node.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </DashboardCard>
    </div>
  );
};
