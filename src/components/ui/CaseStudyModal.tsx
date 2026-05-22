import React, { useEffect, useState, useRef } from "react";
import { X, ExternalLink, ShieldCheck, Trophy, Terminal, AlertTriangle, Star } from "lucide-react";
import { Github } from "./Icons";
import { Project } from "../../types/portfolio";
import { DashboardBadge } from "./DashboardBadge";
import { DashboardButton } from "./DashboardButton";
import { DashboardCard } from "./DashboardCard";
import { useReactorState } from "../../context/ReactorContext";

interface TopologyNode {
  id: string;
  label: string;
  x: number;
  y: number;
  type: "entry" | "compute" | "storage" | "network";
}

interface TopologyEdge {
  from: string;
  to: string;
}

const TopologyDiagram: React.FC<{ projectId: string }> = ({ projectId }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let pulseProgress = 0;

    const pId = projectId.toLowerCase();
    let nodes: TopologyNode[] = [];
    let edges: TopologyEdge[] = [];
    let accentColor = "#06b6d4"; // cyan
    let secondaryColor = "#8b5cf6"; // violet

    if (pId === "stockflow" || pId === "simple-banking-system") {
      accentColor = "#06b6d4";
      secondaryColor = "#3b82f6";
    } else if (pId === "pocketatlas" || pId === "logiquote") {
      accentColor = "#a78bfa";
      secondaryColor = "#ec4899";
    } else {
      accentColor = "#10b981";
      secondaryColor = "#8b5cf6";
    }

    if (pId === "stockflow") {
      nodes = [
        { id: "client", label: "CLIENT_UI", x: 0.1, y: 0.5, type: "entry" },
        { id: "gateway", label: "GO_API_GATEWAY", x: 0.32, y: 0.5, type: "compute" },
        { id: "queue", label: "RABBITMQ_BUS", x: 0.55, y: 0.25, type: "network" },
        { id: "worker", label: "CONSUMER_ENGINE", x: 0.55, y: 0.75, type: "compute" },
        { id: "postgres", label: "POSTGRESQL", x: 0.78, y: 0.5, type: "storage" },
        { id: "redis", label: "REDIS_CACHE", x: 0.92, y: 0.5, type: "storage" },
      ];
      edges = [
        { from: "client", to: "gateway" },
        { from: "gateway", to: "queue" },
        { from: "gateway", to: "worker" },
        { from: "queue", to: "worker" },
        { from: "worker", to: "postgres" },
        { from: "postgres", to: "redis" },
      ];
    } else if (pId === "pocketatlas") {
      nodes = [
        { id: "visitor", label: "USER_BROWSER", x: 0.15, y: 0.5, type: "entry" },
        { id: "next_fe", label: "NEXT_APP_HOST", x: 0.42, y: 0.5, type: "compute" },
        { id: "leaflet", label: "LEAFLET_RENDER", x: 0.68, y: 0.28, type: "network" },
        { id: "geojson", label: "GEOJSON_API", x: 0.68, y: 0.72, type: "compute" },
        { id: "static", label: "STATIC_DB_FILES", x: 0.88, y: 0.5, type: "storage" },
      ];
      edges = [
        { from: "visitor", to: "next_fe" },
        { from: "next_fe", to: "leaflet" },
        { from: "next_fe", to: "geojson" },
        { from: "leaflet", to: "static" },
        { from: "geojson", to: "static" },
      ];
    } else if (pId === "token-transfer-monitor") {
      nodes = [
        { id: "eth", label: "ETH_MAINNET", x: 0.12, y: 0.5, type: "entry" },
        { id: "rpc", label: "RPC_NODE_CLIENT", x: 0.35, y: 0.5, type: "network" },
        { id: "parser", label: "PARSER_SERVICE", x: 0.58, y: 0.5, type: "compute" },
        { id: "sqlite", label: "SQLITE_STORE", x: 0.82, y: 0.28, type: "storage" },
        { id: "ws", label: "WEBSOCKETS_PUSH", x: 0.82, y: 0.72, type: "network" },
      ];
      edges = [
        { from: "eth", to: "rpc" },
        { from: "rpc", to: "parser" },
        { from: "parser", to: "sqlite" },
        { from: "parser", to: "ws" },
      ];
    } else if (pId === "simple-banking-system") {
      nodes = [
        { id: "cli", label: "CLI_INTERACTION", x: 0.15, y: 0.5, type: "entry" },
        { id: "auth", label: "AUTH_CONTROLLER", x: 0.45, y: 0.28, type: "compute" },
        { id: "ledger", label: "LEDGER_CORE", x: 0.45, y: 0.72, type: "compute" },
        { id: "sqlite", label: "SQLITE_DB", x: 0.8, y: 0.5, type: "storage" },
      ];
      edges = [
        { from: "cli", to: "auth" },
        { from: "cli", to: "ledger" },
        { from: "auth", to: "sqlite" },
        { from: "ledger", to: "sqlite" },
      ];
    } else if (pId === "logiquote") {
      nodes = [
        { id: "client", label: "CLIENT_DASHBOARD", x: 0.12, y: 0.5, type: "entry" },
        { id: "router", label: "NEXT_ROUTER", x: 0.38, y: 0.5, type: "compute" },
        { id: "auth", label: "NEXTAUTH_SECURE", x: 0.62, y: 0.28, type: "network" },
        { id: "pricing", label: "PRICING_ENGINE", x: 0.62, y: 0.72, type: "compute" },
        { id: "supabase", label: "SUPABASE_POSTGRES", x: 0.85, y: 0.5, type: "storage" },
      ];
      edges = [
        { from: "client", to: "router" },
        { from: "router", to: "auth" },
        { from: "router", to: "pricing" },
        { from: "auth", to: "supabase" },
        { from: "pricing", to: "supabase" },
      ];
    } else {
      nodes = [
        { id: "client", label: "CLIENT", x: 0.2, y: 0.5, type: "entry" },
        { id: "gateway", label: "MICRO_GATEWAY", x: 0.5, y: 0.5, type: "compute" },
        { id: "store", label: "STORAGE_NODE", x: 0.8, y: 0.5, type: "storage" },
      ];
      edges = [
        { from: "client", to: "gateway" },
        { from: "gateway", to: "store" },
      ];
    }

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = 200 * dpr;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const drawGrid = (width: number, height: number) => {
      ctx.strokeStyle = "rgba(6, 182, 212, 0.03)";
      ctx.lineWidth = 1;
      const gridSize = 15;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
    };

    const getNodeCoords = (node: TopologyNode, w: number, h: number) => {
      const marginX = 60;
      const marginY = 40;
      const x = marginX + node.x * (w - 2 * marginX);
      const y = marginY + node.y * (h - 2 * marginY);
      return { x, y };
    };

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = 200;

      ctx.clearRect(0, 0, w, h);
      drawGrid(w, h);

      edges.forEach((edge) => {
        const fromNode = nodes.find((n) => n.id === edge.from);
        const toNode = nodes.find((n) => n.id === edge.to);
        if (!fromNode || !toNode) return;

        const p1 = getNodeCoords(fromNode, w, h);
        const p2 = getNodeCoords(toNode, w, h);

        ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
        ctx.setLineDash([]);

        const pulseX = p1.x + (p2.x - p1.x) * pulseProgress;
        const pulseY = p1.y + (p2.y - p1.y) * pulseProgress;

        ctx.fillStyle = accentColor;
        ctx.beginPath();
        ctx.arc(pulseX, pulseY, 3.5, 0, Math.PI * 2);
        ctx.shadowColor = accentColor;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      nodes.forEach((node) => {
        const p = getNodeCoords(node, w, h);

        ctx.fillStyle = "rgba(7, 11, 22, 0.95)";
        ctx.strokeStyle = node.type === "entry" ? secondaryColor : accentColor;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = node.type === "entry" ? secondaryColor : accentColor;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 14, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = "#e4e4e7";
        ctx.font = "bold 8px monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.fillText(node.label, p.x, p.y + 16);

        ctx.fillStyle = "rgba(255, 255, 255, 0.35)";
        ctx.font = "5px monospace";
        ctx.fillText(node.type.toUpperCase(), p.x, p.y + 26);
      });

      pulseProgress += 0.005;
      if (pulseProgress > 1) {
        pulseProgress = 0;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [projectId]);

  return (
    <div className="relative w-full h-[200px] bg-[#020408]/90 border border-slate-800/80 rounded-lg overflow-hidden flex items-center justify-center mb-6 select-none">
      <div className="absolute top-2 left-3 font-mono text-[8px] text-slate-500 uppercase tracking-widest pointer-events-none">
        TOPOLOGY_VIEW // LIVE_PULSE_MONITOR
      </div>
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};

interface CaseStudyModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
  recruiterMode: boolean;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  project,
  isOpen,
  onClose,
  recruiterMode,
}) => {
  const [activeTab, setActiveTab] = useState<"overview" | "architecture" | "logs" | "metrics">("overview");
  const { setInspectingProject } = useReactorState();

  // Sync active inspecting project with the ReactorContext
  useEffect(() => {
    if (isOpen) {
      setInspectingProject(project);
    }
    return () => {
      setInspectingProject(null);
    };
  }, [isOpen, project, setInspectingProject]);

  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("no-scroll");
      setActiveTab("overview"); // Reset tab on open
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isOpen, project]);

  if (!isOpen) return null;

  const difficultyColors = {
    Easy: "emerald",
    Medium: "blue",
    Hard: "gold",
    Expert: "red"
  } as const;

  const statusColors = {
    Completed: "emerald",
    "In Development": "blue",
    Prototype: "gold",
    Archived: "slate",
    Unknown: "slate"
  } as const;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Dashboard / Interactive Sci-fi Layout Render
  const renderDashboardContent = () => {
    const tabs = [
      { id: "overview", label: "SYS_OVERVIEW" },
      { id: "architecture", label: "SYS_TOPOLOGY" },
      { id: "logs", label: "DIAGNOSTIC_LOGS" },
      { id: "metrics", label: "METRICS_TELEMETRY" },
    ] as const;

    const dotColorClass = {
      Easy: "bg-emerald-500",
      Medium: "bg-blue-500",
      Hard: "bg-amber-500",
      Expert: "bg-red-500"
    }[project.difficulty] || "bg-slate-500";

    return (
      <DashboardCard 
        variant="blue" 
        glowing={true} 
        className="max-h-[85vh] max-w-3xl w-full mx-4 relative p-0 overflow-hidden flex flex-col bg-[#070b16]/98 border-cyan-500/20"
      >
        {/* Modal Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-cyan-500/10 bg-cyan-950/10 select-none">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-cyan-400 text-glow-cyan" />
            <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest text-glow-cyan">
              Mission Dossier // {project.name}
            </span>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-cyan-400 transition-colors p-1 hover:bg-cyan-500/5 rounded cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Diagnostic Tabs Selector */}
        <div className="flex border-b border-slate-800/80 bg-[#05070d]/90 px-4 overflow-x-auto select-none">
          {tabs.map((tab, idx) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 font-mono text-[9px] tracking-widest border-b-2 transition-all duration-300 cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? "text-cyan-400 border-cyan-500 bg-cyan-950/15 text-glow-cyan"
                  : "text-slate-500 border-transparent hover:text-slate-300"
              }`}
            >
              [{idx + 1} // {tab.label}]
            </button>
          ))}
        </div>

        {/* Scrollable Container */}
        <div className="overflow-y-auto p-6 flex-grow min-h-[300px]">
          
          {/* Metadata Ribbon */}
          <div className="flex flex-wrap items-center gap-2 pb-4 border-b border-slate-800/60 mb-6 select-none">
            <DashboardBadge variant={difficultyColors[project.difficulty]}>
              DIFF: {project.difficulty}
            </DashboardBadge>
            <DashboardBadge variant={statusColors[project.status]}>
              STATUS: {project.status}
            </DashboardBadge>
            <span className="text-[10px] font-mono text-slate-500 ml-auto">
              OP_GUID: {project.id.toUpperCase()}
            </span>
          </div>

          {activeTab === "overview" && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-mono text-cyan-500 uppercase tracking-wider block mb-1.5">
                  // OPERATIONAL ROLE
                </span>
                <h3 className="text-base font-bold text-slate-100 uppercase tracking-wide">{project.role}</h3>
              </div>
              
              <div>
                <h4 className="text-xs font-mono text-cyan-500 uppercase tracking-wider mb-2.5">
                  // SYSTEM OVERVIEW
                </h4>
                <p className="text-sm leading-relaxed text-slate-300">
                  {project.description}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-mono text-cyan-500 uppercase tracking-wider mb-2.5">
                  // TECHNICAL COMPONENT INTEGRATIONS
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.map((tech) => (
                    <span 
                      key={tech} 
                      className="bg-[#0b132b] border border-cyan-500/10 rounded px-2.5 py-0.5 font-mono text-xs text-cyan-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {project.mainFeatures && project.mainFeatures.length > 0 && (
                <div>
                  <h4 className="text-xs font-mono text-emerald-500 uppercase tracking-wider mb-2.5">
                    // SECURED DELIVERABLES & FEATURES
                  </h4>
                  <ul className="space-y-2 text-sm text-slate-300">
                    {project.mainFeatures.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-emerald-500 font-mono select-none mt-0.5">»</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {activeTab === "architecture" && (
            <div className="space-y-6">
              {/* Custom responsive canvas topology diagram */}
              {!recruiterMode && <TopologyDiagram projectId={project.id} />}

              <div>
                <h4 className="text-xs font-mono text-violet-500 uppercase tracking-wider mb-3">
                  // SYSTEM TOPOLOGY & ARCHITECTURE SCHEMA
                </h4>
                {project.architectureNotes ? (
                  <div className="bg-[#050810] border border-violet-500/15 rounded-lg p-5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-violet-500/10 text-violet-400 font-mono text-[8px] px-2 py-0.5 uppercase tracking-widest border-b border-l border-violet-500/10 select-none">
                      SECURE_DATA
                    </div>
                    
                    <pre className="font-mono text-xs text-slate-300 leading-relaxed whitespace-pre-wrap font-mono select-text">
                      <code>{project.architectureNotes}</code>
                    </pre>

                    <div className="mt-6 pt-4 border-t border-slate-800/80 font-mono text-[9px] text-slate-500 space-y-1 select-none">
                      <div>CLUSTER_TOPOLOGY: MULTI_REGION_DEPLOY</div>
                      <div>SERVICE_HEALTH: 100% (NOMINAL)</div>
                      <div>DB_REPLICATION: MASTER_SLAVE</div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 font-mono text-xs text-slate-500 border border-dashed border-slate-800 rounded-lg select-none">
                    [NO ARCHITECTURE DIAGRAM OR SCHEMA LOGGED FOR THIS MISSION]
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "logs" && (
            <div className="space-y-6">
              <h4 className="text-xs font-mono text-rose-500 uppercase tracking-wider mb-3 flex items-center gap-1.5 select-none">
                <AlertTriangle className="w-4 h-4 text-rose-500 animate-pulse" /> // CRITICAL BOTTLENECK DIAGNOSTIC LOGS
              </h4>
              
              {project.technicalChallenges && project.technicalChallenges.length > 0 ? (
                <div className="space-y-4">
                  {project.technicalChallenges.map((challenge, idx) => (
                    <div 
                      key={idx} 
                      className="border border-rose-500/20 bg-[#12080a] p-4 rounded-lg shadow-[inset_0_0_10px_rgba(244,63,94,0.05)] relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 bg-rose-500/10 text-rose-400 font-mono text-[8px] px-2 py-0.5 uppercase select-none">
                        ERR_CODE_0x0{idx + 1}
                      </div>
                      
                      <h5 className="font-mono text-xs text-rose-400 mb-3 uppercase font-semibold flex items-center gap-2 select-none">
                        <span className="inline-block w-1.5 h-1.5 bg-rose-500 rounded-full animate-ping" />
                        CHALLENGE // {challenge.title}
                      </h5>
                      
                      <div className="space-y-3 font-mono text-xs select-text">
                        <div className="p-2.5 rounded bg-zinc-950/70 border border-slate-900 leading-relaxed text-slate-300">
                          <span className="text-rose-400 font-semibold block mb-1 select-none">🔍 [SYMPTOM_DESCRIPTION]</span>
                          {challenge.description}
                        </div>
                        <div className="p-2.5 rounded bg-emerald-950/15 border border-emerald-500/10 leading-relaxed text-emerald-400">
                          <span className="text-emerald-500 font-semibold block mb-1 select-none">⚡ [RESOLUTION_APPLIED]</span>
                          {challenge.resolution}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 font-mono text-xs text-slate-500 border border-dashed border-slate-800 rounded-lg select-none">
                  [DIAGNOSTICS STATUS: PASSING // ZERO CRITICAL BOTTLENECKS REPORTED]
                </div>
              )}
            </div>
          )}

          {activeTab === "metrics" && (
            <div className="space-y-6">
              {/* Star / Difficulty summary */}
              <div className="grid grid-cols-2 gap-4 select-none">
                <div className="bg-[#050810] border border-slate-800 p-4 rounded-lg font-mono text-xs space-y-1">
                  <span className="text-slate-500 uppercase tracking-widest text-[8px]">DIFFICULTY_RANK:</span>
                  <div className="text-slate-100 font-bold text-sm uppercase flex items-center gap-1.5">
                    <span className={`inline-block w-2 h-2 rounded-full ${dotColorClass}`} />
                    {project.difficulty}
                  </div>
                </div>
                <div className="bg-[#050810] border border-slate-800 p-4 rounded-lg font-mono text-xs space-y-1">
                  <span className="text-slate-500 uppercase tracking-widest text-[8px]">VCS_POPULARITY:</span>
                  <div className="text-slate-100 font-bold text-sm flex items-center gap-1.5">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    {project.stars} STARS
                  </div>
                </div>
              </div>

              {project.lessonsLearned && project.lessonsLearned.length > 0 && (
                <div>
                  <h4 className="text-xs font-mono text-amber-500 uppercase tracking-wider mb-2.5 flex items-center gap-1.5 select-none">
                    <Trophy className="w-4 h-4 text-amber-500" /> // ENGINEERING TAKEAWAYS
                  </h4>
                  <ul className="space-y-2 text-sm text-slate-300">
                    {project.lessonsLearned.map((lesson, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-amber-500 font-mono select-none mt-0.5">+</span>
                        <span>{lesson}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {project.nextImprovements && project.nextImprovements.length > 0 && (
                <div>
                  <h4 className="text-xs font-mono text-cyan-500 uppercase tracking-wider mb-2.5 select-none">
                    // PLANNED ROADMAP OPTIMIZATIONS
                  </h4>
                  <ul className="space-y-1.5 text-sm text-slate-300">
                    {project.nextImprovements.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-cyan-500 font-mono select-none mt-0.5">⚡</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Modal Actions Footer */}
        <div className="px-6 py-4 border-t border-cyan-500/10 bg-cyan-950/10 flex flex-wrap justify-end gap-3 select-none">
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
            <DashboardButton variant="slate" className="flex items-center gap-1.5">
              <Github className="w-3.5 h-3.5" /> Repository
            </DashboardButton>
          </a>
          {project.liveDemoUrl ? (
            <a href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer">
              <DashboardButton variant="blue" className="flex items-center gap-1.5">
                <ExternalLink className="w-3.5 h-3.5" /> Live Signal
              </DashboardButton>
            </a>
          ) : (
            <DashboardButton variant="slate" disabled className="flex items-center gap-1.5 opacity-60">
              <ExternalLink className="w-3.5 h-3.5" /> Offline
            </DashboardButton>
          )}
        </div>
      </DashboardCard>
    );
  };

  // Recruiter Layout Render (Sleek minimalist style)
  const renderRecruiterContent = () => {
    return (
      <div className="bg-zinc-900 border border-zinc-800 p-8 max-h-[85vh] overflow-y-auto max-w-3xl w-full mx-4 rounded-xl shadow-2xl relative text-zinc-300 font-sans">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 text-zinc-400 hover:text-zinc-100 p-1 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors cursor-pointer"
          title="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6 border-b border-zinc-800 pb-4 pr-8">
          <div className="flex items-center gap-3 mb-2">
            <span className={`px-2.5 py-0.5 rounded text-xs font-semibold uppercase tracking-wider
              ${project.status === "Completed" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : 
                project.status === "In Development" ? "bg-blue-500/10 text-blue-400 border border-blue-500/20" : 
                "bg-amber-500/10 text-amber-400 border border-amber-500/20"}`}
            >
              {project.status}
            </span>
            <span className="text-zinc-500 text-xs font-medium">Difficulty: {project.difficulty}</span>
          </div>
          <h2 className="text-2xl font-bold text-zinc-100">{project.name}</h2>
          <p className="text-sm text-amber-500 font-semibold mt-1">Role: {project.role}</p>
        </div>

        {/* Modal Body */}
        <div className="space-y-6">
          {/* Overview */}
          <div>
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-zinc-400" /> Executive Summary
            </h3>
            <p className="text-sm leading-relaxed text-zinc-300">
              {project.description}
            </p>
          </div>

          {/* Tech Stack */}
          <div>
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">
              Technology Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span 
                  key={tech} 
                  className="bg-zinc-800 border border-zinc-700 rounded-md px-2.5 py-1 text-xs text-zinc-300 font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Key Deliverables */}
          {project.mainFeatures && project.mainFeatures.length > 0 && (
            <div>
              <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">
                Key Features & Deliverables
              </h3>
              <ul className="list-disc pl-5 space-y-1.5 text-sm text-zinc-300">
                {project.mainFeatures.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Architecture Notes */}
          {project.architectureNotes && (
            <div>
              <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">
                Architecture & System Design
              </h3>
              <div className="text-sm leading-relaxed text-zinc-300 bg-zinc-950 border border-zinc-800 p-4 rounded-lg">
                {project.architectureNotes}
              </div>
            </div>
          )}

          {/* Technical Challenges */}
          {project.technicalChallenges && project.technicalChallenges.length > 0 && (
            <div>
              <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-3">
                Technical Challenges & Solutions
              </h3>
              <div className="space-y-4">
                {project.technicalChallenges.map((challenge, idx) => (
                  <div 
                    key={idx} 
                    className="border border-zinc-800 bg-zinc-950/60 p-5 rounded-lg"
                  >
                    <h4 className="text-sm font-semibold text-zinc-200 mb-1 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                      {challenge.title}
                    </h4>
                    <div className="pl-3 mt-2 space-y-2">
                      <p className="text-xs text-zinc-400 leading-relaxed">
                        <span className="font-semibold text-zinc-300">Problem:</span> {challenge.description}
                      </p>
                      <p className="text-xs text-emerald-400 leading-relaxed">
                        <span className="font-semibold text-emerald-500">Solution:</span> {challenge.resolution}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Lessons Learned */}
          {project.lessonsLearned && project.lessonsLearned.length > 0 && (
            <div>
              <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">
                Engineering Takeaways
              </h3>
              <ul className="list-disc pl-5 space-y-1 text-sm text-zinc-300">
                {project.lessonsLearned.map((lesson, idx) => (
                  <li key={idx}>{lesson}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Future Work */}
          {project.nextImprovements && project.nextImprovements.length > 0 && (
            <div>
              <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">
                Planned Enhancements
              </h3>
              <ul className="list-disc pl-5 space-y-1 text-sm text-zinc-300">
                {project.nextImprovements.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Modal Actions */}
        <div className="mt-8 pt-4 border-t border-zinc-800 flex justify-end gap-3">
          {project.liveDemoUrl && (
            <a 
              href={project.liveDemoUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 text-sm rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold transition-colors cursor-pointer"
            >
              <ExternalLink className="w-4 h-4" /> View Live Demo
            </a>
          )}
          <a 
            href={project.githubUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 text-sm rounded-lg border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-semibold transition-colors cursor-pointer"
          >
            <Github className="w-4 h-4" /> View Source Code
          </a>
        </div>
      </div>
    );
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-xs select-none"
      onClick={handleBackdropClick}
    >
      {recruiterMode ? renderRecruiterContent() : renderDashboardContent()}
    </div>
  );
};
