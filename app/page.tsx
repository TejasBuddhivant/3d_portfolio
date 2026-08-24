import Hero from "@/components/hero/Hero";
import About from "@/components/about/About";
import Skills from "@/components/skills/Skills";
import Experience from "@/components/experience/Experience";
import Projects from "@/components/projects/Projects";
import QuoteCard from "@/components/quote/QuoteCard";
import Education from "@/components/education/Education";
import Contact from "@/components/contact/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <QuoteCard />
      <Education />
      <Contact />
    </>
  );
}
