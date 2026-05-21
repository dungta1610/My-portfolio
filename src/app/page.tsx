"use client";

import React, { useState, useEffect } from "react";
import { RPGHeader } from "../components/layout/RPGHeader";
import { RecruiterHeader } from "../components/layout/RecruiterHeader";
import { HeroSection } from "../components/sections/HeroSection";
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
import { PixelCard } from "../components/ui/PixelCard";
import { PixelButton } from "../components/ui/PixelButton";
import { RefreshCw, Swords, ShieldCheck, Heart } from "lucide-react";
import { DungeonBackground } from "../components/ui/DungeonBackground";

export default function Home() {
  const [recruiterMode, setRecruiterMode] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
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
        { threshold: 0.25, rootMargin: "-80px 0px -20%" }
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
      <div className="min-h-screen bg-[#0b0c10] flex items-center justify-center p-6 text-center select-none">
        <div className="space-y-6 max-w-md w-full">
          <div className="font-press text-[12px] text-[#ffd700] animate-pulse">
            ⚔️ SUMMONING ADVENTURER DATA...
          </div>
          <div className="w-full bg-[#151821] border-4 border-[#94a3b8] h-6 p-0.5 relative pixel-border-slate">
            <div className="h-full bg-[#ffd700] animate-[sparkle_1.5s_infinite]" style={{ width: "65%" }} />
          </div>
          <p className="font-vt text-xl text-zinc-400">
            Fetching stats from the GitHub ledger & loading maps
          </p>
        </div>
      </div>
    );
  }

  // Error States
  if (error) {
    return (
      <div className="min-h-screen bg-[#0b0c10] flex items-center justify-center p-6 text-center">
        <PixelCard variant="red" className="max-w-md w-full space-y-4">
          <h2 className="font-press text-[10px] text-[#ff4757] uppercase tracking-wider">
            ❌ SYSTEM BREACH (LOADING ERROR)
          </h2>
          <p className="font-vt text-lg text-zinc-200">
            The server was unable to retrieve data.
            <span className="block text-sm text-[#94a3b8] mt-1">({error})</span>
          </p>
          <div className="pt-2">
            <PixelButton variant="red" onClick={fetchPortfolioData} className="flex items-center gap-1.5 mx-auto">
              <RefreshCw className="w-3.5 h-3.5" /> Retarget Endpoint
            </PixelButton>
          </div>
        </PixelCard>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col relative ${recruiterMode ? "bg-zinc-950 font-sans" : "bg-[#0b0c10] pixel-bg-dungeon"}`}>
      {!recruiterMode && <DungeonBackground />}
      
      {/* Header Selector */}
      {recruiterMode ? (
        <RecruiterHeader 
          recruiterMode={recruiterMode} 
          setRecruiterMode={setRecruiterMode} 
          activeSection={activeSection}
        />
      ) : (
        <RPGHeader 
          recruiterMode={recruiterMode} 
          setRecruiterMode={setRecruiterMode} 
          activeSection={activeSection}
        />
      )}

      {/* Main Sections */}
      <main className="flex-grow pb-24">
        
        {/* Floating recruiter banner in RPG Mode */}
        {!recruiterMode && (
          <div className="max-w-5xl mx-auto px-4 mt-6">
            <div className="bg-[#151821] border-2 border-[#ff4757] p-3 text-center flex flex-col sm:flex-row items-center justify-between gap-3 shadow-[0_-2px_0_-1px_#0b0c10,0_2px_0_-1px_#0b0c10,-2px_0_0_-1px_#0b0c10,2px_0_0_-1px_#0b0c10]">
              <span className="font-press text-[8px] text-[#ff4757] uppercase">
                🛡️ HR COORDINATOR / TECH RECRUITER?
              </span>
              <span className="font-vt text-base text-zinc-300">
                Switch to Recruiter Mode for a clean, direct, print-friendly layout.
              </span>
              <PixelButton variant="red" onClick={() => setRecruiterMode(true)}>
                Engage Shield
              </PixelButton>
            </div>
          </div>
        )}

        {/* Sections */}
        <HeroSection stats={profile} recruiterMode={recruiterMode} />
        <AboutSection recruiterMode={recruiterMode} />
        
        <hr className={recruiterMode ? "border-zinc-900 max-w-5xl mx-auto my-4" : "border-t-4 border-[#2e3440] max-w-5xl mx-auto my-8"} />
        
        <ResumeSection recruiterMode={recruiterMode} />
        
        <hr className={recruiterMode ? "border-zinc-900 max-w-5xl mx-auto my-4" : "border-t-4 border-[#2e3440] max-w-5xl mx-auto my-8"} />
        
        <ProjectsSection projects={repos} recruiterMode={recruiterMode} />
        
        <hr className={recruiterMode ? "border-zinc-900 max-w-5xl mx-auto my-4" : "border-t-4 border-[#2e3440] max-w-5xl mx-auto my-8"} />
        
        <SkillSection recruiterMode={recruiterMode} />
        
        <hr className={recruiterMode ? "border-zinc-900 max-w-5xl mx-auto my-4" : "border-t-4 border-[#2e3440] max-w-5xl mx-auto my-8"} />
        
        <Achievements recruiterMode={recruiterMode} />
        
        <hr className={recruiterMode ? "border-zinc-900 max-w-5xl mx-auto my-4" : "border-t-4 border-[#2e3440] max-w-5xl mx-auto my-8"} />
        
        <Resources recruiterMode={recruiterMode} />
        
        <hr className={recruiterMode ? "border-zinc-900 max-w-5xl mx-auto my-4" : "border-t-4 border-[#2e3440] max-w-5xl mx-auto my-8"} />
        
        <BlogSection recruiterMode={recruiterMode} />
        
        <hr className={recruiterMode ? "border-zinc-900 max-w-5xl mx-auto my-4" : "border-t-4 border-[#2e3440] max-w-5xl mx-auto my-8"} />
        
        <GitHubInsights stats={profile} projects={repos} recruiterMode={recruiterMode} />
        
        <hr className={recruiterMode ? "border-zinc-900 max-w-5xl mx-auto my-4" : "border-t-4 border-[#2e3440] max-w-5xl mx-auto my-8"} />
        
        <ContactSection recruiterMode={recruiterMode} />

      </main>

      {/* Footer */}
      <footer className={`py-8 text-center text-xs tracking-wider border-t
        ${recruiterMode 
          ? "bg-zinc-900 border-zinc-800 text-zinc-500 font-sans" 
          : "bg-[#151821] border-[#ffd700] border-t-4 text-[#94a3b8] font-press text-[7px]"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            &copy; {new Date().getFullYear()} Ta Duc Dung. All Rights Reserved.
          </div>
          <div className="flex items-center gap-1.5 uppercase">
            Built with 
            {recruiterMode ? (
              <Heart className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            ) : (
              <span className="text-[#ff4757]">&#9829;</span>
            )}
            using Next.js + Tailwind CSS
          </div>
        </div>
      </footer>

    </div>
  );
}
