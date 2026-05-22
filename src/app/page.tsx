"use client";

import React, { useState, useEffect } from "react";
import { DashboardHeader } from "../components/layout/DashboardHeader";
import { CommandCenterHero } from "../components/sections/CommandCenterHero";
import { RecruiterSnapshot } from "../components/sections/RecruiterSnapshot";
import { AboutSection } from "../components/sections/AboutSection";
import { ResumeSection } from "../components/sections/ResumeSection";
import { ProjectsSection } from "../components/sections/ProjectsSection";
import { SkillSection } from "../components/sections/SkillSection";
import { Achievements } from "../components/sections/Achievements";
import { Resources } from "../components/sections/Resources";
import { BlogSection } from "../components/sections/BlogSection";
import { GitHubInsights } from "../components/sections/GitHubInsights";
import { ContactSection } from "../components/sections/ContactSection";
import { GitHubProfileStats, Project } from "../types/portfolio";
import { DashboardCard } from "../components/ui/DashboardCard";
import { DashboardButton } from "../components/ui/DashboardButton";
import { RefreshCw, Heart } from "lucide-react";
import { SectionReveal } from "../components/effects/SectionReveal";
import { LivingArchitectureBackground } from "../components/effects/LivingArchitectureBackground";
import { ReactorProvider, useReactorState } from "../context/ReactorContext";

function DashboardContent() {
  const {
    recruiterMode,
    setRecruiterMode,
    activeSection,
    setActiveSection,
    hoveredProjectId,
    setHoveredProjectId,
  } = useReactorState();

  const [profile, setProfile] = useState<GitHubProfileStats | null>(null);
  const [repos, setRepos] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPortfolioData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/github");
      if (!res.ok) {
        throw new Error("Failed to load portfolio stats from server.");
      }
      const data = await res.json();
      setProfile(data.profile);
      setRepos(data.repos);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolioData();
  }, []);

  // Intersection Observer to highlight active navigation tab during scroll
  useEffect(() => {
    const sections = ["hero", "resume", "projects", "skills", "achievements", "resources", "blog", "contact"];
    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { threshold: 0.25, rootMargin: "-72px 0px -20%" }
      );
      observer.observe(el);
      return { observer, el };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) {
          obs.observer.unobserve(obs.el);
        }
      });
    };
  }, [loading, recruiterMode]);

  // Loading States
  if (loading) {
    return (
      <div className="min-h-screen bg-[#05070d] flex items-center justify-center p-6 text-center select-none">
        <div className="space-y-6 max-w-md w-full">
          <div className="font-mono text-xs text-cyan-400 animate-pulse tracking-widest">
            [SYS_INIT] CONNECTING TELEMETRY BUS...
          </div>
          <div className="w-full bg-zinc-950 border border-zinc-800 rounded-lg h-3 p-0.5 relative">
            <div className="h-full rounded bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)] animate-pulse" style={{ width: "65%" }} />
          </div>
          <p className="font-mono text-xs text-zinc-500">
            Retrieving operator metrics from VCS registry
          </p>
        </div>
      </div>
    );
  }

  // Error States
  if (error) {
    return (
      <div className="min-h-screen bg-[#05070d] flex items-center justify-center p-6 text-center">
        <DashboardCard variant="red" className="max-w-md w-full space-y-4">
          <h2 className="font-mono text-xs text-red-500 font-bold uppercase tracking-wider">
            ❌ COMPILATION FAULT (FETCH_ERROR)
          </h2>
          <p className="font-mono text-xs text-zinc-400 leading-relaxed">
            The server was unable to retrieve data packages.
            <span className="block text-[11px] text-zinc-500 mt-1">({error})</span>
          </p>
          <div className="pt-2">
            <DashboardButton variant="red" onClick={fetchPortfolioData} className="flex items-center gap-1.5 mx-auto font-mono text-xs cursor-pointer">
              <RefreshCw className="w-3.5 h-3.5" /> RETARGET_ENDPOINT
            </DashboardButton>
          </div>
        </DashboardCard>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col relative ${recruiterMode ? "bg-zinc-950 font-sans" : "bg-[#05070d]"}`}>
      <LivingArchitectureBackground />
      
      {/* Navigation Header */}
      <DashboardHeader 
        recruiterMode={recruiterMode} 
        setRecruiterMode={setRecruiterMode} 
        activeSection={activeSection}
      />

      {/* Main Content Areas */}
      <main className="flex-grow pb-24">
        
        {/* Recruiter Quick Snapshot Banner */}
        <RecruiterSnapshot 
          stats={profile} 
          recruiterMode={recruiterMode} 
          setRecruiterMode={setRecruiterMode} 
        />

        {/* Content sections */}
        <SectionReveal>
          <CommandCenterHero 
            stats={profile} 
            recruiterMode={recruiterMode} 
            hoveredProjectId={hoveredProjectId} 
            activeSection={activeSection}
          />
        </SectionReveal>
        
        <SectionReveal delay={100}>
          <AboutSection recruiterMode={recruiterMode} />
        </SectionReveal>
        
        <hr className={recruiterMode ? "border-zinc-900 max-w-5xl mx-auto my-6" : "border-zinc-800/40 max-w-5xl mx-auto my-12"} />
        
        <SectionReveal>
          <ResumeSection recruiterMode={recruiterMode} />
        </SectionReveal>
        
        <hr className={recruiterMode ? "border-zinc-900 max-w-5xl mx-auto my-6" : "border-zinc-800/40 max-w-5xl mx-auto my-12"} />
        
        <SectionReveal>
          <ProjectsSection projects={repos} recruiterMode={recruiterMode} onHoverProjectChange={setHoveredProjectId} />
        </SectionReveal>
        
        <hr className={recruiterMode ? "border-zinc-900 max-w-5xl mx-auto my-6" : "border-zinc-800/40 max-w-5xl mx-auto my-12"} />
        
        <SectionReveal>
          <SkillSection recruiterMode={recruiterMode} />
        </SectionReveal>
        
        <hr className={recruiterMode ? "border-zinc-900 max-w-5xl mx-auto my-6" : "border-zinc-800/40 max-w-5xl mx-auto my-12"} />
        
        <SectionReveal>
          <Achievements recruiterMode={recruiterMode} />
        </SectionReveal>
        
        <hr className={recruiterMode ? "border-zinc-900 max-w-5xl mx-auto my-6" : "border-zinc-800/40 max-w-5xl mx-auto my-12"} />
        
        <SectionReveal>
          <Resources recruiterMode={recruiterMode} />
        </SectionReveal>
        
        <hr className={recruiterMode ? "border-zinc-900 max-w-5xl mx-auto my-6" : "border-zinc-800/40 max-w-5xl mx-auto my-12"} />
        
        <SectionReveal>
          <BlogSection recruiterMode={recruiterMode} />
        </SectionReveal>
        
        <hr className={recruiterMode ? "border-zinc-900 max-w-5xl mx-auto my-6" : "border-zinc-800/40 max-w-5xl mx-auto my-12"} />
        
        <SectionReveal>
          <GitHubInsights stats={profile} projects={repos} recruiterMode={recruiterMode} />
        </SectionReveal>
        
        <hr className={recruiterMode ? "border-zinc-900 max-w-5xl mx-auto my-6" : "border-zinc-800/40 max-w-5xl mx-auto my-12"} />
        
        <SectionReveal>
          <ContactSection recruiterMode={recruiterMode} />
        </SectionReveal>

      </main>

      {/* Footer */}
      <footer className={`py-8 text-center text-xs tracking-wider border-t transition-colors duration-300
        ${recruiterMode 
          ? "bg-zinc-900 border-zinc-800 text-zinc-500 font-sans" 
          : "bg-[#090d1a]/80 border-cyan-500/10 text-slate-500 font-mono text-[10px]"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            &copy; {new Date().getFullYear()} Ta Duc Dung. All Rights Reserved.
          </div>
          <div className="flex items-center gap-1.5 uppercase">
            Built with 
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            using Next.js + Tailwind CSS
          </div>
        </div>
      </footer>

    </div>
  );
}

export default function Home() {
  return (
    <ReactorProvider>
      <DashboardContent />
    </ReactorProvider>
  );
}
