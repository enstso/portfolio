"use client"

import * as React from "react"
import { Moon, Sun, Monitor, Check } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ModeToggle() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
        <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 animate-pulse" />
    )
  }

  const getCurrentIcon = () => {
    switch (theme) {
      case "light":
        return <Sun className="h-5 w-5 text-amber-500" />
      case "dark":
        return <Moon className="h-5 w-5 text-blue-400" />
      default:
        return <Monitor className="h-5 w-5 text-slate-600 dark:text-slate-400" />
    }
  }

  const themes = [
    { id: "light", name: "Light", icon: Sun, color: "text-amber-500" },
    { id: "dark", name: "Dark", icon: Moon, color: "text-blue-400" },
    { id: "system", name: "System", icon: Monitor, color: "text-slate-600 dark:text-slate-400" },
  ]

  return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
              variant="ghost"
              size="icon"
              className={cn(
                  "relative rounded-lg transition-all duration-300",
                  "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700",
                  "hover:bg-slate-50 dark:hover:bg-slate-750 hover:border-slate-300 dark:hover:border-slate-600",
                  "hover:scale-105 hover:shadow-sm",
                  "focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
              )}
          >
            <div className="transition-transform duration-300 hover:rotate-12">
              {getCurrentIcon()}
            </div>
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
            align="end"
            className="w-48 p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl rounded-xl"
        >
          {themes.map((themeOption) => {
            const Icon = themeOption.icon
            const isSelected = theme === themeOption.id

            return (
                <DropdownMenuItem
                    key={themeOption.id}
                    onClick={() => setTheme(themeOption.id)}
                    className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200",
                        "hover:bg-slate-100 dark:hover:bg-slate-700",
                        isSelected && "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                    )}
                >
                  <Icon className={cn("h-4 w-4", themeOption.color)} />
                  <span className="flex-1 font-medium">{themeOption.name}</span>
                  {isSelected && <Check className="h-4 w-4 text-blue-600 dark:text-blue-400" />}
                </DropdownMenuItem>
            )
          })}
        </DropdownMenuContent>
      </DropdownMenu>
  )
}
