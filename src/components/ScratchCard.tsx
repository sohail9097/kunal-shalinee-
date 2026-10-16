import React, { useCallback, useEffect, useRef, useState } from "react";

interface ScratchCardProps {
  children: React.ReactNode;
  onCompleteAction?: () => void;
  label?: string;
  active?: boolean;
  revealed?: boolean;
}

export const ScratchCard: React.FC<ScratchCardProps> = ({
  children,
  onCompleteAction,
  label = "Scratch to reveal",
  active = true,
  revealed = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isScratching = useRef(false);
  const completed = useRef(false);
  const hasDrawnFoil = useRef(false);
  const lastSize = useRef({ width: 0, height: 0 });
  const lastPos = useRef<{ x: number; y: number } | null>(null);
  const moveCounter = useRef(0);
  const tapTimes = useRef<number[]>([]);
  const [isRevealed, setIsRevealed] = useState(false);

  const effectiveRevealed = revealed || isRevealed;

  useEffect(() => {
    if (revealed) {
      completed.current = true;
      setIsRevealed(true);
    }
  }, [revealed]);

  // Metallic gold foil drawing
  const drawFoil = useCallback(
    (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      ctx.clearRect(0, 0, width, height);
      ctx.save();
      ctx.beginPath();
      if (typeof ctx.roundRect === "function") {
        ctx.roundRect(0, 0, width, height, 14);
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
        ctx.roundRect(8, 8, width - 16, height - 16, 9);
      } else {
        ctx.rect(8, 8, width - 16, height - 16);
      }
      ctx.stroke();

      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // Royal seal emblem rings
      const centerY = height / 2 - 28;
      ctx.strokeStyle = "rgba(74, 14, 21, 0.6)";
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.arc(width / 2, centerY, 12, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(width / 2, centerY, 7, 0, 2 * Math.PI);
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
      ctx.fillStyle = "rgba(74, 14, 21, 0.9)";
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
      ctx.fillStyle = "rgba(74, 14, 21, 0.7)";
      ctx.fillText(hint, width / 2, height / 2 + 30);

      ctx.restore();
    },
    [label]
  );

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const width = container.offsetWidth;
    const height = container.offsetHeight;
    if (width === 0 || height === 0) return;

    // Do not reset canvas if already completed or if size hasn't changed meaningfully
    if (completed.current) return;
    if (
      hasDrawnFoil.current &&
      Math.abs(lastSize.current.width - width) < 4 &&
      Math.abs(lastSize.current.height - height) < 4
    ) {
      return;
    }

    lastSize.current = { width, height };
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (ctx) {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      drawFoil(ctx, width, height);
      hasDrawnFoil.current = true;
    }
  }, [drawFoil]);

  useEffect(() => {
    initCanvas();
    const timer = setTimeout(initCanvas, 150);
    const observer = new ResizeObserver(() => {
      if (!completed.current && !isScratching.current) {
        initCanvas();
      }
    });
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [initCanvas, active]);

  const getCoordinates = useCallback(
    (clientX: number, clientY: number): { x: number; y: number } | null => {
      const canvas = canvasRef.current;
      if (!canvas) return null;
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return null;
      return {
        x: clientX - rect.left,
        y: clientY - rect.top,
      };
    },
    []
  );

  const drawScratchLine = useCallback((x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas || completed.current) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    ctx.save();
    ctx.globalCompositeOperation = "destination-out";
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 48;

    if (lastPos.current) {
      ctx.beginPath();
      ctx.moveTo(lastPos.current.x, lastPos.current.y);
      ctx.lineTo(x, y);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.arc(x, y, 24, 0, 2 * Math.PI);
      ctx.fill();
    }
    ctx.restore();

    lastPos.current = { x, y };
  }, []);

  const revealCard = useCallback(() => {
    if (completed.current) return;
    completed.current = true;
    setIsRevealed(true);
    onCompleteAction?.();
  }, [onCompleteAction]);

  const checkScratchPercentage = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || completed.current) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const { width, height } = canvas;
    if (width === 0 || height === 0) return;

    try {
      const imageData = ctx.getImageData(0, 0, width, height).data;
      let cleared = 0;
      let total = 0;

      // Sample pixels across a 16px grid
      for (let y = 0; y < height; y += 16) {
        for (let x = 0; x < width; x += 16) {
          const alpha = imageData[(y * width + x) * 4 + 3];
          if (alpha < 60) cleared++;
          total++;
        }
      }

      // 35% is plenty to read the date clearly
      if (total > 0 && cleared / total > 0.35) {
        revealCard();
      }
    } catch {
      // Fallback if readback fails
    }
  }, [revealCard]);

  // Touch and pointer event listeners
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Mobile touch handling (primary & high priority)
    const handleTouchStart = (e: TouchEvent) => {
      if (completed.current || !active) return;
      e.preventDefault();
      e.stopPropagation();

      const now = Date.now();
      tapTimes.current = [...tapTimes.current.filter((t) => now - t < 500), now];
      if (tapTimes.current.length >= 2) {
        // Double-tap shortcut to reveal
        revealCard();
        return;
      }

      const touch = e.touches[0];
      if (!touch) return;
      const coords = getCoordinates(touch.clientX, touch.clientY);
      if (coords) {
        isScratching.current = true;
        lastPos.current = null;
        drawScratchLine(coords.x, coords.y);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isScratching.current || completed.current) return;
      e.preventDefault();
      e.stopPropagation();

      const touch = e.touches[0];
      if (!touch) return;
      const coords = getCoordinates(touch.clientX, touch.clientY);
      if (coords) {
        drawScratchLine(coords.x, coords.y);
        moveCounter.current++;
        if (moveCounter.current % 4 === 0) {
          checkScratchPercentage();
        }
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      e.stopPropagation();
      if (isScratching.current) {
        isScratching.current = false;
        lastPos.current = null;
        checkScratchPercentage();
      }
    };

    // Desktop pointer/mouse handling
    const handlePointerDown = (e: PointerEvent) => {
      if (e.pointerType === "touch" || completed.current || !active) return;
      isScratching.current = true;
      try {
        canvas.setPointerCapture(e.pointerId);
      } catch {
        // ignore
      }
      const coords = getCoordinates(e.clientX, e.clientY);
      if (coords) {
        lastPos.current = null;
        drawScratchLine(coords.x, coords.y);
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType === "touch" || !isScratching.current || completed.current) return;
      const coords = getCoordinates(e.clientX, e.clientY);
      if (coords) {
        drawScratchLine(coords.x, coords.y);
        moveCounter.current++;
        if (moveCounter.current % 4 === 0) {
          checkScratchPercentage();
        }
      }
    };

    const handlePointerUp = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      if (isScratching.current) {
        isScratching.current = false;
        lastPos.current = null;
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

    // Add native listeners with { passive: false } for reliable touch scratch
    canvas.addEventListener("touchstart", handleTouchStart, { passive: false });
    canvas.addEventListener("touchmove", handleTouchMove, { passive: false });
    canvas.addEventListener("touchend", handleTouchEnd, { passive: false });
    canvas.addEventListener("touchcancel", handleTouchEnd, { passive: false });

    canvas.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("pointercancel", handlePointerUp);

    return () => {
      canvas.removeEventListener("touchstart", handleTouchStart);
      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("touchend", handleTouchEnd);
      canvas.removeEventListener("touchcancel", handleTouchEnd);

      canvas.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("pointercancel", handlePointerUp);
    };
  }, [
    active,
    drawScratchLine,
    checkScratchPercentage,
    getCoordinates,
    revealCard,
  ]);

  return (
    <div ref={containerRef} className="relative select-none touch-none">
      <div className="relative z-0">{children}</div>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-10 touch-none rounded-[14px] transition-opacity duration-700"
        style={{
          opacity: effectiveRevealed ? 0 : 1,
          pointerEvents: effectiveRevealed || !active ? "none" : "auto",
          cursor: "grab",
          touchAction: "none",
          WebkitTouchCallout: "none",
          WebkitUserSelect: "none",
        }}
        aria-hidden={effectiveRevealed}
      />
    </div>
  );
};
