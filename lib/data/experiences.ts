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
            "Development of cross-platform applications using React Native (Expo) and NestJS, in the dating and personal services sectors (ongoing projects).",
            "Requirement analysis with clients: translation of business needs into technical specifications and UML diagrams, ensuring alignment and clarity for both stakeholders and development teams.",
            "Feature ideation and validation, including active participation in contract drafting and advising clients on infrastructure strategy and technology choices.",
            "Cloud architecture design and deployment of scalable infrastructures with hosted services, focused on performance, reliability, and cost optimization.",
            "Implementation of complex algorithms adapted to business logic, ensuring scalability to handle millions of users.",
            "Agile/Scrum project management: backlog structuring, task breakdown, and coordination with teams for iterative delivery.",
            "Cost analysis and long-term scalability strategies, aligning technical solutions with business goals.",
            "Consulting on blockchain-oriented cloud architectures: definition of strategies, resource allocation, and integration of blockchain into scalable cloud infrastructures.",
            "Development of cluster federation management features (Remix & Adonis), with orchestration, monitoring, and infrastructure/user management tools to guarantee high availability and resilience.",
            "Active involvement in strategic decision-making, providing expertise on cloud-native ecosystems and decentralized technologies.",
        ],
    },
    {
        name: "BNP Paribas Asset Management",
        jobOccupation: "IT Analyst Engineer (Apprenticeship)", // Updated title
        place: "Nanterre, Île-de-France, France",
        startDate: new Date(2024, 8), // September 2024
        endDate: "present",
        description: [
            "Development of an Angular and .NET application, ensuring the implementation of scalable and efficient features to enhance cloud resource management and guarantee application reliability.",
            "Implementation of unit tests on both the Angular frontend (using Jasmine/Karma) and the .NET backend (with NUnit), significantly improving stability and reducing regressions.",
            "Set up a PostgreSQL script using a cursor to restore coherence across records, ensuring data consistency and compliance with ACID principles.",
            "Data analysis from Excel files to detect inconsistencies and define a structured fix strategy, ensuring data integrity.",
            "Optimization of database structures by improving table design and implementing migration scripts to correct existing data issues, ultimately enhancing query performance and system reliability.",
            "Creation of UML diagrams to facilitate the understanding of features, as well as active involvement in decision-making processes through requirement analysis and validation.", // Added
            "Management of a K8S cluster by adapting strategies according to workload needs and server specifications, ensuring optimal scalability, availability, and performance.", // Added
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
