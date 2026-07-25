import Reveal from "./Reveal";

/**
 * Numbered, monospace section heading. `index` renders as a "01." prefix.
 * On small screens it doubles as the sticky-visible label for each section.
 */
export default function SectionHeading({ index, title, className = "" }) {
  return (
    <Reveal
      as="h2"
      className={`flex items-center gap-3 text-fg font-bold tracking-tight text-2xl sm:text-3xl mb-8 ${className}`}
    >
      {index != null && (
        <span className="font-mono text-accent-fg text-lg sm:text-xl">
          {String(index).padStart(2, "0")}.
        </span>
      )}
      <span>{title}</span>
      <span className="ml-2 h-px flex-1 max-w-40 bg-line" aria-hidden="true" />
    </Reveal>
  );
}
