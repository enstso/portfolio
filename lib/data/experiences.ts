export type ExperienceItems = {
    name: string;
    jobOccupation: string;
    place: string;
    startDate: Date;
    endDate: Date | string;
    description: string[]; 
};

export const ExperiencesList: ExperienceItems[] = [
    {
        name: "BNP Paribas Asset Management",
        jobOccupation: "Software Engineer",
        place: "Nanterre, Île-de-France, France",
        startDate: new Date(2024, 9),
        endDate: "present", 
        description: ["soon available"]
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
            "Ubiquiti layer three switch configuration"
        ]
    },
    {
        name: "Cabinet Action",
        jobOccupation: "Software Developer",
        place: "Sarcelles, Île-de-France, France",
        startDate: new Date(2023, 1),
        endDate: new Date(2024, 2),
        description: [
            "Development of a .NET, C# application for managing English courses, aimed at saving time for end users, user management, and document digitization. Implementation of a MYSQL database.",
            "Documented the project."
        ]
    },
    {
        name: "Cabinet Action",
        jobOccupation: "Software Engineer / Desktop Support",
        place: "Sarcelles, Île-de-France, France",
        startDate: new Date(2022, 7),
        endDate: new Date(2024, 12),
        description: [
            "Developed and designed an E-learning front-end (JavaScript, Bootstrap) and back-end (Laravel) with an MVC architecture allowing more than 50 customers to practice English.",
            "Developed a cross-platform Android/IOS mobile application (Flutter) to generate a unique loyalty card for each customer and implemented API with Express and Firebase to interact with the data.",
            "Setting up an Active Directory including user and group administration, permissions, group policies, domain controller configuration, and audit with Purple Knight.",
            "Setting up a proxy server (Squid) to block adult, online casino websites and social networks.",
            "Setting up a Nas server (True Nas) to store company data.",
            "Assistance and technical support (hardware and software) for employees."
        ]
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
            "SEO optimization."
        ]
    }
];
