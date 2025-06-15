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
        async jwt({ token, user, account }) {
            console.log("jwt callback:", token, "jwt user:", user, "account:", account);
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
              };
              if (account && account.provider === "twitter") {
                token.accessToken = account.access_token;
                token.refreshToken = account.refresh_token!;
                token.accessTokenExpires = account.expires_at! * 1000;
              };

              if (!token.accessToken && token.sub) {
                const acct = await prisma.account.findFirst({
                  where: { userId: token.sub, provider: "twitter" },
                  select: {
                    access_token: true,
                    refresh_token: true,
                    expires_at: true,
                    providerAccountId: true,
                  },
                });
                if (acct) {
                  token.accessToken        = acct.access_token;
                  token.refreshToken       = acct.refresh_token!;
                  token.accessTokenExpires = (acct.expires_at ?? 0) * 1000;
                  token.providerAccountId  = acct.providerAccountId;
                }
              }

              const expires = token.accessTokenExpires as unknown as number;
              if (expires && Date.now() >= expires) {
                const credentials = Buffer.from(`${process.env.TWITTER_CLIENT_ID}:${process.env.TWITTER_CLIENT_SECRET}`).toString('base64');
                try {
                  const response = await fetch("https://api.twitter.com/2/oauth2/token", {
                    method: "POST",
                    headers: { 
                        "Content-Type": "application/x-www-form-urlencoded",
                        "Authorization": `Basic ${credentials}`
                    },
                    body: new URLSearchParams({
                      grant_type:    "refresh_token",
                      refresh_token: token.refreshToken as string,
                    }),
                  });
                  const refreshed = await response.json();
                  if (!response.ok) throw refreshed;
        
                  // update token
                  token.accessToken        = refreshed.access_token;
                  token.accessTokenExpires = Date.now() + refreshed.expires_in * 1000;
                  token.refreshToken       = refreshed.refresh_token ?? token.refreshToken;
        
                  // ALSO update DB's Account record
                  await prisma.account.updateMany({
                    where: {
                      provider: "twitter",
                      providerAccountId: account?.providerAccountId as string,
                    },
                    data: {
                      access_token:  refreshed.access_token,
                      refresh_token: refreshed.refresh_token ?? token.refreshToken,
                      expires_at:    Math.floor(expires! / 1000),
                    },
                  });
                } catch (error) {
                  console.error("Error refreshing Twitter access token", error);
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
