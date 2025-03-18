"use client";

import { ArrowRight } from "lucide-react";
import { completeOnboarding } from "../onboarding/actions";

export default function StepThree() {
    return (
        <div className="flex flex-col justify-center items-center">
            <div className="text-center mb-6 space-y-6">
                <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight">Ready to launch</h1>
                <p className="text-xl text-gray-400 max-w-lg mx-auto">Your account is ready. Go to the dashboard and create your first post.</p>
            </div>
            
            <div className="p-1">
            <button 
            className="bg-blue-600 hover:bg-blue-700 min-w-[300px] md:min-w-[200px] text-white rounded-md flex justify-center items-center py-3 px-5"
            onClick={completeOnboarding}
            >Go to dashboard
            <ArrowRight className="h-4 w-4 ml-2" />
            </button>
            </div>
        </div>
    )
}