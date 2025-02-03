import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    name?: string | null;
    email: string;
    image?: string | null;
    githubUsername?: string | null;  
  }

  interface Session {
    user: User & DefaultSession["user"];
  }
}
