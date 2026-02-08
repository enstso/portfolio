export type ExperienceItem = {
    name: string;
    jobOccupation: string;
    place: string;
    startDate: Date;
    endDate: Date | string;
    description: string[];
};

export const ExperiencesList: ExperienceItem[] = [
    {
        name: "Freelance",
        jobOccupation: "IT Analyst Engineer",
        place: "Remote",
        startDate: new Date(2025, 0), // January 2025
        endDate: "present",
        description: [
      "Design and development of scalable cross-platform applications using React Native (Expo) and NestJS, mainly in the dating and personal services industries.",
      "Client requirement analysis: translation of business needs into technical specifications, UML diagrams, and robust software architectures.",
      "Active involvement in product strategy: feature ideation, contract definition, and advisory on technology stack and infrastructure decisions.",
      "Design, deployment, and optimization of cloud-native architectures focused on performance, reliability, high availability, and cost efficiency.",
      "Development of an AI-powered solution for the energy renovation sector in France.",
      "Founder and creator of RenovAI, a mobile application enabling fully automated Energy Performance Diagnosis (DPE) audits.",
      "Use of AI to analyze property data, generate compliant energy audits, and automate renovation workflows from diagnosis to recommendations.",
      "Implementation of complex business-driven algorithms designed to scale to millions of users.",
      "Agile/Scrum project management: backlog structuring, feature breakdown, and iterative delivery coordination.",
      "Cost analysis and long-term scalability planning, aligning technical choices with business objectives.",
      "Consulting on blockchain-oriented cloud architectures: strategy definition, resource allocation, and decentralized infrastructure integration.",
      "Development of cluster federation management features (Remix & Adonis): orchestration, monitoring, and infrastructure/user management to ensure high availability and resilience.",
      "Strong contribution to strategic decision-making, providing expertise in cloud-native ecosystems, AI, and decentralized technologies.",
    ],
    },
    {
        name: "BNP Paribas Asset Management",
        jobOccupation: "IT Analyst Engineer (Apprenticeship)", // Updated title
        place: "Nanterre, Île-de-France, France",
        startDate: new Date(2024, 8), // September 2024
        endDate: "present",
        description: [
           "Development of an Angular and .NET application, delivering scalable and efficient features to improve cloud resource management and ensure application reliability.",
      "Design and implementation of unit tests on both the Angular frontend (Jasmine/Karma) and the .NET backend (NUnit), achieving ~80% code coverage and reducing regressions.",
      "Active participation in technical and functional meetings, supporting discussions and decision-making within scope.",
      "Agile way of working: involvement in sprint ceremonies and continuous delivery processes.",
      "Project management using Azure DevOps: creation and management of epics, features, user stories, and tasks, plus progress tracking and prioritization.",
      "Autonomous ownership of specific topics: milestone definition, execution planning, and alignment with project objectives.",
      "Creation of PostgreSQL scripts using cursors to restore data coherence across records, ensuring consistency and compliance with ACID principles.",
      "Database structure optimization: improved table design and migration scripts to fix existing data issues and improve query performance and reliability.",
      "Data analysis from Excel files to detect inconsistencies and define structured remediation strategies, ensuring data integrity.",
      "Creation of UML diagrams to facilitate feature understanding and communication between technical and functional stakeholders.",
      "Kubernetes (K8S) cluster management: deployment strategy adaptations based on workloads and server specs to ensure scalability, availability, and performance.",
      "Learning Terraform fundamentals to support infrastructure-related technical topics.",
      "Advanced training in cloud technologies.",
        ],
    },
    {
        name: "Dataventure | Groupe EDG",
        jobOccupation: "Full Stack Developer",
        place: "Boulogne-Billancourt, Île-de-France, France",
        startDate: new Date(2023, 9),
        endDate: new Date(2024, 9),
        description: [
            "Development of landing pages for client campaigns across various sectors (automotive, food, etc.) using CodeIgniter.",
            "Creation of lead management tools in Symfony, development of lead manipulation scripts in Python, as well as APIs in Node.js and PHP.",
            "Front-end development using React and Vue.js.",
            "Project dockerization, implementation of webhooks for data delivery automation with N8N, and understanding of client API documentation.",
            "Ubiquiti layer three switch configuration",
        ],
    },
    {
        name: "Cabinet Action",
        jobOccupation: "Software Developer",
        place: "Sarcelles, Île-de-France, France",
        startDate: new Date(2023, 1),
        endDate: new Date(2024, 2),
        description: [
            "Development of a .NET, C# application for managing English courses, aimed at saving time for end users, user management, and document digitization. Implementation of a MYSQL database.",
            "Documented the project.",
        ],
    },
    {
        name: "Cabinet Action",
        jobOccupation: "Software Engineer / Desktop Support",
        place: "Sarcelles, Île-de-France, France",
        startDate: new Date(2022, 7),
        endDate: new Date(2022, 12),
        description: [
            "Developed and designed an E-learning front-end (JavaScript, Bootstrap) and back-end (Laravel) with an MVC architecture allowing more than 50 customers to practice English.",
            "Developed a cross-platform Android/IOS mobile application (Flutter) to generate a unique loyalty card for each customer and implemented API with Express and Firebase to interact with the data.",
            "Setting up an Active Directory including user and group administration, permissions, group policies, domain controller configuration, and audit with Purple Knight.",
            "Setting up a proxy server (Squid) to block adult, online casino websites and social networks.",
            "Setting up a Nas server (True Nas) to store company data.",
            "Assistance and technical support (hardware and software) for employees.",
        ],
    },
    {
        name: "Cabinet Action",
        jobOccupation: "Web Developer",
        place: "Sarcelles, Île-de-France, France",
        startDate: new Date(2022, 5),
        endDate: new Date(2022, 6),
        description: [
            "Developed and designed a website in WordPress.",
            "Hosting on OVH.",
            "SEO optimization.",
        ],
    },
];
