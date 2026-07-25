import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import greetings from "../../data/greetings.json";

/**
 * Cycles through greetings in different languages, animating each swap.
 * Renders in place of "Hi" in the "…, my name is" line.
 */
export default function Greeting() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setIndex((n) => (n + 1) % greetings.length),
      2400
    );
    return () => clearInterval(id);
  }, []);

  return (
    <span className="inline-grid align-baseline">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: "0.5em", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-0.5em", opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="col-start-1 row-start-1 whitespace-nowrap text-lg font-bold sm:text-xl"
        >
          {greetings[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
