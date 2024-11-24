'use client';
import { Button } from "@/components/ui/button";
import { IProject } from "@/lib/projectService";
import { getData, urls } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function Project() {
  const [projects, setProjects] = useState<IProject[]>([]);
  useEffect(() => {
    const urlEnv = process.env.NEXT_PUBLIC_URL;
    getData(urlEnv + urls.projectApi).then((data) => {
      setProjects(data.projects);
    });
    return () => {
      setProjects([]);
    };
  }, []);
  return (
    <div>
      <h1>My projects</h1>
      <Button>Click me</Button>
    </div>
  );
}
