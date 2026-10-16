import React, { useCallback, useRef } from "react";
import { motion } from "motion/react";

interface RoyalHaldiGateProps {
  isOpen: boolean;
  onOpen: () => void;
  active?: boolean;
}

const EASE_GATE: [number, number, number, number] = [0.4, 0, 0.2, 1];

export const RoyalHaldiGate: React.FC<RoyalHaldiGateProps> = ({
  isOpen,
  onOpen,
  active = true,
}) => {
  const isTriggered = useRef(false);

  // Play royal bell chime on open using Web Audio API
  const playBellChime = useCallback(() => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const now = ctx.currentTime;
      // High bell chime harmonic frequencies
      const freqs = [1174.66, 1760.0, 2349.32];
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.08 / (idx + 1), now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2 + idx * 0.3);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.05);
        osc.stop(now + 1.6 + idx * 0.3);
      });
    } catch {
      // Audio not supported or blocked
    }
  }, []);

  const handleGateAction = () => {
    if (!isOpen && !isTriggered.current) {
      isTriggered.current = true;
      playBellChime();
      onOpen();
    }
  };

  return (
    <div
      className="absolute inset-0 z-30 pointer-events-auto select-none overflow-hidden"
      onClick={handleGateAction}
      style={{
        cursor: !isOpen ? "pointer" : "default",
        perspective: "1400px",
      }}
    >
      {/* Zooming Entrance Camera Rig:
          Zooms into the open doorway when user interacts, creating the walk-through feel */}
      <motion.div
        className="w-full h-full relative"
        initial={false}
        animate={{
          scale: isOpen ? 2.85 : 1,
          opacity: isOpen ? 0 : 1,
        }}
        transition={{
          duration: 1.2,
          ease: EASE_GATE,
          delay: isOpen ? 0.35 : 0,
        }}
        style={{
          transformOrigin: "50% 55%",
          willChange: "transform, opacity",
          pointerEvents: isOpen ? "none" : "auto",
        }}
      >
        {/* Base SVG with all gradients, arch, pillars, garlands and hanging bells */}
        <svg
          viewBox="0 0 720 1280"
          className="w-full h-full object-cover absolute inset-0"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden={true}
        >
          <defs>
            {/* Background Festive Gold Radial Glow */}
            <radialGradient id="smHaldiBgGlow" cx="50%" cy="45%" r="70%">
              <stop offset="0%" stopColor="#fff8e7" />
              <stop offset="40%" stopColor="#feedb8" />
              <stop offset="85%" stopColor="#f7d478" />
              <stop offset="100%" stopColor="#eab308" />
            </radialGradient>

            {/* Pillar Marble & Gold Gradient */}
            <linearGradient id="smPillarGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#fdf7e7" />
              <stop offset="18%" stopColor="#fffef8" />
              <stop offset="55%" stopColor="#fae7b9" />
              <stop offset="85%" stopColor="#e8c775" />
              <stop offset="100%" stopColor="#caa44b" />
            </linearGradient>

            {/* Pillar Shadow Base */}
            <linearGradient id="smPillarShade" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#b4882b" />
              <stop offset="100%" stopColor="#7a5511" />
            </linearGradient>

            {/* Marigold Orange Radial */}
            <radialGradient id="smMarigoldOrange" cx="42%" cy="40%" r="58%">
              <stop offset="0%" stopColor="#fff2a1" />
              <stop offset="30%" stopColor="#fbbf24" />
              <stop offset="65%" stopColor="#f97316" />
              <stop offset="92%" stopColor="#ea580c" />
              <stop offset="100%" stopColor="#9a3412" />
            </radialGradient>

            {/* Marigold Yellow Radial */}
            <radialGradient id="smMarigoldYellow" cx="42%" cy="40%" r="58%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="35%" stopColor="#fef08a" />
              <stop offset="70%" stopColor="#facc15" />
              <stop offset="95%" stopColor="#eab308" />
              <stop offset="100%" stopColor="#ca8a04" />
            </radialGradient>

            {/* Mango Leaf Green */}
            <linearGradient id="smMangoLeaf" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4ade80" />
              <stop offset="45%" stopColor="#16a34a" />
              <stop offset="85%" stopColor="#15803d" />
              <stop offset="100%" stopColor="#14532d" />
            </linearGradient>

            {/* Brass Bell Metallic Gradient */}
            <linearGradient id="smBrassBell" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#b38728" />
              <stop offset="25%" stopColor="#fbf0b9" />
              <stop offset="48%" stopColor="#fde047" />
              <stop offset="75%" stopColor="#ca8a04" />
              <stop offset="100%" stopColor="#713f12" />
            </linearGradient>

            {/* Door Lacquered Honey Gold Wood */}
            <linearGradient id="smDoorWood" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fff1b8" />
              <stop offset="20%" stopColor="#fde047" />
              <stop offset="50%" stopColor="#eab308" />
              <stop offset="80%" stopColor="#d97706" />
              <stop offset="100%" stopColor="#b45309" />
            </linearGradient>

            {/* Door Inner Recessed Panel Fill */}
            <linearGradient id="smDoorPanel" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="40%" stopColor="#facc15" />
              <stop offset="100%" stopColor="#eab308" />
            </linearGradient>

            {/* Bronze Gate Bar */}
            <linearGradient id="smBronzeBar" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#573809" />
              <stop offset="40%" stopColor="#d4af37" />
              <stop offset="70%" stopColor="#aa820a" />
              <stop offset="100%" stopColor="#452a06" />
            </linearGradient>

            {/* Lotus Petal Gradient */}
            <radialGradient id="smLotusPetal" cx="45%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="35%" stopColor="#fed7aa" />
              <stop offset="75%" stopColor="#fb923c" />
              <stop offset="100%" stopColor="#ea580c" />
            </radialGradient>

            {/* Lotus Center Petal */}
            <linearGradient id="smLotusCore" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#ea580c" />
              <stop offset="60%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#ffffff" />
            </linearGradient>

            {/* Brass Door Knocker Boss */}
            <radialGradient id="smBossBrass" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="30%" stopColor="#fde047" />
              <stop offset="70%" stopColor="#ca8a04" />
              <stop offset="100%" stopColor="#583405" />
            </radialGradient>

            {/* Drop Shadows */}
            <filter id="smBellShadow" x="-30%" y="-20%" width="160%" height="160%">
              <feDropShadow dx="0" dy="5" stdDeviation="4" floodColor="#4a2806" floodOpacity="0.38" />
            </filter>
            <filter id="smDoorShadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#3f2203" floodOpacity="0.45" />
            </filter>
            <filter id="smKnockerShadow" x="-40%" y="-30%" width="180%" height="180%">
              <feDropShadow dx="2" dy="5" stdDeviation="3.5" floodColor="#271502" floodOpacity="0.55" />
            </filter>
          </defs>

          {/* BACKGROUND WALL & AMBIENCE */}
          <rect width="720" height="1280" fill="url(#smHaldiBgGlow)" />

          {/* TOP CURTAIN DRAPES (Warm Yellow Scalloped Silk) */}
          <g opacity="0.95">
            {/* Top Back Drapery Swags */}
            <path
              d="M0,0 L720,0 L720,130 Q600,210 480,120 Q360,220 240,120 Q120,210 0,130 Z"
              fill="#f59e0b"
              opacity="0.8"
            />
            {/* Front Deep Folds */}
            <path
              d="M0,0 L720,0 L720,95 C620,175 520,170 420,95 C320,175 220,175 120,95 C60,140 0,145 0,95 Z"
              fill="#fbbf24"
              opacity="0.9"
            />
            {/* Scalloped Gold Borders */}
            <path
              d="M0,130 Q120,210 240,120 Q360,220 480,120 Q600,210 720,130"
              fill="none"
              stroke="#ca8a04"
              strokeWidth="4"
            />
            {/* Hanging Pearl/Bead Strands */}
            {[60, 120, 180, 240, 300, 360, 420, 480, 540, 600, 660].map((bx) => (
              <g key={bx} opacity="0.75">
                <line x1={bx} y1={0} x2={bx} y2={100 + (bx % 80)} stroke="#fef08a" strokeWidth="1.5" strokeDasharray="3 4" />
                <circle cx={bx} cy={100 + (bx % 80)} r="3" fill="#ffffff" stroke="#eab308" strokeWidth="1" />
              </g>
            ))}
          </g>

          {/* FLOOR THRESHOLD (Marble Floor with Marigold Rangoli) */}
          <g>
            <rect x="0" y="1150" width="720" height="130" fill="#fae8b4" />
            <line x1="0" y1="1150" x2="720" y2="1150" stroke="#ca8a04" strokeWidth="5" />

            {/* Circular Petal Rangoli in front of Gate */}
            <g transform="translate(360, 1180)" opacity="0.9">
              {/* Outer Orange Petals Ring */}
              {[...Array(16)].map((_, i) => (
                <ellipse
                  key={`ro-${i}`}
                  cx="0"
                  cy="0"
                  rx="14"
                  ry="48"
                  fill="url(#smMarigoldOrange)"
                  transform={`rotate(${i * 22.5})`}
                  opacity="0.9"
                />
              ))}
              {/* Inner Yellow Petals Ring */}
              {[...Array(12)].map((_, i) => (
                <ellipse
                  key={`ry-${i}`}
                  cx="0"
                  cy="0"
                  rx="11"
                  ry="32"
                  fill="url(#smMarigoldYellow)"
                  transform={`rotate(${i * 30 + 15})`}
                />
              ))}
              <circle cx="0" cy="0" r="16" fill="url(#smMarigoldOrange)" />
              <circle cx="0" cy="0" r="8" fill="#ffffff" />
            </g>

            {/* Green Banana / Tropical Leaves at corners */}
            <path d="M0,1160 Q60,1140 90,1210 Q40,1260 0,1280 Z" fill="url(#smMangoLeaf)" opacity="0.85" />
            <path d="M720,1160 Q660,1140 630,1210 Q680,1260 720,1280 Z" fill="url(#smMangoLeaf)" opacity="0.85" />
          </g>

          {/* DOORWAY OPENING PORTAL (Inside glimpse when doors swing open) */}
          <g>
            {/* Cutout behind the doors where the interior Haldi venue glows */}
            <path
              d="M 126 1150 L 126 440 C 130 360, 240 340, 360 340 C 480 340, 590 360, 594 440 L 594 1150 Z"
              fill="#fff9e6"
            />
            {/* Warm Golden Interior Ambient Glow */}
            <radialGradient id="smDoorwayGlow" cx="50%" cy="60%" r="65%">
              <stop offset="0%" stopColor="#fffbeb" stopOpacity="0.95" />
              <stop offset="50%" stopColor="#fef08a" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#eab308" stopOpacity="0.4" />
            </radialGradient>
            <path
              d="M 126 1150 L 126 440 C 130 360, 240 340, 360 340 C 480 340, 590 360, 594 440 L 594 1150 Z"
              fill="url(#smDoorwayGlow)"
            />
          </g>

          {/* PILLARS & ARCH FRAME (Left Pillar, Right Pillar, and Floral Garland Arch) */}
          {/* Note: This stays intact framing the entrance, never splitting open! */}
          <g>
            {/* --- LEFT PILLAR --- */}
            <g id="smLeftPillar">
              {/* Pillar Plinth Base */}
              <rect x="24" y="1135" width="104" height="25" fill="#ca8a04" rx="3" />
              <rect x="30" y="1120" width="92" height="18" fill="url(#smPillarGrad)" rx="2" />

              {/* Pillar Main Shaft */}
              <rect x="38" y="420" width="76" height="705" fill="url(#smPillarGrad)" />
              <line x1="38" y1="420" x2="38" y2="1125" stroke="#b4882b" strokeWidth="2" />
              <line x1="114" y1="420" x2="114" y2="1125" stroke="#ca8a04" strokeWidth="2" />

              {/* Painted Traditional Floral Vine Motifs on Pillar Shaft */}
              {[460, 560, 660, 760, 860, 960, 1050].map((py, idx) => (
                <g key={`lpm-${idx}`} transform={`translate(76, ${py})`} opacity="0.6">
                  <path d="M0,-16 Q12,-8 0,0 Q-12,8 0,16" fill="none" stroke="#b4882b" strokeWidth="2" />
                  <circle cx="4" cy="-6" r="3" fill="#ca8a04" />
                  <circle cx="-4" cy="6" r="3" fill="#ca8a04" />
                  <ellipse cx="0" cy="0" rx="5" ry="3" fill="#f59e0b" />
                </g>
              ))}

              {/* Spiraling Marigold Garlands wrapped around Left Column */}
              {[
                { y: 460, angle: 18 },
                { y: 640, angle: 18 },
                { y: 820, angle: 18 },
                { y: 1000, angle: 18 },
              ].map((wrap, wIdx) => (
                <g key={`lgw-${wIdx}`} transform={`translate(32, ${wrap.y}) rotate(${wrap.angle})`}>
                  {/* Garland Strand */}
                  <rect x="0" y="0" width="96" height="26" rx="13" fill="url(#smMarigoldOrange)" filter="drop-shadow(0 3px 3px rgba(80,40,0,0.35))" />
                  {/* Fluffy Flower Nodes */}
                  {[8, 24, 40, 56, 72, 88].map((fx, fi) => (
                    <circle
                      key={`lfn-${fi}`}
                      cx={fx}
                      cy={13}
                      r={fi % 2 === 0 ? 11 : 9}
                      fill={fi % 2 === 0 ? "url(#smMarigoldOrange)" : "url(#smMarigoldYellow)"}
                    />
                  ))}
                  {/* Accent Mango Leaf */}
                  <path d="M-6,10 Q-14,0 -4,-8 Q4,-2 -6,10 Z" fill="url(#smMangoLeaf)" />
                </g>
              ))}

              {/* Pillar Capital at Top */}
              <path
                d="M 28 420 L 124 420 L 132 390 L 20 390 Z"
                fill="url(#smPillarGrad)"
                stroke="#b4882b"
                strokeWidth="1.5"
              />
              <rect x="18" y="375" width="116" height="16" fill="#ca8a04" rx="2" />

              {/* Hanging Temple Bell from Left Pillar */}
              <g transform="translate(58, 510)" filter="url(#smBellShadow)">
                <line x1="0" y1="-80" x2="0" y2="0" stroke="#b4882b" strokeWidth="2.5" />
                <circle cx="0" cy="-40" r="5" fill="url(#smMarigoldOrange)" />
                {/* Bell Body */}
                <path
                  d="M -16,36 C -16,24 -12,10 0,6 C 12,10 16,24 16,36 C 20,40 22,46 18,48 L -18,48 C -22,46 -20,40 -16,36 Z"
                  fill="url(#smBrassBell)"
                />
                <circle cx="0" cy="52" r="3.5" fill="#ca8a04" />
                <path d="M-8,48 L8,48" stroke="#713f12" strokeWidth="2" />
              </g>

              {/* Flower Bunch at Base */}
              <circle cx="50" cy="1125" r="14" fill="url(#smMarigoldOrange)" />
              <circle cx="76" cy="1120" r="15" fill="url(#smMarigoldYellow)" />
              <circle cx="102" cy="1125" r="14" fill="url(#smMarigoldOrange)" />
            </g>

            {/* --- RIGHT PILLAR --- */}
            <g id="smRightPillar">
              {/* Pillar Plinth Base */}
              <rect x="592" y="1135" width="104" height="25" fill="#ca8a04" rx="3" />
              <rect x="598" y="1120" width="92" height="18" fill="url(#smPillarGrad)" rx="2" />

              {/* Pillar Main Shaft */}
              <rect x="606" y="420" width="76" height="705" fill="url(#smPillarGrad)" />
              <line x1="606" y1="420" x2="606" y2="1125" stroke="#ca8a04" strokeWidth="2" />
              <line x1="682" y1="420" x2="682" y2="1125" stroke="#b4882b" strokeWidth="2" />

              {/* Painted Traditional Floral Vine Motifs on Pillar Shaft */}
              {[460, 560, 660, 760, 860, 960, 1050].map((py, idx) => (
                <g key={`rpm-${idx}`} transform={`translate(644, ${py})`} opacity="0.6">
                  <path d="M0,-16 Q-12,-8 0,0 Q12,8 0,16" fill="none" stroke="#b4882b" strokeWidth="2" />
                  <circle cx="-4" cy="-6" r="3" fill="#ca8a04" />
                  <circle cx="4" cy="6" r="3" fill="#ca8a04" />
                  <ellipse cx="0" cy="0" rx="5" ry="3" fill="#f59e0b" />
                </g>
              ))}

              {/* Spiraling Marigold Garlands wrapped around Right Column */}
              {[
                { y: 460, angle: -18 },
                { y: 640, angle: -18 },
                { y: 820, angle: -18 },
                { y: 1000, angle: -18 },
              ].map((wrap, wIdx) => (
                <g key={`rgw-${wIdx}`} transform={`translate(592, ${wrap.y + 26}) rotate(${wrap.angle})`}>
                  <rect x="0" y="0" width="96" height="26" rx="13" fill="url(#smMarigoldOrange)" filter="drop-shadow(0 3px 3px rgba(80,40,0,0.35))" />
                  {[8, 24, 40, 56, 72, 88].map((fx, fi) => (
                    <circle
                      key={`rfn-${fi}`}
                      cx={fx}
                      cy={13}
                      r={fi % 2 === 0 ? 11 : 9}
                      fill={fi % 2 === 0 ? "url(#smMarigoldOrange)" : "url(#smMarigoldYellow)"}
                    />
                  ))}
                  <path d="M102,10 Q110,0 100,-8 Q92,-2 102,10 Z" fill="url(#smMangoLeaf)" />
                </g>
              ))}

              {/* Pillar Capital at Top */}
              <path
                d="M 596 420 L 692 420 L 700 390 L 588 390 Z"
                fill="url(#smPillarGrad)"
                stroke="#b4882b"
                strokeWidth="1.5"
              />
              <rect x="586" y="375" width="116" height="16" fill="#ca8a04" rx="2" />

              {/* Hanging Temple Bell from Right Pillar */}
              <g transform="translate(662, 510)" filter="url(#smBellShadow)">
                <line x1="0" y1="-80" x2="0" y2="0" stroke="#b4882b" strokeWidth="2.5" />
                <circle cx="0" cy="-40" r="5" fill="url(#smMarigoldOrange)" />
                <path
                  d="M -16,36 C -16,24 -12,10 0,6 C 12,10 16,24 16,36 C 20,40 22,46 18,48 L -18,48 C -22,46 -20,40 -16,36 Z"
                  fill="url(#smBrassBell)"
                />
                <circle cx="0" cy="52" r="3.5" fill="#ca8a04" />
                <path d="M-8,48 L8,48" stroke="#713f12" strokeWidth="2" />
              </g>

              {/* Flower Bunch at Base */}
              <circle cx="618" cy="1125" r="14" fill="url(#smMarigoldOrange)" />
              <circle cx="644" cy="1120" r="15" fill="url(#smMarigoldYellow)" />
              <circle cx="670" cy="1125" r="14" fill="url(#smMarigoldOrange)" />
            </g>

            {/* --- GRAND ARCH & MARIGOLD TORAN AT TOP --- */}
            <g id="smGrandArch">
              {/* Ornate Scalloped Golden Arch Structure */}
              <path
                d="M 118 430 C 130 240, 240 160, 360 160 C 480 160, 590 240, 602 430"
                fill="none"
                stroke="#ca8a04"
                strokeWidth="16"
                strokeLinecap="round"
              />
              <path
                d="M 124 430 C 134 250, 244 175, 360 175 C 476 175, 586 250, 596 430"
                fill="none"
                stroke="#fef08a"
                strokeWidth="4"
              />

              {/* Golden Finial Kalash Motif at Apex */}
              <g transform="translate(360, 115)" filter="url(#smBellShadow)">
                <path
                  d="M0,-24 C-12,-8 -18,8 0,36 C18,8 12,-8 0,-24 Z"
                  fill="url(#smBrassBell)"
                />
                <circle cx="0" cy="-28" r="6" fill="#facc15" />
                <circle cx="0" cy="38" r="8" fill="#ca8a04" />
              </g>

              {/* Massive Outer Arch Garland (Orange & Yellow Marigolds with Mango Leaves) */}
              {[...Array(27)].map((_, fi) => {
                const t = fi / 26; // 0 to 1
                // Quadratic bezier formula along arch
                const p0 = { x: 92, y: 440 };
                const p1 = { x: 360, y: 130 };
                const p2 = { x: 628, y: 440 };
                const fx = (1 - t) * (1 - t) * p0.x + 2 * (1 - t) * t * p1.x + t * t * p2.x;
                const fy = (1 - t) * (1 - t) * p0.y + 2 * (1 - t) * t * p1.y + t * t * p2.y;
                const isYellow = fi % 2 === 0;
                const radius = 17 + (fi % 3 === 0 ? 3 : 0);

                return (
                  <g key={`oaf-${fi}`} transform={`translate(${fx}, ${fy})`} filter="drop-shadow(0 4px 4px rgba(60,25,0,0.3))">
                    {/* Mango Leaf accent sticking outward */}
                    {fi % 2 === 1 && (
                      <path
                        d="M0,0 Q-18,-18 -8,-28 Q10,-15 0,0 Z"
                        fill="url(#smMangoLeaf)"
                        transform={`rotate(${(t - 0.5) * 110})`}
                      />
                    )}
                    <circle cx="0" cy="0" r={radius} fill={isYellow ? "url(#smMarigoldYellow)" : "url(#smMarigoldOrange)"} />
                    <circle cx="-2" cy="-2" r={radius * 0.65} fill={isYellow ? "#ffffff" : "#fef08a"} opacity="0.35" />
                  </g>
                );
              })}

              {/* Inner Looped Garland Swag with 5 Hanging Brass Bells */}
              <path
                d="M 140 400 Q 240 430 360 300 Q 480 430 580 400"
                fill="none"
                stroke="url(#smMarigoldOrange)"
                strokeWidth="14"
                strokeLinecap="round"
                filter="drop-shadow(0 3px 3px rgba(60,25,0,0.25))"
              />

              {/* 5 Hanging Bells on Garland Chains */}
              {[
                { x: 170, y: 395, chain: 55, bellSize: 1 },
                { x: 236, y: 345, chain: 65, bellSize: 1.1 },
                { x: 360, y: 240, chain: 85, bellSize: 1.35 },
                { x: 484, y: 345, chain: 65, bellSize: 1.1 },
                { x: 550, y: 395, chain: 55, bellSize: 1 },
              ].map((bell, bi) => (
                <g key={`hb-${bi}`} transform={`translate(${bell.x}, ${bell.y})`} filter="url(#smBellShadow)">
                  {/* Hanging Flower String */}
                  <line x1="0" y1="0" x2="0" y2={bell.chain} stroke="#ca8a04" strokeWidth="2" strokeDasharray="2 3" />
                  <circle cx="0" cy={bell.chain * 0.4} r="4.5" fill="url(#smMarigoldOrange)" />
                  <circle cx="0" cy={bell.chain * 0.75} r="5" fill="url(#smMarigoldYellow)" />

                  {/* Temple Bell */}
                  <g transform={`translate(0, ${bell.chain}) scale(${bell.bellSize})`}>
                    <path
                      d="M -13,26 C -13,18 -10,8 0,5 C 10,8 13,18 13,26 C 16,30 18,34 14,36 L -14,36 C -18,34 -16,30 -13,26 Z"
                      fill="url(#smBrassBell)"
                    />
                    <circle cx="0" cy="39" r="2.8" fill="#ca8a04" />
                    <line x1="-6" y1="36" x2="6" y2="36" stroke="#713f12" strokeWidth="1.5" />
                  </g>
                </g>
              ))}
            </g>
          </g>
        </svg>

        {/* =========================================================================
            THE 3D OPENING GATE (LEFT DOOR LEAF & RIGHT DOOR LEAF)
            Matches the second image:
            - Golden lacquer wood panels with orange blooming lotus artwork
            - Vertical bronze grille with hanging marigold garland chains
            - Heavy brass door knockers
            - Opens outward like royal palace doors!
            ========================================================================= */}
        <div
          className="absolute inset-0 pointer-events-auto"
          style={{
            perspective: "1400px",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Outer Gateway Portal Bounds:
              Left: 126/720 = 17.5%, Width: 468/720 = 65%
              Top: 340/1280 = 26.56%, Height: (1150-340)/1280 = 63.28% */}

          {/* --- LEFT DOOR LEAF --- */}
          <motion.div
            className="absolute"
            style={{
              left: "17.5%",
              top: "27.5%",
              width: "32.5%",
              height: "62.3%",
              transformOrigin: "left center",
              transformStyle: "preserve-3d",
              willChange: "transform",
            }}
            initial={false}
            animate={{
              rotateY: isOpen ? -105 : 0,
            }}
            transition={{
              duration: 1.15,
              ease: EASE_GATE,
            }}
          >
            {/* SVG of Left Door Leaf */}
            <svg
              viewBox="0 0 234 797"
              className="w-full h-full drop-shadow-2xl"
              preserveAspectRatio="none"
            >
              <defs>
                <clipPath id="leftDoorArchClip">
                  {/* Arched top sloping down to the left hinge */}
                  <path d="M 0,90 Q 120,40 234,22 L 234,797 L 0,797 Z" />
                </clipPath>
              </defs>

              <g clipPath="url(#leftDoorArchClip)">
                {/* Main Door Background (Honey Gold Wood) */}
                <rect width="234" height="797" fill="url(#smDoorWood)" />

                {/* Outer Framing Rim */}
                <rect
                  x="4"
                  y="4"
                  width="226"
                  height="789"
                  fill="none"
                  stroke="#573809"
                  strokeWidth="8"
                />
                <rect
                  x="12"
                  y="12"
                  width="210"
                  height="773"
                  fill="none"
                  stroke="#caa44b"
                  strokeWidth="4"
                />

                {/* Domed Golden Rivets along Left Edge */}
                {[50, 110, 170, 230, 290, 350, 410, 470, 530, 590, 650, 710, 770].map((ry) => (
                  <circle key={`lr-${ry}`} cx="10" cy={ry} r="3.5" fill="#fde047" stroke="#713f12" strokeWidth="1" />
                ))}

                {/* UPPER SECTION: VERTICAL BRONZE BARS & MARIGOLD STRANDS */}
                <g transform="translate(16, 40)">
                  {/* Grille Background */}
                  <rect x="0" y="0" width="202" height="230" fill="#feedb8" opacity="0.6" />

                  {/* 4 Vertical Bronze Grille Bars */}
                  {[30, 78, 126, 174].map((bx, bi) => (
                    <g key={`lbar-${bi}`}>
                      {/* Bronze Bar */}
                      <rect x={bx - 3} y="0" width="6" height="230" fill="url(#smBronzeBar)" />

                      {/* Vertical Hanging Marigold Garland on each bar */}
                      {[15, 38, 61, 84, 107, 130, 153, 176, 199, 220].map((fy, fi) => (
                        <circle
                          key={`lbf-${fi}`}
                          cx={bx}
                          cy={fy}
                          r={fi % 2 === 0 ? 8.5 : 7.5}
                          fill={fi % 2 === 0 ? "url(#smMarigoldOrange)" : "url(#smMarigoldYellow)"}
                        />
                      ))}
                    </g>
                  ))}
                </g>

                {/* HORIZONTAL DIVIDER RAIL (MID BEAM) */}
                <rect x="8" y="275" width="222" height="24" fill="url(#smBronzeBar)" />
                <rect x="8" y="278" width="222" height="4" fill="#fef08a" opacity="0.7" />
                {[20, 60, 100, 140, 180, 220].map((rx) => (
                  <circle key={`mr-${rx}`} cx={rx} cy="287" r="3.5" fill="#fde047" stroke="#573809" strokeWidth="1" />
                ))}

                {/* LOWER MAIN SECTION: HAND-PAINTED LOTUS FLOWER & BRASS KNOCKER */}
                <g transform="translate(18, 305)">
                  {/* Recessed Honey Gold Wood Panel */}
                  <rect
                    x="0"
                    y="0"
                    width="200"
                    height="380"
                    fill="url(#smDoorPanel)"
                    stroke="#ca8a04"
                    strokeWidth="3"
                    rx="4"
                  />
                  {/* Inner Fine Border */}
                  <rect x="6" y="6" width="188" height="368" fill="none" stroke="#ca8a04" strokeWidth="1.2" rx="2" />

                  {/* TRADITIONAL INDIAN LOTUS (KAMAL) MOTIF */}
                  <g transform="translate(100, 240)">
                    {/* Stem & Curved Green Leaves */}
                    <path d="M0,70 Q-15,40 0,20 Q15,40 0,70 Z" fill="url(#smMangoLeaf)" />
                    <path d="M-6,55 Q-45,35 -38,10 Q-20,25 0,35" fill="none" stroke="#15803d" strokeWidth="3.5" strokeLinecap="round" />
                    <path d="M6,55 Q45,35 38,10 Q20,25 0,35" fill="none" stroke="#15803d" strokeWidth="3.5" strokeLinecap="round" />
                    {/* Leaf flourishes */}
                    <path d="M-38,10 Q-55,0 -48,-15 Q-30,-5 -38,10 Z" fill="url(#smMangoLeaf)" />
                    <path d="M38,10 Q55,0 48,-15 Q30,-5 38,10 Z" fill="url(#smMangoLeaf)" />

                    {/* Blooming Lotus Petals */}
                    {/* Outer Petals */}
                    <path d="M0,15 C-45,5 -75,-25 -65,-55 C-40,-35 -15,-5 0,15 Z" fill="url(#smLotusPetal)" />
                    <path d="M0,15 C45,5 75,-25 65,-55 C40,-35 15,-5 0,15 Z" fill="url(#smLotusPetal)" />

                    {/* Middle Petals */}
                    <path d="M0,18 C-35,-10 -50,-50 -32,-75 C-18,-45 -5,-15 0,18 Z" fill="url(#smLotusPetal)" />
                    <path d="M0,18 C35,-10 50,-50 32,-75 C18,-45 5,-15 0,18 Z" fill="url(#smLotusPetal)" />

                    {/* Center Core Petal */}
                    <path d="M0,20 C-18,-20 -20,-75 0,-100 C20,-75 18,-20 0,20 Z" fill="url(#smLotusCore)" />
                    {/* Golden Highlights on Petal Edges */}
                    <path d="M0,-100 Q-15,-60 0,10 Q15,-60 0,-100" fill="none" stroke="#ffffff" strokeWidth="1.5" opacity="0.8" />
                  </g>

                  {/* Top Flourish above Lotus */}
                  <g transform="translate(100, 75)" opacity="0.85">
                    <path d="M0,0 Q-20,-18 0,-36 Q20,-18 0,0" fill="url(#smMangoLeaf)" />
                    <path d="M0,-36 Q-35,-50 -25,-70 Q-5,-45 0,-36 Z" fill="url(#smMangoLeaf)" />
                    <path d="M0,-36 Q35,-50 25,-70 Q5,-45 0,-36 Z" fill="url(#smMangoLeaf)" />
                  </g>
                </g>

                {/* HEAVY ANTIQUE BRASS KNOCKER (LEFT DOOR) */}
                <g transform="translate(180, 480)" filter="url(#smKnockerShadow)">
                  {/* Cast shadow */}
                  <circle cx="2" cy="18" r="28" fill="#1e1102" opacity="0.4" />
                  {/* Knocker Boss (Embossed Rosette) */}
                  <circle cx="0" cy="0" r="22" fill="url(#smBossBrass)" stroke="#583405" strokeWidth="2.5" />
                  <circle cx="0" cy="0" r="16" fill="url(#smBossBrass)" stroke="#ca8a04" strokeWidth="1.5" />
                  <circle cx="0" cy="0" r="7" fill="#ffffff" opacity="0.4" />

                  {/* Brass Hanging Ring Handle */}
                  <path
                    d="M -18,12 C -24,35 24,35 18,12 C 14,24 -14,24 -18,12 Z"
                    fill="url(#smBossBrass)"
                    stroke="#583405"
                    strokeWidth="2"
                  />
                  <ellipse cx="0" cy="28" rx="20" ry="18" fill="none" stroke="url(#smBossBrass)" strokeWidth="6" />
                </g>

                {/* BOTTOM RAIL */}
                <rect x="8" y="692" width="222" height="20" fill="url(#smBronzeBar)" />
                {[20, 60, 100, 140, 180, 220].map((rx) => (
                  <circle key={`br-${rx}`} cx={rx} cy="702" r="3" fill="#fde047" stroke="#573809" strokeWidth="1" />
                ))}

                {/* BOTTOM PANEL WITH FLORAL SCROLLWORK */}
                <g transform="translate(18, 718)">
                  <rect x="0" y="0" width="200" height="68" fill="url(#smDoorPanel)" stroke="#ca8a04" strokeWidth="2" />
                  {/* Symmetrical Scroll */}
                  <path
                    d="M15,34 C45,10 70,55 100,34 C130,55 155,10 185,34"
                    fill="none"
                    stroke="#ea580c"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <circle cx="100" cy="34" r="5" fill="#f59e0b" />
                  <circle cx="50" cy="34" r="4" fill="#15803d" />
                  <circle cx="150" cy="34" r="4" fill="#15803d" />
                </g>

                {/* Right Edge Golden Meeting Strip (Astragal) */}
                <rect x="230" y="20" width="4" height="777" fill="#fef08a" stroke="#ca8a04" strokeWidth="0.8" />
              </g>
            </svg>
          </motion.div>

          {/* --- RIGHT DOOR LEAF --- */}
          <motion.div
            className="absolute"
            style={{
              left: "50%",
              top: "27.5%",
              width: "32.5%",
              height: "62.3%",
              transformOrigin: "right center",
              transformStyle: "preserve-3d",
              willChange: "transform",
            }}
            initial={false}
            animate={{
              rotateY: isOpen ? 105 : 0,
            }}
            transition={{
              duration: 1.15,
              ease: EASE_GATE,
            }}
          >
            {/* SVG of Right Door Leaf (Symmetrical reflection of Left Leaf) */}
            <svg
              viewBox="0 0 234 797"
              className="w-full h-full drop-shadow-2xl"
              preserveAspectRatio="none"
            >
              <defs>
                <clipPath id="rightDoorArchClip">
                  {/* Arched top sloping down to the right hinge */}
                  <path d="M 0,22 Q 114,40 234,90 L 234,797 L 0,797 Z" />
                </clipPath>
              </defs>

              <g clipPath="url(#rightDoorArchClip)">
                {/* Main Door Background (Honey Gold Wood) */}
                <rect width="234" height="797" fill="url(#smDoorWood)" />

                {/* Outer Framing Rim */}
                <rect
                  x="4"
                  y="4"
                  width="226"
                  height="789"
                  fill="none"
                  stroke="#573809"
                  strokeWidth="8"
                />
                <rect
                  x="12"
                  y="12"
                  width="210"
                  height="773"
                  fill="none"
                  stroke="#caa44b"
                  strokeWidth="4"
                />

                {/* Domed Golden Rivets along Right Edge */}
                {[50, 110, 170, 230, 290, 350, 410, 470, 530, 590, 650, 710, 770].map((ry) => (
                  <circle key={`rr-${ry}`} cx="224" cy={ry} r="3.5" fill="#fde047" stroke="#713f12" strokeWidth="1" />
                ))}

                {/* UPPER SECTION: VERTICAL BRONZE BARS & MARIGOLD STRANDS */}
                <g transform="translate(16, 40)">
                  <rect x="0" y="0" width="202" height="230" fill="#feedb8" opacity="0.6" />

                  {[30, 78, 126, 174].map((bx, bi) => (
                    <g key={`rbar-${bi}`}>
                      <rect x={bx - 3} y="0" width="6" height="230" fill="url(#smBronzeBar)" />

                      {[15, 38, 61, 84, 107, 130, 153, 176, 199, 220].map((fy, fi) => (
                        <circle
                          key={`rbf-${fi}`}
                          cx={bx}
                          cy={fy}
                          r={fi % 2 === 0 ? 8.5 : 7.5}
                          fill={fi % 2 === 0 ? "url(#smMarigoldOrange)" : "url(#smMarigoldYellow)"}
                        />
                      ))}
                    </g>
                  ))}
                </g>

                {/* HORIZONTAL DIVIDER RAIL (MID BEAM) */}
                <rect x="4" y="275" width="222" height="24" fill="url(#smBronzeBar)" />
                <rect x="4" y="278" width="222" height="4" fill="#fef08a" opacity="0.7" />
                {[14, 54, 94, 134, 174, 214].map((rx) => (
                  <circle key={`rmr-${rx}`} cx={rx} cy="287" r="3.5" fill="#fde047" stroke="#573809" strokeWidth="1" />
                ))}

                {/* LOWER MAIN SECTION: HAND-PAINTED LOTUS FLOWER & BRASS KNOCKER */}
                <g transform="translate(16, 305)">
                  <rect
                    x="0"
                    y="0"
                    width="200"
                    height="380"
                    fill="url(#smDoorPanel)"
                    stroke="#ca8a04"
                    strokeWidth="3"
                    rx="4"
                  />
                  <rect x="6" y="6" width="188" height="368" fill="none" stroke="#ca8a04" strokeWidth="1.2" rx="2" />

                  {/* TRADITIONAL INDIAN LOTUS MOTIF */}
                  <g transform="translate(100, 240)">
                    <path d="M0,70 Q15,40 0,20 Q-15,40 0,70 Z" fill="url(#smMangoLeaf)" />
                    <path d="M6,55 Q45,35 38,10 Q20,25 0,35" fill="none" stroke="#15803d" strokeWidth="3.5" strokeLinecap="round" />
                    <path d="M-6,55 Q-45,35 -38,10 Q-20,25 0,35" fill="none" stroke="#15803d" strokeWidth="3.5" strokeLinecap="round" />
                    <path d="M38,10 Q55,0 48,-15 Q30,-5 38,10 Z" fill="url(#smMangoLeaf)" />
                    <path d="M-38,10 Q-55,0 -48,-15 Q-30,-5 -38,10 Z" fill="url(#smMangoLeaf)" />

                    <path d="M0,15 C45,5 75,-25 65,-55 C40,-35 15,-5 0,15 Z" fill="url(#smLotusPetal)" />
                    <path d="M0,15 C-45,5 -75,-25 -65,-55 C-40,-35 -15,-5 0,15 Z" fill="url(#smLotusPetal)" />

                    <path d="M0,18 C35,-10 50,-50 32,-75 C18,-45 5,-15 0,18 Z" fill="url(#smLotusPetal)" />
                    <path d="M0,18 C-35,-10 -50,-50 -32,-75 C-18,-45 -5,-15 0,18 Z" fill="url(#smLotusPetal)" />

                    <path d="M0,20 C18,-20 20,-75 0,-100 C-20,-75 -18,-20 0,20 Z" fill="url(#smLotusCore)" />
                    <path d="M0,-100 Q15,-60 0,10 Q-15,-60 0,-100" fill="none" stroke="#ffffff" strokeWidth="1.5" opacity="0.8" />
                  </g>

                  {/* Top Flourish above Lotus */}
                  <g transform="translate(100, 75)" opacity="0.85">
                    <path d="M0,0 Q20,-18 0,-36 Q-20,-18 0,0" fill="url(#smMangoLeaf)" />
                    <path d="M0,-36 Q35,-50 25,-70 Q5,-45 0,-36 Z" fill="url(#smMangoLeaf)" />
                    <path d="M0,-36 Q-35,-50 -25,-70 Q-5,-45 0,-36 Z" fill="url(#smMangoLeaf)" />
                  </g>
                </g>

                {/* HEAVY ANTIQUE BRASS KNOCKER (RIGHT DOOR) */}
                <g transform="translate(54, 480)" filter="url(#smKnockerShadow)">
                  <circle cx="-2" cy="18" r="28" fill="#1e1102" opacity="0.4" />
                  <circle cx="0" cy="0" r="22" fill="url(#smBossBrass)" stroke="#583405" strokeWidth="2.5" />
                  <circle cx="0" cy="0" r="16" fill="url(#smBossBrass)" stroke="#ca8a04" strokeWidth="1.5" />
                  <circle cx="0" cy="0" r="7" fill="#ffffff" opacity="0.4" />

                  <path
                    d="M -18,12 C -24,35 24,35 18,12 C 14,24 -14,24 -18,12 Z"
                    fill="url(#smBossBrass)"
                    stroke="#583405"
                    strokeWidth="2"
                  />
                  <ellipse cx="0" cy="28" rx="20" ry="18" fill="none" stroke="url(#smBossBrass)" strokeWidth="6" />
                </g>

                {/* BOTTOM RAIL */}
                <rect x="4" y="692" width="222" height="20" fill="url(#smBronzeBar)" />
                {[14, 54, 94, 134, 174, 214].map((rx) => (
                  <circle key={`rb-r-${rx}`} cx={rx} cy="702" r="3" fill="#fde047" stroke="#573809" strokeWidth="1" />
                ))}

                {/* BOTTOM PANEL WITH FLORAL SCROLLWORK */}
                <g transform="translate(16, 718)">
                  <rect x="0" y="0" width="200" height="68" fill="url(#smDoorPanel)" stroke="#ca8a04" strokeWidth="2" />
                  <path
                    d="M15,34 C45,10 70,55 100,34 C130,55 155,10 185,34"
                    fill="none"
                    stroke="#ea580c"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <circle cx="100" cy="34" r="5" fill="#f59e0b" />
                  <circle cx="50" cy="34" r="4" fill="#15803d" />
                  <circle cx="150" cy="34" r="4" fill="#15803d" />
                </g>

                {/* Left Edge Golden Meeting Strip */}
                <rect x="0" y="20" width="4" height="777" fill="#fef08a" stroke="#ca8a04" strokeWidth="0.8" />
              </g>
            </svg>
          </motion.div>
        </div>

        {/* ELEGANT INVITATION PROMPT OVER THE GATE */}
        {!isOpen && active && (
          <motion.div
            className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none z-30"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <div className="bg-[#78350f]/85 backdrop-blur-md text-[#fef08a] px-5 py-2.5 rounded-full shadow-xl border border-[#fbbf24]/50 flex items-center gap-2.5 animate-pulse">
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#fbbf24]" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M5 12l7 7 7-7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-xs uppercase tracking-widest font-semibold">
                Tap or Scroll to Enter
              </span>
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#fbbf24]" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M5 12l7 7 7-7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
