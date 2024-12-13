import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { IconProps } from "@radix-ui/react-icons/dist/types";
import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import { icons } from "lucide-react";
import {
  FaAngular,
  FaBootstrap,
  FaCss3,
  FaDocker,
  FaFlask,
  FaGithub,
  FaHtml5,
  FaLaravel,
  FaPhp,
  FaPython,
  FaReact,
  FaSymfony,
} from "react-icons/fa";
import { FaJs } from "react-icons/fa";
import { IconType } from "react-icons/lib";
import { TbBrandCSharp, TbSql } from "react-icons/tb";
import {
  SiAdonisjs,
  SiCodeigniter,
  SiDotnet,
  SiExpress,
  SiKubernetes,
  SiMariadb,
  SiMongodb,
  SiMysql,
  SiPostgresql,
  SiRedis,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import { RiNextjsFill } from "react-icons/ri";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const urls = {
  userApi: "api/user",
  articleApi: "api/article",
  projectApi: "api/project",
  categoryApi: "api/category",
  user: "user/",
  article: "article/",
  project: "project/",
  blog: "blog/",
};

export type NavItems = {
  title: string;
  href: string;
};

export type SkillsItems = {
  icon: IconType;
  name: string;
};

export type SkillsList = {
  domain: string;
  iconsItems: SkillsItems[];
};

export type SocialMediaItems = {
  icon: React.ForwardRefExoticComponent<
    IconProps & React.RefAttributes<SVGSVGElement>
  >;
  url: string;
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
        name:"Mariadb"
      },
      {
        icon:SiPostgresql,
        name:"PostgresSql"
      },
      {
        icon:SiMongodb,
        name:"Mongodb"
      },
      {
        icon:SiRedis,
        name:"Redis"
      }
    ],
  },
  {
    domain:"Tools and Plateforms",
    iconsItems:[
      {
        icon:FaGithub,
        name:"Github"
      },
      {
        icon:FaDocker,
        name:"Docker"
      },
      {
        icon:SiKubernetes,
        name:"Kubernetes"
      },
      
    ]
  }
];

export const socialMediaLink: SocialMediaItems[] = [
  {
    icon: GitHubLogoIcon,
    url: "https://github.com/Enstso/",
  },
  {
    icon: LinkedInLogoIcon,
    url: "https://www.linkedin.com/in/enstso-j-1a274724a/",
  },
];

export const componentsAdminRoutes: NavItems[] = [
  {
    title: "Admin",
    href: "/admin",
  },
];

export const componentsRoutes: NavItems[] = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Projects",
    href: "/project",
  },
  {
    title: "Blog",
    href: "/blog",
  },
];

export async function getData(url: string) {
  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
}

export async function postData(url: string, data: any, options?: RequestInit) {
  return fetch(url, {
    ...options,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(data),
  }).then((res) => res.json());
}

export async function postDataV2(
  url: string,
  data: any,
  options?: RequestInit
) {
  return fetch(url, {
    ...options,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(data),
  });
}
