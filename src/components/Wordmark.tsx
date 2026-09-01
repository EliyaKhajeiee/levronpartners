import Image from "next/image";
import { Mark } from "./Mark";

const WORDMARKS = {
  partners: { src: "/brand/wordmark.png", width: 597, height: 130, className: "h-[1.25em] w-auto" },
  construction: {
    src: "/brand/wordmark-construction.png",
    width: 962,
    height: 168,
    className: "h-[1.35em] w-auto",
  },
  home_services: {
    src: "/brand/wordmark-home-services.png",
    width: 971,
    height: 161,
    className: "h-[1.35em] w-auto",
  },
  plumbing: {
    src: "/brand/wordmark-plumbing.png",
    width: 903,
    height: 150,
    className: "h-[1.35em] w-auto",
  },
  roofing: {
    src: "/brand/wordmark-roofing.png",
    width: 958,
    height: 149,
    className: "h-[1.35em] w-auto",
  },
  hvac: {
    src: "/brand/wordmark-hvac.png",
    width: 946,
    height: 148,
    className: "h-[1.35em] w-auto",
  },
  electrical: {
    src: "/brand/wordmark-electrical.png",
    width: 955,
    height: 153,
    className: "h-[1.35em] w-auto",
  },
} as const;

/**
 * Brand lockup: nav-mark · hairline · "LEVRON / PARTNERS" wordmark.
 */
export function Wordmark({
  variant = "horizontal",
  brand = "partners",
  className = "",
}: {
  variant?: "horizontal" | "stacked";
  brand?: keyof typeof WORDMARKS;
  className?: string;
}) {
  const wm = WORDMARKS[brand];
  const words = (
    <Image
      src={wm.src}
      alt=""
      width={wm.width}
      height={wm.height}
      className={wm.className}
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
