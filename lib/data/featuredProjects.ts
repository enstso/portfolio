export type FeaturedProject = {
  slug: string;
  name: string;
  category: string;
  description: string;
  highlights: string[];
  technologies: string[];
  metric?: string;
  githubUrl?: string;
  externalUrl?: string;
  private?: boolean;
};

export const featuredProjects: FeaturedProject[] = [
  {
    slug: "ai-patrimoine",
    name: "AI Patrimoine",
    category: "Agentic AI · Enterprise Workflows",
    description:
      "Agentic AI platform designed for social-housing workflows. The system analyzes meeting transcripts, identifies renovation or acquisition decisions, generates structured summaries and orchestrates follow-up actions.",
    highlights: [
      "Uses n8n for deterministic integrations and straightforward automation.",
      "Combines LangChain business agents with LangGraph orchestration and workflow state.",
      "Includes human-in-the-loop validation, access control, observability and execution-cost monitoring.",
    ],
    technologies: [
      "LangGraph",
      "LangChain",
      "n8n",
      "AI Agents",
      "Human-in-the-Loop",
      "Observability",
    ],
    metric: "5th place — CNCC HackAUDIT",
    githubUrl: "https://github.com/enstso/AI-patrimoine",
  },
  {
    slug: "reusable-ai-agent-skills",
    name: "Reusable AI Agent Skills & Development Framework",
    category:
      "AI-Assisted Software Engineering · Agent Engineering · Developer Tooling",
    description:
      "Reusable AI engineering skills designed for Claude Code and OpenAI Codex to accelerate software development, AI-agent creation and multi-agent orchestration while reusing validated engineering standards and implementation patterns.",
    highlights: [
      "Encodes software architecture, secure-development, robustness, code-quality and design-pattern guidance—not simply faster code generation.",
      "Reuses components, testing patterns and project-specific engineering conventions across agent setups and tool integrations.",
      "Supports LangChain and LangGraph orchestration with human validation and observability.",
      "Built around a codebase reviewed for security, code quality, robustness, architecture and design patterns.",
    ],
    technologies: [
      "Claude Code",
      "OpenAI Codex",
      "LangChain",
      "LangGraph",
      "AI Agents",
      "Software Architecture",
    ],
    private: true,
  },
  {
    slug: "guia",
    name: "GUIA",
    category: "Applied AI · Software · Product Engineering",
    description:
      "AI-powered mobile platform supporting energy-performance and renovation audit workflows through structured data collection, RAG/LLM assistance, OCR, document analysis and image processing.",
    highlights: [
      "Connects a React Native Expo client to NestJS, Flask and REST API services.",
      "Supports property-data collection, DPE workflows, OCR, document analysis and RAG/LLM assistance.",
      "Translates requirements into specifications, UML, architecture and backlog decisions across scalability, reliability, security, cost and UX.",
    ],
    technologies: ["React Native", "NestJS", "Flask", "RAG", "OCR", "REST APIs"],
    metric:
      "Image-processing workflow reduced from ~2 minutes to ~15 seconds — 87.5% reduction",
    private: true,
  },
  {
    slug: "privacy-preserving-document-ai",
    name: "Privacy-Preserving OCR & Document AI API",
    category: "Document AI · OCR · Privacy by Design",
    description:
      "Privacy-oriented document-processing API for text, PDFs and images. It performs local extraction/OCR and detects sensitive information before optional external LLM processing.",
    highlights: [
      "Processes text, PDF and image inputs with local OCR and extraction.",
      "Detects PII and sensitive data through regex and NER before redaction, removal or safe-summary workflows.",
      "Uses human-review warnings, data minimization, Docker and an OpenAPI contract for a GDPR-conscious workflow.",
    ],
    technologies: [
      "FastAPI",
      "OCR",
      "NLP / NER",
      "PII Detection",
      "Docker",
      "OpenAPI",
    ],
    private: true,
  },
];
