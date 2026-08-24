"use client";

import Button, { type ButtonProps } from "@mui/material/Button";
import { glassTints, palette } from "../theme/theme";

export interface GradientButtonProps extends ButtonProps {
  /** "solid" = filled amber-gradient CTA, "outline" = ghost button. */
  variantStyle?: "solid" | "outline";
}

/**
 * Primary call-to-action button with premium micro-interactions:
 * hover lift, brighter border and background transition — all CSS only.
 */
export function GradientButton({
  variantStyle = "solid",
  sx,
  ...props
}: GradientButtonProps) {
  return (
    <Button
      disableElevation
      sx={[
        {
          py: 1.4,
          px: 3.5,
          borderRadius: 2.5,
          transition:
            "transform 180ms ease, box-shadow 180ms ease, background-color 180ms ease, border-color 180ms ease, color 180ms ease",
          "&:hover": {
            transform: "translateY(-2px)",
          },
          "&:active": {
            transform: "translateY(0)",
          },
        },
        variantStyle === "solid" && {
          backgroundImage: `linear-gradient(135deg, ${palette.amber} 0%, ${palette.sienna} 100%)`,
          color: palette.black,
          "&:hover": {
            backgroundImage: `linear-gradient(135deg, #FFCE5C 0%, #DE8E2B 100%)`,
            boxShadow: `0 10px 30px rgba(255, 182, 39, 0.32)`,
            transform: "translateY(-2px)",
          },
        },
        variantStyle === "outline" && {
          backgroundColor: "transparent",
          color: "text.primary",
          border: "1px solid",
          borderColor: glassTints.border,
          "&:hover": {
            backgroundColor: glassTints.subtle,
            borderColor: glassTints.borderHover,
            color: "primary.main",
            transform: "translateY(-2px)",
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...props}
    />
  );
}
