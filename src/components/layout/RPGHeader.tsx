import React, { useState } from "react";
import { Menu, X, Shield } from "lucide-react";

interface RPGHeaderProps {
  recruiterMode: boolean;
  setRecruiterMode: (val: boolean) => void;
  activeSection: string;
}

export const RPGHeader: React.FC<RPGHeaderProps> = ({
  recruiterMode,
  setRecruiterMode,
  activeSection,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Profile", id: "hero" },
    { label: "Journey", id: "resume" },
    { label: "Dungeons", id: "projects" },
    { label: "Skills", id: "skills" },
    { label: "Trophies", id: "achievements" },
    { label: "Vault", id: "resources" },
    { label: "Logs", id: "blog" },
    { label: "Tavern", id: "contact" },
  ];

  const handleNavClick = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0b0c10]/95 border-b-4 border-[#ffd700] px-4 py-2.5 shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
      <div className="max-w-6xl mx-auto flex flex-row justify-between items-center gap-4">
        
        {/* Desktop Navigation Tabs */}
        <nav className="hidden md:flex flex-row flex-nowrap items-center gap-3 lg:gap-4">
          {navItems.map((item) => {
            const active = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-1.5 md:px-2.5 md:py-1.5 lg:px-4 lg:py-2 border-2 text-[9px] lg:text-[10px] font-press uppercase select-none transition-all duration-75 cursor-pointer whitespace-nowrap
                  ${active 
                    ? "bg-[#ffd700] text-black border-[#ffd700] shadow-[inset_0_0_0_1px_#856404]" 
                    : "bg-[#151821] text-[#ededed] border-[#94a3b8] hover:bg-[#1e2230] hover:border-[#ffd700] active:bg-[#2e3440]"
                  }
                  shadow-[0_-2px_0_-1px_#0b0c10,0_2px_0_-1px_#0b0c10,-2px_0_0_-1px_#0b0c10,2px_0_0_-1px_#0b0c10]
                `}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Mode Switch & Mobile Menu Toggle */}
        <div className="flex items-center gap-2 shrink-0 ml-auto">
          <button
            onClick={() => setRecruiterMode(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 md:px-3 md:py-1.5 lg:px-4 lg:py-2 border-2 font-press text-[9px] lg:text-[10px] uppercase select-none transition-all outline-none duration-75 cursor-pointer hover:-translate-y-0.5 active:translate-y-0.5 bg-[#ffd700] text-black border-[#ffd700] hover:bg-[#fff3a8] active:bg-[#cda300] shadow-[0_-2px_0_-1px_#0b0c10,0_2px_0_-1px_#0b0c10,-2px_0_0_-1px_#0b0c10,2px_0_0_-1px_#0b0c10,inset_0_0_0_1px_#856404]"
          >
            <Shield className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Recruiter Mode</span>
          </button>

          {/* Mobile Hamburger Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 border-2 border-[#94a3b8] bg-[#151821] text-[#ededed] hover:border-[#ffd700] active:bg-[#2e3440]
              shadow-[0_-2px_0_-1px_#0b0c10,0_2px_0_-1px_#0b0c10,-2px_0_0_-1px_#0b0c10,2px_0_0_-1px_#0b0c10]"
          >
            {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-[100%] left-0 right-0 bg-[#0b0c10] border-b-4 border-[#ffd700] p-4 flex flex-col gap-2 shadow-2xl">
          <div className="text-[#94a3b8] font-press text-[8px] uppercase tracking-wider mb-2 border-b border-[#2e3440] pb-1">
            Menu Navigation
          </div>
          {navItems.map((item) => {
            const active = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full py-2.5 px-4 text-left border-2 font-press text-[9px] uppercase tracking-wide
                  ${active
                    ? "bg-[#ffd700] text-black border-[#ffd700]"
                    : "bg-[#151821] text-[#ededed] border-[#94a3b8] hover:bg-[#1e2230]"
                  }
                  shadow-[0_-2px_0_-1px_#0b0c10,0_2px_0_-1px_#0b0c10,-2px_0_0_-1px_#0b0c10,2px_0_0_-1px_#0b0c10]
                `}
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
