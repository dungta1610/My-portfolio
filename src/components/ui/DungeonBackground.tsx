import React from "react";

export const DungeonBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Static pixel art background image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/dungeon-bg.png"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ imageRendering: "pixelated", opacity: 0.5 }}
      />

      {/* Dark vignette overlay — soft edges, center stays visible */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 110% 110% at 50% 50%, transparent 35%, rgba(5,6,9,0.85) 100%)",
        }}
      />
    </div>
  );
};
