export type ProjectCategory =
  | "Frontend"
  | "Full Stack"
  | "Java"
  | "AI";

export interface Project {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly technologies: readonly string[];
  readonly categories: readonly ProjectCategory[];
  readonly repoUrl?: string;
  readonly liveUrl?: string;
  /** Short label shown on the card accent. */
  readonly highlight: string;
}

export interface SkillGroup {
  readonly id: string;
  readonly title: string;
  readonly skills: readonly string[];
}

export interface ExperienceItem {
  readonly id: string;
  readonly position: string;
  readonly company: string;
  readonly duration: string;
  readonly location: string;
  readonly description: readonly string[];
  readonly technologies: readonly string[];
}

export interface EducationItem {
  readonly id: string;
  readonly title: string;
  readonly institution: string;
  readonly period: string;
  readonly description?: string;
}
