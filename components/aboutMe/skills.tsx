"use client";

import { SkillsList } from "@/lib/data/skills";
import { cn } from "@/lib/utils";

interface SkillListProps {
  list: SkillsList[];
}

export default function Skills({ list }: SkillListProps) {
  return (
    <div className="flex flex-wrap gap-6 py-8 mb-8">
      {list?.map((item, index) =>
        item.domain ? (
          <div
            key={index}
            className={cn(
              "flex-1 min-w-[250px] p-6 rounded-xl shadow-lg transition-all",
              "bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-700"
            )}
          >
            <h3 className="text-xl font-semibold text-center mb-6">{item.domain}</h3>
            {item.iconsItems && (
              <div className="flex flex-wrap justify-center gap-6">
                {item.iconsItems.map((skill, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center text-center text-sm"
                  >
                    <div className="text-2xl mb-2">{skill.icon}</div>
                    <span className="text-sm font-medium">{skill.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : null
      )}
    </div>
  );
}
