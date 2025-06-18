import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?:        string;
    refreshToken?:       string;
    accessTokenExpires?: number;
    providerAccountId?:  string;
    githubUsername?:     string;
    x_userName?:         string;
  }
}

declare module "next-auth" {
  interface User extends DefaultUser {
    githubUsername?: string | null; 
    x_userName?: string | null;
  }

  interface Session {
    user: User & DefaultSession["user"];
  }
}
