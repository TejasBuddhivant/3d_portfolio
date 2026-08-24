"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";
import { Reveal, SectionTitle } from "@/components/ui";
import { useProjectFilter } from "@/hooks";
import ProjectCard from "./ProjectCard";
import ProjectFilter, { type ProjectFilterValue } from "./ProjectFilter";
import { projects } from "@/data/projects";

export default function Projects() {
  const { category, setCategory, filteredItems } = useProjectFilter<
    (typeof projects)[number],
    ProjectFilterValue
  >(
    projects,
    (project) => project.categories as readonly ProjectFilterValue[],
    "All",
  );

  return (
    <Box
      component="section"
      id="projects"
      aria-label="Projects"
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: (t) => alpha(t.palette.background.paper, 0.35),
      }}
    >
      <Container maxWidth="lg">
        <Reveal>
          <SectionTitle
            overline="Selected Work"
            title="Projects"
            subtitle="Applications I have designed and built — each one solving a real problem."
          />
        </Reveal>

        <Reveal>
          <ProjectFilter value={category} onChange={setCategory} />
        </Reveal>

        {filteredItems.length === 0 ? (
          <Typography
            variant="body1"
            sx={{ textAlign: "center", color: "text.secondary", py: 6 }}
          >
            No projects in this category yet.
          </Typography>
        ) : (
          <Grid container spacing={{ xs: 2.5, md: 3 }}>
            {filteredItems.map((project, index) => (
              <Grid key={project.id} size={{ xs: 12, sm: 6, md: 4 }}>
                <Reveal delay={index * 80} sx={{ height: "100%" }}>
                  <ProjectCard project={project} />
                </Reveal>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}
