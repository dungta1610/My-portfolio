"use client";

import React, { useRef, useEffect } from "react";
import { Terminal, CornerDownLeft, Play, Cpu, ShieldAlert } from "lucide-react";
import { useCommandTerminal } from "../../hooks/useCommandTerminal";
import { COMMANDS } from "../../lib/terminal/commands";

export const ControlTerminal: React.FC = () => {
  const {
    lines,
    inputVal,
    terminalEndRef,
    handleInputChange,
    handleKeyDown,
    runCommand,
  } = useCommandTerminal();

  const inputRef = useRef<HTMLInputElement | null>(null);

  // Focus input when terminal is clicked
  const focusTerminal = () => {
    inputRef.current?.focus();
  };

  useEffect(() => {
    // Initial focus on mount
    inputRef.current?.focus();
  }, []);

  return (
    <div 
      onClick={focusTerminal}
      className="w-full bg-[#05070d]/90 border border-slate-800 rounded-xl overflow-hidden flex flex-col font-mono text-xs shadow-2xl relative group cursor-text h-[280px]"
    >
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800 bg-[#070b16] select-none">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Dung Control Terminal</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-rose-500/80" />
          <div className="w-2 h-2 rounded-full bg-amber-500/80" />
          <div className="w-2 h-2 rounded-full bg-emerald-500/80" />
        </div>
      </div>

      {/* Terminal Lines Output Container */}
      <div className="flex-1 p-4 overflow-y-auto space-y-2 select-text scrollbar-thin scrollbar-thumb-slate-800">
        {lines.map((line, idx) => {
          let lineClass = "text-slate-400";
          let prefix = "";

          if (line.type === "input") {
            lineClass = "text-slate-200";
            prefix = "guest@dungta:~$ ";
          } else if (line.type === "system") {
            lineClass = "text-cyan-400 font-bold";
          } else if (line.type === "success") {
            lineClass = "text-emerald-400 font-bold";
          } else if (line.type === "error") {
            lineClass = "text-rose-400 font-medium flex items-center gap-1";
          }

          return (
            <div key={idx} className={`${lineClass} leading-relaxed break-words font-mono text-[11px]`}>
              {line.type === "error" && <ShieldAlert className="w-3 h-3 text-rose-400 inline" />}
              {prefix && <span className="text-slate-500 select-none">{prefix}</span>}
              {line.text}
            </div>
          );
        })}
        <div ref={terminalEndRef} />
      </div>

      {/* Input panel prompt */}
      <div className="px-4 py-2.5 border-t border-slate-800 bg-[#06080e] flex items-center gap-2">
        <span className="text-cyan-400 font-bold select-none font-mono text-[11px]">guest@dungta:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent text-slate-100 outline-none border-none font-mono text-[11px] placeholder:text-slate-700 focus:ring-0 p-0"
          placeholder="Type 'help' or inspect nodes..."
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            runCommand(inputVal);
          }}
          className="p-1 rounded bg-[#070b16] border border-slate-800 hover:border-cyan-500/40 text-slate-500 hover:text-cyan-400 transition-colors"
          title="Run query"
        >
          <CornerDownLeft className="w-3 h-3" />
        </button>
      </div>

      {/* suggestion chips */}
      <div className="px-4 py-2 bg-[#05070d] border-t border-slate-800/50 flex flex-wrap gap-1.5 select-none items-center overflow-x-auto whitespace-nowrap">
        <span className="text-[9px] uppercase tracking-wider text-slate-600 font-bold mr-1">Quick Query:</span>
        {COMMANDS.filter(cmd => cmd.command !== "clear").map((cmd, idx) => (
          <button
            key={idx}
            onClick={(e) => {
              e.stopPropagation();
              runCommand(cmd.command);
            }}
            className="px-2 py-0.5 rounded text-[10px] bg-[#070b16] border border-slate-800/80 hover:border-cyan-500/30 text-slate-500 hover:text-cyan-400 active:scale-95 transition-all cursor-pointer font-mono"
          >
            {cmd.command}
          </button>
        ))}
      </div>
    </div>
  );
};
