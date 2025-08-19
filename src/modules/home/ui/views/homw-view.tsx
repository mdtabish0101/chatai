"use client";

import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";



export const HomeView = () => {
  const trpc = useTRPC();
  const { data } = useQuery(trpc.hello.queryOptions({text:"Tabish"})); 
  return (
    <div className="flex flex-col p-4 gap-y-5">
      <p className="text-2xl">
        {data?.greeting}
      </p>
    </div>

  );
}
