import { axiosInstance } from "./axiosInstance";
import type { Quote, ZenQuoteDto } from "./quoteTypes";

/**
 * Fetches one random quote from ZenQuotes and normalises it.
 * Throws when the response is empty or malformed so callers can retry.
 */
export async function getRandomQuote(): Promise<Quote> {
  const response = await axiosInstance.get<ZenQuoteDto[]>("/random", {
    // ZenQuotes ignores caching proxies; keep every request fresh.
    headers: { "Cache-Control": "no-cache" },
  });

  const data: unknown = response.data;
  const item = Array.isArray(data) ? (data[0] as ZenQuoteDto | undefined) : undefined;

  if (!item || typeof item.q !== "string" || typeof item.a !== "string") {
    throw new Error("ZenQuotes returned an unexpected response shape.");
  }

  return {
    text: item.q.trim(),
    author: item.a.trim(),
  };
}
