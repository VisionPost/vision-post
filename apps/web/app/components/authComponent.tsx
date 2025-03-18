"use client";

import { signIn, signOut } from "next-auth/react";

export default function AuthComponent() {
  return (
    <div className="flex space-x-3" >
      <button onClick={() => signIn()}>Sign in</button>
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  );
}
