"use client";

import { useState } from "react";
import { storeTwitterUserName } from "../onboarding/actions";
import { useRouter } from "next/navigation";

export default function StepTwo() {
    const [twitterUsername, setTwitterUsername] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    async function handleSubmit() {
        setError(null);
        const result = await storeTwitterUserName(twitterUsername, 3);

        if(result && !result.success) {
            setError(result.error);
        } else {
            router.push('/onboarding/3')
        }
    };

    return (
        <div className="flex flex-col justify-center items-center">
            <h1 className="mt-10">Enter your X usernmame:</h1>
            <input 
            type="text" 
            value={twitterUsername}
            onChange={(e) => setTwitterUsername(e.target.value)}
            placeholder="@yourtwitterusername"
            className="text-black mt-2"
            />
            {error && <p className="text-red-500 mt-2">{error}</p>}
            <button 
            className="bg-white border-1 text-black rounded-md px-4 mt-2"
            onClick={handleSubmit}
            >continue</button>
        </div>
    )
}