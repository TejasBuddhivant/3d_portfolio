import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { siteConfig } from "@portfolio/config";
import { glassTints, palette } from "@portfolio/ui";

const socialButtons = [
  { label: "GitHub", href: "https://github.com/tejbuddhivant", icon: GitHubIcon },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/tejbuddhivant",
    icon: LinkedInIcon,
  },
  { label: "Email", href: `mailto:${siteConfig.email}`, icon: EmailIcon },
] as const;

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        borderTop: "1px solid",
        borderColor: glassTints.border,
        backgroundColor: palette.brown,
        py: { xs: 5, md: 6 },
        mt: { xs: 8, md: 12 },
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 3, md: 2 }}
          alignItems="center"
          justifyContent="space-between"
        >
          <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              © {new Date().getFullYear()} {siteConfig.name}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Built with Next.js + MUI — Redux Toolkit &amp; Redux Saga inside.
            </Typography>
          </Box>

          <Stack direction="row" spacing={1}>
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
                  transition:
                    "transform 180ms ease, color 180ms ease, border-color 180ms ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                    color: "primary.main",
                    borderColor: glassTints.borderHover,
                  },
                }}
              >
                <Icon fontSize="small" />
              </IconButton>
            ))}
          </Stack>
        </Stack>

        <Divider sx={{ my: 3 }} />

        <Typography
          variant="caption"
          sx={{
            display: "block",
            textAlign: "center",
            color: "text.secondary",
          }}
        >
          Developer quotes powered by{" "}
          <Link
            href="https://zenquotes.io/"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ color: "text.secondary", textDecorationColor: "inherit" }}
          >
            ZenQuotes
          </Link>{" "}
          · Designed and built by {siteConfig.name}
        </Typography>
      </Container>
    </Box>
  );
}
