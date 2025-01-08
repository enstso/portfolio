import { useState } from "react";
import { IProject } from "@/lib/projectService";
import { cn } from "@/lib/utils";

interface ProjectProps {
  items: IProject[];
}

export default function Projects({ items }: ProjectProps) {
  return (
    <div className="flex flex-col gap-8 py-8">
      {items.map((item, index) => {
        const [isOpen, setIsOpen] = useState(false);

        return (
          <div
            key={index}
            className={cn(
              "w-full p-6 rounded-lg shadow-lg border transition-all",
              "bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100",
              "border-neutral-200 dark:border-neutral-700 hover:shadow-xl"
            )}
          >
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-neutral-100">
                  {item.name}
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  {new Date(item.date).toLocaleDateString()}
                </p>
              </div>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-sm px-4 py-2 border rounded-full transition-all 
                  bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600
                  text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-600"
              >
                {isOpen ? "Close" : "Details"}
              </button>
            </div>

            {/* Expandable Content */}
            {isOpen && (
              <div className="mt-6">
                <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  {item.description}
                </p>

                {/* Technologies List */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-3 py-1 rounded-full bg-neutral-200 dark:bg-neutral-700 
                        text-neutral-800 dark:text-neutral-200 shadow-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Project Link */}
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-block text-sm font-semibold text-blue-600 dark:text-blue-400 
                    hover:underline focus:ring focus:ring-blue-500 dark:focus:ring-blue-400 focus:outline-none"
                >
                  Explore Project
                </a>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
