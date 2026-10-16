import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import confetti from "canvas-confetti";
import { WEDDING_DATA } from "../../data/weddingData";
import { ScratchCard } from "../ScratchCard";
import { CountdownTimer } from "../CountdownTimer";

interface SaveTheDateSlideProps {
  active?: boolean;
  onNext?: () => void;
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const SaveTheDateSlide: React.FC<SaveTheDateSlideProps> = ({
  active = true,
  onNext,
}) => {
  const [isScratched, setIsScratched] = useState(false);
  const [showCountdown, setShowCountdown] = useState(false);
  const [showNextBtn, setShowNextBtn] = useState(false);
  const confettiCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Trigger confetti burst on scratch completion
  const handleScratchComplete = () => {
    setIsScratched(true);
    setShowCountdown(true);

    // Fire royal celebratory confetti
    const colors = WEDDING_DATA.confettiColors;
    try {
      confetti({
        particleCount: 120,
        spread: 85,
        startVelocity: 55,
        origin: { x: 0.5, y: 0.5 },
        colors,
      });

      confetti({
        particleCount: 80,
        spread: 140,
        startVelocity: 35,
        scalar: 0.9,
        origin: { x: 0.5, y: 0.5 },
        colors,
      });

      setTimeout(() => {
        confetti({
          particleCount: 65,
          angle: 60,
          spread: 90,
          startVelocity: 50,
          origin: { x: 0.05, y: 0.65 },
          colors,
        });
        confetti({
          particleCount: 65,
          angle: 120,
          spread: 90,
          startVelocity: 50,
          origin: { x: 0.95, y: 0.65 },
          colors,
        });
      }, 250);
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    if (!isScratched) return;
    const timer = setTimeout(() => {
      setShowNextBtn(true);
    }, 1800);
    return () => clearTimeout(timer);
  }, [isScratched]);

  return (
    <section className="sm-slide sm-std overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.9, ease: EASE }}
        className="relative z-10 mx-auto flex h-full max-w-xl flex-col items-center justify-center px-6 text-center"
      >
        <p className="sm-caps text-[11px] tracking-[0.3em] text-[color:var(--sm-gold-deep)] uppercase">
          Save the Date
        </p>

        {/* Devanagari calligraphy names logo */}
        <img
          src={WEDDING_DATA.media.opening.names}
          alt={`${WEDDING_DATA.bride.hindiName} और ${WEDDING_DATA.groom.hindiName}`}
          className="sm-names-logo"
        />

        {/* Scratch Card */}
        <div className="sm-std-card relative mt-7 w-[80vw] max-w-[420px] overflow-hidden rounded-2xl shadow-xl">
          <ScratchCard
            active={active}
            onCompleteAction={handleScratchComplete}
            label="Scratch for the date"
          >
            <div className="sm-std-face flex min-h-[178px] flex-col items-center justify-center gap-3 px-5 py-7 bg-[#fbf6ec]">
              <p className="sm-caps text-[10px] tracking-[0.26em] text-[color:var(--sm-gold-deep)]">
                We're getting married on
              </p>
              <p className="sm-display text-3xl font-medium text-[color:var(--sm-red-deep)] md:text-4xl">
                25th November 2026
              </p>
              <span className="sm-std-hash sm-display">
                {WEDDING_DATA.hashtag}
              </span>
            </div>
          </ScratchCard>
        </div>

        {/* Countdown Timer Container */}
        <div className="mt-8 flex min-h-[92px] items-start justify-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={
              showCountdown ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }
            }
            transition={{ duration: 0.7, ease: EASE }}
          >
            {showCountdown && (
              <CountdownTimer targetDate={WEDDING_DATA.targetDate} />
            )}
          </motion.div>
        </div>
      </motion.div>

      {/* Next Slide Arrow Button */}
      <motion.button
        type="button"
        aria-label="Next slide"
        className="sm-std-next"
        initial={false}
        animate={{ opacity: showNextBtn && active ? 0.85 : 0 }}
        transition={{ duration: 0.5 }}
        style={{ pointerEvents: showNextBtn && active ? "auto" : "none" }}
        onClick={onNext}
      >
        <svg
          viewBox="0 0 24 24"
          width="26"
          height="26"
          fill="none"
          aria-hidden={true}
        >
          <path
            d="M5 7l7 7 7-7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5 13l7 7 7-7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.button>

      {/* Confetti container fallback canvas */}
      <canvas
        ref={confettiCanvasRef}
        className="pointer-events-none fixed inset-0 z-50 h-full w-full"
        aria-hidden={true}
        style={{ display: "none" }}
      />
    </section>
  );
};
