import React, { useCallback, useEffect, useRef, useState } from "react";

interface ScratchCardProps {
  children: React.ReactNode;
  onCompleteAction?: () => void;
  label?: string;
  active?: boolean;
}

export const ScratchCard: React.FC<ScratchCardProps> = ({
  children,
  onCompleteAction,
  label = "Scratch for the date",
  active = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isScratching = useRef(false);
  const hasScratched = useRef(false);
  const completed = useRef(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const moveCounterRef = useRef(0);
  const [isRevealed, setIsRevealed] = useState(false);

  // Draw royal gold foil cover
  const drawFoil = useCallback(
    (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      ctx.clearRect(0, 0, width, height);
      ctx.save();
      ctx.beginPath();
      if (typeof ctx.roundRect === "function") {
        ctx.roundRect(0, 0, width, height, 12);
      } else {
        ctx.rect(0, 0, width, height);
      }
      ctx.clip();

      // Gold metallic gradient
      const grad = ctx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, "#8a6a12");
      grad.addColorStop(0.32, "#d9b750");
      grad.addColorStop(0.5, "#fff2b8");
      grad.addColorStop(0.64, "#e6c869");
      grad.addColorStop(1, "#856512");

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Delicate foil hatching lines
      ctx.strokeStyle = "rgba(120, 80, 10, 0.14)";
      ctx.lineWidth = 1;
      for (let x = -height; x < width; x += 7) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x + height, height);
        ctx.stroke();
      }
      for (let x = 0; x < width + height; x += 7) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x - height, height);
        ctx.stroke();
      }

      // Ornate inner border
      ctx.strokeStyle = "rgba(124, 80, 10, 0.55)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      if (typeof ctx.roundRect === "function") {
        ctx.roundRect(8, 8, width - 16, height - 16, 8);
      } else {
        ctx.rect(8, 8, width - 16, height - 16);
      }
      ctx.stroke();

      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // Royal seal emblem rings
      const centerY = height / 2 - 28;
      ctx.strokeStyle = "rgba(74, 14, 21, 0.65)";
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.arc(width / 2, centerY, 13, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(width / 2, centerY, 8, 0, 2 * Math.PI);
      ctx.stroke();

      // Label text
      const maxTextWidth = width - 40;
      const upperLabel = label.toUpperCase();
      let fontSize = 14;
      ctx.font = `600 ${fontSize}px "Jacques Francois", Georgia, serif`;
      let textWidth = ctx.measureText(upperLabel).width;
      if (textWidth > maxTextWidth) {
        fontSize = Math.max(9, (fontSize * maxTextWidth) / textWidth);
        ctx.font = `600 ${fontSize}px "Jacques Francois", Georgia, serif`;
      }
      ctx.fillStyle = "rgba(74, 14, 21, 0.92)";
      ctx.fillText(upperLabel, width / 2, height / 2 + 8);

      // Subtitle
      const hint = "drag your finger across";
      let hintSize = 12;
      ctx.font = `italic 400 ${hintSize}px "Playfair Display", Georgia, serif`;
      const hintWidth = ctx.measureText(hint).width;
      if (hintWidth > maxTextWidth) {
        hintSize = Math.max(8, (hintSize * maxTextWidth) / hintWidth);
        ctx.font = `italic 400 ${hintSize}px "Playfair Display", Georgia, serif`;
      }
      ctx.fillStyle = "rgba(74, 14, 21, 0.72)";
      ctx.fillText(hint, width / 2, height / 2 + 30);

      ctx.restore();
    },
    [label]
  );

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = container.offsetWidth;
    const height = container.offsetHeight;
    if (width === 0 || height === 0) return;

    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.setTransform(1, 0, 0, 1, 0, 0); // Clean reset before scale
      ctx.scale(dpr, dpr);
      drawFoil(ctx, width, height);
    }
  }, [drawFoil]);

  // Initial and resize observer handling
  useEffect(() => {
    initCanvas();
    const observer = new ResizeObserver(() => {
      // Only re-initialize if the user hasn't started scratching yet
      if (!completed.current && !hasScratched.current) {
        initCanvas();
      }
    });
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, [initCanvas]);

  // Re-init canvas when active becomes true to account for any layout changes
  useEffect(() => {
    if (active && !completed.current && !hasScratched.current) {
      const timer = setTimeout(() => {
        initCanvas();
      }, 60);
      return () => clearTimeout(timer);
    }
  }, [active, initCanvas]);

  // Check progress percentage
  const checkScratchPercentage = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || completed.current) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    try {
      const { width, height } = canvas;
      if (width === 0 || height === 0) return;
      const imageData = ctx.getImageData(0, 0, width, height).data;
      let cleared = 0;
      let total = 0;

      // Sample pixels across 16px grid
      for (let y = 0; y < height; y += 16) {
        for (let x = 0; x < width; x += 16) {
          const alpha = imageData[(y * width + x) * 4 + 3];
          if (alpha < 50) cleared++;
          total++;
        }
      }

      // Responsive threshold for natural scratch reveal
      if (total > 0 && cleared / total > 0.4) {
        completed.current = true;
        setIsRevealed(true);
        onCompleteAction?.();
      }
    } catch {
      // ignore
    }
  }, [onCompleteAction]);

  // Smooth continuous scratch routine
  const scratch = useCallback(
    (clientX: number, clientY: number, isMove = false) => {
      const canvas = canvasRef.current;
      if (!canvas || completed.current) return;

      const rect = canvas.getBoundingClientRect();
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const x = clientX - rect.left;
      const y = clientY - rect.top;

      hasScratched.current = true;

      ctx.save();
      ctx.globalCompositeOperation = "destination-out";

      // Draw continuous line between points for silky smooth scratching
      if (isMove && lastPointRef.current) {
        ctx.beginPath();
        ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
        ctx.lineTo(x, y);
        ctx.lineWidth = 48;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.stroke();
      }

      // Circular brush stamp
      ctx.beginPath();
      ctx.arc(x, y, 24, 0, 2 * Math.PI);
      ctx.fill();
      ctx.restore();

      lastPointRef.current = { x, y };

      if (isMove) {
        moveCounterRef.current++;
        if (moveCounterRef.current % 7 === 0) {
          checkScratchPercentage();
        }
      }
    },
    [checkScratchPercentage]
  );

  // Pointer and touch event handlers
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handlePointerDown = (e: PointerEvent) => {
      if (!active || completed.current) return;
      isScratching.current = true;
      lastPointRef.current = null;
      try {
        canvas.setPointerCapture(e.pointerId);
      } catch {
        // ignore
      }
      scratch(e.clientX, e.clientY, false);
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isScratching.current || !active || completed.current) return;
      scratch(e.clientX, e.clientY, true);
    };

    const handlePointerUp = (e: PointerEvent) => {
      if (isScratching.current) {
        isScratching.current = false;
        lastPointRef.current = null;
        try {
          if (canvas.hasPointerCapture(e.pointerId)) {
            canvas.releasePointerCapture(e.pointerId);
          }
        } catch {
          // ignore
        }
        checkScratchPercentage();
      }
    };

    const handlePointerCancel = (e: PointerEvent) => {
      if (isScratching.current) {
        isScratching.current = false;
        lastPointRef.current = null;
        try {
          if (canvas.hasPointerCapture(e.pointerId)) {
            canvas.releasePointerCapture(e.pointerId);
          }
        } catch {
          // ignore
        }
        checkScratchPercentage();
      }
    };

    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("pointercancel", handlePointerCancel);

    // Prevent default touch gestures (scrolling) directly on the scratch surface
    const handleTouchPrevent = (e: TouchEvent) => {
      if (!completed.current) {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    canvas.addEventListener("touchstart", handleTouchPrevent, {
      passive: false,
    });
    canvas.addEventListener("touchmove", handleTouchPrevent, {
      passive: false,
    });
    canvas.addEventListener("touchend", handleTouchPrevent, {
      passive: false,
    });

    return () => {
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("pointercancel", handlePointerCancel);
      canvas.removeEventListener("touchstart", handleTouchPrevent);
      canvas.removeEventListener("touchmove", handleTouchPrevent);
      canvas.removeEventListener("touchend", handleTouchPrevent);
    };
  }, [active, scratch, checkScratchPercentage]);

  return (
    <div ref={containerRef} className="relative select-none">
      <div className="relative z-0">{children}</div>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-10 touch-none rounded-[inherit] transition-opacity duration-700 select-none"
        style={{
          opacity: isRevealed ? 0 : 1,
          pointerEvents: isRevealed || !active ? "none" : "auto",
          cursor: "grab",
        }}
        aria-hidden={isRevealed}
      />
    </div>
  );
};
