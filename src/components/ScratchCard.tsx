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
  const completed = useRef(false);
  const lastPos = useRef<{ x: number; y: number } | null>(null);
  const lastDims = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
  const [isRevealed, setIsRevealed] = useState(false);

  // Draw royal gold foil on canvas
  const drawFoil = useCallback(
    (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      ctx.save();
      ctx.clearRect(0, 0, width, height);

      // Gold metallic gradient
      const grad = ctx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, "#8a6a12");
      grad.addColorStop(0.28, "#d9b750");
      grad.addColorStop(0.5, "#fff2b8");
      grad.addColorStop(0.68, "#e6c869");
      grad.addColorStop(1, "#856512");

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Delicate foil hatching diamond lines
      ctx.strokeStyle = "rgba(120, 80, 10, 0.14)";
      ctx.lineWidth = 1;
      for (let x = -height; x < width; x += 8) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x + height, height);
        ctx.stroke();
      }
      for (let x = 0; x < width + height; x += 8) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x - height, height);
        ctx.stroke();
      }

      // Ornate inner border
      ctx.strokeStyle = "rgba(124, 80, 10, 0.6)";
      ctx.lineWidth = 2;
      ctx.strokeRect(8, 8, width - 16, height - 16);

      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // Royal seal emblem rings
      const centerY = height / 2 - 24;
      ctx.strokeStyle = "rgba(74, 14, 21, 0.65)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(width / 2, centerY, 13, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(width / 2, centerY, 7, 0, 2 * Math.PI);
      ctx.stroke();

      // Title label text
      const maxTextWidth = width - 40;
      const upperLabel = label.toUpperCase();
      let fontSize = Math.max(12, Math.min(16, width / 20));
      ctx.font = `700 ${fontSize}px "Jacques Francois", Georgia, serif`;
      let textWidth = ctx.measureText(upperLabel).width;
      if (textWidth > maxTextWidth) {
        fontSize = Math.max(10, (fontSize * maxTextWidth) / textWidth);
        ctx.font = `700 ${fontSize}px "Jacques Francois", Georgia, serif`;
      }
      ctx.fillStyle = "rgba(74, 14, 21, 0.95)";
      ctx.fillText(upperLabel, width / 2, height / 2 + 10);

      // Subtitle hint
      const hint = "drag your finger across";
      let hintSize = Math.max(10, Math.min(13, width / 24));
      ctx.font = `italic 400 ${hintSize}px "Playfair Display", Georgia, serif`;
      ctx.fillStyle = "rgba(74, 14, 21, 0.75)";
      ctx.fillText(hint, width / 2, height / 2 + 32);

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

    // Avoid clearing canvas if dimensions have not actually changed
    if (
      lastDims.current.w === width &&
      lastDims.current.h === height &&
      !completed.current
    ) {
      return;
    }

    lastDims.current = { w: width, h: height };
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (ctx) {
      ctx.save();
      ctx.scale(dpr, dpr);
      drawFoil(ctx, width, height);
      ctx.restore();
    }
  }, [drawFoil]);

  useEffect(() => {
    initCanvas();
    const observer = new ResizeObserver((entries) => {
      if (completed.current) return;
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (
          Math.abs(width - lastDims.current.w) > 3 ||
          Math.abs(height - lastDims.current.h) > 3
        ) {
          initCanvas();
        }
      }
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, [initCanvas]);

  // Scratch a circle or line between last and current coordinates
  const scratchAt = useCallback((clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || completed.current) return;

    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const currentX = (clientX - rect.left) * scaleX;
    const currentY = (clientY - rect.top) * scaleY;
    const radius = 28 * scaleX;

    ctx.save();
    ctx.globalCompositeOperation = "destination-out";

    if (lastPos.current) {
      // Connect line between positions for smooth continuous scratch
      ctx.lineWidth = radius * 2;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.beginPath();
      ctx.moveTo(lastPos.current.x, lastPos.current.y);
      ctx.lineTo(currentX, currentY);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.arc(currentX, currentY, radius, 0, 2 * Math.PI);
      ctx.fill();
    }

    ctx.restore();
    lastPos.current = { x: currentX, y: currentY };
  }, []);

  // Check how much foil has been scratched
  const checkPercentage = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || completed.current) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const { width, height } = canvas;
    // Downsample checking grid for instantaneous speed
    const step = 16;
    let cleared = 0;
    let total = 0;

    try {
      const imageData = ctx.getImageData(0, 0, width, height).data;
      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          const alpha = imageData[(y * width + x) * 4 + 3];
          if (alpha < 60) cleared++;
          total++;
        }
      }

      // If > 32% cleared, reveal the card completely!
      if (total > 0 && cleared / total > 0.32) {
        completed.current = true;
        setIsRevealed(true);
        onCompleteAction?.();
      }
    } catch {
      // ignore
    }
  }, [onCompleteAction]);

  // Touch and pointer event listeners with preventDefault
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // --- Touch Handlers (iOS & Android) ---
    const onTouchStart = (e: TouchEvent) => {
      if (completed.current) return;
      e.preventDefault();
      e.stopPropagation();
      isScratching.current = true;
      lastPos.current = null;
      const t = e.touches[0];
      if (t) scratchAt(t.clientX, t.clientY);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isScratching.current || completed.current) return;
      e.preventDefault();
      e.stopPropagation();
      const t = e.touches[0];
      if (t) scratchAt(t.clientX, t.clientY);
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (!isScratching.current) return;
      e.stopPropagation();
      isScratching.current = false;
      lastPos.current = null;
      checkPercentage();
    };

    // --- Mouse & Pointer Handlers ---
    const onPointerDown = (e: PointerEvent) => {
      if (completed.current || e.pointerType === "touch") return; // Touch handled by touch events
      isScratching.current = true;
      lastPos.current = null;
      scratchAt(e.clientX, e.clientY);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isScratching.current || completed.current || e.pointerType === "touch") return;
      scratchAt(e.clientX, e.clientY);
    };

    const onPointerUp = () => {
      if (!isScratching.current) return;
      isScratching.current = false;
      lastPos.current = null;
      checkPercentage();
    };

    canvas.addEventListener("touchstart", onTouchStart, { passive: false });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("touchcancel", onTouchEnd, { passive: true });

    canvas.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    return () => {
      canvas.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchEnd);

      canvas.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, [scratchAt, checkPercentage]);

  return (
    <div
      ref={containerRef}
      className="sm-scratch relative select-none w-full h-full"
      style={{ touchAction: "none" }}
    >
      <div className="relative z-0 w-full h-full">{children}</div>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-10 touch-none rounded-[inherit] transition-opacity duration-600"
        style={{
          opacity: isRevealed ? 0 : 1,
          pointerEvents: isRevealed || !active ? "none" : "auto",
          cursor: "grab",
          touchAction: "none",
        }}
        aria-hidden={isRevealed}
      />
    </div>
  );
};
