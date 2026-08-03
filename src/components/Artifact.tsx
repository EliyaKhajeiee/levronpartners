import type { ReactNode } from "react";

type ArtifactProps = {
  /** Small mono tag in the chrome bar, left of the title. */
  label?: string;
  /** Reads as a filename — this is a document, not a product screenshot. */
  title: string;
  /** Quiet line along the bottom edge. Omit and the rule is dropped too. */
  footnote?: string;
  children: ReactNode;
  className?: string;
};

/**
 * A framed surface that holds a document — chrome bar, ruled ground, contents.
 *
 * Deliberately not a fake app window: no traffic lights, no toolbar, nothing
 * mimicking software we'd be claiming to have shipped. The frame says "this is
 * a thing we hand you", and the mono title says which thing. Keep whatever
 * goes inside true — the last pass at product panels here was invented, read
 * as invented, and got pulled.
 */
export function Artifact({
  label = "Artifact",
  title,
  footnote,
  children,
  className = "",
}: ArtifactProps) {
  return (
    <figure
      data-rise
      className={`border-line overflow-hidden rounded-[1.25rem] border bg-white/45 ${className}`}
    >
      <div className="border-line flex items-center justify-between gap-4 border-b px-5 py-3.5 md:px-7">
        <div className="flex items-center gap-2.5">
          <span
            className="bg-teal size-1.5 shrink-0 rounded-full"
            aria-hidden="true"
          />
          <span className="text-muted font-mono text-[0.6875rem] tracking-[0.14em] uppercase">
            {label}
          </span>
        </div>

        <span className="text-muted truncate font-mono text-[0.75rem]">
          {title}
        </span>
      </div>

      <div className="blueprint-grid px-5 pt-9 pb-4 md:px-7 md:pt-12 md:pb-6">
        {children}
      </div>

      {footnote && (
        <figcaption className="border-line text-muted border-t px-5 py-3.5 font-mono text-[0.6875rem] md:px-7">
          {footnote}
        </figcaption>
      )}
    </figure>
  );
}
