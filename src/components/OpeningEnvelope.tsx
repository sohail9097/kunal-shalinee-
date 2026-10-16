import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { WEDDING_DATA } from "../data/weddingData";

interface OpeningEnvelopeProps {
  onOpenAction: () => void;
  onStartAction?: () => void;
}

const EASE_ROYAL: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const OpeningEnvelope: React.FC<OpeningEnvelopeProps> = ({
  onOpenAction,
  onStartAction,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  const handleClick = () => {
    if (!isOpen) {
      setIsOpen(true);
      onStartAction?.();
    }
  };

  return (
    <AnimatePresence>
      {!isDismissed && (
        <motion.div
          className="sm-env"
          onClick={handleClick}
          initial={{ opacity: 1 }}
          animate={{ opacity: isOpen ? 0 : 1 }}
          transition={{ duration: 0.5, delay: 1.1, ease: "easeInOut" }}
          onAnimationComplete={() => {
            if (isOpen) {
              setIsDismissed(true);
              onOpenAction();
            }
          }}
          style={{
            pointerEvents: isOpen ? "none" : "auto",
            overflow: "hidden",
          }}
          aria-hidden={isOpen}
        >
          {/* Bottom Flap */}
          <motion.div
            className="sm-flap sm-flap--bottom"
            initial={false}
            animate={{ y: isOpen ? "120%" : "0%" }}
            transition={{ duration: 1.4, ease: EASE_ROYAL }}
            style={{ willChange: "transform" }}
          />

          {/* Left Flap */}
          <motion.div
            className="sm-flap sm-flap--left"
            initial={false}
            animate={{ x: isOpen ? "-120%" : "0%" }}
            transition={{ duration: 1.4, ease: EASE_ROYAL }}
            style={{ willChange: "transform" }}
          />

          {/* Right Flap */}
          <motion.div
            className="sm-flap sm-flap--right"
            initial={false}
            animate={{ x: isOpen ? "120%" : "0%" }}
            transition={{ duration: 1.4, ease: EASE_ROYAL }}
            style={{ willChange: "transform" }}
          />

          {/* Top Flap (glides upward smoothly without 3D shadow flipping) */}
          <motion.div
            className="sm-flap sm-flap--top"
            initial={false}
            animate={{ y: isOpen ? "-120%" : "0%" }}
            transition={{ duration: 1.4, ease: EASE_ROYAL }}
            style={{ willChange: "transform" }}
          />

          {/* Wax Seal Layer - Dissolves like golden dust */}
          <motion.div
            className="sm-env-seal-layer"
            initial={false}
            animate={
              isOpen
                ? { opacity: 0, scale: 1.12, y: "-15px" }
                : { opacity: 1, scale: 1, y: "0px" }
            }
            transition={{ duration: 0.75, ease: EASE_ROYAL }}
            style={{ willChange: "transform, opacity" }}
          >
            <img
              src={WEDDING_DATA.media.envelope.seal}
              alt="KS wax seal"
              className="sm-env-seal"
            />
          </motion.div>

          {/* Pulsing Hint */}
          {!isOpen && (
            <motion.div
              className="sm-env-hint sm-caps"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            >
              Tap to open the envelope
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
