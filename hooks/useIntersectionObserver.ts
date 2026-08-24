"use client";

import { useEffect, useRef, useState } from "react";

export interface UseIntersectionObserverOptions {
  /** Fraction of the element that must be visible (0–1). */
  threshold?: number;
  /** Shrink the viewport by this px before measuring — useful with sticky headers. */
  rootMargin?: string;
  /** Fire only the first time the element enters the viewport. */
  once?: boolean;
}

export interface UseIntersectionObserverResult<T extends HTMLElement> {
  ref: React.RefObject<T | null>;
  isIntersecting: boolean;
}

/**
 * Small typed wrapper around `IntersectionObserver` used for
 * reveal-on-scroll effects and scroll-spy behaviour.
 */
export function useIntersectionObserver<T extends HTMLElement = HTMLDivElement>(
  options: UseIntersectionObserverOptions = {},
): UseIntersectionObserverResult<T> {
  const { threshold = 0.15, rootMargin = "0px", once = true } = options;
  const ref = useRef<T | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (typeof IntersectionObserver === "undefined") {
      // Very old browsers: show content immediately instead of hiding it.
      setIsIntersecting(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          if (once) observer.unobserve(entry.target);
        } else if (!once) {
          setIsIntersecting(false);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, isIntersecting };
}
