import { EducationItem } from "@/lib/data/education";
import { FaExternalLinkAlt } from "react-icons/fa";
import { cn } from "@/lib/utils"; // Gestion des classes conditionnelles

interface EducationProps {
  items: EducationItem[];
}

export default function Education({ items }: EducationProps) {
  return (
    <div className="flex flex-col gap-4 py-4">
      {items.map((item, index) => (
        <div
          key={index}
          className={cn(
            "w-full p-4 rounded-lg shadow-md border dark:border-neutral-700 transition-all",
            "bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
          )}
        >
          {/* Nom de l'école et lien */}
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                {item.name}
              </h3>
              <p className="text-xs text-neutral-700 dark:text-neutral-400">
                {item.degree} in {item.study}
              </p>
            </div>
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${item.name}`}
              className="ml-2 text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 transition"
            >
              <FaExternalLinkAlt className="w-4 h-4" />
            </a>
          </div>

          {/* Lieu et période */}
          <div className="flex justify-between  text-xs text-neutral-700 dark:text-neutral-400  mt-3">
            <span>{item.place}</span>
            <span>
              {formatDate(item.startDate)} -{" "}
              {item.endDate === "present"
                ? "Present"
                : formatDate(item.endDate)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

function formatDate(date: Date | string): string {
  if (typeof date === "string") return date;
  const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "short" };
  return new Intl.DateTimeFormat("en-US", options).format(date);
}
