export type NavLink = {
  href: string;
  label: string;
};

export type SocialLink = {
  label: string;
  href: string;
};

export type ExperienceItem = {
  company: string;
  role: string;
  location: string;
  start: string;
  end: string;
  technologies: string[];
  highlights: string[];
  products?: string[];
};

export type ProjectItem = {
  name: string;
  summary: string;
  technologies: string[];
  /** Set when a public repo exists */
  repoUrl?: string;
  /** Set when a public demo exists */
  liveUrl?: string;
  /** Replace with a real asset path when ready */
  image?: string;
  placeholder?: boolean;
};

export type SkillGroup = {
  title: string;
  items: string[];
};

export type EducationItem = {
  degree: string;
  school: string;
  year: string;
};

export type SiteContent = {
  name: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  summary: string;
  heroTagline: string;
  availability: string;
  copyrightYear: number;
  resumePath: string;
  nav: NavLink[];
  social: SocialLink[];
  focusAreas: { title: string; description: string }[];
  experience: ExperienceItem[];
  projects: ProjectItem[];
  skills: SkillGroup[];
  education: EducationItem[];
  achievements: string[];
};
