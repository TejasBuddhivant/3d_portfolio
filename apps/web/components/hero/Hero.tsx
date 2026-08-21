"use client";

import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { siteConfig } from "@portfolio/config";
import { useScrollToSection } from "@portfolio/hooks";
import { glassTints, GradientButton, palette } from "@portfolio/ui";

const socialButtons = [
  { label: "GitHub", href: "https://github.com/tejbuddhivant", icon: GitHubIcon },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/tejbuddhivant",
    icon: LinkedInIcon,
  },
  { label: "Email", href: `mailto:${siteConfig.email}`, icon: EmailIcon },
] as const;

export default function Hero() {
  const scrollToSection = useScrollToSection();

  return (
    <Box
      component="section"
      id="home"
      aria-label="Introduction"
      sx={{
        position: "relative",
        minHeight: { xs: "calc(100svh - 64px)", md: "calc(100svh - 72px)" },
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        // Subtle ambient glow behind the hero content.
        "&::before": {
          content: '""',
          position: "absolute",
          top: "-20%",
          right: "-10%",
          width: { xs: 320, md: 560 },
          height: { xs: 320, md: 560 },
          borderRadius: "50%",
          background: `radial-gradient(circle, ${palette.sienna}55 0%, transparent 70%)`,
          pointerEvents: "none",
        },
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={{ xs: 3, md: 4 }} sx={{ maxWidth: 760 }}>
          <Typography
            variant="overline"
            component="p"
            sx={{
              color: "text.secondary",
              letterSpacing: "0.35em",
              fontWeight: 600,
            }}
          >
            Hello, I&apos;m
          </Typography>

          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: { xs: "2.75rem", sm: "3.75rem", md: "4.5rem" },
              lineHeight: 1.05,
              color: "text.primary",
            }}
          >
            {siteConfig.name}
            <Box
              component="span"
              aria-hidden
              sx={{ color: palette.sienna, ml: 1 }}
            >
              .
            </Box>
          </Typography>

          <Typography
            variant="h4"
            component="p"
            sx={{
              color: "primary.main",
              fontWeight: 600,
              fontSize: { xs: "1.35rem", md: "1.75rem" },
            }}
          >
            {siteConfig.role}
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              maxWidth: 560,
              fontSize: { xs: "1rem", md: "1.125rem" },
              lineHeight: 1.7,
            }}
          >
            Building scalable web applications with{" "}
            {siteConfig.heroHighlights.join(", ")}. I turn complex problems
            into clean, reliable and user-focused software.
          </Typography>

          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {siteConfig.heroHighlights.map((tech) => (
              <Chip
                key={tech}
                label={tech}
                size="small"
                sx={{
                  borderColor: glassTints.border,
                  backgroundColor: glassTints.subtle,
                  color: "text.secondary",
                  transition: "border-color 180ms ease, color 180ms ease",
                  "&:hover": {
                    borderColor: glassTints.borderHover,
                    color: "text.primary",
                  },
                }}
                variant="outlined"
              />
            ))}
          </Stack>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{ pt: { xs: 1, md: 2 } }}
          >
            <GradientButton
              variantStyle="solid"
              endIcon={
                <ArrowForwardIcon
                  className="hero-cta-arrow"
                  sx={{ transition: "transform 180ms ease" }}
                />
              }
              onClick={() => scrollToSection("projects")}
              aria-label="Scroll to my projects"
              sx={{
                // Nudge the arrow on hover — small detail, premium feel.
                "&:hover .hero-cta-arrow": {
                  transform: "translateX(4px)",
                },
              }}
            >
              View My Work
            </GradientButton>
            <GradientButton
              variantStyle="outline"
              onClick={() => scrollToSection("contact")}
              aria-label="Scroll to contact section"
            >
              Contact Me
            </GradientButton>
          </Stack>

          <Stack direction="row" spacing={1.5} sx={{ pt: { xs: 1, md: 2 } }}>
            {socialButtons.map(({ label, href, icon: Icon }) => (
              <IconButton
                key={label}
                component="a"
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={`${label} (opens in a new tab)`}
                sx={{
                  color: "text.secondary",
                  border: "1px solid",
                  borderColor: glassTints.border,
                  borderRadius: 2.5,
                  transition:
                    "transform 180ms ease, color 180ms ease, border-color 180ms ease, background-color 180ms ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                    color: "primary.main",
                    borderColor: glassTints.borderHover,
                    backgroundColor: glassTints.soft,
                  },
                }}
              >
                <Icon fontSize="small" />
              </IconButton>
            ))}
          </Stack>
        </Stack>
      </Container>

      {/* Scroll indicator */}
      <IconButton
        aria-label="Scroll to about section"
        onClick={() => scrollToSection("about")}
        sx={{
          position: "absolute",
          left: "50%",
          bottom: 24,
          transform: "translateX(-50%)",
          color: "text.secondary",
          animation: "gentleBounce 2.2s ease-in-out infinite",
          "@keyframes gentleBounce": {
            "0%, 100%": { transform: "translate(-50%, 0)" },
            "50%": { transform: "translate(-50%, 8px)" },
          },
          "&:hover": { color: "primary.main", backgroundColor: "transparent" },
        }}
        size="large"
      >
        <KeyboardDoubleArrowDownIcon />
      </IconButton>
    </Box>
  );
}
