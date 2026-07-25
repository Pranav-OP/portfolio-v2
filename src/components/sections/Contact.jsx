import { FiMapPin } from "react-icons/fi";
import profile from "../../data/profile.json";
import socials from "../../data/socials.json";
import { socialIcons } from "../../lib/icons";
import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 pt-20 lg:pt-24">
      <SectionHeading index={6} title="Get in Touch" />

      <Reveal className="rounded-2xl border border-line bg-surface/50 p-8 text-center backdrop-blur sm:p-12">
        <p className="mb-2 font-mono text-sm text-accent-fg">What's next?</p>
        <h3 className="text-2xl font-bold text-fg sm:text-3xl">Let's build something.</h3>
        <p className="mx-auto mt-4 max-w-md leading-relaxed text-muted">
          {profile.availability} My inbox is always open — whether you have a
          question, an opportunity, or just want to say hi, I'll get back to you.
        </p>

        <a
          href={`mailto:${profile.email}`}
          className="mt-8 inline-flex items-center gap-2 rounded-lg border border-accent px-6 py-3 text-sm font-semibold text-accent-fg transition-all hover:-translate-y-0.5 hover:bg-accent/10 accent-glow"
        >
          Say Hello
        </a>

        <div className="mt-8 flex items-center justify-center gap-6">
          {socials
            .filter((s) => s.icon !== "mail")
            .map((s) => {
              const Icon = socialIcons[s.icon];
              return (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="text-muted transition-all hover:-translate-y-1 hover:text-accent-fg"
                >
                  {Icon && <Icon size={20} />}
                </a>
              );
            })}
        </div>

        <p className="mt-8 flex items-center justify-center gap-1.5 text-xs text-muted">
          <FiMapPin size={13} /> {profile.location}
        </p>
      </Reveal>

      <footer className="mt-16 pb-10 text-center font-mono text-xs text-muted">
        <p>
          Designed &amp; built by {profile.name}. Data-driven with React, Vite,
          Tailwind &amp; Framer Motion.
        </p>
      </footer>
    </section>
  );
}
