'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu, X, LayoutDashboard, Calendar, MessageSquare, BookOpen, LogOut, Loader2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

const NAV_LINKS = [
  { href: '/counselor', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/counselor/schedule', label: 'Schedule', icon: Calendar },
  { href: '/counselor/messages', label: 'Messages', icon: MessageSquare },
  { href: '/counselor/resources', label: 'Resources', icon: BookOpen },
];

export function CounselorMobileNav() {
  const [open, setOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const router = useRouter();
  const supabase = createClient();

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
        <div className="md:hidden fixed top-[64px] left-0 right-0 z-50 bg-white border-b border-slate-100 shadow-xl px-4 py-3 space-y-1">
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
          <div className="border-t border-slate-100 pt-1 mt-1">
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

