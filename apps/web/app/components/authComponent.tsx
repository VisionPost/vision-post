"use client";

import { signIn, signOut } from "next-auth/react";

export default function AuthComponent() {
  return (
    <div className="flex space-x-3" >
      <button className="hover:cursor-pointer" onClick={() => signIn("github")}>Sign in</button>
      <button className="hover:cursor-pointer" onClick={() => signOut()}>Sign out</button>
    </div>
  );
}
