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

      {/* Family Lineage & Gracious Presence Note - Fixed in Center Cream Space */}
      <motion.div
        className="sm-ty-text"
        initial={{ opacity: 0, x: "-50%", y: 20 }}
        animate={
          active
            ? { opacity: 1, x: "-50%", y: 0 }
            : { opacity: 0, x: "-50%", y: 20 }
        }
        transition={{ duration: 0.8, ease: EASE_ROYAL }}
        style={{
          position: "absolute",
          left: "50%",
          top: "21%",
          width: "78%",
          maxWidth: "380px",
          textAlign: "center",
          zIndex: 22,
          pointerEvents: "auto",
        }}
      >
        {/* Gracious Presence Header */}
        <p
          className="sm-display sm-ty-invite"
          style={{
            fontFamily: "'Berkshire Swash', Georgia, serif",
            fontSize: "clamp(1.05rem, 4.3vw, 1.35rem)",
            color: "#7c2d12",
            lineHeight: 1.25,
            marginBottom: "0.25rem",
            textShadow: "0 1px 3px rgba(255,248,235,0.9)",
          }}
        >
          Awaiting for your gracious presence
        </p>

        {/* Decorative Lotus Divider beneath heading */}
        <div
          className="flex items-center justify-center gap-2 mt-1 mb-2"
          aria-hidden={true}
        >
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#c9a227]" />
          <svg
            viewBox="0 0 24 16"
            className="w-5 h-3 text-[#c9a227]"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
          >
            <path d="M12 2c-1.5 3-3 6.5-3 9.5 1 .5 2 .8 3 .8s2-.3 3-.8c0-3-1.5-6.5-3-9.5z" />
            <path d="M12 11.5c-2.5 0-4.5-1.2-6-3.2 1.5 3.5 3.5 5 6 5s4.5-1.5 6-5c-1.5 2-3.5 3.2-6 3.2z" />
          </svg>
          <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#c9a227]" />
        </div>

        {/* 1. Groom & Family */}
        <div className="sm-ty-fam" style={{ marginTop: "0.2rem" }}>
          <p
            className="sm-ty-famname"
            style={{
              fontFamily: "'Great Vibes', 'Parisienne', cursive",
              fontSize: "clamp(2rem, 8.2vw, 2.6rem)",
              color: "#781d28",
              fontWeight: 400,
              lineHeight: 1.15,
              textShadow:
                "0 1px 2px rgba(255,248,220,0.95), 0 2px 8px rgba(120,53,15,0.15)",
            }}
          >
            {WEDDING_DATA.groom.name}
          </p>
          <p
            className="sm-caps sm-ty-famparents"
            style={{
              fontFamily: "'Jacques Francois', Georgia, serif",
              fontSize: "clamp(0.56rem, 2.45vw, 0.7rem)",
              letterSpacing: "0.12em",
              color: "#4a2418",
              marginTop: "0.2rem",
              textTransform: "uppercase",
            }}
          >
            {WEDDING_DATA.groom.parents}
          </p>
        </div>

        {/* 2. weds with floral star accents */}
        <div
          className="flex items-center justify-center gap-2 my-1.5"
          aria-hidden={true}
        >
          <div className="h-[1px] w-9 bg-gradient-to-r from-transparent to-[#c9a227]/80" />
          <span className="text-[#c9a227] text-[9px]">❖</span>
          <span
            style={{
              fontFamily: "'Great Vibes', 'Parisienne', cursive",
              fontSize: "clamp(1.3rem, 5.4vw, 1.65rem)",
              color: "#781d28",
              margin: "0 0.2rem",
              textShadow: "0 1px 2px rgba(255,248,220,0.9)",
            }}
          >
            weds
          </span>
          <span className="text-[#c9a227] text-[9px]">❖</span>
          <div className="h-[1px] w-9 bg-gradient-to-l from-transparent to-[#c9a227]/80" />
        </div>

        {/* 3. Bride & Family */}
        <div className="sm-ty-fam" style={{ marginTop: "0.1rem" }}>
          <p
            className="sm-ty-famname"
            style={{
              fontFamily: "'Great Vibes', 'Parisienne', cursive",
              fontSize: "clamp(2rem, 8.2vw, 2.6rem)",
              color: "#781d28",
              fontWeight: 400,
              lineHeight: 1.15,
              textShadow:
                "0 1px 2px rgba(255,248,220,0.95), 0 2px 8px rgba(120,53,15,0.15)",
            }}
          >
            {WEDDING_DATA.bride.name}
          </p>
          <p
            className="sm-caps sm-ty-famparents"
            style={{
              fontFamily: "'Jacques Francois', Georgia, serif",
              fontSize: "clamp(0.56rem, 2.45vw, 0.7rem)",
              letterSpacing: "0.12em",
              color: "#4a2418",
              marginTop: "0.2rem",
              textTransform: "uppercase",
            }}
          >
            {WEDDING_DATA.bride.parents}
          </p>
        </div>

        {/* 4. Venues & Map Trigger Button */}
        <button
          type="button"
          className="sm-ty-btn"
          onClick={() => setShowModal(true)}
          style={{
            border: "1.5px solid #d4a340",
            color: "#5c2d12",
            fontFamily: "'Jacques Francois', Georgia, serif",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            cursor: "pointer",
            background:
              "linear-gradient(135deg, rgba(255,252,245,0.98), rgba(254,243,199,0.92))",
            borderRadius: "9999px",
            alignItems: "center",
            gap: "0.5rem",
            marginTop: "1.05rem",
            padding: "0.52rem 1.45rem",
            fontSize: "0.74rem",
            fontWeight: 600,
            boxShadow:
              "0 4px 14px rgba(120,53,15,0.18), inset 0 0 0 1px rgba(255,255,255,0.8)",
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
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <circle
              cx="12"
              cy="10"
              r="2.4"
              stroke="#c9a227"
              strokeWidth="2"
            />
          </svg>
          Venues &amp; Map
        </button>
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

      {/* Made with Love footer */}
      <a
        href={`https://wa.me/919217104917?text=${encodeURIComponent(
          "Hi, I loved Kunal & Shalinee's wedding invitation and would like to know more!"
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="sm-caps sm-madelove flex items-center justify-center gap-2"
      >
        <span className="text-[#c9a227] text-[8px] opacity-75">— ❖ —</span>
        <span>Made with ❤️ for Kunal &amp; Shalinee</span>
        <span className="text-[#c9a227] text-[8px] opacity-75">— ❖ —</span>
      </a>
    </section>
  );
};
