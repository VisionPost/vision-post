"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Check, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

type billingFormPayload = {
  fullName: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
};

export default function Pricing() {
  const { status } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fullName, setFullName] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [country, setCountry] = useState<'US'|'CA'|'UK'|'AU'|'IN'>('US');

  const router = useRouter();
  
  const features = [
    {
      name: "GitHub Integration",
      free: true,
      pro: true,
    },
    {
      name: "Twitter Integration",
      free: true,
      pro: true,
    },
    {
      name: "Basic Post Generation",
      free: true,
      pro: true,
    },
    {
      name: "Posts per Month",
      free: "10 posts",
      pro: "Unlimited",
    },
    {
      name: "AI-Powered Content Enhancement",
      free: false,
      pro: true,
    },
    {
      name: "Advanced Analytics",
      free: false,
      pro: true,
    },
    {
      name: "Priority Support",
      free: false,
      pro: true,
    },
  ];

  const handleSubscribe = async (payload: billingFormPayload) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/payments/checkout/subscription`, {
        method: "POST",
        credentials: "include",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      console.log(data);
      router.push(data.payment_link);
    } catch (e) {
      console.error("Error subscribing:", e);
    }
  };

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
              {status === "authenticated" ? (
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

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-medium text-white mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Choose the plan that fits your needs. Start free and upgrade when you&apos;re ready to unlock more features.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          <Card className="bg-black border-zinc-800 relative">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl font-medium text-white mb-2">Free</CardTitle>
              <div className="mb-4">
                <span className="text-4xl font-medium text-white">$0</span>
                <span className="text-gray-400 font-medium">/month</span>
              </div>
              <p className="text-gray-400">Perfect for getting started</p>
            </CardHeader>

            <CardContent className="space-y-6">
              <ul className="space-y-4">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    {feature.free === true ? (
                      <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                    ) : feature.free === false ? (
                      <X className="w-5 h-5 text-gray-600 flex-shrink-0" />
                    ) : (
                      <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                    )}
                    <span className={`font-medium ${feature.free === false ? "text-gray-600" : "text-gray-300"}`}>
                      {feature.name}
                      {typeof feature.free === "string" && <span className="text-gray-400 ml-2">({feature.free})</span>}
                    </span>
                  </li>
                ))}
              </ul>

              <Button 
              className="w-full bg-slate-200 hover:bg-slate-300 text-black font-medium py-3 mt-8"
              onClick={() => {
                if(status !== "authenticated") {
                  signIn("github", { callbackUrl: "/dashboard" });
                } else {
                  router.push("/dashboard");
                }
              }}
              >
                Get Started Free
              </Button>
            </CardContent>
          </Card>

          {/* Pro Tier */}
          <Card className="bg-zinc-900/50 border-slate-200  relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-slate-200 text-black font-medium px-4 py-1">Most Popular</Badge>
            </div>

            <CardHeader className="text-center pb-8 pt-8">
              <CardTitle className="text-2xl font-medium text-white mb-2">Pro</CardTitle>
              <div className="mb-4">
                <span className="text-4xl font-medium text-white">$15</span>
                <span className="text-gray-400 font-medium">/month</span>
              </div>
              <p className="text-gray-400">For senior developers</p>
            </CardHeader>

            <CardContent className="space-y-6">
              <ul className="space-y-4">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    {feature.pro === true ? (
                      <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                    ) : feature.pro === false ? (
                      <X className="w-5 h-5 text-gray-600 flex-shrink-0" />
                    ) : (
                      <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                    )}
                    <span className={`font-medium ${feature.pro === false ? "text-gray-600" : "text-gray-300"}`}>
                      {feature.name}
                      {typeof feature.pro === "string" && feature.pro !== feature.name && (
                        <span className="text-gray-400 ml-2">({feature.pro})</span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>

              <Button 
              className="w-full bg-slate-200 hover:bg-slate-300 text-black font-medium py-3 mt-8"
              onClick={() => {
                if(status !== "authenticated") {
                  signIn("github", { callbackUrl: "/pricing" })
                } else {
                  setIsModalOpen(true);
                }
              }}
              >
                Upgrade to Pro
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-zinc-950 border-zinc-800 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-medium text-white mb-2">Billing Information</DialogTitle>
            <p className="text-gray-400">Please enter your billing details.</p>
          </DialogHeader>

          <form className="space-y-6 mt-6">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-white font-medium">
                Full Name
              </Label>
              <Input
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="John Doe"
                className="bg-zinc-900 border-zinc-800 text-white placeholder:text-gray-500 focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="streetAddress" className="text-white font-medium">
                Street Address
              </Label>
              <Input
                id="streetAddress"
                value={streetAddress}
                onChange={(e) => setStreetAddress(e.target.value)}
                placeholder="123 Main St"
                className="bg-zinc-800 border-zinc-700 text-white placeholder:text-gray-500 focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city" className="text-white font-medium">
                  City
                </Label>
                <Input
                  id="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="New York"
                  className="bg-zinc-900 border-zinc-800 text-white placeholder:text-gray-500 focus:border-blue-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state" className="text-white font-medium">
                  State / Province
                </Label>
                <Input
                  id="state"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  placeholder="NY"
                  className="bg-zinc-900 border-zinc-900 text-white placeholder:text-gray-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="zipCode" className="text-white font-medium">
                  ZIP / Postal Code
                </Label>
                <Input
                  id="zipCode"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  placeholder="10001"
                  className="bg-zinc-800 border-zinc-700 text-white placeholder:text-gray-500 focus:border-blue-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country" className="text-white font-medium">
                  Country
                </Label>
                <Select
                name="country"
                value={country}
                onValueChange={(val) => setCountry(val as 'US'|'CA'|'UK'|'AU'|'IN')}
                >
                  <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white focus:border-blue-500">
                    <SelectValue placeholder="United States of America" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-800 border-zinc-700">
                    <SelectItem value="US" className="text-white hover:bg-zinc-700">
                      United States of America
                    </SelectItem>
                    <SelectItem value="CA" className="text-white hover:bg-zinc-700">
                      Canada
                    </SelectItem>
                    <SelectItem value="UK" className="text-white hover:bg-zinc-700">
                      United Kingdom
                    </SelectItem>
                    <SelectItem value="AU" className="text-white hover:bg-zinc-700">
                      Australia
                    </SelectItem>
                    <SelectItem value="IN" className="text-white hover:bg-zinc-700">
                      India
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gray-200 hover:bg-gray-300 text-black font-medium py-3 mt-8"
              onClick={(e) => {
                e.preventDefault();
                const payload = {
                  fullName,
                  streetAddress,
                  city,
                  state,
                  zipCode,
                  country
                };
                console.log("Billing details submitted", payload);
                handleSubscribe(payload);
                setIsModalOpen(false);
              }}
            >
              Submit Billing Details
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
