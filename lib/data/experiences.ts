export type ExperienceItem = {
  name: string;
  jobOccupation: string;
  place: string;
  startDate: string;
  endDate: string | "present";
  description: string[];
};

export const ExperiencesList: ExperienceItem[] = [
  {
    name: "BNP Paribas Asset Management",
    jobOccupation: "IT Analyst Engineer (Apprenticeship)",
    place: "Nanterre, Île-de-France, France",
    startDate: "2024-09-01",
    endDate: "2026-09-01",
    description: [
      "Contributed to a .NET and Angular CMDB used by 200+ users and supporting the cloud transformation of approximately 80 applications.",
      "Delivered major upgrades from .NET 8 to .NET 10 and Angular 17 to Angular 20 while improving reusable engineering standards.",
      "Managed Kubernetes workloads on IBM Cloud through Azure DevOps CI/CD, including multi-pod and distributed-processing concerns.",
      "Reduced an asynchronous processing workflow from several hours to approximately five minutes—more than 95% faster.",
      "Improved PostgreSQL data quality and consistency through validation, remediation scripts and schema/data analysis.",
      "Contributed reusable Kafka, Redis and shared .NET components for microservice-oriented teams.",
      "Implemented Angular and .NET automated tests at approximately 80% coverage while supporting UML, Agile and technical-functional collaboration.",
    ],
  },
  {
    name: "Freelance / GUIA",
    jobOccupation: "IT Engineer & Analyst",
    place: "Remote",
    startDate: "2025-01-01",
    endDate: "present",
    description: [
      "Co-founded GUIA, an AI-powered mobile platform supporting DPE and energy-renovation audit workflows.",
      "Built product capabilities across React Native Expo, NestJS, Flask and REST APIs.",
      "Applied LLM, RAG, OCR, document processing and property-data collection to guided audit workflows.",
      "Reduced an image-processing workflow from approximately two minutes to 15 seconds—an 87.5% reduction.",
      "Translated business needs into specifications, UML, system architecture and an actionable delivery backlog.",
      "Balanced scalability, reliability, security, cost and user-experience trade-offs throughout product engineering.",
    ],
  },
  {
    name: "Dataventure | Groupe EDG",
    jobOccupation: "Full Stack Developer",
    place: "Levallois-Perret, Île-de-France, France",
    startDate: "2023-09-01",
    endDate: "2024-09-01",
    description: [
      "Developed high-traffic campaign applications and landing pages across multiple client sectors.",
      "Built campaign and lead-management applications with Symfony, Flask and CodeIgniter.",
      "Developed APIs and integrations in Node.js, PHP and Python, with React and Vue interfaces.",
      "Dockerized applications to improve environment consistency and deployment workflows.",
      "Automated lead delivery and external API integrations through n8n workflows and webhooks.",
    ],
  },
  {
    name: "Cabinet Action",
    jobOccupation: "Software & IT Engineering",
    place: "Sarcelles, Île-de-France, France",
    startDate: "2022-05-01",
    endDate: "2023-02-01",
    description: [
      "Developed a .NET/C# business application for course administration, user management and document digitization.",
      "Delivered web and mobile applications with Laravel, JavaScript, Flutter and supporting APIs.",
      "Configured Active Directory and provided systems support for day-to-day operations.",
      "Applied foundational security and infrastructure practices across systems, networks and application delivery.",
    ],
  },
];
