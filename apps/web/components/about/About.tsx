import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import { siteConfig } from "@portfolio/config";
import { GlassCard, Reveal, SectionTitle, glassTints } from "@portfolio/ui";

const focusAreas = [
  "Full stack web development",
  "REST API design with Java & Spring Boot",
  "Modern React & Next.js interfaces",
  "Database modelling with MySQL",
  "AI-assisted developer tooling",
  "Continuous learning & problem solving",
] as const;

const quickFacts = [
  { icon: LocationOnOutlinedIcon, label: "Location", value: siteConfig.location },
  { icon: WorkOutlineIcon, label: "Status", value: siteConfig.availability },
  {
    icon: SchoolOutlinedIcon,
    label: "Education",
    value: "BBA — Computer Applications, SPPU (2025)",
  },
] as const;

export default function About() {
  return (
    <Box
      component="section"
      id="about"
      aria-label="About me"
      sx={{ py: { xs: 8, md: 12 } }}
    >
      <Container maxWidth="lg">
        <Reveal>
          <SectionTitle
            overline="Who I Am"
            title="About Me"
            subtitle={siteConfig.tagline}
          />
        </Reveal>

        <Grid container spacing={{ xs: 4, md: 6 }} alignItems="stretch">
          <Grid size={{ xs: 12, md: 7 }}>
            <Reveal>
              <Typography
                variant="body1"
                sx={{
                  color: "text.secondary",
                  lineHeight: 1.8,
                  fontSize: { xs: "1rem", md: "1.05rem" },
                }}
              >
                I&apos;m a full stack developer who enjoys working across the
                entire product — from designing clean REST APIs in{" "}
                <Box component="span" sx={{ color: "text.primary" }}>
                  Java and Spring Boot
                </Box>{" "}
                to crafting responsive, accessible interfaces with{" "}
                <Box component="span" sx={{ color: "text.primary" }}>
                  React and Next.js
                </Box>
                . I care about writing code that other developers enjoy
                maintaining.
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  mt: 2.5,
                  color: "text.secondary",
                  lineHeight: 1.8,
                  fontSize: { xs: "1rem", md: "1.05rem" },
                }}
              >
                My experience covers API development, database design with
                MySQL and building production-style applications end to end.
                Lately I&apos;ve been exploring how AI can sharpen developer
                workflows — from intelligent recommendations inside apps to
                AI-assisted tooling that removes busywork.
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  mt: 2.5,
                  color: "text.secondary",
                  lineHeight: 1.8,
                  fontSize: { xs: "1rem", md: "1.05rem" },
                }}
              >
                When I&apos;m not coding, I&apos;m usually studying system
                design, contributing to personal projects, or learning
                something new about the craft of software engineering.
              </Typography>
            </Reveal>
          </Grid>

          <Grid size={{ xs: 12, md: 5 }}>
            <Reveal delay={120} sx={{ height: "100%" }}>
              <GlassCard sx={{ p: { xs: 3, md: 4 }, height: "100%" }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
                  Quick facts
                </Typography>
                <Stack spacing={2}>
                  {quickFacts.map(({ icon: Icon, label, value }) => (
                    <Stack key={label} direction="row" spacing={2} alignItems="center">
                      <Box
                        aria-hidden
                        sx={{
                          width: 40,
                          height: 40,
                          display: "grid",
                          placeItems: "center",
                          borderRadius: 2,
                          border: "1px solid",
                          borderColor: glassTints.border,
                          backgroundColor: glassTints.subtle,
                          color: "primary.main",
                          flexShrink: 0,
                        }}
                      >
                        <Icon fontSize="small" />
                      </Box>
                      <Box>
                        <Typography
                          variant="caption"
                          sx={{ color: "text.secondary", display: "block" }}
                        >
                          {label}
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {value}
                        </Typography>
                      </Box>
                    </Stack>
                  ))}
                </Stack>

                <Divider sx={{ my: 3 }} />

                <Typography variant="h6" sx={{ mb: 1.5, fontWeight: 700 }}>
                  What I focus on
                </Typography>
                <Stack component="ul" spacing={1} sx={{ m: 0, p: 0, listStyle: "none" }}>
                  {focusAreas.map((area) => (
                    <Box
                      key={area}
                      component="li"
                      sx={{
                        display: "flex",
                        alignItems: "baseline",
                        gap: 1.5,
                        color: "text.secondary",
                      }}
                    >
                      <Box
                        aria-hidden
                        sx={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          backgroundColor: "primary.main",
                          flexShrink: 0,
                          transform: "translateY(-2px)",
                        }}
                      />
                      {area}
                    </Box>
                  ))}
                </Stack>
              </GlassCard>
            </Reveal>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
