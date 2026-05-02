'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu, X, LayoutDashboard, Calendar, MessageSquare, BookOpen, LogOut, Loader2, ShieldCheck } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useEffect } from 'react';
import { Profile } from '@/types';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { href: '/counselor', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/counselor/schedule', label: 'Schedule', icon: Calendar },
  { href: '/counselor/messages', label: 'Messages', icon: MessageSquare },
  { href: '/counselor/resources', label: 'Resources', icon: BookOpen },
];

export function CounselorMobileNav() {
  const [open, setOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const router = useRouter();
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
    setOpen(false);
    setLoggingOut(true);
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden w-9 h-9 rounded-2xl text-slate-500 hover:text-udanix-blue hover:bg-udanix-blue/5 flex items-center justify-center transition-all border border-slate-100"
        aria-label="Toggle mobile menu"
      >
        {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
      </button>

      {open && (
        <div className="md:hidden fixed top-[64px] left-0 right-0 z-50 bg-white border-b border-slate-100 shadow-xl px-4 py-4 space-y-2">
          {/* Profile Summary */}
          {profile && (
            <div className="px-4 py-3 mb-3 bg-slate-50/50 rounded-2xl border border-slate-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 overflow-hidden flex items-center justify-center text-udanix-blue font-black text-sm">
                {profile.avatar_url ? (
                  <Image src={`${profile.avatar_url}?t=${Date.now()}`} alt="" width={40} height={40} className="w-full h-full object-cover" />
                ) : (
                  profile.full_name?.charAt(0) || 'C'
                )}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-black text-slate-900 truncate uppercase tracking-tight">{profile.full_name}</p>
                <p className="text-[9px] font-black text-udanix-blue truncate uppercase tracking-widest opacity-70">Counselor</p>
              </div>
            </div>
          )}

          {NAV_LINKS.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold text-slate-600 hover:text-udanix-blue hover:bg-udanix-blue/5 transition-all"
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          ))}

          {profile?.role === 'admin' && (
            <Link
              href="/admin"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-rose-500 hover:bg-rose-50 transition-all"
            >
              <ShieldCheck className="w-4 h-4" />
              Admin Panel
            </Link>
          )}

          <div className="border-t border-slate-100 pt-2 mt-2">
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-2xl text-sm font-semibold text-red-500 hover:bg-red-50 transition-all disabled:opacity-60"
            >
              {loggingOut ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogOut className="w-4 h-4" />}
              {loggingOut ? 'Signing out…' : 'Log Out'}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

