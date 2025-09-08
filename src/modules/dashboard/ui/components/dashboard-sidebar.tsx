"use client";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarGroup } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { BotIcon, StarIcon, VideoIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DashboardUserButton } from "./dasboard-user-button";
import { DashboardTrial } from "./dashboard-trial";

const firstSection = [
    {
        icon: VideoIcon,
        label: "Meetings",
        href: "/meetings",
    },
    {
        icon: BotIcon,
        label: "Agents",
        href: "/agents",
    }
]

const secondSection = [
    {
        icon: StarIcon,
        label: "Upgrade",
        href: "/upgrade",
    }
]

export const DashboardSidebar = () => {
    const pathname = usePathname()

    return (
        <Sidebar>
            <SidebarHeader className="text-main2">
                <Link href="/" className="flex items-center gap-2 px-2 pt-2">
                    <Image src="/logo2.svg" height={38} width={38} alt="ChatAI" />
                    <p className="text-2xl font-semibold">ChatAI</p>
                </Link>
            </SidebarHeader>
            <div className="px-4 py-2">
            <Separator className="bg-border" />
            </div>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu className="text-main2">
                            {firstSection.map((item) => (
                                <SidebarMenuItem key={item.href}>
                                    <SidebarMenuButton asChild className={cn(
                                        "h-10 hover:bg-linear-to-r/oklch border border-transparent sidebar-accent-hover/90",
                                        pathname === item.href && "bg-linear-to-r/oklch"
                                    )}
                                        isActive={pathname === item.href}
                                    >
                                        <Link href={item.href}>
                                            <item.icon className="size-5 " />
                                            <span className="text-sm font-medium tracking-tight">
                                                {item.label}
                                            </span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <div className="px-4 py-2">
                <Separator className="bg-border" />
                </div>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu className="text-main2">
                            {secondSection.map((item) => (
                                <SidebarMenuItem key={item.href}>
                                    <SidebarMenuButton asChild className={cn(
                                        "h-10 hover:bg-linear-to-r/oklch border border-transparent sidebar-accent-hover",
                                        pathname === item.href && "bg-linear-to-r/oklch"
                                    )}
                                        isActive={pathname === item.href}
                                    >
                                        <Link href={item.href}>
                                            <item.icon className="size-5 " />
                                            <span className="text-sm font-medium tracking-tight">
                                                {item.label}
                                            </span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="text-main3">
                
                <DashboardTrial />
                <DashboardUserButton/>

            </SidebarFooter>
        </Sidebar>
    )
}