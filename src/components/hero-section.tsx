'use client';

import { motion } from 'framer-motion';
import { Rocket, Play, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';

export function HeroSection() {
  const { user, setLoginModalOpen } = useAuth();
  const router = useRouter();

  const handleCTA = (e: React.MouseEvent, target: string) => {
    e.preventDefault();
    if (!user) {
      setLoginModalOpen(true);
    } else {
      router.push(target);
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-32 overflow-hidden bg-[#f5f5f7]">
      <div className="container relative z-10 px-6 mx-auto">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          
          {/* Subtle Tag */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm"
          >
            <span className="text-slate-600 text-xs font-medium tracking-tight">
              Trusted by 50,000+ students globally.
            </span>
          </motion.div>

          {/* Main Content */}
          <div className="space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-7xl font-semibold text-[#1d1d1f] tracking-tight leading-tight"
            >
              Your career journey. <br className="hidden sm:block" />
              <span className="text-[#007AFF]">Mapped with precision.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="max-w-2xl mx-auto text-lg md:text-xl text-[#515154] font-medium leading-relaxed px-4"
            >
              Get expert guidance on stream selection, career paths, entrance exams, and future opportunities. Make informed decisions with personalized counseling.
            </motion.p>
          </div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-4"
          >
            <button 
              onClick={(e) => handleCTA(e, '/student')}
              className="w-full sm:w-auto bg-[#007AFF] text-white text-sm font-medium py-3.5 px-8 rounded-full shadow-sm hover:bg-[#0066CC] transition-colors"
            >
              Start Assessment
            </button>
            
            <button 
              onClick={(e) => handleCTA(e, '/student/mentors')}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-[#1d1d1f] text-sm font-medium py-3.5 px-8 rounded-full border border-slate-200 hover:bg-slate-50 transition-colors shadow-sm"
            >
              <Play className="w-4 h-4" />
              Talk to Mentor
            </button>
          </motion.div>

          {/* Minimal Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 pt-20"
          >
            {[
              { label: 'Students Reached', value: '50k+' },
              { label: 'Verified Mentors', value: '200+' },
              { label: 'Platform Rating', value: '4.9/5' }
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="text-3xl md:text-4xl font-semibold text-[#1d1d1f] tracking-tight">
                  {stat.value}
                </span>
                <span className="text-[#86868b] text-sm font-medium mt-1">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
