import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Github, Twitter, Zap, BarChart3, Clock, Shield } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { getServerSession } from "next-auth"
import { authOptions } from "./lib/auth"

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-zinc-800 bg-black backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link href="/">
                <div className="h-10 w-10 rounded-full overflow-hidden">
                  <Image 
                  src="/logo.jpeg"
                  alt="User Avatar"
                  width={40}
                  height={40}
                  className="object-cover"
                  />
                  </div>
                  </Link>  
              <span className="bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text text-xl font-medium">VisionPost</span>
            </div>
            <div className="flex items-center">
              {session?.user ? (
              <Link href="/dashboard">
                <Button className="bg-white text-black hover:bg-gray-200 font-medium cursor-pointer">Dashboard</Button>
              </Link>
              ) : (
              <Link href="/signin">
                <Button className="bg-white text-black hover:bg-gray-200 font-medium cursor-pointer">Sign In</Button>
              </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      <section className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-8">
            <Badge variant="secondary" className="bg-zinc-900 text-gray-300 border-zinc-700 font-medium">
              Transform Your Code Into Content
            </Badge>
            <h1 className="text-5xl md:text-7xl font-medium leading-tight">
              Turn Your GitHub
              <br />
              <span className="bg-gradient-to-r from-gray-400 to-gray-600 text-transparent bg-clip-text">Contributions Into</span>
              <br />
              Engaging X Posts
            </h1>
            <p className="text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed font-medium">
              VisionPost lets you convert your GitHub activity into tailored social media posts with one click. Showcase your
              development work, build your developer brand, and engage with the tech community effortlessly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Link href="/signin">
              <Button size="lg" className="bg-white text-black hover:bg-gray-200 font-medium px-8 py-6 text-lg cursor-pointer">
                <Github className="mr-2 h-5 w-5" />
                Get started For Free
              </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-24 px-6 bg-black">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-4xl md:text-5xl font-medium">
              Everything You Need to
              <br />
              <span className="text-gray-400">Amplify Your Code</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto font-medium">
              Powerful features designed to transform your development work into compelling social content
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-gradient-to-b from-zinc-900 to-zinc-950 border-zinc-900 p-8">
              <CardContent className="p-0 space-y-6">
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                  <Github className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-3 text-slate-200">Smart GitHub Integration</h3>
                  <p className="text-gray-400 font-medium leading-relaxed">
                    Seamlessly connect your GitHub account and automatically fetch your latest contributions, commits,
                    and project updates.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-b from-zinc-900 to-zinc-950 border-zinc-900 p-8">
              <CardContent className="p-0 space-y-6">
                <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                  <Zap className="h-6 w-6 text-green-400" />
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-3 text-slate-200">AI-Powered Content Generation</h3>
                  <p className="text-gray-400 font-medium leading-relaxed">
                    Advanced AI analyzes your code changes and generates engaging, contextual posts that highlight your
                    technical achievements.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-b from-zinc-900 to-zinc-950 border-zinc-900 p-8">
              <CardContent className="p-0 space-y-6">
                <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
                  <Twitter className="h-6 w-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-3 text-slate-200">Direct X Publishing</h3>
                  <p className="text-gray-400 font-medium leading-relaxed">
                    Post directly to X (Twitter) with one click. Schedule posts, manage multiple accounts, and track
                    engagement seamlessly.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-b from-zinc-900 to-zinc-950 border-zinc-900 p-8">
              <CardContent className="p-0 space-y-6">
                <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-orange-400" />
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-3 text-slate-200">Analytics & Insights</h3>
                  <p className="text-gray-400 font-medium leading-relaxed">
                    Track post performance, engagement metrics, and audience growth to optimize your developer brand
                    strategy.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-b from-zinc-900 to-zinc-950 border-zinc-900 p-8">
              <CardContent className="p-0 space-y-6">
                <div className="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center">
                  <Clock className="h-6 w-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-3 text-slate-200">Smart Scheduling</h3>
                  <p className="text-gray-400 font-medium leading-relaxed">
                    Automatically schedule posts at optimal times for maximum reach and engagement with your target
                    audience.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-b from-zinc-900 to-zinc-950 border-zinc-900 p-8">
              <CardContent className="p-0 space-y-6">
                <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center">
                  <Shield className="h-6 w-6 text-red-400" />
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-3 text-slate-200">Privacy & Security</h3>
                  <p className="text-gray-400 font-medium leading-relaxed">
                    Enterprise-grade security with granular privacy controls. You decide what gets shared and when.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-4xl md:text-5xl font-medium">
              From Code to Content
              <br />
              <span className="text-gray-400">In Three Simple Steps</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto font-medium">
              Get started in minutes and watch your development work transform into engaging social content
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl font-medium text-blue-400">1</span>
              </div>
              <div>
                <h3 className="text-2xl font-medium mb-4">Connect GitHub</h3>
                <p className="text-gray-400 font-medium leading-relaxed">
                  Link your GitHub account with secure OAuth. VisionPost will automatically sync your repositories and
                  contributions.
                </p>
              </div>
            </div>

            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl font-medium text-green-400">2</span>
              </div>
              <div>
                <h3 className="text-2xl font-medium mb-4">AI Generates Posts</h3>
                <p className="text-gray-400 font-medium leading-relaxed">
                  Our AI analyzes your commits, pull requests, and projects to create tailored, engaging posts that
                  showcase your work.
                </p>
              </div>
            </div>

            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl font-medium text-purple-400">3</span>
              </div>
              <div>
                <h3 className="text-2xl font-medium mb-4">Publish & Engage</h3>
                <p className="text-gray-400 font-medium leading-relaxed">
                  Review, customize, and publish directly to X. Track engagement and build your developer brand
                  effortlessly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-6xl font-medium">
              Ready to Amplify
              <br />
              <span className="text-gray-400">Your Developer Brand?</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto font-medium">
              Join many developers who are already using VisionPost to showcase their work and build their
              professional presence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Link href="/signin">
              <Button size="lg" className="bg-white text-black hover:bg-gray-200 font-medium px-12 py-6 text-lg cursor-pointer">
                <Github className="mr-2 h-5 w-5" />
                Get Started For Free
              </Button>
              </Link>
            </div>
            <p className="text-gray-500 font-medium">No credit card required</p>
          </div>
        </div>
      </section>

      <footer className="border-t border-zinc-800 py-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
              <div className="h-10 w-10 rounded-full overflow-hidden">
                  <Image 
                  src="/logo.jpeg"
                  alt="User Avatar"
                  width={40}
                  height={40}
                  className="object-cover"
                  />
                  </div>
                <span className="text-xl font-medium">VisionPost</span>
              </div>
              <p className="text-gray-400 font-medium">
                Transform your GitHub contributions into engaging social media content.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-4">Product</h4>
              <div className="space-y-2">
                <Link href="/pricing" className="block text-gray-400 hover:text-white font-medium">
                  Pricing
                </Link>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-4">Company</h4>
              <div className="space-y-2">
                <Link href="/about" className="block text-gray-400 hover:text-white font-medium">
                  About
                </Link>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-4">Support</h4>
              <div className="space-y-2">
                <Link href="mailto:visionpost2301@gmail.com" className="block text-gray-400 hover:text-white font-medium">
                  Contact
                </Link>
                <Link href="/privacy" className="block text-gray-400 hover:text-white font-medium">
                  Privacy
                </Link>
                <Link href="/terms" className="block text-gray-400 hover:text-white font-medium">
                  Terms
                </Link>
              </div>
            </div>
          </div>
          <div className="border-t border-zinc-800 mt-12 pt-8 text-center">
            <p className="text-gray-400 font-medium">© {new Date().getFullYear()} VisionPost. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
