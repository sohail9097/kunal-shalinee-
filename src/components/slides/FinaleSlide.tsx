import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { WEDDING_DATA } from "../../data/weddingData";
import { CelestialLights } from "../CelestialLights";

interface FinaleSlideProps {
  active?: boolean;
}

const EASE_ROYAL: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const FinaleSlide: React.FC<FinaleSlideProps> = ({ active = false }) => {
  const [showModal, setShowModal] = useState(false);

  const venueList = WEDDING_DATA.events.map((ev) => ({
    label: ev.title,
    date: `${ev.date} · ${ev.time}`,
    place: ev.venue,
    href: ev.mapHref,
  }));

  const groomParents = WEDDING_DATA.groom.parents
    .trim()
    .replace("Mrs.Baby", "Mrs. Baby");
  const brideParents = WEDDING_DATA.bride.parents
    .trim()
    .replace("Mrs.Baby", "Mrs. Baby");

  return (
    <section
      className="sm-slide sm-ty overflow-hidden"
      style={{ position: "relative" }}
    >
      {/* Background Arch & Couple Artwork - Completely Unchanged */}
      <img
        src={WEDDING_DATA.media.finale.sky}
        alt=""
        className="sm-ty-sky"
        aria-hidden={true}
      />

      {/* Gentle Twinkling Celestial Lights */}
      <CelestialLights />

      {/* Invitation Text Wrapper: Fixed absolute placement based on reference image 2 */}
      <div
        className="sm-finale-text-wrapper"
        style={{
          position: "absolute",
          left: "50%",
          top: "28.2%",
          transform: "translateX(-50%)",
          width: "78%",
          maxWidth: "360px",
          textAlign: "center",
          zIndex: 22,
          pointerEvents: "auto",
        }}
      >
        {/* Animation Container: Affects ONLY opacity and translateY without modifying layout */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.7, ease: EASE_ROYAL }}
          className="w-full flex flex-col items-center justify-center"
        >
          {/* 1. Awaiting for your gracious presence */}
          <p
            style={{
              fontFamily:
                "'Jacques Francois', 'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(0.92rem, 3.8vw, 1.15rem)",
              color: "#5c1420",
              fontWeight: 500,
              lineHeight: 1.25,
              letterSpacing: "0.01em",
              textShadow: "0 1px 3px rgba(255,248,235,0.9)",
              margin: 0,
            }}
          >
            Awaiting for your gracious presence
          </p>

          {/* Delicate Lotus & Gold Divider Motif */}
          <div className="flex items-center justify-center gap-2.5 my-1.5 opacity-85">
            <span className="h-[1px] w-9 bg-gradient-to-r from-transparent to-[#c9a227]" />
            <svg
              viewBox="0 0 24 24"
              className="w-3.5 h-3.5 text-[#c9a227] fill-current"
              aria-hidden={true}
            >
              <path d="M12 2.5c-.8 2.8-2.6 5-5 6.4 2.4 1.4 4.2 3.6 5 6.4.8-2.8 2.6-5 5-6.4-2.4-1.4-4.2-3.6-5-6.4z" />
            </svg>
            <span className="h-[1px] w-9 bg-gradient-to-l from-transparent to-[#c9a227]" />
          </div>

          {/* 2. Dr. Kunal & Groom Parents */}
          <div style={{ marginTop: "0.15rem" }}>
            <p
              style={{
                fontFamily: "'Allura', 'Great Vibes', 'Parisienne', cursive",
                fontSize: "clamp(2.15rem, 8.6vw, 2.9rem)",
                color: "#7a1122",
                fontWeight: 400,
                lineHeight: 1,
                margin: 0,
                textShadow: "0 1px 2px rgba(255,248,220,0.95)",
              }}
            >
              {WEDDING_DATA.groom.name}
            </p>
            <p
              style={{
                fontFamily: "'Jacques Francois', Georgia, serif",
                fontSize: "clamp(0.52rem, 2.1vw, 0.65rem)",
                letterSpacing: "0.14em",
                color: "#4a151d",
                marginTop: "0.22rem",
                marginBottom: 0,
                textTransform: "uppercase",
                fontWeight: 600,
              }}
            >
              {groomParents}
            </p>
          </div>

          {/* 3. ❖ weds ❖ with gold rules */}
          <div className="flex items-center justify-center gap-2 my-1.5">
            <span className="h-[1px] w-8 bg-gradient-to-r from-transparent to-[#c9a227]" />
            <span className="text-[#c9a227] text-[9px]">❖</span>
            <span
              style={{
                fontFamily: "'Allura', 'Great Vibes', 'Parisienne', cursive",
                fontSize: "clamp(1.18rem, 4.8vw, 1.55rem)",
                color: "#7a1122",
                lineHeight: 1,
                padding: "0 0.15rem",
              }}
            >
              weds
            </span>
            <span className="text-[#c9a227] text-[9px]">❖</span>
            <span className="h-[1px] w-8 bg-gradient-to-l from-transparent to-[#c9a227]" />
          </div>

          {/* 4. Dr. Shalinee & Bride Parents */}
          <div style={{ marginTop: "0.1rem" }}>
            <p
              style={{
                fontFamily: "'Allura', 'Great Vibes', 'Parisienne', cursive",
                fontSize: "clamp(2.15rem, 8.6vw, 2.9rem)",
                color: "#7a1122",
                fontWeight: 400,
                lineHeight: 1,
                margin: 0,
                textShadow: "0 1px 2px rgba(255,248,220,0.95)",
              }}
            >
              {WEDDING_DATA.bride.name}
            </p>
            <p
              style={{
                fontFamily: "'Jacques Francois', Georgia, serif",
                fontSize: "clamp(0.52rem, 2.1vw, 0.65rem)",
                letterSpacing: "0.14em",
                color: "#4a151d",
                marginTop: "0.22rem",
                marginBottom: 0,
                textTransform: "uppercase",
                fontWeight: 600,
              }}
            >
              {brideParents}
            </p>
          </div>

          {/* 5. VENUES & MAP Button */}
          <button
            type="button"
            onClick={() => setShowModal(true)}
            style={{
              border: "1.5px solid #c9a227",
              color: "#5c1420",
              fontFamily: "'Jacques Francois', Georgia, serif",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              cursor: "pointer",
              background:
                "linear-gradient(180deg, #fffcf6 0%, #faecd7 100%)",
              borderRadius: "9999px",
              alignItems: "center",
              gap: "0.55rem",
              marginTop: "clamp(0.75rem, 2vh, 1.15rem)",
              padding: "0.52rem 1.7rem",
              fontSize: "clamp(0.68rem, 2.7vw, 0.78rem)",
              fontWeight: 600,
              boxShadow:
                "0 4px 16px rgba(120,53,15,0.18), inset 0 1px 1px #ffffff",
              display: "inline-flex",
            }}
          >
            <svg
              viewBox="0 0 24 24"
              width="15"
              height="15"
              fill="none"
              aria-hidden={true}
            >
              <path
                d="M12 21s7-6.5 7-11a7 7 0 10-14 0c0 4.5 7 11 7 11z"
                stroke="#c9a227"
                strokeWidth="1.9"
                strokeLinejoin="round"
              />
              <circle
                cx="12"
                cy="10"
                r="2.5"
                stroke="#c9a227"
                strokeWidth="1.9"
              />
            </svg>
            VENUES &amp; MAP
          </button>
        </motion.div>
      </div>

      {/* Venues Modal Dialog */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="sm-ty-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setShowModal(false)}
          >
            <motion.div
              className="sm-ty-card"
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.96 }}
              transition={{ duration: 0.3, ease: EASE_ROYAL }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="sm-ty-close"
                onClick={() => setShowModal(false)}
                aria-label="Close"
              >
                ×
              </button>

              <p className="sm-caps sm-ty-cardkick">Venues &amp; Map</p>

              {venueList.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sm-ty-loc"
                >
                  <span className="sm-ty-loclabel">{item.label}</span>
                  <span className="text-[11px] text-[#7a1426] font-medium">
                    {item.date}
                  </span>
                  <span className="sm-ty-locplace">{item.place}</span>
                  <span className="sm-ty-locgo">Open in Google Maps ↗</span>
                </a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Made with Love footer */}
      <a
        href={`https://wa.me/919217104917?text=${encodeURIComponent(
          "Hi, I loved Kunal & Shalinee's wedding invitation and would like to know more!"
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="sm-caps sm-madelove"
      >
        ❖ &nbsp; Made with ❤️ for Kunal &amp; Shalinee &nbsp; ❖
      </a>
    </section>
  );
};
