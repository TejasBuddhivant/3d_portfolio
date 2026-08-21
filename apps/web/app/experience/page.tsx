import type { Metadata } from "next";
import Experience from "@/components/experience/Experience";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Professional experience of Tej Buddhivant — full stack development with Java, Spring Boot, React and Next.js.",
};

export default function ExperiencePage() {
  return <Experience />;
}
