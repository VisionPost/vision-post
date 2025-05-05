import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { prisma } from "@repo/db";
import { Prisma } from "@prisma/client";
import { AdapterAccount } from "next-auth/adapters";

export const authOptions: AuthOptions = {
    adapter: {
        ...PrismaAdapter(prisma),
        createUser: async (data: Prisma.UserCreateInput) => {
            return prisma.user.create({
                data: {
                    name: data.name,
                    email: data.email,
                    image: data.image,
                    githubUsername: data.githubUsername,
                },
            });
        },
        linkAccount: async (data: AdapterAccount) => {
            const { token_type, scope, ...filteredData } = data;
            return prisma.account.create({
                data: filteredData,
            });
        },
    },
    providers: [
        GitHubProvider({
          clientId: process.env.GITHUB_ID || "",
          clientSecret: process.env.GITHUB_SECRET || "",
          authorization: {
            params: {
                scope: "read:user user:email repo read:org",
            },
          },
        }),
      ],
      secret: process.env.NEXTAUTH_SECRET,
      callbacks: {
        async signIn({ user, account, profile}) {
            if(account?.provider === "github" && profile) {
                const githubProfile = profile as { login: string };
                user.githubUsername = githubProfile.login;
            };
            console.log(user, account);
            return true;
        },
        async jwt({ token, user }) {
            if(user) {
                token.githubUsername = user.githubUsername;
            }
            return token;
        },
        async session({ session, token }) {
            if(session.user && token.sub) {
                session.user.id = token.sub;
            };
            return session;
        },
      },
      session: {
        strategy: "jwt",
      },     
      events: {
        async createUser({ user }) {
            console.log(user);
        },
      },
};