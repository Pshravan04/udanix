'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ShieldCheck, Upload, ChevronRight, ChevronLeft, Award, Globe, IndianRupee } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

const STEPS = [
  {
    id: 'basic',
    title: 'Professional Profile',
    subtitle: 'Tell us about your background and qualifications',
  },
  {
    id: 'expertise',
    title: 'Verification & Expertise',
    subtitle: 'Upload your credentials and select your specialties',
  },
  {
    id: 'submit',
    title: 'Review & Submit',
    subtitle: 'Your application will be hidden from the public until approved',
  }
];

export default function CounselorOnboarding() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    qualification: '',
    experience: '',
    specialties: [] as string[],
    price: '',
  });

  const nextStep = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        await supabase.from('profiles').upsert({
          id: user.id,
          full_name: formData.fullName,
          bio: `Experience: ${formData.experience} years. Qualification: ${formData.qualification}. Specialties: ${formData.specialties.join(', ')}`,
          price_per_hour: parseFloat(formData.price) || 0,
          updated_at: new Date().toISOString(),
        });
      }

      setIsSubmitting(false);
      router.push('/counselor');
      router.refresh();
    } catch (err) {
      console.error('Counselor onboarding error:', err);
      setIsSubmitting(false);
      router.push('/counselor');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6 selection:bg-udanix-blue/10">
      <div className="w-full max-w-3xl space-y-10">
        {/* Verification Status Header */}
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-2.5 px-5 py-2 bg-white rounded-full border border-slate-200/60 shadow-sm">
            <ShieldCheck className="w-4 h-4 text-udanix-blue" />
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">Secure Provider Protocol</span>
          </div>
        </div>

        <div className="text-center space-y-3">
          <h1 style={{ fontFamily: 'var(--font-space-grotesk)' }} className="text-4xl font-black tracking-tighter text-slate-900 uppercase">{STEPS[currentStep].title}</h1>
          <p className="text-slate-500 font-medium text-lg leading-relaxed max-w-lg mx-auto">{STEPS[currentStep].subtitle}</p>
        </div>

        <div className="relative min-h-[520px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -15, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-200/40 p-10 md:p-14"
            >
              {currentStep === 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 ml-1">Full Legal Name</label>
                    <div className="relative group">
                      <Input
                        placeholder="DR. SARAH JENKINS"
                        className="h-14 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-udanix-blue/20 focus:bg-white transition-all font-black text-xs uppercase tracking-widest px-5 shadow-inner"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 ml-1">Highest Qualification</label>
                    <Input
                      placeholder="PHD IN PSYCHOLOGY"
                      className="h-14 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-udanix-blue/20 focus:bg-white transition-all font-black text-xs uppercase tracking-widest px-5 shadow-inner"
                      value={formData.qualification}
                      onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 ml-1">Experience (Years)</label>
                    <Input
                      type="number"
                      placeholder="00"
                      className="h-14 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-udanix-blue/20 focus:bg-white transition-all font-black text-xs px-5 shadow-inner"
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 ml-1">Session Rate (₹)</label>
                    <div className="relative">
                      <IndianRupee className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input
                        placeholder="0.00"
                        className="pl-12 h-14 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-udanix-blue/20 focus:bg-white transition-all font-black text-xs px-5 shadow-inner"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 1 && (
                <div className="space-y-12">
                  <div className="p-10 rounded-3xl bg-blue-50/30 border-2 border-dashed border-blue-100 text-center space-y-5 cursor-pointer hover:bg-blue-50/50 hover:border-udanix-blue/30 transition-all group overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-udanix-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="w-16 h-16 rounded-2xl bg-white shadow-xl shadow-blue-500/10 flex items-center justify-center text-udanix-blue mx-auto group-hover:scale-110 group-hover:-rotate-3 transition-transform relative z-10">
                      <Upload className="w-7 h-7" />
                    </div>
                    <div className="relative z-10">
                      <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-700">Upload Professional Credentials</p>
                      <p className="text-[10px] text-slate-400 mt-2 font-medium tracking-wide uppercase opacity-60">PDF / JPG_DATA (MAX. 5MB)</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-slate-900 flex items-center justify-center">
                        <Award className="w-4 h-4 text-white" />
                      </div>
                      <label className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-900">Vector Specialties</label>
                    </div>
                    <div className="flex flex-wrap gap-2.5">
                      {['Career Planning', 'Mental Wellness', 'Anxiety Support', 'Relationship', 'Academic Stress', 'Study Abroad'].map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => {
                            const newTags = formData.specialties.includes(tag)
                              ? formData.specialties.filter(t => t !== tag)
                              : [...formData.specialties, tag];
                            setFormData({ ...formData, specialties: newTags });
                          }}
                          className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 border-2
                            ${formData.specialties.includes(tag)
                              ? 'bg-slate-900 border-slate-900 text-white shadow-lg scale-[1.03]'
                              : 'bg-white border-slate-100 text-slate-400 hover:border-slate-300 hover:text-slate-600'
                            }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="text-center space-y-12 py-10">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-3xl bg-emerald-50 flex items-center justify-center text-emerald-500 mx-auto relative z-10">
                      <Globe className="w-10 h-10" />
                    </div>
                    <div className="absolute inset-0 bg-emerald-400/20 blur-3xl rounded-full scale-150" />
                  </div>
                  <div className="space-y-5">
                    <h3 style={{ fontFamily: 'var(--font-space-grotesk)' }} className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Finalize Protocol</h3>
                    <p className="text-slate-500 text-sm font-medium max-w-sm mx-auto leading-relaxed">
                      Provider application will enter the <span className="text-udanix-blue font-bold">UDANIX_VALIDATION_QUEUE</span>. Verification latency: 24-48 hours.
                    </p>
                  </div>
                  <div className="flex flex-col gap-3 max-w-sm mx-auto">
                    <div className="p-5 rounded-2xl bg-orange-50/50 border border-orange-100 flex gap-4 text-left">
                      <ShieldCheck className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                      <p className="text-[10px] text-orange-800 font-bold uppercase tracking-wider leading-relaxed">Identity encryption active. Data used exclusively for internal trust scoring.</p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-between items-center gap-6 pt-4 border-t border-slate-200/60">
          <Button
            variant="ghost"
            onClick={prevStep}
            disabled={currentStep === 0 || isSubmitting}
            className="rounded-2xl h-15 px-8 text-slate-400 font-black text-[10px] uppercase tracking-[0.25em] hover:text-slate-900 transition-all disabled:opacity-0"
          >
            <ChevronLeft className="w-4 h-4 mr-3" />
            REVERT
          </Button>

          <div className="flex gap-2 min-w-[120px] justify-center">
            {STEPS.map((_, idx) => (
              <div key={idx} className={`h-1 rounded-full transition-all duration-500 ${idx <= currentStep ? 'bg-slate-900 w-8' : 'bg-slate-200 w-3'}`} />
            ))}
          </div>

          <Button
            onClick={nextStep}
            disabled={isSubmitting}
            className="bg-udanix-blue hover:bg-blue-600 text-white rounded-2xl h-15 px-12 font-black text-[11px] uppercase tracking-[0.3em] shadow-2xl shadow-blue-500/20 transition-all active:scale-95 flex items-center gap-3"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
                VERIFYING...
              </span>
            ) : (
              <>
                {currentStep === STEPS.length - 1 ? 'INITIATE_UP-LINK' : 'CONTINUE_DATA'}
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
