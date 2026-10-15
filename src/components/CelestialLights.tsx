import React, { useMemo } from "react";

export const CelestialLights: React.FC = () => {
  const lights = useMemo(() => {
    const pseudoRandom = (seed: number) => {
      const s = 43758.5453 * Math.sin(seed);
      return s - Math.floor(s);
    };

    const toFixedNum = (val: number, decimals: number) =>
      Number(val.toFixed(decimals));

    const tints = [
      "255, 226, 158",
      "176, 214, 255",
      "255, 178, 214",
      "186, 255, 214",
    ];

    return Array.from({ length: 12 }, (_, i) => ({
      left: toFixedNum(100 * pseudoRandom(4.7 * i + 1), 1),
      top: toFixedNum(6 + 84 * pseudoRandom(8.3 * i + 2), 1),
      size: toFixedNum(24 + 76 * pseudoRandom(3.1 * i + 3), 1),
      dur: toFixedNum(7 + 8 * pseudoRandom(6.1 * i + 4), 2),
      delay: toFixedNum(-(12 * pseudoRandom(3.7 * i + 5)), 2),
      tint: tints[i % 4],
      peak: toFixedNum(0.3 + 0.4 * pseudoRandom(9.2 * i + 6), 2),
    }));
  }, []);

  return (
    <div className="sm-lights" aria-hidden={true}>
      {lights.map((light, idx) => (
        <span
          key={idx}
          className="sm-light"
          style={
            {
              left: `${light.left}%`,
              top: `${light.top}%`,
              width: `${light.size}px`,
              height: `${light.size}px`,
              background: `radial-gradient(circle, rgba(${light.tint}, 0.85) 0%, rgba(${light.tint}, 0) 68%)`,
              animationDuration: `${light.dur}s`,
              animationDelay: `${light.delay}s`,
              "--sm-peak": light.peak,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
};
