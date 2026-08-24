"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { alpha } from "@mui/material/styles";
import { Reveal, SectionTitle } from "@/components/ui";
import SkillCard from "./SkillCard";
import { skillGroups } from "@/data/skills";

export default function Skills() {
  return (
    <Box
      component="section"
      id="skills"
      aria-label="Skills"
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: (t) => alpha(t.palette.background.paper, 0.35),
      }}
    >
      <Container maxWidth="lg">
        <Reveal>
          <SectionTitle
            overline="My Toolbox"
            title="Skills & Technologies"
            subtitle="The technologies I use to design, build and ship complete web applications."
          />
        </Reveal>

        <Grid container spacing={{ xs: 2.5, md: 3 }}>
          {skillGroups.map((group, index) => (
            <Grid key={group.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <Reveal delay={index * 80} sx={{ height: "100%" }}>
                <SkillCard group={group} />
              </Reveal>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
