import { FileDown } from "lucide-react";

import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

type DownloadResumeProps = {
  variant?: "default" | "light";
};

export function DownloadResume({ variant = "default" }: DownloadResumeProps) {
  return (
    <a
      href={siteConfig.resumePath}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex h-10 items-center justify-center gap-2 rounded-lg border px-4 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
        variant === "light"
          ? "border-blue-200 bg-blue-700/40 text-white hover:bg-blue-800/60 focus-visible:ring-white focus-visible:ring-offset-blue-700"
          : "border-slate-300 bg-white text-slate-800 hover:border-blue-300 hover:text-blue-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200",
      )}
    >
      <FileDown className="h-4 w-4" aria-hidden="true" />
      Download Resume
    </a>
  );
}
