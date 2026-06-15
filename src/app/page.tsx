'use client';

import Image from 'next/image';
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
  const { user, profile } = useAuth();

  return (
    <div className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f] overflow-x-hidden">

      {/* ─── NAV ─── */}
      <header className="fixed top-0 inset-x-0 z-50 bg-[#f5f5f7]/80 backdrop-blur-xl border-b border-[#d2d2d7] px-4 sm:px-12">
        <div className="max-w-6xl mx-auto h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-3 flex-shrink-0 transition-opacity hover:opacity-80">
              <Image src="/logo.jpg" alt="Udaanix" width={100} height={32} className="h-8 w-auto" priority />
            </Link>
          </div>

          <div className="flex items-center justify-end">
            {user ? (
              <div className="flex items-center gap-4">
                {profile?.role === 'admin' && (
                  <Link href="/admin">
                    <button className="text-sm font-medium text-[#007AFF] hover:underline px-2">
                      Admin Panel
                    </button>
                  </Link>
                )}
                <Link href="/student/profile" className="flex items-center gap-2 group">
                  <div className="w-8 h-8 rounded-full bg-white border border-[#d2d2d7] overflow-hidden flex items-center justify-center text-[#1d1d1f] font-medium transition-colors group-hover:border-[#007AFF]">
                    {profile?.avatar_url ? (
                      <Image src={profile.avatar_url} alt={profile.full_name || 'User'} width={32} height={32} className="w-full h-full object-cover" />
                    ) : (
                      profile?.full_name?.charAt(0) || 'U'
                    )}
                  </div>
                </Link>
                <Link href={profile?.role === 'counselor' ? '/counselor' : '/student'}>
                  <button className="bg-[#007AFF] text-white text-sm font-medium py-2 px-5 rounded-full shadow-sm hover:bg-[#0066CC] transition-colors">
                    Dashboard
                  </button>
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      </header>

      {/* ─── HERO ─── */}
      <HeroSection />

      {/* ─── DASHBOARD PREVIEW ─── */}
      <section className="relative px-4 sm:px-12 -mt-16 sm:-mt-24 mb-24 z-20">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="p-2 sm:p-4 bg-white rounded-[2rem] sm:rounded-[3rem] border border-[#d2d2d7] shadow-sm"
          >
            <div className="relative aspect-[16/10] w-full rounded-[1.5rem] sm:rounded-[2.5rem] overflow-hidden bg-white border border-[#f5f5f7]">
              <Image 
                src="/actual-dashboard.png" 
                alt="Udanix Dashboard" 
                fill 
                className="object-cover object-top"
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
