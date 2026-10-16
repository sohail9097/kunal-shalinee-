import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { WEDDING_DATA } from "../../data/weddingData";
import { CelestialLights } from "../CelestialLights";

interface FinaleSlideProps {
  active?: boolean;
}

const EASE_ROYAL: [number, number, number, number] = [0.22, 1, 0.36, 1];

const itemVariant = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE_ROYAL },
  },
};

export const FinaleSlide: React.FC<FinaleSlideProps> = ({ active = false }) => {
  const [showModal, setShowModal] = useState(false);

  const venueList = WEDDING_DATA.events.map((ev) => ({
    label: ev.title,
    date: `${ev.date} · ${ev.time}`,
    place: ev.venue,
    href: ev.mapHref,
  }));

  return (
    <section className="sm-slide sm-ty relative overflow-hidden select-none">
      {/* Background Arch & Couple Artwork */}
      <img
        src={WEDDING_DATA.media.finale.sky}
        alt=""
        className="sm-ty-sky"
        aria-hidden={true}
      />

      {/* Gentle Twinkling Celestial Lights */}
      <CelestialLights />

      {/* Family Lineage & Gracious Presence Note - Perfectly Positioned in Arch Alcove */}
      <motion.div
        className="sm-ty-text"
        initial={{ opacity: 0, y: 35 }}
        animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 }}
        transition={{ duration: 0.95, ease: EASE_ROYAL, delay: 0.2 }}
        style={{
          position: "absolute",
          top: "clamp(18%, 21vh, 23%)",
          left: 0,
          right: 0,
          zIndex: 22,
          textAlign: "center",
          maxWidth: "380px",
          marginLeft: "auto",
          marginRight: "auto",
          padding: "0 1.2rem",
          pointerEvents: "auto",
        }}
      >
        {/* Gracious Presence Header */}
        <motion.p
          variants={itemVariant}
          style={{
            fontFamily: "'Berkshire Swash', Georgia, serif",
            fontSize: "clamp(1.15rem, 4.4vw, 1.45rem)",
            color: "#6b1d2e",
            lineHeight: 1.25,
            letterSpacing: "0.01em",
            textShadow: "0 1px 2px rgba(255,248,235,0.9)",
          }}
        >
          Awaiting for your gracious presence
        </motion.p>

        {/* Delicate Golden Divider Flourish */}
        <motion.div
          variants={itemVariant}
          className="flex items-center justify-center gap-2 my-1 opacity-75"
          aria-hidden={true}
        >
          <span className="w-8 h-[1px] bg-gradient-to-r from-transparent via-[#c9a227] to-[#c9a227]" />
          <span className="text-[#c9a227] text-[10px]">❖</span>
          <span className="w-8 h-[1px] bg-gradient-to-l from-transparent via-[#c9a227] to-[#c9a227]" />
        </motion.div>

        {/* 1. Groom & Family (Dr. Kunal) */}
        <motion.div variants={itemVariant} className="mt-1">
          <p
            style={{
              fontFamily: "'Great Vibes', 'Parisienne', cursive",
              fontSize: "clamp(2.3rem, 9.2vw, 3.1rem)",
              color: "#7a162b",
              fontWeight: 400,
              lineHeight: 1.08,
              letterSpacing: "0.01em",
              textShadow: "0 1px 2px rgba(255,248,235,0.95)",
            }}
          >
            {WEDDING_DATA.groom.name}
          </p>
          <p
            style={{
              fontFamily: "'Jacques Francois', Georgia, serif",
              fontSize: "clamp(0.55rem, 2.3vw, 0.68rem)",
              letterSpacing: "0.14em",
              color: "#3d2314",
              marginTop: "0.15rem",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            {WEDDING_DATA.groom.parents}
          </p>
          {WEDDING_DATA.groom.grandparents ? (
            <p
              style={{
                fontFamily: "'Jacques Francois', Georgia, serif",
                fontSize: "clamp(0.52rem, 2.2vw, 0.64rem)",
                letterSpacing: "0.08em",
                color: "#78350f",
                marginTop: "0.12rem",
              }}
            >
              Grandson of {WEDDING_DATA.groom.grandparents}
            </p>
          ) : null}
        </motion.div>

        {/* Joining weds with Ornaments */}
        <motion.div
          variants={itemVariant}
          className="flex items-center justify-center gap-1.5 my-1"
          aria-hidden={true}
        >
          <span className="w-7 h-[1px] bg-[#c9a227]/70" />
          <span className="text-[#c9a227] text-[9px]">❖</span>
          <span
            style={{
              fontFamily: "'Great Vibes', 'Parisienne', cursive",
              fontSize: "clamp(1.35rem, 5.5vw, 1.7rem)",
              color: "#7a162b",
              margin: "0 4px",
            }}
          >
            weds
          </span>
          <span className="text-[#c9a227] text-[9px]">❖</span>
          <span className="w-7 h-[1px] bg-[#c9a227]/70" />
        </motion.div>

        {/* 2. Bride & Family (Dr. Shalinee) */}
        <motion.div variants={itemVariant}>
          <p
            style={{
              fontFamily: "'Great Vibes', 'Parisienne', cursive",
              fontSize: "clamp(2.3rem, 9.2vw, 3.1rem)",
              color: "#7a162b",
              fontWeight: 400,
              lineHeight: 1.08,
              letterSpacing: "0.01em",
              textShadow: "0 1px 2px rgba(255,248,235,0.95)",
            }}
          >
            {WEDDING_DATA.bride.name}
          </p>
          <p
            style={{
              fontFamily: "'Jacques Francois', Georgia, serif",
              fontSize: "clamp(0.55rem, 2.3vw, 0.68rem)",
              letterSpacing: "0.14em",
              color: "#3d2314",
              marginTop: "0.15rem",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            {WEDDING_DATA.bride.parents}
          </p>
          {WEDDING_DATA.bride.grandparents ? (
            <p
              style={{
                fontFamily: "'Jacques Francois', Georgia, serif",
                fontSize: "clamp(0.52rem, 2.2vw, 0.64rem)",
                letterSpacing: "0.08em",
                color: "#78350f",
                marginTop: "0.12rem",
              }}
            >
              Granddaughter of {WEDDING_DATA.bride.grandparents}
            </p>
          ) : null}
        </motion.div>

        {/* Venues & Map Trigger Button (Exact Match to Reference Image) */}
        <motion.div variants={itemVariant} className="mt-3">
          <button
            type="button"
            className="sm-ty-btn transition-transform hover:scale-105 active:scale-95"
            onClick={() => setShowModal(true)}
            style={{
              border: "1.5px solid #d4af37",
              color: "#6b1d2e",
              fontFamily: "var(--sm-font-caps)",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              cursor: "pointer",
              background:
                "linear-gradient(135deg, rgba(255,253,248,0.98), rgba(254,247,235,0.95))",
              borderRadius: "9999px",
              alignItems: "center",
              gap: "0.55rem",
              padding: "0.5rem 1.6rem",
              fontSize: "0.74rem",
              fontWeight: 600,
              boxShadow:
                "0 4px 15px rgba(180,130,50,0.18), inset 0 0 0 1px rgba(255,255,255,0.9)",
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
                r="2.4"
                stroke="#c9a227"
                strokeWidth="1.9"
              />
            </svg>
            VENUES &amp; MAP
          </button>
        </motion.div>
      </motion.div>

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

      {/* Made with Love by Special Invites */}
      <a
        href={`https://wa.me/919217104917?text=${encodeURIComponent(
          "Hi, I loved Kunal & Shalinee's wedding invitation and would like to know more!"
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="sm-caps sm-madelove"
      >
        Made with ❤️ for Kunal &amp; Shalinee
      </a>
    </section>
  );
};
