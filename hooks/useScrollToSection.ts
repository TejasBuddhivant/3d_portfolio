"use client";

import { useCallback } from "react";

/**
 * Smoothly scrolls to a section by its DOM id.
 * Sections are expected to declare `scroll-margin-top` so the sticky
 * navbar never covers the section heading.
 */
export function useScrollToSection() {
  return useCallback((sectionId: string) => {
    if (typeof window === "undefined") return;

    const element = document.getElementById(sectionId);
    if (!element) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    element.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
  }, []);
}
