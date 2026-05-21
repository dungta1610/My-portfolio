import React, { useState } from "react";
import { Mail, FileDown, Send, CornerDownRight, CheckCircle } from "lucide-react";
import { Github, Linkedin } from "../ui/Icons";
import { PixelCard } from "../ui/PixelCard";
import { PixelButton } from "../ui/PixelButton";
import { PixelBadge } from "../ui/PixelBadge";

interface ContactSectionProps {
  recruiterMode: boolean;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ recruiterMode }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    
    setLoading(true);
    // Simulate sending message
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      setName("");
      setEmail("");
      setMessage("");
      // Reset success message after 5 seconds
      setTimeout(() => setSent(false), 5000);
    }, 1500);
  };

  // RPG View
  const renderRPG = () => {
    return (
      <section id="contact" className="py-12 px-4 max-w-5xl mx-auto scroll-mt-20">
        <h2 className="font-press text-sm text-[#d4af37] mb-4 text-center uppercase tracking-widest select-none">
          🍺 THE TAVERN (GUILD HALL) 🍺
        </h2>
        <p className="font-vt text-lg text-[#4c566a] mb-8 text-center select-none">
          Leave a message on the tavern board or summon me directly
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          
          {/* Summon Coordinates */}
          <PixelCard variant="slate" className="space-y-5">
            <h3 className="font-press text-[10px] text-[#ff4757] uppercase border-b border-[#2e3440] pb-2">
              📜 SUMMONING COORDINATES
            </h3>

            <div className="space-y-4 font-vt text-lg text-zinc-300">
              <p>
                Summon a message carrier or join the party via these scrolls:
              </p>

              <a 
                href="mailto:dungta386469@gmail.com" 
                className="flex items-center gap-3 p-3 bg-[#0b0c10] border border-[#2e3440] hover:border-[#d4af37] transition-all group"
              >
                <Mail className="w-5 h-5 text-[#ff4757] group-hover:scale-110 transition-transform" />
                <div>
                  <span className="text-xs text-[#4c566a] block uppercase font-press text-[7px]">Carrier Mail</span>
                  <span className="text-[#ededed] font-mono text-base">dungta386469@gmail.com</span>
                </div>
              </a>

              <a 
                href="https://www.linkedin.com/in/d%C5%A9ng-t%E1%BA%A1-417112218/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-3 p-3 bg-[#0b0c10] border border-[#2e3440] hover:border-[#d4af37] transition-all group"
              >
                <Linkedin className="w-5 h-5 text-[#00a8ff] group-hover:scale-110 transition-transform" />
                <div>
                  <span className="text-xs text-[#4c566a] block uppercase font-press text-[7px]">Guild Link</span>
                  <span className="text-zinc-200">linkedin.com/in/dung-ta</span>
                </div>
              </a>

              <a 
                href="https://github.com/dungta1610" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-3 p-3 bg-[#0b0c10] border border-[#2e3440] hover:border-[#d4af37] transition-all group"
              >
                <Github className="w-5 h-5 text-[#ededed] group-hover:scale-110 transition-transform" />
                <div>
                  <span className="text-xs text-[#4c566a] block uppercase font-press text-[7px]">Scroll Vault</span>
                  <span className="text-zinc-200">github.com/dungta1610</span>
                </div>
              </a>
            </div>

            <div className="pt-4 border-t border-[#2e3440] text-center">
              <a href="/resume.pdf" download="Ta_Duc_Dung_Resume.pdf">
                <PixelButton variant="gold" className="w-full">
                  Get Character Scroll (CV)
                </PixelButton>
              </a>
            </div>
          </PixelCard>

          {/* Contact Form */}
          <PixelCard variant="gold">
            <h3 className="font-press text-[10px] text-[#d4af37] uppercase border-b border-[#2e3440] pb-2 mb-4">
              ✍️ PIN MESSAGE ON BOARD
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-press text-[8px] text-[#4c566a] uppercase mb-1.5">
                  Adventurer Name
                </label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="e.g. Sir Galahad"
                  className="w-full p-2.5 bg-[#0b0c10] border-2 border-[#4c566a] font-vt text-lg text-white focus:border-[#d4af37] outline-none
                    shadow-[inset_0_0_8px_rgba(0,0,0,0.8)]"
                />
              </div>

              <div>
                <label className="block font-press text-[8px] text-[#4c566a] uppercase mb-1.5">
                  Sender Return Address (Email)
                </label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="galahad@camelot.org"
                  className="w-full p-2.5 bg-[#0b0c10] border-2 border-[#4c566a] font-vt text-lg text-white focus:border-[#d4af37] outline-none
                    shadow-[inset_0_0_8px_rgba(0,0,0,0.8)]"
                />
              </div>

              <div>
                <label className="block font-press text-[8px] text-[#4c566a] uppercase mb-1.5">
                  Quest Description (Message)
                </label>
                <textarea 
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  placeholder="I have a backend raid that requires your system weapons..."
                  className="w-full p-2.5 bg-[#0b0c10] border-2 border-[#4c566a] font-vt text-lg text-white focus:border-[#d4af37] outline-none resize-none
                    shadow-[inset_0_0_8px_rgba(0,0,0,0.8)]"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <span className="font-vt text-xs text-[#ff4757] uppercase tracking-wide">
                  * FRONTEND-ONLY PREVIEW
                </span>
                
                <PixelButton type="submit" variant={loading ? "slate" : "emerald"} disabled={loading}>
                  {loading ? "SENDING..." : "DISPATCH MESSENGER"}
                </PixelButton>
              </div>
            </form>

            {sent && (
              <div className="mt-4 p-3 border-2 border-[#2ed573] bg-[#2ed573]/10 font-vt text-lg text-zinc-200 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-[#2ed573] flex-shrink-0" />
                <span>Messenger summoned! (Mock message submitted successfully)</span>
              </div>
            )}
          </PixelCard>

        </div>
      </section>
    );
  };

  // Recruiter View
  const renderRecruiter = () => {
    return (
      <section id="contact" className="py-12 px-6 max-w-5xl mx-auto scroll-mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          
          {/* Info Column */}
          <div className="space-y-6">
            <div>
              <span className="text-amber-500 text-xs font-semibold uppercase tracking-widest block mb-1">
                Let&apos;s Connect
              </span>
              <h2 className="text-2xl font-bold text-zinc-100">Get in Touch</h2>
              <p className="text-zinc-400 text-sm mt-3 leading-relaxed">
                If you are looking to hire a Software Engineer with backend pipeline expertise or strong React components capabilities, reach out directly. I am generally available for interviews in Hanoi/HCM timezones.
              </p>
            </div>

            <div className="space-y-3 pt-4">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-amber-500" />
                <div>
                  <span className="text-xs text-zinc-500 block">Email Address</span>
                  <a href="mailto:dungta386469@gmail.com" className="text-zinc-300 font-semibold hover:underline text-sm">
                    dungta386469@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Linkedin className="w-5 h-5 text-amber-500" />
                <div>
                  <span className="text-xs text-zinc-500 block">LinkedIn Profile</span>
                  <a 
                    href="https://www.linkedin.com/in/d%C5%A9ng-t%E1%BA%A1-417112218/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-zinc-300 font-semibold hover:underline text-sm"
                  >
                    linkedin.com/in/dũng-tạ-417112218
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Github className="w-5 h-5 text-amber-500" />
                <div>
                  <span className="text-xs text-zinc-500 block">GitHub Profile</span>
                  <a 
                    href="https://github.com/dungta1610" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-zinc-300 font-semibold hover:underline text-sm"
                  >
                    github.com/dungta1610
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a 
                href="/resume.pdf" 
                download="Ta_Duc_Dung_Resume.pdf"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-zinc-800 text-zinc-100 hover:bg-zinc-700 transition-colors font-bold text-sm cursor-pointer border border-zinc-700"
              >
                <FileDown className="w-4 h-4 text-zinc-400" /> Download Resume PDF
              </a>
            </div>
          </div>

          {/* Form Column */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 md:p-8">
            <h3 className="text-zinc-100 font-bold text-base mb-4">Send a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-1">
                  Full Name
                </label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="John Doe"
                  className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-zinc-200 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-1">
                  Email Address
                </label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="john@example.com"
                  className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-zinc-200 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-1">
                  Message
                </label>
                <textarea 
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  placeholder="Hey, let's schedule an interview call..."
                  className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-zinc-200 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none resize-none"
                />
              </div>

              <div className="flex items-center justify-between gap-4 pt-2">
                <span className="text-[10px] text-zinc-500 font-semibold uppercase">
                  * Note: Form is a UI Demo
                </span>
                <button 
                  type="submit" 
                  disabled={loading}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold transition-all text-xs cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" /> {loading ? "Sending..." : "Submit Message"}
                </button>
              </div>
            </form>

            {sent && (
              <div className="mt-4 p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-lg flex items-center gap-2">
                <CheckCircle className="w-4 h-4 flex-shrink-0" />
                <span>Message mock-submitted successfully!</span>
              </div>
            )}
          </div>

        </div>
      </section>
    );
  };

  return recruiterMode ? renderRecruiter() : renderRPG();
};
