import type { Quote } from "@/api";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type QuoteStatus = "idle" | "loading" | "success" | "error";

export interface QuoteState {
  quote: Quote | null;
  status: QuoteStatus;
  /** True when the displayed quote comes from the local fallback list. */
  isFallback: boolean;
  /** Human-readable error message when status === "error". */
  error: string | null;
}

const initialState: QuoteState = {
  quote: null,
  status: "idle",
  isFallback: false,
  error: null,
};

export const quoteSlice = createSlice({
  name: "quote",
  initialState,
  reducers: {
    /** Dispatched by the UI; picked up by the quote saga. */
    fetchQuoteRequested: (state, _action: PayloadAction<void>) => {
      state.status = "loading";
      state.error = null;
    },
    fetchQuoteSucceeded: (
      state,
      action: PayloadAction<{ quote: Quote; isFallback: boolean }>,
    ) => {
      state.quote = action.payload.quote;
      state.isFallback = action.payload.isFallback;
      state.status = "success";
      state.error = null;
    },
    fetchQuoteFailed: (state, action: PayloadAction<string>) => {
      state.status = "error";
      state.error = action.payload;
    },
  },
});

export const { fetchQuoteRequested, fetchQuoteSucceeded, fetchQuoteFailed } =
  quoteSlice.actions;

export default quoteSlice.reducer;
