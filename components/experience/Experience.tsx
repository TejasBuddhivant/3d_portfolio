import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Reveal, SectionTitle } from "@/components/ui";
import ExperienceCard from "./ExperienceCard";
import { experience } from "@/data/experience";

export default function Experience() {
  return (
    <Box
      component="section"
      id="experience"
      aria-label="Work experience"
      sx={{ py: { xs: 8, md: 12 } }}
    >
      <Container maxWidth="lg">
        <Reveal>
          <SectionTitle
            overline="Where I've Worked"
            title="Experience"
            subtitle="A timeline of the roles and projects that shaped me as an engineer."
          />
        </Reveal>

        <Box sx={{ maxWidth: 860, mx: "auto" }}>
          {experience.map((item, index) => (
            <Reveal key={item.id} delay={index * 100}>
              <ExperienceCard
                item={item}
                isLast={index === experience.length - 1}
              />
            </Reveal>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
