import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/**
 * AI crawlers are named explicitly rather than left to the wildcard rule.
 * Some of these bots treat an absent named rule conservatively, and being
 * quoted by an assistant is a distribution channel worth keeping open.
 */
const AI_AGENTS = [
  "GPTBot", // OpenAI — training + ChatGPT browsing
  "OAI-SearchBot", // OpenAI search index
  "ChatGPT-User", // ChatGPT on-demand fetch
  "ClaudeBot", // Anthropic
  "Claude-User",
  "Claude-SearchBot",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended", // Gemini / AI Overviews grounding
  "Applebot-Extended",
  "meta-externalagent",
  "Bingbot",
  "DuckAssistBot",
  "cohere-ai",
  "YouBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...AI_AGENTS.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
