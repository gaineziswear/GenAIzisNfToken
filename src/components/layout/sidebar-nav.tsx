"use client"

import Link from "next/link";
import React from "react";
import {
  Bot,
  CandlestickChart,
  CreditCard,
  HeartPulse,
  Landmark,
  LayoutDashboard,
  LineChart,
  Newspaper,
  Settings,
  Sparkles,
} from "lucide-react";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const menuItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/strategy", label: "Strategy AI", icon: Sparkles },
  { href: "/pulse", label: "Pulse", icon: HeartPulse },
  { href: "/market", label: "Market Watch", icon: CandlestickChart },
  { href: "/autonomous", label: "Autonomous AI", icon: Bot },
  { href: "/feed", label: "Public Feed", icon: Newspaper },
  { href: "/lending", label: "P2P Lending", icon: Landmark },
];

const bottomMenuItems = [
    { href: "/billing", label: "Billing", icon: CreditCard },
    { href: "/settings", label: "Settings", icon: Settings },
]

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b">
        <div className="flex items-center gap-2 p-2">
          <Link href="/" className="flex items-center gap-2">
            <div
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground",
                "group-data-[collapsible=icon]:h-10 group-data-[collapsible=icon]:w-10 group-data-[collapsible=icon]:rounded-full"
              )}
            >
              <LineChart className="h-5 w-5" />
            </div>
            <h1 className="text-xl font-bold font-headline group-data-[collapsible=icon]:hidden">
              Gainezis
            </h1>
          </Link>
        </div>
      </SidebarHeader>
      <SidebarContent className="flex-1 p-2">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} passHref>
                <SidebarMenuButton
                  isActive={pathname === item.href}
                  tooltip={{
                    children: item.label,
                    className: "font-headline",
                  }}
                >
                  <item.icon />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-2 border-t">
        <SidebarMenu>
            {bottomMenuItems.map((item) => (
                 <SidebarMenuItem key={item.href}>
                    <Link href={item.href} passHref>
                    <SidebarMenuButton
                        isActive={pathname === item.href}
                        tooltip={{
                        children: item.label,
                        className: "font-headline",
                        }}
                    >
                        <item.icon />
                        <span>{item.label}</span>
                    </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
            ))}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
