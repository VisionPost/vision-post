"use client";

import { completeOnboarding } from "../onboarding/actions";

export default function StepThree() {
    return (
        <div className="flex flex-col justify-center items-center">
            <h1 className="mt-10">All done!</h1>
            <button 
            className="bg-white border-1 text-black rounded-md px-4"
            onClick={completeOnboarding}
            >Launch workspace</button>
        </div>
    )
}