"use client";

import { useEffect } from "react";
import { signIn } from "next-auth/react";
import { Loader2 } from "lucide-react";

export default function TwitterPopup() {
  useEffect(() => {
    signIn("twitter", {
      redirect: false,
      callbackUrl: `${window.location.origin}/twitter-popup/redirect`,
    });
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen">
     <Loader2 className="text-slate-200 h-10 w-10 animate-spin" />;
    </div>
  );
};
