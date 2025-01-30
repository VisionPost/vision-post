import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { prisma } from "./db";
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
        })
      ],
      secret: process.env.NEXTAUTH_SECRET,
      callbacks: {
        async signIn() {
            return true;
        },
        async jwt({ token }) {
            return token;
        },
      },

      session: {
        strategy: "jwt",
      },

      events: {
        async createUser({ user }) {
            console.log("user created", user);
        }
      }
};