"use client";

import {useState} from "react";
import {ExperienceItem} from "@/lib/data/experiences";
import {cn} from "@/lib/utils";

interface ExperiencesProps {
    items: ExperienceItem[];
}

export default function Experiences({items}: Readonly<ExperiencesProps>) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    return (
        <div className="flex flex-col gap-4 py-4">
            {items.map((item, index) => {
                return (
                    <div
                        key={index}
                        className={cn(
                            "w-full p-4 rounded-lg shadow-md border dark:border-neutral-700 transition-all",
                            "bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
                        )}
                    >
                        {/* En-tête de l'expérience */}
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                                    {item.name}
                                </h3>
                                <p className="text-xs text-neutral-600 dark:text-neutral-400">
                                    {item.jobOccupation}
                                </p>
                                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                                    {item.place} —{" "}
                                    <span>
                    {item.startDate.toLocaleDateString("en-GB", {
                        year: "numeric",
                        month: "short",
                    })}{" "}
                                        -{" "}
                                        {item.endDate === "present"
                                            ? "Present"
                                            : new Date(item.endDate).toLocaleDateString("en-GB", {
                                                year: "numeric",
                                                month: "short",
                                            })}
                  </span>
                                </p>
                            </div>
                            {/* Bouton pour basculer la description */}
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                aria-label="Toggle Description"
                                className="ml-2 p-1 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-600 transition"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={cn(
                                        "h-5 w-5 transition-transform",
                                        isOpen ? "rotate-180" : "rotate-0"
                                    )}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </button>
                        </div>

                        {/* Contenu déroulant */}
                        {isOpen && (
                            <ul className="list-disc list-outside space-y-1 mt-2 text-xs pl-5 text-neutral-700 dark:text-neutral-300">
                                {item.description.map((desc, i) => (
                                    <li key={i} className="pl-2">{desc}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
