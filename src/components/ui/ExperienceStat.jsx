import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { fadeUp } from "../../lib/motion";

const pad = (n) => String(n).padStart(2, "0");

// Calendar-accurate elapsed time between two dates, broken into
// years / months / days / hours / minutes / seconds (with borrowing).
function elapsed(start, now) {
  let years = now.getFullYear() - start.getFullYear();
  let months = now.getMonth() - start.getMonth();
  let days = now.getDate() - start.getDate();
  let hours = now.getHours() - start.getHours();
  let minutes = now.getMinutes() - start.getMinutes();
  let seconds = now.getSeconds() - start.getSeconds();

  if (seconds < 0) {
    seconds += 60;
    minutes--;
  }
  if (minutes < 0) {
    minutes += 60;
    hours--;
  }
  if (hours < 0) {
    hours += 24;
    days--;
  }
  if (days < 0) {
    const daysInPrevMonth = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    days += daysInPrevMonth;
    months--;
  }
  if (months < 0) {
    months += 12;
    years--;
  }

  return { years, months, days, hours, minutes, seconds };
}

/**
 * Easter egg: the "years of experience" stat tile.
 * Hover (mouse) or tap (touch) reveals a live count-up since `start`.
 * The 1s interval runs ONLY while active, so it's idle the rest of the time.
 */
export default function ExperienceStat({ start, value, label }) {
  const startDate = useRef(new Date(start));
  const canHover = useRef(true);
  const [active, setActive] = useState(false);
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    canHover.current = window.matchMedia("(hover: hover)").matches;
  }, []);

  useEffect(() => {
    if (!active) return;
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, [active]);

  const e = elapsed(startDate.current, now);

  return (
    <motion.div
      variants={fadeUp}
      onMouseEnter={() => canHover.current && setActive(true)}
      onMouseLeave={() => canHover.current && setActive(false)}
      onClick={() => !canHover.current && setActive((a) => !a)}
      className={`rounded-xl border border-line bg-surface/50 p-4 backdrop-blur transition-colors hover:border-accent/60 [-webkit-tap-highlight-color:transparent] cursor-help select-none ${
        active ? "" : "animate-pulse-glow"
      }`}
      title="Time since I started my career"
    >
      <dt className="sr-only">{label}</dt>
      <dd className="flex min-h-[2.5rem] items-center font-mono font-bold text-gradient">
        {active ? (
          <span className="block text-[0.9rem] leading-tight tabular-nums" aria-hidden="true">
            <span className="block">
              {e.years}y {e.months}mo {e.days}d
            </span>
            <span className="block">
              {pad(e.hours)}:{pad(e.minutes)}:{pad(e.seconds)}
            </span>
          </span>
        ) : (
          <span className="text-2xl">{value}</span>
        )}
      </dd>
      <p className="mt-1 text-xs leading-snug text-muted">{label}</p>
    </motion.div>
  );
}
