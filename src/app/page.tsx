'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';

import { HeroSection } from '@/components/hero-section';
import { CtaSection } from '@/components/cta-section';
import { DoubleDashboardPreview } from '@/components/double-dashboard-preview';
import { StudentLoginModal } from '@/components/auth/student-login-modal';

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    checkUser();
  }, [supabase]);

  return (
    <div className="min-h-screen bg-white text-[#111827] overflow-x-hidden selection:bg-udanix-blue/10 selection:text-udanix-blue">

      {/* ─── NAV ─── */}
      <header className="fixed top-0 inset-x-0 z-50 glass-premium border-b border-white/20 px-6 sm:px-12">
        <div className="max-w-[1440px] mx-auto h-[80px] flex items-center justify-between gap-8">
          <div className="flex items-center gap-12">
            <Link href="/" className="flex items-center gap-3 flex-shrink-0 hover:scale-105 transition-transform">
              <Image src="/logo.jpg" alt="Udaanix" width={120} height={40} className="h-10 w-auto" priority />
            </Link>

            <nav className="hidden xl:flex items-center gap-2">
              {/* Navigation links can be added here */}
            </nav>
          </div>

          <div className="flex items-center gap-5 flex-1 justify-end max-w-2xl">
            <div className="flex items-center gap-4 flex-shrink-0">
              {user ? (
                <div className="flex items-center gap-4">
                  <Link href="/student/profile">
                    <button className="text-[12px] font-black text-slate-500 hover:text-udanix-blue uppercase tracking-widest transition-all px-4 py-2 rounded-xl hover:bg-slate-50">
                      Profile
                    </button>
                  </Link>
                  <Link href="/student">
                    <button className="bg-brand-gradient text-white text-[13px] font-black py-3.5 px-8 rounded-2xl shadow-premium hover:shadow-premium-xl hover:scale-[1.02] active:scale-[0.98] transition-all whitespace-nowrap uppercase tracking-widest">
                      Dashboard
                    </button>
                  </Link>
                </div>
              ) : (
                <>
                  <div className="hidden sm:block">
                    <StudentLoginModal />
                  </div>
                  <Link href="/register">
                    <button className="bg-brand-gradient text-white text-[13px] font-black py-3.5 px-8 rounded-2xl shadow-premium hover:shadow-premium-xl hover:scale-[1.02] active:scale-[0.98] transition-all whitespace-nowrap uppercase tracking-widest">
                      Join Now
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ─── HERO ─── */}
      <HeroSection />

      {/* ─── DASHBOARD PREVIEW ─── */}
      <DoubleDashboardPreview />

      {/* ─── CTA SECTION ─── */}
      <CtaSection />

    </div>
  );
}
