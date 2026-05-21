import { Project, GitHubProfileStats, ProjectOverride } from "../types/portfolio";
import { PROJECT_OVERRIDES } from "../data/project-overrides";

const FALLBACK_PROFILE: GitHubProfileStats = {
  publicRepos: 14,
  followers: 4,
  following: 5,
  avatarUrl: "https://avatars.githubusercontent.com/u/86794511?v=4",
  bio: "Aspiring Software Engineer focused on problem-solving, scalable systems, and building reliable user interfaces for AI-driven, cloud-based products.",
  topLanguages: [
    { language: "Go", percentage: 55 },
    { language: "TypeScript", percentage: 25 },
    { language: "React/NextJS", percentage: 12 },
    { language: "Python", percentage: 8 }
  ]
};

const FALLBACK_REPOS: Partial<Project>[] = [
  {
    id: "stockflow",
    name: "StockFlow",
    description: "A mini e-commerce backend using Golang, Gin, PostgreSQL, Redis, and Clean Architecture.",
    githubUrl: "https://github.com/dungta1610/StockFlow",
    primaryLanguage: "Go",
    stars: 0,
    forks: 0,
    openIssues: 0,
    lastUpdated: "2026-03-21T18:11:22Z"
  },
  {
    id: "token-transfer-monitor",
    name: "Token-Transfer-Monitor",
    description: "Go service listening to EVM chain Transfer logs, utilizing RabbitMQ queues and Postgres storage with idempotency checks.",
    githubUrl: "https://github.com/dungta1610/Token-Transfer-Monitor",
    primaryLanguage: "Go",
    stars: 0,
    forks: 0,
    openIssues: 0,
    lastUpdated: "2026-05-14T15:51:01Z"
  },
  {
    id: "pocketatlas",
    name: "PocketAtlas",
    description: "AI travel assistant that creates custom itineraries and syncs with maps and calendars.",
    githubUrl: "https://github.com/dungta1610/PocketAtlas",
    primaryLanguage: "TypeScript",
    stars: 0,
    forks: 0,
    openIssues: 0,
    lastUpdated: "2026-04-11T03:39:51Z"
  },
  {
    id: "logiquote",
    name: "LogiQuote",
    description: "Fullstack logistics quotation and job management platform MVP built with React and Go.",
    githubUrl: "https://github.com/dungta1610/LogiQuote",
    primaryLanguage: "TypeScript",
    stars: 0,
    forks: 0,
    openIssues: 0,
    lastUpdated: "2026-05-20T13:50:38Z"
  },
  {
    id: "awesome-claude-design",
    name: "awesome-claude-design",
    description: "Awesome Claude Design: 68 ready-to-use design system inspirations in DESIGN.md format.",
    githubUrl: "https://github.com/dungta1610/awesome-claude-design",
    primaryLanguage: "Markdown",
    stars: 0,
    forks: 0,
    openIssues: 0,
    lastUpdated: "2026-05-19T16:58:27Z"
  },
  {
    id: "simple-banking-system",
    name: "simple-banking-system",
    description: "Mock banking server implementation in Go for transactions practice.",
    githubUrl: "https://github.com/dungta1610/simple-banking-system",
    primaryLanguage: "Go",
    stars: 0,
    forks: 0,
    openIssues: 0,
    lastUpdated: "2026-03-02T02:24:50Z"
  }
];

export async function fetchGitHubProfile(username: string): Promise<GitHubProfileStats> {
  const token = process.env.GITHUB_TOKEN;
  const headers: HeadersInit = {
    "User-Agent": "dungta-portfolio-app"
  };
  if (token) {
    headers["Authorization"] = `token ${token}`;
  }

  try {
    const res = await fetch(`https://api.github.com/users/${username}`, {
      headers,
      next: { revalidate: 3600 } // Cache profile for 1 hour
    });

    if (!res.ok) {
      console.warn(`GitHub profile fetch failed: ${res.statusText}. Using fallback data.`);
      return FALLBACK_PROFILE;
    }

    const data = await res.json();
    
    // Fetch languages to compute profile stats
    const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`, {
      headers,
      next: { revalidate: 3600 }
    });

    let topLanguages: { language: string; percentage: number }[] = FALLBACK_PROFILE.topLanguages;
    if (reposRes.ok) {
      const repos = await reposRes.json();
      const langCounts: Record<string, number> = {};
      let totalCount = 0;
      
      repos.forEach((repo: any) => {
        if (repo.language) {
          langCounts[repo.language] = (langCounts[repo.language] || 0) + 1;
          totalCount++;
        }
      });

      if (totalCount > 0) {
        topLanguages = Object.entries(langCounts)
          .map(([language, count]) => ({
            language,
            percentage: Math.round((count / totalCount) * 100)
          }))
          .sort((a, b) => b.percentage - a.percentage)
          .slice(0, 5);
      }
    }

    return {
      publicRepos: data.public_repos,
      followers: data.followers,
      following: data.following,
      avatarUrl: data.avatar_url,
      bio: data.bio || FALLBACK_PROFILE.bio,
      topLanguages
    };
  } catch (err) {
    console.error("Error in fetchGitHubProfile:", err);
    return FALLBACK_PROFILE;
  }
}

export async function fetchGitHubRepositories(username: string): Promise<Project[]> {
  const token = process.env.GITHUB_TOKEN;
  const headers: HeadersInit = {
    "User-Agent": "dungta-portfolio-app"
  };
  if (token) {
    headers["Authorization"] = `token ${token}`;
  }

  try {
    const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`, {
      headers,
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    let apiRepos = [];
    if (res.ok) {
      apiRepos = await res.json();
    } else {
      console.warn(`GitHub repos fetch failed: ${res.status}. Using fallback repository data.`);
      apiRepos = FALLBACK_REPOS.map(r => ({
        name: r.name,
        description: r.description,
        html_url: r.githubUrl,
        language: r.primaryLanguage,
        stargazers_count: r.stars,
        forks_count: r.forks,
        open_issues_count: r.openIssues,
        updated_at: r.lastUpdated
      }));
    }

    // Map and normalize api data with local overrides
    const normalized: Project[] = apiRepos.map((repo: any) => {
      const repoId = repo.name.toLowerCase();
      const override: ProjectOverride | undefined = PROJECT_OVERRIDES[repoId];

      const difficulty = override?.difficulty || "Easy";
      const featured = override?.featured || false;
      const status = override?.status || "Unknown";
      const role = override?.role || "Contributor";
      const mainFeatures = override?.mainFeatures || [];
      const technicalChallenges = override?.technicalChallenges || [];
      
      const defaultStack = repo.language ? [repo.language] : [];
      // Approximate stack if none provided in override, using language indicators
      let techStack = defaultStack;
      if (repoId === "stockflow") {
        techStack = ["Go", "Gin", "PostgreSQL", "Redis", "Docker", "SQL"];
      } else if (repoId === "token-transfer-monitor") {
        techStack = ["Go", "RabbitMQ", "PostgreSQL", "EVM", "Docker"];
      } else if (repoId === "pocketatlas") {
        techStack = ["Next.js", "React", "TypeScript", "Firebase", "Gemini API"];
      } else if (repoId === "logiquote") {
        techStack = ["React", "Go", "Vite", "TypeScript", "REST API"];
      } else if (repoId === "awesome-claude-design") {
        techStack = ["Markdown", "Design Tokens", "UI Patterns"];
      }

      return {
        id: repoId,
        name: override?.name || repo.name,
        description: override?.customDescription || repo.description || "No description provided.",
        role,
        status,
        featured,
        mainFeatures,
        techStack,
        githubUrl: repo.html_url,
        liveDemoUrl: override?.liveDemoUrl || "",
        difficulty,
        lastUpdated: repo.updated_at,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        openIssues: repo.open_issues_count,
        primaryLanguage: repo.language || "Unknown",
        architectureNotes: override?.architectureNotes,
        screenshots: override?.screenshots || [],
        lessonsLearned: override?.lessonsLearned || [],
        technicalChallenges,
        nextImprovements: override?.nextImprovements || [],
        readmeQuality: repo.size > 20 ? "Detailed" : "Basic"
      };
    });

    // Make sure we include resume projects even if they aren't returned by GitHub
    // (e.g., if there's any rename or api listing issue)
    Object.keys(PROJECT_OVERRIDES).forEach(id => {
      const exists = normalized.some(p => p.id === id);
      if (!exists) {
        const override = PROJECT_OVERRIDES[id];
        let techStack = ["TypeScript", "Next.js", "Tailwind CSS"];
        let lang = "TypeScript";
        if (id === "stockflow" || id === "token-transfer-monitor") {
          techStack = ["Go", "PostgreSQL", "Redis", "Docker"];
          lang = "Go";
        }
        
        normalized.push({
          id,
          name: override.name || id,
          description: override.customDescription || "Resume Project showcase",
          role: override.role,
          status: override.status,
          featured: override.featured,
          mainFeatures: override.mainFeatures,
          techStack: override.liveDemoUrl ? [...techStack, "Live Demo"] : techStack,
          githubUrl: `https://github.com/dungta1610/${id}`,
          liveDemoUrl: override.liveDemoUrl || "",
          difficulty: override.difficulty,
          lastUpdated: new Date().toISOString(),
          stars: 0,
          forks: 0,
          openIssues: 0,
          primaryLanguage: lang,
          architectureNotes: override.architectureNotes,
          screenshots: override.screenshots || [],
          lessonsLearned: override.lessonsLearned || [],
          technicalChallenges: override.technicalChallenges,
          nextImprovements: override.nextImprovements || []
        });
      }
    });

    // Sort: Featured first, then by last updated
    return normalized
      .filter(p => !PROJECT_OVERRIDES[p.id]?.hidden)
      .sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
      });
  } catch (err) {
    console.error("Error fetching repositories, using fallbacks:", err);
    // Return custom mock list
    return FALLBACK_REPOS.map((r, i) => {
      const override = PROJECT_OVERRIDES[r.id!];
      return {
        id: r.id!,
        name: override?.name || r.name!,
        description: override?.customDescription || r.description!,
        role: override?.role || "Backend Developer",
        status: override?.status || "Completed",
        featured: override?.featured || false,
        mainFeatures: override?.mainFeatures || [],
        techStack: r.id === "stockflow" ? ["Go", "Gin", "PostgreSQL", "Redis"] : ["TypeScript", "Next.js", "Tailwind CSS"],
        githubUrl: r.githubUrl!,
        liveDemoUrl: override?.liveDemoUrl || "",
        difficulty: override?.difficulty || "Medium",
        lastUpdated: r.lastUpdated!,
        stars: 0,
        forks: 0,
        openIssues: 0,
        primaryLanguage: r.primaryLanguage!,
        architectureNotes: override?.architectureNotes,
        screenshots: override?.screenshots || [],
        lessonsLearned: override?.lessonsLearned || [],
        technicalChallenges: override?.technicalChallenges || [],
        nextImprovements: override?.nextImprovements || []
      };
    });
  }
}
