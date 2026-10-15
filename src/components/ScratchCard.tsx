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
  label = "Scratch to reveal",
  active = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isScratching = useRef(false);
  const completed = useRef(false);
  const [isRevealed, setIsRevealed] = useState(false);

  const drawFoil = useCallback(
    (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      ctx.clearRect(0, 0, width, height);
      ctx.save();
      ctx.beginPath();
      if (typeof ctx.roundRect === "function") {
        ctx.roundRect(0, 0, width, height, 10);
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
      ctx.strokeStyle = "rgba(120, 80, 10, 0.12)";
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
        ctx.roundRect(8, 8, width - 16, height - 16, 7);
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
      const maxTextWidth = width - 44;
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

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = container.offsetWidth;
    const height = container.offsetHeight;
    if (width === 0 || height === 0) return;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.scale(dpr, dpr);
      drawFoil(ctx, width, height);
    }
  }, [drawFoil]);

  useEffect(() => {
    initCanvas();
    const observer = new ResizeObserver(() => {
      if (!completed.current) {
        initCanvas();
      }
    });
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, [initCanvas]);

  const scratch = useCallback((clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || completed.current) return;

    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 26, 0, 2 * Math.PI);
    ctx.fill();
  }, []);

  const checkScratchPercentage = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || completed.current) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { width, height } = canvas;
    const imageData = ctx.getImageData(0, 0, width, height).data;
    let cleared = 0;
    let total = 0;

    // Sample pixels across grid
    for (let y = 0; y < height; y += 16) {
      for (let x = 0; x < width; x += 16) {
        const alpha = imageData[(y * width + x) * 4 + 3];
        if (alpha < 40) cleared++;
        total++;
      }
    }

    if (total > 0 && cleared / total > 0.55) {
      completed.current = true;
      setIsRevealed(true);
      onCompleteAction?.();
    }
  }, [onCompleteAction]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handlePointerDown = (e: PointerEvent) => {
      isScratching.current = true;
      scratch(e.clientX, e.clientY);
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isScratching.current) return;
      scratch(e.clientX, e.clientY);
    };

    const handlePointerUp = () => {
      if (isScratching.current) {
        isScratching.current = false;
        checkScratchPercentage();
      }
    };

    canvas.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("pointerleave", handlePointerUp);

    return () => {
      canvas.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("pointerleave", handlePointerUp);
    };
  }, [scratch, checkScratchPercentage]);

  return (
    <div ref={containerRef} className="relative select-none">
      <div className="relative z-0">{children}</div>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-10 touch-none rounded-[inherit] transition-opacity duration-700"
        style={{
          opacity: isRevealed ? 0 : 1,
          pointerEvents: isRevealed || !active ? "none" : "auto",
          cursor: "grab",
        }}
        onTouchStart={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
        onTouchEnd={(e) => e.stopPropagation()}
        aria-hidden={isRevealed}
      />
    </div>
  );
};
