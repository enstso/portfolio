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

type ProjectSnapshot = Omit<AdditionalProject, "slug" | "url"> & {
  repository?: string;
};

// Public repository snapshot used when the database is empty or unavailable.
// The list is intentionally explicit: the portfolio stays useful without making
// a GitHub API request during normal public traffic.
const projectSnapshots: ProjectSnapshot[] = [
  {
    name: "Resource Collection Simulation",
    repository: "Resource-Collection-Simulation",
    category: "Software",
    description:
      "Rust terminal simulation of autonomous scout and collector robots with multithreading, Perlin-generated maps and BFS pathfinding.",
    technologies: ["Rust", "Ratatui", "Multithreading", "BFS"],
    date: "2026-08-14",
  },
  {
    name: "AI Patrimoine",
    repository: "AI-patrimoine",
    category: "AI",
    description:
      "Agentic AI platform for orchestrating asset-management workflows with human validation, access control and observability.",
    technologies: ["LangGraph", "LangChain", "n8n", "AI Agents"],
    date: "2026-07-26",
  },
  {
    name: "ML-Powered IT Ticket Classifier",
    repository: "ML_Powered_IT_Ticket_Classifier",
    category: "AI",
    description:
      "Machine-learning system that classifies IT support tickets with NLP and routes low-confidence predictions through human validation.",
    technologies: ["Python", "NLP", "scikit-learn", "Flask"],
    date: "2026-07-20",
  },
  {
    name: "MoodMetrics",
    category: "AI",
    description:
      "Sentiment-analysis API that scores tweets, evaluates model quality and supports automated retraining workflows.",
    technologies: ["Python", "Flask", "Machine Learning", "MySQL", "Docker"],
    date: "2026-07-02",
  },
  {
    name: "3CL Method",
    repository: "3CL_Method",
    category: "Data",
    description:
      "Implementation of the 3CL-DPE 2021 thermal calculation method for energy pre-audits, DPE ratings and renovation scenarios.",
    technologies: ["Python", "Data Processing", "Energy Modeling"],
    date: "2026-06-23",
  },
  {
    name: "IMDb Optimization",
    repository: "imdbOptimization",
    category: "Data",
    description:
      "IMDb dataset import and PostgreSQL query-performance analysis using repeatable EXPLAIN ANALYZE experiments.",
    technologies: ["Python", "PostgreSQL", "Docker", "SQL"],
    date: "2026-06-18",
  },
  {
    name: "Poker Hand",
    repository: "PokerHand",
    category: "Software",
    description:
      "TypeScript Texas Hold'em evaluator with best-of-seven selection, deterministic tie-breaking and split-pot support.",
    technologies: ["TypeScript", "TDD", "Algorithms"],
    date: "2026-03-05",
  },
  {
    name: "NetflixInnov",
    category: "Software",
    description:
      "Real-time watch-party application with synchronized playback, live chat, reactions and room management.",
    technologies: ["TypeScript", "Socket.IO", "Real-time Systems"],
    date: "2026-03-05",
  },
  {
    name: "JuriRH Assistant",
    repository: "JuriRH-Assistant",
    category: "AI",
    description:
      "AI-powered HR legal assistant using RAG, hybrid retrieval, cited sources and locally hosted open-source models.",
    technologies: ["Python", "RAG", "BM25", "FAISS", "Ollama"],
    date: "2026-02-10",
  },
  {
    name: "Goal & Habit Tracker",
    repository: "ProjetWeb",
    category: "Software",
    description:
      "Full-stack productivity application for goals, actionable steps, habits, streaks and progress dashboards.",
    technologies: ["TypeScript", "AdonisJS", "React", "PostgreSQL"],
    date: "2026-01-19",
  },
  {
    name: "Legal Assistant POC",
    repository: "LegalAssitantPoc",
    category: "AI",
    description:
      "Legal RAG assistant combining semantic and keyword retrieval, cited answers, evaluation metrics and observability.",
    technologies: ["Python", "RAG", "FastAPI", "Chroma", "Gemini"],
    date: "2025-12-19",
  },
  {
    name: "Event Planner",
    repository: "Event-Planner",
    category: "Software",
    description:
      "Angular application for browsing events, registering attendance and managing authenticated user registrations.",
    technologies: ["Angular", "TypeScript", "Authentication"],
    date: "2025-11-15",
  },
  {
    name: "Flight Aggregator",
    repository: "flight-aggregator",
    category: "Software",
    description:
      "Go API that aggregates flights from multiple sources and sorts results by price, departure date or travel time.",
    technologies: ["Go", "REST API", "Aggregation"],
    date: "2025-09-22",
  },
  {
    name: "Fleet Tasks",
    repository: "Fleet-Tasks",
    category: "Software",
    description: "Lightweight Go REST API for creating, listing, retrieving and deleting tasks and users.",
    technologies: ["Go", "REST API"],
    date: "2025-09-22",
  },
  {
    name: "Guess Game Go",
    repository: "guess-GameGo",
    category: "Software",
    description: "Small command-line number guessing game implemented in Go.",
    technologies: ["Go", "CLI"],
    date: "2025-09-22",
  },
  {
    name: "Todo List Flutter",
    repository: "todoListFlutter",
    category: "Software",
    description: "Flutter task manager with authentication and personal todo-list workflows.",
    technologies: ["Dart", "Flutter", "Authentication"],
    date: "2025-09-02",
  },
  {
    name: "Todo List Angular",
    repository: "todoListNg",
    category: "Software",
    description: "Responsive Angular application for creating, editing and organizing todos.",
    technologies: ["Angular", "TypeScript"],
    date: "2025-09-01",
  },
  {
    name: "Vinted Responsible-Digital Audit",
    repository: "audit-vinted",
    category: "Data",
    description:
      "Audit of Vinted's listing experience covering eco-design, accessibility, sustainability and responsible-digital recommendations.",
    technologies: ["HTML", "Accessibility", "Eco-design", "Audit"],
    date: "2025-06-20",
  },
  {
    name: "CometChat",
    category: "Software",
    description:
      "Real-time chat application with a NestJS backend, React frontend, GraphQL API and BullMQ/Redis background processing.",
    technologies: ["NestJS", "React", "GraphQL", "Redis", "BullMQ"],
    date: "2025-06-02",
  },
  {
    name: "Nuclear Physics Distributed Computing",
    repository: "Nuclear-physics",
    category: "Cloud / DevOps",
    description:
      "Distributed computing simulation with RabbitMQ producers, specialized workers, result aggregation and a REST interface.",
    technologies: ["JavaScript", "RabbitMQ", "Distributed Systems", "REST API"],
    date: "2025-04-29",
  },
  {
    name: "RabbitMQ Explore",
    repository: "rabbitmq-explore",
    category: "Cloud / DevOps",
    description:
      "Dockerized examples of Direct, Topic and Fanout exchanges for experimenting with RabbitMQ routing patterns.",
    technologies: ["RabbitMQ", "Docker", "Messaging"],
    date: "2025-04-28",
  },
  {
    name: "RuaData Auth",
    repository: "RuaData-auth",
    category: "Software",
    description: "React authentication context and protected-route package for managing application access.",
    technologies: ["React", "TypeScript", "Authentication"],
    date: "2025-04-28",
  },
  {
    name: "Test Manage Users",
    repository: "TestManageUsers",
    category: "Software",
    description:
      "User-management application validated through unit, end-to-end, regression and performance tests.",
    technologies: ["PHP", "PHPUnit", "Selenium", "k6"],
    date: "2025-04-01",
  },
  {
    name: "RuaCloud",
    category: "Cloud / DevOps",
    description: "Personal cloud environment built with K3s and PostgreSQL persistence.",
    technologies: ["K3s", "Kubernetes", "PostgreSQL", "Shell"],
    date: "2025-03-23",
  },
  {
    name: "Task Manager Test",
    repository: "TaskManagerTest",
    category: "Software",
    description:
      "Web task manager with functional and load-testing coverage for its core create, delete and display workflows.",
    technologies: ["PHP", "Functional Testing", "Performance Testing"],
    date: "2025-03-19",
  },
  {
    name: "GraphQL Social Media",
    repository: "graphQlSocialMedia",
    category: "Software",
    description:
      "Social platform with registration, articles, comments and likes, built with Apollo, Prisma, JWT, React and GraphQL.",
    technologies: ["TypeScript", "GraphQL", "Apollo", "Prisma", "React", "JWT"],
    date: "2025-02-26",
  },
  {
    name: "Rick and Morty GraphQL",
    repository: "RickandMortyGql",
    category: "Software",
    description: "Interactive React client for exploring characters and data from the Rick and Morty GraphQL API.",
    technologies: ["React", "TypeScript", "GraphQL"],
    date: "2025-02-24",
  },
  {
    name: "adStatsSnap",
    category: "Data",
    description: "Analytics middleware for centralizing and evaluating Snapchat advertising campaign performance.",
    technologies: ["Analytics", "Data Processing", "Marketing APIs"],
    date: "2025-02-21",
  },
  {
    name: "Snapchat Leads",
    repository: "snapchatLeads",
    category: "Software",
    description: "Platform for planning, operating and analyzing Snapchat marketing campaigns.",
    technologies: ["TypeScript", "Marketing APIs", "Analytics"],
    date: "2025-02-15",
  },
  {
    name: "MovieBooker",
    repository: "movieBooker",
    category: "Software",
    description:
      "Movie reservation system with a NestJS API, JWT authentication, TMDB integration, slots and documented endpoints.",
    technologies: ["NestJS", "React", "TypeScript", "JWT", "Swagger"],
    date: "2025-02-03",
  },
  {
    name: "Population Big Data",
    repository: "population-BigData",
    category: "Data",
    description: "Analysis of French population distribution and regional disparities using INSEE datasets.",
    technologies: ["Python", "Data Analysis", "INSEE"],
    date: "2024-12-15",
  },
  {
    name: "API Gateway Microservices",
    repository: "apiGateway-microservices",
    category: "Software",
    description:
      "Gateway centralizing access to book, user and loan services through an Express and Axios integration layer.",
    technologies: ["Node.js", "Express", "Axios", "Microservices"],
    date: "2024-12-12",
  },
  {
    name: "Books Microservice",
    repository: "livres-microservices",
    category: "Software",
    description: "Express service providing CRUD, search and availability operations for a book catalog.",
    technologies: ["Node.js", "Express", "Microservices", "REST API"],
    date: "2024-12-12",
  },
  {
    name: "Ansible GitLab + PostgreSQL",
    repository: "ansible-gitlab-postgres",
    category: "Cloud / DevOps",
    description: "Automated GitLab and PostgreSQL infrastructure setup using repeatable Ansible configuration.",
    technologies: ["Ansible", "GitLab", "PostgreSQL", "Linux", "Shell"],
    date: "2024-12-04",
  },
  {
    name: "CV Generator API",
    repository: "CVGenerator-Backend",
    category: "Software",
    description: "Backend for authentication, CV management, recommendations and user-profile workflows.",
    technologies: ["Node.js", "JavaScript", "REST API", "Authentication"],
    date: "2024-11-25",
  },
  {
    name: "CV Generator Frontend",
    repository: "CVGenerator-Frontend",
    category: "Software",
    description: "Frontend for creating, viewing and managing CVs and professional recommendations.",
    technologies: ["React", "JavaScript", "Tailwind CSS"],
    date: "2024-11-23",
  },
  {
    name: "Next.js Boilerplate",
    repository: "nextBoilerplate",
    category: "Software",
    description: "Lightweight, customizable foundation for scalable Next.js applications.",
    technologies: ["Next.js", "TypeScript", "React"],
    date: "2024-11-03",
  },
  {
    name: "6ipher Password Rust",
    repository: "6ipher_password_rust",
    category: "Security",
    description: "Command-line utility for secure password generation, security evaluation and MD5 exercises.",
    technologies: ["Rust", "CLI", "Password Security", "MD5"],
    date: "2024-08-15",
  },
  {
    name: "Symfony Boilerplate",
    repository: "SymfonyBoilerplate",
    category: "Cloud / DevOps",
    description: "Dockerized Symfony foundation with preconfigured database connectivity and scalable project structure.",
    technologies: ["Symfony", "PHP", "Docker"],
    date: "2024-07-10",
  },
  {
    name: "6iphermail Analysis API",
    repository: "6iphermail_api_treatment_mail",
    category: "Security",
    description: "Standalone service for analyzing email content and supporting message-verification workflows.",
    technologies: ["Python", "Email Analysis", "API"],
    date: "2024-06-17",
  },
  {
    name: "MD5 in Assembly",
    repository: "md5ASM",
    category: "Security",
    description: "Implementation of the MD5 transformation algorithm in x86-64 assembly.",
    technologies: ["Assembly", "x86-64", "MD5"],
    date: "2024-06-09",
  },
  {
    name: "6iphermail Web Client",
    repository: "6iphermail-react",
    category: "Security",
    description: "React interface for inspecting messages for phishing and other email-based threats.",
    technologies: ["React", "TypeScript", "Email Security"],
    date: "2024-05-22",
  },
  {
    name: "6iphermail Gateway API",
    repository: "6iphermail_api",
    category: "Security",
    description: "Gateway API handling OAuth 2.0, sessions and caching for email-analysis services.",
    technologies: ["TypeScript", "OAuth 2.0", "Caching", "REST API"],
    date: "2024-03-11",
  },
  {
    name: "LinkedIn Post Scraper",
    repository: "ScrapingPostLinkedin",
    category: "Data",
    description: "Containerized LinkedIn page-data workflow connected to Baserow and webhook automations.",
    technologies: ["Python", "Docker", "Web Scraping", "Baserow"],
    date: "2024-01-21",
  },
  {
    name: "Python Security Lab Scripts",
    repository: "ScriptsExploitPython",
    category: "Security",
    description: "Controlled-lab scripts for learning how security assessments identify network and system weaknesses.",
    technologies: ["Python", "Security Testing", "Networking"],
    date: "2024-01-18",
  },
  {
    name: "Amanoz Vulnerable Lab",
    repository: "AmanozVuln",
    category: "Security",
    description: "Intentionally vulnerable PHP storefront for practicing defensive web-security analysis in a controlled lab.",
    technologies: ["PHP", "Web Security", "Controlled Lab"],
    date: "2024-01-18",
  },
  {
    name: "System Administration Docs",
    repository: "Docs-Admin-Sys",
    category: "Cloud / DevOps",
    description: "Technical notes covering networking, Linux administration and system configuration.",
    technologies: ["Linux", "Networking", "System Administration"],
    date: "2024-01-18",
  },
  {
    name: "CbApp",
    category: "Software",
    description: "C# application for course and student administration with authentication and secure password storage.",
    technologies: ["C#", ".NET", "Azure", "SQL"],
    date: "2024-01-18",
  },
  {
    name: "Pizza Order Manager",
    repository: "Pizzafork",
    category: "Software",
    description: "Laravel application for pizza ordering, role-based workflows and menu administration.",
    technologies: ["Laravel", "PHP", "JavaScript", "Authentication"],
    date: "2024-01-18",
  },
  {
    name: "CipherApp WPF",
    repository: "CipherApp-Wpf",
    category: "Security",
    description: "Desktop application for password generation and educational message-encryption algorithms.",
    technologies: ["C#", "WPF", "Cryptography"],
    date: "2024-01-18",
  },
  {
    name: "Code Manager Platform",
    repository: "CodeManagerPlatform",
    category: "Software",
    description: "CodeIgniter campaign application for managing promotional codes.",
    technologies: ["PHP", "CodeIgniter", "HTML"],
    date: "2024-01-10",
  },
  {
    name: "Symfony + React Users API",
    repository: "Api-Users-Symfony-React",
    category: "Software",
    description: "Symfony CRUD API with a React client for user-management workflows.",
    technologies: ["Symfony", "PHP", "React", "REST API"],
    date: "2024-01-10",
  },
  {
    name: "Weather App",
    repository: "WeatherApp",
    category: "Software",
    description: "Responsive CodeIgniter weather application backed by a third-party forecast API.",
    technologies: ["PHP", "CodeIgniter", "REST API"],
    date: "2024-01-09",
  },
  {
    name: "Todo App CodeIgniter 4",
    repository: "TodoAppCi4",
    category: "Software",
    description: "MVC task manager for adding, editing, reordering, completing and deleting tasks.",
    technologies: ["PHP", "CodeIgniter", "MVC"],
    date: "2024-01-07",
  },
  {
    name: "Ultra Trail des Lapins",
    repository: "UltraTrailDesLapins",
    category: "Software",
    description: "C# application for managing rabbit races, participants, distances and race details.",
    technologies: ["C#", ".NET"],
    date: "2024-01-07",
  },
  {
    name: "Colocation CROUS",
    repository: "ColocationCrous",
    category: "Software",
    description: "Shared-expense manager for students, roommates and fair cost distribution.",
    technologies: ["C#", ".NET", "Expense Management"],
    date: "2024-01-07",
  },
  {
    name: "IP Catalogue",
    repository: "IP_Catalogue",
    category: "Data",
    description: "Console tool for validating, storing, filtering and displaying IPv4 addresses in multiple formats.",
    technologies: ["C", "IPv4", "Data Validation"],
    date: "2023-10-31",
  },
  {
    name: "GitFlow",
    category: "Cloud / DevOps",
    description: "Practice repository demonstrating the GitFlow branch-management model.",
    technologies: ["Git", "GitFlow", "Shell"],
    date: "2023-10-11",
  },
];

export const additionalProjects: AdditionalProject[] = projectSnapshots
  .map((project) => {
    const repository = project.repository ?? project.name;
    return {
      slug: slugify(repository),
      name: project.name,
      category: project.category,
      description: project.description,
      technologies: project.technologies,
      url: `https://github.com/enstso/${repository}`,
      date: project.date,
    };
  })
  .sort((left, right) => Date.parse(right.date) - Date.parse(left.date));

const categoryByRepository = new Map(
  additionalProjects.map((project) => [repositoryName(project.url).toLowerCase(), project.category]),
);

export function inferProjectCategory(
  name: string,
  description: string,
  technologies: string[],
): ProjectCategory {
  const configuredCategory = categoryByRepository.get(name.toLowerCase());
  if (configuredCategory) return configuredCategory;

  const searchable = `${name} ${description} ${technologies.join(" ")}`.toLowerCase();

  if (matchesAny(searchable, ["artificial intelligence", "machine learning", "langchain", "langgraph", "llm", "rag", "nlp", "sentiment", "classifier", "ollama", "gemini", "faiss", "chroma"])) {
    return "AI";
  }
  if (matchesAny(searchable, ["kubernetes", "k3s", "ansible", "devops", "infrastructure", "rabbitmq", "gitflow", "system administration", "dockerfile"])) {
    return "Cloud / DevOps";
  }
  if (matchesAny(searchable, ["security", "phishing", "oauth", "cipher", "cryptography", "vulnerab", "pentest", "md5"])) {
    return "Security";
  }
  if (matchesAny(searchable, ["data analysis", "analytics", "dataset", "big data", "insee", "postgresql", "scraping", "audit"])) {
    return "Data";
  }
  return "Software";
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function repositoryName(url: string) {
  return url.replace(/\/$/, "").split("/").pop() ?? "";
}

function matchesAny(value: string, terms: string[]) {
  return terms.some((term) => value.includes(term));
}
