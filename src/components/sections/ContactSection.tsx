import React, { useState } from "react";
import { Mail, FileDown, Send, CheckCircle, Terminal, Link as LinkIcon } from "lucide-react";
import { Github, Linkedin } from "../ui/Icons";
import { DashboardCard } from "../ui/DashboardCard";
import { DashboardButton } from "../ui/DashboardButton";
import { DashboardBadge } from "../ui/DashboardBadge";

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

  // Dashboard View
  const renderDashboard = () => {
    return (
      <section id="contact" className="py-16 px-4 max-w-5xl mx-auto scroll-mt-20">
        <div className="text-center mb-10">
          <span className="text-cyan-400 font-mono text-xs uppercase tracking-widest block mb-2">
            [SYS_TRANS] ESTABLISH CONNECTION
          </span>
          <h2 className="text-3xl font-extrabold text-zinc-100 tracking-tight">
            Telemetry Transmission
          </h2>
          <p className="text-sm text-zinc-400 mt-2 max-w-xl mx-auto font-mono">
            Initialize high-priority transmission routes to reach the operator console directly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          
          {/* Summon Coordinates */}
          <DashboardCard variant="slate" glowing={false} className="space-y-6">
            <h3 className="font-mono text-xs font-bold text-cyan-400 border-b border-zinc-800/80 pb-2.5 flex items-center gap-2 uppercase tracking-wider">
              <Terminal className="w-4 h-4 text-cyan-400" /> TRANSMISSION_COORDINATES
            </h3>

            <div className="space-y-4 font-mono text-xs text-zinc-400">
              <p className="leading-relaxed">
                Connect via secure external protocols or fetch current operations payload:
              </p>

              <a 
                href="mailto:dungta386469@gmail.com" 
                className="flex items-center gap-3 p-3 bg-zinc-950/60 border border-zinc-800/80 hover:border-cyan-500/50 rounded-lg transition-all group"
              >
                <Mail className="w-5 h-5 text-cyan-400 group-hover:scale-105 transition-transform" />
                <div>
                  <span className="text-[9px] text-zinc-500 block uppercase tracking-wider">Direct Email</span>
                  <span className="text-zinc-200 text-xs font-semibold">dungta386469@gmail.com</span>
                </div>
              </a>

              <a 
                href="https://www.linkedin.com/in/d%C5%A9ng-t%E1%BA%A1-417112218/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-3 p-3 bg-zinc-950/60 border border-zinc-800/80 hover:border-violet-500/50 rounded-lg transition-all group"
              >
                <Linkedin className="w-5 h-5 text-violet-400 group-hover:scale-105 transition-transform" />
                <div>
                  <span className="text-[9px] text-zinc-500 block uppercase tracking-wider">LinkedIn Net</span>
                  <span className="text-zinc-200 text-xs font-semibold">linkedin.com/in/dung-ta</span>
                </div>
              </a>

              <a 
                href="https://github.com/dungta1610" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-3 p-3 bg-zinc-950/60 border border-zinc-800/80 hover:border-cyan-500/50 rounded-lg transition-all group"
              >
                <Github className="w-5 h-5 text-zinc-100 group-hover:scale-105 transition-transform" />
                <div>
                  <span className="text-[9px] text-zinc-500 block uppercase tracking-wider">VCS Profile</span>
                  <span className="text-zinc-200 text-xs font-semibold">github.com/dungta1610</span>
                </div>
              </a>
            </div>

            <div className="pt-4 border-t border-zinc-800/80 text-center">
              <a href="/resume.pdf" download="Ta_Duc_Dung_Resume.pdf" className="block">
                <DashboardButton variant="cyan" className="w-full justify-center flex items-center gap-2 cursor-pointer">
                  <FileDown className="w-3.5 h-3.5" /> DOWNLOAD OPERATIONS PAYLOAD (CV)
                </DashboardButton>
              </a>
            </div>
          </DashboardCard>

          {/* Contact Form */}
          <DashboardCard variant="cyan" glowing={false}>
            <h3 className="font-mono text-xs font-bold text-cyan-400 border-b border-zinc-800/80 pb-2.5 mb-5 uppercase tracking-wider">
              ✍️ BROADCAST_MESSAGE
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-mono text-[9px] text-zinc-500 uppercase tracking-widest mb-1.5">
                  OPERATOR_NAME
                </label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="e.g. Lead Recruiter"
                  className="w-full px-3 py-2 bg-zinc-950/80 border border-zinc-800 rounded-lg font-mono text-xs text-zinc-100 placeholder-zinc-600 focus:border-cyan-500/80 focus:ring-1 focus:ring-cyan-500/40 outline-none"
                />
              </div>

              <div>
                <label className="block font-mono text-[9px] text-zinc-500 uppercase tracking-widest mb-1.5">
                  RETURN_ADDRESS_EMAIL
                </label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="operator@system.org"
                  className="w-full px-3 py-2 bg-zinc-950/80 border border-zinc-800 rounded-lg font-mono text-xs text-zinc-100 placeholder-zinc-600 focus:border-cyan-500/80 focus:ring-1 focus:ring-cyan-500/40 outline-none"
                />
              </div>

              <div>
                <label className="block font-mono text-[9px] text-zinc-500 uppercase tracking-widest mb-1.5">
                  TRANSMISSION_PAYLOAD
                </label>
                <textarea 
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  placeholder="We have active missions that require backend performance tuning..."
                  className="w-full px-3 py-2 bg-zinc-950/80 border border-zinc-800 rounded-lg font-mono text-xs text-zinc-100 placeholder-zinc-600 focus:border-cyan-500/80 focus:ring-1 focus:ring-cyan-500/40 outline-none resize-none"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <span className="font-mono text-[9px] text-rose-500/60 uppercase">
                  * FRONTEND_PREVIEW_ONLY
                </span>
                
                <DashboardButton type="submit" variant={loading ? "slate" : "cyan"} disabled={loading} className="cursor-pointer">
                  {loading ? "TRANSMITTING..." : "DISPATCH_PACKET"}
                </DashboardButton>
              </div>
            </form>

            {sent && (
              <div className="mt-4 p-3 border border-emerald-500/30 bg-emerald-500/5 font-mono text-xs text-emerald-400 rounded-lg flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Message successfully broadcasted! (Mock submit successful)</span>
              </div>
            )}
          </DashboardCard>

        </div>
      </section>
    );
  };

  // Recruiter View
  const renderRecruiter = () => {
    return (
      <section id="contact" className="py-16 px-6 max-w-5xl mx-auto scroll-mt-20">
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

  return recruiterMode ? renderRecruiter() : renderDashboard();
};
