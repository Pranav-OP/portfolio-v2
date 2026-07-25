import { motion } from "framer-motion";
import { fadeUp, viewportOnce } from "../../lib/motion";

/**
 * Wraps children in a scroll-triggered fade-up animation.
 * Pass `as` to change the rendered element (default: div).
 */
export default function Reveal({ children, as = "div", variants = fadeUp, className, ...props }) {
  const MotionTag = motion[as] || motion.div;
  return (
    <MotionTag
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className={className}
      {...props}
    >
      {children}
    </MotionTag>
  );
}
