'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  TrendingUp, 
  Settings,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/student' },
  { label: 'Counselors', icon: Users, href: '/student/directory' },
  { label: 'Sessions', icon: Calendar, href: '/student/sessions' },
  { label: 'Progress', icon: TrendingUp, href: '/student/progress' },
  { label: 'Settings', icon: Settings, href: '/student/profile' },
];

export function StudentSidebar() {
  const pathname = usePathname();

  return (
    <div className="w-[280px] h-[calc(100vh-40px)] bg-white rounded-[32px] border border-[#E5E7EB] flex flex-col p-6 sticky top-5 shadow-sm">
      {/* Logo */}
      <div className="mb-10 px-2 mt-2">
        <Link href="/">
          <img src="/logo.jpg" alt="Udaanix" className="h-9 w-auto" />
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-2">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "group flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-200",
                isActive 
                  ? "bg-[#EFF6FF] text-udanix-blue" 
                  : "text-[#9CA3AF] hover:bg-gray-50 hover:text-[#4B5563]"
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon className={cn(
                  "w-5 h-5",
                  isActive ? "text-udanix-blue" : "text-[#9CA3AF] group-hover:text-[#4B5563]"
                )} />
                <span className="text-[15px] font-bold tracking-tight">
                  {item.label}
                </span>
              </div>
              {isActive && (
                <div className="w-1.5 h-1.5 rounded-full bg-udanix-blue" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* User Info / Logout (Optional placeholder) */}
      <div className="mt-auto pt-6 border-t border-gray-100 italic text-[11px] text-[#9CA3AF] text-center">
        v2.0.4 Unified Branding
      </div>
    </div>
  );
}
