export interface SocialLink {
  readonly label: string;
  readonly href: string;
}

export const siteConfig = {
  name: "Tej Buddhivant",
  shortName: "TEJ",
  role: "Full Stack Developer",
  tagline:
    "I build modern, scalable and user-focused software applications.",
  description:
    "Portfolio of Tej Buddhivant — Full Stack Developer specializing in Java, Spring Boot, React and modern web technologies.",
  url: "https://tejbuddhivant.dev",
  email: "tej.buddhivant@example.com",
  location: "Pune, Maharashtra, India",
  availability: "Open to full-time roles and freelance projects",
  heroHighlights: [
    "Java",
    "Spring Boot",
    "React",
    "Next.js",
  ],
} as const;

export const socialLinks = {
  github: {
    label: "GitHub",
    href: "https://github.com/tejbuddhivant",
  },
  linkedin: {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/tejbuddhivant",
  },
  email: {
    label: "Email",
    href: `mailto:${siteConfig.email}`,
  },
} satisfies Record<string, SocialLink>;

export const socialLinksList: readonly SocialLink[] = [
  socialLinks.github,
  socialLinks.linkedin,
  socialLinks.email,
];
