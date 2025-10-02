import { EducationItem } from "@/lib/data/education";
import { ExternalLink, Calendar, MapPin, GraduationCap, Award } from "lucide-react";
import { cn } from "@/lib/utils";

interface EducationProps {
  items: EducationItem[];
}

export default function Education({ items }: EducationProps) {
  return (
      <div className="space-y-3 sm:space-y-4">
        {items.map((item, index) => (
            <div
                key={index}
                className={cn(
                    "group p-3 sm:p-4 rounded-lg sm:rounded-xl border border-slate-200 dark:border-slate-700 transition-all duration-300",
                    "bg-white dark:bg-slate-800",
                    "hover:shadow-md hover:border-blue-300 dark:hover:border-blue-600"
                )}
            >
              <div className="flex items-start justify-between gap-3 sm:gap-4">
                <div className="flex items-start gap-2 sm:gap-3 flex-1 min-w-0">
                  {/* Icon - Responsive */}
                  <div className="p-1.5 sm:p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex-shrink-0 mt-0.5">
                    <GraduationCap className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
                  </div>

                  <div className="flex-1 min-w-0">
                    {/* Institution Name - Mobile Truncated */}
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mb-2 leading-tight">
                      <span className="sm:hidden">{item.name.length > 25 ? item.name.substring(0, 25) + '...' : item.name}</span>
                      <span className="hidden sm:inline">{item.name}</span>
                    </h3>

                    {/* Degree & Study - Mobile Stack */}
                    <div className="flex items-start gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                      <Award className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-blue-600 flex-shrink-0 mt-1" />
                      <div className="flex-1 min-w-0">
                        <p className="text-blue-600 dark:text-blue-400 font-semibold text-xs sm:text-sm leading-tight">
                          {item.degree}
                        </p>
                        {item.study && (
                            <p className="text-slate-600 dark:text-slate-400 text-xs mt-0.5 sm:mt-1 leading-tight">
                              {item.study}
                            </p>
                        )}
                      </div>
                    </div>

                    {/* Location & Date - Mobile Stack */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 sm:gap-1.5 text-xs text-slate-600 dark:text-slate-400">
                        <MapPin className="h-2.5 w-2.5 sm:h-3 sm:w-3 flex-shrink-0" />
                        <span className="truncate">{item.place}</span>
                      </div>
                      <div className="flex items-center gap-1 sm:gap-1.5 text-xs text-slate-600 dark:text-slate-400">
                        <Calendar className="h-2.5 w-2.5 sm:h-3 sm:w-3 flex-shrink-0" />
                        <span className="truncate">
                          {formatDate(item.startDate)} - {item.endDate === "present" ? "Present" : formatDate(item.endDate)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* External Link - Touch Friendly */}
                <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${item.name} website`}
                    className="p-2 sm:p-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 flex-shrink-0"
                >
                  <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
                </a>
              </div>
            </div>
        ))}
      </div>
  );
}

function formatDate(date: Date | string): string {
  if (typeof date === "string") return date;
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short"
  };
  return new Intl.DateTimeFormat("en-US", options).format(date);
}
