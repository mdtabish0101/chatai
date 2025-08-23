"use client";

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { DataTable } from "../components/data-table";
import { columns } from "../components/columns";
import { EmptyState } from "@/components/empty-staate";
import { useAgentsFilter } from "../../hooks/use-agents-filters";
import { DataPagination } from "../components/data-pagination";

export const AgentView = () => {
    const [filters, setFilters] = useAgentsFilter();
    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions({
        ...filters,
    }));

    return (
        <div className="flex flex-col flex-1 pb-4 px-4 md:px-4 gap-y-4">
            <DataTable columns={columns} data={data.items} />
            <DataPagination 
            page={filters.page}
            totalPages={data.totalPages}
            onPageChange={(page) => setFilters({ page })} />
            {data.items.length === 0 && (
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