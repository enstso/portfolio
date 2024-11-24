"use client";

import { cn } from "@/lib/utils";
import { SocialMediaItems } from "@/lib/utils";

interface SocialMediaProps {
  items: SocialMediaItems[];
}

export const SocialMedia = ({ items }: SocialMediaProps) => {
  return (
    <div className="flex gap-4">
      {items?.map(
        (item, index) =>
          item.url && (
            <a
              key={index}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "group flex items-center justify-center h-10 w-10 rounded-full border border-muted bg-background transition-colors duration-300",
                // Mode clair : icône blanche sur fond noir
                "hover:bg-black hover:border-black hover:text-white",
                // Mode sombre : icône noire sur fond blanc
                "dark:hover:bg-white dark:hover:border-white dark:hover:text-black"
              )}
            >
              <item.icon
                className={cn(
                  "h-6 w-6 transition-transform duration-300",
                  // Mode clair : inverse le dessin de l'icône
                  "group-hover:scale-110 group-hover:fill-white",
                  // Mode sombre : inverse le dessin de l'icône
                  "dark:group-hover:fill-black"
                )}
                aria-hidden="true"
              />
              <span className="sr-only">Go to {item.url}</span>
            </a>
          )
      )}
    </div>
  );
};
