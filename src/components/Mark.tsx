import Image from "next/image";

/**
 * The Levron mark — same asset as levronlabs.com `/brand/nav-mark.png`.
 * Dark block with a transparent stepped channel.
 */
export function Mark({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/brand/mark.png"
      alt=""
      width={500}
      height={200}
      className={className}
      aria-hidden="true"
    />
  );
}
