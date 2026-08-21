"use client";

import { useCallback } from "react";
import {
  fetchQuoteRequested,
  useAppDispatch,
  useAppSelector,
} from "@portfolio/store";

export interface UseQuoteResult {
  quoteText: string | null;
  author: string | null;
  loading: boolean;
  error: string | null;
  /** True when the current quote is the local fallback. */
  isFallback: boolean;
  /** True once a quote (API or fallback) has been displayed. */
  hasQuote: boolean;
  fetchQuote: () => void;
}

/**
 * Bridges the Redux quote slice to React components.
 * The actual network request happens in the saga layer — never here.
 */
export function useQuote(): UseQuoteResult {
  const dispatch = useAppDispatch();
  const { quote, status, error, isFallback } = useAppSelector(
    (state) => state.quote,
  );

  const fetchQuote = useCallback(() => {
    dispatch(fetchQuoteRequested());
  }, [dispatch]);

  return {
    quoteText: quote?.text ?? null,
    author: quote?.author ?? null,
    loading: status === "loading",
    error,
    isFallback,
    hasQuote: quote !== null,
    fetchQuote,
  };
}
