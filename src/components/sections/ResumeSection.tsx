import React, { useEffect, useState } from "react";
import { PixelCard } from "../ui/PixelCard";
import { PixelButton } from "../ui/PixelButton";
import { Calendar, Briefcase, GraduationCap, Award, FileDown, AlertCircle } from "lucide-react";

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

  // RPG View
  const renderRPG = () => {
    return (
      <section id="resume" className="py-12 px-4 max-w-5xl mx-auto scroll-mt-20">
        <h2 className="font-press text-sm text-[#d4af37] mb-8 text-center uppercase tracking-widest select-none">
          📜 GUILD RECORD (JOURNEY TIMELINE) 📜
        </h2>

        {/* Warning Banner if resume is missing */}
        {resumeMissing && (
          <div className="mb-6 p-4 border-2 border-[#ff4757] bg-[#ff4757]/10 flex items-start gap-3 shadow-[0_-2px_0_-1px_#0b0c10,0_2px_0_-1px_#0b0c10,-2px_0_0_-1px_#0b0c10,2px_0_0_-1px_#0b0c10]">
            <AlertCircle className="w-5 h-5 text-[#ff4757] flex-shrink-0 mt-0.5" />
            <div className="font-vt text-lg text-[#ededed]">
              <span className="text-[#ff4757] font-press text-[8px] block mb-1">ALERT: FILE MISSING</span>
              Resume file not added yet. Place <code className="text-[#ff4757]">resume.pdf</code> inside the <code className="bg-[#0b0c10] px-1.5 py-0.5 rounded text-sm">/public</code> directory.
            </div>
          </div>
        )}

        <div className="space-y-6">
          {experiences.map((exp, idx) => {
            const isEdu = exp.type === "education";
            return (
              <PixelCard key={idx} variant={isEdu ? "blue" : "slate"} className="relative">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-[#2e3440] pb-2 mb-3">
                  <div>
                    <h3 className="font-press text-[10px] text-[#d4af37] uppercase flex items-center gap-2">
                      {isEdu ? (
                        <GraduationCap className="w-4 h-4 text-[#00a8ff]" />
                      ) : (
                        <Briefcase className="w-4 h-4 text-[#a0aec0]" />
                      )}
                      {exp.title}
                    </h3>
                    <p className="font-vt text-lg text-zinc-300 mt-1">
                      {exp.organization}
                    </p>
                  </div>
                  <div className="mt-2 md:mt-0 flex flex-col md:items-end">
                    <span className="font-press text-[7px] text-[#4c566a] flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" /> {exp.time}
                    </span>
                    <span className="font-vt text-sm text-[#4c566a] mt-0.5">{exp.location}</span>
                  </div>
                </div>

                <ul className="list-disc pl-5 font-vt text-lg text-zinc-300 space-y-1.5 leading-relaxed">
                  {exp.description.map((bullet, bIdx) => (
                    <li key={bIdx}>{bullet}</li>
                  ))}
                </ul>
              </PixelCard>
            );
          })}
        </div>

        {/* Download Action */}
        <div className="mt-8 text-center">
          <a href="/resume.pdf" download="Ta_Duc_Dung_Resume.pdf">
            <PixelButton variant="gold" className="flex items-center gap-1.5 mx-auto">
              <FileDown className="w-4 h-4 text-black" /> Retrieve Adventurer Scroll (Download CV)
            </PixelButton>
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

  return recruiterMode ? renderRecruiter() : renderRPG();
};
