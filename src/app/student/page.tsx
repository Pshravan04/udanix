'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Search, MessageSquare, Calendar, Video, ArrowRight,
  Clock, TrendingUp, CheckCircle2, Star, Zap, BookOpen, Users, Loader2
} from 'lucide-react';
import { BookingDialog } from '@/components/booking-dialog';
import { createClient } from '@/lib/supabase/client';

const COUNSELORS = [
  { name: 'Dr. Sarah Jenkins', specialty: 'Psychology & Anxiety', rating: '4.9', sessions: '1.2k', online: true, initials: 'SJ' },
  { name: 'Michael Chen', specialty: 'Career Intelligence', rating: '4.8', sessions: '890', online: false, initials: 'MC' },
  { name: 'Aisha Khan', specialty: 'Adolescent Development', rating: '5.0', sessions: '2.1k', online: true, initials: 'AK' },
];

const QUICK_ACTIONS = [
  { icon: Search, label: 'Find Expert', desc: 'Browse counselors', href: '/student/directory', color: 'blue' },
  { icon: Calendar, label: 'Schedule', desc: 'Book a session', href: '#', color: 'cyan' },
  { icon: MessageSquare, label: 'Messages', desc: '2 unread', href: '#', color: 'blue', badge: 2 },
  { icon: Video, label: 'Join Call', desc: 'Session at 4PM', href: '#', color: 'cyan' },
];

const UPCOMING = [
  { counselor: 'Dr. Sarah Jenkins', time: 'Today at 4:00 PM', type: 'Video', tag: 'Career Planning', initials: 'SJ' },
  { counselor: 'Michael Chen', time: 'Tomorrow at 11:00 AM', type: 'Audio', tag: 'Resume Review', initials: 'MC' },
];

const ACTIVITY = [
  { label: 'Session completed', sub: 'Psychology deep-dive with Dr. Khan', time: '2h ago', icon: CheckCircle2, color: 'green' },
  { label: 'New message', sub: "Michael Chen: \"Let's revisit your goals...\"", time: '5h ago', icon: MessageSquare, color: 'blue' },
  { label: 'Session booked', sub: 'Dr. Sarah Jenkins · Tomorrow 4PM', time: '1d ago', icon: Calendar, color: 'blue' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.08 } }),
};

export default function StudentDashboard() {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [sessions, setSessions] = useState([] as any[]);
  const [counselors, setCounselors] = useState([] as any[]);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    async function loadDashboard() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Fetch Profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      setProfile(profileData);

      // Fetch Upcoming Sessions
      const { data: sessionData } = await supabase
        .from('sessions')
        .select('*, profiles!sessions_counselor_id_fkey(full_name)')
        .eq('student_id', user.id)
        .eq('status', 'scheduled')
        .order('start_time', { ascending: true })
        .limit(3);
      setSessions(sessionData || []);

      // Fetch Recommended Counselors
      const { data: counselorData } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'counselor')
        .limit(3);
      setCounselors(counselorData || []);

      setLoading(false);
    }
    loadDashboard();
  }, [supabase]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-12 h-12 text-udanix-blue animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-24">

      {/* ─── Page Header ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-8 pt-4">
        <div>
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
            className="text-5xl font-black text-slate-900 tracking-tighter uppercase"
          >
            Systems Active 👋
          </motion.h1>
          <p className="text-slate-500 mt-2 text-xl font-medium">
            Next synchronization in <span className="text-udanix-blue font-black tracking-tight">2 HOURS</span>.
          </p>
        </div>
        <Link href="/student/directory">
          <Button className="h-14 px-10 bg-udanix-blue hover:bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl shadow-blue-500/20 transition-all hover:scale-105 active:scale-95">
            <Search className="w-5 h-5 mr-3" /> Initialize Search
          </Button>
        </Link>
      </div>

      {/* ─── Quick Actions ─── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        {QUICK_ACTIONS.map((a, i) => (
          <motion.a
            key={a.label}
            href={a.href}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={i}
            className="relative group bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-premium hover:shadow-2xl transition-all cursor-pointer block overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-udanix-blue/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-[1.25rem] bg-slate-50 group-hover:bg-udanix-blue group-hover:text-white flex items-center justify-center mb-6 transition-all shadow-inner border border-slate-100 group-hover:rotate-6">
                <a.icon className="w-7 h-7 text-udanix-blue group-hover:text-white transition-colors" />
              </div>
              <p style={{ fontFamily: 'var(--font-space-grotesk)' }} className="font-black text-slate-900 text-lg tracking-tight uppercase">{a.label}</p>
              <p className="text-slate-400 text-sm mt-1 font-bold uppercase tracking-widest opacity-80">{a.desc}</p>
              {a.badge && (
                <span className="absolute top-0 right-0 w-7 h-7 rounded-full bg-udanix-blue text-white text-[11px] font-black flex items-center justify-center shadow-lg transform translate-x-1/4 -translate-y-1/4">
                  {a.badge}
                </span>
              )}
            </div>
          </motion.a>
        ))}
      </div>

      {/* ─── Main grid ─── */}
      <div className="grid lg:grid-cols-3 gap-10">

        {/* Upcoming Sessions */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center justify-between px-2">
            <h2 style={{ fontFamily: 'var(--font-space-grotesk)' }} className="text-2xl font-black text-slate-900 tracking-tighter uppercase flex items-center gap-3">
              <div className="w-2 h-8 bg-udanix-blue rounded-full" />
              Upcoming Syncs
            </h2>
            <Link href="#" className="text-xs font-black text-udanix-blue hover:text-blue-700 transition-colors flex items-center gap-2 uppercase tracking-widest group">
              Global Logs <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="space-y-5">
            {sessions.length === 0 ? (
              <div className="bg-white rounded-[2.5rem] border border-slate-100 p-12 text-center">
                <p className="text-slate-400 font-bold uppercase tracking-widest italic">No upcoming syncs scheduled.</p>
                <Link href="/student/directory">
                  <Button variant="link" className="text-udanix-blue font-black mt-2">Initialize First Sync →</Button>
                </Link>
              </div>
            ) : sessions.map((s, i) => (
              <motion.div
                key={s.id}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={i}
                className="bg-white rounded-[2.5rem] border border-slate-100 p-8 flex flex-col sm:flex-row items-center gap-8 shadow-premium hover:shadow-2xl transition-all group"
              >
                <div className="w-18 h-18 rounded-2xl bg-gradient-to-br from-udanix-blue to-udanix-cyan flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-blue-500/10 shrink-0 group-hover:scale-105 transition-transform">
                  {s.profiles?.full_name?.charAt(0) || 'C'}
                </div>
                <div className="flex-1 min-w-0 text-center sm:text-left">
                  <p style={{ fontFamily: 'var(--font-space-grotesk)' }} className="font-black text-slate-900 text-xl tracking-tight uppercase group-hover:text-udanix-blue transition-colors">{s.profiles?.full_name}</p>
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mt-2">
                    <span className="flex items-center gap-2 text-slate-500 text-sm font-bold uppercase tracking-widest">
                      <Clock className="w-4 h-4 text-udanix-blue" /> {new Date(s.start_time).toLocaleString()}
                    </span>
                    <span className="text-[10px] font-black text-udanix-blue bg-udanix-blue/5 px-4 py-1.5 rounded-full uppercase tracking-[0.15em] border border-udanix-blue/10">{s.topic}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <span className="text-[10px] font-black text-slate-400 bg-slate-50 px-4 py-2 rounded-xl uppercase tracking-widest border border-slate-100">{s.type || 'Video'}</span>
                  <Button size="sm" className="h-13 px-8 bg-[#F8FAFC] border border-slate-200 hover:bg-udanix-blue hover:text-white text-slate-900 rounded-2xl text-xs font-black uppercase tracking-widest transition-all group-hover:scale-105 active:scale-95">
                    Connect <Video className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recent activity */}
        <div className="space-y-8">
          <h2 style={{ fontFamily: 'var(--font-space-grotesk)' }} className="text-2xl font-black text-slate-900 tracking-tighter uppercase flex items-center gap-3 px-2">
            <div className="w-2 h-8 bg-udanix-cyan rounded-full" />
            Neural Feed
          </h2>
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-premium divide-y divide-slate-50 overflow-hidden">
            {ACTIVITY.map((a, i) => (
              <div key={i} className="p-6 flex items-start gap-5 hover:bg-slate-50/50 transition-colors cursor-default">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100 shadow-inner">
                  <a.icon className="w-5 h-5 text-udanix-blue" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-black text-slate-900 text-sm tracking-tight uppercase">{a.label}</p>
                  <p className="text-slate-500 text-sm mt-1 truncate font-medium">{a.sub}</p>
                </div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter shrink-0 pt-1">{a.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Recommended Counselors ─── */}
      <div className="space-y-8">
        <div className="flex items-center justify-between px-2">
          <h2 style={{ fontFamily: 'var(--font-space-grotesk)' }} className="text-2xl font-black text-slate-900 tracking-tighter uppercase flex items-center gap-3">
            <div className="w-2 h-8 bg-udanix-blue rounded-full" />
            Expert Registry
          </h2>
          <Link href="/student/directory" className="text-xs font-black text-udanix-blue hover:text-blue-700 transition-colors flex items-center gap-2 uppercase tracking-widest group">
            Browse All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {counselors.map((c, i) => (
            <motion.div
              key={c.id}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-premium hover:shadow-2xl transition-all group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-5">
                <span className={`text-[9px] font-black px-3.5 py-1.5 rounded-full uppercase tracking-[0.15em] border ${c.online ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-slate-50 text-slate-400 border-slate-100'}`}>
                  {c.online ? '● Active' : '○ Standby'}
                </span>
              </div>

              <div className="flex items-center gap-5 mb-8">
                <div className="w-16 h-16 rounded-[1.25rem] bg-slate-50 flex items-center justify-center text-udanix-blue font-black text-xl shadow-inner border border-slate-100 group-hover:scale-110 transition-transform">
                  {c.full_name?.charAt(0) || 'C'}
                </div>
                <div className="min-w-0">
                  <p style={{ fontFamily: 'var(--font-space-grotesk)' }} className="font-black text-slate-900 text-lg tracking-tight truncate uppercase group-hover:text-udanix-blue transition-colors">{c.full_name}</p>
                  <p className="text-slate-400 text-[11px] font-black uppercase tracking-[0.1em] truncate opacity-80 mt-0.5">{c.stream || 'Expert Consultant'}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pb-8 border-b border-slate-50">
                <div className="bg-slate-50/50 rounded-2xl p-3 flex flex-col items-center justify-center">
                  <div className="flex items-center gap-1.5 text-amber-500 font-black text-sm">
                    <Star className="w-4 h-4 fill-amber-500" /> {c.rating || '5.0'}
                  </div>
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Rating</span>
                </div>
                <div className="bg-slate-50/50 rounded-2xl p-3 flex flex-col items-center justify-center">
                  <div className="flex items-center gap-1.5 text-slate-900 font-black text-sm uppercase">
                    <Users className="w-4 h-4 text-udanix-blue" /> {c.sessions_count || 0}
                  </div>
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Syncs</span>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-8">
                <Button variant="outline" size="sm" className="flex-1 h-12 rounded-2xl border-slate-200 text-slate-600 font-black text-[11px] uppercase tracking-widest hover:bg-slate-50 transition-all">
                  Profile
                </Button>
                <BookingDialog
                  counselorName={c.full_name}
                  trigger={
                    <Button size="sm" className="flex-1 h-12 rounded-2xl bg-udanix-blue hover:bg-blue-600 text-white font-black text-[11px] uppercase tracking-widest shadow-xl shadow-blue-500/10 transition-all hover:scale-[1.02]">
                      Secure Sync
                    </Button>
                  }
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ─── Stats bar ─── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
        {[
          { icon: CheckCircle2, label: 'Sessions', value: '12', color: 'emerald' },
          { icon: Clock, label: 'Hours', value: '18h', color: 'blue' },
          { icon: TrendingUp, label: 'Efficiency', value: '87%', color: 'blue' },
          { icon: Zap, label: 'Milestones', value: '4/5', color: 'amber' },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-premium hover:shadow-2xl transition-all group overflow-hidden relative">
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-udanix-blue/[0.02] rounded-full group-hover:scale-150 transition-transform duration-700" />
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border transition-all ${s.color === 'emerald' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
              s.color === 'amber' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                'bg-udanix-blue/5 text-udanix-blue border-udanix-blue/10'
              } group-hover:scale-110 group-hover:rotate-6`}>
              <s.icon className="w-7 h-7" />
            </div>
            <p style={{ fontFamily: 'var(--font-space-grotesk)' }} className="text-4xl font-black text-slate-900 tracking-tighter uppercase">{s.label === 'Sessions' ? (profile?.sessions_count || 0) : s.value}</p>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mt-2 group-hover:text-udanix-blue transition-colors">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
