"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, ArrowRight, RefreshCw, XCircle } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function PaymentReturn() {
  const searchParams = useSearchParams();

  const status = searchParams.get('status');

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-2xl mx-auto px-6 py-16">
        {status === "active" ? (
          <div>
          <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
          </div>

          <h1 className="text-4xl font-medium text-white mb-4">Payment Successful!</h1>

          <p className="text-xl text-gray-400 mb-8">
            Thank you for upgrading to VisionPost Pro. Your account has been successfully upgraded.
          </p>
        </div>

        <Card className="bg-zinc-900/50 border-zinc-800 mb-8">
          <CardHeader>
            <CardTitle className="text-white text-center">What&apos;s Next?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center text-gray-300">
              <p className="mb-4">You now have access to all Pro features including:</p>
              <ul className="text-left space-y-2 max-w-md mx-auto">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <span>Unlimited posts per month</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <span>AI-Powered Content Enhancement</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <span>Advanced Analytics</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <span>Priority Support</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <div className="text-center space-y-4">
          <Link href="/dashboard">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 text-lg cursor-pointer">
              Go to Dashboard
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>

          <div className="text-gray-400 text-sm mt-5">
            <p>
              Need help getting started?
              <Link href="mailto:visionpost2301@gmail.com" className="text-blue-400 hover:text-blue-300 underline">
                contact support
              </Link>
              .
            </p>
          </div>
        </div>
          </div>
        ) : status === "failed" ? (
           <div>
          <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center">
              <XCircle className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-medium text-white mb-4">Payment Failed</h1>
          <p className="text-xl text-gray-400 mb-8">
            We couldn&apios;t process your payment. Don&apos;t worry, no charges were made to your account.
          </p>
        </div>

        <Card className="bg-zinc-900/50 border-zinc-800 mb-8">
          <CardHeader>
            <CardTitle className="text-white text-center">Common Issues & Solutions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center text-gray-300">
              <p className="mb-4">Here are some common reasons why payments fail:</p>
              <ul className="text-left space-y-2 max-w-md mx-auto">
                <li className="flex items-center gap-3">
                  <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                  <span>Insufficient funds in your account</span>
                </li>
                <li className="flex items-center gap-3">
                  <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                  <span>Incorrect card details or expired card</span>
                </li>
                <li className="flex items-center gap-3">
                  <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                  <span>Bank declined the transaction</span>
                </li>
                <li className="flex items-center gap-3">
                  <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                  <span>Network or connectivity issues</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <div className="text-center space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/pricing">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 text-lg cursor-pointer">
                Try Again
                <RefreshCw className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-800 font-medium px-8 py-3 text-lg cursor-pointer bg-transparent"
              >
                Go to Dashboard
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>

          <div className="text-gray-400 text-sm mt-5">
            <p>
              Still having trouble?{" "}
              <Link href="mailto:visionpost2301@gmail.com" className="text-blue-400 hover:text-blue-300 underline">
                contact support
              </Link>{" "}
              and we&apos;ll help you get set up.
            </p>
          </div>
        </div>
           </div>
        ) : (
          <div className="flex flex-col justify-center items-center">
          <p className="text-xl text-gray-400 mb-8">
            Payment is still processing, pending, cancelled or expired...
          </p>
          <Link href="/dashboard">
            <Button
              variant="outline"
              className="border-0 text-gray-300 hover:text-gray-300 bg-blue-600 hover:bg-blue-700 font-medium px-8 py-3 text-lg cursor-pointer"
            >
              Go to Dashboard
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>    
          </div>
        )}
      </div>
    </div>
  )
}
