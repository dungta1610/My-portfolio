"use client";

import React, { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { X, ExternalLink, ShieldCheck, Trophy, Terminal, AlertTriangle, Star, Cpu, Server } from "lucide-react";
import { Github } from "../ui/Icons";
import { Project } from "../../types/portfolio";
import { DashboardBadge } from "../ui/DashboardBadge";
import { DashboardButton } from "../ui/DashboardButton";
import { DashboardCard } from "../ui/DashboardCard";
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
        { id: "client", label: "CLIENT_APP", x: 0.1, y: 0.5, type: "entry" },
        { id: "gin_api", label: "GIN_HTTP_API", x: 0.35, y: 0.5, type: "compute" },
        { id: "redis_limiter", label: "REDIS_LIMITER", x: 0.6, y: 0.28, type: "network" },
        { id: "modules_core", label: "MODULES_CORE", x: 0.6, y: 0.72, type: "compute" },
        { id: "postgres", label: "POSTGRESQL_DB", x: 0.88, y: 0.72, type: "storage" },
        { id: "redis", label: "REDIS_CACHE", x: 0.88, y: 0.28, type: "storage" },
      ];
      edges = [
        { from: "client", to: "gin_api" },
        { from: "gin_api", to: "redis_limiter" },
        { from: "gin_api", to: "modules_core" },
        { from: "redis_limiter", to: "modules_core" },
        { from: "modules_core", to: "postgres" },
        { from: "modules_core", to: "redis" },
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
        { id: "evm_rpc", label: "EVM_WEBSOCKET_RPC", x: 0.1, y: 0.5, type: "entry" },
        { id: "listener", label: "BLOCKCHAIN_LISTENER", x: 0.32, y: 0.5, type: "compute" },
        { id: "rabbitmq", label: "RABBITMQ_EXCHANGE", x: 0.55, y: 0.5, type: "network" },
        { id: "worker", label: "TRANSFER_WORKER", x: 0.78, y: 0.5, type: "compute" },
        { id: "postgres", label: "POSTGRESQL_DB", x: 0.95, y: 0.72, type: "storage" },
        { id: "dlq", label: "RETRY_DLQ_QUEUE", x: 0.95, y: 0.28, type: "network" },
      ];
      edges = [
        { from: "evm_rpc", to: "listener" },
        { from: "listener", to: "rabbitmq" },
        { from: "rabbitmq", to: "worker" },
        { from: "worker", to: "postgres" },
        { from: "worker", to: "dlq" },
      ];
    } else if (pId === "simple-banking-system") {
      nodes = [
        { id: "client", label: "HTTP_CLIENT", x: 0.12, y: 0.5, type: "entry" },
        { id: "gin_transport", label: "GIN_TRANSPORT", x: 0.35, y: 0.5, type: "compute" },
        { id: "redis_limiter", label: "REDIS_LIMITER", x: 0.6, y: 0.28, type: "network" },
        { id: "banking_biz", label: "CORE_BANKING_BIZ", x: 0.6, y: 0.72, type: "compute" },
        { id: "postgres", label: "POSTGRESQL_ACID", x: 0.88, y: 0.5, type: "storage" },
      ];
      edges = [
        { from: "client", to: "gin_transport" },
        { from: "gin_transport", to: "redis_limiter" },
        { from: "gin_transport", to: "banking_biz" },
        { from: "redis_limiter", to: "banking_biz" },
        { from: "banking_biz", to: "postgres" },
      ];
    } else if (pId === "logiquote") {
      nodes = [
        { id: "client", label: "REACT_FRONTEND", x: 0.12, y: 0.5, type: "entry" },
        { id: "go_api", label: "GO_REST_API", x: 0.38, y: 0.5, type: "compute" },
        { id: "in_memory_queue", label: "IN_MEMORY_QUEUE", x: 0.65, y: 0.28, type: "network" },
        { id: "background_worker", label: "BACKGROUND_WORKER", x: 0.88, y: 0.28, type: "compute" },
        { id: "in_memory_store", label: "IN_MEMORY_STORE", x: 0.65, y: 0.72, type: "storage" },
      ];
      edges = [
        { from: "client", to: "go_api" },
        { from: "go_api", to: "in_memory_store" },
        { from: "go_api", to: "in_memory_queue" },
        { from: "in_memory_queue", to: "background_worker" },
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
      canvas.height = 180 * dpr;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const drawGrid = (width: number, height: number) => {
      ctx.strokeStyle = "rgba(6, 182, 212, 0.02)";
      ctx.lineWidth = 0.8;
      const gridSize = 12;
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
      const marginX = 50;
      const marginY = 30;
      const x = marginX + node.x * (w - 2 * marginX);
      const y = marginY + node.y * (h - 2 * marginY);
      return { x, y };
    };

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = 180;

      ctx.clearRect(0, 0, w, h);
      drawGrid(w, h);

      edges.forEach((edge) => {
        const fromNode = nodes.find((n) => n.id === edge.from);
        const toNode = nodes.find((n) => n.id === edge.to);
        if (!fromNode || !toNode) return;

        const p1 = getNodeCoords(fromNode, w, h);
        const p2 = getNodeCoords(toNode, w, h);

        ctx.strokeStyle = "rgba(255, 255, 255, 0.06)";
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
        ctx.setLineDash([]);

        const pulseX = p1.x + (p2.x - p1.x) * pulseProgress;
        const pulseY = p1.y + (p2.y - p1.y) * pulseProgress;

        ctx.fillStyle = accentColor;
        ctx.beginPath();
        ctx.arc(pulseX, pulseY, 2.5, 0, Math.PI * 2);
        ctx.shadowColor = accentColor;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      nodes.forEach((node) => {
        const p = getNodeCoords(node, w, h);

        ctx.fillStyle = "rgba(5, 7, 13, 0.95)";
        ctx.strokeStyle = node.type === "entry" ? secondaryColor : accentColor;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 6.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = node.type === "entry" ? secondaryColor : accentColor;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#e4e4e7";
        ctx.font = "bold 8px monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.fillText(node.label, p.x, p.y + 12);
      });

      pulseProgress += 0.006;
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
    <div className="relative w-full h-[180px] bg-[#020408]/95 border border-slate-900 rounded-lg overflow-hidden flex items-center justify-center mb-4 select-none">
      <div className="absolute top-2 left-3 font-mono text-[7px] text-slate-500 uppercase tracking-widest pointer-events-none">
        TOPOLOGY_VIEW // ENGINE_MONITOR
      </div>
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};

interface MissionInspectionProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
  recruiterMode: boolean;
}

export const MissionInspection: React.FC<MissionInspectionProps> = ({
  project,
  isOpen,
  onClose,
  recruiterMode,
}) => {
  const [activeTab, setActiveTab] = useState<"overview" | "architecture" | "logs" | "metrics">("overview");
  const { setInspectingProject } = useReactorState();
  const [bootstrapLogs, setBootstrapLogs] = useState<string[]>([]);
  const [isBootstrapped, setIsBootstrapped] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Sync active inspecting project with the ReactorContext
  useEffect(() => {
    if (isOpen) {
      setInspectingProject(project);
    }
    return () => {
      setInspectingProject(null);
    };
  }, [isOpen, project, setInspectingProject]);

  // Simulate console bootstrapping logging
  useEffect(() => {
    if (isOpen) {
      setIsBootstrapped(false);
      setBootstrapLogs([]);
      const logsToPrint = [
        `[INFO] RESOLVING MODULE DESCRIPTORS FOR OP_NODE: ${project.id.toUpperCase()}...`,
        `[INFO] SYNCING VCS REPOSITORY FROM URL: ${project.githubUrl.substring(0, 30)}...`,
        `[WARN] AUTH_SIGNALS DORMANT. OVERRIDING SSL CERTIFICATES...`,
        `[INFO] DIALLING DATABASE LAYER NODES... SUCCESS`,
        `[INFO] TELEMETRY STREAM ESTABLISHED. DISPLAY NOMINAL.`
      ];

      let delay = 100;
      logsToPrint.forEach((log, index) => {
        setTimeout(() => {
          setBootstrapLogs((prev) => [...prev, log]);
          if (index === logsToPrint.length - 1) {
            setIsBootstrapped(true);
          }
        }, delay);
        delay += 120;
      });
    }
  }, [isOpen, project]);

  const startXRef = useRef<number>(0);
  const startYRef = useRef<number>(0);

  // Prevent body scrolling when inspector is open
  useEffect(() => {
    if (isOpen) {
      // Calculate scrollbar width to prevent layout shift
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

      // Save styles to restore later
      const originalBodyOverflow = document.body.style.overflow;
      const originalBodyPaddingRight = document.body.style.paddingRight;
      const originalHtmlOverflow = document.documentElement.style.overflow;

      // Apply locking styles
      document.body.style.overflow = "hidden";
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
      document.documentElement.style.overflow = "hidden";

      const handleTouchStart = (e: TouchEvent) => {
        if (e.touches.length > 0) {
          startXRef.current = e.touches[0].clientX;
          startYRef.current = e.touches[0].clientY;
        }
      };

      const preventScroll = (e: TouchEvent | WheelEvent) => {
        const target = e.target as Node | null;
        if (!target) return;

        // Safely get element if target is a text node
        const element = target.nodeType === Node.TEXT_NODE ? target.parentElement : (target as HTMLElement);
        if (!element || !(element instanceof Element)) {
          e.preventDefault();
          return;
        }

        const scrollContainer = element.closest(".inspect-scroll-container") as HTMLElement | null;

        if (!scrollContainer) {
          e.preventDefault();
          return;
        }

        const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
        const maxScroll = scrollHeight - clientHeight;

        if (maxScroll <= 0) {
          e.preventDefault();
          return;
        }

        if (e instanceof WheelEvent) {
          const deltaX = e.deltaX;
          const deltaY = e.deltaY;

          // If the scroll is primarily horizontal (e.g. horizontal tab bar), do not prevent it
          if (Math.abs(deltaX) > Math.abs(deltaY)) {
            return;
          }

          if (deltaY < 0 && scrollTop <= 0) {
            e.preventDefault();
          } else if (deltaY > 0 && scrollTop >= maxScroll - 1) {
            e.preventDefault();
          }
        } else if (e instanceof TouchEvent && e.touches.length > 0) {
          const currentX = e.touches[0].clientX;
          const currentY = e.touches[0].clientY;
          const deltaX = startXRef.current - currentX;
          const deltaY = startYRef.current - currentY; // positive = scroll down, negative = scroll up

          // If the touch swipe is primarily horizontal, do not prevent it
          if (Math.abs(deltaX) > Math.abs(deltaY)) {
            return;
          }

          if (deltaY < 0 && scrollTop <= 0) {
            e.preventDefault();
          } else if (deltaY > 0 && scrollTop >= maxScroll - 1) {
            e.preventDefault();
          }
        }
      };

      window.addEventListener("touchstart", handleTouchStart, { passive: true });
      window.addEventListener("wheel", preventScroll, { passive: false });
      window.addEventListener("touchmove", preventScroll, { passive: false });

      setActiveTab("overview");

      return () => {
        // Restore styles
        document.body.style.overflow = originalBodyOverflow;
        document.body.style.paddingRight = originalBodyPaddingRight;
        document.documentElement.style.overflow = originalHtmlOverflow;

        window.removeEventListener("touchstart", handleTouchStart);
        window.removeEventListener("wheel", preventScroll);
        window.removeEventListener("touchmove", preventScroll);
      };
    }
  }, [isOpen, project]);

  // Escape key handler
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  if (!isOpen) return null;
  if (!mounted) return null;

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

  const tabs = [
    { id: "overview", label: "SYS_OVERVIEW" },
    { id: "architecture", label: "TOPOLOGY" },
    { id: "logs", label: "DIAGNOSTICS" },
    { id: "metrics", label: "METRICS" },
  ] as const;

  const dotColorClass = {
    Easy: "bg-emerald-500",
    Medium: "bg-blue-500",
    Hard: "bg-amber-500",
    Expert: "bg-red-500"
  }[project.difficulty] || "bg-slate-500";

  return createPortal(
    <div 
      className="fixed inset-0 z-[9999] flex justify-end bg-black/75 backdrop-blur-xs select-none"
      onClick={onClose}
    >
      {/* Sliding Inspector Panel */}
      <div 
        className="inspect-panel-container w-full max-w-xl bg-[#05070d]/95 border-l border-slate-800/80 h-full flex flex-col shadow-2xl relative select-text transition-transform duration-300 transform translate-x-0"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-850 bg-[#070b16] select-none shrink-0">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest font-bold">
              Dossier Inspect // {project.name}
            </span>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-cyan-450 transition-colors p-1 hover:bg-slate-800 rounded-lg cursor-pointer"
            title="Close Dossier"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Console Bootstrapping Screen */}
        {!isBootstrapped ? (
          <div className="flex-1 p-6 bg-[#04060b] font-mono text-[10px] text-slate-500 space-y-2 select-none">
            <div className="text-cyan-400 animate-pulse font-bold">BOOTSTRAPPING TELEMETRY MONITOR...</div>
            {bootstrapLogs.map((log, idx) => (
              <div key={idx} className="leading-relaxed whitespace-pre-wrap">{log}</div>
            ))}
          </div>
        ) : (
          <>
            {/* Inspector Navigation Tabs */}
            <div className="flex border-b border-slate-850/80 bg-[#05070d] px-2 select-none shrink-0 overflow-x-auto whitespace-nowrap scrollbar-none">
              {tabs.map((tab, idx) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-3 font-mono text-[9px] tracking-widest border-b-2 transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? "text-cyan-400 border-cyan-500 bg-cyan-950/10 font-bold"
                      : "text-slate-550 border-transparent hover:text-slate-350"
                  }`}
                >
                  [{idx + 1} // {tab.label}]
                </button>
              ))}
            </div>

            {/* Content Body */}
            <div className="inspect-scroll-container flex-1 overflow-y-auto overscroll-y-contain p-6 space-y-6 scrollbar-thin">
              
              {/* Metadata Panel */}
              <div className="flex items-center justify-between pb-3.5 border-b border-slate-850/60 select-none">
                <div className="flex items-center gap-1.5">
                  <DashboardBadge variant={difficultyColors[project.difficulty]}>
                    DIFF: {project.difficulty}
                  </DashboardBadge>
                  <DashboardBadge variant={statusColors[project.status]}>
                    {project.status.toUpperCase()}
                  </DashboardBadge>
                </div>
                <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">
                  OP_ID // {project.id.substring(0, 12)}
                </span>
              </div>

              {activeTab === "overview" && (
                <div className="space-y-6">
                  <div>
                    <span className="text-[10px] font-mono text-cyan-500 uppercase tracking-wider block mb-1">
                      // MISSION DIRECTIVE
                    </span>
                    <h3 className="text-sm font-bold text-slate-200 uppercase">{project.role}</h3>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono text-cyan-500 uppercase tracking-wider block mb-2">
                      // SUMMARY ARCHITECTURE
                    </span>
                    <p className="text-xs leading-relaxed text-slate-300">
                      {project.description}
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono text-cyan-500 uppercase tracking-wider block mb-2.5">
                      // SYSTEM COMPONENT INTEGRATION
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.map((tech) => (
                        <span 
                          key={tech} 
                          className="bg-[#0b132b] border border-cyan-500/10 rounded px-2.5 py-0.5 font-mono text-[10px] text-cyan-400"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {project.mainFeatures && project.mainFeatures.length > 0 && (
                    <div>
                      <span className="text-[10px] font-mono text-emerald-500 uppercase tracking-wider block mb-2">
                        // SECURED SYSTEM CAPABILITIES
                      </span>
                      <ul className="space-y-2 text-xs text-slate-300 font-mono">
                        {project.mainFeatures.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-emerald-500 font-mono select-none">»</span>
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
                  {/* Topology Pulse Canvas */}
                  {!recruiterMode && <TopologyDiagram projectId={project.id} />}

                  <div>
                    <span className="text-[10px] font-mono text-violet-500 uppercase tracking-wider block mb-2">
                      // COMPONENT GRAPH SPECIFICATIONS
                    </span>
                    {project.architectureNotes ? (
                      <div className="bg-[#050810]/70 border border-violet-500/10 rounded-lg p-4 relative overflow-hidden select-text">
                        <div className="absolute top-0 right-0 bg-violet-500/10 text-violet-400 font-mono text-[7px] px-2 py-0.5 uppercase tracking-widest border-b border-l border-violet-500/10 select-none">
                          SYS_CONFIG
                        </div>
                        
                        <pre className="font-mono text-[10px] text-slate-350 leading-relaxed whitespace-pre-wrap">
                          <code>{project.architectureNotes}</code>
                        </pre>
                      </div>
                    ) : (
                      <div className="text-center py-10 font-mono text-[10px] text-slate-600 border border-dashed border-slate-800 rounded-lg select-none">
                        [NO DIAGRAM OR COMPONENT SPECIFICATION LOGGED FOR THIS NODE]
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === "logs" && (
                <div className="space-y-6">
                  <span className="text-[10px] font-mono text-rose-500 uppercase tracking-wider block mb-2 flex items-center gap-1.5 select-none">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-500 animate-pulse" /> // DIAGNOSTIC BOTTLENECK LOGS
                  </span>
                  
                  {project.technicalChallenges && project.technicalChallenges.length > 0 ? (
                    <div className="space-y-4">
                      {project.technicalChallenges.map((challenge, idx) => (
                        <div 
                          key={idx} 
                          className="border border-rose-500/15 bg-[#12080a] p-4 rounded-lg relative overflow-hidden font-mono"
                        >
                          <div className="absolute top-0 right-0 bg-rose-500/10 text-rose-450 text-[7px] px-2 py-0.5 uppercase select-none">
                            ERR_LOG_0x0{idx + 1}
                          </div>
                          
                          <h5 className="text-[10px] text-rose-450 mb-3 uppercase font-bold flex items-center gap-2 select-none">
                            <span className="inline-block w-1.5 h-1.5 bg-rose-500 rounded-full animate-pulse" />
                            CHALLENGE // {challenge.title}
                          </h5>
                          
                          <div className="space-y-2 text-[10px] leading-relaxed select-text">
                            <div className="p-2 rounded bg-zinc-950/70 border border-slate-900 text-slate-300">
                              <span className="text-rose-450 font-bold block mb-1 select-none">[🔍 DETECTED_SYMPTOM]</span>
                              {challenge.description}
                            </div>
                            <div className="p-2 rounded bg-emerald-950/10 border border-emerald-500/10 text-emerald-400">
                              <span className="text-emerald-500 font-bold block mb-1 select-none">[⚡ RESOLUTION_APPLIED]</span>
                              {challenge.resolution}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-10 font-mono text-[10px] text-slate-650 border border-dashed border-slate-800 rounded-lg select-none">
                      [DIAGNOSTICS: NOMINAL // ALL CHECKS PASSING]
                    </div>
                  )}
                </div>
              )}

              {activeTab === "metrics" && (
                <div className="space-y-6">
                  {/* Stats Cards */}
                  <div className="grid grid-cols-2 gap-3 select-none">
                    <div className="bg-[#050810] border border-slate-850 p-3 rounded-lg font-mono text-[10px] space-y-1">
                      <span className="text-slate-500 uppercase tracking-widest text-[7px]">COMPLEXITY_RANK</span>
                      <div className="text-slate-200 font-bold text-xs uppercase flex items-center gap-1.5">
                        <span className={`inline-block w-1.5 h-1.5 rounded-full ${dotColorClass}`} />
                        {project.difficulty}
                      </div>
                    </div>
                    <div className="bg-[#050810] border border-slate-850 p-3 rounded-lg font-mono text-[10px] space-y-1">
                      <span className="text-slate-500 uppercase tracking-widest text-[7px]">VCS_INDICATOR</span>
                      <div className="text-slate-200 font-bold text-xs flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                        {project.stars} STARS
                      </div>
                    </div>
                  </div>

                  {project.lessonsLearned && project.lessonsLearned.length > 0 && (
                    <div>
                      <span className="text-[10px] font-mono text-amber-500 uppercase tracking-wider block mb-2 flex items-center gap-1 select-none">
                        <Trophy className="w-3.5 h-3.5 text-amber-500" /> // CRITICAL TAKEAWAYS
                      </span>
                      <ul className="space-y-2 text-xs text-slate-350 font-mono">
                        {project.lessonsLearned.map((lesson, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-amber-500 font-mono select-none">+</span>
                            <span>{lesson}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {project.nextImprovements && project.nextImprovements.length > 0 && (
                    <div>
                      <span className="text-[10px] font-mono text-cyan-500 uppercase tracking-wider block mb-2 select-none">
                        // PLANNED REFACTOR OPTIMIZATIONS
                      </span>
                      <ul className="space-y-1.5 text-xs text-slate-350 font-mono">
                        {project.nextImprovements.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-cyan-500 font-mono select-none">⚡</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer Panel */}
            <div className="px-5 py-4 border-t border-slate-850 bg-[#070b16] flex justify-end gap-2.5 shrink-0 select-none">
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <DashboardButton variant="slate" className="flex items-center gap-1 text-[11px] py-1 px-3">
                  <Github className="w-3.5 h-3.5" /> Repository
                </DashboardButton>
              </a>
              {project.liveDemoUrl ? (
                <a href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer">
                  <DashboardButton variant="blue" className="flex items-center gap-1 text-[11px] py-1 px-3">
                    <ExternalLink className="w-3.5 h-3.5" /> Live Signal
                  </DashboardButton>
                </a>
              ) : (
                <DashboardButton variant="slate" disabled className="flex items-center gap-1 opacity-50 text-[11px] py-1 px-3">
                  <ExternalLink className="w-3.5 h-3.5" /> Offline
                </DashboardButton>
              )}
            </div>
          </>
        )}
      </div>
    </div>,
    document.body
  );
};
