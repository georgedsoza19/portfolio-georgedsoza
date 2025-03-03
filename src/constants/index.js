import {
  frontend,
  backend,
  blogger,
  mentorship,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  threejs,
  futurism,
  praeclarum,
  saffire,
  portfolio,
  finti,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
  {
    id: "resume",
    title: "Resume",
  },
];

const services = [
  {
    title: "Frontend Developer",
    icon: frontend,
  },
  {
    title: "Backend Developer",
    icon: backend,
  },
  {
    title: "Blogger",
    icon: blogger,
  },
  {
    title: "Mentorship & Guidance",
    icon: mentorship,
  },
];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Redux Toolkit",
    icon: redux,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "Three JS",
    icon: threejs,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "figma",
    icon: figma,
  },
];

const experiences = [
  {
    title: "Jr. React Developer",
    company_name: "Saffire Softtech, Pune",
    icon: saffire,
    iconBg: "#383E56",
    date: "Jan 2021 - Mar 2022",
    points: [
      "Designed and implemented a responsive UI based on requirements and mock-ups.",
      "Integrated APIs for seamless front-end and back-end communication.",
      "Debugged and resolved issues to ensure application stability.",
      "Collaborated with HR and product teams to improve UI and functionality based on feedback.",
    ],
  },
  {
    title: "Software Developer",
    company_name: "Futurism Technologies, Pune",
    icon: futurism,
    iconBg: "#E6DEDD",
    date: "Apr 2022 - Sep 2023",
    points: [
      "Built and maintained responsive components for image uploads, CRUD operations, role-based auth, and community forums using React.",
      "Optimized app performance for high-demand features like image handling and CRUD operations.",
      "Developed reusable, dynamic form components based on JSON schema with state management using Redux.",
      "Created real-time event management features, including ticketing and notifications for seamless user experience.",
    ],
  },
  {
    title: "Software Engineer",
    company_name: "Praeclarum Tech, Ahmedabad",
    icon: praeclarum,
    iconBg: "#383E56",
    date: "Oct 2023 - Jan 2025",
    points: [
      "Designed scalable system architectures and made key technical decisions.",
      "Developed full-stack features using React, Nest, and MongoDB.",
      "Reviewed code to ensure quality, maintainability, and best practices.",
      "Mentored junior developers and collaborated with cross-functional teams.",
    ],
  },
];

const testimonials = [
  {
    testimonial:
      "Their passion for clean, scalable code and modern UI/UX trends has greatly influenced our team's development practice.",
    name: "Datta Chechar",
    designation: "React Developer",
    company: "Saffire Sofftech",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
  },

  {
    testimonial:
      "George is a brilliant problem solver and a supportive teammate, always ready to help with React and front-end challenges.",
    name: "Deepak Pathak",
    designation: "Sr.React Js Developer ",
    company: "Futurism",
    image: "https://randomuser.me/api/portraits/men/10.jpg",
  },
  {
    testimonial:
      "Their ability to break down complex requirements and deliver seamless user experiences is truly commendable.",
    name: "Murari Kumar",
    designation: "Sr.Software Engineer",
    company: "Praeclarum Tech",
    image: "https://randomuser.me/api/portraits/men/7.jpg",
  },
];

const projects = [
  {
    name: "Finti",
    description:
      "Finti offers financial solutions through this web application in seconds. Multiple providers can review a single application submission with the Finti system.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "tailwind",
        color: "pink-text-gradient",
      },
      {
        name: "typescript",
        color: "green-text-gradient",
      },
    ],
    image: finti,
  },
  {
    name: "3D-Portfolio",
    description:
      "A 3D portfolio built with React and Threejs, showcasing interactive visuals, smooth animations, and modern UI design.Optimized for performance and responsiveness.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "threejs",
        color: "green-text-gradient",
      },
      {
        name: "tailwind",
        color: "pink-text-gradient",
      },
    ],
    image: portfolio,
    source_code_link: "https://github.com/georgedsoza19/portfolio-georgedsoza",
  },
];

export { services, technologies, experiences, testimonials, projects };
