import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { WEDDING_DATA } from "../data/weddingData";

interface GanpatiGateProps {
  reveal?: boolean;
  onFinishAction: () => void;
}

const EASE_ROYAL: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const GanpatiGate: React.FC<GanpatiGateProps> = ({
  reveal = true,
  onFinishAction,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const triggered = useRef(false);
  const finished = useRef(false);

  const handleFinish = () => {
    if (!finished.current) {
      finished.current = true;
      setIsDismissed(true);
      onFinishAction();
    }
  };

  useEffect(() => {
    if (!reveal || triggered.current) return;
    triggered.current = true;

    // Start video playback seamlessly as soon as envelope is tapped
    const vid = videoRef.current;
    if (vid) {
      vid.playbackRate = 1;
      vid
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          setTimeout(handleFinish, 3000);
        });
    }

    // Safety timeout in case video event doesn't trigger
    const safetyTimer = setTimeout(handleFinish, 8800);
    return () => clearTimeout(safetyTimer);
  }, [reveal]);

  return (
    <AnimatePresence>
      {!isDismissed && (
        <motion.div
          className="sm-opengate"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: 0.85, ease: EASE_ROYAL },
          }}
          style={{ pointerEvents: "auto" }}
          onClick={handleFinish}
        >
          {/* Poster Image (Smooth crossfade) */}
          <img
            src={WEDDING_DATA.media.opening.ganpatiPoster}
            alt="Shree Ganeshaya Namah"
            className="sm-opengate-media"
            fetchPriority="high"
            aria-hidden={true}
            style={{
              opacity: isPlaying ? 0 : 1,
              transition: "opacity 0.75s ease-in-out",
            }}
          />

          {/* Opening Video (Smooth fade in without sudden jerk) */}
          <video
            ref={videoRef}
            className="sm-opengate-media"
            src={WEDDING_DATA.media.opening.ganpatiVideo}
            poster={WEDDING_DATA.media.opening.ganpatiPoster}
            muted
            playsInline
            preload="auto"
            onEnded={handleFinish}
            style={{
              opacity: isPlaying ? 1 : 0,
              transition: "opacity 0.75s ease-in-out",
            }}
          />

          {/* Skip / Continue Hint */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleFinish();
            }}
            className="absolute bottom-6 right-6 z-50 rounded-full border border-[color:var(--sm-gold)] bg-black/40 px-4 py-1.5 text-xs tracking-wider text-[color:var(--sm-gold-light)] backdrop-blur-md transition-opacity hover:opacity-100 opacity-80"
          >
            Enter ➔
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
