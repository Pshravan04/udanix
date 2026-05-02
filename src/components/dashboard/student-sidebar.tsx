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
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loggingOut, setLoggingOut] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    const loadProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profileData } = await supabase
          .from('profiles')
          .select('role, full_name, avatar_url, stream')
          .eq('id', user.id)
          .single();
        
        if (profileData) {
          setProfile(profileData as Profile);
        }
      }
    };
    loadProfile();
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

        {profile?.role === 'admin' && (
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

      {/* User Profile */}
      <div className="mt-auto pb-4 mb-4 border-b border-gray-100">
        <Link href="/student/profile" className="flex items-center gap-3 p-2 rounded-2xl hover:bg-gray-50 transition-all group">
          <div className="w-11 h-11 rounded-xl bg-udanix-blue/5 border border-udanix-blue/10 overflow-hidden flex items-center justify-center text-udanix-blue font-black text-sm shadow-inner group-hover:border-udanix-blue/30">
            {profile?.avatar_url ? (
              <Image src={`${profile.avatar_url}?t=${Date.now()}`} alt={profile.full_name || 'User'} width={44} height={44} className="w-full h-full object-cover" />
            ) : (
              profile?.full_name?.charAt(0) || 'S'
            )}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-black text-[#111827] truncate leading-tight group-hover:text-udanix-blue transition-colors">
              {profile?.full_name || 'Student Name'}
            </p>
            <p className="text-[10px] font-black text-[#9CA3AF] uppercase tracking-widest truncate opacity-80">
              {profile?.stream || 'Exploring Streams'}
            </p>
          </div>
        </Link>
      </div>

      {/* Logout */}
      <div className="pt-2 space-y-3">
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
  const [profile, setProfile] = useState<Profile | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const loadProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profileData } = await supabase
          .from('profiles')
          .select('role, full_name, avatar_url, stream')
          .eq('id', user.id)
          .single();
        
        if (profileData) {
          setProfile(profileData as Profile);
        }
      }
    };
    loadProfile();
  }, [supabase]);

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
        
        <div className="flex items-center gap-2">
          {profile && (
            <Link href="/student/profile" className="w-8 h-8 rounded-lg bg-udanix-blue/5 border border-udanix-blue/10 overflow-hidden flex items-center justify-center text-udanix-blue font-black text-[10px] shadow-sm">
              {profile.avatar_url ? (
                <Image src={`${profile.avatar_url}?t=${Date.now()}`} alt="" width={32} height={32} className="w-full h-full object-cover" />
              ) : (
                profile.full_name?.charAt(0) || 'S'
              )}
            </Link>
          )}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-10 h-10 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-udanix-blue/5 hover:text-udanix-blue transition-all"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="lg:hidden fixed top-[57px] left-0 right-0 z-40 bg-white border-b border-gray-100 shadow-xl px-4 py-3 space-y-1">
          {/* Mobile Profile Summary */}
          {profile && (
            <div className="px-4 py-4 mb-2 bg-slate-50/50 rounded-2xl border border-slate-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 overflow-hidden flex items-center justify-center text-udanix-blue font-black text-sm">
                {profile.avatar_url ? (
                  <Image src={`${profile.avatar_url}?t=${Date.now()}`} alt="" width={40} height={40} className="w-full h-full object-cover" />
                ) : (
                  profile.full_name?.charAt(0) || 'S'
                )}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-black text-slate-900 truncate uppercase tracking-tight">{profile.full_name}</p>
                <p className="text-[9px] font-black text-udanix-blue truncate uppercase tracking-widest opacity-70">{profile.stream || 'Exploring'}</p>
              </div>
            </div>
          )}

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
          
          {profile?.role === 'admin' && (
            <Link
              href="/admin"
              onClick={() => setMenuOpen(false)}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200",
                pathname === '/admin'
                  ? "bg-rose-50 text-rose-600"
                  : "text-rose-500 hover:bg-rose-50/50"
              )}
            >
              <ShieldCheck className="w-5 h-5" />
              <span className="text-[15px] font-semibold">Admin Panel</span>
            </Link>
          )}

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
