import React, { useState } from "react";
import { Menu, X, Shield, Swords } from "lucide-react";
import { PixelButton } from "../ui/PixelButton";

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
    <header className="sticky top-0 z-40 bg-[#0b0c10]/95 border-b-4 border-[#d4af37] px-4 py-3 shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-stretch gap-4">
        
        {/* RPG Character Status HUD */}
        <div className="flex items-center gap-3 bg-[#151821] p-3 pixel-border-slate border-[#4c566a]">
          <div className="w-10 h-10 bg-[#2e3440] border-2 border-[#d4af37] flex items-center justify-center text-[#d4af37] text-lg font-press select-none">
            D
          </div>
          <div className="flex-1 min-w-[200px]">
            <div className="flex justify-between items-baseline">
              <span className="font-press text-[10px] text-[#d4af37]">TA DUC DUNG</span>
              <span className="font-press text-[8px] text-[#4c566a]">LV. 28</span>
            </div>
            <div className="font-press text-[8px] text-[#2ed573] mb-1.5 mt-0.5">CLASS: SOFTWARE ENGINEER</div>
            
            {/* HP Bar (GPA: 3.6/4.0 -> 90%) */}
            <div className="flex items-center gap-1.5 mb-1">
              <span className="font-press text-[7px] text-[#ff4757] w-4">HP</span>
              <div className="flex-1 h-3 bg-[#0b0c10] border border-[#ff4757] p-0.5 relative">
                <div 
                  className="h-full bg-[#ff4757]" 
                  style={{ width: "90%" }}
                />
                <span className="absolute inset-0 flex items-center justify-center font-press text-[7px] text-white">
                  3.6 / 4.0 GPA
                </span>
              </div>
            </div>
            
            {/* MP Bar (Languages count: 6/6 -> 100%) */}
            <div className="flex items-center gap-1.5">
              <span className="font-press text-[7px] text-[#00a8ff] w-4">MP</span>
              <div className="flex-1 h-3 bg-[#0b0c10] border border-[#00a8ff] p-0.5 relative">
                <div 
                  className="h-full bg-[#00a8ff]" 
                  style={{ width: "100%" }}
                />
                <span className="absolute inset-0 flex items-center justify-center font-press text-[7px] text-white">
                  99 / 99 MP
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation & Controls */}
        <div className="flex flex-row md:flex-col lg:flex-row justify-between items-center md:items-end lg:items-center gap-3">
          
          {/* Desktop Navigation Tabs */}
          <nav className="hidden md:flex flex-wrap gap-2">
            {navItems.map((item) => {
              const active = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-1.5 border-2 text-[9px] font-press uppercase select-none transition-all duration-75 cursor-pointer
                    ${active 
                      ? "bg-[#d4af37] text-black border-[#d4af37] shadow-[inset_0_0_0_1px_#5a450c]" 
                      : "bg-[#151821] text-[#ededed] border-[#4c566a] hover:bg-[#1e2230] hover:border-[#d4af37] active:bg-[#2e3440]"
                    }
                    shadow-[0_-2px_0_-1px_#0b0c10,0_2px_0_-1px_#0b0c10,-2px_0_0_-1px_#0b0c10,2px_0_0_-1px_#0b0c10]
                  `}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Mode Switch Button */}
          <div className="flex items-center gap-2">
            <PixelButton
              variant="gold"
              onClick={() => setRecruiterMode(true)}
              className="flex items-center gap-1.5 border-2"
            >
              <Shield className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Recruiter Mode</span>
            </PixelButton>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 border-2 border-[#4c566a] bg-[#151821] text-[#ededed] hover:border-[#d4af37] active:bg-[#2e3440]
                shadow-[0_-2px_0_-1px_#0b0c10,0_2px_0_-1px_#0b0c10,-2px_0_0_-1px_#0b0c10,2px_0_0_-1px_#0b0c10]"
            >
              {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-[100%] left-0 right-0 bg-[#0b0c10] border-b-4 border-[#d4af37] p-4 flex flex-col gap-2 shadow-2xl">
          <div className="text-[#4c566a] font-press text-[8px] uppercase tracking-wider mb-2 border-b border-[#2e3440] pb-1">
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
                    ? "bg-[#d4af37] text-black border-[#d4af37]"
                    : "bg-[#151821] text-[#ededed] border-[#4c566a] hover:bg-[#1e2230]"
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
