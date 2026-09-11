import { useEffect, useRef, useState } from "react";

interface AnimatedStatProps {
  value: number;
  suffix?: string;
  label: string;
  // Background + text color classes for the card, e.g. "bg-primary
  // text-on-primary". Passed in explicitly (rather than relying on the
  // number/label inheriting color from an ancestor) so the numbers are
  // never accidentally left colorless.
  className: string;
  durationMs?: number;
}

function AnimatedStat({
  value,
  suffix = "",
  label,
  className,
  durationMs = 1500,
}: AnimatedStatProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Only start counting once the card actually scrolls into view, so the
  // animation plays when the user reaches it instead of finishing
  // silently off-screen before they scroll down.
  useEffect(() => {
    const el = cardRef.current;

    if (!el || hasStarted) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) {
      return;
    }

    let frameId: number;
    const startTime = performance.now();

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationMs, 1);

      // Ease-out cubic so the count-up settles into the final number
      // instead of stopping abruptly.
      const eased = 1 - Math.pow(1 - progress, 3);

      setDisplayValue(Math.round(eased * value));

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    }

    frameId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frameId);
  }, [hasStarted, value, durationMs]);

  return (
    <div
      ref={cardRef}
      className={`flex w-full flex-col items-center justify-center rounded-xl p-4 text-center lg:w-auto lg:p-6 ${className}`}
    >
      <span className="font-display-lg text-2xl md:text-display-lg">
        {displayValue}
        {suffix}
      </span>

      <span className="font-label-md text-[10px]  uppercase tracking-widest opacity-80 md:text-label-md">
        {label}
      </span>
    </div>
  );
}

export default AnimatedStat;