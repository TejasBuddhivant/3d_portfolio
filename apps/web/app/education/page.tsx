import type { Metadata } from "next";
import Education from "@/components/education/Education";

export const metadata: Metadata = {
  title: "Education",
  description:
    "Education and certifications of Tej Buddhivant — BBA Computer Applications, SPPU, plus professional training.",
};

export default function EducationPage() {
  return <Education />;
}
