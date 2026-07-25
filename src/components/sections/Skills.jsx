import { motion } from "framer-motion";
import skills from "../../data/skills.json";
import SectionHeading from "../ui/SectionHeading";
import { stagger, fadeUp, viewportOnce } from "../../lib/motion";

export default function Skills() {
  return (
    <section id="skills" className="scroll-mt-24 pt-20 lg:pt-24">
      <SectionHeading index={3} title="Skills & Tools" />
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="grid gap-4 sm:grid-cols-2"
      >
        {skills.map((group) => (
          <motion.div
            key={group.category}
            variants={fadeUp}
            className="rounded-xl border border-line bg-surface/50 p-5 backdrop-blur transition-colors hover:border-accent/50"
          >
            <h3 className="mb-3 font-mono text-xs uppercase tracking-widest text-accent-fg">
              {group.category}
            </h3>
            <ul className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="rounded-md border border-line bg-surface-2/60 px-2.5 py-1 text-sm text-fg-soft transition-colors hover:border-accent/50 hover:text-accent-fg"
                >
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
