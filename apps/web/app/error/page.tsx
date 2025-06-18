import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ErrorPage() {
  return (
    <div className="min-h-screen bg-black text-white">

      <div className="max-w-2xl mx-auto px-6 py-24">
        <Card className="bg-zinc-950 border-zinc-900">
          <CardHeader className="text-center pb-6">
            <div className="text-8xl font-bold text-gray-600 mb-4">500</div>
            <h1 className="text-3xl font-medium text-white mb-2">Internal Server Error</h1>
            <p className="text-gray-400 text-lg">Something went wrong on our end. Don&apos;t worry, it&apos;s not you it&apos;s us.</p>
          </CardHeader>

          <CardContent className="text-center space-y-6">
            <div className="text-6xl mb-6">🔍</div>

            <div className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
              We&apos;re already looking into it, but here&apos;s what you can try:
              </p>

              <ul className="text-gray-300 text-left space-y-2 max-w-md mx-auto">
                <li>• Try refreshing the page.</li>
                <li>• Check back in a few minutes.</li>
                <li>• Try going back to the home page.</li>
              </ul>
            </div>

            <div className="pt-6">
              <Link href="/">
                <Button
                  size="lg"
                  className="bg-slate-200 hover:bg-slate-300 text-black font-medium px-8 py-3 rounded-lg transition-colors"
                >
                  Go Back Home
                </Button>
              </Link>
            </div>

            <div className="pt-4">
              <p className="text-gray-400 text-sm">
                Need help? Contact us at <span className="text-blue-400">visionpost2301@gmail.com</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
