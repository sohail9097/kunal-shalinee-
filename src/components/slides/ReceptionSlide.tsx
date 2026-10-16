import React from "react";
import { motion } from "motion/react";
import { WEDDING_DATA } from "../../data/weddingData";
import { CocktailArch } from "../CocktailArch";

interface ReceptionSlideProps {
  active?: boolean;
  onNext?: () => void;
}

const EASE_CUBIC: [number, number, number, number] = [0.22, 1, 0.36, 1];
const HAND_TIMES = [0, 0.42, 0.54, 1.8];

const textVariant = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE_CUBIC },
  },
};

export const ReceptionSlide: React.FC<ReceptionSlideProps> = ({
  active = false,
  onNext,
}) => {
  const event =
    WEDDING_DATA.events.find((e) =>
      e.title.toLowerCase().includes("reception")
    ) || WEDDING_DATA.events[3];

  return (
    <section className="sm-slide sm-cocktail">
      {/* Night Atmosphere Background */}
      <img
        src={WEDDING_DATA.media.cocktail.bg}
        alt=""
        className="sm-cocktail-bg"
        aria-hidden={true}
      />

      {/* Clinking Champagne Left Hand */}
      <motion.img
        src={WEDDING_DATA.media.cocktail.handLeft}
        alt=""
        aria-hidden={true}
        className="sm-cocktail-hand sm-cocktail-hand--l"
        initial={false}
        animate={
          active
            ? { x: ["-100%", "2%", "2%", "-115%"], opacity: [1, 1, 1, 1] }
            : { x: "-100%", opacity: 0 }
        }
        transition={{
          duration: 2.4,
          times: HAND_TIMES,
          ease: EASE_CUBIC,
        }}
      />

      {/* Clinking Champagne Right Hand */}
      <motion.img
        src={WEDDING_DATA.media.cocktail.handRight}
        alt=""
        aria-hidden={true}
        className="sm-cocktail-hand sm-cocktail-hand--r"
        initial={false}
        animate={
          active
            ? { x: ["100%", "2%", "2%", "115%"], opacity: [1, 1, 1, 1] }
            : { x: "100%", opacity: 0 }
        }
        transition={{
          duration: 2.4,
          times: HAND_TIMES,
          ease: EASE_CUBIC,
        }}
      />

      {/* Golden Geometric Reception Archway */}
      <motion.div
        className="sm-cocktail-archwrap"
        initial={false}
        animate={{ opacity: active ? 1 : 0 }}
        transition={{
          duration: 0.8,
          ease: EASE_CUBIC,
          delay: active ? 2 : 0,
        }}
      >
        <CocktailArch />
      </motion.div>

      {/* Reception Details */}
      <motion.div
        className="sm-cocktail-text"
        initial="hidden"
        animate={active ? "visible" : "hidden"}
        variants={{
          visible: {
            transition: { staggerChildren: 0.14, delayChildren: 2.1 },
          },
        }}
      >
        <motion.h2 variants={textVariant} className="sm-cocktail-title">
          {event.title}
        </motion.h2>

        <motion.div
          variants={textVariant}
          className="sm-cocktail-rule"
          aria-hidden={true}
        >
          <span />
          ◆
          <span />
        </motion.div>

        <motion.p variants={textVariant} className="sm-cocktail-when">
          {event.date} <span className="sm-cocktail-sep">|</span> {event.time}
        </motion.p>

        <motion.a
          variants={textVariant}
          className="sm-cocktail-venue"
          href={event.mapHref}
          target="_blank"
          rel="noreferrer"
        >
          <svg
            viewBox="0 0 24 24"
            width="14"
            height="14"
            aria-hidden={true}
            fill="currentColor"
          >
            <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
          </svg>
          {event.venueShort}
        </motion.a>
      </motion.div>

      {/* Couple in Evening Attire */}
      <motion.img
        src={WEDDING_DATA.media.cocktail.couple}
        alt="Shalini and Kunal at the Reception"
        className="sm-cocktail-group"
        initial={false}
        animate={{ opacity: active ? 1 : 0, y: active ? "0%" : "10%" }}
        transition={{
          duration: 0.9,
          ease: EASE_CUBIC,
          delay: active ? 2.2 : 0,
        }}
      />

      {/* Down Navigation Button */}
      {active && onNext && (
        <motion.button
          type="button"
          onClick={onNext}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 flex h-10 w-10 items-center justify-center rounded-full border border-[#c9a227]/60 bg-[#4d0d16]/70 text-[#fbf6ec] shadow-lg transition-transform hover:scale-110"
          aria-label="Next slide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 2.6 }}
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
    </section>
  );
};
