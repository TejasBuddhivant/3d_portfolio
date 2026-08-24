import { getRandomQuote, isDeveloperQuote } from "@/api";
import type { Quote } from "@/api";
import { call, delay, put, takeLatest } from "redux-saga/effects";
import { getFallbackQuote } from "../constants/fallbackQuotes";
import {
  fetchQuoteFailed,
  fetchQuoteRequested,
  fetchQuoteSucceeded,
} from "../slices/quoteSlice";

/** Hard cap on API attempts per user request (keeps us inside free-tier limits). */
export const MAX_QUOTE_ATTEMPTS = 3;

/** Base wait (ms) between attempts — ZenQuotes allows ~5 requests / 30s. */
const RETRY_DELAY_MS = 1_500;

/**
 * Fetches a random quote and keeps only developer/technology-relevant ones.
 * Off-topic quotes trigger at most `MAX_QUOTE_ATTEMPTS` requests; if nothing
 * suitable arrives the local fallback quote is used instead.
 */
export function* fetchQuoteSaga() {
  for (let attempt = 1; attempt <= MAX_QUOTE_ATTEMPTS; attempt += 1) {
    try {
      const quote: Quote = yield call(getRandomQuote);

      if (isDeveloperQuote(quote.text, quote.author)) {
        yield put(fetchQuoteSucceeded({ quote, isFallback: false }));
        return;
      }

      // Off-topic quote — back off before trying again to respect rate limits.
      if (attempt < MAX_QUOTE_ATTEMPTS) {
        yield delay(RETRY_DELAY_MS * attempt);
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unknown network error.";
      yield put(fetchQuoteFailed(message));
      return;
    }
  }

  // All attempts exhausted without an on-topic quote: use the saved quote.
  yield put(fetchQuoteSucceeded({ quote: getFallbackQuote(), isFallback: true }));
}

export function* watchFetchQuote() {
  yield takeLatest(fetchQuoteRequested.type, fetchQuoteSaga);
}
