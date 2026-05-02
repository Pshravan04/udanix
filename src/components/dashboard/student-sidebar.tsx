'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { 
  Home,
  LayoutDashboard, 
  Users, 
  Calendar, 
  TrendingUp, 
  Settings,
  Menu,
  X,
  ShieldCheck,
  LogOut,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Profile } from '@/types';

const NAV_ITEMS = [
  { label: 'Home', icon: Home, href: '/' },
  { label: 'Dashboard', icon: LayoutDashboard, href: '/student' },
  { label: 'Counselors', icon: Users, href: '/student/directory' },
  { label: 'Sessions', icon: Calendar, href: '/student/sessions' },
  { label: 'Progress', icon: TrendingUp, href: '/student/progress' },
  { label: 'Settings', icon: Settings, href: '/student/profile' },
];

export function StudentSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();
        setIsAdmin(profile?.role === 'admin');
      }
    };
    checkAdmin();
  }, [supabase]);

  const handleLogout = async () => {
    setLoggingOut(true);
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <div className="hidden lg:flex w-[260px] xl:w-[280px] h-[calc(100vh-40px)] bg-white rounded-[32px] border border-[#E5E7EB] flex-col p-6 sticky top-5 shadow-sm shrink-0">
      {/* Logo */}
      <div className="mb-10 px-2 mt-2">
        <Link href="/">
          <Image src="/logo.jpg" alt="Udaanix" width={100} height={36} className="h-9 w-auto" />
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

        {isAdmin && (
          <Link
            href="/admin"
            className={cn(
              "group flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-200",
              pathname === '/admin' 
                ? "bg-rose-50 text-rose-600" 
                : "text-[#9CA3AF] hover:bg-rose-50/50 hover:text-rose-600"
            )}
          >
            <div className="flex items-center gap-3">
              <ShieldCheck className={cn(
                "w-5 h-5",
                pathname === '/admin' ? "text-rose-600" : "text-[#9CA3AF] group-hover:text-rose-600"
              )} />
              <span className="text-[15px] font-bold tracking-tight">
                Admin Panel
              </span>
            </div>
          </Link>
        )}
      </nav>

      {/* Logout */}
      <div className="mt-auto pt-4 border-t border-gray-100 space-y-3">
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="group flex items-center gap-3 w-full px-4 py-3.5 rounded-2xl transition-all duration-200 text-[#9CA3AF] hover:bg-red-50 hover:text-red-500 disabled:opacity-60"
        >
          <LogOut className="w-5 h-5 group-hover:text-red-500 transition-colors" />
          <span className="text-[15px] font-bold tracking-tight">
            {loggingOut ? 'Signing out…' : 'Log Out'}
          </span>
        </button>
        <p className="italic text-[11px] text-[#9CA3AF] text-center">v2.0.4 Unified Branding</p>
      </div>
    </div>
  );
}

/** Mobile top navigation bar for the student dashboard */
export function MobileStudentNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const supabase = createClient();

  const handleLogout = async () => {
    setMenuOpen(false);
    setLoggingOut(true);
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 px-4 py-3 flex items-center justify-between shadow-sm">
        <Link href="/">
          <Image src="/logo.jpg" alt="Udaanix" width={80} height={30} className="h-8 w-auto" />
        </Link>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="w-10 h-10 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-udanix-blue/5 hover:text-udanix-blue transition-all"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="lg:hidden fixed top-[57px] left-0 right-0 z-40 bg-white border-b border-gray-100 shadow-xl px-4 py-3 space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200",
                  isActive
                    ? "bg-[#EFF6FF] text-udanix-blue"
                    : "text-[#6B7280] hover:bg-gray-50 hover:text-[#374151]"
                )}
              >
                <item.icon className={cn("w-5 h-5", isActive ? "text-udanix-blue" : "text-[#9CA3AF]")} />
                <span className="text-[15px] font-semibold">{item.label}</span>
              </Link>
            );
          })}
          <div className="border-t border-gray-100 pt-1 mt-1">
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-2xl transition-all duration-200 text-red-500 hover:bg-red-50 disabled:opacity-60"
            >
              <LogOut className="w-5 h-5" />
              <span className="text-[15px] font-semibold">{loggingOut ? 'Signing out…' : 'Log Out'}</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
