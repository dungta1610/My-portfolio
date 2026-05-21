import React from "react";

export const PixelCampfire: React.FC<{ className?: string }> = ({ className = "" }) => {
  // We use a 160 x 160 grid for extra fine detail, making it look like a high-end 16-bit RPG scene.
  return (
    <div className={`relative w-full aspect-square overflow-hidden border-2 border-[#ffd700] pixel-border-gold ${className}`}>
      <svg
        viewBox="0 0 160 160"
        className="w-full h-full pixelated select-none"
        shapeRendering="crispEdges"
      >
        <defs>
          {/* Flame animations */}
          <style>{`
            @keyframes flame-cycle-3 {
              0%, 32.9% { opacity: 1; }
              33%, 99.9% { opacity: 0; }
            }
            @keyframes flame-cycle-3-delay1 {
              0%, 32.9% { opacity: 0; }
              33%, 65.9% { opacity: 1; }
              66%, 100% { opacity: 0; }
            }
            @keyframes flame-cycle-3-delay2 {
              0%, 65.9% { opacity: 0; }
              66%, 100% { opacity: 1; }
            }
            .animate-f3-1 { animation: flame-cycle-3 0.6s steps(1) infinite; }
            .animate-f3-2 { animation: flame-cycle-3-delay1 0.6s steps(1) infinite; }
            .animate-f3-3 { animation: flame-cycle-3-delay2 0.6s steps(1) infinite; }
            
            /* Knight breathing animation */
            @keyframes knight-idle {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(1px); }
            }
            .animate-knight-idle {
              animation: knight-idle 2.4s steps(1) infinite;
              transform-origin: bottom center;
            }

            /* Spear gleam */
            @keyframes spear-gleam {
              0%, 90%, 100% { fill: #cbd5e1; }
              95% { fill: #ffffff; }
            }
            .animate-spear { animation: spear-gleam 4s infinite; }
          `}</style>
        </defs>

        {/* ── SKY BACKGROUND ── */}
        <rect x="0" y="0" width="160" height="160" fill="#040508" />
        <rect x="0" y="65" width="160" height="95" fill="#070912" />
        <rect x="0" y="95" width="160" height="65" fill="#0b0d1c" />
        <rect x="0" y="115" width="160" height="45" fill="#111326" />

        {/* Crescent Moon (exact pixel art, no cutout overlap bugs) */}
        <g transform="translate(100, 16)">
          {/* Row 0 */}
          <rect x="4" y="0" width="4" height="1" fill="#e9e5c4" />
          {/* Row 1 */}
          <rect x="2" y="1" width="6" height="1" fill="#e9e5c4" />
          {/* Row 2 */}
          <rect x="1" y="2" width="2" height="1" fill="#e9e5c4" />
          <rect x="3" y="2" width="1" height="1" fill="#d0cb9e" />
          {/* Row 3 */}
          <rect x="1" y="3" width="1" height="1" fill="#e9e5c4" />
          <rect x="2" y="3" width="1" height="1" fill="#d0cb9e" />
          {/* Row 4 */}
          <rect x="1" y="4" width="1" height="1" fill="#e9e5c4" />
          <rect x="2" y="4" width="1" height="1" fill="#d0cb9e" />
          {/* Row 5 */}
          <rect x="1" y="5" width="1" height="1" fill="#e9e5c4" />
          <rect x="2" y="5" width="1" height="1" fill="#d0cb9e" />
          {/* Row 6 */}
          <rect x="1" y="6" width="2" height="1" fill="#e9e5c4" />
          <rect x="3" y="6" width="1" height="1" fill="#d0cb9e" />
          {/* Row 7 */}
          <rect x="2" y="7" width="6" height="1" fill="#e9e5c4" />
          {/* Row 8 */}
          <rect x="4" y="8" width="4" height="1" fill="#e9e5c4" />

          {/* Soft outer moon glow */}
          <rect x="5" y="-1" width="2" height="1" fill="#e9e5c4" opacity="0.3" />
          <rect x="0" y="3" width="1" height="3" fill="#e9e5c4" opacity="0.3" />
          <rect x="8" y="1" width="1" height="1" fill="#e9e5c4" opacity="0.3" />
          <rect x="8" y="7" width="1" height="1" fill="#e9e5c4" opacity="0.3" />
          <rect x="5" y="9" width="2" height="1" fill="#e9e5c4" opacity="0.3" />
        </g>

        {/* Twinkling Stars */}
        <rect className="animate-pulse" x="18" y="26" width="2" height="2" fill="#ffffff" />
        <rect className="animate-pulse" x="25" y="14" width="1" height="1" fill="#a5b4fc" style={{ animationDelay: "0.5s" }} />
        <rect className="animate-pulse" x="48" y="32" width="2" height="2" fill="#ffffff" style={{ animationDelay: "1s" }} />
        <rect className="animate-pulse" x="65" y="12" width="1" height="1" fill="#ffffff" style={{ animationDelay: "1.5s" }} />
        <rect className="animate-pulse" x="78" y="28" width="2" height="2" fill="#a5b4fc" style={{ animationDelay: "0.2s" }} />
        <rect className="animate-pulse" x="135" y="38" width="1" height="1" fill="#ffffff" style={{ animationDelay: "0.8s" }} />
        <rect className="animate-pulse" x="144" y="22" width="2" height="2" fill="#ffffff" style={{ animationDelay: "1.2s" }} />

        {/* ── DISTANT BACKGROUND SILHOUETTE (Deep Forest & Mountains) ── */}
        {/* Layer 1: Far background tree outlines (dark grey-blue) */}
        <path d="M12,95 L18,72 L22,72 L28,95 Z M25,95 L30,76 L33,76 L38,95 Z M50,95 L58,68 L62,68 L70,95 Z M65,95 L72,70 L75,70 L82,95 Z M90,95 L96,75 L98,75 L104,95 Z M120,95 L128,66 L132,66 L140,95 Z" fill="#070a14" />
        {/* Layer 2: Mid background tree outlines (slightly lighter) */}
        <path d="M5,115 L12,85 L16,85 L23,115 Z M35,115 L43,82 L47,82 L55,115 Z M78,115 L86,88 L89,88 L97,115 Z M105,115 L112,90 L115,90 L122,115 Z" fill="#0b0e1e" />

        {/* ── FOREGROUND PINE TREES (Left & Right) ── */}
        {/* Left Tree Trunk (shading & texture) */}
        <rect x="0" y="15" width="12" height="120" fill="#151821" />
        <rect x="0" y="15" width="4" height="120" fill="#0b0c10" /> {/* shadow */}
        <rect x="8" y="15" width="2" height="120" fill="#202432" /> {/* highlight */}
        <rect x="10" y="15" width="2" height="120" fill="#2c3144" /> {/* bright rim */}
        {/* Bark knots */}
        <rect x="4" y="45" width="3" height="4" fill="#0b0c10" />
        <rect x="5" y="85" width="3" height="3" fill="#0b0c10" />

        {/* Left Tree Branches / Pine Needles (detailed clumps) */}
        <path d="M0,8 h24 v16 h-8 v4 h-6 v4 h-10 Z" fill="#0d2416" />
        <path d="M0,12 h20 v8 h-4 v4 h-16 Z" fill="#12331f" />
        <path d="M0,8 h14 v6 h-4 v4 h-10 Z" fill="#1a472c" /> {/* highlights */}
        
        <path d="M0,32 h18 v12 h-6 v4 h-12 Z" fill="#0d2416" />
        <path d="M0,35 h14 v6 h-4 v4 h-10 Z" fill="#12331f" />
        
        <path d="M0,56 h14 v10 h-4 v4 h-10 Z" fill="#0d2416" />
        <path d="M0,58 h10 v6 h-10 Z" fill="#12331f" />

        <path d="M0,78 h12 v8 h-12 Z" fill="#0d2416" />

        {/* Right Tree Trunk */}
        <rect x="146" y="10" width="14" height="125" fill="#151821" />
        <rect x="146" y="10" width="4" height="125" fill="#0b0c10" />
        <rect x="152" y="10" width="2" height="125" fill="#202432" />
        <rect x="154" y="10" width="2" height="125" fill="#2c3144" />
        
        {/* Right Tree Branches / Pine Needles */}
        <path d="M136,5 h24 v18 h-12 v4 h-8 v4 h-4 Z" fill="#0d2416" />
        <path d="M142,8 h18 v12 h-8 v4 h-10 Z" fill="#12331f" />
        <path d="M148,5 h12 v6 h-6 v4 h-6 Z" fill="#1a472c" />

        <path d="M138,28 h22 v12 h-10 v4 h-12 Z" fill="#0d2416" />
        <path d="M144,31 h16 v8 h-16 Z" fill="#12331f" />

        <path d="M140,52 h20 v10 h-10 v4 h-10 Z" fill="#0d2416" />
        <path d="M146,55 h14 v6 h-14 Z" fill="#12331f" />

        <path d="M144,76 h16 v8 h-16 Z" fill="#0d2416" />

        {/* Hanging Moss details */}
        <rect x="22" y="24" width="2" height="8" fill="#112919" />
        <rect x="23" y="28" width="1" height="8" fill="#1a472c" />
        <rect x="134" y="22" width="2" height="10" fill="#112919" />
        <rect x="135" y="26" width="1" height="8" fill="#1a472c" />

        {/* ── DETAILED GROUND FLOOR ── */}
        <rect x="0" y="132" width="160" height="28" fill="#0b0d15" />
        <rect x="0" y="132" width="160" height="2" fill="#151b29" /> {/* ground edge */}
        <rect x="0" y="134" width="160" height="2" fill="#1d263b" />
        <rect x="20" y="136" width="120" height="2" fill="#25314c" />
        
        {/* Grass Tufts Foreground */}
        <path d="M25,128 v4 h1 v-4 Z M26,129 v3 h1 v-3 Z M24,130 v2 h1 v-2 Z" fill="#12331f" />
        <path d="M25,128 v2 h1 v-2 Z" fill="#1a472c" />
        
        <path d="M78,129 v3 h1 v-3 Z M79,128 v4 h1 v-4 Z M80,130 v2 h1 v-2 Z" fill="#12331f" />
        <path d="M79,128 v2 h1 v-2 Z" fill="#1a472c" />
        
        <path d="M132,130 v2 h1 v-2 Z M133,129 v3 h1 v-3 Z" fill="#12331f" />

        {/* Small pebbles on ground */}
        <rect x="45" y="138" width="3" height="2" fill="#2b3240" />
        <rect x="46" y="137" width="1" height="1" fill="#4d5666" />
        <rect x="115" y="142" width="4" height="2" fill="#2b3240" />
        <rect x="116" y="141" width="2" height="1" fill="#4d5666" />

        {/* ── FIRE LIGHT GLOW LAYER ── */}
        <circle cx="80" cy="116" r="38" fill="#d97706" opacity="0.10" className="animate-pulse" style={{ mixBlendMode: "screen" }} />
        <circle cx="80" cy="116" r="24" fill="#f59e0b" opacity="0.14" className="animate-pulse" style={{ animationDelay: "0.3s", mixBlendMode: "screen" }} />
        <circle cx="80" cy="116" r="14" fill="#fef08a" opacity="0.18" className="animate-pulse" style={{ animationDelay: "0.6s", mixBlendMode: "screen" }} />

        {/* ── LEFT LOG & SHADED SITTING KNIGHT ── */}
        {/* Log (X:20 to 56, Y:112 to 132) */}
        <g transform="translate(18, 114)">
          <rect x="0" y="4" width="36" height="14" fill="#4a1d02" />
          <rect x="0" y="4" width="36" height="3" fill="#703004" /> {/* top light */}
          <rect x="0" y="15" width="36" height="3" fill="#290e00" /> {/* shadow */}
          {/* Wood grain line */}
          <rect x="10" y="9" width="15" height="1" fill="#290e00" />
          <rect x="28" y="7" width="6" height="1" fill="#290e00" />
          {/* Log side face circle (3D depth look) */}
          <ellipse cx="0" cy="11" rx="4" ry="7" fill="#703004" />
          <ellipse cx="0" cy="11" rx="2.5" ry="4.5" fill="#8c3e07" />
          <ellipse cx="0" cy="11" rx="1" ry="2" fill="#4a1d02" />
        </g>

        {/* Knight sitting on log (with sub-pixel detail & breathing) */}
        <g transform="translate(30, 80)">
          <g className="animate-knight-idle">
            {/* Red Plume */}
            <path d="M4,0 h4 v3 h-4 Z M6,-2 h3 v3 h-3 Z" fill="#b91c1c" />
            <path d="M5,-1 h3 v2 h-3 Z" fill="#ef4444" /> {/* plume highlight */}
            
            {/* Helmet */}
            <rect x="6" y="3" width="10" height="10" fill="#94a3b8" />
            <rect x="7" y="2" width="8" height="1" fill="#cbd5e1" />
            <rect x="5" y="5" width="2" height="6" fill="#64748b" /> {/* back plate */}
            <rect x="15" y="5" width="2" height="6" fill="#cbd5e1" /> {/* visor edge highlight */}
            {/* Visor Slit */}
            <rect x="10" y="6" width="6" height="2" fill="#0f172a" />
            <rect x="13" y="6" width="1" height="2" fill="#ef4444" /> {/* red eye glow */}

            {/* Neck Guard / Gorget */}
            <rect x="8" y="13" width="6" height="2" fill="#64748b" />

            {/* Cape cascading down */}
            <path d="M1,14 h7 v24 h-7 Z" fill="#991b1b" />
            <path d="M0,18 h4 v20 h-4 Z" fill="#7f1d1d" />
            <path d="M2,14 h2 v24 h-2 Z" fill="#b91c1c" /> {/* cape folds highlight */}

            {/* Torso Armor */}
            <rect x="7" y="15" width="12" height="18" fill="#94a3b8" />
            <rect x="6" y="17" width="2" height="14" fill="#64748b" />
            <rect x="17" y="17" width="3" height="14" fill="#cbd5e1" /> {/* metallic breastplate highlight */}
            <rect x="9" y="15" width="8" height="2" fill="#cbd5e1" />
            {/* Belt */}
            <rect x="7" y="28" width="12" height="2" fill="#451a03" />
            <rect x="12" y="28" width="2" height="2" fill="#ffd700" /> {/* buckle */}

            {/* Arm resting on knee */}
            <rect x="14" y="21" width="6" height="4" fill="#cbd5e1" />
            <rect x="17" y="23" width="5" height="4" fill="#94a3b8" />
            <rect x="8" y="19" width="4" height="4" fill="#64748b" />

            {/* Legs folded */}
            <rect x="9" y="33" width="14" height="11" fill="#475569" />
            <rect x="15" y="36" width="10" height="8" fill="#334155" />
            <rect x="21" y="40" width="6" height="4" fill="#1e293b" />
            <rect x="21" y="40" width="2" height="2" fill="#475569" />
          </g>
        </g>

        {/* ── RIGHT MOSSY BOULDER & EQUIPMENT ── */}
        {/* Mossy Rock (X:108 to 138, Y:102 to 132) */}
        <g transform="translate(108, 102)">
          <rect x="0" y="6" width="30" height="24" fill="#2d3748" />
          <rect x="3" y="3" width="24" height="4" fill="#4a5568" />
          <rect x="1" y="7" width="2" height="23" fill="#1a202c" /> {/* dark shadow side */}
          <rect x="27" y="7" width="3" height="23" fill="#4a5568" /> {/* highlight side */}
          {/* Rock cracks */}
          <path d="M10,7 v4 h1 v4 h-2 v4" stroke="#1a202c" strokeWidth="1" fill="none" />
          
          {/* Moss covering rock */}
          <rect x="2" y="3" width="18" height="3" fill="#14351a" />
          <rect x="4" y="0" width="12" height="3" fill="#1b4d24" />
          <rect x="6" y="-1" width="8" height="2" fill="#2e7d3a" /> {/* bright green top moss */}
          <rect x="20" y="6" width="5" height="4" fill="#14351a" />
        </g>

        {/* Leaning Shield (X:104 to 120, Y:110 to 134) */}
        <g transform="translate(102, 110)">
          {/* Shield Gold Border */}
          <path d="M0,0 h14 L14,10 L7,22 L0,10 Z" fill="#ffd700" />
          {/* Inner blue field */}
          <path d="M2,1 h10 L10,9 L7,19 L2,9 Z" fill="#1e3a8a" />
          {/* Cross Emblem */}
          <rect x="6" y="2" width="2" height="14" fill="#ffd700" />
          <rect x="3" y="6" width="8" height="2" fill="#ffd700" />
          {/* Shield shadow cast on rock */}
          <rect x="-2" y="4" width="2" height="18" fill="#000000" opacity="0.4" />
        </g>

        {/* Leaning Spear (diagonally behind rock, with reflection) */}
        <g transform="translate(122, 70) rotate(14)">
          {/* Spear shaft with wood color highlights */}
          <rect x="2" y="8" width="2" height="60" fill="#5c2505" />
          <rect x="3" y="8" width="1" height="60" fill="#8c3e07" />
          {/* Grip wrap detail */}
          <rect x="2" y="28" width="2" height="8" fill="#2b3240" />
          <rect x="2" y="48" width="2" height="4" fill="#2b3240" />

          {/* Silver spear tip with gleam */}
          <path d="M1,8 L3,0 L5,8 Z" fill="#cbd5e1" className="animate-spear" />
          <path d="M2,8 L3,0 L3,8 Z" fill="#94a3b8" />
          <rect x="2" y="7" width="2" height="2" fill="#475569" />
        </g>

        {/* ── DETAILED BONFIRE PIT & COILED SWORD ── */}
        {/* Bonfire Stone Ring (layered for depth) */}
        <g transform="translate(62, 126)">
          <rect x="0" y="3" width="36" height="6" fill="#3a4454" />
          <rect x="3" y="0" width="30" height="4" fill="#4a5568" />
          <rect x="0" y="3" width="4" height="6" fill="#212630" /> {/* shadow stone */}
          <rect x="32" y="3" width="4" height="6" fill="#212630" />
          {/* Stone cracks & outlines */}
          <rect x="8" y="2" width="2" height="7" fill="#212630" />
          <rect x="18" y="0" width="2" height="9" fill="#212630" />
          <rect x="26" y="2" width="2" height="7" fill="#212630" />
          {/* Warm fire highlight on stones */}
          <rect x="6" y="0" width="24" height="2" fill="#d97706" />
        </g>

        {/* Fire Wood logs */}
        <g transform="translate(68, 122)">
          <rect x="2" y="4" width="20" height="5" fill="#4a1d02" />
          <path d="M0,6 L6,0 L9,2 L3,8 Z" fill="#703004" />
          <path d="M24,6 L18,0 L15,2 L21,8 Z" fill="#703004" />
          <rect x="8" y="2" width="8" height="4" fill="#290e00" />
        </g>

        {/* Coiled Sword (homage to Dark Souls) */}
        <g transform="translate(77, 85)">
          {/* Twisted blade */}
          <rect x="2" y="10" width="2" height="32" fill="#94a3b8" />
          <rect x="3" y="10" width="1" height="32" fill="#cbd5e1" />
          <rect x="2" y="12" width="1" height="28" fill="#475569" />
          {/* Twists */}
          <rect x="1" y="16" width="3" height="2" fill="#cbd5e1" />
          <rect x="2" y="24" width="3" height="2" fill="#cbd5e1" />
          <rect x="1" y="32" width="3" height="2" fill="#cbd5e1" />
          
          {/* Detailed Guard */}
          <rect x="-3" y="8" width="12" height="2" fill="#ffd700" />
          <rect x="-4" y="6" width="3" height="3" fill="#aa7c11" />
          <rect x="7" y="6" width="3" height="3" fill="#aa7c11" />
          
          {/* Grip */}
          <rect x="2" y="2" width="2" height="6" fill="#4a1d02" />
          {/* Pommel */}
          <rect x="1" y="0" width="4" height="2" fill="#ffd700" />

          {/* Fire heat glow at bottom of blade */}
          <rect x="2" y="32" width="2" height="10" fill="#f59e0b" opacity="0.8" />
          <rect x="2" y="38" width="2" height="4" fill="#fef08a" />
        </g>

        {/* ── 3-FRAME SMOOTH PIXEL FLAME CYCLING ── */}
        {/* Frame 1 */}
        <g transform="translate(62, 90)">
          <g className="animate-f3-1">
            {/* Red/Orange body */}
            <path d="M12,36 L8,24 L14,10 L22,4 L26,14 L30,2 L34,16 L37,8 L40,24 L38,36 Z" fill="#ea580c" opacity="0.95" />
            {/* Orange */}
            <path d="M15,36 L13,26 L17,14 L22,8 L26,18 L29,10 L33,20 L35,16 L37,26 L35,36 Z" fill="#f97316" />
            {/* Yellow core */}
            <path d="M18,36 L17,28 L21,18 L25,12 L28,20 L31,16 L33,26 L31,36 Z" fill="#facc15" />
            {/* White-Yellow hot center */}
            <path d="M21,36 L21,30 L24,24 L27,18 L29,24 L28,32 L26,36 Z" fill="#fef08a" />
          </g>
        </g>

        {/* Frame 2 */}
        <g transform="translate(62, 90)">
          <g className="animate-f3-2">
            {/* Red/Orange body */}
            <path d="M12,36 L14,22 L17,6 L23,12 L27,2 L31,14 L35,6 L39,22 L38,36 Z" fill="#ea580c" opacity="0.95" />
            {/* Orange */}
            <path d="M15,36 L17,24 L19,12 L23,16 L27,8 L30,16 L33,12 L35,24 L34,36 Z" fill="#f97316" />
            {/* Yellow core */}
            <path d="M18,36 L20,26 L22,16 L25,12 L28,16 L31,20 L30,36 Z" fill="#facc15" />
            {/* White-Yellow hot center */}
            <path d="M22,36 L23,28 L25,20 L27,16 L28,22 L27,32 L25,36 Z" fill="#fef08a" />
          </g>
        </g>

        {/* Frame 3 */}
        <g transform="translate(62, 90)">
          <g className="animate-f3-3">
            {/* Red/Orange body */}
            <path d="M12,36 L10,26 L13,12 L19,4 L24,14 L28,6 L32,18 L36,10 L39,26 L38,36 Z" fill="#ea580c" opacity="0.95" />
            {/* Orange */}
            <path d="M15,36 L13,28 L15,16 L20,8 L24,18 L28,12 L30,22 L33,16 L35,28 L34,36 Z" fill="#f97316" />
            {/* Yellow core */}
            <path d="M18,36 L17,30 L19,20 L23,12 L26,20 L28,16 L31,26 L30,36 Z" fill="#facc15" />
            {/* White-Yellow hot center */}
            <path d="M21,36 L21,32 L23,24 L25,18 L27,24 L26,30 L25,36 Z" fill="#fef08a" />
          </g>
        </g>

        {/* ── HIGH DENSITY EMBER PARTICLES ── */}
        <rect className="animate-ember-1" x="78" y="102" width="2" height="2" fill="#fef08a" />
        <rect className="animate-ember-2" x="84" y="96" width="2" height="2" fill="#ffd166" />
        <rect className="animate-ember-3" x="73" y="105" width="2" height="2" fill="#f97316" />
        <rect className="animate-ember-2" x="88" y="100" width="1.5" height="1.5" fill="#f59e0b" style={{ animationDelay: "0.8s" }} />
        <rect className="animate-ember-1" x="71" y="94" width="1" height="1" fill="#ef4444" style={{ animationDelay: "0.4s" }} />
      </svg>
    </div>
  );
};
