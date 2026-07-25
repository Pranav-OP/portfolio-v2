// Shared Framer Motion variants for consistent, minimal entrance animations.

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export const fade = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

// Parent container that staggers its children on scroll into view.
export const stagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

// Shared viewport config: animate once, a little before fully in view.
export const viewportOnce = { once: true, margin: "0px 0px -80px 0px" };
