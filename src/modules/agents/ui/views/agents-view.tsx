"use client";

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { DataTable } from "../components/data-table";
import { columns } from "../components/columns";
import { EmptyState } from "@/components/empty-staate";

export const AgentView = () => {
    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions());

    return (
        <div className="flex flex-col flex-1 pb-4 px-4 md:px-4 gap-y-4">
            <DataTable columns={columns} data={data} />
            {data.length === 0 && (
                <EmptyState title="Create your first agent"
                description="Create an agent to join your meetings. Each agent will follow your instructions and can interact with participants during the meeting."/>
            )}
        </div>
    )
}


export const AgentsViewLoading = () => {
    return (
        <LoadingState title="Agents Loading"
            description="This may take a while" />
    )
}

export const ErrorPage = () => {
    return (
        <ErrorState title="Error Loading Agents"
            description="Something went wrong, Please try again later" />
    )
}