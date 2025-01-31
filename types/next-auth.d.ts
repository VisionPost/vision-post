import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    githubUsername?: string | null;  // ✅ Add GitHub username
  }

  interface Session {
    user: User & DefaultSession["user"];
  }
}
