import {
  Blocks,
  Bot,
  Database,
  FlaskConical,
  Layers,
  Network,
  Radio,
  Wrench,
} from 'lucide-react';

import bankingImg from '@/assets/banking-onboarding.png';
import complianceImg from '@/assets/compliance-system.png';
import logisticsImg from '@/assets/logistics-tracking.png';
import wealthImg from '@/assets/wealth-dashboard.png';

import type {
  Experience,
  Language,
  NavItem,
  Profile,
  Project,
  SkillGroup,
  Stat,
} from './types';

export const profile = {
  name: 'Abdul Quddoos',
  firstName: 'Abdul',
  lastName: 'Quddoos',
  role: 'Senior Frontend Engineer',
  location: 'Berlin, Germany',
  email: 'abdul.quddoos8863@gmail.com',
  phone: '+49 15567 327809',
  workAuthorization: ['Chancenkarte', 'Blue Card eligible', 'Available immediately'],
  summary:
    'Senior Frontend Engineer (8+ years) building real-time React & TypeScript interfaces for monitoring and control across fintech and enterprise teams. I lead micro-frontend and design-system initiatives and mentor engineers through code reviews, with a focus on clean, well-documented code and strong Core Web Vitals.',
  taglines: [
    'real-time trading dashboards',
    'micro-frontend platforms',
    'scalable design systems',
    'agentic AI interfaces',
  ],
  links: {
    github: 'https://github.com/abdul191993',
    linkedin: 'https://linkedin.com/in/abdul-quddoos-810b13193',
  },
} as const satisfies Profile;

export const stats: readonly Stat[] = [
  { value: 8, suffix: '+', label: 'Years shipping production UIs' },
  { value: 35, suffix: '%', label: 'Fewer cross-team release bottlenecks' },
  { value: 40, suffix: '%', label: 'Less effort via shared component libraries' },
  { value: 99.9, suffix: '%', label: 'Uptime on mission-critical systems' },
];

export const navItems: readonly NavItem[] = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

export const experiences: readonly Experience[] = [
  {
    id: 'freelance-ai',
    role: 'Freelance Full Stack & AI Engineer',
    company: 'Independent',
    location: 'Germany',
    start: 'Mar 2026',
    end: 'Present',
    current: true,
    highlights: [
      'Built an AI-assisted automated pipeline that moves work from Jira and Figma through Claude into GitHub using MCP servers, automating the path from requirement to code.',
      'Built an agentic chat interface on an MCP-based agentic backend for a banking platform, giving users a conversational way to work with banking features.',
      'Contract AI agent training and software engineering work on AI architecture for Alignerr, applying full stack engineering judgment to AI systems.',
    ],
    stack: ['Claude', 'MCP', 'React', 'TypeScript', 'Node.js', 'Agentic AI'],
  },
  {
    id: 'enbd',
    role: 'Senior Frontend Software Engineer',
    company: 'Emirates National Bank',
    context: 'Contractor · D4 Insight Tech',
    location: 'Dubai, UAE',
    start: 'Feb 2022',
    end: 'Mar 2026',
    highlights: [
      'Led migration from a monolithic frontend to React micro-frontends (Module Federation), driving the technical decision and cutting cross-team release bottlenecks by ~35%.',
      'Owned and mentored the team on a scalable state architecture (Redux, selectors, memoization, normalized state) for live data streams, reducing UI inconsistencies and state-related defects.',
      'Drove team-wide adoption of reusable React component libraries and design-system components through code reviews, cutting effort by ~40% and boosting consistency.',
      'Architected real-time React dashboards (WebSockets/SSE) with custom rendering and data visualization for live equities and fund data, improving visibility and performance for trading teams.',
      'Led integration of REST & GraphQL APIs (Apollo Client) with optimized caching strategies, reducing redundant network calls team-wide.',
      'Owned CI/CD pipelines (Jenkins, GitHub Actions) and championed Jest & Playwright coverage, enabling stable bi-weekly releases with lower regression risk.',
      'Mentored engineers on AI-assisted development (GitHub Copilot, Claude) for component scaffolding and test generation, accelerating prototyping cycles by ~40%.',
    ],
    stack: ['React', 'TypeScript', 'Module Federation', 'Redux', 'Apollo GraphQL', 'WebSockets', 'Playwright'],
  },
  {
    id: 'onlinist',
    role: 'Senior Full Stack Developer',
    company: 'Onlinist FZE',
    location: 'Dubai, UAE',
    start: 'Mar 2021',
    end: 'Feb 2022',
    highlights: [
      'Architected modular React-based enterprise platforms (CRM, ERP, Accounting) supporting complex multi-role workflows across client segments.',
      'Built reusable component libraries and role-based dashboard systems, reducing new feature effort by ~20% and improving UI consistency.',
      'Designed scalable state management patterns (Redux / Context API) for multi-user, multi-role operations at enterprise scale.',
      'Integrated regulatory systems (ISKAAN, RERA, Mollak) and custom payment gateways for compliant, scalable transaction processing.',
      'Implemented PWA capabilities and performance optimizations, reducing response times by ~30% while maintaining 99.9% uptime.',
    ],
    stack: ['React', 'Redux', 'Context API', 'PWA', 'Node.js'],
  },
  {
    id: 'inox',
    role: 'Full Stack Developer',
    company: 'Inox Arabia',
    location: 'Dubai, UAE',
    start: 'Feb 2020',
    end: 'Mar 2021',
    highlights: [
      'Developed React + TypeScript applications with Redux and a scalable, reusable component architecture for enterprise analytics platforms.',
      'Built GraphQL-powered dashboards and design-system-aligned UI components, reducing frontend implementation effort by ~35%.',
      'Designed asynchronous data flows (REST & GraphQL), improving data consistency and UI responsiveness across analytics modules.',
      'Enhanced CI/CD build and rendering workflows, improving performance, stability and release reliability.',
    ],
    stack: ['React', 'TypeScript', 'Redux', 'GraphQL', 'CI/CD'],
  },
  {
    id: 'solutions-player',
    role: 'Frontend Developer',
    company: 'Solutions Player',
    location: 'Islamabad, Pakistan',
    start: 'Jan 2018',
    end: 'Dec 2019',
    highlights: [
      'Developed accounting, POS and e-commerce platforms using React.js and Node.js for growing global clients.',
      'Built a global shipping system integrating third-party payment gateways for secure international transactions and logistics automation.',
      'Implemented real-time notifications (Firebase) and performance optimizations, improving engagement and response rates by ~25%.',
    ],
    stack: ['React', 'Node.js', 'Firebase', 'Payments'],
  },
];

export const projects: readonly Project[] = [
  {
    id: 'digital-account',
    title: 'Digital Account Opening',
    category: 'Banking · Onboarding',
    tech: ['React', 'TypeScript', 'Redux', 'GraphQL'],
    description: 'Digital onboarding for a large enterprise bank — from days to minutes.',
    fullDescription:
      'A comprehensive digital onboarding solution for a large enterprise banking client. The platform supports real-time OCR scanning, biometric verification and seamless integration with core banking systems, reducing account opening time from days to minutes.',
    features: [
      'Responsive, high-performance onboarding flows for web and mobile',
      'Complex form validation and state management with Redux',
      'REST and GraphQL integrations in close collaboration with backend teams',
      'Performance tuned for high-volume customer traffic',
    ],
    image: bankingImg,
    confidential: true,
  },
  {
    id: 'wealth-platform',
    title: 'Real-time Wealth Platform',
    category: 'Fintech · Trading',
    tech: ['React', 'WebSockets', 'Data Visualization', 'Module Federation'],
    description: 'Live equities, funds, bonds and gold — streamed and visualized in real time.',
    fullDescription:
      'An enterprise-grade wealth management platform for a large financial services organization, enabling users to monitor multiple asset classes including equities, mutual funds, bonds and commodities, with high-performance visualization of live market data.',
    features: [
      'Real-time dashboards over WebSockets / SSE with custom rendering',
      'Normalized, memoized state for high-frequency data streams',
      'Virtualized lists and lazy loading for large datasets',
      'Accessible, responsive UI across devices',
    ],
    image: wealthImg,
    confidential: true,
  },
  {
    id: 'compliance',
    title: 'ISKAAN (RERA) Compliance System',
    category: 'GovTech · Real Estate',
    tech: ['React', 'Role-based UI', 'REST'],
    description: 'Regulatory compliance and audit-ready reporting for a government-regulated domain.',
    fullDescription:
      'A regulatory compliance management system for a government-regulated real estate domain, streamlining property compliance workflows and regulatory reporting. It integrates with external regulatory APIs and supports audit-ready tracking for enterprise property management.',
    features: [
      'Role-based UI access for multiple stakeholder types',
      'Compliance dashboards and automated reporting workflows',
      'Integration with government regulatory APIs (ISKAAN, RERA, Mollak)',
      'Audit trails and activity logging for regulatory requirements',
    ],
    image: complianceImg,
    confidential: true,
  },
  {
    id: 'shipping',
    title: 'Global Shipping System',
    category: 'Logistics · E-commerce',
    tech: ['React', 'Node.js', 'Firebase', 'Payments'],
    description: 'End-to-end cross-border shipment tracking with real-time updates.',
    fullDescription:
      'An end-to-end logistics and shipment tracking platform for a cross-border logistics operation, providing real-time visibility into shipment status and operational workflows across regions.',
    features: [
      'Responsive shipment tracking interfaces in React',
      'Real-time updates and notifications with Firebase',
      'Automated documentation workflows for customs and logistics',
      'Third-party payment gateway integration for international transactions',
    ],
    image: logisticsImg,
    confidential: true,
  },
];

export const skillGroups: readonly SkillGroup[] = [
  {
    id: 'architecture',
    title: 'Frontend Architecture',
    icon: Layers,
    skills: [
      'React (Advanced)',
      'TypeScript',
      'Next.js',
      'Redux',
      'React Query',
      'Context API',
      'Micro-frontends',
      'Module Federation',
      'SSR / SSG',
      'Component-Driven Dev',
    ],
  },
  {
    id: 'realtime',
    title: 'Real-time & Visualization',
    icon: Radio,
    skills: [
      'WebSockets',
      'SSE',
      'Data Visualization',
      'Canvas / SVG',
      'Virtualized Lists',
      'Memoization',
      'Core Web Vitals',
      'Lighthouse',
    ],
  },
  {
    id: 'api',
    title: 'API & Data',
    icon: Network,
    skills: ['REST', 'GraphQL', 'Apollo Client', 'Real-time Data Flows'],
  },
  {
    id: 'testing',
    title: 'Testing & DevOps',
    icon: FlaskConical,
    skills: [
      'Jest',
      'Playwright',
      'React Testing Library',
      'TDD',
      'Jenkins',
      'GitHub Actions',
      'GitLab CI',
      'Docker',
    ],
  },
  {
    id: 'tooling',
    title: 'Build & Tooling',
    icon: Wrench,
    skills: ['Vite', 'Webpack', 'Nx Monorepos', 'Storybook'],
  },
  {
    id: 'frameworks',
    title: 'Other Frameworks',
    icon: Blocks,
    skills: ['Angular', 'Vue.js'],
  },
  {
    id: 'backend',
    title: 'Backend',
    icon: Database,
    skills: ['Node.js', 'Nest.js', 'Express.js', 'MongoDB', 'MySQL'],
  },
  {
    id: 'ai',
    title: 'AI Engineering',
    icon: Bot,
    skills: ['Claude', 'MCP Servers', 'Agentic UIs', 'GitHub Copilot'],
  },
];

/** Flat list for the marquee ribbon. */
export const marqueeSkills: readonly string[] = [
  'React',
  'TypeScript',
  'Next.js',
  'Module Federation',
  'Redux',
  'GraphQL',
  'WebSockets',
  'Playwright',
  'Jest',
  'Node.js',
  'Storybook',
  'Nx',
  'Docker',
  'Claude · MCP',
];

export const languages: readonly Language[] = [
  { name: 'English', level: 'Full professional', proficiency: 95 },
  { name: 'Urdu', level: 'Native', proficiency: 100 },
  { name: 'German', level: 'A2 · Learning', proficiency: 30 },
];

export const education = {
  degree: 'BS in Software Engineering',
  school: 'COMSATS University Islamabad',
  location: 'Pakistan',
} as const;
