import { TerminalLine } from "../../types/terminal";

export interface CommandDefinition {
  command: string;
  description: string;
  scene: "idle" | "stockflow" | "pocketAtlas" | "skills" | "github" | "contact";
  execute: () => TerminalLine[];
}

export const COMMANDS: CommandDefinition[] = [
  {
    command: "whoami",
    description: "Display operator information profile",
    scene: "idle",
    execute: () => [
      { type: "system", text: "[SYS_QUERY] RESOLVING OPERATOR IDENTITY..." },
      {
        type: "success",
        text: "Ta Duc Dung — Software Engineer focused on scalable backend systems, database optimizations, reliable UI architectures, and practical cloud/AI integrations.",
      },
    ],
  },
  {
    command: "inspect stockflow",
    description: "Inspect StockFlow backend architecture layout",
    scene: "stockflow",
    execute: () => [
      { type: "system", text: "[SYS_INSPECT] PORTING STOCKFLOW ARCHITECTURE DEPLOYMENT..." },
      { type: "output", text: "Loading backend database and container structures..." },
      {
        type: "success",
        text: "Nodes Online: CLIENT_UI, GO_API_GATEWAY, ORDERS_SVC, INVENTORY_SVC, PAYMENTS_SVC, RABBITMQ_BUS, POSTGRESQL, REDIS_CACHE, DOCKER_HOST.",
      },
    ],
  },
  {
    command: "inspect pocket-atlas",
    description: "Inspect Pocket Atlas frontend/BFF architecture layout",
    scene: "pocketAtlas",
    execute: () => [
      { type: "system", text: "[SYS_INSPECT] PORTING POCKET ATLAS TOPOLOGY..." },
      { type: "output", text: "Loading Client interface and Next.js BFF configurations..." },
      {
        type: "success",
        text: "Nodes Online: UI_VIEW, REACT_COMP, UX_RENDER, NEXT_ENGINE, BFF_SERVER, API_PROXY, LOC_SERVICE, MAP_TILES.",
      },
    ],
  },
  {
    command: "show skills",
    description: "Query operator technical capability matrix",
    scene: "skills",
    execute: () => [
      { type: "system", text: "[SYS_QUERY] LOADING CAPABILITY MATRIX..." },
      { type: "output", text: "• Backend: Go, Gin, REST APIs, Microservices" },
      { type: "output", text: "• Databases: PostgreSQL (ACID), Redis, SQLite" },
      { type: "output", text: "• Frontend: Next.js, React, TypeScript, Tailwind CSS" },
      { type: "output", text: "• Cloud / DevOps: Docker, Git, GitHub Actions" },
      { type: "output", text: "• Algorithms: C/C++, Data Structures, Complex Problem Solving" },
    ],
  },
  {
    command: "show github",
    description: "Sync operator VCS registry indicators",
    scene: "github",
    execute: () => [
      { type: "system", text: "[SYS_SYNC] POLLING VCS SERVICE FROM github/dungta1610..." },
      { type: "success", text: "Synchronization complete: VCS nodes online. Registry nominal." },
    ],
  },
  {
    command: "open resume",
    description: "Open professional timeline metrics",
    scene: "idle",
    execute: () => [
      { type: "system", text: "[SYS_EXEC] LOCATING OPERATOR CREDENTIALS..." },
      { type: "success", text: "Scrolling to operator timeline resume section." },
    ],
  },
  {
    command: "contact",
    description: "Establish direct message gateway channel",
    scene: "contact",
    execute: () => [
      { type: "system", text: "[SYS_CONNECT] INITIALIZING COMMS CONTROLLER..." },
      { type: "success", text: "Establishing secure portal link. Please complete contact logs." },
    ],
  },
  {
    command: "clear",
    description: "Clear telemetry diagnostic terminal log",
    scene: "idle",
    execute: () => [],
  },
];
