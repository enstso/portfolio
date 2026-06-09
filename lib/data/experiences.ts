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
            "Designed and developed scalable cross-platform applications using React Native (Expo) and NestJS, primarily for the dating and personal services industries.",
            "Analyzed client requirements and translated business needs into technical specifications, UML diagrams, and robust software architectures.",
            "Actively contributed to product strategy, feature ideation, contract definition, and advisory on technology stack and infrastructure decisions.",
            "Designed, deployed, and optimized cloud-native architectures focused on performance, reliability, high availability, scalability, and cost efficiency.",
            "Developed an AI-powered solution for the energy renovation sector in France.",
            "Co-founded GuIA, a mobile application enabling fully automated Energy Performance Diagnosis (DPE) audits.",
            "Leveraged artificial intelligence to analyze property data, generate compliant energy audits, and automate renovation workflows from diagnosis to recommendations.",
            "Implemented complex business-driven algorithms designed to scale to millions of users while maintaining performance and reliability.",
            "Managed projects using Agile/Scrum methodologies, including backlog structuring, feature breakdown, sprint planning, and iterative delivery.",
            "Performed cost analysis and long-term scalability planning, aligning technical decisions with business objectives and growth strategies.",
            "Provided consulting on blockchain-oriented cloud architectures, including strategy definition, resource allocation, and decentralized infrastructure integration.",
            "Developed cluster federation management features using Remix and Adonis, covering orchestration, monitoring, infrastructure management, and user administration to ensure resilience and high availability.",
            "Supported strategic decision-making by providing expertise in cloud-native ecosystems, artificial intelligence, distributed systems, and decentralized technologies."
        ],
    },
    {
        name: "BNP Paribas Asset Management",
        jobOccupation: "IT Analyst Engineer (Apprenticeship)",
        place: "Nanterre, Île-de-France, France",
        startDate: new Date(2024, 8), // September 2024
        endDate: new Date(2026, 8),
        description: [
            "Contributed to the development of a CMDB (Configuration Management Database) built with .NET and Angular, serving as a reference application for the migration of approximately 80 on-premises applications to IBM Cloud.",
            "Collaborated within a multidisciplinary team of .NET, Angular, Python, DevOps, and Cloud engineers to define development standards, cloud best practices, and reusable technical patterns.",
            "Developed scalable features for an Angular and .NET application focused on cloud resource management, improving reliability, maintainability, and operational efficiency.",
            "Contributed to major technology migrations, including upgrades from .NET 8 to .NET 10 and Angular 17 to Angular 20, ensuring compatibility and long-term maintainability.",
            "Managed applications deployed on IBM Cloud Kubernetes clusters, including namespace administration, deployment configuration, monitoring, and releases through Azure DevOps CI/CD pipelines.",
            "Designed and implemented multi-pod Kubernetes processing architectures supporting hundreds of concurrent users, improving scalability, resilience, and workload distribution.",
            "Optimized asynchronous multithreaded processing workflows, reducing execution times from several hours to approximately 5 minutes.",
            "Contributed to the design and implementation of a robust Entity Management System, ensuring consistency and maintainability across application models and business entities.",
            "Participated in the development of reusable NuGet packages covering Kafka integration, Secret Management, Redis, Translation services, CRUD utilities, and shared technical services.",
            "Implemented unit and integration tests using Jasmine/Karma, NUnit, and xUnit, achieving approximately 80% code coverage and reducing regression risks.",
            "Created PostgreSQL scripts, including cursor-based data correction scripts, to restore data consistency while ensuring compliance with ACID principles.",
            "Improved database performance through schema optimization, migration scripts, and resolution of data integrity issues.",
            "Analyzed Excel datasets to identify inconsistencies, define remediation strategies, and improve overall data quality.",
            "Actively contributed to Agile delivery processes through sprint ceremonies, technical workshops, backlog management, and autonomous ownership of assigned topics.",
            "Created UML diagrams to facilitate communication and alignment between technical and functional stakeholders.",
            "Developed foundational Terraform skills and strengthened cloud expertise through advanced cloud technology training.",
            "Contributed to the organization's cloud transformation initiative by delivering reusable components, reference architectures, and best practices adopted across development teams."
        ],
    },
    {
        name: "Dataventure | Groupe EDG",
        jobOccupation: "Full Stack Developer",
        place: "Boulogne-Billancourt, Île-de-France, France",
        startDate: new Date(2023, 8), // September 2023
        endDate: new Date(2024, 8),   // September 2024
        description: [
            "Developed high-traffic landing pages and campaign applications designed to handle thousands to millions of users across multiple sectors, including automotive, food, and consumer services.",
            "Built customized lead collection, qualification, and management platforms using Symfony, Flask, and CodeIgniter.",
            "Developed landing pages for acquisition campaigns, ensuring responsive user experiences, rapid delivery, and campaign-specific customization.",
            "Created lead management tools and automation workflows with Flask and Python, including lead processing, data transformation, and business-specific automation scripts.",
            "Designed, developed, and maintained APIs using Node.js, PHP, and Python to support lead collection, data synchronization, and integrations with third-party client systems.",
            "Implemented front-end features using React and Vue.js, improving user experience, campaign performance, and maintainability.",
            "Dockerized applications and development environments, improving deployment consistency, portability, and development workflow efficiency.",
            "Implemented webhooks and automation workflows using n8n to automate lead delivery, data routing, and integrations with external platforms.",
            "Analyzed and integrated third-party API documentation to ensure reliable and secure data exchange between internal tools and client systems.",
            "Configured and maintained Ubiquiti Layer 3 network equipment, contributing to routing configuration, infrastructure reliability, and network performance."
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
