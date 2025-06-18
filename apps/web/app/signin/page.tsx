import Link from "next/link"
import Image from "next/image"
import SignInButton from "../components/SignInButton"
import { getServerSession } from "next-auth"
import { authOptions } from "../lib/auth"
import { redirect } from "next/navigation"

export default async function Component() {
  const session = await getServerSession(authOptions);

  if(session?.user) {
    redirect("/dashboard")
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="grid min-h-screen lg:grid-cols-2">
        <div className="flex flex-col justify-center items-center px-8 py-12 bg-black">
          <div className="text-center space-y-6">
            <Link href="/">
            <div className="mx-auto w-15 h-15 rounded-full bg-white flex items-center justify-center mb-8  overflow-hidden">
                <Image 
                src="/logo.jpeg"
                alt="User Avatar"
                width={100}
                height={100}
                className="object-cover"
                />
            </div>
            </Link>
            <h1 className="bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text text-5xl font-medium tracking-tight">VisionPost</h1>
            <p className="text-xl text-gray-300 font-medium">Boost Your Developer Branding! 🚀</p>

          </div>
        </div>

        <div className="flex flex-col bg-zinc-950 px-8 py-12 relative">
          <div className="flex-1 flex flex-col justify-center">
            <div className="mx-auto w-full max-w-sm space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-medium tracking-tight text-white">Welcome to VisionPost</h2>
                <p className="mt-2 text-gray-400 font-medium">Sign in to your account</p>
              </div>

              <div className="space-y-6">
                <SignInButton />

                <div className="text-center">
                  <p className="text-xs text-gray-500 font-medium leading-relaxed">
                    By signing in, you agree to our{" "}
                    <Link
                      href="/terms"
                      className="text-gray-400 underline underline-offset-4 hover:text-white transition-colors"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy"
                      className="text-gray-400 underline underline-offset-4 hover:text-white transition-colors"
                    >
                      Privacy Policy
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
