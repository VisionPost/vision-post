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
          console.log("signin", user);
            if(account?.provider === "github" && profile) {
                const githubProfile = profile as { login: string };
                user.githubUsername = githubProfile.login;
            };
            return true;
        },
        async jwt({ token, user, account }) {
          if (user) {
            if (user.githubUsername) token.githubUsername = user.githubUsername;
            if (user.x_userName)     token.x_userName     = user.x_userName;
          }
        
          if (!token.x_userName && token.sub) {
            const dbUser = await prisma.user.findUnique({
              where: { id: token.sub },
              select: { x_userName: true }
            });
            if (dbUser?.x_userName) token.x_userName = dbUser.x_userName;
          }
        
          if (account?.provider === "twitter") {
            token.accessToken        = account.access_token!;
            token.refreshToken       = account.refresh_token!;
            token.accessTokenExpires = (account.expires_at! * 1000) || 0;
            token.providerAccountId  = account.providerAccountId; 
          }
        
          if (!token.accessToken && token.sub) {
            const acct = await prisma.account.findFirst({
              where: {
                userId:   token.sub,
                provider: "twitter",
              },
              select: {
                access_token:       true,
                refresh_token:      true,
                expires_at:         true,
                providerAccountId:  true,
              },
            });
            if (acct) {
              token.accessToken        = acct.access_token!;
              token.refreshToken       = acct.refresh_token!;
              token.accessTokenExpires = (acct.expires_at ?? 0) * 1000;
              token.providerAccountId  = acct.providerAccountId;
            }
          }
        
          if (!token.accessToken || !token.refreshToken) {
            return token;
          }
        
          const now = Date.now();
          const expires = typeof token.accessTokenExpires === "number"
            ? token.accessTokenExpires
            : 0;
        
          if (now < expires) {
            return token;
          }
        
          try {
            const basic = Buffer.from(
              `${process.env.TWITTER_CLIENT_ID}:${process.env.TWITTER_CLIENT_SECRET}`
            ).toString("base64");
        
            const resp = await fetch("https://api.twitter.com/2/oauth2/token", {
              method: "POST",
              headers: {
                "Content-Type":  "application/x-www-form-urlencoded",
                "Authorization": `Basic ${basic}`,
              },
              body: new URLSearchParams({
                grant_type:    "refresh_token",
                refresh_token: token.refreshToken,
              }),
            });
            const refreshed = await resp.json();
        
            if (!resp.ok) {
              console.error("Twitter refresh failed:", refreshed);
              delete token.accessToken;
              delete token.refreshToken;
              delete token.accessTokenExpires;
              return token;
            }
        
            token.accessToken        = refreshed.access_token;
            token.refreshToken       = refreshed.refresh_token ?? token.refreshToken;
            token.accessTokenExpires = now + refreshed.expires_in * 1000;
        
            await prisma.account.update({
              where: {
                provider_providerAccountId: {
                  provider:          "twitter",
                  providerAccountId: token.providerAccountId!,
                },
              },
              data: {
                access_token:  token.accessToken,
                refresh_token: token.refreshToken,
                expires_at:    Math.floor(token.accessTokenExpires / 1000),
              },
            });
        
            return token;
          } catch (e) {
            console.error("Unexpected error rotating Twitter token", e);
            return token;
          }
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

      cookies: {
        sessionToken: {
          name: process.env.NODE_ENV === 'production' 
            ? '__Secure-next-auth.session-token' 
            : 'next-auth.session-token',
          options: {
            httpOnly: true,
            sameSite: 'lax',
            path: '/',
            secure: process.env.NODE_ENV === 'production',
            domain: process.env.NODE_ENV === 'production' 
              ? '.visionpost.dev' 
              : undefined
          },
        },
      },
};
