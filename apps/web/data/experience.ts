import type { ExperienceItem } from "./types";

export const experience: readonly ExperienceItem[] = [
  {
    id: "fullstack-internship",
    position: "Full Stack Developer Intern",
    company: "Tech Solutions Pvt. Ltd.",
    duration: "Jan 2025 — Present",
    location: "Pune, India",
    description: [
      "Building and maintaining REST APIs with Java and Spring Boot that serve a customer-facing web application.",
      "Developed responsive React interfaces with MUI, improving task completion time for core user flows.",
      "Collaborated in an agile team using Git-based code reviews and sprint planning.",
    ],
    technologies: ["Java", "Spring Boot", "React", "MySQL", "Git"],
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
