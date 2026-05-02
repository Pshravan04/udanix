'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { DashboardStats } from '@/components/dashboard/stat-cards';
import { UpcomingSessions } from '@/components/dashboard/upcoming-sessions';
import { StudentSidebar, MobileStudentNav } from '@/components/dashboard/student-sidebar';
import { createClient } from '@/lib/supabase/client';
import { Loader2, Plus } from 'lucide-react';
import Link from 'next/link';
import { Profile, Session } from '@/types';

export default function StudentDashboard() {
  const supabase = useMemo(() => createClient(), []);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [sessions, setSessions] = useState<Session[]>([]);

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
      
      const formattedSessions = (sessionData || []).map((s) => ({
        ...s,
        profiles: Array.isArray(s.profiles) ? s.profiles[0] : s.profiles
      })) as Session[];
      setSessions(formattedSessions);

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
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Mobile Top Navigation */}
      <MobileStudentNav />

      <div className="flex p-3 sm:p-4 lg:p-5 gap-5 lg:gap-8">
        {/* Desktop Sidebar */}
        <StudentSidebar />

        <main className="flex-1 min-w-0 space-y-6 lg:space-y-10 pb-24 lg:pb-8 lg:pr-4">
          {/* Header Section */}
          <section className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 pt-3 lg:pt-4">
            <div className="space-y-1">
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 mb-2">
                 <span className="px-3 py-1 rounded-full bg-udanix-blue/5 border border-udanix-blue/10 text-udanix-blue text-[10px] font-black uppercase tracking-[0.2em] shadow-sm">
                    Active Node
                 </span>
                 <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </motion.div>
              <h1 
                className="text-2xl sm:text-3xl lg:text-[42px] font-black text-[#111827] tracking-tighter leading-none uppercase"
                style={{ fontFamily: 'var(--font-space-grotesk)' }}
              >
                Good Morning, <span className="text-udanix-blue">{firstName}</span>! 👋
              </h1>
              <p className="text-[#9CA3AF] text-sm sm:text-base lg:text-lg font-medium">
                {nextSession 
                  ? `Your next session is ${new Date(nextSession.start_time).toLocaleDateString('en-US', { weekday: 'long', hour: '2-digit', minute: '2-digit' })}`
                  : 'No upcoming sessions scheduled.'
                }
              </p>
            </div>

            <Link href="/student/directory" className="shrink-0">
              <button className="bg-udanix-blue text-white px-6 sm:px-10 py-3 sm:py-4 rounded-2xl text-sm font-black shadow-2xl shadow-blue-900/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-3 uppercase tracking-widest w-full sm:w-auto justify-center">
                <Plus className="w-5 h-5" /> Book Session
              </button>
            </Link>
          </section>

          {/* Stats Row */}
          <section>
            <DashboardStats 
              sessionsDone={profile?.sessions_count || 0}
              avgRating={profile?.rating || 5.0}
              goalsMet="72%"
            />
          </section>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
              <div className="lg:col-span-2">
                  <UpcomingSessions sessions={sessions} />
              </div>
              
              {/* Quick Action Card */}
              <div className="space-y-6">
                  {/* Removed Assessment Center */}
              </div>
          </div>
        </main>
      </div>
    </div>
  );
}
