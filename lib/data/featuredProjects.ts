export type FeaturedProject = {
  slug: string;
  name: string;
  category: string;
  description: string;
  period?: string;
  collaborators?: string[];
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
    collaborators: ["Amadou Diallo"],
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
      "Co-founded GUIA, an AI-powered mobile application designed to automate Energy Performance Diagnosis (DPE) audit workflows and support the generation of compliant renovation reports.",
    period: "Nov 2025 – Present",
    collaborators: ["Amadou Diallo"],
    highlights: [
      "Contributed to product strategy, technical architecture and full-stack development, combining React Native Expo, NestJS, Flask, REST APIs, LLM/RAG workflows, OCR, document analysis and image processing.",
      "Designed AI-guided features for property data collection, DPE calculations, photo-based diagnostic assistance and automated audit support, reducing image processing time from approximately 2 minutes to 15 seconds.",
      "Translated business requirements into technical specifications, UML diagrams, backlog items and scalable product architecture, with a focus on automation, reliability, user experience and long-term scalability.",
    ],
    technologies: [
      "React Native Expo",
      "NestJS",
      "Flask",
      "REST APIs",
      "LLM / RAG",
      "OCR",
      "Document Analysis",
      "Image Processing",
    ],
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
