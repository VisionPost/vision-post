import { SidebarProvider } from "@/components/ui/sidebar";
import SidebarComponent from "../components/SidebarComponent";
import Navbar from "../components/Navbar";

export default function DashboardLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
    <SidebarProvider>
      <SidebarComponent />    
       <main className="flex-1">
        <Navbar />
         {children}
       </main>
    </SidebarProvider>    
    );
};