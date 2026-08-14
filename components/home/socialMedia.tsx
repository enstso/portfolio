import { Github, Linkedin, Mail } from "lucide-react";

import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

type SocialMediaProps = {
  tone?: "default" | "light";
  includeEmail?: boolean;
};

const links = [
  { label: "GitHub", href: siteConfig.github, icon: Github },
  { label: "LinkedIn", href: siteConfig.linkedin, icon: Linkedin },
] as const;

export function SocialMedia({ tone = "default", includeEmail = true }: SocialMediaProps) {
  const visibleLinks = includeEmail
    ? [...links, { label: "Email", href: `mailto:${siteConfig.email}`, icon: Mail }]
    : links;

  return (
    <div className="flex gap-2" aria-label="Professional links">
      {visibleLinks.map((item) => {
        const Icon = item.icon;
        const isExternal = item.href.startsWith("http");
        return (
          <a
            key={item.label}
            href={item.href}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            aria-label={item.label}
            className={cn(
              "group flex h-10 w-10 items-center justify-center rounded-full border transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
              tone === "light"
                ? "border-blue-200 bg-blue-700/40 text-white hover:bg-white hover:text-blue-700 focus-visible:ring-white focus-visible:ring-offset-blue-700"
                : "border-slate-300 bg-white text-slate-700 hover:border-blue-600 hover:bg-blue-600 hover:text-white dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200",
            )}
          >
            <Icon className="h-5 w-5 transition-transform group-hover:scale-110 motion-reduce:transform-none" aria-hidden="true" />
          </a>
        );
      })}
    </div>
  );
}
