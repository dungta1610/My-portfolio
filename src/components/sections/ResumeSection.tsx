import React, { useEffect, useState } from "react";
import { DashboardCard } from "../ui/DashboardCard";
import { DashboardButton } from "../ui/DashboardButton";
import { Calendar, Briefcase, GraduationCap, FileDown, AlertCircle, Terminal } from "lucide-react";

interface ResumeSectionProps {
  recruiterMode: boolean;
}

export const ResumeSection: React.FC<ResumeSectionProps> = ({ recruiterMode }) => {
  const [resumeMissing, setResumeMissing] = useState(false);

  useEffect(() => {
    // Check if resume.pdf is present in the public folder
    fetch("/resume.pdf", { method: "HEAD" })
      .then((res) => {
        if (!res.ok) {
          setResumeMissing(true);
        }
      })
      .catch(() => {
        setResumeMissing(true);
      });
  }, []);

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

        {/* Warning Banner if resume is missing */}
        {resumeMissing && (
          <div className="mb-6 p-4 border border-rose-500/30 bg-[#12080a] flex items-start gap-3 rounded-lg shadow-[inset_0_0_10px_rgba(244,63,94,0.05)]">
            <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
            <div className="font-mono text-xs text-slate-300">
              <span className="text-rose-400 font-bold block mb-1">WARNING // FILE_NOT_FOUND</span>
              Telemetry source <code className="text-rose-400 font-bold">resume.pdf</code> is missing from target <code className="bg-[#05070d] px-1.5 py-0.5 rounded border border-slate-800 text-[10px]">/public</code> layout.
            </div>
          </div>
        )}

        <div className="space-y-6">
          {experiences.map((exp, idx) => {
            const isEdu = exp.type === "education";
            return (
              <DashboardCard key={idx} variant={isEdu ? "blue" : "slate"} className="relative">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-800 pb-3 mb-4">
                  <div>
                    <h3 className="font-mono text-xs text-cyan-400 font-bold uppercase flex items-center gap-2">
                      {isEdu ? (
                        <GraduationCap className="w-4 h-4 text-cyan-400" />
                      ) : (
                        <Briefcase className="w-4 h-4 text-violet-400" />
                      )}
                      {exp.title}
                    </h3>
                    <p className="text-sm font-semibold text-slate-200 mt-1">
                      {exp.organization}
                    </p>
                  </div>
                  <div className="mt-2 md:mt-0 flex flex-col md:items-end font-mono text-[10px]">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" /> {exp.time}
                    </span>
                    <span className="text-slate-500 mt-0.5">{exp.location}</span>
                  </div>
                </div>

                <ul className="space-y-2 text-sm text-slate-300">
                  {exp.description.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2">
                      <span className="text-cyan-500 font-mono select-none mt-0.5">»</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </DashboardCard>
            );
          })}
        </div>

        {/* Download Action */}
        <div className="mt-8 text-center">
          <a href="/resume.pdf" download="Ta_Duc_Dung_Resume.pdf">
            <DashboardButton variant="gold" className="flex items-center gap-1.5 mx-auto">
              <FileDown className="w-4 h-4" /> Download PDF Resume
            </DashboardButton>
          </a>
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
            {resumeMissing && (
              <span className="text-xs text-red-400 font-medium flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> Place resume.pdf in /public
              </span>
            )}
            <a 
              href="/resume.pdf" 
              download="Ta_Duc_Dung_Resume.pdf"
              className="flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 transition-colors cursor-pointer"
            >
              <FileDown className="w-4 h-4 text-zinc-400" /> Download PDF Resume
            </a>
          </div>
        </div>

        <div className="border-l border-zinc-800 ml-4 pl-8 space-y-10">
          {experiences.map((exp, idx) => {
            const isEdu = exp.type === "education";
            return (
              <div key={idx} className="relative">
                {/* Timeline Dot */}
                <span className={`absolute -left-12 top-1.5 w-8 h-8 rounded-full border border-zinc-900 flex items-center justify-center
                  ${isEdu ? "bg-blue-500/10 text-blue-400" : "bg-zinc-800 text-zinc-400"}`}
                >
                  {isEdu ? <GraduationCap className="w-4 h-4" /> : <Briefcase className="w-4 h-4" />}
                </span>

                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                  <div>
                    <h3 className="text-lg font-bold text-zinc-100">{exp.title}</h3>
                    <p className="text-sm text-zinc-400 mt-0.5">{exp.organization}</p>
                  </div>
                  <div className="mt-1 sm:mt-0 text-xs text-zinc-500 flex flex-col sm:items-end">
                    <span className="font-semibold text-zinc-400">{exp.time}</span>
                    <span className="mt-0.5">{exp.location}</span>
                  </div>
                </div>

                <ul className="list-disc pl-5 mt-3 space-y-1 text-sm text-zinc-400 leading-relaxed">
                  {exp.description.map((bullet, bIdx) => (
                    <li key={bIdx}>{bullet}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>
    );
  };

  return recruiterMode ? renderRecruiter() : renderDashboard();
};
