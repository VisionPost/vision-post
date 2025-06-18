import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function About() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Card className="bg-zinc-900 border-zinc-900">
          <CardHeader className="pb-8">
            <CardTitle className="text-3xl font-medium text-white">About VisionPost</CardTitle>
          </CardHeader>

          <CardContent className="space-y-8">
            <section>
              <p className="text-gray-300 leading-relaxed text-lg mb-6">
                VisionPost is a platform built to help developers effortlessly share their work, insights, and progress
                on social media — without breaking their flow.
              </p>
              <p className="text-gray-300 leading-relaxed mb-6">
                We integrate directly with your GitHub and Twitter accounts to fetch your contributions, repositories,
                and recent activity. Then, we help you turn those updates into meaningful, visually compelling posts
                that grow your online presence and technical brand.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Whether you&apos;re shipping code, fixing bugs, or learning something new — VisionPost lets you showcase it
                with just a few clicks.
              </p>
            </section>

            <Separator className="bg-zinc-900" />

            <section>
              <div className="flex items-center mb-6">
                <h2 className="text-xl font-medium text-white">Key Features</h2>
              </div>

              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-200 mb-1">Smart Post Generation</h3>
                    <p className="text-gray-300 leading-relaxed">
                      Turn your GitHub activity into share-worthy tweets and posts
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-200 mb-1">One-click Social Sharing</h3>
                    <p className="text-gray-300 leading-relaxed">Seamlessly post to Twitter from within the app</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-200 mb-1">Developer-first Design</h3>
                    <p className="text-gray-300 leading-relaxed">No fluff, just a clean workflow built for engineers</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-200 mb-1">Personalized Voice</h3>
                    <p className="text-gray-300 leading-relaxed">
                      Customize tone and style to match your online persona
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <Separator className="bg-zinc-000" />

            <section>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">📫</span>
                <h2 className="text-xl font-medium text-white">Contact Us</h2>
              </div>

              <div className="space-y-4">
                <p className="text-gray-300 leading-relaxed">Have feedback, suggestions, or questions?</p>
                <p className="text-gray-300 leading-relaxed">
                  We&apos;d love to hear from you — reach out at{" "}
                  <span className="text-blue-400">visionpost2301@gmail.com</span>.
                </p>
              </div>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
