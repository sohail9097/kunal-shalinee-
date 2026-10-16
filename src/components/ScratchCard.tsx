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
  const hasScratched = useRef(false);
  const lastSize = useRef({ width: 0, height: 0 });
  const lastPos = useRef<{ x: number; y: number } | null>(null);
  const scratchDistance = useRef(0);
  const lastTapTime = useRef(0);
  const [isRevealed, setIsRevealed] = useState(false);

  const effectiveRevealed = revealed || isRevealed;

  const revealCard = useCallback(() => {
    if (completed.current) return;
    completed.current = true;
    setIsRevealed(true);
    onCompleteAction?.();
  }, [onCompleteAction]);

  useEffect(() => {
    if (revealed) {
      revealCard();
    }
  }, [revealed, revealCard]);

  // Metallic gold foil drawing in canvas buffer coordinates
  const drawFoil = useCallback(
    (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, width, height);

      ctx.save();
      ctx.beginPath();
      const radius = Math.round(14 * (width / 340));
      if (typeof ctx.roundRect === "function") {
        ctx.roundRect(0, 0, width, height, radius);
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

      // Foil hatching lines
      ctx.strokeStyle = "rgba(120, 80, 10, 0.14)";
      ctx.lineWidth = Math.max(1, Math.round(width / 340));
      const step = Math.round(7 * (width / 340));
      for (let x = -height; x < width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x + height, height);
        ctx.stroke();
      }
      for (let x = 0; x < width + height; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x - height, height);
        ctx.stroke();
      }

      // Ornate inner border
      ctx.strokeStyle = "rgba(124, 80, 10, 0.55)";
      ctx.lineWidth = Math.max(1.5, 1.8 * (width / 340));
      const inset = Math.round(8 * (width / 340));
      ctx.beginPath();
      if (typeof ctx.roundRect === "function") {
        ctx.roundRect(inset, inset, width - inset * 2, height - inset * 2, radius * 0.7);
      } else {
        ctx.rect(inset, inset, width - inset * 2, height - inset * 2);
      }
      ctx.stroke();

      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // Royal seal emblem rings
      const scale = width / 340;
      const centerY = height / 2 - 28 * scale;
      ctx.strokeStyle = "rgba(74, 14, 21, 0.65)";
      ctx.lineWidth = Math.max(1.5, 1.8 * scale);
      ctx.beginPath();
      ctx.arc(width / 2, centerY, 13 * scale, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(width / 2, centerY, 7.5 * scale, 0, 2 * Math.PI);
      ctx.stroke();

      // Label text
      const maxTextWidth = width - 40 * scale;
      const upperLabel = label.toUpperCase();
      let fontSize = Math.round(14 * scale);
      ctx.font = `600 ${fontSize}px "Jacques Francois", Georgia, serif`;
      let textWidth = ctx.measureText(upperLabel).width;
      if (textWidth > maxTextWidth) {
        fontSize = Math.max(10, Math.round((fontSize * maxTextWidth) / textWidth));
        ctx.font = `600 ${fontSize}px "Jacques Francois", Georgia, serif`;
      }
      ctx.fillStyle = "rgba(74, 14, 21, 0.92)";
      ctx.fillText(upperLabel, width / 2, height / 2 + 8 * scale);

      // Subtitle
      const hint = "drag your finger across";
      let hintSize = Math.round(12 * scale);
      ctx.font = `italic 400 ${hintSize}px "Playfair Display", Georgia, serif`;
      const hintWidth = ctx.measureText(hint).width;
      if (hintWidth > maxTextWidth) {
        hintSize = Math.max(9, Math.round((hintSize * maxTextWidth) / hintWidth));
        ctx.font = `italic 400 ${hintSize}px "Playfair Display", Georgia, serif`;
      }
      ctx.fillStyle = "rgba(74, 14, 21, 0.75)";
      ctx.fillText(hint, width / 2, height / 2 + 30 * scale);

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

    // Never wipe out progress if already scratched or revealed
    if (completed.current || hasScratched.current) return;

    if (
      hasDrawnFoil.current &&
      Math.abs(lastSize.current.width - width) < 3 &&
      Math.abs(lastSize.current.height - height) < 3
    ) {
      return;
    }

    lastSize.current = { width, height };
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Set physical buffer size
    const bufW = Math.round(width * dpr);
    const bufH = Math.round(height * dpr);
    canvas.width = bufW;
    canvas.height = bufH;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (ctx) {
      drawFoil(ctx, bufW, bufH);
      hasDrawnFoil.current = true;
    }
  }, [drawFoil]);

  useEffect(() => {
    initCanvas();
    const t1 = setTimeout(initCanvas, 100);
    const t2 = setTimeout(initCanvas, 400);

    const observer = new ResizeObserver(() => {
      if (!completed.current && !hasScratched.current) {
        initCanvas();
      }
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      observer.disconnect();
    };
  }, [initCanvas]);

  // Convert client viewport coordinates to exact canvas buffer pixel coordinates
  const getCanvasCoords = useCallback((clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return null;

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
      brushRadius: 28 * scaleX,
    };
  }, []);

  // Erase stroke on canvas
  const eraseStroke = useCallback((x: number, y: number, radius: number) => {
    const canvas = canvasRef.current;
    if (!canvas || completed.current) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    hasScratched.current = true;

    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.globalCompositeOperation = "destination-out";
    ctx.fillStyle = "#000000";
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = radius * 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    if (lastPos.current) {
      ctx.beginPath();
      ctx.moveTo(lastPos.current.x, lastPos.current.y);
      ctx.lineTo(x, y);
      ctx.stroke();

      const dist = Math.hypot(x - lastPos.current.x, y - lastPos.current.y);
      scratchDistance.current += dist;
    } else {
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, 2 * Math.PI);
      ctx.fill();
      scratchDistance.current += radius;
    }

    ctx.restore();
    lastPos.current = { x, y };

    // Auto-reveal when enough scratch distance has accumulated across the card
    const targetDist = canvas.width * 1.1;
    if (scratchDistance.current > targetDist) {
      revealCard();
    }
  }, [revealCard]);

  // Check percentage when finger is lifted (zero performance impact during dragging)
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

      // Sample every 20th pixel
      for (let y = 0; y < height; y += 20) {
        for (let x = 0; x < width; x += 20) {
          const alpha = imageData[(y * width + x) * 4 + 3];
          if (alpha < 80) cleared++;
          total++;
        }
      }

      if (total > 0 && cleared / total > 0.3) {
        revealCard();
      }
    } catch {
      // ignore
    }
  }, [revealCard]);

  // Direct native event binding on canvas element
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Mobile Touch Handlers
    const onTouchStart = (e: TouchEvent) => {
      if (completed.current) return;
      e.preventDefault();
      e.stopPropagation();

      const now = Date.now();
      if (now - lastTapTime.current < 400) {
        revealCard();
        return;
      }
      lastTapTime.current = now;

      const touch = e.touches[0];
      if (!touch) return;

      const pt = getCanvasCoords(touch.clientX, touch.clientY);
      if (pt) {
        isScratching.current = true;
        lastPos.current = null;
        eraseStroke(pt.x, pt.y, pt.brushRadius);
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isScratching.current || completed.current) return;
      e.preventDefault();
      e.stopPropagation();

      const touch = e.touches[0];
      if (!touch) return;

      const pt = getCanvasCoords(touch.clientX, touch.clientY);
      if (pt) {
        eraseStroke(pt.x, pt.y, pt.brushRadius);
      }
    };

    const onTouchEnd = (e: TouchEvent) => {
      e.stopPropagation();
      if (isScratching.current) {
        isScratching.current = false;
        lastPos.current = null;
        checkScratchPercentage();
      }
    };

    // Desktop Pointer Handlers
    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === "touch" || completed.current) return;
      isScratching.current = true;
      try {
        canvas.setPointerCapture(e.pointerId);
      } catch {
        // ignore
      }

      const pt = getCanvasCoords(e.clientX, e.clientY);
      if (pt) {
        lastPos.current = null;
        eraseStroke(pt.x, pt.y, pt.brushRadius);
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === "touch" || !isScratching.current || completed.current) return;
      const pt = getCanvasCoords(e.clientX, e.clientY);
      if (pt) {
        eraseStroke(pt.x, pt.y, pt.brushRadius);
      }
    };

    const onPointerUp = (e: PointerEvent) => {
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

    // Attach listeners with passive: false for touch
    canvas.addEventListener("touchstart", onTouchStart, { passive: false });
    canvas.addEventListener("touchmove", onTouchMove, { passive: false });
    canvas.addEventListener("touchend", onTouchEnd, { passive: false });
    canvas.addEventListener("touchcancel", onTouchEnd, { passive: false });

    canvas.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointercancel", onPointerUp);

    return () => {
      canvas.removeEventListener("touchstart", onTouchStart);
      canvas.removeEventListener("touchmove", onTouchMove);
      canvas.removeEventListener("touchend", onTouchEnd);
      canvas.removeEventListener("touchcancel", onTouchEnd);

      canvas.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointercancel", onPointerUp);
    };
  }, [
    getCanvasCoords,
    eraseStroke,
    checkScratchPercentage,
    revealCard,
  ]);

  return (
    <div
      ref={containerRef}
      className="relative select-none"
      style={{ touchAction: "none" }}
    >
      <div className="relative z-0">{children}</div>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-20 rounded-[14px] transition-opacity duration-700"
        style={{
          opacity: effectiveRevealed ? 0 : 1,
          pointerEvents: effectiveRevealed ? "none" : "auto",
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
