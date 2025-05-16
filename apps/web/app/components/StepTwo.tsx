"use client";

import { useState } from "react";
import { storeTwitterUserName } from "../onboarding/actions";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FaXTwitter } from "react-icons/fa6";
import { ArrowRight } from "lucide-react";

export default function StepTwo() {
    const [twitterUsername, setTwitterUsername] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    async function handleSubmit() {
        const result = await storeTwitterUserName(twitterUsername, 3);

        if(result && !result.success) {
            setError(result.error);
        } else {
            router.push('/onboarding/3')
        }
    };

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="text-center mb-6 space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold text-white">Connect your Twitter</h1>
            <p className="text-xl text-gray-400">Add your Twitter username to enhance your experience</p>
            </div>
            
            <div className="max-w-sm mx-auto w-full space-y-4 mb-6">
              <div className="space-y-2">
                <Label htmlFor="twitter-username" className="text-white font-medium">Twitter Username</Label>
                <div className="relative">
                <FaXTwitter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input 
                id="twitter-username"
                type="text" 
                value={twitterUsername}
                onChange={(e) => setTwitterUsername(e.target.value)}
                placeholder="@yourtwitterusername"
                className="pl-10 bg-black border-gray-700 text-white placeholder:text-gray-500"
                />
                </div>
                {error && <p className="text-red-500 mt-2">{error}</p>}
              </div>
            </div>

            <div className="p-1">
            <button 
            className="bg-blue-600 hover:bg-blue-700 min-w-[300px] md:min-w-[200px] text-white rounded-md flex justify-center items-center py-3 px-5"
            onClick={handleSubmit}
            >Continue
            <ArrowRight className="h-4 w-4 ml-2" />
            </button>
            </div>
        </div>
    )
}