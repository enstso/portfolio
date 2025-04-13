"use client";

import Projects from "@/components/projects/project";
import { Button } from "@/components/ui/button";
import { getAllProjectFromGithub, IProject } from "@/lib/projectService";
import { getData, urls } from "@/lib/utils";
import { useEffect, useState, useCallback, useMemo } from "react";

export default function Project() {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [sortOption, setSortOption] = useState("date-desc");
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      const res = await getData(urls.projectApi);
      if (res && Array.isArray(res.projects)) {
        return res.projects;
      }
      console.error("Invalid response format", res);
      return []; // Return an empty array if the format is invalid
    } catch (error) {
      console.error("Error fetching projects:", error);
      return [];
    }
  };
  

  useEffect(() => {
    const initializeProjects = async () => {
      setLoading(true);
      const projectsData = await fetchProjects();
      setProjects(projectsData);
      setLoading(false);
    };
    initializeProjects();
  }, []);

  const filteredProjects = useMemo(() => {
    if (!Array.isArray(projects)) {
      return []; // If projects is not an array, return an empty array
    }
  
    return projects.sort((a, b) => {
      if (sortOption === "date-asc") {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      } else if (sortOption === "date-desc") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else if (sortOption === "name-asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
  }, [projects, sortOption]);

  const indexOfFirstItem = useMemo(() => (currentPage - 1) * itemsPerPage, [currentPage, itemsPerPage]);
  const indexOfLastItem = useMemo(() => currentPage * itemsPerPage, [currentPage, itemsPerPage]);

  const currentProjects = filteredProjects.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="min-h-screen text-neutral-900 dark:text-neutral-100">
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-extrabold text-center mb-8 transition-all duration-300 ease-in-out transform hover:text-neutral-500 dark:hover:text-neutral-300 cursor-pointer hover:scale-105">Projects</h1>
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="px-4 py-2 border rounded-md"
          >
            <option value="date-desc">Sort by Date (Newest)</option>
            <option value="date-asc">Sort by Date (Oldest)</option>
            <option value="name-asc">Sort by Name (A-Z)</option>
            <option value="name-desc">Sort by Name (Z-A)</option>
          </select>
        </div>

        {loading ? (
          <div>Loading...</div>
        ) : currentProjects.length === 0 ? (
          <p className="text-center text-gray-500">No projects found.</p>
        ) : (
          <Projects items={currentProjects} />
        )}

        <div className="flex justify-center items-center mt-6 gap-4">
          <Button
            aria-label="Previous Page"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span>Page {currentPage} of {Math.ceil(filteredProjects.length / itemsPerPage)}</span>
          <Button
            aria-label="Next Page"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(filteredProjects.length / itemsPerPage)))}
            disabled={currentPage === Math.ceil(filteredProjects.length / itemsPerPage)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
