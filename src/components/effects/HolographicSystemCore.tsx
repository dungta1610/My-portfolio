import React, { useEffect, useRef, useState } from "react";
import { HOLOGRAM_MODES, HologramMode, HologramNode } from "../../lib/effects/hologramModes";
import { EFFECT_CONFIG } from "../../lib/effects/effectConfig";
import { useReactorState } from "../../context/ReactorContext";

interface HolographicSystemCoreProps {
  active?: boolean;
  hoveredProjectId?: string | null;
  activeSection?: string;
}

interface InterpolatedNode {
  x: number; // current 3D position
  y: number;
  z: number;
  tx: number; // target 3D position
  ty: number;
  tz: number;
  label: string;
  targetLabel: string;
  role: string;
  targetRole: string;
  alpha: number; // current opacity
  targetAlpha: number;
  scrambleCounter: number;
}

export const HolographicSystemCore: React.FC<HolographicSystemCoreProps> = ({
  active = true,
  hoveredProjectId: propHoveredProjectId,
  activeSection: propActiveSection,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const {
    currentMode,
    hoveredProjectId: contextHoveredProjectId,
    recruiterMode,
    reducedMotion,
  } = useReactorState();

  const hoveredProjectId = propHoveredProjectId !== undefined ? propHoveredProjectId : contextHoveredProjectId;
  const activeSection = propActiveSection || "hero";

  const [isVisible, setIsVisible] = useState(true);

  // Mouse coordinates to bias rotation
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  const modeKey = currentMode;
  const activeModeSchema = HOLOGRAM_MODES[modeKey];

  // Store the active mode in a ref to check for transitions
  const currentModeRef = useRef<HologramMode>(modeKey);

  // Persistent node pool to prevent pop/jump on mode transitions
  const interpolatedNodesRef = useRef<InterpolatedNode[]>([]);
  const NODE_POOL_SIZE = 16;

  if (interpolatedNodesRef.current.length === 0) {
    for (let i = 0; i < NODE_POOL_SIZE; i++) {
      interpolatedNodesRef.current.push({
        x: (Math.random() - 0.5) * 100,
        y: (Math.random() - 0.5) * 100,
        z: (Math.random() - 0.5) * 100,
        tx: 0,
        ty: 0,
        tz: 0,
        label: "",
        targetLabel: "",
        role: "",
        targetRole: "",
        alpha: 0,
        targetAlpha: 0,
        scrambleCounter: 0,
      });
    }
  }

  // Intersection Observer to pause drawing when offscreen
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // Track mouse coordinates
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      mouseRef.current.targetX = (e.clientX - cx) / (rect.width / 2);
      mouseRef.current.targetY = (e.clientY - cy) / (rect.height / 2);
    };

    const handleMouseLeave = () => {
      mouseRef.current.targetX = 0;
      mouseRef.current.targetY = 0;
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Main canvas animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = canvas.width;
    let height = canvas.height;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const interpolatedNodes = interpolatedNodesRef.current;

    // Function to apply active mode state to the node pool
    const applyModeToPool = (mode: HologramMode) => {
      const schema = HOLOGRAM_MODES[mode];
      const targetNodes = schema.nodes;

      for (let i = 0; i < NODE_POOL_SIZE; i++) {
        const node = interpolatedNodes[i];
        if (i < targetNodes.length) {
          const target = targetNodes[i];
          node.tx = target.x;
          node.ty = target.y;
          node.tz = target.z;
          node.targetLabel = target.label;
          node.targetRole = target.role || "";
          node.targetAlpha = 1;

          // Trigger text scramble if the label is changing
          if (node.label !== node.targetLabel) {
            node.scrambleCounter = 15;
            node.label = node.targetLabel;
            node.role = node.targetRole;
          }
        } else {
          // Fade out unused nodes, send them slowly back to center
          node.tx = 0;
          node.ty = 0;
          node.tz = 0;
          node.targetAlpha = 0;
          node.targetLabel = "";
          node.targetRole = "";
        }
      }
    };

    // Apply initial/updated mode
    applyModeToPool(modeKey);
    currentModeRef.current = modeKey;

    // ── Generate Auxiliary Background Sphere Points ──
    const bgSpherePoints: { x: number; y: number; z: number }[] = [];
    const numBgPoints = 30;
    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    for (let i = 0; i < numBgPoints; i++) {
      const t = i / numBgPoints;
      const inclination = Math.acos(1 - 2 * t);
      const azimuth = Math.PI * 2 * goldenRatio * i;
      const r = 70; // Smaller radius for background structure
      bgSpherePoints.push({
        x: Math.sin(inclination) * Math.cos(azimuth) * r,
        y: Math.sin(inclination) * Math.sin(azimuth) * r,
        z: Math.cos(inclination) * r,
      });
    }

    // Concentric orbiting rings
    const orbitRingPoints: { x: number; y: number; z: number }[] = [];
    const numRingPoints = 36;
    for (let i = 0; i < numRingPoints; i++) {
      const angle = (i / numRingPoints) * Math.PI * 2;
      orbitRingPoints.push({
        x: Math.cos(angle) * 115,
        y: 0,
        z: Math.sin(angle) * 115,
      });
    }

    // Animation rotation angles
    let rotX = 0;
    let rotY = 0;
    let rotZ = 0;

    const focalLength = 320;
    const cx = () => width / 2;
    const cy = () => height / 2;

    // Helper to generate scrambled text characters
    const getScrambledText = (len: number) => {
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_#@$";
      let result = "";
      for (let i = 0; i < len; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return result;
    };

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const activeMode = currentModeRef.current;
      const schema = HOLOGRAM_MODES[activeMode];

      // Smoothly update mouse bias
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // Calculate rotations based on configuration & mouse position
      const cfg = EFFECT_CONFIG.hologram;
      const hoverMult = hoveredProjectId ? cfg.hoverRotationMultiplier : 1.0;
      const speedX = (cfg.baseRotationSpeed.x + mouseRef.current.y * 0.01) * hoverMult * schema.baseSpeedMultiplier;
      const speedY = (cfg.baseRotationSpeed.y + mouseRef.current.x * 0.01) * hoverMult * schema.baseSpeedMultiplier;
      const speedZ = cfg.baseRotationSpeed.z * schema.baseSpeedMultiplier;

      if (recruiterMode) {
        rotX = 0;
        rotY = 0;
        rotZ = 0;
      } else {
        rotX += speedX;
        rotY += speedY;
        rotZ += speedZ;
      }

      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosZ = Math.cos(rotZ);
      const sinZ = Math.sin(rotZ);

      // Helper to rotate and project a 3D coordinate to 2D
      const projectPoint = (pt: { x: number; y: number; z: number }) => {
        // Rotate around Z axis
        let x1 = pt.x * cosZ - pt.y * sinZ;
        let y1 = pt.x * sinZ + pt.y * cosZ;
        let z1 = pt.z;

        // Rotate around Y axis
        let x2 = x1 * cosY - z1 * sinY;
        let y2 = y1;
        let z2 = x1 * sinY + z1 * cosY;

        // Rotate around X axis
        let x3 = x2;
        let y3 = y2 * cosX - z2 * sinX;
        let z3 = y2 * sinX + z2 * cosX;

        const scale = focalLength / (focalLength + z3);
        const px = cx() + x3 * scale;
        const py = cy() + y3 * scale;

        return { x: px, y: py, scale, z: z3 };
      };

      // ── 1. Render Mode-Specific Extra 3D Geometry ──

      // stockflow: Docker boundary cage (slow-rotating wireframe cube)
      if (activeMode === "stockflow") {
        const size = 75;
        const cubeVertices = [
          { x: -size, y: -size, z: -size },
          { x: size, y: -size, z: -size },
          { x: size, y: size, z: -size },
          { x: -size, y: size, z: -size },
          { x: -size, y: -size, z: size },
          { x: size, y: -size, z: size },
          { x: size, y: size, z: size },
          { x: -size, y: size, z: size },
        ];
        const proj = cubeVertices.map(projectPoint);
        const edges = [
          [0, 1], [1, 2], [2, 3], [3, 0], // front face
          [4, 5], [5, 6], [6, 7], [7, 4], // back face
          [0, 4], [1, 5], [2, 6], [3, 7], // connection lines
        ];
        
        ctx.strokeStyle = activeModeSchema.themeColor + "0.08)";
        ctx.lineWidth = 0.8;
        edges.forEach(([from, to]) => {
          const pt1 = proj[from];
          const pt2 = proj[to];
          ctx.beginPath();
          ctx.moveTo(pt1.x, pt1.y);
          ctx.lineTo(pt2.x, pt2.y);
          ctx.stroke();
        });
        
        // Draw small corner markers or text on the Docker Cage
        ctx.save();
        ctx.font = "6px monospace";
        ctx.fillStyle = activeModeSchema.accentColor + "0.3)";
        ctx.textAlign = "center";
        const labelPt = proj[0]; // Top-left front corner
        if (labelPt.z > -50) {
          ctx.fillText("DOCKER_CAGE_v1.2", labelPt.x, labelPt.y - 4);
        }
        ctx.restore();
      }

      // pocketAtlas: viewports flat planes (orbiting transparent panel frames)
      if (activeMode === "pocketAtlas") {
        const panels = [
          { depth: -40, w: 90, h: 50, color: "rgba(6, 182, 212, 0.07)" },
          { depth: 40, w: 75, h: 45, color: "rgba(139, 92, 246, 0.06)" },
        ];
        panels.forEach((p) => {
          const corners = [
            { x: -p.w / 2, y: -p.h / 2, z: p.depth },
            { x: p.w / 2, y: -p.h / 2, z: p.depth },
            { x: p.w / 2, y: p.h / 2, z: p.depth },
            { x: -p.w / 2, y: p.h / 2, z: p.depth },
          ];
          const proj = corners.map(projectPoint);

          ctx.beginPath();
          ctx.moveTo(proj[0].x, proj[0].y);
          for (let i = 1; i < proj.length; i++) {
            ctx.lineTo(proj[i].x, proj[i].y);
          }
          ctx.closePath();
          ctx.strokeStyle = activeModeSchema.accentColor + "0.15)";
          ctx.lineWidth = 0.8;
          ctx.stroke();

          ctx.fillStyle = p.color;
          ctx.fill();

          // Corner crosshairs
          proj.forEach((pt) => {
            ctx.strokeStyle = activeModeSchema.themeColor + "0.3)";
            ctx.beginPath();
            ctx.moveTo(pt.x - 3, pt.y); ctx.lineTo(pt.x + 3, pt.y);
            ctx.moveTo(pt.x, pt.y - 3); ctx.lineTo(pt.x, pt.y + 3);
            ctx.stroke();
          });
        });
      }

      // skills: stacked layers & concentric feedback rings
      if (activeMode === "skills") {
        const ringSizes = [80, 50];
        ringSizes.forEach((r, idx) => {
          ctx.beginPath();
          const theta = (Date.now() * 0.001 * (idx === 0 ? 1 : -1)) % (Math.PI * 2);
          for (let i = 0; i <= 36; i++) {
            const angle = (i / 36) * Math.PI * 2 + theta;
            const pt = projectPoint({
              x: Math.cos(angle) * r,
              y: Math.sin(angle) * r * 0.3, // Skewed
              z: Math.sin(angle) * r * 0.9,
            });
            if (i === 0) ctx.moveTo(pt.x, pt.y);
            else ctx.lineTo(pt.x, pt.y);
          }
          ctx.strokeStyle = idx === 0 
            ? activeModeSchema.themeColor + "0.18)" 
            : activeModeSchema.accentColor + "0.12)";
          ctx.lineWidth = 1;
          ctx.stroke();
        });

        // draw stacked layer grid
        const size = 50;
        const gridPoints = [
          { x: -size, y: 15, z: -size },
          { x: size, y: 15, z: -size },
          { x: size, y: 15, z: size },
          { x: -size, y: 15, z: size },
        ];
        const proj = gridPoints.map(projectPoint);

        ctx.beginPath();
        ctx.moveTo(proj[0].x, proj[0].y);
        ctx.lineTo(proj[1].x, proj[1].y);
        ctx.lineTo(proj[2].x, proj[2].y);
        ctx.lineTo(proj[3].x, proj[3].y);
        ctx.closePath();
        ctx.strokeStyle = activeModeSchema.themeColor + "0.08)";
        ctx.stroke();
      }

      // github: background scrolling code columns
      if (activeMode === "github") {
        ctx.save();
        ctx.font = "7px monospace";
        ctx.fillStyle = "rgba(6, 182, 212, 0.08)";
        ctx.textAlign = "left";
        const lines = ["git commit -m 'feat: upgraded telemetry'", "git push origin main", "sha256: d82af91c", "status: nominal", "matrix: synced"];
        for (let i = 0; i < lines.length; i++) {
          const pt = projectPoint({
            x: -95,
            y: -50 + i * 22,
            z: 20 - (i % 2) * 20,
          });
          if (pt.z > -50) {
            ctx.fillText(lines[i], pt.x, pt.y);
          }
        }
        ctx.restore();
      }

      // contact: expanding wave ripples
      if (activeMode === "contact") {
        ctx.save();
        const time = Date.now() * 0.002;
        ctx.lineWidth = 1;
        for (let rIdx = 1; rIdx <= 3; rIdx++) {
          const radius = ((time * 20 + rIdx * 30) % 90);
          const opacity = Math.max(0, 1 - radius / 90) * 0.15;
          ctx.strokeStyle = activeModeSchema.themeColor + `${opacity})`;
          ctx.beginPath();
          ctx.arc(cx(), cy(), radius, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.restore();
      }

      // recruiter: static diagnostic radar circle
      if (activeMode === "recruiter") {
        ctx.strokeStyle = activeModeSchema.themeColor + "0.08)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(cx(), cy(), 90, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = activeModeSchema.accentColor + "0.04)";
        ctx.beginPath();
        ctx.arc(cx(), cy(), 60, 0, Math.PI * 2);
        ctx.stroke();
      }

      // ── 2. Interpolate and Project Node Pool Coordinates ──
      const projectedNodes = interpolatedNodes.map((node) => {
        // Smoothly morph coordinate values towards targets
        const lerpFactor = reducedMotion ? 0.25 : 0.08;
        node.x += (node.tx - node.x) * lerpFactor;
        node.y += (node.ty - node.y) * lerpFactor;
        node.z += (node.tz - node.z) * lerpFactor;
        node.alpha += (node.targetAlpha - node.alpha) * lerpFactor;

        if (node.scrambleCounter > 0) {
          node.scrambleCounter--;
        }

        const proj = projectPoint({ x: node.x, y: node.y, z: node.z });
        return {
          ...proj,
          label: node.label,
          targetLabel: node.targetLabel,
          role: node.role,
          alpha: node.alpha,
          scrambleCounter: node.scrambleCounter,
        };
      });

      // ── 3. Draw Orbit Rings & Background Orbs ──
      const projectedOrbitRing = orbitRingPoints.map(projectPoint);
      ctx.beginPath();
      for (let i = 0; i < projectedOrbitRing.length; i++) {
        const curr = projectedOrbitRing[i];
        const next = projectedOrbitRing[(i + 1) % projectedOrbitRing.length];
        const depthAlpha = Math.max(0.04, Math.min(0.25, 0.16 + curr.z / 180));
        ctx.strokeStyle = activeModeSchema.themeColor + `${depthAlpha * 0.8})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(curr.x, curr.y);
        ctx.lineTo(next.x, next.y);
        ctx.stroke();
      }

      // Background mesh node connections (adds sci-fi complexity)
      const projectedBgSphere = bgSpherePoints.map(projectPoint);
      ctx.lineWidth = 0.5;
      for (let i = 0; i < projectedBgSphere.length; i++) {
        const pt1 = projectedBgSphere[i];
        for (let j = i + 1; j < projectedBgSphere.length; j++) {
          const pt2 = projectedBgSphere[j];
          const dist = Math.hypot(
            bgSpherePoints[i].x - bgSpherePoints[j].x,
            bgSpherePoints[i].y - bgSpherePoints[j].y,
            bgSpherePoints[i].z - bgSpherePoints[j].z
          );
          if (dist < 40) {
            const avgDepth = (pt1.z + pt2.z) / 2;
            const lineAlpha = Math.max(0.01, Math.min(0.12, (1 - dist / 40) * (0.06 + avgDepth / 250)));
            ctx.strokeStyle = activeModeSchema.accentColor + `${lineAlpha})`;
            ctx.beginPath();
            ctx.moveTo(pt1.x, pt1.y);
            ctx.lineTo(pt2.x, pt2.y);
            ctx.stroke();
          }
        }
      }

      // ── 4. Draw Relational Connection Paths & Data Pulses ──
      ctx.lineWidth = 0.7;
      schema.connections.forEach((conn) => {
        const p1 = projectedNodes[conn.fromIndex];
        const p2 = projectedNodes[conn.toIndex];

        if (p1 && p2 && p1.alpha > 0.1 && p2.alpha > 0.1) {
          const avgAlpha = (p1.alpha + p2.alpha) / 2;
          const avgDepth = (p1.z + p2.z) / 2;
          const alphaFactor = Math.max(0.02, Math.min(0.35, 0.2 + avgDepth / 160)) * avgAlpha;

          ctx.strokeStyle = activeModeSchema.accentColor + `${alphaFactor})`;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();

          // pulsing data packets flowing along lines
          if (activeMode === "stockflow" || activeMode === "idle" || activeMode === "skills" || activeMode === "pocketAtlas") {
            const time = Date.now() * 0.0015;
            const progress = (time + conn.fromIndex * 0.15) % 1.0;
            // Interpolate coordinates
            const pulse3DX = schema.nodes[conn.fromIndex].x + (schema.nodes[conn.toIndex].x - schema.nodes[conn.fromIndex].x) * progress;
            const pulse3DY = schema.nodes[conn.fromIndex].y + (schema.nodes[conn.toIndex].y - schema.nodes[conn.fromIndex].y) * progress;
            const pulse3DZ = schema.nodes[conn.fromIndex].z + (schema.nodes[conn.toIndex].z - schema.nodes[conn.fromIndex].z) * progress;

            const pulseProj = projectPoint({ x: pulse3DX, y: pulse3DY, z: pulse3DZ });
            const pulseAlpha = Math.max(0, Math.min(0.9, Math.sin(progress * Math.PI))) * avgAlpha;

            ctx.fillStyle = activeModeSchema.themeColor + `${pulseAlpha})`;
            ctx.beginPath();
            ctx.arc(pulseProj.x, pulseProj.y, 2.2 * pulseProj.scale, 0, Math.PI * 2);
            ctx.fill();

            // Glow core
            ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
            ctx.beginPath();
            ctx.arc(pulseProj.x, pulseProj.y, 1.0 * pulseProj.scale, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      });

      // ── 5. Draw Core Topology Nodes & Glow Rings ──
      for (let i = 0; i < projectedNodes.length; i++) {
        const pt = projectedNodes[i];
        if (pt.alpha < 0.05) continue;

        const size = Math.max(1.2, Math.min(5, 2.8 * pt.scale));
        const alpha = Math.max(0.1, Math.min(0.9, 0.5 + pt.z / 160)) * pt.alpha;

        ctx.beginPath();
        ctx.arc(pt.x, pt.y, size, 0, Math.PI * 2);
        ctx.fillStyle = i % 2 === 0
          ? activeModeSchema.themeColor + `${alpha})`
          : activeModeSchema.accentColor + `${alpha})`;
        ctx.fill();

        // Draw node radial halo glows for foreground nodes
        if (pt.z > 30) {
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, size * 3.5, 0, Math.PI * 2);
          ctx.fillStyle = activeModeSchema.themeColor + `${alpha * 0.08})`;
          ctx.fill();
        }

        // Draw labeling readouts
        if (pt.label) {
          const textAlpha = Math.max(0.05, Math.min(0.7, 0.4 + pt.z / 160)) * pt.alpha;
          ctx.save();
          ctx.font = "8px monospace";
          ctx.fillStyle = activeModeSchema.themeColor + `${textAlpha})`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";

          // If scrambled, show scrambled characters
          const labelToRender = pt.scrambleCounter > 0 
            ? getScrambledText(pt.targetLabel.length)
            : pt.targetLabel;

          // Shift text slightly above particle node
          const textY = pt.y - 8 * pt.scale;
          ctx.fillText(labelToRender, pt.x, textY);

          // Micro ticks
          ctx.strokeStyle = activeModeSchema.accentColor + `${textAlpha * 0.35})`;
          ctx.beginPath();
          ctx.moveTo(pt.x - 3, textY); ctx.lineTo(pt.x + 3, textY);
          ctx.stroke();

          ctx.restore();
        }
      }

      // ── 6. Central Pulsating Hologram Core Orb ──
      const pulseFreq = EFFECT_CONFIG.hologram.pulseFrequency;
      const pulseScale = 1 + Math.sin(Date.now() * pulseFreq) * 0.12;
      const coreX = cx();
      const coreY = cy();

      const grad = ctx.createRadialGradient(
        coreX, coreY, 2 * pulseScale,
        coreX, coreY, 20 * pulseScale
      );
      grad.addColorStop(0, "rgba(255, 255, 255, 0.95)");
      grad.addColorStop(0.2, activeModeSchema.themeColor + "0.7)");
      grad.addColorStop(0.5, activeModeSchema.accentColor + "0.22)");
      grad.addColorStop(1, "rgba(5, 7, 13, 0)");

      ctx.beginPath();
      ctx.arc(coreX, coreY, 22 * pulseScale, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      // Core grid shell circles
      ctx.strokeStyle = activeModeSchema.themeColor + "0.08)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(coreX, coreY, 30 * pulseScale, 0, Math.PI * 2);
      ctx.stroke();

      // ── 7. Downward Target Locator Coordinate Beam ──
      if (hoveredProjectId) {
        ctx.save();
        ctx.beginPath();
        const beamGrad = ctx.createLinearGradient(coreX, coreY, coreX, height);
        beamGrad.addColorStop(0, activeModeSchema.themeColor + "0.45)");
        beamGrad.addColorStop(0.65, activeModeSchema.accentColor + "0.14)");
        beamGrad.addColorStop(1, "rgba(6, 182, 212, 0)");
        ctx.strokeStyle = beamGrad;
        ctx.lineWidth = EFFECT_CONFIG.hologram.beamStrength;
        ctx.setLineDash([4, 4]); // Sci-fi data dashes
        ctx.moveTo(coreX, coreY);
        ctx.lineTo(coreX, height);
        ctx.stroke();
        ctx.restore();
      }
      // ── 8. Request Next Frame ──
      if (isVisible && active && !reducedMotion && !recruiterMode) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    // Watch for mode updates to trigger configuration updates
    if (currentModeRef.current !== modeKey) {
      currentModeRef.current = modeKey;
      applyModeToPool(modeKey);
    }

    if (active && !reducedMotion && !recruiterMode) {
      render();
    } else {
      // Damped static layout render for reduced-motion/paused/recruiter modes
      render();
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [isVisible, active, reducedMotion, modeKey, hoveredProjectId, recruiterMode]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full min-h-[300px] md:min-h-[400px] flex items-center justify-center relative overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full absolute inset-0 select-none pointer-events-none"
        style={{ maxWidth: "100%", maxHeight: "100%" }}
      />
      {/* Dynamic theme concentric frames */}
      <div 
        className="absolute inset-0 border border-current rounded-full pointer-events-none scale-75 animate-radar-spin border-dashed select-none transition-colors duration-500" 
        style={{ 
          color: activeModeSchema.accentColor + "1)",
          opacity: 0.08
        }} 
      />
      <div 
        className="absolute inset-0 border border-current rounded-full pointer-events-none scale-50 animate-scan-line select-none transition-colors duration-500" 
        style={{ 
          color: activeModeSchema.themeColor + "1)",
          animationDuration: "7s", 
          animationDirection: "reverse",
          opacity: 0.06
        }} 
      />
    </div>
  );
};
