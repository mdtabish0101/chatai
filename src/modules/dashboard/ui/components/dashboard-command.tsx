import { CommandResponsiveDialog, CommandInput, CommandItem, CommandList, CommandGroup, CommandEmpty } from "@/components/ui/command"
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react"

interface Props {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>;
}

export const DashboardCommand = ({ open, setOpen }: Props) => {
    const router = useRouter();
    const [search, setSearch] = useState("");

    const trpc = useTRPC();
    const meetings = useQuery(
        trpc.meetings.getMany.queryOptions({
            search,
            pageSize: 100,
        })
    )
    const agents = useQuery(
        trpc.agents.getMany.queryOptions({
            search,
            pageSize: 100,
        })
    )
    return (
        <CommandResponsiveDialog shouldFilter={false} open={open} onOpenChange={setOpen}>
            <CommandInput
                placeholder="Find a chat or an agent..."
                value={search}
                onValueChange={(value) => setSearch(value)} />
            <CommandList>
                <CommandGroup heading="Meetings">
                    <CommandEmpty>
                        <span className="text-muted-foreground text-sm">
                            No Meetings Found
                        </span>
                    </CommandEmpty>
                    {meetings.data?.items.map((meeting) => (
                        <CommandItem
                            key={meeting.id}
                            onSelect={() => {
                                router.push(`/meetings/${meeting.id}`);
                                setOpen(false);
                            }}>
                            {meeting.name}
                        </CommandItem>
                    ))}
                </CommandGroup>
                <CommandGroup heading="Agents">
                    <CommandEmpty>
                        <span className="text-muted-foreground text-sm">
                            No Agents Found
                        </span>
                    </CommandEmpty>
                    {agents.data?.items.map((agent) => (
                        <CommandItem
                            key={agent.id}
                            onSelect={() => {
                                router.push(`/meetings/${agent.id}`);
                                setOpen(false);
                            }}>
                            {agent.name}
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </CommandResponsiveDialog>
    )
}