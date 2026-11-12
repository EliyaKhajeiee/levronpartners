"use client";

import { track } from "@vercel/analytics";

const VIDEO = {
  src: "/buildexpo/video.mp4",
  poster: "/buildexpo/poster.jpg",
};

export function DemoVideo() {
  return (
    <video
      controls
      playsInline
      preload="metadata"
      poster={VIDEO.poster}
      aria-label="Preconstruction demo: one real job, takeoff through a priced estimate, handed off in 2 hours"
      onPlay={() => track("estimation_demo_video_played")}
      className="border-line mt-10 w-full rounded-xl border bg-black shadow-sm"
      style={{ aspectRatio: "16 / 9" }}
    >
      <source src={VIDEO.src} type="video/mp4" />
    </video>
  );
}
