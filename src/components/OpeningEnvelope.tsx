import React, { useState } from "react";
import { motion } from "motion/react";
import { WEDDING_DATA } from "../data/weddingData";

interface OpeningEnvelopeProps {
  onOpenAction: () => void;
  onStartAction?: () => void;
}

const EASE_CUBIC: [number, number, number, number] = [0.65, 0, 0.35, 1];

export const OpeningEnvelope: React.FC<OpeningEnvelopeProps> = ({
  onOpenAction,
  onStartAction,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    if (!isOpen) {
      setIsOpen(true);
      onStartAction?.();
    }
  };

  return (
    <div
      className="sm-env"
      onClick={handleClick}
      style={{ pointerEvents: isOpen ? "none" : "auto" }}
      aria-hidden={isOpen}
    >
      {/* Bottom Flap */}
      <motion.div
        className="sm-flap sm-flap--bottom"
        initial={false}
        animate={{ y: isOpen ? "135%" : "0%" }}
        transition={{ duration: 2, ease: EASE_CUBIC }}
      />

      {/* Left Flap */}
      <motion.div
        className="sm-flap sm-flap--left"
        initial={false}
        animate={{ y: isOpen ? "135%" : "0%" }}
        transition={{ duration: 2, ease: EASE_CUBIC }}
      />

      {/* Right Flap */}
      <motion.div
        className="sm-flap sm-flap--right"
        initial={false}
        animate={{ y: isOpen ? "135%" : "0%" }}
        transition={{ duration: 2, ease: EASE_CUBIC }}
      />

      {/* Top Flap (folds backward) */}
      <motion.div
        className="sm-flap sm-flap--top"
        initial={false}
        animate={
          isOpen
            ? { rotateX: -172, y: "-125%" }
            : { rotateX: 0, y: "0%" }
        }
        transition={{ duration: 3, ease: EASE_CUBIC }}
        onAnimationComplete={() => {
          if (isOpen) {
            onOpenAction();
          }
        }}
      />

      {/* Wax Seal Layer */}
      <motion.div
        className="sm-env-seal-layer"
        initial={false}
        animate={
          isOpen
            ? { rotateX: -172, y: "-125%" }
            : { rotateX: 0, y: "0%" }
        }
        transition={{ duration: 3, ease: EASE_CUBIC }}
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
    </div>
  );
};
