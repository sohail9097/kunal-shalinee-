import React from "react";
import { motion } from "motion/react";
import { WEDDING_DATA } from "../../data/weddingData";
import { CalligraphyTitle } from "../CalligraphyTitle";

interface WeddingSlideProps {
  active?: boolean;
  onNext?: () => void;
}

const EASE_ROYAL: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const WeddingSlide: React.FC<WeddingSlideProps> = ({
  active = false,
  onNext,
}) => {
  const event =
    WEDDING_DATA.events.find((e) =>
      e.title.toLowerCase().includes("wedding")
    ) || WEDDING_DATA.events[2];

  return (
    <section className="sm-slide sm-wedding">
      {/* Royal Palace Venue Watercolor Background */}
      <motion.img
        src={WEDDING_DATA.media.wedding.bg}
        alt="Sukrit Royal Palace"
        className="sm-wed-venue"
        aria-hidden={true}
        initial={false}
        animate={{ opacity: active ? 1 : 0, y: active ? "0%" : "4%" }}
        transition={{ duration: 1.2, ease: EASE_ROYAL }}
      />

      {/* Royal Fireworks Video Overlay */}
      {active && (
        <motion.video
          className="sm-wed-fw"
          src={WEDDING_DATA.media.wedding.fireworks}
          muted
          loop
          playsInline
          autoPlay
          preload="none"
          aria-hidden={true}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 0.8, ease: EASE_ROYAL, delay: 0.4 }}
        />
      )}

      {/* Center Event Card Details */}
      <div className="sm-wed-inner">
        {/* Animated Hand-drawn Calligraphy Title */}
        <CalligraphyTitle
          text={event.title}
          active={active}
          className="sm-title sm-title--wedding"
          stroke="#8f4a20"
          fill="#4a2418"
          font="Parisienne, cursive"
          size={56}
          width={420}
          delay={0.55}
        />

        {/* When & Where Sun Badge */}
        <motion.div
          className="sm-when sm-when--sun"
          initial={false}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          transition={{ duration: 0.8, ease: EASE_ROYAL, delay: 1.2 }}
        >
          <p className="sm-caps sm-when-date">{event.date}</p>
          <span className="sm-when-rule" aria-hidden={true} />
          <p className="sm-when-time">{event.time}</p>
          <p className="sm-when-venue">
            <a
              href={event.mapHref}
              target="_blank"
              rel="noreferrer noopener"
              className="hover:underline"
            >
              {event.venueShort}
            </a>
          </p>

          {/* Heartfelt Blessing Text */}
          <p
            className="mt-3.5 mx-auto max-w-[340px] px-2 text-center"
            style={{
              fontFamily: "'Great Vibes', 'Parisienne', cursive",
              fontSize: "clamp(1.4rem, 5.8vw, 1.85rem)",
              color: "#4a2418",
              fontWeight: 400,
              lineHeight: 1.25,
              letterSpacing: "0.02em",
              textShadow: "0 1px 2px rgba(255, 248, 235, 0.8)",
            }}
          >
            Your presence and blessings will make our day truly special.
          </p>
        </motion.div>
      </div>

      {/* Down Arrow for Next Slide (Fixed Center Bottom) */}
      {active && onNext && (
        <motion.button
          type="button"
          onClick={onNext}
          className="sm-cv-down-btn"
          style={{
            background: "rgba(90, 42, 30, 0.85)",
            border: "1.5px solid rgba(201, 162, 39, 0.75)",
            boxShadow: "0 4px 14px rgba(0, 0, 0, 0.45)",
          }}
          aria-label="Next slide"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1.4 }}
        >
          <svg
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden={true}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </motion.button>
      )}
    </section>
  );
};
