import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Search } from "lucide-react";

export default function Navbar() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-[#000000] backdrop-blur supports-[backdrop-filter]:bg-[#000000]/60">
          <div className="flex h-18 items-center gap-4 px-8">
          <SidebarTrigger className="text-slate-200 cursor-pointer hover:bg-[#1a1a1a] hover:text-slate-300"/>
          <div className="flex flex-1 items-center justify-between gap-2">
           <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-200" />
            <Input 
            placeholder="Search..."
            className="w-[300px] bg-[#1a1a1a] text-slate-200 pl-10 h-10 rounded-lg border-zinc-800 focus-visible:ring-white/20 focus-visible:border-white/20"
            />
           </div>
           <div className="flex items-center">
            <Button
            className="hover:bg-[#1a1a1a] hover:text-white transition-colors"
            >
              Help
            </Button>
           </div>
          </div>
          </div>
        </header>       
    )
};