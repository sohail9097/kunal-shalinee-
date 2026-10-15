import React from "react";

export const GateDesign: React.FC = () => {
  return (
    <div className="sm-gate">
      <div className="sm-stripes" aria-hidden={true} />
      <div className="sm-frame">
        <svg
          viewBox="0 0 400 640"
          className="sm-frame-svg"
          aria-hidden={true}
        >
          <defs>
            <linearGradient id="smBrass" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#e7c86b" />
              <stop offset="0.5" stopColor="#c9a227" />
              <stop offset="1" stopColor="#7a5a1e" />
            </linearGradient>
          </defs>

          {/* Palace Arch Gate Inner Fill */}
          <ellipse cx="200" cy="320" rx="150" ry="240" fill="#fbf4e4" />
          <ellipse
            cx="200"
            cy="320"
            rx="150"
            ry="240"
            fill="none"
            stroke="url(#smBrass)"
            strokeWidth="12"
          />
          <ellipse
            cx="200"
            cy="320"
            rx="150"
            ry="240"
            fill="none"
            stroke="#5f4715"
            strokeWidth="1"
          />
          <ellipse
            cx="200"
            cy="320"
            rx="150"
            ry="240"
            fill="none"
            stroke="#6b4e1a"
            strokeWidth="12"
            strokeDasharray="3 12"
            opacity="0.55"
          />
          <ellipse
            cx="200"
            cy="320"
            rx="138"
            ry="228"
            fill="none"
            stroke="url(#smBrass)"
            strokeWidth="4"
          />

          {/* Top and Bottom Decorative Finials */}
          {[0, 1].map((mirror) => (
            <g
              key={mirror}
              transform={mirror ? "translate(0,640) scale(1,-1)" : undefined}
            >
              <path
                d="M200 66 q-14 -30 -46 -34 q26 -18 46 12 q20 -30 46 -12 q-32 4 -46 34z"
                fill="url(#smBrass)"
                stroke="#5f4715"
                strokeWidth="1"
              />
              <path
                d="M150 92 q-40 -6 -58 20 q34 -6 46 18 q4 -26 12 -38z"
                fill="url(#smBrass)"
                stroke="#5f4715"
                strokeWidth="0.8"
              />
              <path
                d="M250 92 q40 -6 58 20 q-34 -6 -46 18 q-4 -26 -12 -38z"
                fill="url(#smBrass)"
                stroke="#5f4715"
                strokeWidth="0.8"
              />
              <circle
                cx="200"
                cy="60"
                r="9"
                fill="url(#smBrass)"
                stroke="#5f4715"
                strokeWidth="1"
              />
            </g>
          ))}
        </svg>

        <div className="sm-frame-top sm-caps">Press For</div>
        <div className="sm-frame-bottom sm-caps">
          Haldi &amp; Sangeet
          <br />
          Fun
        </div>
      </div>
    </div>
  );
};
