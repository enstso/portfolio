"use client";
import Projects from "@/components/projects/project";
import { Button } from "@/components/ui/button";
import { IProject } from "@/lib/projectService";
import { getData, urls } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function Project() {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [categories, setCategories] =  useState<string[]>([]);
  useEffect(() => {
    const urlEnv = process.env.NEXT_PUBLIC_URL;
    getData(urlEnv + urls.categoryApi).then((data)=>{
      setCategories(data.data)
    }); 
    getData(urlEnv + urls.projectApi).then((data) => {
      setProjects(data.projects);
    })
    return () => {
      setProjects([]);
      setCategories([]);
    };
  }, []);
  return (
    <div className="min-h-screen text-neutral-900 dark:text-neutral-100">
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-extrabold text-center mb-8 transition-all duration-300 ease-in-out transform hover:text-neutral-500 dark:hover:text-neutral-300 cursor-pointer hover:scale-105">Projects</h1>
        <Projects items={projects}></Projects>
      </div>
    </div>
  );
}
