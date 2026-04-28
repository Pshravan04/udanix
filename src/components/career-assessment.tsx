'use client';

import { motion } from 'framer-motion';
import { 
  ClipboardCheck, Clock, BookOpen, UserCircle, 
  ArrowRight, Sparkles, TrendingUp, Layers
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const ASSESSMENTS = [
  {
    id: 'interest',
    icon: ClipboardCheck,
    title: 'Career Interest Assessment',
    desc: 'Discover your interests and find careers that match your personality and passions.',
    duration: '15 minutes',
    questions: '50 Questions',
    completed: '45,000+ students completed',
    difficulty: 'Beginner',
    color: '#003E8A',
    bg: 'bg-blue-50'
  },
  {
    id: 'stream',
    icon: Layers,
    title: 'Stream Selection Test',
    desc: 'Determine which stream (Science/Commerce/Arts) is best suited for your skills and goals.',
    duration: '20 minutes',
    questions: '40 Questions',
    completed: '38,000+ students completed',
    difficulty: 'Beginner',
    color: '#059669',
    bg: 'bg-emerald-50'
  },
  {
    id: 'aptitude',
    icon: TrendingUp,
    title: 'Aptitude & Skills Test',
    desc: 'Evaluate your analytical, logical, and creative skills to identify your strengths.',
    duration: '30 minutes',
    questions: '60 Questions',
    completed: '28,000+ students completed',
    difficulty: 'Intermediate',
    color: '#DF590E',
    bg: 'bg-orange-50'
  },
  {
    id: 'personality',
    icon: UserCircle,
    title: 'Personality Assessment',
    desc: 'Understand your personality type and how it influences your career preferences.',
    duration: '25 minutes',
    questions: '45 Questions',
    completed: '32,000+ students completed',
    difficulty: 'Intermediate',
    color: '#7C3AED',
    bg: 'bg-purple-50'
  }
];

export function CareerAssessment() {
  return (
    <section className="py-24 relative overflow-hidden bg-[#F9FBFF]">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] rounded-full bg-blue-100/40 blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-orange-100/30 blur-[100px]" />
      </div>

      <div className="max-w-[1280px] mx-auto px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center mb-4"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-blue-100 text-udanix-blue text-[11px] font-black uppercase tracking-[0.15em] shadow-sm">
              <Sparkles className="w-3 h-3" />
              Scientifically Designed
            </span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-[#111827] mb-6 uppercase tracking-tight"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            Career Assessment <span className="text-udanix-blue">Tests</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600 font-medium leading-relaxed"
          >
            Take our expert-curated assessments to discover your true potential, 
            interests, and the ideal career paths that align with your unique profile.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ASSESSMENTS.map((test, index) => (
            <motion.div
              key={test.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index }}
              className="group relative bg-white border border-gray-100 rounded-[2rem] p-8 shadow-premium hover:shadow-premium-xl transition-all duration-500 hover:-translate-y-2"
            >
              {/* Difficulty Badge */}
              <div className="absolute top-6 right-6">
                <span className={`text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full ${
                  test.difficulty === 'Beginner' ? 'bg-emerald-50 text-emerald-600' : 'bg-orange-50 text-orange-600'
                }`}>
                  {test.difficulty}
                </span>
              </div>

              {/* Icon Container */}
              <div className={`w-14 h-14 rounded-2xl ${test.bg} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
                <test.icon className="w-7 h-7" style={{ color: test.color }} />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-[#111827] mb-3 group-hover:text-udanix-blue transition-colors">
                {test.title}
              </h3>
              <p className="text-sm text-gray-500 font-medium leading-relaxed mb-8 h-12 line-clamp-2">
                {test.desc}
              </p>

              {/* Stats */}
              <div className="space-y-3 mb-8 pt-6 border-t border-gray-50">
                <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-tight">
                  <Clock className="w-3.5 h-3.5" />
                  {test.duration}
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-tight">
                  <BookOpen className="w-3.5 h-3.5" />
                  {test.questions}
                </div>
              </div>

              <div className="mb-8">
                <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest bg-blue-50/50 inline-block px-2 py-0.5 rounded">
                  {test.completed}
                </p>
              </div>

              {/* Button */}
              <button className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-udanix-blue text-white text-xs font-black uppercase tracking-widest shadow-lg shadow-blue-900/10 active:scale-95 transition-all group/btn">
                Start Assessment
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
