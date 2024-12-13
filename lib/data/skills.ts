import {
    FaAngular,
    FaBootstrap,
    FaCss3,
    FaDocker,
    FaFlask,
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
  } from "react-icons/fa";
  import { FaJs } from "react-icons/fa";
  import { IconType } from "react-icons/lib";
  import { TbBrandCSharp, TbSql } from "react-icons/tb";
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
  } from "react-icons/si";
  import { FaDebian } from "react-icons/fa6";
  import {

    RiNextjsFill,
    RiNotionFill,
  } from "react-icons/ri";
  import { VscAzure } from "react-icons/vsc";
  import { AiOutlineAudit, AiOutlineBorderOuter } from "react-icons/ai";

export type SkillsItems = {
    icon: IconType;
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
        {
          icon: FaHtml5,
          name: "Html",
        },
        {
          icon: FaCss3,
          name: "Css",
        },
        {
          icon: FaJs,
          name: "JavaScript",
        },
        {
          icon: SiTypescript,
          name: "TypeScript",
        },
        {
          icon: FaPython,
          name: "Python",
        },
        {
          icon: TbBrandCSharp,
          name: "C#",
        },
        {
          icon: FaPhp,
          name: "PHP",
        },
      ],
    },
    {
      domain: "Frameworks",
      iconsItems: [
        {
          icon: FaReact,
          name: "React",
        },
        {
          icon: FaAngular,
          name: "Angular",
        },
        {
          icon: RiNextjsFill,
          name: "Nextjs",
        },
        {
          icon: SiDotnet,
          name: ".NET",
        },
        {
          icon: FaSymfony,
          name: "Symfony",
        },
        {
          icon: FaLaravel,
          name: "Laravel",
        },
        {
          icon: SiCodeigniter,
          name: "CodeIgniter",
        },
        {
          icon: SiAdonisjs,
          name: "Adonis",
        },
        {
          icon: SiExpress,
          name: "Express",
        },
        {
          icon: FaFlask,
          name: "Flask",
        },
        {
          icon: SiTailwindcss,
          name: "TailwindCss",
        },
        {
          icon: FaBootstrap,
          name: "Bootstrap",
        },
      ],
    },
    {
      domain: "Databases",
      iconsItems: [
        {
          icon: SiMysql,
          name: "MySql",
        },
        {
          icon: SiMariadb,
          name: "Mariadb",
        },
        {
          icon: SiPostgresql,
          name: "PostgresSql",
        },
        {
          icon: SiMongodb,
          name: "Mongodb",
        },
        {
          icon: SiRedis,
          name: "Redis",
        },
      ],
    },
    {
      domain: "DevOps",
      iconsItems: [
        {
          icon: FaGithub,
          name: "Github",
        },
        {
          icon: FaDocker,
          name: "Docker",
        },
        {
          icon: SiKubernetes,
          name: "Kubernetes",
        },
        {
          icon: SiAnsible,
          name: "Ansible",
        },
        {
          icon: VscAzure,
          name: "Azure",
        },
      ],
    },
    {
      domain: "Cybersecurity",
      iconsItems: [
        {
          icon: SiBurpsuite,
          name: "Burpsuite",
        },
        {
          icon: SiMetasploit,
          name:"Metasploit"
        },
        {
          icon:AiOutlineAudit,
          name:"Audit"
        }
      ],
    },
    {
      domain: "Network",
      iconsItems: [
        {
          icon: SiCisco,
          name: "Cisco",
        },
        {
          icon: SiUbiquiti,
          name: "Ubiquiti",
        },
        {
          icon: SiPfsense,
          name: "Pfsense",
        },
      ],
    },
    {
      domain: "System Services",
      iconsItems: [
        {
          icon: SiApache,
          name: "Apache",
        },
        {
          icon: SiNginx,
          name: "Nginx",
        },
        {
          icon: SiRabbitmq,
          name: "Rabbitmq",
        },
      ],
    },
    {
      domain: "OS and Distributions",
      iconsItems: [
        {
          icon: FaLinux,
          name: "Linux",
        },
        {
          icon: FaWindows,
          name: "Windows",
        },
        {
          icon: SiMacos,
          name: "MacOS",
        },
        {
          icon: FaDebian,
          name: "Debian",
        },
        {
          icon: FaUbuntu,
          name: "Ubuntu",
        },
      ],
    },
    {
      domain: "Tools and Others",
      iconsItems: [
        {
          icon: SiN8N,
          name: "N8N",
        },
        {
          icon: SiCloudron,
          name: "Cloudron",
        },
        {
          icon: FaWordpress,
          name: "Wordpress",
        },
        {
          icon: SiOvh,
          name: "OVH",
        },
        {
          icon: SiContabo,
          name: "Contabo",
        },
        {
          icon: RiNotionFill,
          name: "Notion",
        },
        {
          icon: FaSlack,
          name: "Slack",
        },
      ],
    },
    
  ];

