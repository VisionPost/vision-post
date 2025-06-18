"use client";

import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { signIn } from "next-auth/react";

export default function SignInButton() {
    return (
        <Button 
        className="w-full bg-white text-black hover:bg-gray-100 font-medium h-12 text-base cursor-pointer" 
        size="lg"
        onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
        >
            <Github className="mr-3 h-5 w-5" />
            Continue with GitHub
        </Button>
    );
};