import type { Metadata } from "next";
import Contact from "@/components/contact/Contact";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Tej Buddhivant — email, LinkedIn, GitHub and location.",
};

export default function ContactPage() {
  return <Contact />;
}
