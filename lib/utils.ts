import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const urls = {
  user:"http://localhost:3000/api/user",
  logout:"http://localhost:3000/api/logout",
  article:"http://localhost:3000/api/article",
  project:"http://localhost:3000/api/project",

}

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

