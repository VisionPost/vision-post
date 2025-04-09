"use client";

import Navbar from "../components/Navbar";
import { Button } from "@/components/ui/button";
import { Loader2, RefreshCw } from "lucide-react";
import { useState } from "react";

export default function Create() {
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
        <div className="min-h-screen text-slate-200">
          <Navbar />
            <main className="container mx-auto py-8">
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="w-full md:w-2/3">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold">Your Contributions</h2>
                            <Button
                            onClick={fetchContributions}
                            disabled={loading}
                            className="bg-slate-200 text-black hover:bg-slate-300 cursor-pointer"
                            >
                            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCw className="mr-2 h-4 w-4" /> }
                            Fetch Contributions
                            </Button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};
