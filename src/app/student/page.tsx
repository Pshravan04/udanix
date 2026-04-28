'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DashboardStats } from '@/components/dashboard/stat-cards';
import { UpcomingSessions } from '@/components/dashboard/upcoming-sessions';
import { StudentSidebar } from '@/components/dashboard/student-sidebar';
import { createClient } from '@/lib/supabase/client';
import { Loader2, Sparkles, Plus } from 'lucide-react';
import Link from 'next/link';

export default function StudentDashboard() {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [sessions, setSessions] = useState<any[]>([]);

  useEffect(() => {
    async function loadStudentData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // 1. Fetch Student Profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      setProfile(profileData);

      // 2. Fetch Upcoming Sessions
      const { data: sessionData } = await supabase
        .from('sessions')
        .select('*, profiles:counselor_id(full_name)')
        .eq('student_id', user.id)
        .eq('status', 'scheduled')
        .order('start_time', { ascending: true });
      setSessions(sessionData || []);

      setLoading(false);
    }
    loadStudentData();
  }, [supabase]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F8FAFC]">
        <div className="relative">
           <Loader2 className="w-16 h-16 text-udanix-blue animate-spin" />
           <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2 h-2 bg-udanix-blue rounded-full animate-ping" />
           </div>
        </div>
      </div>
    );
  }

  const firstName = profile?.full_name?.split(' ')[0] || 'Student';
  const nextSession = sessions[0];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex p-5 gap-8">
      <StudentSidebar />

      <main className="flex-1 space-y-10 pr-4">
        {/* Header Section */}
        <section className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-4">
          <div className="space-y-1">
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 mb-2">
               <span className="px-3 py-1 rounded-full bg-udanix-blue/5 border border-udanix-blue/10 text-udanix-blue text-[10px] font-black uppercase tracking-[0.2em] shadow-sm">
                  Active Node
               </span>
               <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </motion.div>
            <h1 className="text-[42px] font-black text-[#111827] tracking-tighter leading-none uppercase" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
              Good Morning, <span className="text-udanix-blue">{firstName}</span>! 👋
            </h1>
            <p className="text-[#9CA3AF] text-lg font-medium">
              {nextSession 
                ? `Your next session is ${new Date(nextSession.start_time).toLocaleDateString('en-US', { weekday: 'long', hour: '2-digit', minute: '2-digit' })}`
                : 'No upcoming sessions scheduled.'
              }
            </p>
          </div>

          <Link href="/student/directory">
            <button className="bg-udanix-blue text-white px-10 py-4 rounded-2xl text-sm font-black shadow-2xl shadow-blue-900/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-3 uppercase tracking-widest">
              <Plus className="w-5 h-5" /> Book Session
            </button>
          </Link>
        </section>

        {/* Stats Row */}
        <section>
          <DashboardStats 
            sessionsDone={profile?.sessions_count || 0}
            avgRating={profile?.rating || 5.0}
            goalsMet="72%" // Could be dynamic later
          />
        </section>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
                <UpcomingSessions sessions={sessions} />
            </div>
            
            {/* Quick Action Card */}
            <div className="space-y-6">
                <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl shadow-slate-900/10 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16 group-hover:scale-110 transition-transform duration-700" />
                    <Sparkles className="w-10 h-10 mb-8 text-udanix-blue" />
                    <h3 className="text-2xl font-black tracking-tight uppercase mb-4 leading-none" style={{ fontFamily: 'var(--font-space-grotesk)' }}>Assessment Center</h3>
                    <p className="text-slate-400 text-sm font-medium mb-10">Complete your interest pulse to unlock advanced counselor matching.</p>
                    <button className="w-full py-5 bg-udanix-blue text-white text-[11px] font-black uppercase tracking-widest rounded-2xl shadow-xl hover:-translate-y-1 active:translate-y-0 transition-all">Start Assessment</button>
                </div>
            </div>
        </div>
      </main>
    </div>
  );
}
