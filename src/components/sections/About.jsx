import { motion } from "framer-motion";
import { FiDownload, FiFileText, FiArrowUpRight } from "react-icons/fi";
import profile from "../../data/profile.json";
import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";
import { stagger, fadeUp, viewportOnce } from "../../lib/motion";

export default function About() {
  return (
    <section id="about" className="scroll-mt-24 pt-6 lg:pt-24">
      <SectionHeading index={1} title="About" />

      <div className="space-y-4 text-muted leading-relaxed">
        {profile.intro.map((para, i) => (
          <Reveal as="p" key={i}>
            {para}
          </Reveal>
        ))}
      </div>

      {/* Highlight stats */}
      <motion.dl
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4"
      >
        {profile.highlights.map((h) => (
          <motion.div
            key={h.label}
            variants={fadeUp}
            className="rounded-xl border border-line bg-surface/50 p-4 backdrop-blur transition-colors hover:border-accent/60"
          >
            <dt className="sr-only">{h.label}</dt>
            <dd className="font-mono text-2xl font-bold text-gradient">{h.value}</dd>
            <p className="mt-1 text-xs leading-snug text-muted">{h.label}</p>
          </motion.div>
        ))}
      </motion.dl>

      <Reveal className="mt-10 flex flex-wrap gap-4">
        <a
          href={profile.resumeUrl}
          download
          className="group inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-bg transition-transform hover:-translate-y-0.5"
        >
          <FiDownload className="transition-transform group-hover:translate-y-0.5" />
          Download Résumé
        </a>
        <a
          href={profile.cvUrl}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-2 rounded-lg border border-accent/50 px-5 py-3 text-sm font-semibold text-accent-fg transition-colors hover:bg-accent/10"
        >
          <FiFileText />
          View Detailed CV
          <FiArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </Reveal>
    </section>
  );
}
