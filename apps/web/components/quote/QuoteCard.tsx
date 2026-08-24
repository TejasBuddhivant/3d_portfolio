"use client";

import { useEffect } from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import FormatQuoteRoundedIcon from "@mui/icons-material/FormatQuoteRounded";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useQuote } from "@portfolio/hooks";
import { GlassCard, Reveal, SectionTitle, glassTints, palette } from "@portfolio/ui";

export default function QuoteCard() {
  const { quoteText, author, loading, error, isFallback, hasQuote, fetchQuote } =
    useQuote();

  // Fetch the first quote once the component mounts (client-side only).
  useEffect(() => {
    if (!hasQuote) {
      fetchQuote();
    }
  }, [hasQuote, fetchQuote]);

  return (
    <Box
      component="section"
      id="inspiration"
      aria-label="Daily inspiration quote"
      aria-live="polite"
      sx={{ py: { xs: 8, md: 12 } }}
    >
      <Container maxWidth="md">
        <Reveal>
          <SectionTitle overline="Developer Motivation" title="Daily Inspiration" />

          <GlassCard
            sx={{
              position: "relative",
              px: { xs: 3, sm: 6 },
              py: { xs: 5, md: 7 },
              textAlign: "center",
              overflow: "hidden",
              "&::before": {
                content: '""',
                position: "absolute",
                inset: 0,
                background:
                  "radial-gradient(circle at 50% 0%, rgba(65, 45, 21, 0.45) 0%, transparent 60%)",
                pointerEvents: "none",
              },
            }}
          >
            <Box
              aria-hidden
              sx={{
                display: "flex",
                justifyContent: "center",
                mb: 2,
                color: palette.sienna,
              }}
            >
              <FormatQuoteRoundedIcon sx={{ fontSize: 44 }} />
            </Box>

            {loading && !quoteText ? (
              <Stack alignItems="center" spacing={2} sx={{ py: 3 }}>
                <CircularProgress size={36} sx={{ color: "primary.main" }} />
                <Typography variant="body1" sx={{ color: "text.secondary" }}>
                  Loading inspiration...
                </Typography>
              </Stack>
            ) : (
              <Stack spacing={2} alignItems="center">
                <Typography
                  variant="h5"
                  component="blockquote"
                  sx={{
                    fontWeight: 500,
                    lineHeight: 1.55,
                    color: "text.primary",
                    m: 0,
                    fontSize: { xs: "1.15rem", md: "1.4rem" },
                    minHeight: { xs: 96, md: 112 },
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  &ldquo;{quoteText ?? "Great things are done by a series of small things brought together."}&rdquo;
                </Typography>

                <Typography variant="subtitle1" sx={{ color: "primary.main", fontStyle: "italic" }}>
                  — {author ?? "Vincent van Gogh"}
                </Typography>

                {isFallback ? (
                  <Typography variant="caption" sx={{ color: "text.secondary" }}>
                    Saved quote — shown because the live feed is unavailable or off-topic.
                  </Typography>
                ) : null}

                {error ? (
                  <Alert severity="warning" sx={{ width: "100%", maxWidth: 480 }}>
                    Unable to load inspiration. Showing a saved quote instead.
                  </Alert>
                ) : null}

                <Tooltip title={loading ? "Fetching a new quote…" : "Fetch another developer quote"}>
                  <span>
                    <Button
                      onClick={fetchQuote}
                      disabled={loading}
                      startIcon={
                        loading ? (
                          <CircularProgress size={16} sx={{ color: "inherit" }} />
                        ) : (
                          <RefreshIcon />
                        )
                      }
                      aria-label="Fetch a new motivational quote"
                      sx={{
                        mt: 1,
                        borderRadius: 2.5,
                        border: "1px solid",
                        borderColor: glassTints.borderHover,
                        color: "text.primary",
                        transition:
                          "transform 160ms ease, border-color 160ms ease, background-color 160ms ease",
                        "&:hover": {
                          transform: "translateY(-2px)",
                          borderColor: palette.amber,
                          backgroundColor: glassTints.soft,
                        },
                      }}
                    >
                      {loading ? "Fetching..." : "New Quote"}
                    </Button>
                  </span>
                </Tooltip>
              </Stack>
            )}

            <Divider sx={{ my: 3 }} />

            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              Inspirational quotes powered by{" "}
              <Link
                href="https://zenquotes.io/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="ZenQuotes website (opens in a new tab)"
                sx={{ color: "text.secondary", textDecorationColor: "inherit" }}
              >
                ZenQuotes
              </Link>
            </Typography>
          </GlassCard>
        </Reveal>
      </Container>
    </Box>
  );
}
