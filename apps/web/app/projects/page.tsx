import type { Metadata } from "next";
import Projects from "@/components/projects/Projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Projects by Tej Buddhivant — FieldOS, Anime Diary, Gym Management System and Food Ordering System.",
};

export default function ProjectsPage() {
  return <Projects />;
}
