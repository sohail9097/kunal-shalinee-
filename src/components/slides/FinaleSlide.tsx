import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { WEDDING_DATA } from "../../data/weddingData";
import { CelestialLights } from "../CelestialLights";

interface FinaleSlideProps {
  active?: boolean;
}

const EASE_ROYAL: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeVariant = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_ROYAL },
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
    <section className="sm-slide sm-ty">
      {/* Background Arch & Couple Artwork */}
      <img
        src={WEDDING_DATA.media.finale.sky}
        alt=""
        className="sm-ty-sky"
        aria-hidden={true}
      />

      {/* Gentle Twinkling Celestial Lights */}
      <CelestialLights />

      {/* Family Lineage & Gracious Presence Note - Nicely Centered Inside Inner Arch Space */}
      <motion.div
        className="sm-ty-text"
        initial="hidden"
        animate={active ? "visible" : "hidden"}
        variants={{
          visible: {
            transition: { staggerChildren: 0.08, delayChildren: 0.3 },
          },
        }}
        style={{
          position: "absolute",
          top: "43%",
          left: 0,
          right: 0,
          transform: "translateY(-50%)",
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
          variants={fadeVariant}
          className="sm-display sm-ty-invite"
          style={{
            fontFamily: "'Berkshire Swash', Georgia, serif",
            fontSize: "clamp(1.05rem, 4.2vw, 1.35rem)",
            color: "#7c2d12",
            lineHeight: 1.25,
            marginBottom: "0.35rem",
            textShadow: "0 1px 3px rgba(255,248,235,0.9)",
          }}
        >
          Awaiting for your gracious presence
        </motion.p>

        {/* 1. Groom & Family (Swapped to Top) */}
        <motion.div
          variants={fadeVariant}
          className="sm-ty-fam"
          style={{ marginTop: "0.15rem" }}
        >
          <p
            className="sm-ty-famname"
            style={{
              fontFamily: "'Great Vibes', 'Parisienne', cursive",
              fontSize: "clamp(1.85rem, 7.5vw, 2.35rem)",
              color: "#92400e",
              fontWeight: 400,
              lineHeight: 1.15,
              textShadow: "0 1px 2px rgba(255,248,220,0.95), 0 2px 8px rgba(120,53,15,0.2)",
            }}
          >
            {WEDDING_DATA.groom.name}
          </p>
          <p
            className="sm-caps sm-ty-famparents"
            style={{
              fontFamily: "'Jacques Francois', Georgia, serif",
              fontSize: "clamp(0.55rem, 2.4vw, 0.68rem)",
              letterSpacing: "0.08em",
              color: "#5c3a21",
              marginTop: "0.12rem",
              textTransform: "uppercase",
            }}
          >
            {WEDDING_DATA.groom.parents}
          </p>
          {WEDDING_DATA.groom.grandparents ? (
            <p
              className="sm-caps sm-ty-famgrand"
              style={{
                fontFamily: "'Jacques Francois', Georgia, serif",
                fontSize: "clamp(0.52rem, 2.2vw, 0.64rem)",
                letterSpacing: "0.06em",
                color: "#78350f",
                marginTop: "0.15rem",
              }}
            >
              Grandson of {WEDDING_DATA.groom.grandparents}
            </p>
          ) : null}
        </motion.div>

        {/* weds */}
        <motion.p
          variants={fadeVariant}
          className="sm-ty-famjoin"
          style={{
            fontFamily: "'Great Vibes', 'Parisienne', cursive",
            fontSize: "clamp(1.2rem, 5vw, 1.55rem)",
            color: "#b45309",
            margin: "0.12rem 0",
            textShadow: "0 1px 2px rgba(255,248,220,0.9)",
          }}
        >
          weds
        </motion.p>

        {/* 2. Bride & Family (Swapped to Bottom) */}
        <motion.div
          variants={fadeVariant}
          className="sm-ty-fam"
          style={{ marginTop: "0.1rem" }}
        >
          <p
            className="sm-ty-famname"
            style={{
              fontFamily: "'Great Vibes', 'Parisienne', cursive",
              fontSize: "clamp(1.85rem, 7.5vw, 2.35rem)",
              color: "#92400e",
              fontWeight: 400,
              lineHeight: 1.15,
              textShadow: "0 1px 2px rgba(255,248,220,0.95), 0 2px 8px rgba(120,53,15,0.2)",
            }}
          >
            {WEDDING_DATA.bride.name}
          </p>
          <p
            className="sm-caps sm-ty-famparents"
            style={{
              fontFamily: "'Jacques Francois', Georgia, serif",
              fontSize: "clamp(0.55rem, 2.4vw, 0.68rem)",
              letterSpacing: "0.08em",
              color: "#5c3a21",
              marginTop: "0.12rem",
              textTransform: "uppercase",
            }}
          >
            {WEDDING_DATA.bride.parents}
          </p>
          {WEDDING_DATA.bride.grandparents ? (
            <p
              className="sm-caps sm-ty-famgrand"
              style={{
                fontFamily: "'Jacques Francois', Georgia, serif",
                fontSize: "clamp(0.52rem, 2.2vw, 0.64rem)",
                letterSpacing: "0.06em",
                color: "#78350f",
                marginTop: "0.15rem",
              }}
            >
              Granddaughter of {WEDDING_DATA.bride.grandparents}
            </p>
          ) : null}
        </motion.div>

        {/* Venues & Map Trigger Button */}
        <motion.button
          variants={fadeVariant}
          type="button"
          className="sm-ty-btn"
          onClick={() => setShowModal(true)}
          style={{
            border: "1.5px solid #d97706",
            color: "#78350f",
            fontFamily: "var(--sm-font-caps)",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            cursor: "pointer",
            background:
              "linear-gradient(135deg, rgba(255,252,245,0.95), rgba(254,243,199,0.9))",
            borderRadius: "9999px",
            alignItems: "center",
            gap: "0.5rem",
            marginTop: "0.75rem",
            padding: "0.48rem 1.3rem",
            fontSize: "0.72rem",
            boxShadow:
              "0 4px 14px rgba(120,53,15,0.2), inset 0 0 0 1px rgba(255,255,255,0.8)",
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
              stroke="#d97706"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
            <circle
              cx="12"
              cy="10"
              r="2.4"
              stroke="#d97706"
              strokeWidth="1.8"
            />
          </svg>
          Venues &amp; Map
        </motion.button>
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
