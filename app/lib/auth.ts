import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { prisma } from "./db";

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GitHubProvider({
          clientId: process.env.GITHUB_ID || "",
          clientSecret: process.env.GITHUB_SECRET || "",
        })
      ],
      secret: process.env.NEXTAUTH_SECRET,
      callbacks: {
        async signIn(params) {
            console.log(params);
            return true;
        },
        async jwt({ token }) {
            return token;
        },
      },

      events: {
        async createUser({ user }) {
            console.log("user created", user);
        }
      }
};