"use client";

import { motion } from "framer-motion";
import { 
  Clock, 
  ClipboardList, 
  Users, 
  BarChart, 
  ArrowRight,
  Sparkles,
  Target,
  BrainCircuit,
  UserCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";

const assessments = [
  {
    id: "interest",
    title: "Career Interest Assessment",
    description: "Discover your interests and find careers that match your personality and passions.",
    duration: "15 minutes",
    questions: "50 Questions",
    completed: "45,000+ students",
    level: "Beginner",
    icon: <Target className="w-6 h-6" />,
    color: "from-blue-500 to-indigo-600",
    glow: "rgba(59, 130, 246, 0.5)"
  },
  {
    id: "stream",
    title: "Stream Selection Test",
    description: "Determine which stream (Science/Commerce/Arts) is best suited for your skills and goals.",
    duration: "20 minutes",
    questions: "40 Questions",
    completed: "38,000+ students",
    level: "Beginner",
    icon: <BrainCircuit className="w-6 h-6" />,
    color: "from-orange-500 to-amber-600",
    glow: "rgba(249, 115, 22, 0.5)"
  },
  {
    id: "aptitude",
    title: "Aptitude & Skills Test",
    description: "Evaluate your analytical, logical, and creative skills to identify your core strengths.",
    duration: "30 minutes",
    questions: "60 Questions",
    completed: "28,000+ students",
    level: "Intermediate",
    icon: <Sparkles className="w-6 h-6" />,
    color: "from-purple-500 to-fuchsia-600",
    glow: "rgba(168, 85, 247, 0.5)"
  },
  {
    id: "personality",
    title: "Personality Assessment",
    description: "Understand your personality type and how it influences your career preferences.",
    duration: "25 minutes",
    questions: "45 Questions",
    completed: "32,000+ students",
    level: "Intermediate",
    icon: <UserCheck className="w-6 h-6" />,
    color: "from-cyan-500 to-blue-600",
    glow: "rgba(6, 182, 212, 0.5)"
  }
];

export function AssessmentSection() {
  return (
    <section className="relative py-32 overflow-hidden bg-white">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-udanix-blue/5 rounded-full blur-[140px] animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-udanix-orange/2 rounded-full blur-[140px] animate-pulse" style={{ animationDelay: '3s' }} />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] mix-blend-overlay" />
      </div>

      <div className="max-w-[1440px] relative z-10 px-6 mx-auto">
        <div className="max-w-4xl mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6 text-left"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-udanix-orange text-[10px] font-black uppercase tracking-[0.3em]"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Scientific Methods
            </motion.div>
            <h2 className="text-6xl md:text-[100px] font-black mb-10 text-slate-950 tracking-tighter leading-[0.85] uppercase">
              Career <span className="text-brand-gradient">Assessment</span> <br />Tests
            </h2>
            <p className="text-lg md:text-2xl text-slate-500 leading-relaxed max-w-2xl font-black uppercase tracking-widest">
              Discover your <span className="text-slate-950">True Potential</span> with scientifically designed tests backed by psychological research.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {assessments.map((test, index) => (
            <motion.div
              key={test.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group"
            >
              <div className="relative h-full bg-white backdrop-blur-3xl rounded-[2.5rem] p-10 overflow-hidden border border-slate-200 hover:border-udanix-blue/30 transition-all duration-700 hover:shadow-blue-500/10 flex flex-col group-hover:-translate-y-2">
                {/* Accent Glow */}
                <div 
                  className="absolute -top-12 -right-12 w-32 h-32 blur-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-700"
                  style={{ backgroundColor: test.glow }}
                />

                {/* Animated Corner Beam */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-slate-100 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Icon Header */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${test.color} flex items-center justify-center text-white mb-8 shadow-2xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                  {test.icon}
                </div>

                <h3 className="text-2xl font-black mb-4 text-slate-950 uppercase tracking-tight leading-none group-hover:text-udanix-blue transition-colors duration-500">
                  {test.title}
                </h3>
                
                <p className="text-[10px] text-slate-500 mb-10 line-clamp-3 leading-relaxed font-black uppercase tracking-widest">
                  {test.description}
                </p>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-y-6 mb-10 border-t border-slate-100 pt-8">
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[9px] text-slate-400 uppercase font-black tracking-widest">Duration</span>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-udanix-blue" />
                      <span className="text-xs font-black text-slate-950 uppercase">{test.duration}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[9px] text-slate-400 uppercase font-black tracking-widest">Format</span>
                    <div className="flex items-center gap-2">
                      <ClipboardList className="w-3.5 h-3.5 text-udanix-blue" />
                      <span className="text-xs font-black text-slate-950 uppercase">{test.questions.split(' ')[0]} Qs</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[9px] text-slate-400 uppercase font-black tracking-widest">Students</span>
                    <div className="flex items-center gap-2">
                      <Users className="w-3.5 h-3.5 text-udanix-blue" />
                      <span className="text-xs font-black text-slate-950 uppercase">{test.completed.split(' ')[0]}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[9px] text-slate-400 uppercase font-black tracking-widest">Level</span>
                    <div className="flex items-center gap-2">
                      <BarChart className="w-3.5 h-3.5 text-udanix-blue" />
                      <span className="text-xs font-black text-slate-950 uppercase">{test.level}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-auto pt-6">
                  <Button 
                    className="group/btn w-full h-14 bg-slate-50 hover:bg-slate-950 text-slate-950 hover:text-white border border-slate-200 rounded-2xl transition-all duration-500 font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 shadow-inner"
                  >
                    Start Assessment <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
