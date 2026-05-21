# ⚔️ Pixel-Art RPG Developer Portfolio & Recruiter Terminal

A premium, highly interactive personal developer portfolio website designed for **Ta Duc Dung**, built with **Next.js (App Router)**, **Tailwind CSS v4**, and **TypeScript**. 

The application offers two distinct modes:
1. **RPG Mode**: A dark-fantasy, 8-bit retro theme styled like a retro dungeon RPG, featuring stats sheets, custom double-pixel gold borders, interactive quest logs (project case studies), and game aesthetics.
2. **Recruiter Mode**: A high-contrast, clean, corporate terminal view that instantly strips away the game details and presents a structured, recruiter-friendly executive portfolio, professional experience timeline, and resume download.

---

## 🎮 Concept & Design System

### RPG Mappings & Stats
- **ATK (Attack)**: Backend Systems, API Design, Performance Tuning (Go, C++, PostgreSQL).
- **DEF (Defense)**: Frontend Architecture, Resilient Interfaces, UI Layouts (Next.js, React).
- **DEX (Dexterity)**: Data Structures & Competitive Programming.
- **INT (Intelligence)**: Cloud Infrastructure, System Design, Event-Driven Architectures.
- **Quest Journals**: Rather than standard project grid cards, projects are structured as **Quest Logs**. Clicking on a quest launches a modal showing:
  - **Quest Briefing**: Project description.
  - **Equipped Gear**: Technology stack.
  - **Loot Secured**: Key deliverables.
  - **Boss Battles**: Toughest technical challenges and their counter-strategies/resolutions.
  - **Guild Experience Gained**: Key engineering takeaways and lessons learned.

### Aesthetics & Polish
- **Color Palette**: Dark-fantasy palette (`#0b0c10` core, `#1f2833` surface, emerald/gold/ruby/sapphire status alerts).
- **Typography**: Google Fonts:
  - `Press Start 2P`: Retro titles and menu selections.
  - `VT323`: Detailed retro descriptions and console outputs.
  - `Outfit`: Premium clean sans-serif typography for Recruiter Mode.
- **Pixel Accents**: Reusable custom pixel buttons, retro badges, and double-pixel borders utilizing inset/outset drop-shadow combinations.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4 (with PostCSS configurations and nested `@theme` variables inside `src/app/globals.css`)
- **Icons**: Custom SVG Icons (to ensure robust rendering of brand icons without versioning dependency failures) + Lucide React
- **Language**: TypeScript
- **GitHub Integration**: A Next.js API Route (`/api/github`) aggregates profile stats and repositories. It contains a robust mock fallback for offline use or API rate limit failures.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.x or later recommended)
- npm, pnpm, or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/dungta1610/My-Portfolio.git
   cd My-Portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Place your resume PDF in the `public` directory:
   - Ensure the file is named exactly `resume.pdf` and located at `/public/resume.pdf`.
   - If missing, the app will automatically display a clean warning banner suggesting its addition.

4. (Optional) Configure environment variables for the GitHub API:
   Create a `.env.local` file in the root directory:
   ```env
   GITHUB_TOKEN=your_github_personal_access_token
   ```
   *Note: If no token is provided, the API route will still run using public rate limits or fall back to high-fidelity mock data.*

### Running Locally
Start the development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser.

### Building for Production
Verify typescript compilation and create an optimized build:
```bash
npm run build
npm run start
```

---

## 📂 Codebase Directory Structure

```
├── public/                 # Static assets (resume.pdf, default SVGs)
├── src/
│   ├── app/                # Next.js App Router (pages & API routes)
│   │   ├── api/github/     # GitHub profile proxy aggregator API
│   │   ├── layout.tsx      # Global layout wrapper
│   │   ├── page.tsx        # Main application orchestrator
│   │   └── globals.css     # Tailwind v4 custom theme tokens & CSS variables
│   ├── components/
│   │   ├── layout/         # Navigation headers (RPG & Recruiter layouts)
│   │   ├── sections/       # Tab-nav sections (Hero, Skills, Projects, Blog, etc.)
│   │   └── ui/             # Reusable 8-bit components (PixelCard, PixelButton, Icons)
│   ├── data/               # Static dataset overrides (Quest content, resources, blog data)
│   └── types/              # TypeScript interface definitions
├── package.json            # Scripts & project dependencies
└── tsconfig.json           # TypeScript configuration rules
```

---

## 🎨 Theme Customization

To modify the color themes or add custom pixel double-border rules, edit the variables inside `src/app/globals.css`:
```css
@theme {
  --font-press: 'Press Start 2P', monospace;
  --font-vt: 'VT323', monospace;
  --font-outfit: 'Outfit', sans-serif;
}
```

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
