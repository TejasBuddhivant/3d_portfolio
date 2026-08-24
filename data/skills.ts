import type { SkillGroup } from "./types";

export const skillGroups: readonly SkillGroup[] = [
  {
    id: "frontend",
    title: "Frontend",
    skills: [
      "React.js",
      "Next.js",
      "JavaScript",
      "TypeScript",
      "HTML",
      "CSS",
      "MUI",
    ],
  },
  {
    id: "backend",
    title: "Backend",
    skills: ["Java", "Spring Boot", "Hibernate", "REST APIs"],
  },
  {
    id: "database",
    title: "Database",
    skills: ["MySQL"],
  },
  {
    id: "tools",
    title: "Tools",
    skills: ["Git", "GitHub", "Maven", "Axios"],
  },
  {
    id: "ai",
    title: "AI / Emerging Technologies",
    skills: ["AI-assisted development", "LLM APIs", "Prompt Engineering"],
  },
] as const;
