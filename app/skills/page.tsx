import type { Metadata } from "next";
import Skills from "@/components/skills/Skills";

export const metadata: Metadata = {
  title: "Skills",
  description:
    "Technologies Tej Buddhivant works with — React, Next.js, TypeScript, Java, Spring Boot, MySQL and more.",
};

export default function SkillsPage() {
  return <Skills />;
}
