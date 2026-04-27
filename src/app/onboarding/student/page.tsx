'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, Brain, Briefcase, ChevronRight, ChevronLeft, Sparkles, CheckCircle2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

const STEPS = [
  {
    id: 'interest',
    title: 'What brings you here?',
    subtitle: 'Select the focus of your counseling needs',
  },
  {
    id: 'details',
    title: 'Tell us a bit more',
    subtitle: 'What specifically are you looking to achieve?',
  },
  {
    id: 'preference',
    title: 'Last details',
    subtitle: 'Help us match you with the perfect mentor',
  }
];

const INTEREST_AREAS = [
  { id: 'career', label: 'Career Guidance', icon: Briefcase, color: 'bg-blue-500' },
  { id: 'mental', label: 'Mental Wellness', icon: Brain, color: 'bg-purple-500' },
  { id: 'academic', label: 'Academic Planning', icon: GraduationCap, color: 'bg-emerald-500' },
];

export default function StudentOnboarding() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    interest: '',
    goals: [] as string[],
    language: 'English',
  });

  const nextStep = async () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Completion & Persistence
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (user) {
          await supabase.from('profiles').upsert({
            id: user.id,
            interests: formData.goals,
            // You could map 'interest' to a specific column if added to schema
            // For now, combining with interests
            updated_at: new Date().toISOString(),
          });
        }

        router.push('/student');
        router.refresh();
      } catch (err) {
        console.error('Onboarding persistence error:', err);
        router.push('/student'); // Fallback to redirect anyway
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6 selection:bg-udanix-blue/10">
      <div className="w-full max-w-2xl space-y-10">
        {/* Progress System */}
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-1 bg-white rounded-full border border-slate-200/60 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-udanix-blue" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Neural Onboarding</span>
          </div>
          <div className="flex justify-center gap-2.5 w-full max-w-[240px]">
            {STEPS.map((_, idx) => (
              <div
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-700 ease-out flex-1 ${idx <= currentStep ? 'bg-slate-900' : 'bg-slate-200'
                  }`}
              />
            ))}
          </div>
        </div>

        <div className="text-center space-y-3">
          <h1 style={{ fontFamily: 'var(--font-space-grotesk)' }} className="text-4xl font-black tracking-tighter text-slate-900 uppercase">{STEPS[currentStep].title}</h1>
          <p className="text-slate-500 font-medium text-lg leading-relaxed">{STEPS[currentStep].subtitle}</p>
        </div>

        <div className="relative min-h-[440px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {currentStep === 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {INTEREST_AREAS.map((item) => (
                    <Card
                      key={item.id}
                      className={`cursor-pointer transition-all duration-500 overflow-hidden border-2 relative group p-0
                        ${formData.interest === item.id
                          ? 'border-slate-900 bg-slate-900 shadow-2xl shadow-slate-900/20 scale-[1.02]'
                          : 'border-slate-100 bg-white hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/50'
                        }`}
                      onClick={() => setFormData({ ...formData, interest: item.id })}
                    >
                      <CardContent className="p-8 text-center space-y-6 relative z-10">
                        <div className={`w-14 h-14 rounded-2xl mx-auto flex items-center justify-center transition-all duration-500
                          ${formData.interest === item.id ? 'bg-white/10 scale-110 shadow-[0_0_20px_rgba(255,255,255,0.1)]' : 'bg-slate-50 group-hover:scale-110'}`}>
                          <item.icon className={`w-7 h-7 ${formData.interest === item.id ? 'text-white' : 'text-slate-900'}`} />
                        </div>
                        <div className="space-y-1">
                          <h3 className={`font-black text-sm uppercase tracking-widest ${formData.interest === item.id ? 'text-white' : 'text-slate-900'}`}>
                            {item.label}
                          </h3>
                        </div>
                      </CardContent>
                      {formData.interest === item.id && (
                        <motion.div
                          layoutId="active-card-bg"
                          className="absolute inset-0 bg-slate-900 pointer-events-none"
                        />
                      )}
                    </Card>
                  ))}
                </div>
              )}

              {currentStep === 1 && (
                <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-xl shadow-slate-200/40 space-y-8">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 ml-1">Core Objectives</label>
                    <div className="grid grid-cols-2 gap-3">
                      {['Stream Selection', 'Entrance Exams', 'College Admissions', 'Study Abroad', 'Skill Building', 'Interview Prep'].map((goal) => (
                        <button
                          key={goal}
                          type="button"
                          className={`flex items-center justify-between px-5 py-3.5 text-xs font-black transition-all duration-300 border-2 rounded-2xl uppercase tracking-widest
                            ${formData.goals.includes(goal)
                              ? 'bg-slate-900 border-slate-900 text-white shadow-lg'
                              : 'bg-slate-50 border-transparent text-slate-500 hover:bg-white hover:border-slate-200'
                            }`}
                          onClick={() => {
                            const newGoals = formData.goals.includes(goal)
                              ? formData.goals.filter(g => g !== goal)
                              : [...formData.goals, goal];
                            setFormData({ ...formData, goals: newGoals });
                          }}
                        >
                          {goal}
                          {formData.goals.includes(goal) && <CheckCircle2 className="w-3.5 h-3.5 ml-2 text-udanix-cyan" />}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 ml-1">Additional Context</label>
                    <textarea
                      placeholder="DESCRIBE_YOUR_REQUIREMENTS_HERE..."
                      className="w-full h-32 p-5 rounded-2xl border-2 border-slate-50 bg-slate-50 focus:bg-white focus:border-udanix-blue/30 focus:outline-none transition-all resize-none text-sm font-medium shadow-inner placeholder:opacity-30"
                    />
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="bg-white rounded-[2.5rem] p-12 border border-slate-100 shadow-xl shadow-slate-200/40 space-y-10">
                  <div className="flex items-center gap-5 p-6 rounded-3xl bg-blue-50/50 border border-blue-100/50">
                    <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm">
                      <Brain className="w-6 h-6 text-udanix-blue" />
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-widest text-udanix-blue mb-1">Vector Identification</p>
                      <p className="text-slate-600 font-medium text-sm">Synthetic matching engine has identified <span className="font-bold text-slate-900 underline decoration-udanix-blue/30 decoration-2 underline-offset-2">12 EXPERT NODES</span> aligned with your profile.</p>
                    </div>
                  </div>

                  <div className="space-y-5">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-1 text-center block w-full">Primary Interface Language</label>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                      {['English', 'Hindi', 'Spanish', 'Mandarin'].map((lang) => (
                        <Button
                          key={lang}
                          variant="outline"
                          onClick={() => setFormData({ ...formData, language: lang })}
                          className={`rounded-2xl h-14 font-black text-[10px] uppercase tracking-widest transition-all duration-300 border-2
                            ${formData.language === lang
                              ? 'bg-slate-900 border-slate-900 text-white shadow-xl shadow-slate-900/20 active:scale-95'
                              : 'bg-white border-slate-100 text-slate-500 hover:border-slate-200 hover:bg-slate-50'
                            }`}
                        >
                          {lang}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-between items-center pt-10 border-t border-slate-200/60">
          <Button
            variant="ghost"
            onClick={prevStep}
            disabled={currentStep === 0}
            className="rounded-[1.25rem] h-14 px-8 text-slate-400 font-black text-[10px] uppercase tracking-[0.25em] hover:text-slate-900 hover:bg-white transition-all disabled:opacity-0"
          >
            <ChevronLeft className="w-4 h-4 mr-3" />
            REVERT
          </Button>
          <Button
            onClick={nextStep}
            disabled={currentStep === 0 && !formData.interest}
            className="bg-slate-900 hover:bg-slate-800 text-white rounded-[1.25rem] h-15 px-10 font-black text-[11px] uppercase tracking-[0.3em] shadow-2xl transition-all group active:scale-95"
          >
            {currentStep === STEPS.length - 1 ? 'Activate Neural Link' : 'NEXT_DATA_PHASE'}
            <ChevronRight className="w-4 h-4 ml-3 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </div>
  );
}
