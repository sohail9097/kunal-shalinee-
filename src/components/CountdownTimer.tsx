import React, { useEffect, useState } from "react";

interface CountdownTimerProps {
  targetDate: string;
}

interface TimeUnitProps {
  value: number;
  label: string;
}

const TimeUnit: React.FC<TimeUnitProps> = ({ value, label }) => {
  return (
    <div className="flex flex-col items-center">
      <div
        className="flex h-14 w-14 items-center justify-center rounded-xl tabular-nums md:h-16 md:w-16"
        style={{
          background: "linear-gradient(160deg, var(--sm-ivory), var(--sm-cream))",
          border: "1px solid color-mix(in srgb, var(--sm-gold) 50%, transparent)",
          boxShadow:
            "0 8px 20px -10px rgba(74, 14, 21, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.6)",
        }}
      >
        <span
          className="sm-display text-2xl leading-none text-[color:var(--sm-red)] md:text-3xl"
          style={{
            fontVariantNumeric: "lining-nums tabular-nums",
            transform: "translateY(-0.06em)",
          }}
        >
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <div className="sm-caps mt-2 text-[9px] tracking-[0.2em] text-[color:var(--sm-gold-deep)] md:text-[10px]">
        {label}
      </div>
    </div>
  );
};

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState(() => {
    const target = new Date(targetDate).getTime();
    const diff = Math.max(0, target - Date.now());
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / 1000 / 60) % 60),
      seconds: Math.floor((diff / 1000) % 60),
      isExpired: diff <= 0,
    };
  });

  useEffect(() => {
    const target = new Date(targetDate).getTime();
    const interval = setInterval(() => {
      const diff = Math.max(0, target - Date.now());
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
        isExpired: diff <= 0,
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  if (timeLeft.isExpired) {
    return (
      <p className="sm-script text-3xl text-[color:var(--sm-red)]">
        The celebration has begun!
      </p>
    );
  }

  const colon = (
    <span
      className="sm-display flex h-14 items-center text-2xl leading-none text-[color:var(--sm-gold)] md:h-16 md:text-3xl"
      style={{ transform: "translateY(-0.06em)" }}
    >
      :
    </span>
  );

  return (
    <div className="flex items-start justify-center gap-2 md:gap-3">
      <TimeUnit value={timeLeft.days} label="Days" />
      {colon}
      <TimeUnit value={timeLeft.hours} label="Hrs" />
      {colon}
      <TimeUnit value={timeLeft.minutes} label="Min" />
      {colon}
      <TimeUnit value={timeLeft.seconds} label="Sec" />
    </div>
  );
};
