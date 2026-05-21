import { ProjectOverride } from "../types/portfolio";

export const PROJECT_OVERRIDES: Record<string, ProjectOverride> = {
  "stockflow": {
    id: "stockflow",
    name: "StockFlow - Backend Server",
    role: "Backend Developer / Owner",
    status: "Completed",
    featured: true,
    difficulty: "Hard",
    customDescription: "A mini e-commerce backend built with Go, Gin, PostgreSQL, and Redis focusing on inventory consistency, order lifecycle automation, and modular clean architecture.",
    mainFeatures: [
      "Modular clean architecture separating handler, service, repository, and domain layers.",
      "Warehouse-level inventory control with item adjustments and transaction history tracking.",
      "PostgreSQL transactions using pgx/pgxpool for order creation and inventory validation.",
      "Redis-based sliding-window rate-limiting middleware to shield internal endpoints.",
      "Graceful server shutdown and structured log output for debuggability.",
      "Handwritten SQL queries (no ORM) to maximize performance and transaction control."
    ],
    architectureNotes: "Implemented clean architecture with module-first packaging. Services communicate via interfaces, and dependencies are injected at startup. Database persistence is handled using transaction blocks to prevent race conditions during inventory allocation.",
    liveDemoUrl: "", // No demo link specified
    screenshots: [
      "/screenshots/stockflow-architecture.png"
    ],
    lessonsLearned: [
      "ORMs hide query details; writing pure SQL provides absolute clarity on index utilization and transaction locking.",
      "Connection pooling settings (max conns, idle lifetimes) are vital under high concurrent load."
    ],
    technicalChallenges: [
      {
        title: "Database Race Conditions during Stock Adjustments",
        description: "Concurrent checkout operations could cause race conditions where items are overallocated, leading to negative stock counts in the warehouse.",
        resolution: "Used PostgreSQL ACID transaction blocks combined with database-level locks ('SELECT ... FOR UPDATE') on the inventory records. This forces sequential evaluation of stock checks and deducts quantities atomically."
      },
      {
        title: "Ensuring Clean Separation in Monolith Layers",
        description: "As the service grew, cross-domain queries began leaking repository methods into multiple layers, risking spaghetti code.",
        resolution: "Adopted a strict Clean Architecture pattern. Shared dependencies are handled via interface interfaces and domain models, ensuring that business rules do not rely on database layer implementations."
      }
    ],
    nextImprovements: [
      "Add CDC (Change Data Capture) using Debezium to publish transaction events.",
      "Integrate Prometheus and Grafana for backend metrics tracking.",
      "Implement a robust mock testing suite for repository queries."
    ]
  },
  "token-transfer-monitor": {
    id: "token-transfer-monitor",
    name: "Token Transfer Monitor",
    role: "Backend & Systems Engineer",
    status: "Completed",
    featured: true,
    difficulty: "Expert",
    customDescription: "An EVM chain listener and pipeline processor that captures ERC-20 transfer events, processes them via RabbitMQ worker queues, and tracks transactions in PostgreSQL.",
    mainFeatures: [
      "EVM blockchain log filtering utilizing go-ethereum client subscription.",
      "Message queue processing using RabbitMQ (AMQP 0-9-1) with worker pools.",
      "Dead Letter Queue (DLQ) integration and exponential backoff retry mechanics.",
      "Strict event idempotency using md5 hash verification tables.",
      "Publisher confirmations enabled for reliable message delivery from event listener.",
      "Worker pool connection recovery loops and graceful shutdown hooks."
    ],
    architectureNotes: "Utilizes a publisher-consumer pipeline. The publisher monitors EVM logs, hashes transaction signatures, and pushes events into RabbitMQ. Independent workers consume, validate, and write records to PostgreSQL.",
    liveDemoUrl: "",
    screenshots: [
      "/screenshots/pipeline-flow.png"
    ],
    lessonsLearned: [
      "Websockets to blockchain providers fail frequently. Building self-healing subscriber layers is critical.",
      "RabbitMQ prefetch counts must be tuned to keep worker nodes evenly loaded."
    ],
    technicalChallenges: [
      {
        title: "EVM RPC Disconnections & Websocket Dropping",
        description: "The websocket connection to Infura/Alchemy would silently close after inactive periods, leaving the listener blind to new transfers.",
        resolution: "Implemented a robust connection manager with a reconnect loop and channel rebuild steps. If ping triggers fail or channels close, the listener automatically sleeps, triggers a backoff, and recreates the subscription."
      },
      {
        title: "Duplicate Event Processing (Idempotency)",
        description: "Due to network retries, the queue sometimes delivered the same transfer event twice, causing double-logging in PostgreSQL.",
        resolution: "Introduced an idempotency table where the primary key is a composite hash of 'transaction_hash' and 'log_index'. DB inserts use 'ON CONFLICT DO NOTHING' to discard duplicates instantly."
      }
    ],
    nextImprovements: [
      "Add support for contract ABI parsing for custom ERC-20 implementations.",
      "Implement a CLI control board to add/remove monitored addresses on the fly."
    ]
  },
  "pocketatlas": {
    id: "pocketatlas",
    name: "Pocket Atlas Web-App",
    role: "Fullstack / BFF Developer",
    status: "Prototype",
    featured: true,
    difficulty: "Medium",
    customDescription: "An AI-powered travel assistant that creates custom day-by-day itineraries based on traveler choices, budget tiers, and activity options, complete with mapping visualizations.",
    mainFeatures: [
      "AI itinerary generator powered by LLM models with structured JSON inputs.",
      "React + Next.js interactive web frontend using customizable map panels.",
      "Next.js Backend-For-Frontend (BFF) proxy to secure API keys and format AI prompts.",
      "Integrated location search, ratings display, weather updates, and packing suggestions.",
      "User itinerary saver with Firestore synchronization and Google Calendar export.",
      "Social sharing features enabling public trip logs and community ratings."
    ],
    architectureNotes: "Uses React client-side logic for interactive map panels and prompt formulation. Connects to Next.js API BFF endpoints which proxy OpenAI/Gemini API calls and cache coordinates.",
    liveDemoUrl: "",
    screenshots: [
      "/screenshots/pocketatlas-preview.png"
    ],
    lessonsLearned: [
      "Prompt engineering is highly sensitive to format parameters. Strict schema definitions are needed to avoid broken JSON responses.",
      "Securing keys on server routes (BFF) prevents client-side leaks of expensive AI keys."
    ],
    technicalChallenges: [
      {
        title: "Securing LLM API Keys & Orchestrating Prompt Generation",
        description: "Making direct calls to LLMs from the client browser exposed private API keys and led to chaotic user prompts.",
        resolution: "Developed a Next.js BFF (Backend-For-Frontend) proxy route. All prompts are built on the server side, keeping keys fully secure. The server normalizes LLM outputs before returning clean JSON to the client."
      },
      {
        title: "Broken JSON Structured Outputs from AI",
        description: "Occasionally, the LLM returned loose markdown text or unescaped characters, which crashed the JSON parser on the client.",
        resolution: "Configured OpenAI/Gemini Structured Outputs utilizing JSON schema tools. Added a validation fallback handler on the BFF to repair common missing braces or bracket errors before sending data."
      }
    ],
    nextImprovements: [
      "Integrate offline maps storage utilizing service workers.",
      "Add real-time flight pricing widgets via Skyscanner APIs."
    ]
  },
  "logiquote": {
    id: "logiquote",
    name: "LogiQuote Ops",
    role: "Fullstack Developer",
    status: "Completed",
    featured: true,
    difficulty: "Hard",
    customDescription: "A fullstack MVP designed for small logistics companies to manage customer profiles, price card rates, quotations, operational tasks, and automated document generation.",
    mainFeatures: [
      "Integrated logistics workflow: Customer -> Rate Cards -> Quotations -> Operations Jobs.",
      "Go REST API backend with in-memory task queues and worker executors.",
      "React + Vite frontend built with responsive tables and status tracking dashboards.",
      "Automatic PDF invoice and quotation generator using background workers.",
      "Task manager dashboard showing status updates of sent emails and system jobs.",
      "Rate-card pricing engines to automatically estimate custom shipping fees."
    ],
    architectureNotes: "Uses a decoupled setup. React frontend communicates with Go REST backend using clean handlers. Backend maintains an in-memory queue to dispatch background document building without blocking API requests.",
    liveDemoUrl: "",
    screenshots: [
      "/screenshots/logiquote-screen.png"
    ],
    lessonsLearned: [
      "Generating large PDFs is CPU-heavy. Doing this synchronously blocks client responses. Offloading to background workers keeps the API responsive."
    ],
    technicalChallenges: [
      {
        title: "Slow Sync PDF Quotation Creation",
        description: "When sales reps created large quotes, the API took up to 8 seconds to generate the PDF layout and return, locking the frontend UI.",
        resolution: "Created an in-memory task pipeline. The endpoint returns a '202 Accepted' status instantly with a task ID. A background worker generates the PDF asynchronously and updates the task status to completed."
      }
    ],
    nextImprovements: [
      "Replace in-memory queue with Redis Stream / Asynq for persistent queueing.",
      "Implement multi-tenant database partitioning for multi-company operations."
    ]
  }
};
