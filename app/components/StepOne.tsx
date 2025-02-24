"use client";

import { ArrowRight } from "lucide-react";
import { updateStep } from "../onboarding/actions";

export default function StepOne() {
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="space-y-6 text-center mb-8 text-white">
            <h1 className="text-5xl md:text-6xl text-center font-bold tracking-tight">Welcome to VisionPost</h1>
            <p className="text-xl text-gray-400 max-w-lg mx-auto">Let's get started with setting up your workspace for success.</p>
            </div>
            <div className="p-1">
            <button 
            className="bg-blue-600 border-1 hover:bg-blue-700 min-w-[300px] md:min-w-[200px] text-white rounded-md flex justify-center items-center py-3 px-5"
            onClick={() => updateStep(2)}
            >Get Started
            <ArrowRight className="h-4 w-4 ml-2" />
            </button>
            </div>
        </div>
    )
}