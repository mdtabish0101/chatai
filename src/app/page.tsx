"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client"; //import the auth client
import { useState } from "react";


export default function Home() {
  const { data: session } = authClient.useSession();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async () => {
    authClient.signUp.email({
      name,
      email,
      password
    }, {
      onRequest: (ctx) => {
        window.alert("Requesting");
      },
      onSuccess: (ctx) => {
        window.alert("Success");
      },
      onError: (ctx) => {
        // display the error message
        alert(ctx.error.message);
      },
    }
    )
  }
  const onLogin = async () => {
    authClient.signIn.email({
      email,
      password
    }, {
      onRequest: (ctx) => {
        window.alert("Requesting");
      },
      onSuccess: (ctx) => {
        window.alert("Success");
      },
      onError: (ctx) => {
        // display the error message
        alert(ctx.error.message);
      },
    }
    )
  }
  if (session) {
    return (
      <div className="flex flex-col gap-y-4">
        <p>
          logged in as {session.user.name}
        </p>
        <Button onClick={() => authClient.signOut()}>Sign Out</Button>
      </div>
    )
  }


  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen text-2xl gap-y-2">
        <div className="flex flex-col gap-y-2">
          <input placeholder="name" value={name} onChange={(e) => setName(e.target.value)} />
          <input placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <Button onClick={onSubmit}>Create User</Button>
      </div>
      <div className="flex flex-col items-center justify-center h-screen text-2xl gap-y-2">
        <div className="flex flex-col gap-y-2">
          <input placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <Button onClick={onLogin}>Sign In</Button>
      </div>
      
    </div>

  );
}
