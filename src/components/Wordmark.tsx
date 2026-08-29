import Image from "next/image";
import { Mark } from "./Mark";

/**
 * Brand lockup: nav-mark · hairline · "LEVRON / PARTNERS" wordmark.
 */
export function Wordmark({
  variant = "horizontal",
  className = "",
}: {
  variant?: "horizontal" | "stacked";
  className?: string;
}) {
  const words = (
    <Image
      src="/brand/wordmark.png"
      alt=""
      width={597}
      height={130}
      className="h-[1.25em] w-auto"
      aria-hidden="true"
      priority
    />
  );

  if (variant === "stacked") {
    return (
      <span
        className={`inline-flex flex-col items-center gap-[0.75em] ${className}`}
      >
        <Mark className="h-[0.85em] w-auto" />
        {words}
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center gap-[0.65em] ${className}`}>
      <Mark className="h-[1.05em] w-auto shrink-0" />
      <span
        className="bg-current h-[1.25em] w-px opacity-25"
        aria-hidden="true"
      />
      {words}
    </span>
  );
}
