import React from "react";
import { motion } from "motion/react";
import { WEDDING_DATA } from "../../data/weddingData";
import { FlowerPetals } from "../FlowerPetals";
import { MehndiGardenEffects } from "../MehndiGardenEffects";

interface MehndiSlideProps {
  active?: boolean;
  onNext?: () => void;
}

const EASE_ROYAL: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const MehndiSlide: React.FC<MehndiSlideProps> = ({
  active = false,
  onNext,
}) => {
  const event =
    WEDDING_DATA.events.find((e) =>
      e.title.toLowerCase().includes("mehndi")
    ) || WEDDING_DATA.events[1];

  return (
    <section className="sm-slide sm-haldi">
      {/* Background layer */}
      <div className="sm-haldi-behind" style={{ opacity: 1 }}>
        {/* Background Image (Easily changeable in weddingData.ts -> media.mehndi.bg) */}
        <img
          src={WEDDING_DATA.media.mehndi.bg}
          alt=""
          className="sm-cv-bg"
          aria-hidden={true}
        />

        {/* Dynamic Blinking/Flickering Lantern Lights & Swaying Flowers */}
        <MehndiGardenEffects />

        {/* Floating Petal Shower */}
        <FlowerPetals count={15} />

        {/* Left & Right Fireworks Loop Videos (if fireworks configured) */}
        {WEDDING_DATA.media.mehndi.fireworks &&
          ["l", "r"].map((side) => (
            <motion.video
              key={side}
              className={`sm-cv-fw sm-cv-fw--${side}`}
              src={WEDDING_DATA.media.mehndi.fireworks}
              muted
              loop
              playsInline
              autoPlay
              preload="auto"
              aria-hidden={true}
              initial={false}
              animate={{ opacity: active ? 0.95 : 0 }}
              transition={{
                duration: 0.9,
                ease: EASE_ROYAL,
                delay: active ? 0.35 : 0,
              }}
            />
          ))}

        {/* Marigold Garland swinging in from top */}
        <motion.img
          src={WEDDING_DATA.media.mehndi.garland}
          alt=""
          className="sm-cv-garland"
          aria-hidden={true}
          initial={false}
          animate={{ y: active ? "0%" : "-105%" }}
          transition={{ duration: 0.9, ease: EASE_ROYAL, delay: active ? 0.15 : 0 }}
          style={{
            transformOrigin: "top center",
            animation: "smFlowerSway 4.5s ease-in-out infinite alternate",
          }}
        />

        {/* Center Content Container */}
        <motion.div
          className="sm-cv-text"
          initial={false}
          animate={{
            opacity: active ? 1 : 0,
            y: active ? "0%" : "-15%",
          }}
          transition={{
            duration: 0.75,
            ease: EASE_ROYAL,
            delay: active ? 0.25 : 0,
          }}
        >
          {/* Whitish glow backdrop behind text: 
              Control the whitish part here via style={{ opacity: ... }}.
              Set to 0.05 for very subtle, or 0 to completely remove. */}
          <div
            className="sm-cv-text-backdrop"
            style={{ opacity: 0.10 }}
            aria-hidden={true}
          />

          {/* Couple Names */}
          <h2
            className="sm-cv-names"
            style={{
              color: "#fff8db",
              textShadow: "0 2px 14px rgba(0,0,0,0.95), 0 1px 3px rgba(0,0,0,0.9), 0 0 24px rgba(253,224,71,0.35)",
            }}
          >
            <span className="sm-cv-name" style={{ color: "#fff8db" }}>
              Kunal
            </span>
            <span className="sm-cv-x" style={{ color: "#fde047" }} aria-hidden={true}>
              &amp;
            </span>
            <span className="sm-cv-name" style={{ color: "#fff8db" }}>
              Shalini
            </span>
          </h2>

          {/* Golden Royal Crest SVG */}
          <div className="sm-cv-crest-wrap" aria-hidden={true} style={{ filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.85))" }}>
            <svg
              viewBox="0 0 160 22"
              className="sm-cv-crest-svg"
              fill="none"
            >
              <defs>
                <linearGradient
                  id="smCrestGoldMehndi"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#eab308" />
                  <stop offset="25%" stopColor="#fde047" />
                  <stop offset="50%" stopColor="#ffffff" />
                  <stop offset="75%" stopColor="#fde047" />
                  <stop offset="100%" stopColor="#eab308" />
                </linearGradient>
              </defs>
              <path
                d="M80 1 C77.5 5 75.5 10 75.5 15 C75.5 18 77.5 20 80 20 C82.5 20 84.5 18 84.5 15 C84.5 10 82.5 5 80 1 Z"
                fill="url(#smCrestGoldMehndi)"
              />
              <path
                d="M77 15 C71 10 65 11 63 15.5 C67 17.5 73 17 76.5 16 Z"
                fill="url(#smCrestGoldMehndi)"
              />
              <path
                d="M83 15 C89 10 95 11 97 15.5 C93 17.5 87 17 83.5 16 Z"
                fill="url(#smCrestGoldMehndi)"
              />
              <circle cx="80" cy="14" r="1.6" fill="#1b4d2e" />
              <circle cx="80" cy="7.5" r="1" fill="#fbf0ba" />
              <path
                d="M63 15 C52 12.5 40 16.5 28 12.5 C20 9.8 14 6 6 7.5"
                stroke="url(#smCrestGoldMehndi)"
                strokeWidth="1.1"
                strokeLinecap="round"
              />
              <path
                d="M97 15 C108 12.5 120 16.5 132 12.5 C140 9.8 146 6 154 7.5"
                stroke="url(#smCrestGoldMehndi)"
                strokeWidth="1.1"
                strokeLinecap="round"
              />
              <path
                d="M48 13.5 C44 11 40 12 38 14 C42 15.5 46 15 48 13.5 Z"
                fill="url(#smCrestGoldMehndi)"
              />
              <path
                d="M35 15 C32 13 28 13.5 27 15.5 C30 16.5 33 16.2 35 15 Z"
                fill="url(#smCrestGoldMehndi)"
              />
              <path
                d="M112 13.5 C116 11 120 12 122 14 C118 15.5 114 15 112 13.5 Z"
                fill="url(#smCrestGoldMehndi)"
              />
              <path
                d="M125 15 C128 13 132 13.5 133 15.5 C130 16.5 127 16.2 125 15 Z"
                fill="url(#smCrestGoldMehndi)"
              />
              <circle cx="6" cy="7.5" r="1.3" fill="url(#smCrestGoldMehndi)" />
              <circle cx="154" cy="7.5" r="1.3" fill="url(#smCrestGoldMehndi)" />
              <circle cx="20" cy="10" r="1" fill="url(#smCrestGoldMehndi)" />
              <circle cx="140" cy="10" r="1" fill="url(#smCrestGoldMehndi)" />
            </svg>
          </div>

          {/* Event Title with Decorative Sprigs */}
          <div className="sm-cv-title-wrap">
            <svg
              viewBox="0 0 34 16"
              className="sm-cv-sprig sm-cv-sprig--left"
              fill="none"
              aria-hidden={true}
              style={{ filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.85))" }}
            >
              <path
                d="M32 13.5 C22 11.5 12 8.5 2 4.5"
                stroke="#fde047"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
              <path
                d="M2 4.5 C0.5 3 0 1.5 1 1 C3 1 5 2.5 7 4.5 C5 5 3 5 2 4.5 Z"
                fill="#fde047"
              />
              <path
                d="M9 7 C9 4 12 3 14 3.5 C14 5.5 12 7.5 9.5 8 Z"
                fill="#fde047"
              />
              <path
                d="M13 9 C11 11 10 13.5 11 14 C12.5 14 14.5 12.5 15.5 10.5 Z"
                fill="#fde047"
              />
              <path
                d="M19 10 C19 7 22 6 24 6.5 C24 8.5 22 10.5 19.5 11 Z"
                fill="#fde047"
              />
              <path
                d="M23 12 C22 13.5 21 15.5 22.5 16 C24 16 25.5 14.5 26 12.5 Z"
                fill="#fde047"
              />
            </svg>

            <h3
              className="sm-cv-event-title tracking-wider"
              style={{
                color: "#fde047",
                textShadow: "0 2px 10px rgba(0,0,0,0.95), 0 1px 3px rgba(0,0,0,0.9)",
                fontWeight: 700,
                letterSpacing: "0.26em",
              }}
            >
              {event.title.toUpperCase()}
            </h3>

            <svg
              viewBox="0 0 34 16"
              className="sm-cv-sprig sm-cv-sprig--right"
              fill="none"
              aria-hidden={true}
              style={{ filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.85))" }}
            >
              <path
                d="M2 13.5 C12 11.5 22 8.5 32 4.5"
                stroke="#fde047"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
              <path
                d="M32 4.5 C33.5 3 34 1.5 33 1 C31 1 29 2.5 27 4.5 C29 5 31 5 32 4.5 Z"
                fill="#fde047"
              />
              <path
                d="M25 7 C25 4 22 3 20 3.5 C20 5.5 22 7.5 24.5 8 Z"
                fill="#fde047"
              />
              <path
                d="M21 9 C23 11 24 13.5 23 14 C21.5 14 19.5 12.5 18.5 10.5 Z"
                fill="#fde047"
              />
              <path
                d="M15 10 C15 7 12 6 10 6.5 C10 8.5 12 10.5 14.5 11 Z"
                fill="#fde047"
              />
              <path
                d="M11 12 C12 13.5 13 15.5 11.5 16 C10 16 8.5 14.5 8 12.5 Z"
                fill="#fde047"
              />
            </svg>
          </div>

          <svg viewBox="0 0 180 6" className="sm-cv-title-divider" aria-hidden={true} style={{ filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.85))" }}>
            <line
              x1="0"
              y1="3"
              x2="180"
              y2="3"
              stroke="#fde047"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
          </svg>

          {/* When & Venue */}
          <p
            className="sm-cv-when"
            style={{
              color: "#ffffff",
              textShadow: "0 2px 10px rgba(0,0,0,0.95), 0 1px 3px rgba(0,0,0,0.9)",
              fontWeight: 600,
            }}
          >
            {event.date}{" "}
            <span className="sm-cv-when-dot" style={{ color: "#fde047" }}>
              ·
            </span>{" "}
            {event.time}
          </p>
          <p
            className="sm-cv-venue"
            style={{
              color: "#fef08a",
              textShadow: "0 2px 10px rgba(0,0,0,0.95), 0 1px 3px rgba(0,0,0,0.9)",
              fontWeight: 600,
            }}
          >
            {event.venueShort}
          </p>

          <p
            className="sm-cv-lead"
            style={{
              color: "#fff4dd",
              textShadow: "0 2px 10px rgba(0,0,0,0.95), 0 1px 3px rgba(0,0,0,0.9)",
            }}
          >
            Come join us for an evening filled with
          </p>

          {/* Highlights Row (FUN, MUSIC, GAMES, LAUGHTER) */}
          <div className="sm-cv-highlights-row">
            {/* FUN */}
            <div className="sm-cv-hl-col">
              <svg
                viewBox="0 0 24 24"
                className="sm-cv-hl-icon"
                fill="none"
                stroke="#fde047"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden={true}
                style={{ filter: "drop-shadow(0 2px 5px rgba(0,0,0,0.9))" }}
              >
                <circle cx="12" cy="12" r="1.5" fill="#fde047" />
                <line x1="12" y1="2" x2="12" y2="7.5" />
                <line x1="12" y1="16.5" x2="12" y2="22" />
                <line x1="2" y1="12" x2="7.5" y2="12" />
                <line x1="16.5" y1="12" x2="22" y2="12" />
                <circle cx="12" cy="2" r="0.75" fill="#fde047" />
                <circle cx="12" cy="22" r="0.75" fill="#fde047" />
                <circle cx="2" cy="12" r="0.75" fill="#fde047" />
                <circle cx="22" cy="12" r="0.75" fill="#fde047" />
                <line x1="4.8" y1="4.8" x2="8.8" y2="8.8" />
                <line x1="15.2" y1="15.2" x2="19.2" y2="19.2" />
                <line x1="4.8" y1="19.2" x2="8.8" y2="15.2" />
                <line x1="15.2" y1="8.8" x2="19.2" y2="4.8" />
              </svg>
              <span
                className="sm-cv-hl-name"
                style={{
                  color: "#fef08a",
                  textShadow: "0 2px 8px rgba(0,0,0,0.95), 0 1px 2px rgba(0,0,0,0.9)",
                  fontWeight: 700,
                }}
              >
                FUN
              </span>
            </div>

            <div
              className="sm-cv-hl-sep"
              aria-hidden={true}
              style={{ background: "rgba(254, 240, 138, 0.45)", boxShadow: "0 1px 3px rgba(0,0,0,0.8)" }}
            />

            {/* MUSIC */}
            <div className="sm-cv-hl-col">
              <svg
                viewBox="0 0 24 24"
                className="sm-cv-hl-icon"
                fill="none"
                stroke="#fde047"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden={true}
                style={{ filter: "drop-shadow(0 2px 5px rgba(0,0,0,0.9))" }}
              >
                <ellipse
                  cx="6.8"
                  cy="17.2"
                  rx="3.2"
                  ry="2.2"
                  transform="rotate(-22 6.8 17.2)"
                  fill="#fde047"
                />
                <ellipse
                  cx="17.2"
                  cy="14.2"
                  rx="3.2"
                  ry="2.2"
                  transform="rotate(-22 17.2 14.2)"
                  fill="#fde047"
                />
                <path d="M9.6 16.5 V 4.5" />
                <path d="M20 13.5 V 2" />
                <polygon
                  points="9.6,4.5 20,2 20,5.2 9.6,7.7"
                  fill="#fde047"
                  stroke="none"
                />
                <polygon
                  points="9.6,9.2 20,6.7 20,8.7 9.6,11.2"
                  fill="#fde047"
                  stroke="none"
                />
              </svg>
              <span
                className="sm-cv-hl-name"
                style={{
                  color: "#fef08a",
                  textShadow: "0 2px 8px rgba(0,0,0,0.95), 0 1px 2px rgba(0,0,0,0.9)",
                  fontWeight: 700,
                }}
              >
                MUSIC
              </span>
            </div>

            <div
              className="sm-cv-hl-sep"
              aria-hidden={true}
              style={{ background: "rgba(254, 240, 138, 0.45)", boxShadow: "0 1px 3px rgba(0,0,0,0.8)" }}
            />

            {/* GAMES */}
            <div className="sm-cv-hl-col">
              <svg
                viewBox="0 0 24 24"
                className="sm-cv-hl-icon"
                fill="none"
                stroke="#fde047"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden={true}
                style={{ filter: "drop-shadow(0 2px 5px rgba(0,0,0,0.9))" }}
              >
                <path d="M12 11.5 C10.5 8 6 6.5 2.5 8.5 C1.5 13 4 16.5 10 16.5 C11.5 16.5 12 15 12 15 C12 15 12.5 16.5 14 16.5 C20 16.5 22.5 13 21.5 8.5 C18 6.5 13.5 8 12 11.5 Z" />
                <path
                  d="M5.5 11.8 C6.8 10.2 9.2 10.5 9.8 12.2 C9.2 13.5 6.8 13.8 5.5 11.8 Z"
                  fill="#fde047"
                />
                <path
                  d="M18.5 11.8 C17.2 10.2 14.8 10.5 14.2 12.2 C14.8 13.5 17.2 13.8 18.5 11.8 Z"
                  fill="#fde047"
                />
                <path d="M12 8.5 V 4" />
                <circle cx="12" cy="3" r="0.7" fill="#fde047" />
              </svg>
              <span
                className="sm-cv-hl-name"
                style={{
                  color: "#fef08a",
                  textShadow: "0 2px 8px rgba(0,0,0,0.95), 0 1px 2px rgba(0,0,0,0.9)",
                  fontWeight: 700,
                }}
              >
                GAMES
              </span>
            </div>

            <div
              className="sm-cv-hl-sep"
              aria-hidden={true}
              style={{ background: "rgba(254, 240, 138, 0.45)", boxShadow: "0 1px 3px rgba(0,0,0,0.8)" }}
            />

            {/* LAUGHTER */}
            <div className="sm-cv-hl-col">
              <svg
                viewBox="0 0 24 24"
                className="sm-cv-hl-icon"
                fill="none"
                stroke="#fde047"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden={true}
                style={{ filter: "drop-shadow(0 2px 5px rgba(0,0,0,0.9))" }}
              >
                <path d="M12 21 C11.5 20.5 3 14.5 3 8.8 C3 5.4 5.6 3.2 8.8 3.2 C10.6 3.2 11.6 4.1 12 5.1 C12.4 4.1 13.4 3.2 15.2 3.2 C18.4 3.2 21 5.4 21 8.8 C21 14.5 12.5 20.5 12 21 Z" />
                <path d="M6 8 C6 6.8 7.2 5.5 8.5 5.5" strokeWidth="1" />
              </svg>
              <span
                className="sm-cv-hl-name"
                style={{
                  color: "#fef08a",
                  textShadow: "0 2px 8px rgba(0,0,0,0.95), 0 1px 2px rgba(0,0,0,0.9)",
                  fontWeight: 700,
                }}
              >
                LAUGHTER
              </span>
            </div>
          </div>

          {/* DRESS CODE CARD - DRESS UP IN GREEN */}
          <div className="sm-cv-dress-card">
            <svg
              viewBox="0 0 80 80"
              className="sm-cv-dress-flowers"
              fill="none"
              aria-hidden={true}
            >
              <defs>
                <radialGradient
                  id="smGreenEmeraldCore"
                  cx="45%"
                  cy="45%"
                  r="55%"
                >
                  <stop offset="0%" stopColor="#ecfdf5" />
                  <stop offset="45%" stopColor="#6ee7b7" />
                  <stop offset="85%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#047857" />
                </radialGradient>
                <radialGradient
                  id="smGreenPetal"
                  cx="35%"
                  cy="35%"
                  r="65%"
                >
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="50%" stopColor="#a7f3d0" />
                  <stop offset="100%" stopColor="#34d399" />
                </radialGradient>
                <radialGradient
                  id="smYellowJasmineMehndi"
                  cx="40%"
                  cy="40%"
                  r="60%"
                >
                  <stop offset="0%" stopColor="#fffde6" />
                  <stop offset="55%" stopColor="#ffd85e" />
                  <stop offset="100%" stopColor="#f59e0b" />
                </radialGradient>
                <linearGradient
                  id="smLeafStemGradMehndi"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#a7f3d0" />
                  <stop offset="100%" stopColor="#065f46" />
                </linearGradient>
              </defs>

              {/* Foliage Leaves */}
              <g opacity="0.95">
                <path
                  d="M38 32 C34 16 26 10 20 12 C18 20 24 29 36 33 Z"
                  fill="url(#smLeafStemGradMehndi)"
                />
                <path
                  d="M34 46 C22 36 14 38 10 43 C15 50 24 51 34 47 Z"
                  fill="url(#smLeafStemGradMehndi)"
                />
                <path
                  d="M50 25 C58 13 69 11 73 16 C68 24 59 28 48 27 Z"
                  fill="url(#smLeafStemGradMehndi)"
                />
                <path
                  d="M39 58 C34 68 24 72 19 68 C20 60 29 55 39 56 Z"
                  fill="url(#smLeafStemGradMehndi)"
                />
              </g>

              {/* Central Emerald Rose / Motif */}
              <g transform="translate(36, 31)">
                <circle
                  cx="0"
                  cy="0"
                  r="16.5"
                  fill="url(#smGreenPetal)"
                  opacity="0.95"
                />
                <path
                  d="M-14 -4 C-16 -14 4 -18 13 -10 C16 -1 8 16 -4 14 Z"
                  fill="url(#smGreenEmeraldCore)"
                  opacity="0.88"
                />
                <ellipse
                  cx="-0.5"
                  cy="-0.5"
                  rx="7.5"
                  ry="6.5"
                  fill="url(#smGreenEmeraldCore)"
                />
                <path
                  d="M-5 -2 C-3 -7 4 -7 6 -2 C7 3 2 6 -3 4"
                  stroke="#064e3b"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  fill="none"
                />
              </g>

              {/* Yellow Jasmine Accent */}
              <g transform="translate(19, 49)">
                {[0, 72, 144, 216, 288].map((rot) => (
                  <ellipse
                    key={rot}
                    cx="0"
                    cy="-6.5"
                    rx="3.8"
                    ry="6.5"
                    fill="url(#smYellowJasmineMehndi)"
                    transform={`rotate(${rot})`}
                    opacity="0.95"
                  />
                ))}
                <circle cx="0" cy="0" r="3" fill="#d97706" />
              </g>
            </svg>

            {/* Glass & Gold Frame Vector */}
            <svg
              className="sm-cv-dress-frame"
              viewBox="0 0 320 68"
              preserveAspectRatio="none"
              aria-hidden={true}
            >
              <defs>
                <linearGradient
                  id="smDressGreenGrad"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#f0fdf4" stopOpacity="0.82" />
                  <stop offset="50%" stopColor="#dcfce7" stopOpacity="0.70" />
                  <stop offset="100%" stopColor="#bbf7d0" stopOpacity="0.58" />
                </linearGradient>
                <linearGradient
                  id="smGoldFrameMehndi"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#d4af5c" />
                  <stop offset="35%" stopColor="#fae7a5" />
                  <stop offset="70%" stopColor="#cfa959" />
                  <stop offset="100%" stopColor="#22543d" />
                </linearGradient>
              </defs>

              <path
                d="M 24,2 H 296 C 298,10 310,22 318,24 V 44 C 310,46 298,58 296,66 H 24 C 22,58 10,46 2,44 V 24 C 10,22 22,10 24,2 Z"
                fill="url(#smDressGreenGrad)"
                stroke="url(#smGoldFrameMehndi)"
                strokeWidth="1.2"
              />
              <path
                d="M 26,6 H 294 C 296,12 306,22 314,24 V 44 C 306,46 296,56 294,62 H 26 C 24,56 14,46 6,44 V 24 C 14,22 24,12 26,6 Z"
                fill="none"
                stroke="#2d6a4f"
                strokeWidth="0.8"
                opacity="0.6"
              />
              <circle cx="15" cy="15" r="1.3" fill="#cfa959" />
              <circle cx="305" cy="15" r="1.3" fill="#cfa959" />
            </svg>

            {/* Dress code text */}
            <div className="sm-cv-dress-inner">
              <span
                className="sm-cv-dress-label"
                style={{
                  color: "#065f46",
                  fontWeight: 700,
                  letterSpacing: "0.26em",
                }}
              >
                D R E S S &nbsp; C O D E
              </span>
              <span
                className="sm-cv-dress-script"
                style={{
                  color: "#064e3b",
                  textShadow: "0 1px 2px rgba(6,78,59,0.18)",
                  fontWeight: 600,
                }}
              >
                Dress up in Green
              </span>
            </div>
          </div>
        </motion.div>

        {/* Couple Illustration (Easily changeable in weddingData.ts -> media.mehndi.couple) */}
        <motion.img
          src={WEDDING_DATA.media.mehndi.couple}
          alt="Shalini and Kunal at the Mehndi & Sangeet"
          className="sm-cv-couple"
          initial={false}
          animate={{
            opacity: active ? 1 : 0,
            y: active ? "0%" : "25%",
          }}
          transition={{
            duration: 0.85,
            ease: EASE_ROYAL,
            delay: active ? 0.35 : 0,
          }}
        />

        {/* Down Arrow Navigation Button */}
        {active && onNext && (
          <motion.button
            type="button"
            onClick={onNext}
            className="sm-cv-down-btn"
            aria-label="Next slide"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden={true}
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <polyline points="19 12 12 19 5 12" />
            </svg>
          </motion.button>
        )}
      </div>
    </section>
  );
};
