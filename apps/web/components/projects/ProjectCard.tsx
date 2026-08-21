import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import GitHubIcon from "@mui/icons-material/GitHub";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { GlassCard, glassTints } from "@portfolio/ui";
import type { Project } from "@/data/types";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <GlassCard
      interactive
      sx={{
        p: { xs: 2.5, md: 3 },
        height: "100%",
        display: "flex",
        flexDirection: "column",
        // The GitHub icon button fades in when the card is hovered,
        // but stays keyboard-accessible via focus-within.
        "& .project-github": {
          opacity: { xs: 1, md: 0.35 },
          transition: "opacity 200ms ease, transform 180ms ease",
        },
        "&:hover .project-github, &:focus-within .project-github": {
          opacity: 1,
        },
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        spacing={2}
      >
        <Box>
          <Typography
            variant="caption"
            sx={{ color: "text.secondary", letterSpacing: "0.12em", textTransform: "uppercase" }}
          >
            {project.highlight}
          </Typography>
          <Typography variant="h6" component="h3" sx={{ fontWeight: 700 }}>
            {project.name}
          </Typography>
        </Box>

        {project.repoUrl ? (
          <Tooltip title="View source on GitHub">
            <IconButton
              className="project-github"
              component="a"
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.name} source code on GitHub (opens in a new tab)`}
              size="small"
              sx={{
                color: "text.secondary",
                border: "1px solid",
                borderColor: glassTints.border,
                "&:hover": {
                  color: "primary.main",
                  borderColor: glassTints.borderHover,
                  transform: "scale(1.05)",
                },
              }}
            >
              <GitHubIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        ) : null}
      </Stack>

      <Typography
        variant="body2"
        sx={{
          mt: 1.5,
          color: "text.secondary",
          lineHeight: 1.7,
          flexGrow: 1,
        }}
      >
        {project.description}
      </Typography>

      <Typography variant="body2" sx={{ mt: 2, fontWeight: 600 }}>
        Technology:
      </Typography>
      <Typography variant="body2" sx={{ color: "primary.main", mb: 2 }}>
        {project.technologies.join(" • ")}
      </Typography>

      <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap>
        {project.liveUrl ? (
          <Button
            component="a"
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            size="small"
            variant="outlined"
            endIcon={<OpenInNewIcon />}
            sx={{
              borderColor: glassTints.border,
              color: "text.primary",
              transition:
                "border-color 160ms ease, background-color 160ms ease, transform 160ms ease",
              "&:hover": {
                borderColor: glassTints.borderHover,
                backgroundColor: glassTints.soft,
                transform: "translateY(-2px)",
              },
            }}
          >
            View Project
          </Button>
        ) : (
          <Button
            component="a"
            href={project.repoUrl ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            size="small"
            variant="outlined"
            startIcon={<GitHubIcon />}
            sx={{
              borderColor: glassTints.border,
              color: "text.primary",
              transition:
                "border-color 160ms ease, background-color 160ms ease, transform 160ms ease",
              "&:hover": {
                borderColor: glassTints.borderHover,
                backgroundColor: glassTints.soft,
                transform: "translateY(-2px)",
              },
            }}
          >
            View Project
          </Button>
        )}

        {project.liveUrl && project.repoUrl ? (
          <Button
            component="a"
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            size="small"
            startIcon={<GitHubIcon />}
            sx={{
              color: "text.secondary",
              transition: "color 160ms ease, transform 160ms ease",
              "&:hover": { color: "text.primary", transform: "translateY(-2px)" },
            }}
          >
            GitHub
          </Button>
        ) : null}
      </Stack>

      <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{ mt: 2 }}>
        {project.categories.map((category) => (
          <Chip
            key={category}
            label={category}
            size="small"
            sx={{
              backgroundColor: glassTints.subtle,
              color: "text.secondary",
              fontSize: 11,
            }}
          />
        ))}
      </Stack>
    </GlassCard>
  );
}
