import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Inter } from 'next/font/google'
import "./globals.css";
import SidebarComponent from "./components/SidebarComponent";
import { Providers } from "./providers";
import { SidebarProvider } from "@/components/ui/sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "VisionPost",
  description: "VisionPost simplifies social media for developers by turning their daily coding activities into impactful posts for platforms like X and Linkedin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased bg-[#000000]`}
      >
      <Providers>  
       <SidebarProvider>
        <SidebarComponent />    
         <main className="flex-1 overflow-auto">
          {children}
         </main>
        </SidebarProvider>    
      </Providers>   
      </body>
    </html>
  );
}
