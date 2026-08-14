export const projectCategories = [
  "All",
  "AI",
  "Software",
  "Data",
  "Cloud / DevOps",
  "Security",
] as const;

export type ProjectCategory = Exclude<(typeof projectCategories)[number], "All">;

export type AdditionalProject = {
  slug: string;
  name: string;
  category: ProjectCategory;
  description: string;
  technologies: string[];
  url: string;
  date: string;
};

export const additionalProjects: AdditionalProject[] = [
  {
    slug: "cometchat",
    name: "CometChat",
    category: "Software",
    description:
      "Real-time chat application with a NestJS backend, React frontend, GraphQL API and BullMQ/Redis background processing.",
    technologies: ["NestJS", "React", "GraphQL", "Redis", "BullMQ", "TypeScript"],
    url: "https://github.com/enstso/CometChat",
    date: "2025-06-01",
  },
  {
    slug: "graphql-social-media",
    name: "GraphQL Social Media",
    category: "Software",
    description:
      "Social platform with registration, articles, comments and likes, built with Apollo, Prisma, JWT, React and GraphQL.",
    technologies: ["TypeScript", "GraphQL", "Apollo", "Prisma", "React", "JWT"],
    url: "https://github.com/enstso/graphQlSocialMedia",
    date: "2025-02-01",
  },
  {
    slug: "movie-booker",
    name: "MovieBooker",
    category: "Software",
    description:
      "Movie reservation system with a NestJS API, JWT authentication, TMDB integration, reservation slots, pagination and documented endpoints.",
    technologies: ["NestJS", "React", "TypeScript", "JWT", "REST API", "Swagger"],
    url: "https://github.com/enstso/movieBooker",
    date: "2025-02-01",
  },
  {
    slug: "ansible-gitlab-postgres",
    name: "Ansible GitLab + PostgreSQL",
    category: "Cloud / DevOps",
    description:
      "Automated infrastructure setup for a GitLab server and PostgreSQL database using repeatable Ansible configuration.",
    technologies: ["Ansible", "GitLab", "PostgreSQL", "Linux", "Shell"],
    url: "https://github.com/enstso/ansible-gitlab-postgres",
    date: "2024-12-01",
  },
  {
    slug: "api-gateway-microservices",
    name: "API Gateway Microservices",
    category: "Software",
    description:
      "API gateway centralizing access to book, user and loan services through an Express.js and Axios integration layer.",
    technologies: ["Node.js", "Express", "Axios", "Microservices", "Docker"],
    url: "https://github.com/enstso/apiGateway-microservices",
    date: "2024-12-01",
  },
  {
    slug: "cv-generator-api",
    name: "CV Generator API",
    category: "Software",
    description:
      "Backend for authentication, CV management, recommendations and user-profile workflows in a CV creation platform.",
    technologies: ["Node.js", "JavaScript", "REST API", "Authentication"],
    url: "https://github.com/enstso/CVGenerator-Backend",
    date: "2024-11-01",
  },
  {
    slug: "sixiphermail-react",
    name: "6iphermail Web Client",
    category: "Security",
    description:
      "React interface for an email-analysis platform that helps users inspect messages for phishing and other email-based threats.",
    technologies: ["React", "TypeScript", "JavaScript", "CSS"],
    url: "https://github.com/enstso/6iphermail-react",
    date: "2024-05-01",
  },
  {
    slug: "sixiphermail-api",
    name: "6iphermail Gateway API",
    category: "Security",
    description:
      "Gateway API handling OAuth 2.0 authentication, session management and caching for email-analysis services.",
    technologies: ["TypeScript", "OAuth 2.0", "Caching", "REST API"],
    url: "https://github.com/enstso/6iphermail_api",
    date: "2024-03-01",
  },
  {
    slug: "sixiphermail-analysis",
    name: "6iphermail Analysis API",
    category: "Security",
    description:
      "Standalone service for analyzing email content and supporting message-verification workflows.",
    technologies: ["Python", "JavaScript", "Email Analysis", "API"],
    url: "https://github.com/enstso/6iphermail_api_treatment_mail",
    date: "2024-06-01",
  },
  {
    slug: "cbapp",
    name: "CbApp",
    category: "Software",
    description:
      "C# business application for authentication, course administration and student management, backed by a remotely hosted database.",
    technologies: ["C#", ".NET", "Azure", "Authentication", "SQL"],
    url: "https://github.com/enstso/CbApp",
    date: "2024-01-01",
  },
  {
    slug: "ip-catalogue",
    name: "IP Catalogue",
    category: "Data",
    description:
      "Console application for validating, storing, filtering and displaying IPv4 addresses in decimal, binary and hexadecimal formats.",
    technologies: ["C", "IPv4", "Data Validation", "Docker"],
    url: "https://github.com/enstso/IP_Catalogue",
    date: "2023-10-01",
  },
  {
    slug: "code-manager-platform",
    name: "Code Manager Platform",
    category: "Software",
    description:
      "Campaign application for managing promotional codes, implemented with CodeIgniter and a server-rendered web interface.",
    technologies: ["PHP", "CodeIgniter", "HTML", "Docker"],
    url: "https://github.com/enstso/CodeManagerPlatform",
    date: "2024-01-01",
  },
];
