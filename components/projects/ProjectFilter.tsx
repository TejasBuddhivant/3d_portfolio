import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Stack from "@mui/material/Stack";
import { glassTints, palette } from "@/components/ui";

export const projectFilters = [
  "All",
  "Frontend",
  "Full Stack",
  "Java",
  "AI",
] as const;

export type ProjectFilterValue = (typeof projectFilters)[number];

export default function ProjectFilter({
  value,
  onChange,
}: {
  value: ProjectFilterValue;
  onChange: (value: ProjectFilterValue) => void;
}) {
  return (
    <Stack
      direction="row"
      justifyContent="center"
      sx={{ mb: { xs: 4, md: 5 }, flexWrap: "wrap" }}
      useFlexGap
      spacing={1}
    >
      <ToggleButtonGroup
        exclusive
        value={value}
        onChange={(_event, next: ProjectFilterValue | null) => {
          if (next !== null) onChange(next);
        }}
        aria-label="Filter projects by category"
        sx={{
          gap: 1,
          flexWrap: "wrap",
          justifyContent: "center",
          "& .MuiToggleButtonGroup-grouped": {
            borderRadius: "10px !important",
            border: "1px solid",
            borderColor: glassTints.border,
            px: 2.5,
            py: 0.8,
            color: "text.secondary",
            textTransform: "none",
            fontWeight: 600,
            transition:
              "color 160ms ease, border-color 160ms ease, background-color 160ms ease, transform 160ms ease",
            "&:hover": {
              borderColor: glassTints.borderHover,
              color: "text.primary",
              transform: "translateY(-2px)",
              backgroundColor: "transparent",
            },
            "&.Mui-selected": {
              backgroundColor: palette.amber,
              borderColor: palette.amber,
              color: "#000000",
              "&:hover": {
                backgroundColor: "#FFCE5C",
                borderColor: "#FFCE5C",
                color: "#000000",
              },
            },
          },
        }}
      >
        {projectFilters.map((filter) => (
          <ToggleButton key={filter} value={filter} aria-pressed={value === filter}>
            {filter}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Stack>
  );
}
