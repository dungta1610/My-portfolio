export interface TechChallenge {
  title: string;
  description: string;
  resolution: string;
}

export interface ProjectOverride {
  id: string; // matches GitHub repository name (lowercase)
  name?: string; // display name override
  role: string;
  status: 'Completed' | 'In Development' | 'Prototype' | 'Archived' | 'Unknown';
  featured: boolean;
  customDescription?: string;
  mainFeatures: string[];
  architectureNotes?: string;
  liveDemoUrl?: string;
  screenshots?: string[];
  lessonsLearned?: string[];
  technicalChallenges: TechChallenge[];
  nextImprovements?: string[];
  hidden?: boolean;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert'; // RPG difficulty ranking
}

export interface Project {
  id: string; // repo name or override id
  name: string;
  description: string;
  role: string;
  status: 'Completed' | 'In Development' | 'Prototype' | 'Archived' | 'Unknown';
  featured: boolean;
  mainFeatures: string[];
  techStack: string[];
  githubUrl: string;
  liveDemoUrl?: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
  lastUpdated: string;
  stars: number;
  forks: number;
  openIssues: number;
  primaryLanguage: string;
  // Case study fields (only present if detailed)
  architectureNotes?: string;
  screenshots?: string[];
  lessonsLearned?: string[];
  technicalChallenges: TechChallenge[];
  nextImprovements?: string[];
  readmeQuality?: 'Basic' | 'Detailed' | 'Comprehensive';
}

export interface SkillNode {
  name: string;
  level: number; // 1-5 level/stars
  category: 'frontend' | 'backend' | 'database' | 'tool' | 'theory' | 'ai';
  isMain: boolean;
  unlocked: boolean;
}

export interface SavedResource {
  title: string;
  type: 'repo' | 'blog' | 'article' | 'tool' | 'video' | 'course';
  url: string;
  tags: string[];
  note: string;
  savedDate: string;
}

export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  category: 'Backend Engineering' | 'Cloud' | 'Frontend' | 'Algorithms' | 'AI / LLM' | 'Retrospectives' | 'Notes';
  contentMarkdown: string;
  publishedDate: string;
  readingTime: string;
}

export interface GitHubProfileStats {
  publicRepos: number;
  followers: number;
  following: number;
  avatarUrl: string;
  bio: string;
  topLanguages: { language: string; percentage: number }[];
}
