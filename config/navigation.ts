export interface NavItem {
  /** DOM id of the section element on the landing page. */
  readonly sectionId: string;
  readonly label: string;
}

export const navItems: readonly NavItem[] = [
  { sectionId: "home", label: "Home" },
  { sectionId: "about", label: "About" },
  { sectionId: "skills", label: "Skills" },
  { sectionId: "experience", label: "Experience" },
  { sectionId: "projects", label: "Projects" },
  { sectionId: "education", label: "Education" },
  { sectionId: "contact", label: "Contact" },
] as const;
