import { SavedResource } from "../types/portfolio";

export const SAVED_RESOURCES: SavedResource[] = [
  {
    title: "Designing Data-Intensive Applications (DDIA)",
    type: "course",
    url: "https://www.oreilly.com/library/view/designing-data-intensive-applications/9781491903063/",
    tags: ["System Design", "Databases", "Distributed Systems"],
    note: "The bible of backend engineering. Excellent coverage of replication, partitioning, transactions, and consensus protocols.",
    savedDate: "2026-01-15"
  },
  {
    title: "High Performance Go Workshop",
    type: "blog",
    url: "https://dave.cheney.net/high-performance-go-workshop",
    tags: ["Go", "Performance", "Profiling"],
    note: "Dave Cheney's masterclass on writing fast Go code. Crucial for understanding memory allocation, escape analysis, and compiler optimizations.",
    savedDate: "2026-02-22"
  },
  {
    title: "ByteByteGo - System Design Frameworks",
    type: "article",
    url: "https://bytebytego.com/",
    tags: ["System Design", "Scalability", "Architecture"],
    note: "Visual guides explaining large-scale architectures, message queues, load balancers, and cache invalidation policies.",
    savedDate: "2026-03-05"
  },
  {
    title: "RabbitMQ Tutorials & Patterns",
    type: "tool",
    url: "https://www.rabbitmq.com/getstarted.html",
    tags: ["RabbitMQ", "Message Queues", "Async Processing"],
    note: "Used as a core guideline when implementing the Token Transfer Monitor. Explains worker pooling, exchange bindings, and retry policies.",
    savedDate: "2026-04-10"
  },
  {
    title: "go-ethereum (geth) Developer Documentation",
    type: "repo",
    url: "https://github.com/ethereum/go-ethereum",
    tags: ["Go", "EVM", "Blockchain", "Web3"],
    note: "Reference codebase and package structure for subscribing to EVM chain filters, parsing log transactions, and working with RPC nodes.",
    savedDate: "2026-04-20"
  },
  {
    title: "Vercel Deployment Best Practices for Next.js",
    type: "article",
    url: "https://vercel.com/docs/frameworks/nextjs",
    tags: ["NextJS", "Vercel", "DevOps"],
    note: "Official workflow guides for setting up edge caching, ISR, SSR, and dynamic headers to optimize SEO and web speeds.",
    savedDate: "2026-05-12"
  }
];
