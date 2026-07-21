import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/* AI answer engines (ChatGPT, Claude, Perplexity, Gemini, Copilot…) each
   crawl with their own user-agent. Explicitly allowing them signals the site
   wants to be cited in AI answers and protects against any future
   default-deny behaviour. */
const AI_CRAWLERS = [
  "GPTBot", // OpenAI training
  "OAI-SearchBot", // ChatGPT search
  "ChatGPT-User", // ChatGPT live browsing
  "ClaudeBot", // Anthropic
  "Claude-Web", // Claude live browsing
  "anthropic-ai",
  "PerplexityBot", // Perplexity
  "Perplexity-User",
  "Google-Extended", // Gemini
  "Applebot-Extended", // Apple Intelligence
  "Amazonbot", // Alexa / Rufus
  "meta-externalagent", // Meta AI
  "cohere-ai",
  "CCBot", // Common Crawl (feeds many LLM training sets)
  "DuckAssistBot", // DuckDuckGo AI
  "Bingbot", // Bing / Copilot
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
