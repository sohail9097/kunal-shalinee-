import React, { useMemo } from "react";

interface MehndiGardenEffectsProps {
  active?: boolean;
}

// Lightweight Marigold Bloom (Pure CSS/SVG without expensive drop-shadow filters)
const MarigoldBloom: React.FC<{
  size?: number;
  color?: "orange" | "yellow" | "gold";
  rotation?: number;
}> = ({ size = 24, color = "orange", rotation = 0 }) => {
  const colors = {
    orange: { inner: "#fed7aa", outer: "#ea580c", center: "#9a3412" },
    yellow: { inner: "#fef08a", outer: "#eab308", center: "#ca8a04" },
    gold: { inner: "#fef9c3", outer: "#d97706", center: "#78350f" },
  }[color];

  return (
    <svg
      width={size}
      height={size}
      viewBox="-20 -20 40 40"
      style={{
        transform: `rotate(${rotation}deg)`,
        display: "block",
      }}
      aria-hidden={true}
    >
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
        <ellipse
          key={deg}
          cx="0"
          cy="-11"
          rx="5"
          ry="8"
          fill={colors.outer}
          transform={`rotate(${deg})`}
          opacity="0.92"
        />
      ))}
      {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((deg) => (
        <circle
          key={`in-${deg}`}
          cx="0"
          cy="-7"
          r="4"
          fill={colors.inner}
          transform={`rotate(${deg})`}
        />
      ))}
      <circle cx="0" cy="0" r="4.5" fill={colors.center} />
    </svg>
  );
};

// Lightweight Golden Bell
const GoldenBell: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg
    width={size}
    height={size * 1.3}
    viewBox="0 0 20 26"
    style={{ display: "block" }}
    aria-hidden={true}
  >
    <path
      d="M10 4 C6 5 4 10 3 17 C2 21 0 22 0 23 H20 C20 22 18 21 17 17 C16 10 14 5 10 4 Z"
      fill="#eab308"
    />
    <ellipse cx="10" cy="23" rx="10" ry="2" fill="#ca8a04" />
    <circle cx="10" cy="25" r="2" fill="#fef08a" />
  </svg>
);

// Hanging Garland Strand
const HangingGarlandStrand: React.FC<{
  left: string;
  flowerCount?: number;
  swayDuration?: string;
  swayDelay?: string;
}> = ({ left, flowerCount = 4, swayDuration = "3.8s", swayDelay = "0s" }) => {
  const flowerItems = useMemo(() => {
    return Array.from({ length: flowerCount }, (_, i) => ({
      color: i % 2 === 0 ? ("orange" as const) : ("yellow" as const),
      rot: (i * 53) % 360,
      size: 20 + (i % 2) * 2,
    }));
  }, [flowerCount]);

  return (
    <div
      style={{
        position: "absolute",
        top: "-6px",
        left,
        transformOrigin: "top center",
        animation: `smFlowerSway ${swayDuration} ease-in-out infinite alternate`,
        animationDelay: swayDelay,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        zIndex: 5,
        pointerEvents: "none",
        willChange: "transform",
      }}
    >
      <div
        style={{
          width: "2px",
          height: "12px",
          backgroundColor: "#ca8a04",
          opacity: 0.8,
        }}
      />
      {flowerItems.map((flower, idx) => (
        <div key={idx} style={{ marginTop: "-5px" }}>
          <MarigoldBloom
            size={flower.size}
            color={flower.color}
            rotation={flower.rot}
          />
        </div>
      ))}
      <div style={{ marginTop: "-2px" }}>
        <GoldenBell size={14} />
      </div>
    </div>
  );
};

// High-Performance Hardware-Accelerated Lantern Glow (Zero CSS Blur / Zero Screen Blend)
const LanternGlow: React.FC<{
  left: string;
  top: string;
  size?: number;
  duration?: string;
  delay?: string;
}> = ({ left, top, size = 52, duration = "2.2s", delay = "0s" }) => {
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
        willChange: "opacity, transform",
      }}
    >
      {/* Smooth soft radial glow without costly blur filter */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,250,210,0.92) 0%, rgba(254,215,64,0.55) 32%, rgba(245,158,11,0.2) 60%, rgba(245,158,11,0) 75%)",
          animation: `smLanternFlicker ${duration} ease-in-out infinite alternate`,
          animationDelay: delay,
        }}
      />
      {/* Radiant bright center core */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: `${Math.round(size * 0.35)}px`,
          height: `${Math.round(size * 0.35)}px`,
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, #ffffff 0%, #fef08a 60%, rgba(234,179,8,0) 100%)",
          boxShadow: "0 0 10px rgba(254,240,138,0.9)",
          animation: `smLanternCorePulse ${duration} ease-in-out infinite alternate`,
          animationDelay: delay,
        }}
      />
    </div>
  );
};

// Main Compound Effects Component for Mehndi Slide
export const MehndiGardenEffects: React.FC<MehndiGardenEffectsProps> = ({
  active = true,
}) => {
  // If not active, do not mount to completely save mobile GPU memory!
  if (!active) return null;

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
          0% { transform: rotate(-2.2deg); }
          100% { transform: rotate(2.2deg); }
        }

        @keyframes smLanternFlicker {
          0% { opacity: 0.75; transform: scale(0.96); }
          50% { opacity: 1.0; transform: scale(1.06); }
          100% { opacity: 0.82; transform: scale(0.98); }
        }

        @keyframes smLanternCorePulse {
          0% { opacity: 0.85; transform: translate(-50%, -50%) scale(0.92); }
          50% { opacity: 1.0; transform: translate(-50%, -50%) scale(1.1); }
          100% { opacity: 0.82; transform: translate(-50%, -50%) scale(0.95); }
        }
      `}</style>

      {/* Selected Key Glowing Lanterns (Clean & lightweight) */}
      <LanternGlow left="21.5%" top="48.5%" size={54} duration="2.0s" delay="0s" />
      <LanternGlow left="76.8%" top="49.8%" size={64} duration="2.4s" delay="0.5s" />
      <LanternGlow left="14.2%" top="66%" size={46} duration="1.8s" delay="1s" />
      <LanternGlow left="90%" top="65%" size={48} duration="2.2s" delay="0.3s" />
      <LanternGlow left="49.5%" top="6.5%" size={36} duration="2.5s" delay="0.2s" />

      {/* Gentle Hanging Marigold Garlands on edges */}
      <HangingGarlandStrand left="6%" flowerCount={5} swayDuration="3.4s" swayDelay="0s" />
      <HangingGarlandStrand left="93%" flowerCount={5} swayDuration="3.6s" swayDelay="0.5s" />
    </div>
  );
};
