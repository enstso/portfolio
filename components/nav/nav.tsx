"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { NavItems } from "@/lib/utils";
import { ModeToggle } from "@/components/toggle-mode";
interface NavProps {
  items: NavItems[];
}

export function Nav({ items }: NavProps) {
  return (
    <div className="flex justify-between w-full gap-6 md:gap-10">
      <nav className="flex ms-8 gap-6">
        <Link
          className={cn(
            "flex items-center text-sm font-medium text-muted-foreground"
          )}
          href="/"
        >
          test
        </Link>
        {items?.map(
          (item, index) =>
            item.href && (
              <Link
                href={item.href}
                className={cn(
                  "flex items-center text-sm font-medium text-muted-foreground"
                )}
              >
                {item.title}
              </Link>
            )
        )}
      </nav>
      <div className="me-8">
        <ModeToggle></ModeToggle>
      </div>
    </div>
  );
}
