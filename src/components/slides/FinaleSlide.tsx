import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { WEDDING_DATA } from "../../data/weddingData";
import { CelestialLights } from "../CelestialLights";

interface FinaleSlideProps {
  active?: boolean;
}

const EASE_ROYAL: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeVariant = {
  hidden: { opacity: 0, y: 18 },
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
    <section className="sm-slide sm-ty">
      {/* Night Sky Background */}
      <img
        src={WEDDING_DATA.media.finale.sky}
        alt=""
        className="sm-ty-sky"
        aria-hidden={true}
      />

      {/* Twinkling Celestial Lights */}
      <CelestialLights />

      {/* Royal Floral Canopy */}
      <motion.img
        src={WEDDING_DATA.media.finale.canopy}
        alt=""
        className="sm-ty-canopy"
        aria-hidden={true}
        initial={false}
        animate={{ y: active ? "0%" : "-8%", opacity: active ? 1 : 0 }}
        transition={{ duration: 1.1, ease: EASE_ROYAL }}
      />

      {/* Royal Stage Elevation */}
      <motion.img
        src={WEDDING_DATA.media.finale.stage}
        alt=""
        className="sm-ty-stage"
        aria-hidden={true}
        initial={false}
        animate={{ y: active ? "0%" : "10%", opacity: active ? 1 : 0 }}
        transition={{ duration: 1.1, ease: EASE_ROYAL, delay: 0.15 }}
      />

      {/* Family Lineage & Gracious Presence Note */}
      <motion.div
        className="sm-ty-text"
        initial="hidden"
        animate={active ? "visible" : "hidden"}
        variants={{
          visible: {
            transition: { staggerChildren: 0.09, delayChildren: 0.45 },
          },
        }}
      >
        <motion.p variants={fadeVariant} className="sm-display sm-ty-invite">
          Awaiting for your gracious presence
        </motion.p>

        {/* Bride & Family */}
        <motion.div variants={fadeVariant} className="sm-ty-fam">
          <p className="sm-script sm-ty-famname">{WEDDING_DATA.bride.name}</p>
          <p className="sm-caps sm-ty-famparents">
            {WEDDING_DATA.bride.parents}
          </p>
          {WEDDING_DATA.bride.grandparents ? (
            <p className="sm-caps sm-ty-famgrand">
              Granddaughter of {WEDDING_DATA.bride.grandparents}
            </p>
          ) : null}
        </motion.div>

        {/* weds */}
        <motion.p variants={fadeVariant} className="sm-script sm-ty-famjoin">
          weds
        </motion.p>

        {/* Groom & Family */}
        <motion.div variants={fadeVariant} className="sm-ty-fam">
          <p className="sm-script sm-ty-famname">{WEDDING_DATA.groom.name}</p>
          <p className="sm-caps sm-ty-famparents">
            {WEDDING_DATA.groom.parents}
          </p>
          {WEDDING_DATA.groom.grandparents ? (
            <p className="sm-caps sm-ty-famgrand">
              Grandson of {WEDDING_DATA.groom.grandparents}
            </p>
          ) : null}
        </motion.div>

        {/* Venues & Map Trigger Button */}
        <motion.button
          variants={fadeVariant}
          type="button"
          className="sm-ty-btn"
          onClick={() => setShowModal(true)}
        >
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="none"
            aria-hidden={true}
          >
            <path
              d="M12 21s7-6.5 7-11a7 7 0 10-14 0c0 4.5 7 11 7 11z"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
            <circle
              cx="12"
              cy="10"
              r="2.4"
              stroke="currentColor"
              strokeWidth="1.6"
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

              <p className="sm-caps sm-ty-cardkick">Venues</p>

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
          "Hi, I loved Kunal & Shalini's wedding invitation and would like to know more!"
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="sm-caps sm-madelove"
      >
        Made with ❤️ for Kunal &amp; Shalini
      </a>
    </section>
  );
};
