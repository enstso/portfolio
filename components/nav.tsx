"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import{
    NavigationMenu    
} from "@/components/ui/navigation-menu"

const components: { title: string; href: string }[] = [
  {
    title: "Homepage",
    href: "/homepage",
  },
  {
    title: "Blog",
    href: "/blog",
  },
  {
    title: "Resume",
    href:"/resume"
  }
];

export function Nav(){
    return(
        <NavigationMenu></NavigationMenu>
    )
}
