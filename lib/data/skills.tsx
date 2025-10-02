import {
    FaAngular,
    FaBootstrap,
    FaCss3,
    FaDocker,
    FaGithub,
    FaHtml5,
    FaLaravel,
    FaLinux,
    FaPhp,
    FaPython,
    FaReact,
    FaSlack,
    FaSymfony,
    FaUbuntu,
    FaWindows,
    FaWordpress,
    FaAws,
} from "react-icons/fa";
import {FaJs} from "react-icons/fa";
import {TbBrandCSharp, TbBrandGolang} from "react-icons/tb";
import {
    SiAdonisjs,
    SiAnsible,
    SiApache,
    SiBurpsuite,
    SiCisco,
    SiCloudron,
    SiCodeigniter,
    SiContabo,
    SiDotnet,
    SiExpress,
    SiFlask,
    SiKubernetes,
    SiMacos,
    SiMariadb,
    SiMetasploit,
    SiMongodb,
    SiMysql,
    SiN8N,
    SiNginx,
    SiOvh,
    SiPfsense,
    SiPostgresql,
    SiRabbitmq,
    SiRedis,
    SiTailwindcss,
    SiTypescript,
    SiUbiquiti,
    SiWireshark,
    SiNestjs,
    SiGraphql,
    SiConfluence,
    SiJira,
    SiGrafana,
    SiJasmine,
    SiSelenium, SiApachekafka, SiTerraform, SiRemix
} from "react-icons/si";
import {FaDebian} from "react-icons/fa6";
import {RiNextjsFill, RiNotionFill} from "react-icons/ri";
import {VscAzure} from "react-icons/vsc";
import {AiOutlineAudit} from "react-icons/ai";
import {ReactNode} from "react";

export type SkillsItems = {
    icon: ReactNode;
    name: string;
};

export type SkillsList = {
    domain: string;
    iconsItems: SkillsItems[];
};

export const skillsItems: SkillsList[] = [
    {
        domain: "Languages",
        iconsItems: [
            {icon: <FaHtml5/>, name: "HTML"},
            {icon: <FaCss3/>, name: "CSS"},
            {icon: <FaJs/>, name: "JavaScript"},
            {icon: <SiTypescript/>, name: "TypeScript"},
            {icon: <FaPython/>, name: "Python"},
            {icon: <TbBrandCSharp/>, name: "C#"},
            {icon: <TbBrandGolang/>, name: "Go"},
            {icon: <FaPhp/>, name: "PHP"},
        ],
    },
    {
        domain: "Frameworks",
        iconsItems: [
            {icon: <FaReact/>, name: "React"},
            {icon: <FaAngular/>, name: "Angular"},
            {icon: <RiNextjsFill/>, name: "Next.js"},
            {icon: <SiDotnet/>, name: ".NET"},
            {icon: <FaSymfony/>, name: "Symfony"},
            {icon: <SiNestjs/>, name: "NestJS"},
            {icon: <SiRemix/>, name: "Remix"},
            {icon: <SiGraphql/>, name: "GraphQL"},
            {icon: <FaLaravel/>, name: "Laravel"},
            {icon: <SiCodeigniter/>, name: "CodeIgniter"},
            {icon: <SiAdonisjs/>, name: "Adonis.js"},
            {icon: <SiExpress/>, name: "Express"},
            {icon: <SiFlask/>, name: "Flask"},
            {icon: <SiTailwindcss/>, name: "Tailwind"},
            {icon: <FaBootstrap/>, name: "Bootstrap"},
        ],
    },
    {
        domain: "DevOps and Cloud",
        iconsItems: [
            {icon: <FaGithub/>, name: "GitHub"},
            {icon: <FaDocker/>, name: "Docker"},
            {icon: <SiKubernetes/>, name: "Kubernetes"},
            {icon: <SiTerraform/>, name: "Terraform"},
            {icon: <SiAnsible/>, name: "Ansible"},
            {icon: <VscAzure/>, name: "Azure"},
            {icon: <FaAws/>, name: "AWS"},
            {icon: <SiConfluence/>, name: "Confluence"},
            {icon: <SiJira/>, name: "Jira"},
            {icon: <SiGrafana/>, name: "Grafana"},
        ],
    },
    {
        domain: "Databases",
        iconsItems: [
            {icon: <SiMysql/>, name: "MySQL"},
            {icon: <SiMariadb/>, name: "MariaDB"},
            {icon: <SiPostgresql/>, name: "PostgreSQL"},
            {icon: <SiMongodb/>, name: "MongoDB"},
            {icon: <SiRedis/>, name: "Redis"},
        ],
    },

    {
        domain: "Cybersecurity",
        iconsItems: [
            {icon: <SiBurpsuite/>, name: "Burp Suite"},
            {icon: <SiMetasploit/>, name: "Metasploit"},
            {icon: <AiOutlineAudit/>, name: "Audit"},
        ],
    },
    {
        domain: "Network",
        iconsItems: [
            {icon: <SiCisco/>, name: "Cisco"},
            {icon: <SiUbiquiti/>, name: "Ubiquiti"},
            {icon: <SiPfsense/>, name: "Pfsense"},
            {icon: <SiWireshark/>, name: "Wireshark"},
        ],
    },
    {
        domain: "Systems Services",
        iconsItems: [
            {icon: <SiApache/>, name: "Apache"},
            {icon: <SiNginx/>, name: "Nginx"},
            {icon: <SiRabbitmq/>, name: "RabbitMQ"},
            {icon: <SiApachekafka/>, name: "Kafka"},
        ],
    },
    {
        domain: "OS and Distributions",
        iconsItems: [
            {icon: <FaLinux/>, name: "Linux"},
            {icon: <FaWindows/>, name: "Windows"},
            {icon: <SiMacos/>, name: "MacOS"},
            {icon: <FaDebian/>, name: "Debian"},
            {icon: <FaUbuntu/>, name: "Ubuntu"},
        ],
    },
    {
        domain: "Tools and Others",
        iconsItems: [
            {icon: <SiN8N/>, name: "N8N"},
            {icon: <SiSelenium/>, name: "Selenium"},
            {icon: <SiJasmine/>, name: "Jasmine"},
            {icon: <SiCloudron/>, name: "Cloudron"},
            {icon: <FaWordpress/>, name: "WordPress"},
            {icon: <SiOvh/>, name: "OVH"},
            {icon: <SiContabo/>, name: "Contabo"},
            {icon: <RiNotionFill/>, name: "Notion"},
            {icon: <FaSlack/>, name: "Slack"},
        ],
    },
];
