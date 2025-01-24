"use client"

import { signIn, signOut } from "next-auth/react";

export default function Home() {
  return (
    <div className="gap-2" >
      <button onClick={() => signIn()}>Sign in</button>
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  );
}
