import type { Quote } from "@portfolio/api";

/**
 * Local, developer-themed fallback quotes. They are only shown when the
 * ZenQuotes API fails or keeps returning off-topic quotes — the API
 * integration itself is never replaced by these constants.
 */
export const fallbackQuotes: readonly Quote[] = [
  {
    text: "First, solve the problem. Then, write the code.",
    author: "John Johnson",
  },
  {
    text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    author: "Martin Fowler",
  },
  {
    text: "Programs must be written for people to read, and only incidentally for machines to execute.",
    author: "Harold Abelson",
  },
  {
    text: "Simplicity is prerequisite for reliability.",
    author: "Edsger W. Dijkstra",
  },
  {
    text: "The best way to predict the future is to invent it.",
    author: "Alan Kay",
  },
] as const;

/** Deterministically picks a fallback quote so repeat visits stay stable. */
export function getFallbackQuote(seed: number = Date.now()): Quote {
  const index = Math.abs(Math.floor(seed)) % fallbackQuotes.length;
  return fallbackQuotes[index];
}
