"use client";

import { useEffect, useRef } from "react";
import { setActiveSection, useAppDispatch } from "@/store";

/**
 * Observes the landing-page sections and keeps the Redux `ui.activeSection`
 * value in sync so the navbar can highlight where the user currently is.
 *
 * Why the bookkeeping below: an IntersectionObserver callback only reports
 * the sections whose status *changed* since the previous callback. Deciding
 * from that batch alone desynchronises the indicator while a smooth scroll
 * animates (the last delivery is often just "a section left the band", which
 * would otherwise freeze a stale value). We therefore keep the full picture
 * of what is inside the observation band and resolve the winner from it on
 * every event.
 */
export function useActiveSection(
  sectionIds: readonly string[],
  /** Change this (e.g. the pathname) to re-query the DOM after route changes. */
  observationKey?: string,
): void {
  const dispatch = useAppDispatch();

  // Callers typically build the id list inline (`navItems.map(...)`), which
  // yields a fresh array identity on every render. Keying the effect on a
  // primitive keeps one long-lived observer instead of disconnecting and
  // reconnecting it constantly (each reconnect replays "initial" records and
  // races the scroll spy).
  const sectionIdsKey = sectionIds.join("|");

  // Last id we dispatched; repeated callbacks during one smooth scroll then
  // skip identical Redux updates instead of spamming re-renders.
  const lastDispatchedRef = useRef<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (typeof IntersectionObserver === "undefined") return;

    const elements = sectionIdsKey
      .split("|")
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) return;

    /** id -> boundingClientRect.top for every section inside the band. */
    const topOfVisible = new Map<string, number>();

    /** Topmost visible section = the one closest to the reading position. */
    const topmostVisibleId = (): string | null => {
      let bestId: string | null = null;
      let bestTop = Number.POSITIVE_INFINITY;
      topOfVisible.forEach((top, id) => {
        if (top < bestTop) {
          bestTop = top;
          bestId = id;
        }
      });
      return bestId;
    };

    const resolveActiveSection = () => {
      // Pinned to the bottom of the page, the last section can sit entirely
      // below the observation band, so trust nav order over geometry there.
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 1;

      const nextId = atBottom
        ? elements[elements.length - 1].id
        : topmostVisibleId();

      if (nextId === null || nextId === lastDispatchedRef.current) return;
      lastDispatchedRef.current = nextId;
      dispatch(setActiveSection(nextId));
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            topOfVisible.set(entry.target.id, entry.boundingClientRect.top);
          } else {
            topOfVisible.delete(entry.target.id);
          }
        }
        resolveActiveSection();
      },
      // Narrow band across the upper third of the viewport: matches the
      // section the user is actually reading.
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 },
    );

    elements.forEach((element) => observer.observe(element));

    // Reaching the bottom does not necessarily change any section's band
    // status, so watch scrolls directly for the bottom-of-page case above.
    const handleScroll = () => resolveActiveSection();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [dispatch, sectionIdsKey, observationKey]);
}
