import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { HomeView } from "@/modules/home/ui/views/homw-view";
import { headers } from "next/headers";

const Page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
if(!session){
  redirect("/Sign-in")
}

  return (
    <div>
      <HomeView/>
    </div>

  );
}

export default Page
