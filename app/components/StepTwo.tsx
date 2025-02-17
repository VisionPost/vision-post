"use client";

import { useState } from "react";
import { storeTwitterUserName } from "../onboarding/actions";

export default function StepTwo() {
    const [twitterUsername, setTwitterUsername] = useState<string>("");
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
            <button 
            className="bg-white border-1 text-black rounded-md px-4 mt-2"
            onClick={() => storeTwitterUserName(twitterUsername, 3)}
            >continue</button>
        </div>
    )
}