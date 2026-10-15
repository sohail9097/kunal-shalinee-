import React from "react";
import { motion } from "motion/react";

interface CalligraphyTitleProps {
  text?: string;
  lines?: string[];
  active?: boolean;
  className?: string;
  stroke?: string;
  fill?: string;
  size?: number;
  font?: string;
  duration?: number;
  delay?: number;
  width?: number;
}

export const CalligraphyTitle: React.FC<CalligraphyTitleProps> = ({
  text,
  lines,
  active = true,
  className = "",
  stroke = "#b5771e",
  fill = "#7a4a0c",
  size = 64,
  font = "var(--sm-font-script), cursive",
  duration = 1.5,
  delay = 0,
  width = 600,
}) => {
  const lineArray = lines && lines.length > 0 ? lines : [text || ""];
  const lineHeight = 1.15 * size;
  const totalHeight = Math.round(1.6 * size + (lineArray.length - 1) * lineHeight);

  return (
    <svg
      viewBox={`0 0 ${width} ${totalHeight}`}
      className={className}
      role="img"
      aria-label={lineArray.join(" ")}
    >
      {lineArray.map((line, idx) => {
        const y = 1.09 * size + idx * lineHeight;
        const lineDelay = delay + idx * duration * 0.45;

        return (
          <g key={idx}>
            {/* Outlined animated stroke */}
            <motion.text
              x={width / 2}
              y={y}
              textAnchor="middle"
              fill="none"
              stroke={stroke}
              strokeWidth={1.2}
              strokeLinejoin="round"
              style={{ font: `${size}px ${font}` }}
              initial={{ strokeDasharray: 2400, strokeDashoffset: 2400 }}
              animate={
                active
                  ? { strokeDashoffset: 0 }
                  : { strokeDashoffset: 2400 }
              }
              transition={{
                duration: duration,
                delay: lineDelay,
                ease: "easeInOut",
              }}
            >
              {line}
            </motion.text>

            {/* Filled text that fades in smoothly */}
            <motion.text
              x={width / 2}
              y={y}
              textAnchor="middle"
              fill={fill}
              style={{ font: `${size}px ${font}` }}
              initial={{ opacity: 0 }}
              animate={active ? { opacity: 1 } : { opacity: 0 }}
              transition={{
                duration: 0.6,
                delay: lineDelay + 0.5 * duration,
                ease: "easeOut",
              }}
            >
              {line}
            </motion.text>
          </g>
        );
      })}
    </svg>
  );
};
