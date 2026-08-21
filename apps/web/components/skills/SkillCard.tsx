"use client";

import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import BuildOutlinedIcon from "@mui/icons-material/BuildOutlined";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import CodeOutlinedIcon from "@mui/icons-material/CodeOutlined";
import DnsOutlinedIcon from "@mui/icons-material/DnsOutlined";
import StorageOutlinedIcon from "@mui/icons-material/StorageOutlined";
import { glassTints } from "@portfolio/ui";
import type { SkillGroup } from "@/data/types";

const groupIcons: Record<SkillGroup["id"], typeof CodeOutlinedIcon> = {
  frontend: CodeOutlinedIcon,
  backend: DnsOutlinedIcon,
  database: StorageOutlinedIcon,
  tools: BuildOutlinedIcon,
  ai: AutoAwesomeOutlinedIcon,
};

/**
 * A single skill category card. The check mark on each chip is revealed
 * with a pure-CSS hover transition — no JavaScript needed.
 */
export default function SkillCard({ group }: { group: SkillGroup }) {
  const Icon = groupIcons[group.id] ?? CodeOutlinedIcon;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Box
      sx={{
        height: "100%",
        p: { xs: 2.5, md: 3 },
        borderRadius: 3,
        border: "1px solid",
        borderColor: glassTints.border,
        backgroundColor: glassTints.subtle,
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        transition:
          "transform 200ms ease, border-color 200ms ease, background-color 200ms ease",
        "&:hover": {
          transform: "translateY(-4px)",
          borderColor: glassTints.borderHover,
          backgroundColor: glassTints.soft,
        },
        // Reveal the check icon of every chip inside this card on hover.
        "&:hover .skill-check-icon": {
          opacity: 1,
          transform: "scale(1)",
        },
      }}
    >
      <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2 }}>
        <Box
          aria-hidden
          sx={{
            width: 38,
            height: 38,
            display: "grid",
            placeItems: "center",
            borderRadius: 2,
            color: "primary.main",
            border: "1px solid",
            borderColor: glassTints.border,
            backgroundColor: glassTints.subtle,
          }}
        >
          <Icon fontSize="small" />
        </Box>
        <Typography variant="h6" component="h3" sx={{ fontWeight: 700 }}>
          {group.title}
        </Typography>
      </Stack>

      <Divider />

      <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{ mt: 2.5 }}>
        {group.skills.map((skill) => (
          <Chip
            key={skill}
            label={skill}
            variant="outlined"
            {...(mounted && {
              icon: (
                <CheckCircleOutlineRoundedIcon
                  className="skill-check-icon"
                  sx={{
                    opacity: 0,
                    transform: "scale(0.6)",
                    transition: "opacity 180ms ease, transform 180ms ease",
                  }}
                />
              ),
            })}
            sx={{
              borderColor: glassTints.border,
              backgroundColor: "transparent",
              color: "text.secondary",
              transition:
                "transform 160ms ease, color 160ms ease, border-color 160ms ease, background-color 160ms ease",
              "&:hover": {
                transform: "translateY(-2px)",
                color: "text.primary",
                borderColor: glassTints.borderHover,
                backgroundColor: glassTints.soft,
              },
              ".MuiChip-icon": { color: "primary.main" },
            }}
          />
        ))}
      </Stack>
    </Box>
  );
}
