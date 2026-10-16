import React, { useMemo } from "react";

// Individual Realistic Marigold SVG Blossom
const MarigoldBloom: React.FC<{
  size?: number;
  color?: "orange" | "yellow" | "gold";
  rotation?: number;
}> = ({ size = 26, color = "orange", rotation = 0 }) => {
  const gradientId = useMemo(
    () => `mgGrad_${color}_${Math.random().toString(36).substring(2, 7)}`,
    [color]
  );

  const colors = {
    orange: { inner: "#ffedd5", mid: "#f59e0b", outer: "#d97706", center: "#b45309" },
    yellow: { inner: "#fffbeb", mid: "#fde047", outer: "#eab308", center: "#ca8a04" },
    gold: { inner: "#fef9c3", mid: "#fbbf24", outer: "#d97706", center: "#92400e" },
  }[color];

  return (
    <svg
      width={size}
      height={size}
      viewBox="-25 -25 50 50"
      style={{
        transform: `rotate(${rotation}deg)`,
        filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.35))",
        display: "block",
      }}
      aria-hidden={true}
    >
      <defs>
        <radialGradient id={gradientId} cx="45%" cy="40%" r="60%">
          <stop offset="0%" stopColor={colors.inner} />
          <stop offset="50%" stopColor={colors.mid} />
          <stop offset="90%" stopColor={colors.outer} />
          <stop offset="100%" stopColor={colors.center} />
        </radialGradient>
      </defs>
      {/* 3 Rings of Petals for fluffy realistic marigold (Genda Phool) */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
        <ellipse
          key={`outer-${deg}`}
          cx="0"
          cy="-16"
          rx="6"
          ry="9"
          fill={`url(#${gradientId})`}
          transform={`rotate(${deg})`}
        />
      ))}
      {[15, 60, 105, 150, 195, 240, 285, 330].map((deg) => (
        <ellipse
          key={`mid-${deg}`}
          cx="0"
          cy="-11"
          rx="5"
          ry="7"
          fill={`url(#${gradientId})`}
          transform={`rotate(${deg})`}
        />
      ))}
      <circle cx="0" cy="0" r="5.5" fill={colors.center} />
      <circle cx="0" cy="0" r="2.8" fill="#78350f" />
    </svg>
  );
};

// Golden Bell / Ghungroo at bottom of garland
const GoldenBell: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <svg
    width={size}
    height={size * 1.3}
    viewBox="0 0 20 26"
    style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.45))", display: "block" }}
    aria-hidden={true}
  >
    <defs>
      <linearGradient id="bellGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fffbeb" />
        <stop offset="35%" stopColor="#fde047" />
        <stop offset="70%" stopColor="#d97706" />
        <stop offset="100%" stopColor="#78350f" />
      </linearGradient>
    </defs>
    {/* Bell cap */}
    <ellipse cx="10" cy="4" rx="3" ry="1.5" fill="#fde047" />
    {/* Body */}
    <path
      d="M10 4 C6 5 4 10 3 17 C2 21 0 22 0 23 H20 C20 22 18 21 17 17 C16 10 14 5 10 4 Z"
      fill="url(#bellGoldGrad)"
    />
    {/* Rim */}
    <ellipse cx="10" cy="23" rx="10" ry="2" fill="#d97706" />
    {/* Clapper bead */}
    <circle cx="10" cy="25" r="2" fill="#fef08a" />
  </svg>
);

// Hanging Garland Strand that sways in breeze
interface HangingGarlandProps {
  left: string;
  flowerCount?: number;
  swayDuration?: string;
  swayDelay?: string;
  maxAngle?: number;
  lengthOffset?: number;
}

const HangingGarlandStrand: React.FC<HangingGarlandProps> = ({
  left,
  flowerCount = 7,
  swayDuration = "3.8s",
  swayDelay = "0s",
  maxAngle = 2.4,
}) => {
  const flowerItems = useMemo(() => {
    return Array.from({ length: flowerCount }, (_, i) => ({
      color: i % 2 === 0 ? ("orange" as const) : ("yellow" as const),
      rot: (i * 47) % 360,
      size: 22 + (i % 3) * 2,
    }));
  }, [flowerCount]);

  return (
    <div
      style={{
        position: "absolute",
        top: "-10px",
        left,
        transformOrigin: "top center",
        animation: `smFlowerSway ${swayDuration} ease-in-out infinite alternate`,
        animationDelay: swayDelay,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        zIndex: 5,
        pointerEvents: "none",
        ["--max-angle" as string]: `${maxAngle}deg`,
        ["--min-angle" as string]: `-${maxAngle}deg`,
      }}
    >
      {/* Hanging Golden Bead String */}
      <div
        style={{
          width: "2px",
          height: "16px",
          background: "linear-gradient(to bottom, #ca8a04, #fde047, #ca8a04)",
          opacity: 0.85,
        }}
      />
      {/* Strung Flowers */}
      {flowerItems.map((flower, idx) => (
        <div key={idx} style={{ marginTop: "-6px" }}>
          <MarigoldBloom
            size={flower.size}
            color={flower.color}
            rotation={flower.rot}
          />
        </div>
      ))}
      {/* Bottom Bell */}
      <div style={{ marginTop: "-2px" }}>
        <GoldenBell size={16} />
      </div>
    </div>
  );
};

// Blinking & Flickering Lantern Light
interface LanternGlowProps {
  id: string;
  left: string;
  top: string;
  size?: number;
  duration?: string;
  delay?: string;
  intensity?: number;
  isCandle?: boolean;
}

const LanternGlow: React.FC<LanternGlowProps> = ({
  left,
  top,
  size = 54,
  duration = "2.1s",
  delay = "0s",
  intensity = 1,
  isCandle = false,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        left,
        top,
        width: `${size}px`,
        height: `${size}px`,
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
        zIndex: 3,
      }}
    >
      {/* Outer Warm Radial Halo */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          background: isCandle
            ? "radial-gradient(circle, rgba(255,210,90,0.9) 0%, rgba(255,140,20,0.5) 45%, rgba(255,100,0,0) 75%)"
            : "radial-gradient(circle, rgba(255,235,140,0.95) 0%, rgba(255,180,45,0.65) 38%, rgba(255,120,20,0.25) 60%, rgba(255,100,0,0) 80%)",
          mixBlendMode: "screen",
          filter: "blur(4px)",
          animation: `smLanternFlicker ${duration} ease-in-out infinite alternate`,
          animationDelay: delay,
          opacity: 0.9 * intensity,
        }}
      />

      {/* Radiant Mid Core */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: `${Math.round(size * 0.42)}px`,
          height: `${Math.round(size * 0.42)}px`,
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, #ffffff 0%, #fff7be 40%, #fde047 75%, rgba(234,179,8,0) 100%)",
          mixBlendMode: "screen",
          filter: "blur(1px)",
          animation: `smLanternCorePulse ${duration} ease-in-out infinite alternate`,
          animationDelay: delay,
          boxShadow: "0 0 14px rgba(254, 240, 138, 0.95), 0 0 28px rgba(245, 158, 11, 0.7)",
        }}
      />

      {/* Tiny Sparkle Starburst */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: `${Math.round(size * 0.65)}px`,
          height: "2px",
          background: "linear-gradient(90deg, transparent, #ffffff, transparent)",
          transform: "translate(-50%, -50%)",
          mixBlendMode: "screen",
          animation: `smSparkleGlint ${parseFloat(duration) * 1.5}s ease-in-out infinite`,
          animationDelay: delay,
          opacity: 0.75,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          height: `${Math.round(size * 0.65)}px`,
          width: "2px",
          background: "linear-gradient(180deg, transparent, #ffffff, transparent)",
          transform: "translate(-50%, -50%)",
          mixBlendMode: "screen",
          animation: `smSparkleGlint ${parseFloat(duration) * 1.5}s ease-in-out infinite`,
          animationDelay: delay,
          opacity: 0.75,
        }}
      />
    </div>
  );
};

// Floating Firefly / Golden Light Sparkle
const FireflyMote: React.FC<{
  left: string;
  top: string;
  duration?: string;
  delay?: string;
  driftX?: string;
  driftY?: string;
}> = ({ left, top, duration = "5s", delay = "0s", driftX = "20px", driftY = "-60px" }) => (
  <div
    style={{
      position: "absolute",
      left,
      top,
      width: "5px",
      height: "5px",
      borderRadius: "50%",
      background: "#fffbeb",
      boxShadow: "0 0 8px #fef08a, 0 0 14px #f59e0b",
      pointerEvents: "none",
      zIndex: 4,
      animation: `smFireflyFloat ${duration} ease-in-out infinite`,
      animationDelay: delay,
      ["--drift-x" as string]: driftX,
      ["--drift-y" as string]: driftY,
    }}
  />
);

// Main Compound Effects Component for Mehndi Slide
export const MehndiGardenEffects: React.FC = () => {
  return (
    <div
      className="sm-mehndi-effects"
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        overflow: "hidden",
        zIndex: 4,
      }}
      aria-hidden={true}
    >
      <style>{`
        @keyframes smFlowerSway {
          0% {
            transform: rotate(var(--min-angle, -2.5deg));
          }
          100% {
            transform: rotate(var(--max-angle, 2.5deg));
          }
        }

        @keyframes smLanternFlicker {
          0% {
            opacity: 0.82;
            transform: scale(0.96);
          }
          20% {
            opacity: 0.58;
            transform: scale(0.91);
          }
          40% {
            opacity: 1.0;
            transform: scale(1.08);
          }
          65% {
            opacity: 0.72;
            transform: scale(0.97);
          }
          85% {
            opacity: 0.95;
            transform: scale(1.04);
          }
          100% {
            opacity: 0.85;
            transform: scale(0.98);
          }
        }

        @keyframes smLanternCorePulse {
          0% {
            opacity: 0.88;
            transform: translate(-50%, -50%) scale(0.95);
          }
          50% {
            opacity: 1.0;
            transform: translate(-50%, -50%) scale(1.12);
          }
          100% {
            opacity: 0.82;
            transform: translate(-50%, -50%) scale(0.92);
          }
        }

        @keyframes smSparkleGlint {
          0%, 100% {
            opacity: 0.2;
            transform: translate(-50%, -50%) rotate(0deg) scale(0.6);
          }
          50% {
            opacity: 0.95;
            transform: translate(-50%, -50%) rotate(45deg) scale(1.15);
          }
        }

        @keyframes smFireflyFloat {
          0% {
            opacity: 0;
            transform: translate(0, 0) scale(0.4);
          }
          25% {
            opacity: 0.9;
          }
          50% {
            opacity: 0.4;
            transform: translate(var(--drift-x, 18px), calc(var(--drift-y, -50px) * 0.5)) scale(1.2);
          }
          75% {
            opacity: 1.0;
          }
          100% {
            opacity: 0;
            transform: translate(calc(var(--drift-x, 18px) * 1.6), var(--drift-y, -60px)) scale(0.5);
          }
        }

        @keyframes smBreezeWiggle {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          33% {
            transform: translateY(2px) rotate(1.2deg);
          }
          66% {
            transform: translateY(-1.5px) rotate(-1.2deg);
          }
        }
      `}</style>

      {/* --- 1. BLINKING & GLOWING LANTERNS --- */}
      {/* Hanging Lantern (Mid-Left) */}
      <LanternGlow
        id="lantern-left-1"
        left="21.5%"
        top="48.5%"
        size={58}
        duration="1.9s"
        delay="0s"
      />

      {/* Hanging Lantern (Main Center-Right) */}
      <LanternGlow
        id="lantern-right-main"
        left="76.8%"
        top="49.8%"
        size={72}
        duration="2.4s"
        delay="0.6s"
      />

      {/* Hanging Lantern (Lower-Left) */}
      <LanternGlow
        id="lantern-left-low"
        left="14.2%"
        top="66%"
        size={50}
        duration="1.7s"
        delay="1.1s"
      />

      {/* Hanging Lantern (Far-Right) */}
      <LanternGlow
        id="lantern-right-low"
        left="90%"
        top="65%"
        size={52}
        duration="2.2s"
        delay="0.3s"
      />

      {/* Candle in Left Arch Window */}
      <LanternGlow
        id="candle-window"
        left="5.4%"
        top="83.8%"
        size={32}
        duration="1.35s"
        delay="0.2s"
        isCandle={true}
      />

      {/* Top Hanging Lamps & Chandelier Pendants */}
      <LanternGlow
        id="top-lamp-1"
        left="12%"
        top="7.2%"
        size={28}
        duration="2.1s"
        delay="0.1s"
      />
      <LanternGlow
        id="top-lamp-2"
        left="28.2%"
        top="8.2%"
        size={30}
        duration="1.8s"
        delay="0.8s"
      />
      <LanternGlow
        id="top-lamp-3"
        left="49.5%"
        top="6.5%"
        size={36}
        duration="2.5s"
        delay="0.4s"
      />
      <LanternGlow
        id="top-lamp-4"
        left="68.5%"
        top="8.2%"
        size={30}
        duration="2.0s"
        delay="1.2s"
      />
      <LanternGlow
        id="top-lamp-5"
        left="86.5%"
        top="7.2%"
        size={28}
        duration="2.2s"
        delay="0.5s"
      />

      {/* Mid hanging pendant lights */}
      <LanternGlow
        id="mid-lamp-left"
        left="38%"
        top="14%"
        size={26}
        duration="1.65s"
        delay="0.9s"
      />
      <LanternGlow
        id="mid-lamp-right"
        left="59.5%"
        top="14%"
        size={26}
        duration="2.15s"
        delay="1.4s"
      />
      <LanternGlow
        id="center-pendant"
        left="50%"
        top="31%"
        size={30}
        duration="2.6s"
        delay="0.2s"
      />

      {/* --- 2. FLOATING FIREFLIES / GOLDEN LIGHT MOTES --- */}
      <FireflyMote left="18%" top="42%" duration="4.5s" delay="0s" driftX="25px" driftY="-70px" />
      <FireflyMote left="73%" top="45%" duration="5.2s" delay="1.2s" driftX="-30px" driftY="-85px" />
      <FireflyMote left="32%" top="60%" duration="4.8s" delay="2.1s" driftX="18px" driftY="-60px" />
      <FireflyMote left="84%" top="58%" duration="5.5s" delay="0.7s" driftX="-22px" driftY="-75px" />
      <FireflyMote left="10%" top="75%" duration="4.2s" delay="1.8s" driftX="15px" driftY="-55px" />
      <FireflyMote left="52%" top="70%" duration="6.0s" delay="2.7s" driftX="-20px" driftY="-80px" />

      {/* --- 3. SWAYING MARIGOLD FLOWERS & GARLANDS (Genda Phool Ladi) --- */}
      {/* Left Hanging Flower Strand */}
      <HangingGarlandStrand
        left="5%"
        flowerCount={6}
        swayDuration="3.4s"
        swayDelay="0s"
        maxAngle={2.6}
      />

      {/* Mid-Left Hanging Flower Strand */}
      <HangingGarlandStrand
        left="19%"
        flowerCount={4}
        swayDuration="4.2s"
        swayDelay="0.8s"
        maxAngle={2.0}
      />

      {/* Center Hanging Decorative Flower Pendant */}
      <HangingGarlandStrand
        left="49.5%"
        flowerCount={3}
        swayDuration="3.1s"
        swayDelay="0.3s"
        maxAngle={1.8}
      />

      {/* Mid-Right Hanging Flower Strand */}
      <HangingGarlandStrand
        left="80%"
        flowerCount={4}
        swayDuration="3.9s"
        swayDelay="1.2s"
        maxAngle={2.2}
      />

      {/* Far-Right Hanging Flower Strand */}
      <HangingGarlandStrand
        left="94%"
        flowerCount={6}
        swayDuration="3.6s"
        swayDelay="0.5s"
        maxAngle={2.8}
      />

      {/* Subtle Corner Floral Clusters swaying in breeze */}
      <div
        style={{
          position: "absolute",
          top: "14%",
          left: "2%",
          animation: "smBreezeWiggle 4s ease-in-out infinite",
        }}
      >
        <MarigoldBloom size={28} color="orange" rotation={15} />
      </div>
      <div
        style={{
          position: "absolute",
          top: "18%",
          left: "6%",
          animation: "smBreezeWiggle 4.6s ease-in-out infinite",
          animationDelay: "1s",
        }}
      >
        <MarigoldBloom size={24} color="yellow" rotation={42} />
      </div>

      <div
        style={{
          position: "absolute",
          top: "14%",
          right: "2%",
          animation: "smBreezeWiggle 4.2s ease-in-out infinite",
          animationDelay: "0.5s",
        }}
      >
        <MarigoldBloom size={28} color="gold" rotation={-25} />
      </div>
      <div
        style={{
          position: "absolute",
          top: "18%",
          right: "6%",
          animation: "smBreezeWiggle 3.8s ease-in-out infinite",
          animationDelay: "1.4s",
        }}
      >
        <MarigoldBloom size={24} color="orange" rotation={-50} />
      </div>
    </div>
  );
};
