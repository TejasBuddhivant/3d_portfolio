"use client";

import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { alpha, useTheme } from "@mui/material/styles";
import { navItems } from "@portfolio/config";
import { useAppSelector } from "@portfolio/store";

/**
 * Fixed Spline robot backdrop shared by every page.
 *
 * Composition rules:
 * - dark: robot stays centred full-bleed (the original look).
 * - light (md+): the robot alternates sides as the visitor moves through the
 *   sections/pages — odd-indexed sections (about, experience, education) put
 *   it on the left, even-indexed ones on the right — with a smooth slide.
 * - light mode also adds a theme-coloured scrim over the scene on the copy
 *   side, mirroring the robot, so text never sits on the bright 3D render.
 */

/** Slide (as % of viewport) reproducing the pinned-side composition. */
const SIDE_SHIFT = 21;
/** Slow, unhurried ease-in-out for the side-to-side slide. */
const SLIDE_TRANSITION = "transform 1150ms cubic-bezier(0.65, 0, 0.35, 1)";

const LOGO_POLL_MS = 300;
/** Stop probing after ~30s — the viewer has either loaded or failed by then. */
const LOGO_POLL_CEILING_MS = 30_000;

const SECTION_IDS = navItems.map((item) => item.sectionId);

type Side = "left" | "right";

function sectionSide(activeSection: string): Side {
  const index = SECTION_IDS.indexOf(activeSection);
  // Unknown section (or none in view yet): keep the default right placement.
  return index % 2 === 1 ? "left" : "right";
}

export default function SplineBackground() {
  const [mounted, setMounted] = useState(false);
  const theme = useTheme();
  const activeSection = useAppSelector((state) => state.ui.activeSection);
  const isLight = theme.palette.mode === "light";

  useEffect(() => {
    // Inject the Spline module script dynamically on the client side
    const scriptId = "spline-viewer-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.type = "module";
      // Use unpkg to avoid Next.js routing bugs with WASM
      script.src =
        "https://unpkg.com/@splinetool/viewer@1.9.90/build/spline-viewer.js";
      document.head.appendChild(script);
    }

    // Avoid synchronous state updates inside effects to satisfy strict linters
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    /**
     * The free viewer renders its watermark badge (#logo) inside its open
     * shadow root — inject a stylesheet there to hide it. The web component
     * upgrades asynchronously, so probe briefly instead of guessing timing.
     */
    let hidden = false;
    let elapsed = 0;

    const poll = window.setInterval(() => {
      elapsed += LOGO_POLL_MS;

      if (!hidden) {
        const shadowRoot = document.querySelector("spline-viewer")?.shadowRoot;
        if (
          shadowRoot &&
          !shadowRoot.querySelector("style[data-spline-brand-hide]")
        ) {
          const style = document.createElement("style");
          style.setAttribute("data-spline-brand-hide", "");
          style.textContent = "#logo { display: none !important; }";
          shadowRoot.appendChild(style);
          hidden = true;
          window.clearInterval(poll);
        }
      }

      if (elapsed >= LOGO_POLL_CEILING_MS) window.clearInterval(poll);
    }, LOGO_POLL_MS);

    return () => window.clearInterval(poll);
  }, []);

  // Cast the web component tag to avoid JSX IntrinsicElements checks without using 'any'
  const SplineViewerTag = "spline-viewer" as unknown as React.ElementType;

  const side: Side | null = isLight ? sectionSide(activeSection) : null;
  const shift =
    side === null ? 0 : side === "left" ? -SIDE_SHIFT : SIDE_SHIFT;
  // Opaque edge of the scrim must sit under the copy, i.e. opposite the robot.
  const scrimDirection = side === "left" ? 270 : 90;

  return (
    <Box
      aria-hidden
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        overflow: "hidden",
        backgroundColor: "background.default",
      }}
    >
      {mounted && (
        <Box
          sx={{
            height: "100%",
            width: "100%",
            // Mobile stays full-bleed; desktop slides the robot between sides.
            transform: { xs: "none", md: `translateX(${shift}%)` },
            transition: { md: SLIDE_TRANSITION },
            "@media (prefers-reduced-motion: reduce)": { transition: "none" },
          }}
        >
          <SplineViewerTag
            loading-anim-type="spinner-small-dark"
            url="https://prod.spline.design/UHmqrqtbop3bSBeh/scene.splinecode"
            style={{ width: "100%", height: "100%", display: "block" }}
          />
        </Box>
      )}

      {/* Legibility scrim — light mode only, mirrors the robot's side. */}
      {isLight && (
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background: {
              xs: `linear-gradient(180deg, ${alpha(
                theme.palette.background.default,
                0.88,
              )} 0%, transparent 45%)`,
              md: `linear-gradient(${scrimDirection}deg, ${alpha(
                theme.palette.background.default,
                0.94,
              )} 0%, transparent 55%)`,
            },
          }}
        />
      )}
    </Box>
  );
}
