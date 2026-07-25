import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import lab from "../../data/lab.json";
import { getLabType } from "../../lib/icons";
import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";
import { stagger, fadeUp, viewportOnce } from "../../lib/motion";

function TypeBadge({ type }) {
  const { icon: Icon, label, color } = getLabType(type);
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[0.7rem] font-medium"
      style={{ color, backgroundColor: `${color}1a` }}
    >
      <Icon size={13} />
      {label}
    </span>
  );
}

function Entry({ entry }) {
  return (
    <motion.a
      variants={fadeUp}
      href={entry.url}
      target="_blank"
      rel="noreferrer"
      className="group block rounded-xl border border-line bg-surface/50 p-4 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-accent/60"
    >
      <div className="mb-2 flex items-center justify-between gap-3">
        <TypeBadge type={entry.type} />
        <FiArrowUpRight className="flex-none text-muted transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent-fg" />
      </div>
      <h4 className="font-medium text-fg transition-colors group-hover:text-accent-fg">
        {entry.title}
      </h4>
      {entry.description && (
        <p className="mt-1.5 text-sm leading-relaxed text-muted">
          {entry.description}
        </p>
      )}
    </motion.a>
  );
}

function MonthGroup({ month }) {
  return (
    <div className="relative pl-8 sm:pl-10">
      {/* timeline dot */}
      <span className="absolute left-0 top-1.5 grid h-6 w-6 -translate-x-1/2 place-items-center rounded-full border border-accent/50 bg-bg">
        <span className="h-2 w-2 rounded-full bg-accent" />
      </span>

      <Reveal>
        <h3 className="text-lg font-semibold text-fg">{month.title}</h3>
        {month.note && (
          <p className="mt-0.5 text-sm italic text-muted">{month.note}</p>
        )}
      </Reveal>

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mt-4 grid gap-3 sm:grid-cols-2"
      >
        {month.entries.map((entry, i) => (
          <Entry key={i} entry={entry} />
        ))}
      </motion.div>
    </div>
  );
}

export default function Lab() {
  return (
    <section id="lab" className="scroll-mt-24 pt-20 lg:pt-24">
      <SectionHeading index={4} title="The Lab" />
      <Reveal as="p" className="-mt-2 mb-10 max-w-xl leading-relaxed text-muted">
        A monthly log of what I'm exploring - papers, talks, blog posts, and
        tools that caught my attention. A running record of the rabbit holes
        that shape how I think and build.
      </Reveal>

      <div className="relative space-y-12">
        {/* vertical timeline spine */}
        <span className="absolute bottom-2 left-0 top-2 w-px bg-line" aria-hidden="true" />
        {lab.map((month) => (
          <MonthGroup key={month.month} month={month} />
        ))}
      </div>
    </section>
  );
}
