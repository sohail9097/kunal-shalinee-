import React, { useMemo } from "react";

interface FlowerSvgProps {
  className?: string;
}

// 1. Yellow Marigold (Genda Phool)
export const YellowMarigoldFlower: React.FC<FlowerSvgProps> = ({ className = "" }) => {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden={true}>
      <defs>
        <radialGradient id="smYMarigold" cx="45%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="30%" stopColor="#fef08a" />
          <stop offset="65%" stopColor="#facc15" />
          <stop offset="90%" stopColor="#eab308" />
          <stop offset="100%" stopColor="#ca8a04" />
        </radialGradient>
        <radialGradient id="smYCenter" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </radialGradient>
      </defs>
      {/* Outer ruffled petals */}
      {[...Array(10)].map((_, i) => (
        <ellipse
          key={`om-${i}`}
          cx="50"
          cy="26"
          rx="12"
          ry="22"
          fill="url(#smYMarigold)"
          transform={`rotate(${i * 36} 50 50)`}
          opacity="0.95"
        />
      ))}
      {/* Middle ruffled petals */}
      {[...Array(8)].map((_, i) => (
        <ellipse
          key={`mm-${i}`}
          cx="50"
          cy="32"
          rx="10"
          ry="17"
          fill="url(#smYMarigold)"
          transform={`rotate(${i * 45 + 22.5} 50 50)`}
        />
      ))}
      {/* Center cluster */}
      <circle cx="50" cy="50" r="11" fill="url(#smYCenter)" />
      <circle cx="50" cy="50" r="6" fill="#fde047" opacity="0.8" />
    </svg>
  );
};

// 2. White Jasmine (Mogra Flower)
export const WhiteJasmineFlower: React.FC<FlowerSvgProps> = ({ className = "" }) => {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden={true}>
      <defs>
        <radialGradient id="smWJasmine" cx="45%" cy="40%" r="65%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="70%" stopColor="#f8fafc" />
          <stop offset="95%" stopColor="#e2e8f0" />
          <stop offset="100%" stopColor="#cbd5e1" />
        </radialGradient>
      </defs>
      {/* 5 rounded white petals */}
      {[0, 72, 144, 216, 288].map((rot) => (
        <path
          key={rot}
          d="M 50,50 C 42,32 36,15 50,6 C 64,15 58,32 50,50 Z"
          fill="url(#smWJasmine)"
          transform={`rotate(${rot} 50 50)`}
          opacity="0.98"
        />
      ))}
      {/* Golden pistil center */}
      <circle cx="50" cy="50" r="6.5" fill="#facc15" />
      <circle cx="50" cy="50" r="3.5" fill="#eab308" />
      <circle cx="49" cy="48" r="1.5" fill="#ffffff" />
    </svg>
  );
};

// 3. Single Yellow Petal
export const YellowPetal: React.FC<FlowerSvgProps> = ({ className = "" }) => {
  return (
    <svg viewBox="0 0 40 50" className={className} aria-hidden={true}>
      <defs>
        <linearGradient id="smYPetal" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="50%" stopColor="#facc15" />
          <stop offset="100%" stopColor="#eab308" />
        </linearGradient>
      </defs>
      <path
        d="M20,2 C32,10 38,26 34,38 C30,48 18,48 8,42 C0,34 6,14 20,2 Z"
        fill="url(#smYPetal)"
        opacity="0.92"
      />
    </svg>
  );
};

// 4. Single White Petal
export const WhitePetal: React.FC<FlowerSvgProps> = ({ className = "" }) => {
  return (
    <svg viewBox="0 0 40 50" className={className} aria-hidden={true}>
      <defs>
        <linearGradient id="smWPetal" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="60%" stopColor="#f8fafc" />
          <stop offset="100%" stopColor="#e2e8f0" />
        </linearGradient>
      </defs>
      <path
        d="M20,2 C31,10 37,25 33,37 C29,47 18,47 9,41 C1,33 7,14 20,2 Z"
        fill="url(#smWPetal)"
        opacity="0.9"
      />
    </svg>
  );
};

interface FlowerPetalsProps {
  count?: number;
}

export const FlowerPetals: React.FC<FlowerPetalsProps> = ({ count = 16 }) => {
  const petals = useMemo(() => {
    const pseudoRandom = (seed: number) => {
      const s = 43758.5453 * Math.sin(seed);
      return s - Math.floor(s);
    };

    const types: ("yellow-marigold" | "white-jasmine" | "yellow-petal" | "white-petal")[] = [
      "yellow-marigold",
      "white-jasmine",
      "yellow-petal",
      "white-petal",
    ];

    const total = count * 2;
    return Array.from({ length: total }, (_, i) => {
      const r1 = pseudoRandom(19.284 * i + 1.2);
      const r2 = pseudoRandom(51.839 * i + 3.7);
      const r3 = pseudoRandom(87.412 * i + 7.1);
      const type = types[i % 4];

      const duration = 5.5 + 4.5 * r2;
      const isFullFlower = type === "yellow-marigold" || type === "white-jasmine";
      const sizePx = isFullFlower ? 18 + Math.round(14 * r1) : 13 + Math.round(10 * r1);

      // Horizontal spread across the full width
      const leftPercent = ((i / total) * 94 + r1 * 6 + 2).toFixed(1);
      const driftPx = Math.round((r3 - 0.5) * 60);
      const rotDeg = Math.round((r1 - 0.5) * 540);
      const midRotDeg = Math.round(rotDeg * 0.5);

      return {
        type,
        left: `${leftPercent}%`,
        size: `${sizePx}px`,
        dur: `${duration.toFixed(2)}s`,
        delay: `${(-r3 * duration).toFixed(2)}s`,
        drift: `${driftPx}px`,
        rot: `${rotDeg}deg`,
        midRot: `${midRotDeg}deg`,
      };
    });
  }, [count]);

  return (
    <div className="sm-flowers" aria-hidden={true}>
      {petals.map((item, idx) => (
        <span
          key={idx}
          className="sm-flower"
          style={
            {
              left: item.left,
              width: item.size,
              height: item.size,
              animationDuration: item.dur,
              animationDelay: item.delay,
              "--sm-drift": item.drift,
              "--sm-rot": item.rot,
              "--sm-mid-rot": item.midRot,
            } as React.CSSProperties
          }
        >
          {item.type === "yellow-marigold" && (
            <YellowMarigoldFlower className="block h-full w-full" />
          )}
          {item.type === "white-jasmine" && (
            <WhiteJasmineFlower className="block h-full w-full" />
          )}
          {item.type === "yellow-petal" && (
            <YellowPetal className="block h-full w-full" />
          )}
          {item.type === "white-petal" && (
            <WhitePetal className="block h-full w-full" />
          )}
        </span>
      ))}
    </div>
  );
};
