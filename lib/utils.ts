import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { IconProps } from "@radix-ui/react-icons/dist/types";
import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";

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

export type SocialMediaItems = {
  icon: React.ForwardRefExoticComponent<
    IconProps & React.RefAttributes<SVGSVGElement>
  >;
  url: string;
};



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
