import type { SiteContent } from "@/types/site";

/**
 * Single source of truth for portfolio UI copy.
 * Edit here (or replace placeholders) — keep `knowledge.md` in sync for the chatbot.
 */
export const site: SiteContent = {
  name: "George Dsoza",
  title: "Senior Frontend Developer | Software Engineer",
  location: "Pune, Maharashtra",
  email: "georgedsoza19@gmail.com",
  phone: "+91 9673205706",
  whatsapp: {
    phone: "919673205706",
    prefillMessage:
      "Hi George, I found your portfolio and would like to connect about a frontend opportunity.",
  },
  summary:
    "Results-driven frontend software engineer with 4+ years building scalable web and mobile applications across the React and MERN ecosystems. Specialized in React.js, React Native, Next.js, and TypeScript, with strong command of responsive UI, REST APIs, SSR, and performance optimization.",
  heroTagline:
    "I craft fast, accessible web and mobile products with Next.js, React, and TypeScript.",
  availability: "Open to senior frontend and full-stack product roles",
  copyrightYear: 2026,
  resumePath: "/GeorgeDsoza_Resume.pdf",
  nav: [
    { href: "#about", label: "About" },
    { href: "#experience", label: "Experience" },
    { href: "#projects", label: "Projects" },
    { href: "#skills", label: "Skills" },
    { href: "#contact", label: "Contact" },
  ],
  social: [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/george-dsoza-05a12b275",
    },
    { label: "GitHub", href: "https://github.com/georgedsoza19" },
  ],
  focusAreas: [
    {
      title: "Frontend platforms",
      description:
        "Production UIs with Next.js, React, TypeScript, and design systems that scale across teams.",
    },
    {
      title: "Mobile with React Native",
      description:
        "Cross-platform features — camera, maps, notifications, and store-ready releases.",
    },
    {
      title: "Mentorship & quality",
      description:
        "Code reviews, intern leadership, and standards that keep delivery reliable.",
    },
  ],
  experience: [
    {
      company: "Sekel Technologies",
      role: "Senior Frontend Developer",
      location: "Pune, India",
      start: "Mar 2025",
      end: "Present",
      products: [
        "Omni-commerce Platform",
        "Hyperlocal Dashboard",
        "Sellr Mobile App",
      ],
      technologies: [
        "Next.js",
        "React.js",
        "React Native",
        "TypeScript",
        "Tailwind CSS",
        "NativeWind",
        "Material UI",
        "REST APIs",
        "AWS",
        "Bitbucket",
        "JIRA",
      ],
      highlights: [
        "Led end-to-end development of enterprise hyperlocal and omni-commerce SaaS products — architecture, features, deployment, and maintenance.",
        "Built scalable, reusable web and mobile UIs with Next.js, React, React Native, TypeScript, Tailwind, NativeWind, and Material UI.",
        "Implemented SSR, code splitting, lazy loading, and SEO practices to improve load performance and search visibility.",
        "Delivered core modules including Store, Product, Order, Lead, Campaign, Review, SEO Management, and Analytics.",
        "Integrated native mobile capabilities (QR/barcode, camera, maps, uploads, notifications, AsyncStorage) for Sellr on Android and iOS.",
        "Mentored junior engineers and internship teams; collaborated in Agile/Scrum with product, design, QA, and backend.",
      ],
    },
    {
      company: "Praeclarum Tech Pvt. Ltd",
      role: "Software Engineer",
      location: "Ahmedabad, India",
      start: "Oct 2023",
      end: "Jan 2025",
      products: ["Finti"],
      technologies: [
        "React.js",
        "TypeScript",
        "RTK Query",
        "Ant Design",
        "Tailwind CSS",
        "Sass",
        "Nest.js",
        "MongoDB",
        "AWS",
        "CI/CD",
      ],
      highlights: [
        "Led full-cycle development and maintenance of Finti, a fintech web app for multi-provider application review.",
        "Shipped end-to-end features spanning UI/UX, server-side logic, and REST APIs.",
        "Ran code reviews for quality and performance while mentoring juniors and leading the intern team.",
      ],
    },
    {
      company: "Futurism Technologies Pvt. Ltd",
      role: "Software Developer",
      location: "Pune, India",
      start: "Apr 2022",
      end: "Sep 2023",
      products: ["TreasureCode.X", "Form Builder", "Movez"],
      technologies: [
        "React.js",
        "Redux",
        "Node.js",
        "MongoDB",
        "Bootstrap",
        "Jest",
        "Supertest",
        "Supabase",
      ],
      highlights: [
        "Built TreasureCode.X with ML image uploads, CRUD, roles/permissions, community forum, and real-time updates.",
        "Delivered a JSON-driven Form Builder with responsive UI and reliable API integration.",
        "Owned unit/integration testing with Jest and Supertest across projects including Movez event ticketing.",
      ],
    },
  ],
  projects: [
    {
      name: "Sekel Omni-commerce & Hyperlocal",
      summary:
        "Enterprise SaaS surfaces for stores, orders, campaigns, SEO, and analytics — with SSR and performance-focused Next.js architecture.",
      technologies: ["Next.js", "React", "TypeScript", "Tailwind", "AWS"],
      placeholder: true,
    },
    {
      name: "Sellr Mobile App",
      summary:
        "Cross-platform React Native app with QR/barcode scanning, camera, maps, file upload, and local notifications for Android and iOS.",
      technologies: ["React Native", "TypeScript", "NativeWind", "REST"],
      placeholder: true,
    },
    {
      name: "Finti",
      summary:
        "Fintech web application that lets multiple financial providers review a single application submission quickly.",
      technologies: [
        "React",
        "TypeScript",
        "RTK Query",
        "Nest.js",
        "MongoDB",
        "AWS",
      ],
      placeholder: true,
    },
    {
      name: "TreasureCode.X",
      summary:
        "Web app for ML image uploads, symbol CRUD, role-based access, community forum, and real-time collaboration.",
      technologies: ["React", "Redux", "Node.js", "MongoDB"],
      placeholder: true,
    },
  ],
  skills: [
    {
      title: "Languages",
      items: ["JavaScript (ES6+)", "TypeScript", "HTML5", "CSS3"],
    },
    {
      title: "Frontend",
      items: [
        "React.js",
        "React Native",
        "Next.js",
        "Redux / RTK",
        "RTK Query",
        "Context API",
      ],
    },
    {
      title: "UI & styling",
      items: [
        "Tailwind CSS",
        "NativeWind",
        "Material UI",
        "Ant Design",
        "Bootstrap",
      ],
    },
    {
      title: "Backend & data",
      items: ["Node.js", "Nest.js", "REST APIs", "Supabase", "MongoDB"],
    },
    {
      title: "Quality & delivery",
      items: [
        "Jest",
        "React Testing Library",
        "Supertest",
        "AWS",
        "CI/CD",
        "Git",
        "Agile / JIRA",
      ],
    },
  ],
  education: [
    {
      degree: "Bachelor of Engineering (BE)",
      school: "Shivaji University, Kolhapur",
      year: "2020",
    },
  ],
  achievements: [
    "Led end-to-end development of enterprise SaaS web and mobile applications",
    "Optimized performance with SSR, lazy loading, and code splitting",
    "Mentored junior developers and internship teams while enforcing coding standards",
    "Received repeated client appreciation for on-schedule, high-quality delivery",
  ],
};
