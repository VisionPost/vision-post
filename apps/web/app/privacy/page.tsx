import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function Privacy() {
  return (
    <div className="min-h-screen bg-black text-white">

      <div className="max-w-4xl mx-auto px-6 py-12">
        <Card className="bg-zinc-950 border-zinc-900">
          <CardHeader className="pb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">📄</span>
              <CardTitle className="text-3xl font-medium text-white">VisionPost Privacy Policy</CardTitle>
            </div>
          </CardHeader>

          <CardContent className="space-y-8">
            <section>
              <h2 className="text-xl font-medium text-white mb-4">1. Introduction</h2>
              <p className="text-gray-300 leading-relaxed">
                VisionPost provides a platform that enables users to post content and fetch data
                from their GitHub and Twitter profiles. We respect your privacy and are committed to protecting your
                personal information. This Privacy Policy explains what information we collect, how we use it, and how
                we protect it.
              </p>
            </section>

            <Separator className="bg-zinc-900" />

            <section>
              <h2 className="text-xl font-medium text-white mb-4">2. Information We Collect</h2>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-200 mb-2">Account Data</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Email address, username, and profile photo via GitHub (read:user, user:email, repo, read:org) and
                    Twitter (tweet.read, tweet.write, users.read, offline.access) during OAuth login.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-200 mb-2">Public Profile Data</h3>
                  <ul className="text-gray-300 leading-relaxed space-y-1 ml-4">
                    <li>• GitHub contributions, repos, organizational data.</li>
                    <li>• Twitter profile information and tweet data.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-200 mb-2">Content You Post</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Any text, media, or other content you upload or share using our app&apos;s posting features.
                  </p>
                </div>
              </div>
            </section>

            <Separator className="bg-zinc-900" />

            <section>
              <h2 className="text-xl font-medium text-white mb-4">3. How We Use Your Data</h2>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-200 mb-2">Core Features</h3>
                  <ul className="text-gray-300 leading-relaxed space-y-1 ml-4">
                    <li>• Enable login and register features via GitHub and/or Twitter.</li>
                    <li>• Read profile information to fetch contributions, organization, and tweet data.</li>
                    <li>• Allow posting directly from our platform to your connected social accounts.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-200 mb-2">Analytics & Improving Experience</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Collect anonymized usage data to identify and fix bugs, enhance features, and improve service
                    performance.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-200 mb-2">Support</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Respond to user inquiries to our support email:{" "}
                    <span className="text-blue-400">visionpost2301@gmail.com</span>.
                  </p>
                </div>
              </div>
            </section>

            <Separator className="bg-zinc-900" />

            <section>
              <h2 className="text-xl font-medium text-white mb-4">4. Data Sharing & Disclosure</h2>
              <ul className="text-gray-300 leading-relaxed space-y-2 ml-4">
                <li>• We do not sell or rent your personal data.</li>
                <li>
                  • We may share your information with third party service providers (e.g., hosting, analytics) on a
                  need to know basis to support our operations.
                </li>
                <li>• We may be required to disclose your information if legally obligated (e.g., court order).</li>
              </ul>
            </section>

            <Separator className="bg-zinc-900" />

            <section>
              <h2 className="text-xl font-medium text-white mb-4">5. Data Retention</h2>
              <ul className="text-gray-300 leading-relaxed space-y-2 ml-4">
                <li>• We retain your account and content data as long as your account is active.</li>
                <li>
                  • You may request deletion of your account and personal data by contacting us at{" "}
                  <span className="text-blue-400">visionpost2301@gmail.com</span>.
                </li>
              </ul>
            </section>

            <Separator className="bg-zinc-900" />

            <section>
              <h2 className="text-xl font-medium text-white mb-4">6. Security</h2>
              <p className="text-gray-300 leading-relaxed">
                We implement appropriate technical and organizational measures to protect your personal data, including
                secure servers and encrypted communications (HTTPS/TLS).
              </p>
            </section>

            <Separator className="bg-zinc-900" />

            <section>
              <h2 className="text-xl font-medium text-white mb-4">7. Third Party Links</h2>
              <p className="text-gray-300 leading-relaxed">
                Our service may contain links to third party websites. We aren&apos;t responsible for their privacy
                practices. Please review their own policies.
              </p>
            </section>

            <Separator className="bg-zinc-900" />

            <section>
              <h2 className="text-xl font-medium text-white mb-4">8. Children&apos;s Privacy</h2>
              <p className="text-gray-300 leading-relaxed">
                VisionPost is not intended for children under 13. If you suspect we&apos;ve collected their info, contact us
                and we`&apos;`ll delete it upon verification.
              </p>
            </section>

            <Separator className="bg-zinc-900" />

            <section>
              <h2 className="text-xl font-medium text-white mb-4">9. Your Rights</h2>
              <p className="text-gray-300 leading-relaxed mb-3">
                Depending on your location, you may have the right to:
              </p>
              <ul className="text-gray-300 leading-relaxed space-y-1 ml-4">
                <li>• Access, correct, or delete your personal data.</li>
                <li>• Withdraw your consent at any time.</li>
                <li>• Lodge a complaint with a data protection authority.</li>
              </ul>
            </section>

            <Separator className="bg-zinc-900" />

            <section>
              <h2 className="text-xl font-medium text-white mb-4">10. Changes to This Policy</h2>
              <p className="text-gray-300 leading-relaxed">
                We may update this Privacy Policy to reflect changes in our practices or legal obligations. We&apos;ll notify
                you by posting the new policy on this page or via email.
              </p>
            </section>

            <Separator className="bg-zinc-900" />

            <section>
              <h2 className="text-xl font-medium text-white mb-4">11. Contact Us</h2>
              <p className="text-gray-300 leading-relaxed">
                For questions about this policy or your data rights, email us at{" "}
                <span className="text-blue-400">visionpost2301@gmail.com</span>.
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
