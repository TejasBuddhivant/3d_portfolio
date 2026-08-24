"use client";

import Box, { type BoxProps } from "@mui/material/Box";
import { useIntersectionObserver } from "@/hooks";

export interface RevealProps extends BoxProps {
  /** Delay (ms) before the reveal transition starts — for stagger effects. */
  delay?: number;
}

/**
 * Fades content in and lifts it slightly the first time it scrolls
 * into view. Uses IntersectionObserver + CSS transitions only.
 * Content stays visible when JavaScript is disabled because the
 * hidden state is applied via inline style after mount.
 */
export function Reveal({ delay = 0, sx, ...props }: RevealProps) {
  const { ref, isIntersecting } = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.12,
  });

  return (
    <Box
      ref={ref}
      sx={[
        {
          opacity: isIntersecting ? 1 : 0,
          transform: isIntersecting ? "none" : "translateY(24px)",
          transition: `opacity 600ms ease ${delay}ms, transform 600ms ease ${delay}ms`,
          willChange: "opacity, transform",
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...props}
    />
  );
}
