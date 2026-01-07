import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from './components/Card';

const projects = [
  {
    id: 'digital-account',
    title: 'Digital Account Opening',
    tech: 'React, TypeScript, Redux',
    description: 'Developed responsive onboarding journeys and form validation flows for high-volume customer onboarding.',
    fullDescription: 'A comprehensive digital onboarding solution for Emirates NBD. Features include real-time OCR scanning, biometric verification, and seamless integration with core banking systems. Reduced account opening time from days to minutes.',
    image: 'bg-gradient-to-br from-blue-900 to-slate-900'
  },
  {
    id: 'wealth-platform',
    title: 'Digital Wealth Platform',
    tech: 'React, NgRx, Data Viz',
    description: 'Scalable UI dashboards supporting Global/Local Equities, Mutual Funds, Bonds, and Physical Gold.',
    fullDescription: 'An advanced wealth management platform allowing users to trade and monitor various asset classes. Implemented complex data visualization using D3.js and Chart.js for real-time market data analysis.',
    image: 'bg-gradient-to-br from-purple-900 to-slate-900'
  },
  {
    id: 'remit-compliance',
    title: 'ISKAAN (RERA) Compliance',
    tech: 'React, Role-Based UI',
    description: 'Regulatory dashboards and workflows integrated with ISKAAN for real-time real estate compliance.',
    fullDescription: 'Built a robust compliance management system integrating with government APIs (ISKAAN, RERA). Features role-based access control, automated reporting, and audit trails for property management regulatory requirements.',
    image: 'bg-gradient-to-br from-emerald-900 to-slate-900'
  },
  {
    id: 'shipping-system',
    title: 'Global Shipping System',
    tech: 'React, Node.js, Firebase',
    description: 'Developed a global shipping system for seamless cross-border logistics.',
    fullDescription: 'End-to-end logistics platform tracking shipments across borders. Features real-time tracking updates via Firebase, automated customs documentation generation, and route optimization.',
    image: 'bg-gradient-to-br from-orange-900 to-slate-900'
  }
];

function App() {
  const [selectedProject, setSelectedProject] = useState(null);

  const items = useMemo(() => [
    {
      id: 'intro',
      title: 'Abdul Quddoos',
      subtitle: 'Senior Frontend Developer',
      fullContent: (
        <div className="space-y-4">
          <p className="text-lg text-slate-300">
            Berlin, Germany | +49 155 63771672 | abdul.quddoos8863@gmail.com
          </p>
          <p className="text-slate-300">
            Senior Frontend Engineer with 8+ years of experience building scalable, high-performance web applications using React, TypeScript, and modern frontend architectures. Strong expertise in component-based design, state management, and performance optimization.
          </p>
          <p className="text-slate-300">
            Proven experience collaborating with designers, backend engineers, and product teams to deliver maintainable, user-centric interfaces in Agile environments.
          </p>
          <div className="flex gap-2 flex-wrap mt-4">
            <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs border border-cyan-500/20">React</span>
            <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs border border-purple-500/20">TypeScript</span>
            <span className="px-3 py-1 rounded-full bg-pink-500/10 text-pink-400 text-xs border border-pink-500/20">Micro-Frontends</span>
          </div>
        </div>
      )
    },
    {
      id: 'projects',
      title: 'Recent Projects',
      subtitle: 'Key Deliverables (Click for details)',
      fullContent: (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map(project => (
              <motion.div
                key={project.id}
                layoutId={`project-card-${project.id}`}
                onClick={() => setSelectedProject(project)}
                className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 cursor-pointer hover:bg-slate-800 transition-colors group"
                whileHover={{ scale: 1.02 }}
              >
                <div className={`h-32 rounded-lg mb-4 ${project.image} group-hover:scale-[1.02] transition-transform duration-500`}></div>
                <h5 className="text-white font-bold group-hover:text-accent transition-colors">{project.title}</h5>
                <p className="text-slate-400 text-sm mt-1">{project.tech}</p>
                <p className="text-slate-500 text-xs mt-2 line-clamp-2">{project.description}</p>
              </motion.div>
            ))}
          </div>
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
    {
      id: 'experience',
      title: 'Experience',
      subtitle: 'Professional History',
      fullContent: (
        <div className="space-y-10">
          <div className="border-l-2 border-slate-700 pl-6 relative">
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-accent ring-4 ring-slate-900"></div>
            <h4 className="text-xl font-bold text-white">Senior Frontend Developer</h4>
            <p className="text-accent font-mono mb-4">Emirates National Bank, Dubai | Feb 2022 - Present</p>
            <ul className="space-y-2 text-slate-300 text-sm list-disc pl-4 marker:text-slate-600">
              <li>Led the migration from a monolithic frontend to a micro-frontend architecture, enabling independent deployments across Credit Card, Account Opening, and Wealth modules.</li>
              <li>Developed React and TypeScript applications using clean component architecture with Redux/NgRx for complex user journeys.</li>
              <li>Built shared frontend libraries and design-system components, ensuring UI consistency across multiple enterprise platforms.</li>
              <li>Developed GraphQL-powered, real-time dashboards for Global & Local Equities, Mutual Funds, Bonds, and Physical Gold.</li>
              <li>Integrated REST and GraphQL APIs, managing asynchronous data flows and complex UI state.</li>
              <li>Improved performance using code splitting, lazy loading, and memoization, enhancing load time and responsiveness.</li>
              <li>Strengthened code quality through Jest and Playwright testing, code reviews, and Agile collaboration.</li>
            </ul>
          </div>
          <div className="border-l-2 border-slate-700 pl-6 relative">
            <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-slate-500"></div>
            <h4 className="text-xl font-bold text-white">Senior Full Stack Developer</h4>
            <p className="text-slate-400 font-mono mb-4">Onlinist FZE, Dubai | Mar 2021 - Feb 2022</p>
            <ul className="space-y-2 text-slate-300 text-sm list-disc pl-4 marker:text-slate-600">
              <li>Designed and developed enterprise systems including CRM, ERP, Accounting, and Community Management platforms for large-scale business operations.</li>
              <li>Architected scalable React-based frontend applications with a strong focus on maintainability and modular design.</li>
              <li>Built reusable UI components and dashboards supporting multiple user roles and complex workflows.</li>
              <li>Integrated frontend applications with regulatory systems (ISKAAN, RERA, Mollak) and custom payment gateways.</li>
              <li>Implemented Progressive Web App (PWA) features and ID-based visitor tracking to improve accessibility and security.</li>
              <li>Optimized application performance, reducing response times by ~30% while maintaining 99.9% uptime.</li>
            </ul>
          </div>
          <div className="border-l-2 border-slate-700 pl-6 relative">
            <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-slate-500"></div>
            <h4 className="text-xl font-bold text-white">Full Stack Developer</h4>
            <p className="text-slate-400 font-mono mb-4">Inox Arabia, Dubai | Feb 2020 - Mar 2021</p>
            <ul className="space-y-2 text-slate-300 text-sm list-disc pl-4 marker:text-slate-600">
              <li>Developed modern React-based frontend applications using TypeScript and Redux, following clean and maintainable component architecture.</li>
              <li>Implemented GraphQL-powered dashboards to improve data visualization.</li>
              <li>Built reusable UI components and layouts aligned with internal design systems to ensure consistency and scalability.</li>
              <li>Integrated REST and GraphQL APIs, handling asynchronous data flows.</li>
              <li>Collaborated closely with backend engineers to integrate RESTful APIs and manage asynchronous data flows.</li>
              <li>Improved frontend build, testing, and deployment workflows using CI/CD pipelines, increasing delivery reliability.</li>
              <li>Enhanced application performance through optimized state management and rendering strategies.</li>
            </ul>
          </div>
          <div className="border-l-2 border-slate-700 pl-6 relative">
            <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-slate-500"></div>
            <h4 className="text-xl font-bold text-white">Frontend Developer</h4>
            <p className="text-slate-400 font-mono mb-4">Solutions Player, Islamabad | Jan 2018 - Dec 2019</p>
            <ul className="space-y-2 text-slate-300 text-sm list-disc pl-4 marker:text-slate-600">
              <li>Developed web applications for accounting, POS, and e-commerce platforms using PHP (Laravel), Node.js, and React.js.</li>
              <li>Developed a global shipping system for seamless cross-border logistics.</li>
              <li>Integrated third-party payment gateways (Braintree, Stripe) for secure transactions.</li>
              <li>Utilized Firebase for real-time notifications, enhancing customer engagement.</li>
              <li>Optimized frontend performance and ensured cross-browser compatibility across devices and environments.</li>
            </ul>
          </div>
        </div>
      )
    }
  ], []);

  return (
    <div className="min-h-screen bg-slate-950 p-4 md:p-8 flex items-center justify-center font-sans overflow-y-auto relative py-20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black opacity-80"></div>

      <div className="w-full px-4 md:w-[80%] max-w-[1600px] z-10 space-y-8">
        <header className="mb-12 flex flex-col md:flex-row justify-between items-end md:items-center border-b border-white/5 pb-8">
          <div>
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-2 uppercase font-mono">
              Abdul <span className="text-accent">Quddoos</span>
            </h1>
            <p className="text-slate-400 text-lg font-mono">Senior Frontend Developer</p>
          </div>
          <div className="flex gap-4 mt-6 md:mt-0">
            <span className="w-3 h-3 rounded-full bg-accent animate-pulse"></span>
            <span className="text-slate-500 text-sm font-mono uppercase tracking-widest">Available for work</span>
          </div>
        </header>

        <div className="space-y-6">
          {items.map((item) => (
            <div key={item.id} className="w-full">
              <Card
                title={item.title}
                subtitle={item.subtitle}
                className="w-full"
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
              <div className={`h-48 w-full ${selectedProject.image} relative`}>
                <button
                  onClick={(e) => { e.stopPropagation(); setSelectedProject(null); }}
                  className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
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
                  <h4 className="text-white font-bold mb-2">Key Features</h4>
                  <ul className="list-disc pl-5 text-slate-400 space-y-1">
                    <li>Responsive Design</li>
                    <li>High Performance</li>
                    <li>Modern Architecture</li>
                  </ul>
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
