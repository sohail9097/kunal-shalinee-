import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { WEDDING_DATA } from "../data/weddingData";

interface GanpatiGateProps {
  reveal?: boolean;
  onFinishAction: () => void;
}

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

    const timer = setTimeout(() => {
      setIsPlaying(true);
      const vid = videoRef.current;
      if (vid) {
        vid.playbackRate = 1;
        vid.play().catch(() => {
          // If video fails to autoplay, still allow it to progress smoothly
          setTimeout(handleFinish, 3000);
        });
      }
      // Safety timeout in case video event doesn't trigger
      setTimeout(handleFinish, 8800);
    }, 300);

    return () => clearTimeout(timer);
  }, [reveal]);

  return (
    <AnimatePresence>
      {!isDismissed && (
        <motion.div
          className="sm-opengate"
          initial={{ scale: 0.72, opacity: 0 }}
          animate={{ scale: reveal ? 1 : 0.72, opacity: reveal ? 1 : 0 }}
          exit={{ opacity: 0 }}
          transition={{
            scale: { duration: 1.5, ease: [0.22, 1, 0.36, 1] },
            opacity: { duration: 1.2, ease: [0.4, 0, 0.2, 1] },
          }}
          style={{ pointerEvents: "auto" }}
          onClick={handleFinish}
        >
          {/* Poster Image */}
          <img
            src={WEDDING_DATA.media.opening.ganpatiPoster}
            alt="Shree Ganeshaya Namah"
            className="sm-opengate-media"
            fetchPriority="high"
            aria-hidden={true}
            style={{ opacity: isPlaying ? 0 : 1 }}
          />

          {/* Opening Video */}
          <video
            ref={videoRef}
            className="sm-opengate-media"
            src={WEDDING_DATA.media.opening.ganpatiVideo}
            poster={WEDDING_DATA.media.opening.ganpatiPoster}
            muted
            playsInline
            preload="auto"
            onEnded={handleFinish}
            style={{ opacity: isPlaying ? 1 : 0 }}
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
