import { useState } from "react";
import { IProject } from "@/lib/projectService";
import { cn } from "@/lib/utils";

interface ProjectProps {
  items: IProject[];
}

export default function Projects({ items }: ProjectProps) {
  return (
    <div className="flex flex-col gap-6 py-6">
      {items.map((item, index) => {
        const [isOpen, setIsOpen] = useState(false);

        return (
          <div
            key={index}
            className={cn(
              "w-full p-6 rounded-lg shadow-md border transition-all",
              "bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100",
              "border-neutral-300 dark:border-neutral-700 hover:shadow-lg"
            )}
          >
            {/* Header Section */}
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  {new Date(item.date).toLocaleDateString()}
                </p>
              </div>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-sm px-3 py-1 border rounded-md transition-all 
                  bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600
                  text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-600"
              >
                {isOpen ? "Close" : "View More"}
              </button>
            </div>

            {/* Expandable Content */}
            {isOpen && (
              <div className="mt-4">
                <p className="text-sm text-neutral-700 dark:text-neutral-300">
                  {item.description}
                </p>

                {/* Technologies List */}
                <div className="mt-3 flex flex-wrap gap-2">
                  {item.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2 py-1 rounded-md bg-neutral-200 dark:bg-neutral-700 
                        text-neutral-800 dark:text-neutral-200"
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
                  className="mt-4 inline-block text-sm font-medium text-blue-600 dark:text-blue-400 
                    hover:underline"
                >
                  Visit Project
                </a>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
