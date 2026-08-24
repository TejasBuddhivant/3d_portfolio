import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { GlassCard, glassTints } from "@/components/ui";
import type { ExperienceItem } from "@/data/types";

export default function ExperienceCard({
  item,
  isLast,
}: {
  item: ExperienceItem;
  isLast: boolean;
}) {
  return (
    <Stack
      direction="row"
      spacing={{ xs: 2, md: 3 }}
      sx={{ alignItems: "stretch" }}
    >
      {/* Timeline rail: dot + connecting line */}
      <Box
        aria-hidden
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexShrink: 0,
          width: 18,
        }}
      >
        <Box
          sx={{
            width: 14,
            height: 14,
            mt: { xs: 4.5, md: 5 },
            borderRadius: "50%",
            border: "2px solid",
            borderColor: "primary.main",
            backgroundColor: "background.default",
            boxShadow: "0 0 0 4px rgba(255, 182, 39, 0.14)",
            transition: "box-shadow 200ms ease",
          }}
        />
        {!isLast && (
          <Box
            sx={{
              width: 2,
              flexGrow: 1,
              my: 1,
              backgroundColor: glassTints.border,
            }}
          />
        )}
      </Box>

      <GlassCard interactive sx={{ p: { xs: 2.5, md: 3 }, mb: isLast ? 0 : 3, width: "100%" }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          spacing={0.5}
        >
          <Box>
            <Typography variant="h6" component="h3" sx={{ fontWeight: 700 }}>
              {item.position}
            </Typography>
            <Typography variant="subtitle2" sx={{ color: "primary.main", fontWeight: 600 }}>
              {item.company}
            </Typography>
          </Box>
          <Box sx={{ textAlign: { sm: "right" } }}>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {item.duration}
            </Typography>
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              {item.location}
            </Typography>
          </Box>
        </Stack>

        <Divider sx={{ my: 2 }} />

        <Stack component="ul" spacing={1} sx={{ m: 0, p: 0, listStyle: "none" }}>
          {item.description.map((line) => (
            <Box
              key={line}
              component="li"
              sx={{
                display: "flex",
                gap: 1.5,
                color: "text.secondary",
                lineHeight: 1.7,
                fontSize: "0.95rem",
              }}
            >
              <Box
                aria-hidden
                sx={{
                  width: 6,
                  height: 6,
                  mt: 1,
                  borderRadius: "50%",
                  backgroundColor: "primary.main",
                  flexShrink: 0,
                }}
              />
              {line}
            </Box>
          ))}
        </Stack>

        <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{ mt: 2.5 }}>
          {item.technologies.map((tech) => (
            <Chip
              key={tech}
              label={tech}
              size="small"
              variant="outlined"
              sx={{
                borderColor: glassTints.border,
                color: "text.secondary",
                transition: "border-color 160ms ease, color 160ms ease",
                "&:hover": {
                  borderColor: glassTints.borderHover,
                  color: "text.primary",
                },
              }}
            />
          ))}
        </Stack>
      </GlassCard>
    </Stack>
  );
}
