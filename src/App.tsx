import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, MotionConfig } from "motion/react";
import { WEDDING_DATA } from "./data/weddingData";
import { OpeningEnvelope } from "./components/OpeningEnvelope";
import { GanpatiGate } from "./components/GanpatiGate";
import { SaveTheDateSlide } from "./components/slides/SaveTheDateSlide";
import { CarnivalSlide } from "./components/slides/CarnivalSlide";
import { MehndiSlide } from "./components/slides/MehndiSlide";
import { WeddingSlide } from "./components/slides/WeddingSlide";
import { FinaleSlide } from "./components/slides/FinaleSlide";
import { AudioPlayer } from "./components/AudioPlayer";

const SLIDE_COUNT = 5;

// Color accents for the swipe down hint on each slide
const HINT_COLORS: Record<number, string> = {
  0: "#856512",
  1: "#7a1226",
  2: "#2d6a4f",
  3: "#f3e9d6",
  4: "#e7c86b",
};

const HINT_SHADOWS: Record<number, string> = {
  1: "drop-shadow(0 0 5px rgba(255,248,236,0.9))",
  2: "drop-shadow(0 0 5px rgba(240,253,244,0.9))",
  3: "drop-shadow(0 0 5px rgba(255,241,214,0.85))",
};

export default function App() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [isHaldiOpen, setIsHaldiOpen] = useState(false);
  const [isEnvelopeClosed, setIsEnvelopeClosed] = useState(true);
  const [ganpatiRevealed, setGanpatiRevealed] = useState(false);
  const [readyForDeck, setReadyForDeck] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [showIdleHint, setShowIdleHint] = useState(false);

  const isTransitioning = useRef(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const userStartedAudio = useRef(false);

  // Play audio helper
  const startAudio = useCallback(() => {
    setGanpatiRevealed(true);
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.6;
      audio
        .play()
        .then(() => {
          setIsPlayingAudio(true);
          userStartedAudio.current = true;
        })
        .catch(() => {
          // Autoplay policy might require second interaction
        });
    }
  }, []);

  const toggleAudio = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio
        .play()
        .then(() => {
          setIsPlayingAudio(true);
          userStartedAudio.current = true;
        })
        .catch(() => {});
    } else {
      audio.pause();
      setIsPlayingAudio(false);
    }
  }, []);

  // Handle visibility & focus pause/resume
  useEffect(() => {
    const handlePause = () => {
      if (userStartedAudio.current && audioRef.current) {
        audioRef.current.pause();
        setIsPlayingAudio(false);
      }
    };
    const handleResume = () => {
      if (userStartedAudio.current && !document.hidden && audioRef.current) {
        audioRef.current
          .play()
          .then(() => setIsPlayingAudio(true))
          .catch(() => {});
      }
    };
    const handleVisibility = () => {
      if (document.hidden) handlePause();
      else handleResume();
    };

    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("blur", handlePause);
    window.addEventListener("focus", handleResume);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("blur", handlePause);
      window.removeEventListener("focus", handleResume);
    };
  }, []);

  // Slide navigation with debouncing
  const changeSlide = useCallback((direction: number) => {
    setSlideIndex((curr) => {
      const next = Math.min(SLIDE_COUNT - 1, Math.max(0, curr + direction));
      if (next === 0) {
        setIsHaldiOpen(false);
      }
      if (next === 1 && curr >= 2) {
        setIsHaldiOpen(true);
      }
      return next;
    });
  }, []);

  const navigateDeck = useCallback(
    (direction: number) => {
      if (isEnvelopeClosed || !readyForDeck || isTransitioning.current) return;

      // Haldi slide gate logic: scrolling or swiping down opens the Haldi doors instead of skipping to Wedding!
      if (slideIndex === 1 && !isHaldiOpen) {
        if (direction > 0) {
          setIsHaldiOpen(true);
          isTransitioning.current = true;
          window.setTimeout(() => {
            isTransitioning.current = false;
          }, 1250);
          return;
        } else if (direction < 0) {
          isTransitioning.current = true;
          changeSlide(-1);
          window.setTimeout(() => {
            isTransitioning.current = false;
          }, 1150);
          return;
        }
      }

      isTransitioning.current = true;
      changeSlide(direction);
      window.setTimeout(() => {
        isTransitioning.current = false;
      }, 750);
    },
    [changeSlide, isEnvelopeClosed, readyForDeck, slideIndex, isHaldiOpen]
  );

  // Prevent background scroll
  useEffect(() => {
    const orig = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = orig;
    };
  }, []);

  // Global mouse wheel, touch and keyboard listeners
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 8) return;
      navigateDeck(e.deltaY > 0 ? 1 : -1);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "ArrowDown" ||
        e.key === "PageDown" ||
        e.key === " "
      ) {
        e.preventDefault();
        navigateDeck(1);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        navigateDeck(-1);
      }
    };

    let startY = 0;
    let touchOnScratchCard = false;
    const handleTouchStart = (e: TouchEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target?.closest?.(".sm-std-card") ||
        target?.tagName?.toLowerCase() === "canvas"
      ) {
        touchOnScratchCard = true;
        return;
      }
      touchOnScratchCard = false;
      startY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (touchOnScratchCard) {
        touchOnScratchCard = false;
        return;
      }
      const delta = startY - e.changedTouches[0].clientY;
      if (Math.abs(delta) > 45) {
        navigateDeck(delta > 0 ? 1 : -1);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [navigateDeck]);

  // Idle hint timer
  useEffect(() => {
    setShowIdleHint(false);
    if (isEnvelopeClosed || !readyForDeck) return;

    const timer = window.setTimeout(() => {
      setShowIdleHint(true);
    }, 2800);

    return () => window.clearTimeout(timer);
  }, [slideIndex, isEnvelopeClosed, readyForDeck]);

  const showHint =
    showIdleHint &&
    !isEnvelopeClosed &&
    readyForDeck &&
    slideIndex >= 1 &&
    slideIndex <= SLIDE_COUNT - 2 &&
    !(slideIndex === 1 && isHaldiOpen) &&
    slideIndex !== 2; // Mehndi slide has its own next button

  const hintColor = HINT_COLORS[slideIndex] || "#7c0f1c";
  const hintFilter = HINT_SHADOWS[slideIndex];

  return (
    <MotionConfig reducedMotion="user">
      <div className="sm-root">
        {/* Background Royal Temple Watercolor for STD Slide */}
        <motion.div
          className="sm-templebg"
          aria-hidden={true}
          initial={false}
          animate={{ opacity: slideIndex === 0 ? 1 : 0 }}
          transition={{ duration: 1.05, ease: [0.4, 0, 0.2, 1] }}
        >
          <img
            src={WEDDING_DATA.media.opening.templeWatercolor}
            alt=""
          />
        </motion.div>

        {/* Slide Deck Layers */}
        <div className="sm-deck">
          {/* Slide 0: Save the Date */}
          <motion.div
            className="sm-layer"
            initial={false}
            animate={{
              opacity: slideIndex === 0 ? 1 : 0,
            }}
            transition={{ duration: 0.65, ease: [0.25, 1, 0.5, 1] }}
            style={{
              pointerEvents: slideIndex === 0 ? "auto" : "none",
              display: Math.abs(slideIndex - 0) <= 1 ? "block" : "none",
              willChange: "opacity",
            }}
            aria-hidden={slideIndex !== 0}
          >
            <SaveTheDateSlide
              active={slideIndex === 0 && !isEnvelopeClosed && readyForDeck}
              onNext={() => navigateDeck(1)}
            />
          </motion.div>

          {/* Slide 1: Haldi Celebration */}
          <motion.div
            className="sm-layer"
            initial={false}
            animate={{
              opacity: slideIndex === 1 ? 1 : 0,
            }}
            transition={{ duration: 0.65, ease: [0.25, 1, 0.5, 1] }}
            style={{
              pointerEvents: slideIndex === 1 ? "auto" : "none",
              display: Math.abs(slideIndex - 1) <= 1 ? "block" : "none",
              willChange: "opacity",
            }}
            aria-hidden={slideIndex !== 1}
          >
            <CarnivalSlide
              active={slideIndex === 1 && !isEnvelopeClosed && readyForDeck}
              isOpen={isHaldiOpen}
              onOpen={() => setIsHaldiOpen(true)}
              onNext={() => navigateDeck(1)}
            />
          </motion.div>

          {/* Slide 2: Mehndi & Sangeet Celebration */}
          <motion.div
            className="sm-layer"
            initial={false}
            animate={{
              opacity: slideIndex === 2 ? 1 : 0,
            }}
            transition={{ duration: 0.65, ease: [0.25, 1, 0.5, 1] }}
            style={{
              pointerEvents: slideIndex === 2 ? "auto" : "none",
              display: Math.abs(slideIndex - 2) <= 1 ? "block" : "none",
              willChange: "opacity",
            }}
            aria-hidden={slideIndex !== 2}
          >
            <MehndiSlide
              active={slideIndex === 2 && !isEnvelopeClosed && readyForDeck}
              onNext={() => navigateDeck(1)}
            />
          </motion.div>

          {/* Slide 3: Wedding */}
          <motion.div
            className="sm-layer"
            initial={false}
            animate={{
              opacity: slideIndex === 3 ? 1 : 0,
            }}
            transition={{ duration: 0.65, ease: [0.25, 1, 0.5, 1] }}
            style={{
              pointerEvents: slideIndex === 3 ? "auto" : "none",
              display: Math.abs(slideIndex - 3) <= 1 ? "block" : "none",
              willChange: "opacity",
            }}
            aria-hidden={slideIndex !== 3}
          >
            <WeddingSlide
              active={slideIndex === 3 && !isEnvelopeClosed && readyForDeck}
              onNext={() => navigateDeck(1)}
            />
          </motion.div>

          {/* Slide 4: Finale & Lineage */}
          <motion.div
            className="sm-layer"
            initial={false}
            animate={{
              opacity: slideIndex === 4 ? 1 : 0,
            }}
            transition={{ duration: 0.65, ease: [0.25, 1, 0.5, 1] }}
            style={{
              pointerEvents: slideIndex === 4 ? "auto" : "none",
              display: Math.abs(slideIndex - 4) <= 1 ? "block" : "none",
              willChange: "opacity",
            }}
            aria-hidden={slideIndex !== 4}
          >
            <FinaleSlide
              active={slideIndex === 4 && !isEnvelopeClosed && readyForDeck}
            />
          </motion.div>

          {/* Swipe Down Floating Indicator */}
          <motion.button
            type="button"
            onClick={() => navigateDeck(1)}
            aria-label="Swipe to next chapter"
            className="sm-hint"
            initial={false}
            animate={{ opacity: showHint ? 0.85 : 0 }}
            transition={{ duration: 0.4 }}
            style={{
              pointerEvents: showHint ? "auto" : "none",
              color: hintColor,
              filter: hintFilter || undefined,
            }}
          >
            <span className="sm-hint-label sm-caps">
              {slideIndex === 1 && !isHaldiOpen ? "Tap to open" : "Swipe down"}
            </span>
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              aria-hidden={true}
            >
              <path
                d="M6 9l6 6 6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.button>
        </div>

        {/* Slide Progress Dots (Left / Top) */}
        {!isEnvelopeClosed && readyForDeck && (
          <div className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-2">
            {[0, 1, 2, 3, 4, 5].map((idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  if (idx === 1 && slideIndex !== 1) {
                    setIsHaldiOpen(false);
                  }
                  setSlideIndex(idx);
                }}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  slideIndex === idx
                    ? "w-7 bg-[#c9a227] shadow-md shadow-[#c9a227]/40"
                    : "w-2.5 bg-[#4d0d16]/30 hover:bg-[#c9a227]/60"
                }`}
              />
            ))}
          </div>
        )}

        {/* Ganpati Gate Opening Video Portal */}
        <GanpatiGate
          reveal={ganpatiRevealed}
          onFinishAction={() => setReadyForDeck(true)}
        />

        {/* 3D Wax Seal Envelope Entrance */}
        <OpeningEnvelope
          onOpenAction={() => setIsEnvelopeClosed(false)}
          onStartAction={startAudio}
        />

        {/* Floating Audio Soundtrack Controller */}
        {!isEnvelopeClosed && (
          <AudioPlayer
            audioRef={audioRef}
            isPlaying={isPlayingAudio}
            onTogglePlay={toggleAudio}
          />
        )}

        {/* Background Wedding Music Audio Element */}
        <audio
          ref={audioRef}
          src={WEDDING_DATA.media.opening.song}
          loop
          preload="auto"
        />
      </div>
    </MotionConfig>
  );
}
