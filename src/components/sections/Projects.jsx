import { motion } from "framer-motion";
import { FiGithub, FiExternalLink, FiFolder } from "react-icons/fi";
import projects from "../../data/projects.json";
import SectionHeading from "../ui/SectionHeading";
import { stagger, fadeUp, viewportOnce } from "../../lib/motion";

function ProjectCard({ project }) {
  return (
    <motion.article
      variants={fadeUp}
      className="group flex flex-col overflow-hidden rounded-xl border border-line bg-surface/50 backdrop-blur transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/60 hover:shadow-[0_20px_40px_-24px_var(--color-line)]"
    >
      {project.image ? (
        <div className="relative aspect-video overflow-hidden border-b border-line">
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="h-full w-full object-cover object-top opacity-90 transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      ) : (
        <div className="flex aspect-video items-center justify-center border-b border-line bg-gradient-to-br from-surface-2 to-surface">
          <FiFolder className="text-accent-fg/60" size={40} />
        </div>
      )}

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-start justify-between gap-3">
          <h3 className="font-semibold text-fg transition-colors group-hover:text-accent-fg">
            {project.title}
          </h3>
          <div className="flex items-center gap-3 text-muted">
            {project.source && (
              <a
                href={project.source}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.title} source code`}
                className="transition-colors hover:text-accent-fg"
              >
                <FiGithub size={18} />
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.title} live demo`}
                className="transition-colors hover:text-accent-fg"
              >
                <FiExternalLink size={18} />
              </a>
            )}
          </div>
        </div>

        <p className="flex-1 text-sm leading-relaxed text-muted">
          {project.description}
        </p>

        <ul className="mt-4 flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <li key={s} className="font-mono text-xs text-muted">
              {s}
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="scroll-mt-24 pt-20 lg:pt-24">
      <SectionHeading index={5} title="Projects" />
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="grid gap-5 sm:grid-cols-2"
      >
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </motion.div>
    </section>
  );
}
