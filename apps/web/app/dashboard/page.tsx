import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarProvider,
    SidebarTrigger,
    SidebarFooter,
} from "@/components/ui/sidebar"

import {
    Bell,
    ChevronDown,
    BrainCircuit,
    Home,
    FilePlus,
    CreditCard,
    Layout,
    LineChart,
    MessageSquare,
    Plus,
    Search,
    Settings,
    Users,
} from "lucide-react"  
import { getServerSession } from "next-auth"
import Image from "next/image"
import Link from "next/link"
import { authOptions } from "../lib/auth"

export default async function Dashboard() {
    const session = await getServerSession(authOptions);
    const avatarUrl = session?.user.image ?? "/logo.png";

    return (
        <div>
        <SidebarProvider>
         <div className="flex min-h-screen bg-[#000000] text-slate-200">
          <Sidebar className="border-r border-zinc-800 bg-[#000000]">
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
              <span className="font-medium tracking-wider text-xl text-slate-200">VisionPost</span>
             </div>
            </SidebarHeader>
            <SidebarContent className="px-3 py-6 bg-[#000000]">
             <SidebarMenu className="space-y-1.5">
              <SidebarMenuItem>
               <SidebarMenuButton className="flex items-center w-full gap-3 px-3 py-2.5 rounded-sm text-slate-200 bg-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-slate-200" asChild>
                <Link href="/dashboard">
                 <Home className="h-4 w-4" />
                 <span className="font-medium">Dashboard</span>
                </Link>
               </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
               <SidebarMenuButton className="flex items-center w-full gap-3 rounded-sm px-3 py-2.5 text-slate-200 hover:bg-[#1a1a1a] hover:text-slate-200" asChild>
                <Link href="/create">
                 <FilePlus className="h-4 w-4" />
                 <span className="font-medium">Create</span>
                </Link>
               </SidebarMenuButton> 
              </SidebarMenuItem>
              <SidebarMenuItem>
               <SidebarMenuButton className="flex items-center w-full gap-3 rounded-sm px-3 py-2.5 text-slate-200 hover:bg-[#1a1a1a] hover:text-slate-200" asChild>
                <Link href="/refine">
                 <BrainCircuit className="h-4 w-4" />
                 <span className="font-medium">Refine</span>
                </Link>
               </SidebarMenuButton> 
              </SidebarMenuItem>
              <SidebarMenuItem>
               <SidebarMenuButton className="flex items-center w-full gap-3 rounded-sm px-3 py-2.5 text-slate-200 hover:bg-[#1a1a1a] hover:text-slate-200" asChild>
                <Link href="/billing">
                 <CreditCard className="h-4 w-4" />
                 <span className="font-medium">Billing</span>
                </Link>
               </SidebarMenuButton> 
              </SidebarMenuItem>
              <SidebarMenuItem>
               <SidebarMenuButton className="flex items-center w-full gap-3 rounded-sm px-3 py-2.5 text-slate-200 hover:bg-[#1a1a1a] hover:text-slate-200" asChild>
                <Link href="/settings">
                 <Settings className="h-4 w-4" />
                 <span className="font-medium">Settings</span>
                </Link>
               </SidebarMenuButton> 
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
                <span className="text-sm font-medium text-slate-200">{session?.user.name}</span>
                <span className="text-xs text-[#888888]">{session?.user.email}</span>
               </div>
              </div>
             </div>
            </SidebarFooter>
          </Sidebar>
         </div>
        </SidebarProvider>  
        </div>
    )
};