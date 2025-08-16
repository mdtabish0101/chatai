"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export const HomeView = () => {
  const {data: session} = authClient.useSession();
  const router = useRouter();
  if(!session){
    return(
      <div>
        <p>Loading...</p>
      </div>
    )
  }
  return (
    <div>
      <div className="flex flex-col gap-y-4">
        <p>
          logged in as {session.user.name}
        </p>
        <Button onClick={() => authClient.signOut({fetchOptions:{onSuccess:()=>router.push("/Sign-in")}})}>Sign Out</Button>
      </div>
    </div>

  );
}
