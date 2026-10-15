import React, { useMemo } from "react";

interface MarigoldProps {
  className?: string;
}

export const MarigoldFlower: React.FC<MarigoldProps> = ({ className = "" }) => {
  return (
    <svg viewBox="-50 -50 100 100" className={className} aria-hidden={true}>
      <defs>
        <radialGradient id="klPetal" cx="50%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#fff6d8" />
          <stop offset="55%" stopColor="#ffdf7e" />
          <stop offset="100%" stopColor="#f4c033" />
        </radialGradient>
      </defs>
      {[0, 1, 2, 3, 4].map((i) => (
        <ellipse
          key={i}
          cx="0"
          cy="-24"
          rx="13"
          ry="24"
          fill="url(#klPetal)"
          transform={`rotate(${72 * i})`}
        />
      ))}
      <circle cx="0" cy="0" r="9" fill="#f0a92e" />
    </svg>
  );
};

export const RosePetal: React.FC<MarigoldProps> = ({ className = "" }) => {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden={true}>
      <defs>
        <linearGradient id="smRosePetal" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffe4ea" />
          <stop offset="50%" stopColor="#f8a5bc" />
          <stop offset="100%" stopColor="#d84d72" />
        </linearGradient>
      </defs>
      <path
        d="M20 3 C30 5 37 14 36 24 C35 33 27 37 20 37 C13 37 5 33 4 24 C3 14 10 5 20 3 Z"
        fill="url(#smRosePetal)"
        opacity="0.82"
      />
    </svg>
  );
};

interface FlowerPetalsProps {
  count?: number;
}

export const FlowerPetals: React.FC<FlowerPetalsProps> = ({ count = 10 }) => {
  const petals = useMemo(() => {
    const pseudoRandom = (seed: number) => {
      const s = 43758.5453 * Math.sin(seed);
      return s - Math.floor(s);
    };

    return Array.from({ length: 2 * count }, (_, i) => {
      const isLeft = i < count;
      const r1 = pseudoRandom(12.9898 * i + 1);
      const r2 = pseudoRandom(78.233 * i + 2);
      const r3 = pseudoRandom(37.719 * i + 3);
      const isPetal = i % 2 === 1;
      const duration = 6 + 5 * r3;

      return {
        left: isLeft,
        start: `${isLeft ? 22 * r1 : 100 - 22 * r1}%`,
        size: `${(isPetal ? 12 + 14 * r2 : 16 + 20 * r2).toFixed(0)}px`,
        dur: `${duration.toFixed(2)}s`,
        delay: `${(-r3 * duration).toFixed(2)}s`,
        drift: `${((10 + 30 * r1) * (isLeft ? 1 : -1)).toFixed(0)}vw`,
        rot: `${Math.round((r3 - 0.5) * 540)}deg`,
        isPetal,
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
              left: item.start,
              width: item.size,
              height: item.size,
              animationDuration: item.dur,
              animationDelay: item.delay,
              "--sm-drift": item.drift,
              "--sm-rot": item.rot,
            } as React.CSSProperties
          }
        >
          {item.isPetal ? (
            <RosePetal className="block h-full w-full" />
          ) : (
            <MarigoldFlower className="block h-full w-full" />
          )}
        </span>
      ))}
    </div>
  );
};
