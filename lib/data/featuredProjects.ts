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
      "AI Patrimoine addresses the need to turn social-housing meeting transcripts into actionable renovation and acquisition follow-up. The agentic platform identifies decisions, creates structured summaries and orchestrates next steps with human validation.",
    period: "Nov 2025 – Jan 2026",
    collaborators: ["Amadou Diallo"],
    highlights: [
      "Structured the workflow around business decisions, follow-up actions and human validation rather than unconstrained AI output.",
      "Selected n8n for deterministic integrations, with LangChain business agents and LangGraph for orchestration and workflow state.",
      "Designed access control, observability and execution-cost monitoring into the solution approach.",
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
      "A reusable development framework created to make AI-assisted engineering faster and more consistent. It gives Claude Code and OpenAI Codex shared, validated standards for software delivery, AI-agent creation and multi-agent orchestration.",
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
      "Co-founded GUIA to reduce manual work across Energy Performance Diagnosis (DPE) audits. The AI-powered mobile product guides property data collection and supports the generation of compliant renovation reports.",
    period: "Nov 2025 – Jul 2026",
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
      "A document-processing solution designed for teams that need AI-assisted extraction without exposing sensitive data by default. It handles text, PDFs and images locally, then detects protected information before any optional external LLM processing.",
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
