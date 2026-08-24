import type { Metadata } from "next";
import About from "@/components/about/About";

export const metadata: Metadata = {
  title: "About",
  description:
    "Who is Tej Buddhivant — a full stack developer building scalable, user-focused applications.",
};

export default function AboutPage() {
  return <About />;
}
