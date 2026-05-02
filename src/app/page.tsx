'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';
import { motion } from 'framer-motion';

import { HeroSection } from '@/components/hero-section';
import { StreamExplorer } from '@/components/stream-explorer';
import { CareerPaths } from '@/components/career-paths';
import { AssessmentSection } from '@/components/assessment-section';
import { SuccessGallery } from '@/components/success-gallery';
import { CounselorSection } from '@/components/counselor-section';
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
    <div className="min-h-screen bg-white text-slate-950 overflow-x-hidden selection:bg-udanix-blue/10 selection:text-udanix-blue">

      {/* ─── NAV ─── */}
      <header className="fixed top-0 inset-x-0 z-50 bg-white/70 backdrop-blur-3xl border-b border-slate-200/50 px-4 sm:px-12">
        <div className="max-w-[1440px] mx-auto h-[70px] sm:h-[80px] flex items-center justify-between gap-4 sm:gap-8">
          <div className="flex items-center gap-12">
            <Link href="/" className="flex items-center gap-3 flex-shrink-0 hover:scale-105 transition-transform">
              <Image src="/logo.jpg" alt="Udaanix" width={100} height={32} className="h-8 sm:h-10 w-auto" priority />
            </Link>

            <nav className="hidden xl:flex items-center gap-2">
              {/* Navigation links can be added here */}
            </nav>
          </div>

          <div className="flex items-center gap-3 sm:gap-5 justify-end">
            <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
              {user ? (
                <div className="flex items-center gap-2 sm:gap-4">
                  <Link href="/student/profile" className="hidden xs:block">
                    <button className="text-[10px] sm:text-[12px] font-black text-slate-500 hover:text-slate-950 uppercase tracking-widest transition-all px-3 sm:px-4 py-2 rounded-xl hover:bg-slate-100">
                      Profile
                    </button>
                  </Link>
                  <Link href="/student">
                    <button className="bg-brand-gradient text-white text-[11px] sm:text-[13px] font-black py-2.5 sm:py-3.5 px-5 sm:px-8 rounded-xl sm:rounded-2xl shadow-premium hover:shadow-premium-xl hover:scale-[1.02] active:scale-[0.98] transition-all whitespace-nowrap uppercase tracking-widest">
                      Dashboard
                    </button>
                  </Link>
                </div>
              ) : (
                <>
                  <div className="hidden xs:block">
                    <StudentLoginModal />
                  </div>
                  <Link href="/register">
                    <button className="bg-brand-gradient text-white text-[11px] sm:text-[13px] font-black py-2.5 sm:py-3.5 px-5 sm:px-8 rounded-xl sm:rounded-2xl shadow-premium hover:shadow-premium-xl hover:scale-[1.02] active:scale-[0.98] transition-all whitespace-nowrap uppercase tracking-widest">
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

      {/* ─── ACTUAL DASHBOARD PREVIEW ─── */}
      <section className="relative px-6 sm:px-12 -mt-40 mb-20 z-20">
        <div className="max-w-[1400px] mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="p-3 sm:p-4 bg-white/40 backdrop-blur-3xl rounded-[2.5rem] border border-slate-200 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.08)]"
          >
            <div className="relative aspect-[16/9] w-full rounded-[1.8rem] overflow-hidden border border-white/20 shadow-2xl">
              <Image 
                src="/actual-dashboard.png" 
                alt="Udanix Dashboard" 
                fill 
                className="object-cover"
                priority
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── STREAM EXPLORER ─── */}
      <StreamExplorer />

      {/* ─── CAREER PATHS ─── */}
      <CareerPaths />

      {/* ─── ASSESSMENT SECTION ─── */}
      <AssessmentSection />

      {/* ─── SUCCESS GALLERY ─── */}
      <SuccessGallery />

      {/* ─── COUNSELOR SECTION ─── */}
      <CounselorSection />

    </div>
  );
}
