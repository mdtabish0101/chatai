import { GeneratedAvatar } from "@/components/generated-avatar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { authClient } from "@/lib/auth-client"
import { ChevronDownIcon, CreditCardIcon, LogOutIcon } from "lucide-react";
import { useRouter } from "next/router";




export const DashboardUserButton = () => {
    const router = useRouter();
    const { data, isPending } = authClient.useSession();
    if (isPending || !data?.user) {
        return null;
    }

    const onLogOut = () => {
        authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/Sign-in")
                }
            }
        })
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="rounded-lg border border-border/10 p-3 w-full flex items-center justify-between bg-[#00978a]/25 hover:bg-[#00978a]/20 overflow-hidden">
                {data.user.image ? (
                    <Avatar>
                        <AvatarImage src={data.user.image} />
                    </Avatar>
                ) : (
                    <GeneratedAvatar
                        seed={data.user.name}
                        variant="initials"
                        size={36}
                        className="size-9 mr-3" />
                )}
                <div className="flex flex-col gap-0.5 text-left overflow-hidden flex-1">
                    <p className="text-sm truncate w-full">
                        {data.user.name}
                    </p>
                    <p className="text-sm truncate w-full">
                        {data.user.email}
                    </p>
                </div>
                <ChevronDownIcon className="size-4 shrink-0" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" side="bottom" className="w-52">
                <DropdownMenuLabel>
                    <div className="flex flex-col gap-1">
                        <span className="text-sm font-normal text-muted-foreground truncate">{data.user.name}</span>
                        <span className="text-sm font-normal text-muted-foreground truncate">{data.user.email}</span>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer flex items-center justify-between">
                    Billing
                    <CreditCardIcon className="size-4" />
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer flex items-center justify-between" onClick={onLogOut}>
                    Logout
                    <LogOutIcon />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

    )
}