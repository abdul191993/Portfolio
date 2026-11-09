import type { LucideIcon } from 'lucide-react';

export interface Profile {
  name: string;
  firstName: string;
  lastName: string;
  role: string;
  location: string;
  email: string;
  phone: string;
  workAuthorization: readonly string[];
  summary: string;
  taglines: readonly string[];
  links: {
    github: string;
    linkedin: string;
  };
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  context?: string;
  location: string;
  start: string;
  end: string;
  current?: boolean;
  highlights: readonly string[];
  stack: readonly string[];
}

export interface Project {
  id: string;
  title: string;
  category: string;
  tech: readonly string[];
  description: string;
  fullDescription: string;
  features: readonly string[];
  image: string;
  confidential?: boolean;
}

export interface SkillGroup {
  id: string;
  title: string;
  icon: LucideIcon;
  skills: readonly string[];
}

export interface Language {
  name: string;
  level: string;
  /** 0 – 100, drives the progress bar */
  proficiency: number;
}

export interface NavItem {
  id: SectionId;
  label: string;
}

export type SectionId = 'about' | 'experience' | 'projects' | 'skills' | 'contact';
