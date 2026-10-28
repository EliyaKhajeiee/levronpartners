import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // 2026-10-28: BuildExpo booth link. Lands on the homepage tagged so the
      // one-time welcome popup with the video shows (src/lib/buildExpo.ts).
      {
        source: "/buildexpo",
        destination: "/?utm_source=buildexpo&utm_medium=qr&utm_campaign=buildexpo_2026",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
