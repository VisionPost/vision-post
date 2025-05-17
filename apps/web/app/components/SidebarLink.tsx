"use client";

import { SidebarMenuButton } from '@/components/ui/sidebar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SideBarItemProps {
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    children: React.ReactNode;
};

export function SidebarLink({ href, children, icon: Icon }: SideBarItemProps) {
    const pathName = usePathname();
    const isActive = pathName === href;

    return (
     <SidebarMenuButton 
     asChild
     className={`flex w-full items-center gap-3 px-3 py-2.5 rounded-sm 
        ${isActive ? 'bg-[#1a1a1a] text-slate-200' : 'text-slate-200 hover:bg-[#1a1a1a] hover:text-slate-200'}
        `}
     >
        <Link
        href={href}
        >
          <Icon className="h-4 w-4" />
          <span className='font-medium'>{children}</span>
        </Link>
     </SidebarMenuButton>
    );
};