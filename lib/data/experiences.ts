export type ExperienceItem = {
  name: string;
  jobOccupation: string;
  place: string;
  startDate: string;
  endDate: string | "present";
  employment?: string;
  displayDate?: string;
  description: string[];
};

export const ExperiencesList: ExperienceItem[] = [
  {
    name: "Salesforce",
    jobOccupation: "AI Builder (Emerging Talent)",
    employment: "Full-time",
    place: "Paris, France",
    startDate: "2026-11-01",
    endDate: "present",
    displayDate: "Nov 2026 – Present",
    description: [
      "Customer-facing AI Builder role combining discovery, business problem framing, technical solution design and hands-on implementation.",
      "Work with customer teams to understand business challenges, structure requirements and translate them into practical technical solutions.",
      "Design, build, deploy and iterate on AI-powered solutions using Salesforce technologies, including Agentforce.",
      "Bridge stakeholder needs, product decisions and technical execution through clear communication and collaborative delivery.",
      "Contribute to production-oriented AI implementations and continuous improvement in cross-functional teams.",
    ],
  },
  {
    name: "BNP Paribas Asset Management",
    jobOccupation: "IT Analyst Engineer",
    employment: "Apprenticeship",
    place: "Nanterre, Île-de-France, France · Hybrid",
    startDate: "2024-09-01",
    endDate: "2026-09-01",
    displayDate: "Sep 2024 – Sep 2026",
    description: [
      "Contributed to a strategic cloud transformation initiative supporting the migration of more than 100 on-premises applications to IBM Cloud through the development of a CMDB reference application built with .NET and Angular.",
      "Translated business and functional requirements into scalable features for a cloud resource management platform using .NET, Angular, PostgreSQL and Azure DevOps.",
      "Managed applications deployed on Kubernetes clusters hosted on IBM Cloud, including namespace administration, deployment file maintenance, pod/service monitoring, ingress management and CI/CD releases.",
      "Contributed to major technical migrations, including .NET 8 to .NET 10 and Angular 17 to Angular 20, improving maintainability and long-term scalability.",
      "Designed multi-pod processing on Kubernetes to support hundreds of simultaneous users and improve workload distribution.",
      "Optimized an asynchronous multithreaded workflow, reducing execution time from several hours to approximately 5 minutes, achieving over 95% processing time reduction.",
      "Contributed to the design of a robust Entity Management System, improving consistency and maintainability across application models.",
      "Participated in reusable NuGet packages for microservices architectures, covering Kafka, Secret Manager, Translation, Redis, CRUD and shared services.",
      "Improved application quality with unit tests using Jasmine/Karma, NUnit and xUnit, achieving approximately 80% code coverage.",
      "Created PostgreSQL scripts and SQL migrations to improve data consistency, reliability and performance.",
      "Worked with .NET, Python, Angular, DevOps and Cloud specialists to define reusable standards, cloud best practices and technical patterns for multiple development teams.",
      "Contributed to business requirements analysis and Agile/Scrum delivery through technical and functional meetings, sprint ceremonies, Azure DevOps backlog management, UML diagrams and autonomous topic ownership.",
      "Helped establish a reference architecture supporting internal teams in their transition toward Cloud Developer practices.",
    ],
  },
  {
    name: "Dataventure | EDG Group",
    jobOccupation: "Full Stack Developer",
    employment: "Apprenticeship",
    place: "Boulogne-Billancourt, Île-de-France, France · Hybrid",
    startDate: "2023-09-01",
    endDate: "2024-09-01",
    displayDate: "Sep 2023 – Sep 2024",
    description: [
      "Contributed to the development of high-traffic landing pages and lead generation applications designed for client acquisition campaigns across multiple sectors, including automotive, food, and other business domains.",
      "Developed campaign-specific landing pages and client applications designed to handle thousands to millions of users, with a focus on performance, responsiveness and conversion.",
      "Built customized lead collection, qualification and management tools using Symfony, Flask and CodeIgniter.",
      "Created lead processing features, data manipulation workflows and automation scripts using Python and Flask.",
      "Developed and maintained REST APIs using Node.js, PHP and Python to support lead collection, data synchronization and integrations with external client systems.",
      "Implemented front-end features using React and Vue.js, improving user experience, campaign workflows and interface maintainability.",
      "Dockerized projects with Docker to improve deployment consistency, environment portability and development workflow efficiency.",
      "Implemented webhooks and automation workflows with n8n to automate lead delivery, data routing and client platform integrations.",
      "Analyzed and integrated client API documentation to ensure reliable data exchange between internal tools and third-party platforms.",
      "Configured Ubiquiti Layer 3 switches, contributing to network setup, routing configuration and infrastructure reliability.",
    ],
  },
  {
    name: "Cabinet Action",
    jobOccupation: "Software Engineer / Desktop Support",
    employment: "Internship",
    place: "Sarcelles, Île-de-France, France · On-site",
    startDate: "2023-01-01",
    endDate: "2023-03-01",
    displayDate: "Jan 2023 – Mar 2023",
    description: [
      "Developed a .NET/C# application for managing English courses, users and digital documents, helping streamline administrative processes.",
      "Designed and implemented the application's MySQL database and documented the solution.",
      "Contributed to a cross-platform mobile application using Flutter, with Express and Firebase APIs for customer loyalty-card management.",
      "Worked on internal IT infrastructure, including Active Directory user/group administration, permissions and Group Policies.",
      "Contributed to the deployment and administration of Squid proxy and TrueNAS services.",
      "Participated in security assessments of systems, network infrastructure and applications, and helped implement remediation measures.",
    ],
  },
];
