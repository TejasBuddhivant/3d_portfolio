"use client";

import Card, { type CardProps } from "@mui/material/Card";
import { glassTints } from "../theme/theme";

export interface GlassCardProps extends CardProps {
  /** Lift the card and brighten its border on hover. */
  interactive?: boolean;
}

/**
 * Semi-transparent "glass" surface used across the portfolio.
 * Purely CSS-driven so it stays cheap to render.
 */
export function GlassCard({
  interactive = false,
  sx,
  ...props
}: GlassCardProps) {
  return (
    <Card
      elevation={0}
      sx={[
        {
          backgroundColor: glassTints.subtle,
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid",
          borderColor: glassTints.border,
          borderRadius: 3,
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.35)",
          transition:
            "transform 200ms ease, border-color 200ms ease, box-shadow 200ms ease, background-color 200ms ease",
        },
        interactive && {
          "&:hover": {
            transform: "translateY(-4px)",
            borderColor: glassTints.borderHover,
            backgroundColor: glassTints.soft,
            boxShadow: "0 14px 40px rgba(0, 0, 0, 0.5)",
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...props}
    />
  );
}
