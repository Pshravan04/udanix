'use client';
 
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/auth-context';

import { HeroSection } from '@/components/hero-section';
import { StreamExplorer } from '@/components/stream-explorer';
import { CareerPaths } from '@/components/career-paths';
import { AssessmentSection } from '@/components/assessment-section';
import { SuccessGallery } from '@/components/success-gallery';
import { CounselorSection } from '@/components/counselor-section';

export default function Home() {
  const { user, profile, setLoginModalOpen } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 overflow-x-hidden selection:bg-udanix-blue/10 selection:text-udanix-blue">

      {/* ─── NAV ─── */}
      <header className="fixed top-0 inset-x-0 z-50 bg-slate-50/80 backdrop-blur-3xl border-b border-slate-200/50 px-4 sm:px-12">
        <div className="max-w-[1440px] mx-auto h-[70px] sm:h-[80px] flex items-center justify-between gap-4 sm:gap-8">
          <div className="flex items-center gap-12">
            <Link href="/" className="flex items-center gap-3 flex-shrink-0 hover:scale-105 transition-transform">
              <Image src="/logo.jpg" alt="Udaanix" width={100} height={32} className="h-8 sm:h-10 w-auto" priority />
            </Link>

            <nav className="hidden xl:flex items-center gap-2">
              {profile?.role === 'admin' && (
                <Link href="/admin">
                  <button className="text-[10px] sm:text-[12px] font-black text-rose-500 hover:text-rose-600 uppercase tracking-widest transition-all px-3 sm:px-4 py-2 rounded-xl hover:bg-rose-50 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                    Admin Panel
                  </button>
                </Link>
              )}
            </nav>
          </div>

          <div className="flex items-center gap-3 sm:gap-5 justify-end">
            <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
              {user ? (
                <div className="flex items-center gap-2 sm:gap-4">
                  {profile?.role === 'admin' && (
                    <Link href="/admin" className="block xl:hidden">
                      <button className="text-[10px] sm:text-[12px] font-black text-rose-500 hover:text-rose-600 uppercase tracking-widest transition-all px-3 sm:px-4 py-2 rounded-xl hover:bg-rose-50">
                        Admin
                      </button>
                    </Link>
                  )}
                  <Link href="/student/profile" className="hidden xs:flex items-center gap-2 group">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center text-udanix-blue font-black shadow-inner transition-all group-hover:border-udanix-blue group-hover:scale-105">
                      {profile?.avatar_url ? (
                        <Image src={profile.avatar_url} alt={profile.full_name || 'User'} width={40} height={40} className="w-full h-full object-cover" />
                      ) : (
                        profile?.full_name?.charAt(0) || 'U'
                      )}
                    </div>
                    <button className="text-[10px] sm:text-[12px] font-black text-slate-500 group-hover:text-udanix-blue uppercase tracking-widest transition-all px-2 py-2">
                      Profile
                    </button>
                  </Link>
                  <Link href={profile?.role === 'counselor' ? '/counselor' : '/student'}>
                    <button className="bg-brand-gradient text-white text-[11px] sm:text-[13px] font-black py-2.5 sm:py-3.5 px-5 sm:px-8 rounded-xl sm:rounded-2xl shadow-premium hover:shadow-premium-xl hover:scale-[1.02] active:scale-[0.98] transition-all whitespace-nowrap uppercase tracking-widest">
                      Dashboard
                    </button>
                  </Link>
                </div>

              ) : null}
            </div>
          </div>
        </div>
      </header>

      {/* ─── HERO ─── */}
      <HeroSection />

      {/* ─── ACTUAL DASHBOARD PREVIEW ─── */}
      <section className="relative px-4 sm:px-12 -mt-20 sm:-mt-56 mb-24 sm:mb-32 z-20">
        <div className="max-w-[1400px] mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="p-1.5 sm:p-4 bg-white/70 backdrop-blur-3xl rounded-[2rem] sm:rounded-[4rem] border border-white/40 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.15)]"
          >
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-[1.5rem] sm:rounded-[3.2rem] overflow-hidden border border-white/20 shadow-2xl bg-slate-900">
              <Image 
                src="/actual-dashboard.png" 
                alt="Udanix Dashboard" 
                fill 
                className="object-cover object-top"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
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
