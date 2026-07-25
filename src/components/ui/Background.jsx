import { useEffect, useRef, useState } from "react";

/**
 * Fixed, non-interactive backdrop:
 *  - a subtle futuristic grid that fades toward the top
 *  - two slow-drifting accent glows
 *  - a mouse-follow spotlight (desktop, fine-pointer, motion-allowed only)
 */
export default function Background() {
  const spotRef = useRef(null);
  const [spotlight, setSpotlight] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    setSpotlight(true);

    let frame = 0;
    const onMove = (e) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (spotRef.current) {
          spotRef.current.style.setProperty("--x", `${e.clientX}px`);
          spotRef.current.style.setProperty("--y", `${e.clientY}px`);
        }
      });
    };
    window.addEventListener("pointermove", onMove);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-grid opacity-[0.35]" />

      <div className="animate-blob-a absolute -top-32 -left-24 h-[38rem] w-[38rem] rounded-full bg-accent/10 blur-[120px]" />
      <div className="animate-blob-b absolute top-1/2 -right-32 h-[34rem] w-[34rem] rounded-full bg-sky-400/10 blur-[120px]" />

      {spotlight && (
        <div
          ref={spotRef}
          className="absolute inset-0 transition-opacity"
          style={{
            background:
              "radial-gradient(600px circle at var(--x, 50%) var(--y, 50%), var(--accent-glow), transparent 45%)",
          }}
        />
      )}
    </div>
  );
}
