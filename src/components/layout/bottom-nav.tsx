'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, User, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';

import { useAuth } from '@/context/auth-context';

const NAV_ITEMS = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Profile', href: '/student/profile', icon: User },
  { label: 'More', href: '#', icon: Menu },
];

export function BottomNav() {
  const pathname = usePathname();
  const { user, setLoginModalOpen } = useAuth();

  const handleNavItemClick = (e: React.MouseEvent, href: string) => {
    if (href === '/student/profile' && !user) {
      e.preventDefault();
      setLoginModalOpen(true);
    }
  };

  return (
    <nav className="fixed bottom-6 inset-x-6 z-[100] lg:hidden">
      <div className="bg-white/80 backdrop-blur-3xl rounded-full px-8 py-5 flex items-center justify-between shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-200">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link 
              key={item.label} 
              href={item.href}
              onClick={(e) => handleNavItemClick(e, item.href)}
              className={cn(
                "flex flex-col items-center gap-2 transition-all duration-300 relative group",
                isActive ? "text-udanix-blue" : "text-slate-400 hover:text-slate-600"
              )}
            >
              <div className={cn(
                "p-2.5 rounded-2xl transition-all duration-300 relative",
                isActive ? "bg-udanix-blue text-white shadow-[0_10px_20px_rgba(14,57,154,0.2)] scale-110" : "bg-slate-50 border border-slate-100"
              )}>
                <Icon className={cn("w-5 h-5", isActive ? "stroke-[2.5px]" : "stroke-[2px]")} />
              </div>
              <span className={cn(
                "text-[8px] font-black uppercase tracking-[0.2em]",
                isActive ? "text-udanix-blue" : "text-slate-400"
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
