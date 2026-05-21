import { BlogPost } from "../types/portfolio";

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "go-database-race-conditions",
    title: "[Example Note] Mitigating E-Commerce Inventory Race Conditions in Go",
    summary: "A practical deep dive into using PostgreSQL transaction locks ('SELECT FOR UPDATE') to prevent double-allocation in backend API endpoints.",
    category: "Backend Engineering",
    publishedDate: "2026-05-18",
    readingTime: "5 min read",
    contentMarkdown: `
### The Concurrency Problem

In high-throughput e-commerce systems, multiple customers might check out the exact same product simultaneously. If two requests read a stock balance of \`1\` at the same time, both will pass the logic check, deduct the quantity, and write \`0\` back. This results in overallocation (selling items you don't actually have in the warehouse).

\`\`\`go
// VULNERABLE CODE (Read-then-Write without locking)
var stock int
err := db.QueryRow(ctx, "SELECT stock FROM inventory WHERE product_id = $1", productID).Scan(&stock)
if stock < requestedQuantity {
    return errors.New("insufficient stock")
}
_, err = db.Exec(ctx, "UPDATE inventory SET stock = stock - $1 WHERE product_id = $2", requestedQuantity, productID)
\`\`\`

If two routines run this concurrently, both read the original stock and both update, resulting in corrupted logs.

### The Solution: Pipelined Database-Level Locking

In **StockFlow**, we solve this by utilizing a database-level write lock. By appending \`FOR UPDATE\` to our read query inside a PostgreSQL transaction block, we instruct the database to lock the matching inventory row until the current transaction commits or rolls back.

\`\`\`go
// SECURE CODE (Row-Level Locking)
tx, err := pool.BeginTx(ctx, pgx.TxOptions{IsoLevel: pgx.ReadCommitted})
if err != nil {
    return err
}
defer tx.Rollback(ctx) // Safe fallback

var stock int
// Row is locked for writing; other processes wait here until we commit
err = tx.QueryRow(ctx, "SELECT stock FROM inventory WHERE product_id = $1 FOR UPDATE", productID).Scan(&stock)
if err != nil {
    return err
}

if stock < requestedQuantity {
    return fmt.Errorf("insufficient inventory: only %d left", stock)
}

// Deduct safely
_, err = tx.Exec(ctx, "UPDATE inventory SET stock = stock - $1 WHERE product_id = $2", requestedQuantity, productID)
if err != nil {
    return err
}

// Commit releases the lock
return tx.Commit(ctx)
\`\`\`

### Tradeoffs to Consider

1. **Transaction Duration**: Keep database transactions as short as possible. Never invoke external REST APIs or long compute loops inside a transaction, as this holds the lock open and starves other request routines.
2. **Deadlocks**: Ensure that rows are locked in a consistent order (e.g., sort product IDs alphabetically before locking them in a multi-item checkout transaction) to prevent classic circular wait conditions.
`
  },
  {
    id: "self-healing-websockets-evm",
    title: "[Example Note] Building Self-Healing Event Listeners for Blockchain RPCs",
    summary: "How to implement channel-rebuild reconnect loops in Go to maintain robust blockchain subscriptions over flaky websocket transport layers.",
    category: "Backend Engineering",
    publishedDate: "2026-05-10",
    readingTime: "6 min read",
    contentMarkdown: `
### Why Standard Subscriptions Fail

When tracking real-time ERC-20 transfer logs, connecting via WebSockets to RPC nodes (like Infura or Alchemy) is standard. However, connections get dropped frequently because of:
* RPC node load-balancing restarts.
* Brief network latency spikes.
* Silent socket timeouts where the TCP connection remains half-open but sends no frames.

A naive subscription loop will exit immediately when the socket terminates, leaving your pipeline disconnected.

### The Self-Healing Pipeline Pattern

In **Token-Transfer-Monitor**, we structured our Go event listener with a persistent connection supervisor. It listens to errors on a channel and triggers a reconnection loop with an exponential backoff wrapper.

\`\`\`go
func (l *Listener) Start(ctx context.Context) {
    for {
        log.Println("Attempting websocket RPC connection...")
        client, err := ethclient.DialContext(ctx, l.rpcURL)
        if err != nil {
            log.Printf("Dial failed: %v. Retrying in backoff...", err)
            l.backoff(ctx)
            continue
        }

        // Subscribing to ERC-20 Transfer logs
        query := ethereum.FilterQuery{
            Addresses: l.monitoredTokens,
            Topics:    [][]common.Hash{{TransferEventSignatureHash}},
        }
        
        logs := make(chan types.Log)
        sub, err := client.SubscribeFilterLogs(ctx, query, logs)
        if err != nil {
            client.Close()
            log.Printf("Subscription failed: %v. Retrying...", err)
            l.backoff(ctx)
            continue
        }

        // Connection successful, reset backoff duration
        l.resetBackoff()

        // Read channel events
        if err := l.eventLoop(ctx, sub, logs); err != nil {
            log.Printf("Event loop terminated: %v. Reconnecting...", err)
        }
        client.Close()

        select {
        case <-ctx.Done():
            return
        default:
        }
    }
}
\`\`\`

### Managing the Event Loop

Inside the \`eventLoop\`, we listen to the logs channel and subscription errors channel simultaneously using a \`select\` block:

\`\`\`go
func (l *Listener) eventLoop(ctx context.Context, sub ethereum.Subscription, logs chan types.Log) error {
    for {
        select {
        case <-ctx.Done():
            return ctx.Err()
        case err := <-sub.Err():
            // Subscription errored (network drop, endpoint killed, etc)
            return err
        case vLog := <-logs:
            // Hand off log to RabbitMQ publisher asynchronously
            l.publisher.Publish(vLog)
        }
    }
}
\`\`\`

### Summary of Key Safeguards

1. **Idempotency**: Because reconnection can cause events around the disconnection window to be re-read, the consumer database must filter duplicates using unique transaction hashes.
2. **Graceful Shutdown**: The listener respects context cancellations and completes publishing pending events before releasing resources.
`
  },
  {
    id: "llm-structured-outputs-nextjs",
    title: "[Example Note] Enforcing Structured JSON Formats in Next.js BFF Layers",
    summary: "Securing keys and ensuring robust AI response parsing using structured output schemas inside a Next.js Backend-For-Frontend proxy layer.",
    category: "AI / LLM",
    publishedDate: "2026-04-28",
    readingTime: "4 min read",
    contentMarkdown: `
### Enforcing Structure on Creative Models

LLM models are naturally conversational, which makes it challenging to parse their outputs into application data structures. Asking an AI to return a JSON array of travel locations often results in:
* Prefacing markdown text (\`Here is your JSON...\`).
* Missing brackets.
* Unescaped quotes inside description fields.

To build interactive web apps like **Pocket Atlas**, we require a strict JSON interface.

### The BFF Proxy Layer

Instead of calling the AI from the browser, we proxy the requests through a Next.js API route. This BFF layer performs three roles:
1. **Protects API Keys**: Keeps secret tokens strictly on the server.
2. **Enforces prompt variables**: Prevents client-side manipulation of prompts.
3. **Applies JSON schemas**: Restricts responses to structured formats.

Here is the server schema integration using SDK tools:

\`\`\`typescript
// src/app/api/itinerary/route.ts
import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai'; // or OpenAI sdk

const ai = new GoogleGenAI({ apiKey: process.env.AI_API_KEY });

// JSON Schema definition for the itinerary structure
const itinerarySchema = {
  type: "OBJECT",
  properties: {
    destination: { type: "STRING" },
    days: {
      type: "ARRAY",
      items: {
        type: "OBJECT",
        properties: {
          dayNumber: { type: "INTEGER" },
          theme: { type: "STRING" },
          activities: {
            type: "ARRAY",
            items: {
              type: "OBJECT",
              properties: {
                title: { type: "STRING" },
                timeOfDay: { type: "STRING" },
                description: { type: "STRING" },
                budgetEstimate: { type: "NUMBER" }
              },
              required: ["title", "timeOfDay", "description"]
            }
          }
        },
        required: ["dayNumber", "activities"]
      }
    }
  },
  required: ["destination", "days"]
};

export async function POST(req: Request) {
  try {
    const { destination, daysCount, budget } = await req.json();

    const response = await ai.models.generateContent({
      model: 'gemini-1.5-pro',
      contents: \`Plan a travel itinerary for \${destination} spanning \${daysCount} days with a budget of \${budget}.\`,
      config: {
        responseMimeType: "application/json",
        responseSchema: itinerarySchema,
      }
    });

    const parsedData = JSON.parse(response.text);
    return NextResponse.json(parsedData);
  } catch (error) {
    console.error("AI Generation Error:", error);
    return NextResponse.json({ error: "Failed to generate plan" }, { status: 500 });
  }
}
\`\`\`

### Benefits of this Pattern
* **Parse Safety**: Since the model API validates output format before return, parsing errors on the client drop to near 0%.
* **Type-Safety**: The generated JSON maps directly to TypeScript interfaces defined in the client application code, ensuring zero layout shifts.
`
  }
];
