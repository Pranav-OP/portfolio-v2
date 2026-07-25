import { FiArrowUpRight, FiGlobe } from "react-icons/fi";
import experience from "../../data/experience.json";
import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";

function Card({ job }) {
  return (
    <Reveal className="group relative grid gap-2 rounded-xl p-5 transition-colors sm:grid-cols-[8rem_1fr] sm:gap-6 hover:bg-surface/60 hover:shadow-[0_1px_0_0_var(--color-line)]">
      <p className="pt-1 font-mono text-xs uppercase tracking-wider text-muted">
        {job.period}
      </p>

      <div>
        <h3 className="font-semibold text-fg">
          {job.role} <span className="text-accent-fg">· {job.company}</span>
        </h3>
        <p className="mt-0.5 text-xs text-muted">{job.location}</p>
        <p className="mt-3 text-sm leading-relaxed text-muted">{job.summary}</p>

        {job.link && (
          <a
            href={job.link.url}
            target="_blank"
            rel="noreferrer"
            className="group/link mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-accent-fg transition-colors hover:underline"
          >
            <FiGlobe size={15} />
            {job.link.label}
            <FiArrowUpRight className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
          </a>
        )}

        <ul className="mt-3 space-y-2">
          {job.highlights.map((h, i) => (
            <li key={i} className="flex gap-2 text-sm leading-relaxed text-muted">
              <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-accent/70" />
              <span>{h}</span>
            </li>
          ))}
        </ul>

        <ul className="mt-4 flex flex-wrap gap-2">
          {job.stack.map((s) => (
            <li
              key={s}
              className="rounded-full bg-accent/10 px-3 py-1 font-mono text-xs text-accent-fg"
            >
              {s}
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="scroll-mt-24 pt-20 lg:pt-24">
      <SectionHeading index={2} title="Experience" />
      <div className="space-y-4">
        {experience.map((job) => (
          <Card key={job.role + job.period} job={job} />
        ))}
      </div>
    </section>
  );
}
