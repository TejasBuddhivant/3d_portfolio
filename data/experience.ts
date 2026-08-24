import type { ExperienceItem } from "./types";

export const experience: readonly ExperienceItem[] = [
  {
    id: "cynia-ai-internship",
    position: "AI Intern",
    company: "Cynia.ai",
    duration: "Present",
    location: "Remote / India",
    description: [
      "Working on integrating and fine-tuning artificial intelligence models for innovative web solutions.",
      "Collaborating with the development team to build intelligent and responsive applications.",
    ],
    technologies: ["AI / Machine Learning", "Python", "Next.js", "React"],
  },
  {
    id: "freelance-projects",
    position: "Freelance Web Developer",
    company: "Self-employed",
    duration: "Jun 2024 — Dec 2024",
    location: "Remote",
    description: [
      "Designed and shipped full-stack web applications for small businesses, from database schema to deployment.",
      "Implemented authentication-free public sites plus admin dashboards tailored to each client's workflow.",
      "Optimised page load times through code-splitting, caching and image optimisation.",
    ],
    technologies: ["Next.js", "TypeScript", "Spring Boot", "MySQL"],
  },
  {
    id: "academic-projects",
    position: "Student Developer",
    company: "Savitribai Phule Pune University",
    duration: "2022 — 2025",
    location: "Pune, India",
    description: [
      "Built multiple academic projects including a gym management system (Java/JSP) and a food ordering platform.",
      "Practised clean architecture, layered design and version control across team projects.",
    ],
    technologies: ["Java", "JSP", "React", "Hibernate"],
  },
] as const;
