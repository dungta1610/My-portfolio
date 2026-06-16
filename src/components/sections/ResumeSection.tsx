import React from "react";
import { DashboardButton } from "../ui/DashboardButton";
import { FileDown, Clock, Terminal } from "lucide-react";
import { TimelineCard } from "../timeline/TimelineCard";
import { RESUME_PATH, useResumeAvailable } from "../../hooks/useResumeAvailable";

interface ResumeSectionProps {
  recruiterMode: boolean;
}

export const ResumeSection: React.FC<ResumeSectionProps> = ({ recruiterMode }) => {
  const resumeAvailable = useResumeAvailable();

  const experiences = [
    {
      type: "job",
      title: "Frontend Developer",
      organization: "Bull ’N Bear – Web3 Token Launchpad",
      time: "March 2026 – Present",
      location: "Ho Chi Minh City, Vietnam",
      description: [
        "Contributed to a trial-released Web3 token launchpad supporting meme-token discovery, launch, and trading.",
        "Refactored Figma-based interfaces into fully responsive screens using React, Next.js, TypeScript, and Tailwind CSS.",
        "Integrated API-driven frontend flows, handling loading, error, and user-facing data states in a production-like codebase."
      ],
      inspectionNodes: [
        { label: "Role", value: "Frontend Dev", side: "left" as const, topPercent: 20, nodeY: 15 },
        { label: "Stack", value: "Next.js / TS", side: "left" as const, topPercent: 50, nodeY: 45 },
        { label: "Styling", value: "Tailwind CSS", side: "left" as const, topPercent: 80, nodeY: 75 },
        { label: "Domain", value: "Web3 Launchpad", side: "right" as const, topPercent: 30, nodeY: 25 },
        { label: "Task", value: "Figma UI Refactor", side: "right" as const, topPercent: 70, nodeY: 65 }
      ]
    },
    {
      type: "education",
      title: "B.S. in Information Technology, English Program",
      organization: "University of Science - VNUHCM",
      time: "Expected Graduation: May 2028",
      location: "Ho Chi Minh City, Vietnam",
      description: [
        "GPA: 3.6 / 4.0",
        "Deepening knowledge in data structures, algorithms, databases, computer networks, and system designs."
      ],
      inspectionNodes: [
        { label: "Degree", value: "B.S. in IT", side: "left" as const, topPercent: 25, nodeY: 20 },
        { label: "GPA", value: "3.6 / 4.0", side: "left" as const, topPercent: 75, nodeY: 70 },
        { label: "Focus", value: "Data & Systems", side: "right" as const, topPercent: 30, nodeY: 25 },
        { label: "Target", value: "Grad: May 2028", side: "right" as const, topPercent: 70, nodeY: 65 }
      ]
    },
    {
      type: "job",
      title: "Specialist Advisor",
      organization: "The Gifted Battlefield",
      time: "July 2022 – June 2023",
      location: "Ho Chi Minh City, Vietnam",
      description: [
        "Contributed to Competitive Programming training materials.",
        "Prepared problems for the 2023 PTNK (High School for the Gifted) mock entrance exam."
      ],
      inspectionNodes: [
        { label: "Role", value: "Advisor", side: "left" as const, topPercent: 30, nodeY: 25 },
        { label: "Topic", value: "Competitive Prog", side: "left" as const, topPercent: 70, nodeY: 65 },
        { label: "Output", value: "Mock Exam Prep", side: "right" as const, topPercent: 50, nodeY: 45 }
      ]
    }
  ];

  // Dashboard / Interactive Mode View
  const renderDashboard = () => {
    return (
      <section id="resume" className="py-12 px-4 max-w-5xl mx-auto scroll-mt-20">
        <div className="flex items-center justify-center gap-2 mb-8 select-none">
          <Terminal className="w-5 h-5 text-cyan-400 text-glow-cyan animate-pulse" />
          <h2 className="font-mono text-sm text-cyan-400 text-glow-cyan uppercase tracking-widest text-center">
            // TELEMETRY LOGS // CAREER TIMELINE
          </h2>
        </div>

        <div className="space-y-6">
          {experiences.map((exp, idx) => (
            <TimelineCard
              key={idx}
              title={exp.title}
              organization={exp.organization}
              time={exp.time}
              location={exp.location}
              description={exp.description}
              type={exp.type}
              recruiterMode={false}
              inspectionNodes={exp.inspectionNodes}
            />
          ))}
        </div>

        {/* Download Action — only offered when the file actually exists */}
        <div className="mt-8 text-center">
          {resumeAvailable === true ? (
            <a href={RESUME_PATH} download="Ta_Duc_Dung_Resume.pdf">
              <DashboardButton variant="gold" className="flex items-center gap-1.5 mx-auto">
                <FileDown className="w-4 h-4" /> Download PDF Resume
              </DashboardButton>
            </a>
          ) : (
            <DashboardButton
              variant="slate"
              disabled
              title="Resume coming soon"
              className="flex items-center gap-1.5 mx-auto"
            >
              <Clock className="w-4 h-4" /> Resume Coming Soon
            </DashboardButton>
          )}
        </div>
      </section>
    );
  };

  // Recruiter View
  const renderRecruiter = () => {
    return (
      <section id="resume" className="py-12 px-6 max-w-5xl mx-auto scroll-mt-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-baseline mb-8">
          <div>
            <span className="text-amber-500 text-xs font-semibold uppercase tracking-widest block mb-1">
              Employment & Credentials
            </span>
            <h2 className="text-2xl font-bold text-zinc-100">Professional Timeline</h2>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-3">
            {resumeAvailable === true ? (
              <a
                href={RESUME_PATH}
                download="Ta_Duc_Dung_Resume.pdf"
                className="flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 transition-colors cursor-pointer"
              >
                <FileDown className="w-4 h-4 text-zinc-400" /> Download PDF Resume
              </a>
            ) : (
              <span
                title="Resume coming soon"
                className="flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-500 cursor-not-allowed"
              >
                <Clock className="w-4 h-4 text-zinc-600" /> Resume Coming Soon
              </span>
            )}
          </div>
        </div>

        <div className="border-l border-zinc-800 ml-4 pl-8 space-y-10">
          {experiences.map((exp, idx) => (
            <TimelineCard
              key={idx}
              title={exp.title}
              organization={exp.organization}
              time={exp.time}
              location={exp.location}
              description={exp.description}
              type={exp.type}
              recruiterMode={true}
              inspectionNodes={exp.inspectionNodes}
            />
          ))}
        </div>
      </section>
    );
  };

  return recruiterMode ? renderRecruiter() : renderDashboard();
};
