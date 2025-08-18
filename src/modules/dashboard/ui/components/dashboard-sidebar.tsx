"use client";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarGroup } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { BotIcon, StarIcon, VideoIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DashboardUserButton } from "./dasboard-user-button";

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
            <SidebarHeader className="text-sidebar-accent-foreground">
                <Link href="/" className="flex items-center gap-2 px-2 pt-2">
                    <Image src="/logo2.svg" height={38} width={38} alt="ChatAI" />
                    <p className="text-2xl font-semibold">ChatAI</p>
                </Link>
            </SidebarHeader>
            <div className="px-4 py-2">
            <Separator className="bg-[#00978a]/25" />
            </div>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {firstSection.map((item) => (
                                <SidebarMenuItem key={item.href}>
                                    <SidebarMenuButton asChild className={cn(
                                        "h-10 hover:bg-linear-to-r/oklch border border-transparent from-sidebar-accent-hover from-5% via-30% via-sidebar/10 to-sidebar/80",
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
                <Separator className="bg-[#00978a]/25" />
                </div>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {secondSection.map((item) => (
                                <SidebarMenuItem key={item.href}>
                                    <SidebarMenuButton asChild className={cn(
                                        "h-10 hover:bg-linear-to-r/oklch border border-transparent from-sidebar-accent-hover from-5% via-30% via-sidebar/10 to-sidebar/80",
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
            <SidebarFooter className="text-black">
                <DashboardUserButton/>

            </SidebarFooter>
        </Sidebar>
    )
} 