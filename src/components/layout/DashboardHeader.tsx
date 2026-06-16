import React, { useState } from "react";
import { Menu, X, Shield, Terminal, Mail } from "lucide-react";
import { Github, Linkedin } from "../ui/Icons";

interface DashboardHeaderProps {
  recruiterMode: boolean;
  setRecruiterMode: (val: boolean) => void;
  activeSection: string;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  recruiterMode,
  setRecruiterMode,
  activeSection,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Navigation items mapping for each mode
  const getNavItems = () => {
    if (recruiterMode) {
      return [
        { label: "Profile", id: "hero" },
        { label: "Experience", id: "resume" },
        { label: "Projects", id: "projects" },
        { label: "Skills", id: "skills" },
        { label: "Achievements", id: "achievements" },
        { label: "Contact", id: "contact" },
      ];
    } else {
      return [
        { label: "Profile", id: "hero" },
        { label: "Timeline", id: "resume" },
        { label: "Missions", id: "projects" },
        { label: "Matrix", id: "skills" },
        { label: "Signals", id: "achievements" },
        { label: "Telemetry", id: "contact" },
      ];
    }
  };

  const navItems = getNavItems();

  const handleNavClick = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      // Calculate offset for header height (approx 72px)
      const offset = 72;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <header 
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        recruiterMode 
          ? "bg-zinc-950/90 border-b border-zinc-800 text-zinc-100 backdrop-blur-md" 
          : "bg-[#05070d]/80 border-b border-cyan-500/10 text-slate-100 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex flex-row items-center justify-between">
        
        {/* Left Side: Navigation Links (without any name or branding per user request) */}
        <nav className="hidden md:flex flex-row items-center gap-6 lg:gap-8">
          {navItems.map((item) => {
            const active = activeSection === item.id;
            if (recruiterMode) {
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  aria-current={active ? "true" : undefined}
                  className={`text-sm font-medium transition-colors hover:text-amber-500 cursor-pointer relative py-1
                    ${active ? "text-amber-500 font-semibold" : "text-zinc-400"}`}
                >
                  {item.label}
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-amber-500 rounded" />
                  )}
                </button>
              );
            } else {
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  aria-current={active ? "true" : undefined}
                  className={`text-xs font-mono tracking-wider uppercase transition-all duration-200 cursor-pointer relative py-1 hover:text-cyan-400
                    ${active ? "text-cyan-400 text-glow-cyan font-bold" : "text-slate-400"}`}
                >
                  {item.label}
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-cyan-400 shadow-[0_0_8px_#06b6d4] rounded" />
                  )}
                </button>
              );
            }
          })}
        </nav>

        {/* Right Side: Contact links, mode switcher, and mobile toggle */}
        <div className="flex items-center gap-4 ml-auto">
          
          {/* Social Icons - only shown in recruiter mode header for quick access */}
          {recruiterMode && (
            <div className="hidden sm:flex items-center gap-4 border-r border-zinc-800 pr-4">
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
          )}

          {/* Mode Switch Button */}
          {recruiterMode ? (
            <button
              onClick={() => setRecruiterMode(false)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-zinc-800 text-zinc-200 border border-zinc-700 text-xs font-medium hover:bg-zinc-700 active:scale-95 transition-all cursor-pointer"
            >
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span>Control Center</span>
            </button>
          ) : (
            <button
              onClick={() => setRecruiterMode(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-cyan-500/20 bg-cyan-500/5 text-cyan-400 text-xs font-mono tracking-wide uppercase hover:bg-cyan-500/10 hover:border-cyan-500/40 active:scale-95 transition-all cursor-pointer shadow-[0_0_12px_rgba(6,182,212,0.05)]"
            >
              <Shield className="w-3.5 h-3.5 text-cyan-400" />
              <span>Recruiter Mode</span>
            </button>
          )}

          {/* Mobile Hamburger Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-nav-drawer"
            className={`md:hidden p-2 rounded-lg transition-colors cursor-pointer border ${
              recruiterMode 
                ? "border-zinc-800 hover:bg-zinc-900 text-zinc-400 hover:text-zinc-200" 
                : "border-cyan-500/15 hover:bg-cyan-500/5 text-slate-400 hover:text-cyan-400"
            }`}
          >
            {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div
          id="mobile-nav-drawer"
          className={`md:hidden absolute top-[100%] left-0 right-0 p-6 flex flex-col gap-3 shadow-2xl border-b ${
            recruiterMode 
              ? "bg-zinc-900 border-zinc-800 text-zinc-100" 
              : "bg-[#070b16] border-cyan-500/10 text-slate-100"
          }`}
        >
          <div className={`text-[10px] uppercase tracking-wider mb-1 pb-1 border-b ${
            recruiterMode ? "border-zinc-800 text-zinc-500" : "border-cyan-500/10 text-slate-500 font-mono"
          }`}>
            Navigation Menu
          </div>
          {navItems.map((item) => {
            const active = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                aria-current={active ? "true" : undefined}
                className={`w-full py-2 px-3 text-left rounded-md transition-all cursor-pointer ${
                  recruiterMode
                    ? active
                      ? "bg-amber-500/10 text-amber-500 font-semibold"
                      : "text-zinc-300 hover:bg-zinc-800"
                    : active
                      ? "bg-cyan-500/10 text-cyan-400 font-bold font-mono"
                      : "text-slate-300 hover:bg-cyan-500/5 font-mono"
                }`}
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
