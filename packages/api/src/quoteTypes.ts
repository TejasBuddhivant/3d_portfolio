/**
 * Raw item shape returned by the ZenQuotes `/random` endpoint.
 * @see https://zenquotes.io/docs
 */
export interface ZenQuoteDto {
  /** Quote text. */
  q: string;
  /** Author name. */
  a: string;
  /** Pre-rendered HTML (unused by this app). */
  h: string;
}

/** Normalised quote used across the application. */
export interface Quote {
  text: string;
  author: string;
}
