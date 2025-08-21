'use client';

import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { PanelLeftClose, PanelLeftIcon, SearchIcon } from "lucide-react";
import { DashboardCommand } from "./dashboard-command";
import { useEffect, useState } from "react";

export const DashboardNavbar = () => {
    const { state, toggleSidebar, isMobile } = useSidebar();
    const [commandOpen, setCommandOpen] = useState(false);

    useEffect(()=>{
        const down = (e: KeyboardEvent) =>{
            if(e.key === "k" && (e.metaKey || e.ctrlKey)){
                e.preventDefault();
                setCommandOpen((open) => !open);
            }
        };

        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, []);
    return (
        <>
            <DashboardCommand open={commandOpen} setOpen={setCommandOpen}/>
            <nav className="flex px-3 py-3 gap-x-4 items-center border-b bg-white">
                <Button className="size-9 border-none" variant="outline" onClick={toggleSidebar}>
                    {(state === "collapsed" || isMobile) ?
                        <PanelLeftIcon className="size-4" /> : <PanelLeftClose className="size-4" />}
                </Button>
                <Button className="h-9 w-[240px] justify-start font-normal text-muted-foreground " variant="outline" size="sm" onClick={() => setCommandOpen((open) => !open)}>
                    <SearchIcon />
                    Search
                    <kbd className="ml-auto pointer-events-none inline-flex ho5 select-none items-center gap-1 rounded bg-muted px-1.5 font-mono font-normal text-muted-foreground">
                        <span>
                            CTRL
                        </span>K
                    </kbd>
                </Button>
            </nav>
        </>
    )
}