import React from "react";

const ARCH_PATH =
  "M45 420 L45 190 Q45 120 96 110 Q122 104 132 80 Q146 52 150 28 Q154 52 168 80 Q178 104 204 110 Q255 120 255 190 L255 420";

export const CocktailArch: React.FC = () => {
  return (
    <svg
      className="sm-cocktail-arch"
      viewBox="0 0 300 420"
      aria-hidden={true}
      fill="none"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="smCocktailGold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f6e3a8" />
          <stop offset="0.5" stopColor="#d9b25b" />
          <stop offset="1" stopColor="#b98a2e" />
        </linearGradient>
      </defs>

      <g
        stroke="url(#smCocktailGold)"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      >
        <path d={ARCH_PATH} strokeWidth="2" vectorEffect="non-scaling-stroke" />
        <path
          d={ARCH_PATH}
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          transform="translate(150 220) scale(0.94) translate(-150 -220)"
        />
      </g>
    </svg>
  );
};
