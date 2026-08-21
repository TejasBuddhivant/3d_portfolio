"use client";

import { useEffect } from "react";
import { setActiveSection, useAppDispatch } from "@portfolio/store";

/**
 * Observes the landing-page sections and keeps the Redux `ui.activeSection`
 * value in sync so the navbar can highlight where the user currently is.
 */
export function useActiveSection(sectionIds: readonly string[]): void {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) return;

    // The section closest to the top third of the viewport wins.
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          dispatch(setActiveSection(visible[0].target.id));
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [dispatch, sectionIds]);
}
