/**
 * Keywords used to decide whether a quote fits a developer /
 * technology / career-oriented portfolio.
 */
export const developerQuoteKeywords: readonly string[] = [
  "technology",
  "software",
  "program",
  "programming",
  "programmer",
  "code",
  "coding",
  "computer",
  "learning",
  "engineer",
  "engineering",
  "innovation",
  "innovate",
  "creativity",
  "creative",
  "problem",
  "solve",
  "solving",
  "failure",
  "fail",
  "success",
  "succeed",
  "discipline",
  "development",
  "developer",
  "knowledge",
  "curiosity",
  "curious",
  "growth",
  "grow",
  "building",
  "build",
  "builds",
  "built",
  "make",
  "making",
  "design",
  "science",
  "scientific",
  "machine",
  "digital",
  "future",
  "practice",
  "craft",
  "work",
  "working",
  "simple",
  "simplicity",
  "complex",
  "quality",
  "excellence",
  "perseverance",
  "persistence",
  "impossible",
  "possible",
  "idea",
  "ideas",
  "imagine",
  "imagination",
] as const;

/**
 * Evaluates whether a quote is relevant for a developer portfolio by
 * scanning its text (and author) for the keywords above.
 */
export function isDeveloperQuote(quoteText: string, author: string): boolean {
  const haystack = `${quoteText} ${author}`.toLowerCase();
  return developerQuoteKeywords.some((keyword) => haystack.includes(keyword));
}
