"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Github, LayoutGrid, LogOut, Upload, User, X } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FaXTwitter } from "react-icons/fa6";

export default function Settings() {
    const {data: session, status} = useSession();

    const avatarUrl = session?.user.image ?? "/globe.svg";

    const [twitterConnected, settwitterConnected] = useState(false);

    useEffect(() => {
        if(status === "authenticated" && session?.user.x_userName) {
            settwitterConnected(true);
        };
    }, [session, status]);

    const handleConnectTwitter = async () => {
        const width = 600;
        const height = 700;
        const left = window.screenX + (window.innerWidth - width) / 2;
        const top = window.screenY + (window.innerHeight - height) / 2;
      
        window.open(
          "/twitter-popup", 
          "TwitterAuth",
          `width=${width},height=${height},left=${left},top=${top}`
        );
      };

      useEffect(() => {
        function handleMessage(event: MessageEvent) {
          if (
            event.origin === window.location.origin &&
            event.data === "twitter-connected"
          ) {
            settwitterConnected(true);
          }
        }
      
        window.addEventListener("message", handleMessage);
        return () => window.removeEventListener("message", handleMessage);
      }, []);
      
    return (
        <div className="p-6 max-w-4xl mx-auto">
         <div className="flex items-center justify-start mb-8">
            <h1 className="text-2xl font-medium text-slate-200">Settings</h1>
         </div>    

        <section className="mb-10">
         <div className="flex items-center gap-2 mb-4">
          <User className="w-5 h-5 text-zinc-400" />
          <h2 className="text-lg text-slate-200 font-medium">Account Profile</h2>
         </div>

        <Card className="bg-gradient-to-b from-zinc-900 to-zinc-950 border-zinc-800 overflow-hidden">
         <CardContent className="p-5 pt-0">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex flex-col items-center gap-3">
             <Avatar className="w-24 h-24 border-4 border-black ring-2 ring-zinc-700 shadow-xl">
              <AvatarImage src={avatarUrl} alt="logo" />
              <AvatarFallback className="bg-gradient-to-br from-zinc-700 to-zinc-900">
                {session?.user.name?.substring(0,2)}
              </AvatarFallback>   
             </Avatar>
             <Button 
             variant="outline"
             size="sm"
             className="w-full gap-1.5 text-slate-200 bg-zinc-950 border-zinc-700 hover:bg-zinc-800 hover:text-slate-200">
              <Upload className="w-3.5 h-3.5" />
              Upload photo
             </Button>
            </div>

            <div className="flex-1 space-y-5 pt-4">
             <div>
              <Label className="text-sm text-zinc-400 mb-1 block">Display Name</Label>
              <p className="font-medium text-lg text-slate-200">{session?.user.githubUsername}</p>
             </div>
             <div>
              <Label className="text-sm text-zinc-400 mb-1 block">Email</Label>
              <p className="font-medium text-slate-200">{session?.user.email}</p>
             </div>

             <div className="pt-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-800/50 text-zinc-300 text-sm">
                <Github className="w-3.5 h-3.5" />
                Authenticated via Github
              </div>
             </div>
            </div>
          </div>
         </CardContent>
        </Card> 
        </section>
         
        <section className="mb-10">
         <div className="flex items-center gap-2 mb-4">
          <LayoutGrid className="w-5 h-5 text-zinc-400" />
          <h2 className="text-lg font-medium text-slate-200">Connected apps</h2>
         </div>

         <Card className="bg-gradient-to-b from-zinc-900 to-zinc-950 border-zinc-800 overflow-hidden">
            <CardContent>
             <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
               <div className="flex h-14 w-14 items-center justify-center rounded-full bg-zinc-950 text-slate-200 border-2 border-zinc-700">
                <FaXTwitter size={24} />
               </div>
               <div>
                <h3 className="font-medium text-lg text-slate-200">Twitter</h3>
                {twitterConnected ? (
                <div className="flex items-center gap-1.5 text-green-400 text-sm mt-1">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Connected</span>
                </div>
                ) : (
                <div className="flex items-center gap-1.5 text-zinc-400 text-sm mt-1">
                  <X className="w-3.5 h-3.5" />
                  <span>Not connected</span>
                </div>
                )}
               </div>
              </div>
              <Button
              onClick={handleConnectTwitter}
              variant="outline"
              className="bg-zinc-950 text-slate-200 border-zinc-800 hover:bg-zinc-800 hover:text-slate-200"
              >
                {twitterConnected ? "Refresh Credentials" : "Connect Twitter"}
              </Button>
             </div>
          </CardContent>
         </Card>
        </section>

        <section>
         <Card className="bg-gradient-to-b from-zinc-900 to-zinc-950 border-zinc-800">
          <CardContent>
           <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
           <div>
             <h3 className="font-medium text-lg text-slate-200">Sign Out</h3>
             <p className="text-sm text-zinc-400 mt-1">Sign out from your account</p>
            </div>
            <Button
            onClick={() => signOut()}
            variant="destructive"
            className="gap-2 bg-red-900/50 hover:bg-red-900 text-white border border-red-800/50"
            >
             <LogOut className="w-4 h-4" />
             Sign Out
            </Button>
           </div>
          </CardContent>
         </Card>    
        </section>
        </div>
    );
};