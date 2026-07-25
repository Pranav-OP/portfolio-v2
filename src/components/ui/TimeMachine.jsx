import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaRocket } from "react-icons/fa6";
import { FiX, FiArrowUpRight } from "react-icons/fi";
import profile from "../../data/profile.json";

const sites = profile.previousSites || [];
const CREDIT_URL = "https://codepen.io/jasesmith/pen/qqgvZe";

/** Full-screen "Portal to Tomorrow" overlay listing previous versions of the site. */
function Portal({ onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="fixed inset-0 z-[70] overflow-y-auto"
      style={{ background: "radial-gradient(circle at 50% 35%, #33465a, #05070c 70%)" }}
      role="dialog"
      aria-modal="true"
      aria-label="Previous versions of this site"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="fixed right-5 top-5 z-10 grid h-11 w-11 place-items-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white sm:right-8 sm:top-8"
      >
        <FiX size={24} />
      </button>

      <div className="relative flex min-h-full flex-col items-center justify-center px-6 py-20">
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative grid place-items-center"
        >
          {/* The swirling orb (decorative) */}
          <div className="portal-orb" aria-hidden="true">
            <div className="portal-blob" />
            <div className="portal-blob" />
            <div className="portal-blob" />
            <div className="portal-blob" />
            <div className="portal-blob" />
          </div>

          {/* Content sitting on the bright centre */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-4 text-center">
            <h2 className="font-serif text-xl font-semibold leading-tight text-[#12223b] sm:text-2xl">
              <em>Looking</em> for a different site?
              <br />
              Go back in time...
            </h2>

            <div className="flex max-w-md flex-wrap justify-center gap-4">
              {sites.map((site) => (
                <a
                  key={site.url}
                  href={site.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group block w-40 sm:w-44"
                >
                  <div className="overflow-hidden rounded-lg border border-black/10 shadow-2xl transition-transform duration-300 [transform:perspective(700px)_rotateX(6deg)] group-hover:[transform:perspective(700px)_rotateX(0deg)_translateY(-4px)]">
                    {site.thumbnail ? (
                      <img
                        src={site.thumbnail}
                        alt={site.label}
                        loading="lazy"
                        className="aspect-[16/10] w-full object-cover object-top"
                      />
                    ) : (
                      <div className="grid aspect-[16/10] w-full place-items-center bg-slate-800 text-white/70">
                        {site.label}
                      </div>
                    )}
                  </div>
                  <p className="mt-2 inline-flex items-center gap-1 font-mono text-xs text-[#12223b]/80">
                    {site.label} · {site.year}
                    <FiArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </p>
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        <a
          href={CREDIT_URL}
          target="_blank"
          rel="noreferrer"
          className="mt-16 font-mono text-xs text-white/45 underline-offset-4 transition-colors hover:text-white/80 hover:underline"
        >
          A Portal to Tomorrow by @jasesmith
        </a>
      </div>
    </motion.div>
  );
}

export default function TimeMachine() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  // Desktop: always visible. Mobile: only once scrolled to the bottom.
  useEffect(() => {
    const update = () => {
      if (window.matchMedia("(min-width: 1024px)").matches) {
        setVisible(true);
        return;
      }
      const nearBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 40;
      setVisible(nearBottom);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  if (sites.length === 0) return null;

  return (
    <>
      <AnimatePresence>{open && <Portal onClose={() => setOpen(false)} />}</AnimatePresence>

      <AnimatePresence>
        {visible && !open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-5 right-5 z-40 sm:bottom-8 sm:right-8"
          >
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Go back in time — view previous versions of this site"
              className="group relative grid h-20 w-20 place-items-center rounded-full border border-line bg-surface/70 backdrop-blur-md transition-shadow hover:accent-glow sm:h-[88px] sm:w-[88px]"
            >
              <svg
                viewBox="0 0 100 100"
                className="animate-orbit absolute inset-0 h-full w-full"
                aria-hidden="true"
              >
                <defs>
                  <path
                    id="tm-curve"
                    d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                    fill="none"
                  />
                </defs>
                <text
                  style={{
                    fill: "var(--accent)",
                    fontSize: "9px",
                    letterSpacing: "1.5px",
                    fontWeight: 600,
                  }}
                  fontFamily="var(--font-mono)"
                >
                  <textPath
                    href="#tm-curve"
                    startOffset="0"
                    textLength="232"
                    lengthAdjust="spacingAndGlyphs"
                  >
                    GO BACK IN TIME · TIME TRAVEL ·
                  </textPath>
                </text>
              </svg>

              <motion.span
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                className="text-accent-fg transition-transform group-hover:scale-110"
              >
                <FaRocket size={22} className="-rotate-45" />
              </motion.span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
