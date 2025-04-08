"use client";

import { Button } from "@/components/ui/button";
import { Loader2, RefreshCw } from "lucide-react";
import { useState } from "react";

export default function FetchContribs() {
    const [loading, setLoading] = useState(false);

    const fetchContributions = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/fetch-contributions`, { 
                method: "GET",
                credentials: "include",
            });
    
            const data = await response.json();
       
            if(!response.ok) {
                console.log("Error fetching commits: ", data.error);
                return;
            };
    
            console.log("Commits received:", data);
    
        } catch (error) {
            console.error("Error fetching commits: ", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button
        onClick={fetchContributions}
        disabled={loading}
        className="bg-slate-200 text-black hover:bg-slate-300 cursor-pointer"
        >
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCw className="mr-2 h-4 w-4" /> }
            Fetch Contributions
        </Button>
    );
};