"use client";

import { useState, useRef, useEffect } from "react";
import { TerminalLine } from "../types/terminal";
import { COMMANDS } from "../lib/terminal/commands";
import { useReactorState } from "../context/ReactorContext";

export const useCommandTerminal = () => {
  const { setTerminalSceneOverride } = useReactorState();
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [inputVal, setInputVal] = useState<string>("");
  
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: "system", text: "DUNG_CONTROL_CENTER [Version 4.8.21]" },
    { type: "system", text: "(c) 2026 Operator Node. All rights reserved. System active." },
    { type: "output", text: "Ready. Type a command or select suggestions below." },
  ]);

  const [isTyping, setIsTyping] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement | null>(null);

  // Auto scroll to bottom when terminal output updates
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 72;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const runCommand = (cmdText: string) => {
    const trimmed = cmdText.trim();
    if (!trimmed) return;

    // Add input command to visual lines list
    const newHistory = [...history, trimmed];
    setHistory(newHistory);
    setHistoryIndex(-1);

    const inputLine: TerminalLine = { type: "input", text: trimmed };
    setLines((prev) => [...prev, inputLine]);

    const lowercaseCmd = trimmed.toLowerCase();

    // Handle Help manually
    if (lowercaseCmd === "help") {
      const helpLines: TerminalLine[] = [
        { type: "system", text: "[HELP] AVAILABLE TELEMETRY CHANNELS:" },
        ...COMMANDS.map((c) => ({
          type: "output" as const,
          text: `  ${c.command.padEnd(20)} - ${c.description}`,
        })),
        { type: "output", text: "  help                 - Display command terminal interface guidelines." },
      ];
      setLines((prev) => [...prev, ...helpLines]);
      setInputVal("");
      return;
    }

    // Find in COMMANDS
    const matchedCommand = COMMANDS.find((c) => c.command.toLowerCase() === lowercaseCmd);

    if (matchedCommand) {
      // Set override scene first
      setTerminalSceneOverride(matchedCommand.scene);

      // Perform execution outputs
      const cmdOutputs = matchedCommand.execute();

      if (matchedCommand.command === "clear") {
        setLines([]);
      } else {
        setLines((prev) => [...prev, ...cmdOutputs]);
      }

      // Scrolling trigger commands
      if (matchedCommand.command === "open resume") {
        setTimeout(() => handleScroll("resume"), 300);
      } else if (matchedCommand.command === "contact") {
        setTimeout(() => handleScroll("contact"), 300);
      }
    } else {
      // Try to find partial/inspect match if not exact matching
      if (lowercaseCmd.startsWith("inspect ")) {
        const subArg = lowercaseCmd.replace("inspect ", "");
        if (subArg === "stockflow" || subArg === "stock-flow") {
          runCommand("inspect stockflow");
          return;
        } else if (subArg === "pocketatlas" || subArg === "pocket-atlas") {
          runCommand("inspect pocket-atlas");
          return;
        }
      }

      const errorLine: TerminalLine = {
        type: "error",
        text: `Command not recognized: '${trimmed}'. Type 'help' for available system queries.`,
      };
      setLines((prev) => [...prev, errorLine]);
    }

    setInputVal("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      runCommand(inputVal);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;

      const nextIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInputVal(history[nextIndex]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (history.length === 0) return;

      if (historyIndex === -1 || historyIndex === history.length - 1) {
        setHistoryIndex(-1);
        setInputVal("");
      } else {
        const nextIndex = historyIndex + 1;
        setHistoryIndex(nextIndex);
        setInputVal(history[nextIndex]);
      }
    }
  };

  return {
    lines,
    inputVal,
    isTyping,
    history,
    terminalEndRef,
    handleInputChange,
    handleKeyDown,
    runCommand,
    setLines,
  };
};
