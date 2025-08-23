import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import type { SearchParams } from "nuqs";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { AgentsViewLoading, AgentView, ErrorPage } from "@/modules/agents/ui/views/agents-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { AgentsListHeader } from "@/modules/agents/ui/components/list-headers";
import { loadSearchParams } from "@/modules/agents/params";


interface Props {
    searchParams: Promise<SearchParams>
}



const Page = async ({ searchParams }: Props ) => {
    const filters = await loadSearchParams(searchParams)
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect("/Sign-in")
    }
    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions({
        ...filters,
    }))
    return (
        <>
            <AgentsListHeader />
            <HydrationBoundary state={dehydrate(queryClient)}>
                <Suspense fallback={<AgentsViewLoading />}>
                    <ErrorBoundary fallback={<ErrorPage />}>
                        <AgentView />
                    </ErrorBoundary>
                </Suspense>
            </HydrationBoundary>
        </>

    )
}

export default Page;