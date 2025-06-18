import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function Terms() {
  return (
    <div className="min-h-screen bg-black text-white">

      <div className="max-w-4xl mx-auto px-6 py-12">
        <Card className="bg-zinc-950 border-zinc-900">
          <CardHeader className="pb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">🔐</span>
              <CardTitle className="text-3xl font-medium text-white">VisionPost Terms of Service</CardTitle>
            </div>
          </CardHeader>

          <CardContent className="space-y-8">
            <section>
              <h2 className="text-xl font-medium text-white mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-300 leading-relaxed">
                By accessing or using VisionPost services, you agree to these Terms of Service. If you
                use the Services on behalf of an organization, you agree both personally and on behalf of that
                organization.
              </p>
            </section>

            <Separator className="bg-zinc-900" />

            <section>
              <h2 className="text-xl font-medium text-white mb-4">2. Eligibility</h2>
              <p className="text-gray-300 leading-relaxed">
                You must be 13 years or older and agree to abide by all applicable laws. The Service is not intended for
                users younger than 13.
              </p>
            </section>

            <Separator className="bg-zinc-900" />

            <section>
              <h2 className="text-xl font-medium text-white mb-4">3. Account Registration</h2>
              <div className="space-y-4">
                <p className="text-gray-300 leading-relaxed">You must log in via GitHub or Twitter OAuth.</p>

                <p className="text-gray-300 leading-relaxed">
                  You grant VisionPost permission to access profile data and permissions as listed:
                </p>

                <ul className="text-gray-300 leading-relaxed space-y-2 ml-4">
                  <li>
                    • <strong className="text-gray-200">GitHub:</strong> read:user, user:email, repo, read:org (for
                    logins, profile & contributions)
                  </li>
                  <li>
                    • <strong className="text-gray-200">Twitter:</strong> tweet.read, tweet.write, users.read,
                    offline.access (for tweeting and reading profile/tweet data)
                  </li>
                </ul>

                <p className="text-gray-300 leading-relaxed">
                  You&apos;re responsible for maintaining the confidentiality of your account and not allowing unauthorized
                  access.
                </p>
              </div>
            </section>

            <Separator className="bg-zinc-900" />

            <section>
              <h2 className="text-xl font-medium text-white mb-4">4. User Content</h2>
              <ul className="text-gray-300 leading-relaxed space-y-2 ml-4">
                <li>
                  • You are solely responsible for any text, posts, tweets, or other content you post on or through our
                  Service.
                </li>
                <li>
                  • You grant VisionPost a royalty-free license to use, reproduce, distribute, and display your content
                  solely in connection with the Service.
                </li>
              </ul>
            </section>

            <Separator className="bg-zinc-900" />

            <section>
              <h2 className="text-xl font-medium text-white mb-4">5. Permitted Use</h2>
              <div className="space-y-4">
                <p className="text-gray-300 leading-relaxed">
                  You may use the Service to view your developer contributions and post content to GitHub/Twitter.
                </p>

                <div>
                  <p className="text-gray-300 leading-relaxed mb-2">Prohibited activities include:</p>
                  <ul className="text-gray-300 leading-relaxed space-y-1 ml-4">
                    <li>• Posting harmful, illegal, or offensive content</li>
                    <li>• Attempting to bypass any security or usage limitations</li>
                    <li>• Harassing, defaming, or impersonating others</li>
                  </ul>
                </div>
              </div>
            </section>

            <Separator className="bg-zinc-900" />

            <section>
              <h2 className="text-xl font-medium text-white mb-4">6. Privacy & Data</h2>
              <p className="text-gray-300 leading-relaxed">
                Your use of the Service is also governed by our Privacy Policy, which explains how we handle your data.
                You agree to that policy by continuing to use this service.
              </p>
            </section>

            <Separator className="bg-zinc-900" />

            <section>
              <h2 className="text-xl font-medium text-white mb-4">7. Third Party Services</h2>
              <p className="text-gray-300 leading-relaxed">
                We use your GitHub and Twitter credentials. For actions on your behalf, your account credentials and
                permissions are handled securely through OAuth. We are not responsible for actions taken by those
                platforms.
              </p>
            </section>

            <Separator className="bg-zinc-900" />

            <section>
              <h2 className="text-xl font-medium text-white mb-4">8. Disclaimers & Limitations</h2>
              <ul className="text-gray-300 leading-relaxed space-y-3 ml-4">
                <li>
                  • <strong className="text-gray-200">&quot;As Is&quot; Service</strong>We do not guarantee the Service will be
                  uninterrupted, secure, or error-free.
                </li>
                <li>
                  • <strong className="text-gray-200">No Warranty</strong>We disclaim all warranties, express or
                  implied, including merchantability or fitness for a particular purpose.
                </li>
                <li>
                  • <strong className="text-gray-200">Limitation of Liability</strong>Under no circumstances will
                  VisionPost be liable for any indirect, incidental, consequential, or punitive damages arising from
                  your use of the Service.
                </li>
              </ul>
            </section>

            <Separator className="bg-zinc-900" />

            <section>
              <h2 className="text-xl font-medium text-white mb-4">9. Termination</h2>
              <p className="text-gray-300 leading-relaxed">
                We may suspend or terminate your account at any time for violations. You may also delete your account by
                contacting <span className="text-blue-400">visionpost2301@gmail.com</span>.
              </p>
            </section>

            <Separator className="bg-zinc-900" />

            <section>
              <h2 className="text-xl font-medium text-white mb-4">10. Changes to Terms</h2>
              <p className="text-gray-300 leading-relaxed">
                We may modify these Terms at any time. If changes are material, we&apos;ll notify you by posting or emailing
                30 days prior. Continued use after changes means you accept the new Terms.
              </p>
            </section>

            <Separator className="bg-zinc-900" />

            <section>
              <h2 className="text-xl font-medium text-white mb-4">11. Governing Law</h2>
              <p className="text-gray-300 leading-relaxed">
                These Terms are governed by the laws without regard to conflict rules. You
                consent to exclusive jurisdiction of courts in that jurisdiction.
              </p>
            </section>

            <Separator className="bg-zinc-900" />

            <section>
              <h2 className="text-xl font-medium text-white mb-4">12. Contact</h2>
              <p className="text-gray-300 leading-relaxed">
                Questions, feedback, or notices regarding these Terms should be sent to:{" "}
                <span className="text-blue-400">visionpost2301@gmail.com</span>
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
