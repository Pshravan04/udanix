'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy, Target, Star, TrendingUp, CheckCircle2, 
  Circle, Lock, ArrowUpRight, BarChart3, Loader2 
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { StudentSidebar } from '@/components/dashboard/student-sidebar';
import { fadeUpStagger as fadeUp } from '@/lib/animations';


export default function StudentProgress() {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    completed: 12,
    ongoing: 4,
    total: 20
  });

  useEffect(() => {
    async function loadProgress() {
      // In a real app, we'd fetch from a milestones or tasks table
      // For now, simulating with a small delay for fidelity
      await new Promise(r => setTimeout(r, 600));
      setLoading(false);
    }
    loadProgress();
  }, []);

  const milestones = [
    { title: "Career Discovery", status: "completed", date: "Oct 12, 2025", score: "92%" },
    { title: "Skill Assessment", status: "completed", date: "Nov 05, 2025", score: "88%" },
    { title: "Mentor Matching", status: "completed", date: "Dec 01, 2025", score: "100%" },
    { title: "Goal Setting Phase", status: "ongoing", date: "Current", score: "45%" },
    { title: "Portfolio Development", status: "locked", date: "Future", score: "0%" },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex p-5 gap-8">
      <StudentSidebar />

      <main className="flex-1 space-y-10 pb-16 pr-4">
        {/* Header Area */}
        <motion.div 
          initial="hidden" 
          animate="visible" 
          variants={fadeUp} 
          custom={0}
          className="relative overflow-hidden bg-slate-900 rounded-[2.5rem] p-12 shadow-2xl group"
        >
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-udanix-orange/[0.1] to-transparent pointer-events-none" />
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-udanix-orange/10 blur-[120px] rounded-full opacity-50 transition-opacity duration-1000" />
          
          <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-6 bg-udanix-orange rounded-full" />
              <span className="bg-white/10 text-udanix-orange backdrop-blur-md px-4 py-1.5 rounded-full font-black text-[10px] uppercase tracking-[0.2em]">
                Evolution Tracker
              </span>
            </div>
            <h1 style={{ fontFamily: 'var(--font-space-grotesk)' }} className="text-5xl md:text-7xl font-black tracking-tighter text-white uppercase leading-[0.9]">
              Growth <br />
              <span className="text-slate-500 italic">Timeline</span>
            </h1>
          </div>
        </motion.div>

        {/* Stats Bento */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { label: "Completed Gates", count: stats.completed, color: "#003E8A", icon: <CheckCircle2 className="w-6 h-6" /> },
            { label: "Ongoing Efforts", count: stats.ongoing, color: "#DF590E", icon: <TrendingUp className="w-6 h-6" /> },
            { label: "Total Milestones", count: stats.total, color: "#94A3B8", icon: <Target className="w-6 h-6" /> },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={i + 1}
              className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm group hover:shadow-xl transition-all"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="p-4 rounded-2xl bg-slate-50 text-slate-400 group-hover:bg-udanix-blue group-hover:text-white transition-all">
                  {s.icon}
                </div>
                <BarChart3 className="w-5 h-5 text-slate-200" />
              </div>
              <h2 className="text-4xl font-black text-slate-800 mb-1">{s.count}</h2>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Timeline List */}
        <div className="space-y-8">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">System Milestones</h3>
            <span className="text-[10px] font-black uppercase tracking-widest text-udanix-blue">Update Log: Realtime</span>
          </div>

          <div className="space-y-4">
            {loading ? (
              <div className="flex items-center justify-center p-32">
                <Loader2 className="w-12 h-12 text-udanix-blue animate-spin" />
              </div>
            ) : milestones.map((m, i) => (
              <motion.div
                key={i}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                custom={i + 4}
                className="bg-white rounded-[1.5rem] border border-slate-100 p-6 flex items-center justify-between group hover:border-udanix-blue/30 transition-all"
              >
                <div className="flex items-center gap-6">
                  <div className={`p-4 rounded-xl ${
                    m.status === 'completed' ? 'bg-udanix-blue/10 text-udanix-blue' :
                    m.status === 'ongoing' ? 'bg-udanix-orange/10 text-udanix-orange' :
                    'bg-slate-50 text-slate-300'
                  }`}>
                    {m.status === 'completed' ? <CheckCircle2 className="w-5 h-5" /> : 
                     m.status === 'ongoing' ? <Circle className="w-5 h-5 animate-pulse" /> : 
                     <Lock className="w-5 h-5" />}
                  </div>
                  <div>
                    <h4 className={`font-black uppercase tracking-tight text-sm ${m.status === 'locked' ? 'text-slate-300' : 'text-slate-800'}`}>
                      {m.title}
                    </h4>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">{m.date}</p>
                  </div>
                </div>

                <div className="flex items-center gap-10">
                  <div className="text-right hidden md:block">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Score</p>
                    <p className="text-sm font-black text-slate-900">{m.score}</p>
                  </div>
                  <button className="p-3 bg-slate-50 text-slate-300 rounded-xl group-hover:bg-udanix-blue group-hover:text-white transition-all">
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
