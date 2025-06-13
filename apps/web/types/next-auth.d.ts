import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    githubUsername?: string | null; 
    x_userName?: string | null;
  }

  interface Session {
    user: User & DefaultSession["user"];
  }
}
