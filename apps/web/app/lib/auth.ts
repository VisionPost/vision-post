import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import TwitterProvider from "next-auth/providers/twitter";
import { prisma } from "@repo/db";
import { AdapterAccount, AdapterUser } from "next-auth/adapters";

const defaultAdapter = PrismaAdapter(prisma);

export const authOptions: AuthOptions = {
    adapter: {
        ...defaultAdapter,

        async createUser(user: AdapterUser) {
            const { emailVerified, ...filtered } = user
            return defaultAdapter.createUser!(filtered);
        },
      
        async linkAccount(account: AdapterAccount) {
            const { token_type, scope, ...rest } = account;
            return defaultAdapter.linkAccount!(rest);
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
          profile(profile) {
            return {
                id: profile.id.toString(),
                name: profile.name,
                email: profile.email,
                image: profile.avatar_url,
                githubUsername: profile.login,
            };
          },
        }),
        TwitterProvider({
            clientId: process.env.TWITTER_CLIENT_ID || "",
            clientSecret: process.env.TWITTER_CLIENT_SECRET || "",
            version: "2.0",
            authorization: {
                params: {
                    scope: "tweet.read tweet.write users.read offline.access",
                },
            },
            profile(profile) {
                return {
                  id:               profile.data.id.toString(),  
                  name:             profile.data.name,
                  email:            profile.data.email ?? "",
                  image:            profile.data.profile_image_url,
                  x_userName:       profile.data.username,
                };
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
            return true;
        },
        async jwt({ token, user }) {
            if(user) {
                if(user.githubUsername) {
                    token.githubUsername = user.githubUsername;
                };
                if(user.x_userName) {
                    token.x_userName = user.x_userName;
                };
            };
            if (!token.x_userName && token.sub) {
                const dbUser = await prisma.user.findUnique({
                  where: { id: token.sub },
                  select: { x_userName: true }
                });
                if (dbUser?.x_userName) {
                  token.x_userName = dbUser.x_userName;
                }
              }
            return token;
        },
        async session({ session, token }) {
            if(session.user && token.sub) {
                session.user.id = token.sub;
                session.user.githubUsername = token.githubUsername as string | null;
                session.user.x_userName     = token.x_userName     as string | null;
            };
            return session;
        },
      },
      session: {
        strategy: "jwt",
      },     
      events: {
        async linkAccount({ user, account, profile }) {
            if(account.provider === "twitter" && profile) {
                await prisma.user.update({
                    where: { id: user.id },
                    data: {
                        x_userName: profile.x_userName,
                    },
                })
            };
        },
      },
};
