'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, User, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Profile', href: '/student/profile', icon: User },
  { label: 'More', href: '#', icon: Menu },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-6 inset-x-6 z-[100] lg:hidden">
      <div className="bg-slate-950/90 backdrop-blur-3xl rounded-full px-8 py-5 flex items-center justify-between shadow-[0_20px_50px_rgba(0,0,0,0.4)] border border-white/10">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link 
              key={item.label} 
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-2 transition-all duration-300 relative group",
                isActive ? "text-white" : "text-slate-400 hover:text-slate-200"
              )}
            >
              <div className={cn(
                "p-2.5 rounded-2xl transition-all duration-300 relative",
                isActive ? "bg-udanix-blue shadow-[0_0_20px_rgba(14,57,154,0.3)] scale-110" : "bg-white/5"
              )}>
                <Icon className={cn("w-5 h-5", isActive ? "stroke-[2.5px]" : "stroke-[2px]")} />
              </div>
              <span className={cn(
                "text-[8px] font-black uppercase tracking-[0.2em]",
                isActive ? "text-white" : "text-slate-500"
              )}>{item.label}</span>
              
              {isActive && (
                <div className="absolute -bottom-2 w-1 h-1 rounded-full bg-udanix-orange shadow-[0_0_10px_#df590e]" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
