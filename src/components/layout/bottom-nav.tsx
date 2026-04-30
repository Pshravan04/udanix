'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Profile', href: '/student/profile', icon: User },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-6 inset-x-6 z-[100] md:hidden">
      <div className="glass-premium rounded-full px-6 py-4 flex items-center justify-between shadow-premium-xl border border-white/40">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link 
              key={item.label} 
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 transition-all duration-300 relative",
                isActive ? "text-udanix-blue scale-110" : "text-slate-400 hover:text-udanix-blue/70"
              )}
            >
              <div className={cn(
                "p-2 rounded-xl transition-all duration-300 relative overflow-hidden",
                isActive ? "bg-brand-gradient text-white shadow-premium" : "bg-transparent"
              )}>
                <Icon className={cn("w-5 h-5", isActive ? "stroke-[2.5px]" : "stroke-[2px]")} />
              </div>
              <span className={cn(
                "text-[9px] font-black uppercase tracking-widest",
                isActive ? "text-udanix-blue" : "text-slate-400"
              )}>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
