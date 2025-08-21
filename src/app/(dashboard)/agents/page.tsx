import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { AgentsViewLoading, AgentView, ErrorPage } from "@/modules/agents/ui/views/agents-view";
import { getQueryClient, trpc } from "@/trpc/server";




const Page = () => {
    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions())
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<AgentsViewLoading/>}>
            <ErrorBoundary fallback={<ErrorPage/>}>
                <AgentView />
                </ErrorBoundary>
            </Suspense>
        </HydrationBoundary>

    )
}

export default Page;