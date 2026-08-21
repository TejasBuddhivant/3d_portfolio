"use client";

import Button, { type ButtonProps } from "@mui/material/Button";
import { glassTints } from "../theme/theme";

export interface GradientButtonProps extends ButtonProps {
  /** "solid" = filled cream CTA, "outline" = ghost button. */
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
          backgroundColor: "#E1DCC9",
          color: "#000000",
          "&:hover": {
            backgroundColor: "#F2EEE0",
            boxShadow: "0 10px 28px rgba(225, 220, 201, 0.18)",
            transform: "translateY(-2px)",
          },
        },
        variantStyle === "outline" && {
          backgroundColor: "transparent",
          color: "#E1DCC9",
          border: "1px solid",
          borderColor: glassTints.border,
          "&:hover": {
            backgroundColor: "rgba(225, 220, 201, 0.06)",
            borderColor: glassTints.borderHover,
            color: "#FFFFFF",
            transform: "translateY(-2px)",
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...props}
    />
  );
}
