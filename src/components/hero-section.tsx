'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex flex-col items-center justify-center pt-32 pb-10 overflow-hidden">
      {/* ─── BACKGROUND EFFECTS ─── */}
      <div className="absolute inset-0 bg-[#3B30E1] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#3B30E1] via-[#6366F1] to-[#9333EA] opacity-90" />
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-white/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-400/20 rounded-full blur-[100px]" />
      </div>

      <div className="container relative z-10 px-6 mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto space-y-8"
        >
          {/* Badge */}
          <div className="text-white/90 text-sm font-medium tracking-wide mb-2">
            Your Career Journey Starts Here
          </div>

          {/* Subtitle / Main Text */}
          <p className="max-w-3xl mx-auto text-xl sm:text-2xl text-white font-medium leading-relaxed">
            Get expert guidance on stream selection, career paths, entrance exams, and future opportunities. 
            Make informed decisions with personalized counseling.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-6">
            <button className="w-full sm:w-auto px-8 py-4 bg-white text-[#3B30E1] rounded-2xl font-bold text-base shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all">
              Take Free Assessment
            </button>
            <button className="flex items-center gap-2 text-white font-bold text-base group hover:text-blue-100 transition-colors">
              Talk to Counselor
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-20 border-t border-white/10 mt-10">
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-white mb-1">50,000+</span>
              <span className="text-white/60 text-sm uppercase tracking-wider font-semibold">Students Guided</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-white mb-1">200+</span>
              <span className="text-white/60 text-sm uppercase tracking-wider font-semibold">Expert Counselors</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-white mb-1">95%</span>
              <span className="text-white/60 text-sm uppercase tracking-wider font-semibold">Success Rate</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
