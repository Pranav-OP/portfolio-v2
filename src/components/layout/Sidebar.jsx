import { motion } from "framer-motion";
import profile from "../../data/profile.json";
import socials from "../../data/socials.json";
import nav from "../../data/navigation.json";
import { socialIcons } from "../../lib/icons";
import ThemeToggle from "../ui/ThemeToggle";
import Greeting from "../ui/Greeting";

function Socials() {
  return (
    <ul className="flex items-center gap-5">
      {socials.map((s) => {
        const Icon = socialIcons[s.icon];
        return (
          <li key={s.label}>
            <a
              href={s.url}
              target={s.icon === "mail" ? undefined : "_blank"}
              rel="noreferrer"
              aria-label={s.label}
              title={`${s.label} — ${s.handle}`}
              className="text-muted transition-all hover:-translate-y-1 hover:text-accent-fg"
            >
              {Icon && <Icon size={21} />}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

export default function Sidebar({ active }) {
  return (
    <header className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:max-h-screen lg:w-[46%] lg:flex-col lg:justify-between lg:py-24">
      <div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mb-3 font-mono text-sm text-accent-fg">
            <Greeting />, my name is
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-fg sm:text-5xl">
            <a href="#about">{profile.name}</a>
          </h1>
          <h2 className="mt-3 text-lg font-medium text-fg-soft sm:text-xl">
            {profile.role}
          </h2>
          <p className="mt-4 max-w-xs leading-relaxed text-muted">
            {profile.tagline}
          </p>
        </motion.div>

        {/* Desktop nav with active-section highlight */}
        <nav className="mt-16 hidden lg:block" aria-label="In-page navigation">
          <ul className="space-y-4">
            {nav.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="group flex items-center gap-4 py-1"
                  >
                    <span
                      className={`h-px bg-current transition-all duration-300 ${
                        isActive
                          ? "w-16 text-accent-fg"
                          : "w-8 text-muted group-hover:w-16 group-hover:text-fg"
                      }`}
                    />
                    <span
                      className={`font-mono text-xs uppercase tracking-widest transition-colors ${
                        isActive
                          ? "text-accent-fg"
                          : "text-muted group-hover:text-fg"
                      }`}
                    >
                      {item.label}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      <div className="mt-10 flex items-center justify-between lg:mt-0">
        <Socials />
        <ThemeToggle className="hidden lg:grid" />
      </div>
    </header>
  );
}
