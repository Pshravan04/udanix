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
import { QuickActions } from '@/components/dashboard/quick-actions';

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
      <div className="flex items-center justify-center min-h-screen bg-[#f5f5f7]">
        <div className="relative">
           <Loader2 className="w-10 h-10 text-[#007AFF] animate-spin" />
        </div>
      </div>
    );
  }

  const firstName = profile?.full_name?.split(' ')[0] || 'Student';
  const nextSession = sessions[0];

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <div className="flex p-0 sm:p-4 lg:p-5 gap-5 lg:gap-8">
        {/* Desktop Sidebar */}
        <StudentSidebar />

        <main className="flex-1 min-w-0 space-y-6 lg:space-y-8 px-4 sm:px-0 pb-32 lg:pb-8 lg:pr-4 pt-6 lg:pt-0">
          {/* Header Section */}
          <section className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 pt-2">
            <div className="space-y-2">
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 mb-1">
                 <span className="px-3 py-1 rounded-full bg-white border border-slate-200 text-[#515154] text-xs font-medium shadow-sm">
                    Student Portal
                 </span>
              </motion.div>
              <h1 className="text-3xl sm:text-4xl font-semibold text-[#1d1d1f] tracking-tight">
                Good Morning, {firstName}
              </h1>
              <p className="text-[#86868b] text-sm sm:text-base font-medium">
                {nextSession 
                  ? `Your next session is ${new Date(nextSession.start_time).toLocaleDateString('en-US', { weekday: 'long', hour: '2-digit', minute: '2-digit' })}`
                  : 'No upcoming sessions scheduled.'
                }
              </p>
            </div>

            <Link href="/student/directory" className="shrink-0">
              <button className="bg-[#007AFF] hover:bg-[#0066CC] text-white px-6 sm:px-8 py-3 rounded-full text-sm font-medium shadow-sm transition-colors flex items-center gap-2 w-full sm:w-auto justify-center">
                <Plus className="w-4 h-4" /> Book Session
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
              
              {/* Quick Actions Column */}
              <div className="space-y-6">
                  <QuickActions />
              </div>
          </div>
        </main>
      </div>
    </div>
  );
}
