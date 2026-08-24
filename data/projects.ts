import type { Project } from "./types";

export const projects: readonly Project[] = [
  {
    id: "fieldos",
    name: "FieldOS",
    highlight: "Field-force management",
    description:
      "Field-force management application for scheduling, dispatching and tracking on-site teams, with live job status updates and role-based dashboards for managers and field agents.",
    technologies: ["React", "Spring Boot", "MySQL", "REST APIs"],
    categories: ["Full Stack"],
    repoUrl: "https://github.com/TejasBuddhivant/FieldOS",
  },
  {
    id: "anime-diary",
    name: "Anime Diary",
    highlight: "Tracking & recommendations",
    description:
      "Anime tracking and recommendation application where users maintain a personal watchlist, rate series and receive suggestions based on their favourite genres.",
    technologies: ["Next.js", "TypeScript", "MUI", "External Anime API"],
    categories: ["Frontend", "AI"],
    repoUrl: "https://github.com/tejbuddhivant/anime-diary",
    liveUrl: "https://anime-diary.example.com",
  },
  {
    id: "gym-management",
    name: "Gym Management System",
    highlight: "Java / JSP",
    description:
      "Java/JSP based management system that handles member registrations, subscription plans, attendance and monthly billing with an admin console.",
    technologies: ["Java", "JSP", "Servlets", "MySQL"],
    categories: ["Java", "Full Stack"],
    repoUrl: "https://github.com/TejasBuddhivant/-Gym-Management-System",
  },
  {
    id: "food-ordering",
    name: "Food Ordering System",
    highlight: "End-to-end ordering flow",
    description:
      "Full-stack food ordering project covering browsing menus, cart management, order placement and an admin panel for restaurants to process incoming orders.",
    technologies: ["React", "Spring Boot", "Hibernate", "MySQL"],
    categories: ["Full Stack", "Java"],
    repoUrl: "https://github.com/TejasBuddhivant/hotel_booking_system",
  },
] as const;
