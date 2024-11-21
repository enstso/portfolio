import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const urls = {
  user:"http://localhost:3000/api/user",
  article:"http://localhost:3000/api/article",
  project:"http://localhost:3000/api/project",
  category:"http://localhost:3000/api/category"

}

export type NavItems = {
  title:string;
  href:string
}

export const componentsAdminRoutes: NavItems[] = [
  {
    title: "Projects",
    href: "/projects",
  },
  {
    title: "Articles",
    href: "/articles",
  },
  
];

export const componentsRoutes:NavItems[] = [
    {
      title: "Homepage",
      href: "/homepage",
    },
    {
      title: "Blog",
      href: "/blog",
    },
    {
      title: "Resume",
      href:"/resume"
    }
];

export async function getData(url: string) {
  return fetch(url, {
    method: "GET", headers: {
      "Content-Type": "application/json",
    }
  },
  ).then((res) => res.json())
}

export async function postData(url: string, data: any, options?: RequestInit) {
  return fetch(url, {
    ...options,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(data),
  }).then((res) => res.json())
}


export async function postDataV2(url: string, data: any, options?: RequestInit) {
  return fetch(url, {
    ...options,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(data),
  })
}

