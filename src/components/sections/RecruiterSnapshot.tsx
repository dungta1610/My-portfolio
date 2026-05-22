import React from "react";
import { Mail, Shield, FileDown, Layers, Award, GraduationCap } from "lucide-react";
import { Github, Linkedin } from "../ui/Icons";
import { DashboardCard } from "../ui/DashboardCard";
import { DashboardButton } from "../ui/DashboardButton";
import { DashboardBadge } from "../ui/DashboardBadge";
import { GitHubProfileStats } from "../../types/portfolio";

interface RecruiterSnapshotProps {
  stats: GitHubProfileStats | null;
  recruiterMode: boolean;
  setRecruiterMode: (val: boolean) => void;
}

export const RecruiterSnapshot: React.FC<RecruiterSnapshotProps> = ({
  stats,
  recruiterMode,
  setRecruiterMode,
}) => {
  // If in recruiterMode, we don't need this snapshot banner since the page is already fully optimized
  if (recruiterMode) return null;

  return (
    <div className="max-w-5xl mx-auto px-4 mt-6">
      <DashboardCard 
        variant="cyan" 
        className="bg-[#090d1a]/85 border-cyan-500/20 p-5 shadow-[0_0_20px_rgba(6,182,212,0.05)]"
      >
        <div className="flex flex-col lg:flex-row items-stretch gap-6">
          
          {/* Action Callout */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-cyan-400 text-glow-cyan animate-pulse" />
                <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest text-glow-cyan">
                  Recruiter Fast Track
                </span>
              </div>
              <h3 className="text-base font-semibold text-slate-100 mb-1">
                10-Second Candidate Telemetry
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed max-w-xl">
                Analyzing operator Ta Duc Dung. Switch to Recruiter Mode for a clean, direct, print-friendly CV format, or review the core vitals below.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2.5 mt-4">
              <DashboardButton 
                variant="blue" 
                onClick={() => setRecruiterMode(true)}
                className="flex items-center gap-1.5"
              >
                <Shield className="w-3.5 h-3.5" /> Engage Recruiter Layout
              </DashboardButton>
              
              <a 
                href="/Ta_Duc_Dung_CV.pdf" // Placeholder or actual CV file path
                target="_blank"
                rel="noopener noreferrer"
              >
                <DashboardButton 
                  variant="slate" 
                  className="flex items-center gap-1.5"
                >
                  <FileDown className="w-3.5 h-3.5 text-slate-400" /> Export PDF CV
                </DashboardButton>
              </a>
            </div>
          </div>

          {/* Vitals Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 shrink-0 lg:w-[480px]">
            {/* GPA */}
            <div className="bg-[#060a13] border border-slate-800 rounded-lg p-3 flex flex-col justify-between">
              <div className="flex items-center justify-between text-slate-500 mb-1">
                <span className="text-[10px] font-mono uppercase tracking-wider">Education</span>
                <GraduationCap className="w-3.5 h-3.5 text-cyan-500/60" />
              </div>
              <div>
                <span className="text-lg font-bold text-slate-200">3.6</span>
                <span className="text-[10px] text-slate-500 ml-1">/ 4.0 GPA</span>
              </div>
            </div>

            {/* Repos count */}
            <div className="bg-[#060a13] border border-slate-800 rounded-lg p-3 flex flex-col justify-between">
              <div className="flex items-center justify-between text-slate-500 mb-1">
                <span className="text-[10px] font-mono uppercase tracking-wider">GitHub Index</span>
                <Layers className="w-3.5 h-3.5 text-violet-500/60" />
              </div>
              <div>
                <span className="text-lg font-bold text-slate-200">{stats?.publicRepos || 14}</span>
                <span className="text-[10px] text-slate-500 ml-1">Repositories</span>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-[#060a13] border border-slate-800 rounded-lg p-3 flex flex-col justify-between col-span-2 sm:col-span-1">
              <div className="flex items-center justify-between text-slate-500 mb-1">
                <span className="text-[10px] font-mono uppercase tracking-wider">Credentials</span>
                <Award className="w-3.5 h-3.5 text-amber-500/60" />
              </div>
              <div>
                <span className="text-lg font-bold text-slate-200">5 Major</span>
                <span className="text-[10px] text-slate-500 ml-1">Awards</span>
              </div>
            </div>

            {/* Tech Stack quick snapshot */}
            <div className="col-span-2 bg-[#060a13] border border-slate-800 rounded-lg p-3 flex flex-col justify-between">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-1.5 block">
                Primary Directives
              </span>
              <div className="flex flex-wrap gap-1">
                <DashboardBadge variant="blue">Go</DashboardBadge>
                <DashboardBadge variant="cyan">TypeScript</DashboardBadge>
                <DashboardBadge variant="emerald">Next.js</DashboardBadge>
                <DashboardBadge variant="purple">C++</DashboardBadge>
                <DashboardBadge variant="gold">PostgreSQL</DashboardBadge>
              </div>
            </div>

            {/* Contact Shortcuts */}
            <div className="bg-[#060a13] border border-slate-800 rounded-lg p-3 flex flex-col justify-between">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-1.5 block">
                Comms Link
              </span>
              <div className="flex items-center justify-around gap-2">
                <a 
                  href="mailto:dungta386469@gmail.com" 
                  className="text-slate-400 hover:text-cyan-400 transition-colors p-1"
                  title="Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
                <a 
                  href="https://www.linkedin.com/in/d%C5%A9ng-t%E1%BA%A1-417112218/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-slate-400 hover:text-cyan-400 transition-colors p-1"
                  title="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a 
                  href="https://github.com/dungta1610" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-slate-400 hover:text-cyan-400 transition-colors p-1"
                  title="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>

        </div>
      </DashboardCard>
    </div>
  );
};
