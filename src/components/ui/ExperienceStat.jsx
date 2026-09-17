import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp } from "../../lib/motion";

const HINT_DELAY = 30000; // ms a mobile user can leave the counter open before we nudge them to close it

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
  const cardRef = useRef(null);
  const hintShown = useRef(false);
  const [active, setActive] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showThanks, setShowThanks] = useState(false);
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    canHover.current = window.matchMedia("(hover: hover)").matches;
  }, []);

  useEffect(() => {
    if (!active) {
      setShowHint(false);
      // Closed while the nudge was on screen? Give them a little thanks.
      if (hintShown.current) {
        hintShown.current = false;
        setShowThanks(true);
      }
      return;
    }

    hintShown.current = false;

    // Live tick — runs only while open, so it's idle otherwise.
    setNow(new Date());
    const tick = setInterval(() => setNow(new Date()), 1000);

    // Touch-only extras: tap outside to close, plus a gentle nudge to close
    // if it's been left open a while (keeps the timer from lingering).
    const touch = !canHover.current;
    let hint;
    const onOutside = (ev) => {
      if (cardRef.current && !cardRef.current.contains(ev.target)) setActive(false);
    };
    if (touch) {
      hint = setTimeout(() => {
        setShowHint(true);
        hintShown.current = true;
      }, HINT_DELAY);
      document.addEventListener("click", onOutside);
    }

    return () => {
      clearInterval(tick);
      if (hint) clearTimeout(hint);
      document.removeEventListener("click", onOutside);
    };
  }, [active]);

  // Auto-dismiss the thank-you after a short moment.
  useEffect(() => {
    if (!showThanks) return;
    const id = setTimeout(() => setShowThanks(false), 2400);
    return () => clearTimeout(id);
  }, [showThanks]);

  const e = elapsed(startDate.current, now);

  return (
    <>
      <motion.div
        ref={cardRef}
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

      {/* Mobile-only toasts: a playful nudge after a while, then a quick thanks on close */}
      <AnimatePresence mode="wait">
        {showThanks ? (
          <motion.div
            key="thanks"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            role="status"
            className="fixed inset-x-0 bottom-6 z-50 mx-auto flex w-max max-w-[90vw] items-center gap-2 rounded-full border border-accent/50 bg-surface/90 px-4 py-2 text-xs font-medium text-fg-soft shadow-lg backdrop-blur-md"
          >
            <motion.span
              aria-hidden="true"
              className="text-base"
              initial={{ scale: 0, rotate: -35 }}
              animate={{ scale: [0, 1.35, 1], rotate: [-35, 8, 0] }}
              transition={{ duration: 0.55, ease: "backOut" }}
            >
              👍
            </motion.span>
            Thanks a bunch! Counter&apos;s off for a nap.
          </motion.div>
        ) : showHint ? (
          <motion.div
            key="hint"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            role="status"
            className="fixed inset-x-0 bottom-6 z-50 mx-auto flex w-max max-w-[90vw] items-center gap-2 rounded-full border border-line bg-surface/90 px-4 py-2 text-center text-xs text-fg-soft shadow-lg backdrop-blur-md"
          >
            <span aria-hidden="true" className="animate-bounce text-sm">👆</span>
            Psst… seen enough? Tap anywhere outside — my little counter needs a nap 😴
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
