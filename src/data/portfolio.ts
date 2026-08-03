import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export const personalInfo = {
  name: "Bilal Elhamri",
  title: "Développeur Full-Stack",
  email: "bilalelhamri2006@gmail.com",
  phone: "0693885599",
  location: "Larache, Maroc",
  github: "https://github.com/bilalelhamri19",
  linkedin: "https://linkedin.com/in/bilal-elhamri1",
  twitter: "",
  website: "",
  avatar: "", 
  summary:
    "Développeur Full Stack récemment diplômé en Développement Digital, passionné par le développement web et les nouvelles technologies. Sérieux, motivé et autonome, je suis à la recherche d'une opportunité pour développer mes compétences, contribuer à des projets concrets et évoluer professionnellement.",
};

export const socialLinks = [
  {
    name: "GitHub",
    url: personalInfo.github,
    icon: Github,
  },
  {
    name: "LinkedIn",
    url: personalInfo.linkedin,
    icon: Linkedin,
  },
  {
    name: "Email",
    url: `mailto:${personalInfo.email}`,
    icon: Mail,
  },
  {
    name: "Téléphone",
    url: `tel:${personalInfo.phone}`,
    icon: Phone,
  },
];

export const contactInfo = [
  {
    name: "Email",
    value: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
    icon: Mail,
  },
  {
    name: "Téléphone",
    value: personalInfo.phone,
    href: `tel:${personalInfo.phone}`,
    icon: Phone,
  },
  {
    name: "Localisation",
    value: personalInfo.location,
    href: "#",
    icon: MapPin,
  },
];

export const experiences = [
  {
    id: 1,
    company: "Commune de Larache",
    role: "Développeur Full-Stack",
    startDate: "2026-04",
    endDate: "2026-05",
    description:
      "Stage ou mission en tant que Développeur Full-Stack au sein de la Commune de Larache.",
    achievements: [
      "Analyse, conception et réalisation de l'application web e-RH Larache.",
    ],
    technologies: ["PHP", "JavaScript", "HTML5", "CSS3", "MySQL"],
  },
  {
    id: 2,
    company: "AJPRO",
    role: "Assistant en installation de systèmes sprinklers",
    startDate: "",
    endDate: "",
    description:
      "Assistant en installation de systèmes sprinklers pour la protection incendie.",
    achievements: [],
    technologies: [],
  },
  {
    id: 3,
    company: "PROMITY, Zone Automotive Tanger Med",
    role: "Assistant technicien en climatisation et courant faible",
    startDate: "",
    endDate: "",
    description:
      "Assistant technicien en climatisation et courant faible au sein de la Zone Automotive Tanger Med.",
    achievements: [],
    technologies: [],
  },
];

export const projects = [
  {
    id: 1,
    title: "Tawassol",
    slug: "tawassol",
    overview: "Application web Tawassol.",
    objectives: "Analyse, conception et réalisation de l'application web Tawassol.",
    features: ["Analyse et conception", "Développement complet de l'application"],
    technologies: ["PHP", "JavaScript", "HTML5", "CSS3", "MySQL"],
    role: "Développeur Web",
    startDate: "",
    endDate: "",
    github: "https://github.com/bilalelhamri19",
    liveUrl: "",
    image: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Modern%20web%20application%20dashboard%20clean%20dark%20UI%20blue%20accent&image_size=landscape_16_9",
  },
  {
    id: 2,
    title: "Coding Life",
    slug: "coding-life",
    overview: "Site web Coding Life.",
    objectives: "Conception et réalisation du site web Coding Life.",
    features: ["Interface utilisateur moderne", "Design responsive"],
    technologies: ["HTML5", "CSS3", "JavaScript"],
    role: "Développeur Web",
    startDate: "",
    endDate: "",
    github: "https://github.com/bilalelhamri19",
    liveUrl: "",
    image: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Coding%20blog%20or%20platform%20website%20dark%20theme%20purple%20blue%20gradient&image_size=landscape_16_9",
  },
  {
    id: 3,
    title: "Hotel Manager",
    slug: "hotel-manager",
    overview: "Application web pour la gestion hôtelière.",
    objectives: "Conception et développement de l'application web Hotel Manager.",
    features: ["Gestion des réservations", "Gestion des chambres"],
    technologies: ["PHP", "MySQL", "JavaScript"],
    role: "Développeur Web",
    startDate: "",
    endDate: "",
    github: "https://github.com/bilalelhamri19",
    liveUrl: "",
    image: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Hotel%20management%20dashboard%20interface%20dark%20mode%20cyan%20accent%20glassmorphism&image_size=landscape_16_9",
  },
  {
    id: 4,
    title: "Ila Al-Jannah",
    slug: "ila-al-jannah",
    overview: "Plateforme web Ila Al-Jannah.",
    objectives: "Conception et réalisation de la plateforme web Ila Al-Jannah.",
    features: ["Plateforme interactive et accessible"],
    technologies: ["HTML5", "CSS3", "JavaScript", "PHP"],
    role: "Développeur Web",
    startDate: "",
    endDate: "",
    github: "https://github.com/bilalelhamri19",
    liveUrl: "",
    image: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Islamic%20platform%20website%20clean%20design%20dark%20background%20blue%20gradient&image_size=landscape_16_9",
  },
  {
    id: 5,
    title: "Calculatrice Scientifique",
    slug: "calculatrice-scientifique",
    overview: "Application de calculatrice scientifique performante.",
    objectives: "Réalisation d'une application de calculatrice scientifique.",
    features: ["Fonctions mathématiques avancées", "Interface intuitive"],
    technologies: ["PHP", "CSS"],
    role: "Développeur",
    startDate: "",
    endDate: "",
    github: "https://github.com/bilalelhamri19",
    liveUrl: "",
    image: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Scientific%20calculator%20web%20app%20clean%20dark%20ui&image_size=landscape_16_9",
  },
  {
    id: 6,
    title: "Gestion des Stagiaires",
    slug: "gestion-stagiaires",
    overview: "Application pour la gestion des stagiaires.",
    objectives: "Réalisation d'une application pour la gestion et le suivi des stagiaires.",
    features: ["Suivi des stagiaires", "Gestion des profils"],
    technologies: ["PHP", "Bootstrap", "MySQL"],
    role: "Développeur",
    startDate: "",
    endDate: "",
    github: "https://github.com/bilalelhamri19",
    liveUrl: "",
    image: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Student%20management%20system%20dashboard%20dark%20theme&image_size=landscape_16_9",
  },
];

export const skills = {
  frontend: [
    { name: "JavaScript", level: 85 },
    { name: "HTML5", level: 90 },
    { name: "CSS3", level: 85 },
    { name: "Bootstrap", level: 80 },
  ],
  backend: [
    { name: "PHP", level: 85 },
    { name: "Python", level: 75 },
    { name: "Node.js", level: 70 },
  ],
  languages: [
    { name: "JavaScript", level: 85 },
    { name: "PHP", level: 85 },
    { name: "Python", level: 75 },
  ],
  databases: [
    { name: "MySQL", level: 85 },
    { name: "MongoDB", level: 75 },
  ],
  frameworks: [
    { name: "Node.js", level: 70 },
  ],
  tools: [
    { name: "Git", level: 85 },
    { name: "GitLab", level: 80 },
    { name: "SonarQube", level: 70 },
    { name: "Astah", level: 75 },
  ],
  operatingSystems: [
    { name: "Windows 10/11", level: 95 },
    { name: "Linux", level: 80 },
  ],
  office: [
    { name: "Word", level: 90 },
    { name: "Excel", level: 85 },
    { name: "PowerPoint", level: 85 },
  ],
  projectManagement: [
    { name: "Merise", level: 85 },
    { name: "UML", level: 80 },
  ],
  modeling: [
    { name: "Merise", level: 85 },
    { name: "UML", level: 80 },
  ],
};

export const education = [
  {
    id: 1,
    institution: "Institut Spécialisé de Technologie Appliquée (Larache)",
    diploma: "Diplôme de Technicien spécialisé en Développement Digital Option Web Full Stack",
    startDate: "2024",
    endDate: "2026",
    description: "Formation approfondie en développement web, création d'applications, et gestion de projets.",
    gpa: "",
    achievements: [],
  },
  {
    id: 2,
    institution: "Lycée Qualifiant ibnou al athir (Arbaoua)",
    diploma: "Baccalauréat en science physique",
    startDate: "2023",
    endDate: "2024",
    description: "Enseignement scientifique axé sur la physique et la chimie.",
    gpa: "",
    achievements: [],
  },
];

export const certifications = [
  {
    id: 1,
    name: "Introduction to Python Programming",
    issuer: "Edraak إدراك",
    date: "2026-08",
    credentialId: "3825a7ea85ad42d0a6e379311592b919",
    credentialUrl: "https://www.edraak.org",
    skills: ["Python", "Programmation"],
  },
  {
    id: 2,
    name: "Advanced Excel",
    issuer: "Edraak إدراك",
    date: "2026-08",
    credentialId: "51c7180983b6413cb38bcd885aa0cc08",
    credentialUrl: "https://www.edraak.org",
    skills: ["Excel", "Microsoft Office"],
  },
  {
    id: 3,
    name: "Programming with JavaScript",
    issuer: "Meta",
    date: "2026-07",
    credentialId: "QJW5BGNAT7HH",
    credentialUrl: "https://www.coursera.org",
    skills: ["JavaScript", "Développement Web"],
  },
  {
    id: 4,
    name: "HTML and CSS in depth",
    issuer: "Meta",
    date: "2026-07",
    credentialId: "URG4Y0W7RU7L",
    credentialUrl: "https://www.coursera.org",
    skills: ["HTML5", "CSS3", "Développement Web"],
  },
  {
    id: 5,
    name: "One Million Prompters",
    issuer: "Dubai Future Foundation",
    date: "2026-07",
    credentialId: "",
    credentialUrl: "https://www.dubaifuture.ae",
    skills: ["ChatGPT", "Intelligence Artificielle"],
  },
  {
    id: 6,
    name: "Sites Web efficaces",
    issuer: "HP LIFE",
    date: "2026-06",
    credentialId: "2e2124d3-54c9-4f8b-a8e3-56a1bdb6429a",
    credentialUrl: "https://www.life.hp.com",
    skills: ["Développement Web", "Marketing Digital"],
  },
  {
    id: 7,
    name: "Claude Platform 101",
    issuer: "Anthropic",
    date: "2026-06",
    credentialId: "",
    credentialUrl: "https://www.anthropic.com",
    skills: ["Intelligence Artificielle", "Claude AI"],
  },
  {
    id: 8,
    name: "Building with the Claude API",
    issuer: "Anthropic",
    date: "2026-06",
    credentialId: "",
    credentialUrl: "https://www.anthropic.com",
    skills: ["Claude API", "Intelligence Artificielle"],
  },
  {
    id: 9,
    name: "JavaScript Essentials 1",
    issuer: "Cisco Networking Academy",
    date: "2026-06",
    credentialId: "7d29efe1-c7a3-4a60-bd0a-b8e53ef0219d",
    credentialUrl: "https://www.netacad.com",
    skills: ["JavaScript", "Développement Web"],
  },
  {
    id: 10,
    name: "Introduction to Cybersecurity",
    issuer: "Cisco Networking Academy",
    date: "2026-07",
    credentialId: "538a76a1-6905-47ad-88d8-847394f656b1",
    credentialUrl: "https://www.netacad.com",
    skills: ["Cybersécurité", "Réseaux"],
  },
  {
    id: 11,
    name: "Attestation de Fin de Stage",
    issuer: "Commune de Larache",
    date: "2026-06",
    credentialId: "",
    credentialUrl: "#",
    skills: ["Développement Web", "React.js", "PHP", "MySQL"],
  },
];

export const languages = [
  { name: "Arabe", level: "Langue maternelle", proficiency: 100 },
  { name: "Français", level: "Intermédiaire", proficiency: 65 },
  { name: "Anglais", level: "Débutant", proficiency: 40 },
];

export const softSkills = [
  {
    name: "Communication efficace",
    description: "Capacité à échanger des idées de manière claire et concise.",
    icon: "message-square",
  },
  {
    name: "Gestion du temps",
    description: "Priorisation et respect des délais.",
    icon: "clock",
  },
  {
    name: "Motivation",
    description: "Engagement et volonté d'apprendre et de progresser.",
    icon: "zap",
  },
  {
    name: "Esprit d'équipe",
    description: "Collaboration et entraide pour atteindre des objectifs communs.",
    icon: "users",
  },
  {
    name: "Travail en équipe",
    description: "Capacité à travailler harmonieusement avec d'autres personnes.",
    icon: "handshake",
  },
  {
    name: "Adaptabilité",
    description: "Flexibilité face aux changements et aux nouvelles situations.",
    icon: "sparkles",
  },
];

export const navLinks = [
  { name: "Accueil", href: "#home" },
  { name: "À propos", href: "#about" },
  { name: "Expérience", href: "#experience" },
  { name: "Projets", href: "#projects" },
  { name: "Compétences", href: "#skills" },
  { name: "Formation", href: "#education" },
  { name: "Contact", href: "#contact" },
];
