import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { palette } from "./theme";

export interface SectionTitleProps {
  /** Small uppercase label shown above the title. */
  overline: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

/**
 * Consistent heading block for every portfolio section.
 */
export function SectionTitle({
  overline,
  title,
  subtitle,
  align = "center",
}: SectionTitleProps) {
  const centered = align === "center";

  return (
    <Box
      sx={{
        mb: { xs: 4, md: 6 },
        textAlign: centered ? "center" : "left",
      }}
    >
      <Typography
        variant="overline"
        component="p"
        sx={{
          color: "text.secondary",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          mb: 1,
        }}
      >
        {overline}
      </Typography>
      <Typography
        variant="h3"
        component="h2"
        sx={{
          fontWeight: 700,
          color: "text.primary",
          "&::after": centered
            ? undefined
            : {
                content: '""',
                display: "block",
                width: 56,
                height: 3,
                mt: 1.5,
                backgroundColor: palette.sienna,
                borderRadius: 1,
              },
        }}
      >
        {title}
      </Typography>
      {subtitle ? (
        <Typography
          variant="body1"
          sx={{
            mt: 1.5,
            color: "text.secondary",
            maxWidth: 640,
            mx: centered ? "auto" : undefined,
          }}
        >
          {subtitle}
        </Typography>
      ) : null}
    </Box>
  );
}
