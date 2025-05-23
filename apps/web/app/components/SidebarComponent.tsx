"use client";

import { BrainCircuit, Home, FilePlus, CreditCard, Settings } from "lucide-react";
import Image from "next/image";
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarFooter,
} from "@/components/ui/sidebar";
import { SidebarLink } from "./SidebarLink";
import { useSession } from "next-auth/react";

export default function SidebarComponent() {
    const session = useSession();
    const avatarUrl = session.data?.user.image ?? "/logo.png";

    return(
          <Sidebar className="border-r border-zinc-800 bg-[#000000] h-full">
            <SidebarHeader className="border-b border-zinc-800 p-4 bg-[#000000]">
             <div className="flex items-center gap-2">
             <div className="h-10 w-10 rounded-full overflow-hidden">
               <Image 
                src="/logo.jpeg"
                alt="User Avatar"
                width={40}
                height={40}
                className="object-cover"
                />
               </div>  
              <span className="bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text font-medium tracking-wider text-xl">VisionPost</span>
             </div>
            </SidebarHeader>
            <SidebarContent className="px-3 py-6 bg-[#000000]">
             <SidebarMenu className="space-y-1.5">
              <SidebarMenuItem>
               <SidebarLink href="/dashboard" icon={Home}>
                Dashboard
               </SidebarLink>
              </SidebarMenuItem>
              <SidebarMenuItem>
               <SidebarLink href="/dashboard/create" icon={FilePlus}>
                Create
               </SidebarLink> 
              </SidebarMenuItem>
              <SidebarMenuItem>
               <SidebarLink href="/dashboard/refine" icon={BrainCircuit}>
                Refine
               </SidebarLink> 
              </SidebarMenuItem>
              <SidebarMenuItem>
               <SidebarLink href="/dashboard/billing" icon={CreditCard}>
                Billing
               </SidebarLink> 
              </SidebarMenuItem>
              <SidebarMenuItem>
               <SidebarLink href="/dashboard/settings" icon={Settings}>
                Settings
               </SidebarLink> 
              </SidebarMenuItem>
             </SidebarMenu>     
            </SidebarContent>
            <SidebarFooter className="border-t border-zinc-800 p-4 bg-[#000000]">
             <div className="flex items-center">
              <div className="flex items-center gap-3">
               <div className="h-10 w-10 rounded-full overflow-hidden">
               <Image 
                src={avatarUrl}
                alt="User Avatar"
                width={40}
                height={40}
                className="object-cover"
                />
               </div> 
               <div className="flex flex-col">
                <span className="text-sm font-medium text-slate-200">{session.data?.user.name}</span>
                <span className="text-xs text-[#888888]">{session.data?.user.email}</span>
               </div>
              </div>
             </div>
            </SidebarFooter>
          </Sidebar> 
    );
};