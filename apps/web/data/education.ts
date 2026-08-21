import type { EducationItem } from "./types";

export const education: readonly EducationItem[] = [
  {
    id: "bba-ca",
    title: "Bachelor of Business Administration — Computer Applications",
    institution: "Savitribai Phule Pune University",
    period: "2022 — 2025",
    description:
      "Focused on software development, databases and business applications, graduating with hands-on full-stack project experience.",
  },
  {
    id: "java-fullstack-training",
    title: "Java Full Stack Development Training",
    institution: "Professional certification program",
    period: "2024",
    description:
      "Intensive training covering Core Java, Spring Boot, Hibernate, REST API design and React integration.",
  },
  {
    id: "modern-web-certification",
    title: "Modern Web Development with React & Next.js",
    institution: "Online certification",
    period: "2025",
    description:
      "Advanced coursework on component architecture, state management with Redux Toolkit and App Router patterns.",
  },
] as const;
