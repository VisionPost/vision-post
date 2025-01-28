import { AuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";

export const authOptions: AuthOptions = {
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
      }
}