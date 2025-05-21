import { Card } from "@/components/ui/card";
import { User } from "lucide-react";

export default function Settings() {
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

        <Card className="bg-gradient-to-b from-zinc-900 to-zinc-950 border-zinc-800 ">
        
        </Card> 
        </section> 
        </div>
    );
};