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
            "Co-founded GUIA, an AI-powered mobile application designed to automate Energy Performance Diagnosis (DPE) audits and support the generation of compliant energy renovation reports.",
            "Designed and developed scalable cross-platform applications using React Native (Expo) and NestJS, targeting high-usage business models in the energy renovation, dating, and personal services sectors.",
            "Created an AI-powered technology using Flask, RAG, and an open-source LLM hosted on private servers to process DPE-related documentation and provide intelligent audit assistance.",
            "Designed and exposed REST API endpoints for automated DPE calculations, AI-guided information collection, intelligent property data analysis, and photo-based diagnostic assistance.",
            "Optimized image processing workflows, reducing processing time from approximately 2 minutes to 15 seconds, achieving an 87.5% reduction.",
            "Implemented intelligent photo analysis features to automatically extract and interpret property-related information, improving audit preparation speed and reducing manual input.",
            "Built complex business-driven algorithms designed to scale to millions of users, supporting high-volume usage and long-term product scalability.",
            "Translated business requirements into technical specifications, UML diagrams, and scalable software architectures, reducing ambiguity between product, technical, and business stakeholders.",
            "Actively contributed to product strategy, feature ideation, contract definition, and technology stack decisions, aligning technical delivery with business objectives.",
            "Designed and optimized cloud-native architectures focused on performance, high availability, scalability, cost efficiency, and long-term maintainability.",
            "Managed Agile/Scrum delivery, including backlog structuring, feature breakdown, prioritization, and iterative delivery coordination.",
            "Provided consulting on blockchain-oriented cloud architectures, including strategy definition, resource allocation, and decentralized infrastructure integration.",
            "Developed cluster federation management features using Remix and AdonisJS, covering orchestration, monitoring, infrastructure management, and user management to improve resilience and high availability.",
            "Contributed to strategic decision-making by providing expertise in AI, cloud-native architectures, scalable systems, and decentralized technologies."
        ],
    },
    {
        name: "BNP Paribas Asset Management",
        jobOccupation: "IT Analyst Engineer (Apprenticeship)",
        place: "Nanterre, Île-de-France, France",
        startDate: new Date(2024, 8), // September 2024
        endDate: new Date(2026, 8), // September 2026
        description: [
            "Contributed to the development of a CMDB (Configuration Management Database) built with .NET and Angular, used by more than 200 users as a reference application to support the migration of approximately 80 on-premises applications to IBM Cloud.",
            "Worked with a multidisciplinary team of .NET, Python, Angular, DevOps, and Cloud specialists to define reusable standards, cloud best practices, and technical patterns adopted across multiple development teams.",
            "Helped establish a reference architecture enabling internal teams to transition toward Cloud Developer practices and improve cloud-native application delivery.",
            "Developed scalable features for an Angular and .NET application focused on cloud resource management, improving reliability, maintainability, and operational efficiency for more than 200 users.",
            "Contributed to major technical migrations, upgrading the backend from .NET 8 to .NET 10 and the frontend from Angular 17 to Angular 20, covering 5 major technology version upgrades in total.",
            "Managed applications deployed on a Kubernetes cluster hosted on IBM Cloud, including namespace administration, deployment file maintenance, pod monitoring, service monitoring, ingress management, and releases through Azure DevOps CI/CD pipelines.",
            "Designed and implemented multi-pod processing on Kubernetes to support hundreds of simultaneous users, improving scalability, workload distribution, and application resilience.",
            "Optimized an asynchronous multithreaded processing workflow, reducing execution time from several hours to approximately 5 minutes, achieving over 95% processing time reduction.",
            "Contributed to the design of a robust Entity Management System, improving consistency, coherence, and maintainability across application models and business entities.",
            "Participated in the development of reusable NuGet packages designed for microservices architectures, covering Kafka, Secret Manager, Translation, Redis, CRUD operations, and shared technical services to standardize development practices across the organization.",
            "Ensured application stability and quality by implementing unit tests on the Angular frontend with Jasmine/Karma and the .NET backend with NUnit and xUnit, achieving approximately 80% code coverage.",
            "Created PostgreSQL scripts, including cursor-based scripts, to restore data consistency across records while respecting ACID principles.",
            "Improved database reliability and performance through table structure optimization, SQL migration scripts, and correction of existing data inconsistencies.",
            "Analyzed Excel datasets to identify inconsistencies, define remediation strategies, and support data integrity across the application.",
            "Actively contributed to Agile delivery through sprint ceremonies, technical and functional meetings, Azure DevOps backlog management, and autonomous ownership of assigned topics.",
            "Created UML diagrams to clarify functional and technical requirements and improve communication between technical and functional stakeholders.",
            "Strengthened infrastructure knowledge through Terraform fundamentals and advanced cloud technology training.",
            "Contributed to a successful cloud transformation initiative by helping deliver a reference application, reusable components, and best practices supporting the migration of 80 applications to IBM Cloud."
        ],
    },
    {
        name: "Dataventure | Groupe EDG",
        jobOccupation: "Full Stack Developer",
        place: "Levallois-Perret, Île-de-France, France",
        startDate: new Date(2023, 8), // September 2023
        endDate: new Date(2024, 8), // September 2024
        description: [
            "Developed high-traffic landing pages and client campaign applications designed to handle thousands to millions of users across multiple sectors, including automotive, food, and other business domains.",
            "Built customized client applications dedicated to lead collection, qualification, and management using Symfony, Flask, and CodeIgniter.",
            "Developed landing pages for client acquisition campaigns using CodeIgniter, ensuring fast delivery, responsive interfaces, and campaign-specific customization.",
            "Created lead management tools with Flask, including lead processing features, data manipulation workflows, and automation scripts in Python.",
            "Developed and maintained REST APIs using Node.js, PHP, and Python to support lead collection, data synchronization, and integration with external client systems.",
            "Implemented front-end features using React and Vue.js, improving user experience, campaign performance, and interface maintainability.",
            "Dockerized projects using Docker to improve deployment consistency, environment portability, and development workflow efficiency.",
            "Implemented webhooks and automation workflows with n8n to automate lead delivery, data routing, and integration with client platforms.",
            "Analyzed and integrated client API documentation to ensure reliable data exchange between internal tools and third-party systems.",
            "Configured Ubiquiti Layer 3 switches, contributing to network setup, routing configuration, and infrastructure reliability."
        ],
    },
    {
        name: "Cabinet Action",
        jobOccupation: "Software Developer",
        place: "Sarcelles, Île-de-France, France",
        startDate: new Date(2023, 0), // January 2023
        endDate: new Date(2023, 1), // February 2023
        description: [
            "Developed a .NET / C# application for managing English courses, focused on saving time for end users, managing users, and digitizing administrative documents.",
            "Designed and implemented a MySQL database to structure, store, and manage application data.",
            "Created technical and functional documentation to support project understanding, maintenance, and future improvements."
        ],
    },
    {
        name: "Cabinet Action",
        jobOccupation: "Software Engineer / Desktop Support",
        place: "Sarcelles, Île-de-France, France",
        startDate: new Date(2022, 6), // July 2022
        endDate: new Date(2022, 11), // December 2022
        description: [
            "Designed and developed an e-learning platform with a JavaScript / Bootstrap frontend and a Laravel backend, based on an MVC architecture, enabling more than 50 users to practice English online.",
            "Developed a cross-platform Android / iOS mobile application using Flutter, generating a unique loyalty card for each customer.",
            "Implemented REST APIs with Express.js and Firebase to manage data interactions between the mobile application and backend services.",
            "Set up an Active Directory environment, including user and group administration, permissions, group policies, domain controller configuration, and security auditing with Purple Knight.",
            "Configured a Squid proxy server to restrict access to adult websites, online casino platforms, and social networks.",
            "Set up a TrueNAS server to centralize and secure company data storage.",
            "Provided hardware and software support to employees, ensuring day-to-day IT continuity.",
            "Conducted a security audit of network infrastructure, systems, and applications, including the definition and implementation of a security policy.",
            "Implemented countermeasures to address identified vulnerabilities and improve the overall security posture."
        ],
    },
    {
        name: "Cabinet Action",
        jobOccupation: "Web Developer",
        place: "Sarcelles, Île-de-France, France",
        startDate: new Date(2022, 4), // May 2022
        endDate: new Date(2022, 5), // June 2022
        description: [
            "Designed and developed a professional website using WordPress, ensuring a responsive interface and easy content management.",
            "Deployed and hosted the website on OVH, including domain and hosting configuration.",
            "Improved website visibility through SEO optimization, including content structure, metadata, and performance-oriented improvements."
        ],
    },
];
