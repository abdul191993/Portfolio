import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from './components/Card';
import { ContactForm } from './components/ContactForm';
import { Github, Linkedin, Mail, Phone, Download, MapPin } from 'lucide-react';
import bankingImg from './assets/banking-onboarding.png';
import wealthImg from './assets/wealth-dashboard.png';
import complianceImg from './assets/compliance-system.png';
import logisticsImg from './assets/logistics-tracking.png';
import cvPdf from './assets/Abdul_React_CV.pdf';
import logoImg from './assets/logo.png';

const projects = [
  {
    id: 'digital-account',
    title: 'Digital Account Opening',
    tech: 'React, TypeScript, Redux',
    description: 'A comprehensive digital onboarding solution built for a large enterprise banking client.',
    fullDescription: 'A comprehensive digital onboarding solution built for a large enterprise banking client. The platform supports real-time OCR scanning, biometric verification, and seamless integration with core banking systems, significantly reducing account opening time from days to minutes.',
    features: [
      'Built responsive, high-performance onboarding flows for web and mobile',
      'Implemented complex form validation and state management using Redux',
      'Collaborated closely with backend teams on REST and GraphQL integrations',
      'Optimized performance for high-volume customer traffic'
    ],
    note: 'Project details and visuals are generalized due to confidentiality constraints.',
    image: bankingImg
  },
  {
    id: 'wealth-platform',
    title: 'Digital Wealth Platform',
    tech: 'React, NgRx, Data Visualization',
    description: 'An enterprise-grade wealth management platform built for a large financial services organization.',
    fullDescription: 'An enterprise-grade wealth management platform built for a large financial services organization, enabling users to monitor and manage multiple asset classes including equities, mutual funds, bonds, and commodities. The platform focuses on high-performance data visualization and real-time market insights for informed investment decisions.',
    features: [
      'Built scalable, data-heavy dashboards using React and NgRx for complex state management',
      'Implemented advanced data visualizations using D3.js and Chart.js',
      'Optimized rendering performance for large datasets using memoization and lazy loading',
      'Collaborated with backend teams to integrate real-time market data APIs',
      'Ensured responsive, accessible UI across devices'
    ],
    note: 'Project details and visuals are generalized due to confidentiality constraints.',
    image: wealthImg
  },
  {
    id: 'remit-compliance',
    title: 'ISKAAN (RERA) Compliance System',
    tech: 'React, Role-Based UI',
    description: 'A regulatory compliance management system developed for a government-regulated real estate domain.',
    fullDescription: 'A regulatory compliance management system developed for a government-regulated real estate domain, designed to streamline property compliance workflows and regulatory reporting. The system integrates with external regulatory APIs and supports audit-ready tracking for enterprise property management operations.',
    features: [
      'Designed and implemented role-based UI access for multiple stakeholder types',
      'Built compliance dashboards and automated reporting workflows',
      'Integrated with external government regulatory APIs',
      'Implemented audit trails and activity logging to support regulatory requirements',
      'Ensured secure, maintainable frontend architecture for long-term scalability'
    ],
    note: 'Project details and visuals are generalized due to confidentiality constraints.',
    image: complianceImg
  },
  {
    id: 'shipping-system',
    title: 'Global Shipping System',
    tech: 'React, Node.js, Firebase',
    description: 'An end-to-end logistics and shipment tracking platform built for a cross-border logistics operation.',
    fullDescription: 'An end-to-end logistics and shipment tracking platform built for a cross-border logistics operation, providing real-time visibility into shipment status and operational workflows across regions.',
    features: [
      'Developed responsive shipment tracking interfaces using React',
      'Implemented real-time updates and notifications using Firebase',
      'Integrated automated documentation workflows for customs and logistics processes',
      'Collaborated with backend teams on API integrations and data synchronization',
      'Optimized UI performance for high-frequency status updates'
    ],
    note: 'Project details and visuals are generalized due to confidentiality constraints.',
    image: logisticsImg
  }
];

const experiences = [
  {
    id: 'exp-enb',
    title: 'Senior Frontend Developer',
    subtitle: 'Emirates National Bank, Dubai | Feb 2022 - Present',
    content: (
      <ul className="space-y-2 text-slate-300 text-sm list-disc pl-4 marker:text-slate-600">
        <li>Led the migration from a monolithic frontend to a micro-frontend architecture, enabling independent deployments across Credit Card, Account Opening, and Wealth modules.</li>
        <li>Developed React and TypeScript applications using clean component architecture with Redux/NgRx for complex user journeys.</li>
        <li>Built shared frontend libraries and design-system components, ensuring UI consistency across multiple enterprise platforms.</li>
        <li>Developed GraphQL-powered, real-time dashboards for Global & Local Equities, Mutual Funds, Bonds, and Physical Gold.</li>
        <li>Integrated REST and GraphQL APIs, managing asynchronous data flows and complex UI state.</li>
        <li>Improved performance using code splitting, lazy loading, and memoization, enhancing load time and responsiveness.</li>
        <li>Strengthened code quality through Jest and Playwright testing, code reviews, and Agile collaboration.</li>
      </ul>
    )
  },
  {
    id: 'exp-onlinist',
    title: 'Senior Full Stack Developer',
    subtitle: 'Onlinist FZE, Dubai | Mar 2021 - Feb 2022',
    content: (
      <ul className="space-y-2 text-slate-300 text-sm list-disc pl-4 marker:text-slate-600">
        <li>Designed and developed enterprise systems including CRM, ERP, Accounting, and Community Management platforms for large-scale business operations.</li>
        <li>Architected scalable React-based frontend applications with a strong focus on maintainability and modular design.</li>
        <li>Built reusable UI components and dashboards supporting multiple user roles and complex workflows.</li>
        <li>Integrated frontend applications with regulatory systems (ISKAAN, RERA, Mollak) and custom payment gateways.</li>
        <li>Implemented Progressive Web App (PWA) features and ID-based visitor tracking to improve accessibility and security.</li>
        <li>Optimized application performance, reducing response times by ~30% while maintaining 99.9% uptime.</li>
      </ul>
    )
  },
  {
    id: 'exp-inox',
    title: 'Full Stack Developer',
    subtitle: 'Inox Arabia, Dubai | Feb 2020 - Mar 2021',
    content: (
      <ul className="space-y-2 text-slate-300 text-sm list-disc pl-4 marker:text-slate-600">
        <li>Developed modern React-based frontend applications using TypeScript and Redux, following clean and maintainable component architecture.</li>
        <li>Implemented GraphQL-powered dashboards to improve data visualization.</li>
        <li>Built reusable UI components and layouts aligned with internal design systems to ensure consistency and scalability.</li>
        <li>Integrated REST and GraphQL APIs, handling asynchronous data flows.</li>
        <li>Collaborated closely with backend engineers to integrate RESTful APIs and manage asynchronous data flows.</li>
        <li>Improved frontend build, testing, and deployment workflows using CI/CD pipelines, increasing delivery reliability.</li>
        <li>Enhanced application performance through optimized state management and rendering strategies.</li>
      </ul>
    )
  },
  {
    id: 'exp-solutions',
    title: 'Frontend Developer',
    subtitle: 'Solutions Player, Islamabad | Jan 2018 - Dec 2019',
    content: (
      <ul className="space-y-2 text-slate-300 text-sm list-disc pl-4 marker:text-slate-600">
        <li>Developed web applications for accounting, POS, and e-commerce platforms using PHP (Laravel), Node.js, and React.js.</li>
        <li>Developed a global shipping system for seamless cross-border logistics.</li>
        <li>Integrated third-party payment gateways (Braintree, Stripe) for secure transactions.</li>
        <li>Utilized Firebase for real-time notifications, enhancing customer engagement.</li>
        <li>Optimized frontend performance and ensured cross-browser compatibility across devices and environments.</li>
      </ul>
    )
  }
];

function App() {
  const [selectedProject, setSelectedProject] = useState(null);

  const items = useMemo(() => [
    {
      id: 'intro',
      title: 'Profile Overview',
      subtitle: 'Summary',
      fullContent: (
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="space-y-4 flex-1">
            <p className="text-lg text-slate-300 font-mono flex items-center gap-2">
              <MapPin size={18} className="text-accent" />
              Berlin, Germany
            </p>
            <p className="text-slate-300 leading-relaxed">
              Senior Frontend Engineer with 8+ years of experience building scalable, high-performance web applications using React, TypeScript, and modern frontend architectures. Strong expertise in component-based design, state management, and performance optimization.
            </p>
            <p className="text-slate-300 leading-relaxed">
              Proven experience collaborating with designers, backend engineers, and product teams to deliver maintainable, user-centric interfaces in Agile environments.
            </p>
            <div className="flex gap-2 flex-wrap mt-4">
              <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs border border-cyan-500/20">React</span>
              <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs border border-purple-500/20">TypeScript</span>
              <span className="px-3 py-1 rounded-full bg-pink-500/10 text-pink-400 text-xs border border-pink-500/20">Micro-Frontends</span>
              <span className="px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-xs border border-red-500/20">Angular</span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs border border-emerald-500/20">Vue.js</span>
              <span className="px-3 py-1 rounded-full bg-lime-500/10 text-lime-400 text-xs border border-lime-500/20">Node.js</span>
            </div>
          </div>
        </div>
      ),
      headerActions: (
        <>
          <a href="https://github.com/abdul191993" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white hover:bg-slate-800/50 p-2 rounded-lg transition-all flex items-center gap-2 text-sm font-mono border border-slate-700/50">
            <Github size={18} />
            <span className="hidden sm:inline">GitHub</span>
          </a>
          <a href="https://linkedin.com/in/abdul-quddoos-810b13193" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white hover:bg-slate-800/50 p-2 rounded-lg transition-all flex items-center gap-2 text-sm font-mono border border-slate-700/50">
            <Linkedin size={18} />
            <span className="hidden sm:inline">LinkedIn</span>
          </a>
          <a
            href={cvPdf}
            download="Abdul_Quddoos_CV.pdf"
            className="bg-accent/10 hover:bg-accent/20 text-accent border border-accent/20 px-4 py-2 rounded-lg transition-all flex items-center gap-2 text-sm font-bold"
          >
            <Download size={18} />
            Download CV
          </a>
        </>
      )
    },
    {
      id: 'projects',
      title: 'Selected Professional Projects',
      subtitle: 'Key Deliverables',
      fullContent: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map(project => (
            <motion.div
              key={project.id}
              layoutId={`project-card-${project.id}`}
              onClick={() => setSelectedProject(project)}
              className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 cursor-pointer hover:bg-slate-800 transition-colors group/project"
              whileHover={{ scale: 1.02 }}
            >
              <div className="h-40 rounded-lg mb-4 overflow-hidden group-hover/project:scale-[1.02] transition-transform duration-500 relative">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-80 group-hover/project:opacity-100 transition-opacity" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
              </div>
              <h5 className="text-white font-bold group-hover/project:text-accent transition-colors">{project.title}</h5>
              <p className="text-slate-400 text-sm mt-1">{project.tech}</p>
              <p className="text-slate-500 text-xs mt-2 line-clamp-2">{project.description}</p>
            </motion.div>
          ))}
        </div>
      )
    },
    {
      id: 'skills',
      title: 'Technical Skills',
      subtitle: 'Expertise',
      fullContent: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-white font-bold mb-2">Languages & Frameworks</h4>
            <ul className="space-y-1 text-slate-300 text-sm">
              <li><span className="text-accent">▸</span> TypeScript, JavaScript (ES6+), HTML, CSS</li>
              <li><span className="text-accent">▸</span> React, Angular, Vue.js, Node.js</li>
              <li><span className="text-accent">▸</span> RxJS, TailwindCSS, Chart.js</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-2">Tools & Architecture</h4>
            <ul className="space-y-1 text-slate-300 text-sm">
              <li><span className="text-accent">▸</span> Component-based, Micro-frontends</li>
              <li><span className="text-accent">▸</span> Docker, Jenkins, Jira, Figma</li>
              <li><span className="text-accent">▸</span> Clean Architecture, Module Federation</li>
            </ul>
          </div>
        </div>
      )
    },
    ...experiences.map(exp => ({
      id: exp.id,
      title: exp.title,
      subtitle: exp.subtitle,
      fullContent: exp.content
    })),
    {
      id: 'contact',
      title: 'Get in Touch',
      subtitle: 'Contact Me',
      fullContent: <ContactForm />
    }
  ], []);

  return (
    <div className="min-h-screen bg-slate-950 p-4 md:p-8 flex items-center justify-center font-sans overflow-y-auto relative py-20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black opacity-80"></div>

      <div className="w-full px-4 md:w-[80%] max-w-[1600px] z-10 space-y-8">
        <header className="mb-12 border-b border-white/5 pb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
            <div className="flex items-center">
              <div>
                <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-2 uppercase font-mono">
                  Abdul <span className="text-accent">Quddoos</span>
                </h1>
                <p className="text-slate-400 text-lg font-mono flex items-center gap-2">
                  Senior Frontend Developer
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse ml-2"></span>
                  <span className="text-slate-500 text-xs uppercase tracking-widest hidden md:inline">Available for work</span>
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 md:gap-8 items-start sm:items-center">
              <div className="text-slate-400 flex items-center gap-2 text-sm font-mono bg-white/5 px-4 py-2 rounded-full">
                <Mail size={16} className="text-accent" />
                <span>abdul.quddoos8863@gmail.com</span>
              </div>
              <div className="text-slate-400 flex items-center gap-2 text-sm font-mono bg-white/5 px-4 py-2 rounded-full">
                <Phone size={16} className="text-accent" />
                <span>+49 155 63771672</span>
              </div>
            </div>
          </div>
        </header>

        <div className="space-y-6">
          {items.map((item) => (
            <div key={item.id} className="w-full">
              <Card
                title={item.title}
                subtitle={item.subtitle}
                className="w-full"
                headerActions={item.headerActions}
              >
                {/* Render the full content directly */}
                {item.fullContent}
              </Card>
            </div>
          ))}
        </div>

        <footer className="text-center text-slate-500 text-sm pt-8 border-t border-white/5">
          <p>© {new Date().getFullYear()} Abdul Quddoos. Built with React & Tailwind.</p>
        </footer>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 cursor-pointer"
            />
            <motion.div
              layoutId={`project-card-${selectedProject.id}`}
              className="fixed inset-0 m-auto w-full max-w-2xl h-fit max-h-[90vh] bg-slate-900 border border-slate-700 rounded-2xl z-50 overflow-hidden shadow-2xl flex flex-col"
              animate={{
                boxShadow: [
                  "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                  "0 25px 60px -12px rgba(255, 1, 79, 0.2)",
                  "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
                ]
              }}
              exit={{ opacity: 0 }}
              transition={{
                default: { type: "spring", stiffness: 250, damping: 25 },
                boxShadow: {
                  repeat: Infinity,
                  duration: 4,
                  ease: "easeInOut"
                }
              }}
            >
              <div className="h-64 w-full relative">
                <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
                <button
                  onClick={(e) => { e.stopPropagation(); setSelectedProject(null); }}
                  className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors z-10"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                </button>
              </div>
              <div className="p-8 overflow-y-auto">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                >
                  <h3 className="text-3xl font-bold text-white mb-2">{selectedProject.title}</h3>
                  <p className="text-accent font-mono text-sm mb-6">{selectedProject.tech}</p>
                </motion.div>

                <motion.div
                  className="prose prose-invert max-w-none"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                >
                  <p className="text-lg text-slate-300 leading-relaxed mb-6">
                    {selectedProject.fullDescription}
                  </p>
                  <h4 className="text-white font-bold mb-2">Key Contributions</h4>
                  <ul className="list-disc pl-5 text-slate-400 space-y-1">
                    {selectedProject.features?.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                  {selectedProject.note && (
                    <p className="text-slate-500 text-xs mt-6 italic border-t border-slate-700 pt-4">
                      {selectedProject.note}
                    </p>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
