"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { NavItems } from "@/lib/utils";
import { ModeToggle } from "@/components/toggle-mode";
import { deleteSession } from "@/app/session";
import { redirect } from "next/navigation";

interface NavProps {
  items: NavItems[];
}

async function logout(){
    await deleteSession();
    redirect('/homepage');
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
          Name
        </Link>
        {items?.map(
          (item, index) =>
            item.href && (
              <Link
              key={index}
                href={item.href}
                className={cn(
                  "flex items-center text-sm font-medium text-muted-foreground"
                )}
              >
                {item.title}
              </Link>
            )
        )}
        <button onClick={logout} className={cn("flex items-center text-sm font-medium text-muted-foreground")}></button>
      </nav>
      <div className="me-8">
        <ModeToggle></ModeToggle>
      </div>
    </div>
  );
}
