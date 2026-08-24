import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import { GlassCard, Reveal, SectionTitle, glassTints } from "@/components/ui";
import { education } from "@/data/education";

export default function Education() {
  return (
    <Box
      component="section"
      id="education"
      aria-label="Education and certifications"
      sx={{ py: { xs: 8, md: 12 } }}
    >
      <Container maxWidth="lg">
        <Reveal>
          <SectionTitle
            overline="Learning Journey"
            title="Education & Certifications"
            subtitle="Formal education plus the training that keeps my skills current."
          />
        </Reveal>

        <Grid container spacing={{ xs: 2.5, md: 3 }}>
          {education.map((item, index) => (
            <Grid key={item.id} size={{ xs: 12, md: 4 }}>
              <Reveal delay={index * 90} sx={{ height: "100%" }}>
                <GlassCard interactive sx={{ p: { xs: 2.5, md: 3 }, height: "100%" }}>
                  <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1.5 }}>
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
                      }}
                    >
                      <SchoolOutlinedIcon fontSize="small" />
                    </Box>
                    <Typography
                      variant="caption"
                      sx={{
                        color: "text.secondary",
                        border: "1px solid",
                        borderColor: glassTints.border,
                        borderRadius: 1,
                        px: 1,
                        py: 0.25,
                        fontWeight: 600,
                      }}
                    >
                      {item.period}
                    </Typography>
                  </Stack>

                  <Typography variant="subtitle1" component="h3" sx={{ fontWeight: 700 }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "primary.main", fontWeight: 600, mt: 0.5 }}>
                    {item.institution}
                  </Typography>
                  {item.description ? (
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary", mt: 1.5, lineHeight: 1.7 }}
                    >
                      {item.description}
                    </Typography>
                  ) : null}
                </GlassCard>
              </Reveal>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
