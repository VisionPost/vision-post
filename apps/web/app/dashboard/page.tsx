import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarProvider,
    SidebarTrigger,
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
import Link from "next/link"

export default function Dashboard() {
    return (
        <div>
        <SidebarProvider>
         <div className="flex min-h-screen bg-[#000000] text-slate-200">
          <Sidebar className="border-r border-zinc-800 bg-[#000000]">
            <SidebarHeader className="border-b border-zinc-800 p-4 bg-[#000000]">
             <div className="flex items-center gap-2">
              <span className="font-bold text-xl text-slate-200">VisionPost</span>
             </div>
            </SidebarHeader>
            <SidebarContent className="px-3 py-6 bg-[#000000]">
             <SidebarMenu className="space-y-1.5">
              <SidebarMenuItem>
               <SidebarMenuButton className="w-full" asChild>
                <Link href="/dashboard" className="flex items-center gap-3 rounded-sm text-slate-200 bg-[#1a1a1a]">
                 <Home className="h-4 w-4 text-slate-200" />
                 <span className="font-medium">Dashboard</span>
                </Link>
               </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
               <SidebarMenuButton className="w-full" asChild>
                <Link href="/create" className="flex items-center gap-3 rounded-sm px-3 py-2.5 text-[#888888] hover:bg-[#1a1a1a]">
                 <FilePlus className="h-4 w-4 text-slate-200" />
                 <span className="font-medium">Create</span>
                </Link>
               </SidebarMenuButton> 
              </SidebarMenuItem>
              <SidebarMenuItem>
               <SidebarMenuButton className="w-full" asChild>
                <Link href="/refine" className="flex items-center gap-3 rounded-sm px-3 py-2.5 text-[#888888] hover:bg-[#1a1a1a]">
                 <BrainCircuit className="h-4 w-4 text-slate-200" />
                 <span className="font-medium">Refine</span>
                </Link>
               </SidebarMenuButton> 
              </SidebarMenuItem>
              <SidebarMenuItem>
               <SidebarMenuButton className="w-full" asChild>
                <Link href="/billing" className="flex items-center gap-3 rounded-sm px-3 py-2.5 text-[#888888] hover:bg-[#1a1a1a]">
                 <CreditCard className="h-4 w-4 text-slate-200" />
                 <span className="font-medium">Billing</span>
                </Link>
               </SidebarMenuButton> 
              </SidebarMenuItem>
              <SidebarMenuItem>
               <SidebarMenuButton className="w-full" asChild>
                <Link href="/settings" className="flex items-center gap-3 rounded-sm px-3 py-2.5 text-[#888888] hover:bg-[#1a1a1a]">
                 <Settings className="h-4 w-4 text-slate-200" />
                 <span className="font-medium">Settings</span>
                </Link>
               </SidebarMenuButton> 
              </SidebarMenuItem>
             </SidebarMenu>     
            </SidebarContent>
          </Sidebar>
         </div>
        </SidebarProvider>  
        </div>
    )
};