export interface TerminalLine {
  type: "input" | "output" | "error" | "success" | "system";
  text: string;
  timestamp?: string;
}

export interface TerminalState {
  history: string[];
  historyIndex: number;
  lines: TerminalLine[];
  isTyping: boolean;
  activeScene: "idle" | "stockflow" | "pocketAtlas" | "skills" | "github" | "contact";
}
