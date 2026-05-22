export interface HologramNode {
  label: string;
  x: number; // target local coordinate (-100 to 100)
  y: number;
  z: number;
  role?: string;
}

export interface HologramConnection {
  fromIndex: number;
  toIndex: number;
}

export interface HologramModeSchema {
  name: string;
  themeColor: string; // rgba base color for primary elements
  accentColor: string; // rgba base color for secondary elements
  nodes: HologramNode[];
  connections: HologramConnection[];
  baseSpeedMultiplier: number;
}

export type HologramMode = "idle" | "stockflow" | "pocketAtlas" | "skills" | "github" | "contact" | "recruiter";

export const HOLOGRAM_MODES: Record<HologramMode, HologramModeSchema> = {
  idle: {
    name: "System Idle State",
    themeColor: "rgba(6, 182, 212, ", // Cyan base
    accentColor: "rgba(139, 92, 246, ", // Violet accent
    baseSpeedMultiplier: 1.0,
    nodes: [
      { label: "CORE_READY", x: 0, y: -80, z: 0, role: "STATUS" },
      { label: "SYS_UPTIME", x: 75, y: 15, z: -30, role: "METRIC" },
      { label: "PORT_8080", x: -65, y: 20, z: 50, role: "PORT" },
      { label: "LATENCY_5MS", x: 0, y: 80, z: -20, role: "STATUS" },
      { label: "SYS_BUS_OK", x: -40, y: -30, z: -60, role: "TELEMETRY" },
      { label: "MEM_USAGE_12%", x: 50, y: -40, z: 50, role: "METRIC" },
    ],
    connections: [
      { fromIndex: 0, toIndex: 1 },
      { fromIndex: 0, toIndex: 2 },
      { fromIndex: 1, toIndex: 3 },
      { fromIndex: 2, toIndex: 3 },
      { fromIndex: 4, toIndex: 5 },
      { fromIndex: 0, toIndex: 4 },
      { fromIndex: 3, toIndex: 5 },
    ],
  },
  stockflow: {
    name: "StockFlow Backend Architecture",
    themeColor: "rgba(16, 185, 129, ", // Emerald base
    accentColor: "rgba(6, 182, 212, ", // Cyan accent
    baseSpeedMultiplier: 1.5,
    nodes: [
      { label: "CLIENT_UI", x: -80, y: 0, z: 0, role: "CLIENT" },
      { label: "GO_API_GATEWAY", x: -45, y: 0, z: 0, role: "GATEWAY" },
      { label: "SERVICE_LAYER", x: -10, y: 0, z: 0, role: "CORE" },
      { label: "POSTGRESQL", x: 30, y: 40, z: 20, role: "DATABASE" },
      { label: "REDIS_CACHE", x: 30, y: -40, z: -20, role: "CACHE" },
      { label: "ORDERS_SVC", x: 75, y: 50, z: 40, role: "SERVICE" },
      { label: "INVENTORY_SVC", x: 75, y: 0, z: 0, role: "SERVICE" },
      { label: "PAYMENTS_SVC", x: 75, y: -50, z: -40, role: "SERVICE" },
      { label: "RATE_LIMITER", x: -45, y: -45, z: 20, role: "GATEWAY" },
      { label: "AUTH_SVC", x: -10, y: -45, z: -20, role: "SECURITY" },
    ],
    connections: [
      { fromIndex: 0, toIndex: 1 }, // Client -> Gateway
      { fromIndex: 1, toIndex: 2 }, // Gateway -> Service
      { fromIndex: 1, toIndex: 8 }, // Gateway -> Rate Limiter
      { fromIndex: 2, toIndex: 9 }, // Service -> Auth
      { fromIndex: 2, toIndex: 3 }, // Service -> Postgres
      { fromIndex: 2, toIndex: 4 }, // Service -> Redis
      { fromIndex: 2, toIndex: 5 }, // Service -> Orders
      { fromIndex: 2, toIndex: 6 }, // Service -> Inventory
      { fromIndex: 2, toIndex: 7 }, // Service -> Payments
      { fromIndex: 3, toIndex: 4 }, // DB Sync
    ],
  },
  pocketAtlas: {
    name: "Pocket Atlas Fullstack System",
    themeColor: "rgba(6, 182, 212, ", // Cyan base
    accentColor: "rgba(139, 92, 246, ", // Violet accent
    baseSpeedMultiplier: 1.4,
    nodes: [
      { label: "UI_VIEW", x: -80, y: 0, z: 0, role: "VIEW" },
      { label: "REACT_COMP", x: -50, y: -30, z: 30, role: "UI" },
      { label: "UX_RENDER", x: -50, y: 30, z: -30, role: "UI" },
      { label: "NEXT_ENGINE", x: -15, y: 0, z: 0, role: "FRAMEWORK" },
      { label: "BFF_SERVER", x: 20, y: 0, z: 0, role: "BFF" },
      { label: "API_PROXY", x: 50, y: 0, z: 0, role: "NETWORK" },
      { label: "MAP_TILES", x: 80, y: 40, z: 30, role: "API" },
      { label: "LOC_SERVICE", x: 80, y: -40, z: -30, role: "API" },
      { label: "GAMIFICATION", x: 20, y: 50, z: -10, role: "UX" },
    ],
    connections: [
      { fromIndex: 0, toIndex: 1 },
      { fromIndex: 0, toIndex: 2 },
      { fromIndex: 1, toIndex: 3 },
      { fromIndex: 2, toIndex: 3 },
      { fromIndex: 3, toIndex: 4 },
      { fromIndex: 4, toIndex: 8 },
      { fromIndex: 4, toIndex: 5 },
      { fromIndex: 5, toIndex: 6 },
      { fromIndex: 5, toIndex: 7 },
    ],
  },
  skills: {
    name: "Concentric Capabilities Orbits",
    themeColor: "rgba(139, 92, 246, ", // Violet base
    accentColor: "rgba(16, 185, 129, ", // Emerald accent
    baseSpeedMultiplier: 1.1,
    nodes: [
      // Core (Algorithms/Theory)
      { label: "ALGORITHMS", x: 0, y: 0, z: 0, role: "CORE" },
      { label: "C/C++", x: -15, y: 15, z: 0, role: "CORE" },
      // Orbit 1: Backend
      { label: "GOLANG", x: -40, y: -20, z: 15, role: "BACKEND" },
      { label: "POSTGRES", x: 45, y: 10, z: -20, role: "BACKEND" },
      { label: "REDIS", x: 10, y: -45, z: 25, role: "BACKEND" },
      // Orbit 2: Frontend
      { label: "NEXT_JS", x: -60, y: 40, z: -30, role: "FRONTEND" },
      { label: "REACT", x: 50, y: -50, z: 40, role: "FRONTEND" },
      { label: "TS_JS", x: -20, y: 65, z: 35, role: "FRONTEND" },
      // Orbit 3: DevOps & Tools
      { label: "DOCKER", x: 75, y: 35, z: -50, role: "DEVOPS" },
      { label: "GIT_VCS", x: -85, y: -30, z: -60, role: "TOOLS" },
    ],
    connections: [
      { fromIndex: 0, toIndex: 1 },
      // Backend ring connections
      { fromIndex: 2, toIndex: 3 },
      { fromIndex: 3, toIndex: 4 },
      { fromIndex: 4, toIndex: 2 },
      // Frontend ring connections
      { fromIndex: 5, toIndex: 6 },
      { fromIndex: 6, toIndex: 7 },
      { fromIndex: 7, toIndex: 5 },
      // Bridge links
      { fromIndex: 1, toIndex: 2 },
      { fromIndex: 2, toIndex: 5 },
      { fromIndex: 3, toIndex: 8 },
    ],
  },
  github: {
    name: "VCS Registry Activity Map",
    themeColor: "rgba(6, 182, 212, ", // Cyan base
    accentColor: "rgba(16, 185, 129, ", // Emerald accent
    baseSpeedMultiplier: 1.3,
    nodes: [
      { label: "REPOSITORIES", x: -70, y: -40, z: 10, role: "VCS" },
      { label: "LANGUAGES", x: -35, y: 10, z: -30, role: "METRIC" },
      { label: "COMMITS", x: 0, y: -30, z: 50, role: "SIGNAL" },
      { label: "BRANCHES", x: 35, y: 20, z: -20, role: "VCS" },
      { label: "PULL_REQUESTS", x: 70, y: -20, z: 40, role: "VCS" },
      { label: "STARS_FORKS", x: 0, y: 50, z: -30, role: "METRIC" },
    ],
    connections: [
      { fromIndex: 0, toIndex: 1 },
      { fromIndex: 1, toIndex: 2 },
      { fromIndex: 2, toIndex: 3 },
      { fromIndex: 3, toIndex: 4 },
      { fromIndex: 2, toIndex: 5 },
      { fromIndex: 0, toIndex: 5 },
    ],
  },
  contact: {
    name: "Comms Portal Signal Map",
    themeColor: "rgba(239, 68, 68, ", // Red base
    accentColor: "rgba(245, 158, 11, ", // Amber accent
    baseSpeedMultiplier: 0.8,
    nodes: [
      { label: "EMAIL_LINK", x: -60, y: -30, z: 0, role: "CONTACT" },
      { label: "GITHUB_LINK", x: -20, y: 30, z: -20, role: "CONTACT" },
      { label: "LINKEDIN_LINK", x: 20, y: -30, z: 20, role: "CONTACT" },
      { label: "RESUME_PDF", x: 60, y: 30, z: 0, role: "CONTACT" },
    ],
    connections: [
      { fromIndex: 0, toIndex: 1 },
      { fromIndex: 1, toIndex: 3 },
      { fromIndex: 3, toIndex: 2 },
      { fromIndex: 2, toIndex: 0 },
    ],
  },
  recruiter: {
    name: "Fast-Track Static Summary",
    themeColor: "rgba(245, 158, 11, ", // Amber base
    accentColor: "rgba(239, 68, 68, ", // Red accent
    baseSpeedMultiplier: 0.5,
    nodes: [
      { label: "RECRUITER_GATEWAY", x: -50, y: -50, z: 0, role: "ACTION" },
      { label: "GET_RESUME_PDF", x: 50, y: -50, z: 0, role: "ACTION" },
      { label: "SEND_PING_MSG", x: -50, y: 0, z: 0, role: "ACTION" },
      { label: "EMAIL_OPERATOR", x: 50, y: 0, z: 0, role: "ACTION" },
      { label: "GITHUB_LOG", x: -50, y: 50, z: 0, role: "LINK" },
      { label: "LINKEDIN_SIGNAL", x: 50, y: 50, z: 0, role: "LINK" },
    ],
    connections: [
      { fromIndex: 0, toIndex: 1 },
      { fromIndex: 2, toIndex: 3 },
      { fromIndex: 4, toIndex: 5 },
      { fromIndex: 0, toIndex: 2 },
      { fromIndex: 1, toIndex: 3 },
      { fromIndex: 2, toIndex: 4 },
      { fromIndex: 3, toIndex: 5 },
    ],
  },
};
