"use client";

import React, { useEffect, useRef, useState } from "react";
import { useReactorState } from "../../context/ReactorContext";

interface Node {
  id: string;
  label: string;
  px: number; // percentage X (0 to 1)
  py: number; // percentage Y (0 to 1)
  baseOpacity: number;
  type: "backbone" | "stockflow" | "pocketatlas";
  group: string;
}

interface Edge {
  from: string;
  to: string;
  type: "backbone" | "stockflow" | "pocketatlas";
}

export const LivingArchitectureBackground: React.FC = () => {
  const { recruiterMode, reducedMotion, hoveredProjectId } = useReactorState();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Mouse tracking state
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile/touch pointer to disable mouse spotlight
    const checkMobile = () => {
      const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
      const widthMobile = window.innerWidth < 768;
      setIsMobile(coarsePointer || widthMobile);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    if (!isMobile) {
      window.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isMobile]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;
    
    // Pulse progress variables
    let pulseProgress = 0;

    // Define Backbone nodes
    const backboneNodes: Node[] = [
      { id: "bb1", label: "NET_GATEWAY", px: 0.12, py: 0.18, baseOpacity: 0.08, type: "backbone", group: "core" },
      { id: "bb2", label: "EDGE_ROUTER", px: 0.28, py: 0.14, baseOpacity: 0.08, type: "backbone", group: "core" },
      { id: "bb3", label: "LOAD_BALANCER", px: 0.44, py: 0.22, baseOpacity: 0.08, type: "backbone", group: "core" },
      { id: "bb4", label: "AUTH_BUS", px: 0.08, py: 0.42, baseOpacity: 0.08, type: "backbone", group: "core" },
      { id: "bb5", label: "VCS_SERVICE", px: 0.26, py: 0.48, baseOpacity: 0.08, type: "backbone", group: "core" },
      { id: "bb6", label: "CACHE_SERVER", px: 0.48, py: 0.44, baseOpacity: 0.08, type: "backbone", group: "core" },
      { id: "bb7", label: "DB_NODE_A", px: 0.16, py: 0.72, baseOpacity: 0.08, type: "backbone", group: "core" },
      { id: "bb8", label: "LOG_AGGREGATOR", px: 0.32, py: 0.78, baseOpacity: 0.08, type: "backbone", group: "core" },
      { id: "bb9", label: "MESSAGE_QUEUE", px: 0.50, py: 0.74, baseOpacity: 0.08, type: "backbone", group: "core" },
      
      { id: "bb10", label: "API_DNS", px: 0.64, py: 0.18, baseOpacity: 0.08, type: "backbone", group: "core" },
      { id: "bb11", label: "CDN_SERVER", px: 0.84, py: 0.14, baseOpacity: 0.08, type: "backbone", group: "core" },
      { id: "bb12", label: "INFERENCE_API", px: 0.68, py: 0.48, baseOpacity: 0.08, type: "backbone", group: "core" },
      { id: "bb13", label: "STORAGE_S3", px: 0.86, py: 0.44, baseOpacity: 0.08, type: "backbone", group: "core" },
      { id: "bb14", label: "MONITOR_AGENT", px: 0.62, py: 0.78, baseOpacity: 0.08, type: "backbone", group: "core" },
      { id: "bb15", label: "DB_NODE_B", px: 0.78, py: 0.72, baseOpacity: 0.08, type: "backbone", group: "core" },
      { id: "bb16", label: "METRIC_COLLECT", px: 0.92, py: 0.58, baseOpacity: 0.08, type: "backbone", group: "core" },
    ];

    const backboneEdges: Edge[] = [
      { from: "bb1", to: "bb2", type: "backbone" },
      { from: "bb2", to: "bb3", type: "backbone" },
      { from: "bb3", to: "bb6", type: "backbone" },
      { from: "bb4", to: "bb5", type: "backbone" },
      { from: "bb5", to: "bb6", type: "backbone" },
      { from: "bb4", to: "bb7", type: "backbone" },
      { from: "bb5", to: "bb8", type: "backbone" },
      { from: "bb6", to: "bb9", type: "backbone" },
      { from: "bb7", to: "bb8", type: "backbone" },
      { from: "bb8", to: "bb9", type: "backbone" },
      
      { from: "bb10", to: "bb11", type: "backbone" },
      { from: "bb10", to: "bb12", type: "backbone" },
      { from: "bb11", to: "bb13", type: "backbone" },
      { from: "bb12", to: "bb13", type: "backbone" },
      { from: "bb12", to: "bb15", type: "backbone" },
      { from: "bb13", to: "bb16", type: "backbone" },
      { from: "bb14", to: "bb15", type: "backbone" },
      { from: "bb15", to: "bb16", type: "backbone" },
      { from: "bb9", to: "bb14", type: "backbone" },
      { from: "bb3", to: "bb10", type: "backbone" },
    ];

    // Define StockFlow cluster nodes (Backend-related, right side)
    const stockflowNodes: Node[] = [
      { id: "sf1", label: "CLIENT_UI", px: 0.62, py: 0.38, baseOpacity: 0, type: "stockflow", group: "stockflow" },
      { id: "sf2", label: "GO_API_GATEWAY", px: 0.70, py: 0.44, baseOpacity: 0, type: "stockflow", group: "stockflow" },
      { id: "sf3", label: "ORDERS_SVC", px: 0.78, py: 0.35, baseOpacity: 0, type: "stockflow", group: "stockflow" },
      { id: "sf4", label: "INVENTORY_SVC", px: 0.78, py: 0.50, baseOpacity: 0, type: "stockflow", group: "stockflow" },
      { id: "sf5", label: "PAYMENTS_SVC", px: 0.78, py: 0.65, baseOpacity: 0, type: "stockflow", group: "stockflow" },
      { id: "sf6", label: "RABBITMQ_BUS", px: 0.85, py: 0.44, baseOpacity: 0, type: "stockflow", group: "stockflow" },
      { id: "sf7", label: "POSTGRESQL", px: 0.92, py: 0.35, baseOpacity: 0, type: "stockflow", group: "stockflow" },
      { id: "sf8", label: "REDIS_CACHE", px: 0.92, py: 0.50, baseOpacity: 0, type: "stockflow", group: "stockflow" },
      { id: "sf9", label: "DOCKER_HOST", px: 0.92, py: 0.65, baseOpacity: 0, type: "stockflow", group: "stockflow" },
    ];

    const stockflowEdges: Edge[] = [
      { from: "sf1", to: "sf2", type: "stockflow" },
      { from: "sf2", to: "sf3", type: "stockflow" },
      { from: "sf2", to: "sf4", type: "stockflow" },
      { from: "sf2", to: "sf5", type: "stockflow" },
      { from: "sf3", to: "sf6", type: "stockflow" },
      { from: "sf4", to: "sf6", type: "stockflow" },
      { from: "sf6", to: "sf7", type: "stockflow" },
      { from: "sf3", to: "sf8", type: "stockflow" },
      { from: "sf5", to: "sf9", type: "stockflow" },
    ];

    // Define PocketAtlas cluster nodes (Frontend-related, left side)
    const pocketatlasNodes: Node[] = [
      { id: "pa1", label: "UI_VIEW", px: 0.08, py: 0.46, baseOpacity: 0, type: "pocketatlas", group: "pocketatlas" },
      { id: "pa2", label: "REACT_COMP", px: 0.18, py: 0.36, baseOpacity: 0, type: "pocketatlas", group: "pocketatlas" },
      { id: "pa3", label: "UX_RENDER", px: 0.18, py: 0.54, baseOpacity: 0, type: "pocketatlas", group: "pocketatlas" },
      { id: "pa4", label: "NEXT_ENGINE", px: 0.26, py: 0.46, baseOpacity: 0, type: "pocketatlas", group: "pocketatlas" },
      { id: "pa5", label: "BFF_SERVER", px: 0.34, py: 0.36, baseOpacity: 0, type: "pocketatlas", group: "pocketatlas" },
      { id: "pa6", label: "API_PROXY", px: 0.34, py: 0.54, baseOpacity: 0, type: "pocketatlas", group: "pocketatlas" },
      { id: "pa7", label: "LOC_SERVICE", px: 0.42, py: 0.46, baseOpacity: 0, type: "pocketatlas", group: "pocketatlas" },
      { id: "pa8", label: "MAP_TILES", px: 0.42, py: 0.62, baseOpacity: 0, type: "pocketatlas", group: "pocketatlas" },
    ];

    const pocketatlasEdges: Edge[] = [
      { from: "pa1", to: "pa2", type: "pocketatlas" },
      { from: "pa1", to: "pa3", type: "pocketatlas" },
      { from: "pa2", to: "pa4", type: "pocketatlas" },
      { from: "pa3", to: "pa4", type: "pocketatlas" },
      { from: "pa4", to: "pa5", type: "pocketatlas" },
      { from: "pa4", to: "pa6", type: "pocketatlas" },
      { from: "pa5", to: "pa7", type: "pocketatlas" },
      { from: "pa6", to: "pa8", type: "pocketatlas" },
    ];

    const allNodes = [...backboneNodes, ...stockflowNodes, ...pocketatlasNodes];
    const allEdges = [...backboneEdges, ...stockflowEdges, ...pocketatlasEdges];

    // Maintain current opacities for clean fading transitions
    const opacitiesRef: Record<string, number> = {};
    allNodes.forEach((n) => {
      opacitiesRef[n.id] = n.baseOpacity;
    });

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const render = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (w === 0 || h === 0) {
        animationId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, w, h);
      time += reducedMotion ? 0 : 0.5;

      const pId = hoveredProjectId ? hoveredProjectId.toLowerCase() : "";
      const showStockFlow = pId === "stockflow";
      const showPocketAtlas = pId === "pocketatlas";

      // 1. Draw Network Connections (Edges)
      allEdges.forEach((edge) => {
        const fromNode = allNodes.find((n) => n.id === edge.from);
        const toNode = allNodes.find((n) => n.id === edge.to);
        if (!fromNode || !toNode) return;

        // Calculate absolute position with slight organic floating shift
        const floatScale = reducedMotion ? 0 : 4;
        const fx1 = Math.sin(time * 0.015 + fromNode.px * 100) * floatScale;
        const fy1 = Math.cos(time * 0.012 + fromNode.py * 100) * floatScale;
        const fx2 = Math.sin(time * 0.015 + toNode.px * 100) * floatScale;
        const fy2 = Math.cos(time * 0.012 + toNode.py * 100) * floatScale;

        const x1 = fromNode.px * w + fx1;
        const y1 = fromNode.py * h + fy1;
        const x2 = toNode.px * w + fx2;
        const y2 = toNode.py * h + fy2;

        // Interpolate individual node opacities
        let targetFromOpacity = fromNode.baseOpacity;
        let targetToOpacity = toNode.baseOpacity;

        if (edge.type === "stockflow") {
          targetFromOpacity = showStockFlow ? 0.45 : 0;
          targetToOpacity = showStockFlow ? 0.45 : 0;
        } else if (edge.type === "pocketatlas") {
          targetFromOpacity = showPocketAtlas ? 0.45 : 0;
          targetToOpacity = showPocketAtlas ? 0.45 : 0;
        } else {
          // Backbone nodes fade down slightly to bring active architecture to the foreground
          if (showStockFlow || showPocketAtlas) {
            targetFromOpacity = 0.025;
            targetToOpacity = 0.025;
          }
        }

        opacitiesRef[fromNode.id] += (targetFromOpacity - opacitiesRef[fromNode.id]) * 0.08;
        opacitiesRef[toNode.id] += (targetToOpacity - opacitiesRef[toNode.id]) * 0.08;

        const edgeOpacity = Math.min(opacitiesRef[fromNode.id], opacitiesRef[toNode.id]);
        if (edgeOpacity < 0.005) return;

        // Mouse Spotlight spotlight check on edges (checks midpoint)
        let spotlightBonus = 1;
        if (mouseRef.current.active && !isMobile && !reducedMotion) {
          const midX = (x1 + x2) / 2;
          const midY = (y1 + y2) / 2;
          const dx = midX - mouseRef.current.x;
          const dy = midY - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            spotlightBonus = 1.0 + (1.0 - dist / 180) * 1.5;
          }
        }

        ctx.strokeStyle = edge.type === "stockflow" 
          ? `rgba(6, 182, 212, ${edgeOpacity * spotlightBonus})` 
          : edge.type === "pocketatlas"
            ? `rgba(139, 92, 246, ${edgeOpacity * spotlightBonus})`
            : `rgba(99, 102, 241, ${edgeOpacity * spotlightBonus})`;

        ctx.lineWidth = edge.type === "backbone" ? 0.6 : 1.0;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        // Draw active architecture signal pulses
        if ((edge.type === "stockflow" && showStockFlow) || (edge.type === "pocketatlas" && showPocketAtlas)) {
          const pulseX = x1 + (x2 - x1) * pulseProgress;
          const pulseY = y1 + (y2 - y1) * pulseProgress;
          ctx.fillStyle = edge.type === "stockflow" ? "#06b6d4" : "#8b5cf6";
          ctx.beginPath();
          ctx.arc(pulseX, pulseY, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // 2. Draw Nodes and Labels
      allNodes.forEach((node) => {
        const floatScale = reducedMotion ? 0 : 4;
        const fx = Math.sin(time * 0.015 + node.px * 100) * floatScale;
        const fy = Math.cos(time * 0.012 + node.py * 100) * floatScale;
        const x = node.px * w + fx;
        const y = node.py * h + fy;

        const currentOpacity = opacitiesRef[node.id];
        if (currentOpacity < 0.005) return;

        // Mouse Spotlight spotlight check on nodes
        let spotlightBonus = 1;
        let isHighlightedByMouse = false;
        if (mouseRef.current.active && !isMobile && !reducedMotion) {
          const dx = x - mouseRef.current.x;
          const dy = y - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            spotlightBonus = 1.0 + (1.0 - dist / 180) * 1.5;
            isHighlightedByMouse = true;
          }
        }

        const nodeColor = node.type === "stockflow" 
          ? `rgba(6, 182, 212, ${currentOpacity * spotlightBonus})` 
          : node.type === "pocketatlas"
            ? `rgba(139, 92, 246, ${currentOpacity * spotlightBonus})`
            : `rgba(99, 102, 241, ${currentOpacity * spotlightBonus})`;

        // Draw Node Core Dot
        ctx.fillStyle = nodeColor;
        ctx.beginPath();
        ctx.arc(x, y, node.type === "backbone" ? 2 : 3, 0, Math.PI * 2);
        ctx.fill();

        // Draw outer glow ring for highlighted or active nodes
        if (node.type !== "backbone" || isHighlightedByMouse) {
          ctx.strokeStyle = nodeColor;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.arc(x, y, node.type === "backbone" ? 5 : 7, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Draw labels for active architecture clusters
        if (node.type !== "backbone") {
          ctx.fillStyle = node.type === "stockflow" 
            ? `rgba(228, 228, 231, ${currentOpacity * 1.5})` 
            : `rgba(228, 228, 231, ${currentOpacity * 1.5})`;
          ctx.font = "bold 7px monospace";
          ctx.textAlign = "center";
          ctx.fillText(node.label, x, y - 10);
        }
      });

      // Animate pulse progress forward
      pulseProgress += reducedMotion ? 0 : 0.006;
      if (pulseProgress > 1) pulseProgress = 0;

      if (!reducedMotion) {
        animationId = requestAnimationFrame(render);
      }
    };

    if (!recruiterMode) {
      render();
    }

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [hoveredProjectId, recruiterMode, reducedMotion, isMobile]);

  if (recruiterMode) {
    return (
      <div 
        className="fixed inset-0 pointer-events-none select-none"
        style={{
          zIndex: -10,
          background: "radial-gradient(circle at 50% 50%, rgba(39, 39, 42, 0.1) 0%, rgba(9, 9, 11, 0.98) 100%)",
        }}
        aria-hidden="true"
      />
    );
  }

  return (
    <>
      {/* CSS-Animated Premium Aurora Gradient Glows */}
      <div 
        className="fixed inset-0 pointer-events-none select-none overflow-hidden" 
        style={{ zIndex: -8 }}
        aria-hidden="true"
      >
        <style>{`
          @keyframes aurora-float-1 {
            0%, 100% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(80px, 50px) scale(1.15); }
            66% { transform: translate(-50px, 80px) scale(0.9); }
          }
          @keyframes aurora-float-2 {
            0%, 100% { transform: translate(0px, 0px) scale(1.1); }
            50% { transform: translate(-100px, -60px) scale(0.85); }
          }
          @keyframes aurora-float-3 {
            0%, 100% { transform: translate(0px, 0px) scale(0.9); }
            40% { transform: translate(60px, -80px) scale(1.1); }
          }
          .aurora-blur-1 {
            animation: aurora-float-1 35s ease-in-out infinite;
          }
          .aurora-blur-2 {
            animation: aurora-float-2 42s ease-in-out infinite;
          }
          .aurora-blur-3 {
            animation: aurora-float-3 28s ease-in-out infinite;
          }
        `}</style>
        
        {/* Aurora Node 1: Cyan Glow */}
        <div 
          className={`absolute top-[-10%] left-[-10%] w-[55vw] h-[55vh] rounded-full bg-cyan-500/4 blur-[140px] pointer-events-none ${reducedMotion ? "" : "aurora-blur-1"}`}
        />
        
        {/* Aurora Node 2: Violet Glow */}
        <div 
          className={`absolute bottom-[-15%] right-[-10%] w-[65vw] h-[65vh] rounded-full bg-violet-500/3 blur-[150px] pointer-events-none ${reducedMotion ? "" : "aurora-blur-2"}`}
        />
        
        {/* Aurora Node 3: Emerald Glow */}
        <div 
          className={`absolute top-[35%] left-[25%] w-[45vw] h-[45vh] rounded-full bg-emerald-500/2.5 blur-[130px] pointer-events-none ${reducedMotion ? "" : "aurora-blur-3"}`}
        />
      </div>

      {/* Mouse spotlight backing reflection for full-screen commands (desktop only) */}
      {!isMobile && !reducedMotion && (
        <div 
          className="fixed inset-0 pointer-events-none select-none z-[-7] transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 250px at var(--mouse-x, -1000px) var(--mouse-y, -1000px), rgba(99, 102, 241, 0.015), transparent 85%)`,
          }}
          ref={(el) => {
            if (el) {
              const handleMove = (e: MouseEvent) => {
                el.style.setProperty("--mouse-x", `${e.clientX}px`);
                el.style.setProperty("--mouse-y", `${e.clientY}px`);
              };
              window.addEventListener("mousemove", handleMove);
            }
          }}
        />
      )}

      {/* HTML5 Canvas Network Field Overlay */}
      <canvas 
        ref={canvasRef} 
        className="fixed inset-0 w-full h-full pointer-events-none select-none z-[-6] opacity-75"
        style={{ mixBlendMode: "screen" }}
        aria-hidden="true"
      />
    </>
  );
};
