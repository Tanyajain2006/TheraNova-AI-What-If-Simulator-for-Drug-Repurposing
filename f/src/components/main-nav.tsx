"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Bot,
  FlaskConical,
  LayoutDashboard,
  Radar,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function MainNav({ className, isCollapsed }: { className?: string, isCollapsed: boolean }) {
  const pathname = usePathname();
  const navItems = [
    {
      href: "/",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      href: "/simulator",
      label: "Simulator",
      icon: FlaskConical,
    },
    {
      href: "/repurpose-bot",
      label: "RepurposeBot",
      icon: Bot,
    },
    {
      href: "/radar",
      label: "Radar",
      icon: Radar,
    },
  ];

  return (
    <nav className={cn("flex flex-col items-start gap-2", className)}>
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return isCollapsed ? (
          <Tooltip key={item.href} delayDuration={0}>
            <TooltipTrigger asChild>
              <Link
                href={item.href}
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8",
                  isActive && "bg-accent text-accent-foreground"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span className="sr-only">{item.label}</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">{item.label}</TooltipContent>
          </Tooltip>
        ) : (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
              isActive && "bg-accent text-primary"
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
