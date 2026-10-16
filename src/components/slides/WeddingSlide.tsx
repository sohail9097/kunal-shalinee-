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
      <motion.video
        className="sm-wed-fw"
        src={WEDDING_DATA.media.wedding.fireworks}
        muted
        loop
        playsInline
        autoPlay
        preload="auto"
        aria-hidden={true}
        initial={false}
        animate={{ opacity: active ? 0.8 : 0 }}
        transition={{ duration: 1.1, ease: EASE_ROYAL, delay: active ? 0.4 : 0 }}
      />

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
        </motion.div>

        {/* Down Arrow for Next Slide */}
        {active && onNext && (
          <motion.button
            type="button"
            onClick={onNext}
            className="mt-6 flex h-10 w-10 items-center justify-center rounded-full border border-[#c9a227]/60 bg-[#4d0d16]/70 text-[#fbf6ec] shadow-lg transition-transform hover:scale-110"
            aria-label="Next slide"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.6 }}
          >
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </motion.button>
        )}
      </div>
    </section>
  );
};
