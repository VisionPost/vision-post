"use client";

import { updateStep } from "../onboarding/actions";

export default function StepOne() {
    return (
        <div className="flex flex-col justify-center items-center">
            <h1 className="mt-20">Welcome</h1>
            <button 
            className="bg-white border-1 text-black rounded-md px-4"
            onClick={() => updateStep(2)}
            >Get Started</button>
        </div>
    )
}