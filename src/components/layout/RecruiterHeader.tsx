import React, { useState } from "react";
import { Menu, X, Mail, Swords } from "lucide-react";
import { Github, Linkedin } from "../ui/Icons";

interface RecruiterHeaderProps {
  recruiterMode: boolean;
  setRecruiterMode: (val: boolean) => void;
  activeSection: string;
}

export const RecruiterHeader: React.FC<RecruiterHeaderProps> = ({
  recruiterMode,
  setRecruiterMode,
  activeSection,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Profile", id: "hero" },
    { label: "Experience", id: "resume" },
    { label: "Projects", id: "projects" },
    { label: "Skills", id: "skills" },
    { label: "Achievements", id: "achievements" },
    { label: "Resources", id: "resources" },
    { label: "Notes", id: "blog" },
    { label: "Contact", id: "contact" },
  ];

  const handleNavClick = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-zinc-900/90 backdrop-blur-md border-b border-zinc-800 px-6 py-4 shadow-sm text-zinc-100">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        
        {/* Branding */}
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <span className="font-bold text-lg tracking-tight">Ta Duc Dung</span>
            <span className="text-xs text-zinc-400">Software Engineer</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => {
            const active = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-sm font-medium transition-colors hover:text-amber-500 cursor-pointer
                  ${active ? "text-amber-500 font-semibold" : "text-zinc-300"}`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Action Panel */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-3 border-r border-zinc-800 pr-4">
            <a 
              href="mailto:dungta386469@gmail.com" 
              className="text-zinc-400 hover:text-amber-500 transition-colors"
              title="Email Dung"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a 
              href="https://www.linkedin.com/in/d%C5%A9ng-t%E1%BA%A1-417112218/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-zinc-400 hover:text-amber-500 transition-colors"
              title="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a 
              href="https://github.com/dungta1610" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-zinc-400 hover:text-amber-500 transition-colors"
              title="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>

          {/* RPG Switch Toggle */}
          <button
            onClick={() => setRecruiterMode(false)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-amber-500 text-zinc-950 text-xs font-semibold hover:bg-amber-400 active:scale-95 transition-all cursor-pointer shadow-md shadow-amber-500/10"
          >
            <Swords className="w-3.5 h-3.5" />
            <span>RPG Mode</span>
          </button>

          {/* Mobile Menu Icon */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-zinc-400 hover:text-zinc-100"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden absolute top-[100%] left-0 right-0 bg-zinc-900 border-b border-zinc-800 p-6 flex flex-col gap-4 shadow-xl">
          {navItems.map((item) => {
            const active = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left text-sm py-1 font-medium transition-colors hover:text-amber-400
                  ${active ? "text-amber-400 font-semibold" : "text-zinc-300"}`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
