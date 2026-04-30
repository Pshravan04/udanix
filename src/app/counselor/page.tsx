'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  DollarSign, Users, Star, Video, MessageSquare,
  Clock, ArrowRight, Award, Loader2
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { fadeUpStagger as fadeUp } from '@/lib/animations';
import { Profile, Session } from '@/types';



export default function CounselorDashboard() {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [students, setStudents] = useState<Profile[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);

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

      // Fetch Upcoming Sessions (where I am the counselor)
      const { data: sessionData } = await supabase
        .from('sessions')
        .select('*, profiles!sessions_student_id_fkey(full_name)')
        .eq('counselor_id', user.id)
        .eq('status', 'scheduled')
        .order('start_time', { ascending: true });
      
      const formattedSessions = (sessionData || []).map((s: unknown) => {
        const session = s as Session & { profiles: Profile | Profile[] };
        return {
          ...session,
          profiles: Array.isArray(session.profiles) ? session.profiles[0] : (session.profiles as Profile)
        };
      });
      setSessions(formattedSessions);

      // Fetch Students (unique students from all my sessions)
      const { data: studentRecords } = await supabase
        .from('sessions')
        .select('student_id, profiles!sessions_student_id_fkey(*)')
        .eq('counselor_id', user.id);

      // Deduplicate students
      const profileMap = new Map();
      (studentRecords || []).forEach((record: unknown) => {
        const r = record as { student_id: string, profiles: Profile | Profile[] };
        const p = Array.isArray(r.profiles) ? r.profiles[0] : r.profiles;
        if (p && p.id) {
          profileMap.set(p.id, p);
        }
      });
      setStudents(Array.from(profileMap.values()));

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

      {/* ─── Header ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-8 pt-4">
        <div>
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
            className="text-5xl font-black text-slate-900 tracking-tighter uppercase"
          >
            Counselor Node
          </motion.h1>
          <p className="text-slate-500 mt-2 text-xl font-medium">
            System identifies <span className="text-emerald-600 font-black tracking-tight">{sessions.length} ACTIVE SYNCS</span> today.
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsLive(!isLive)}
          className={`flex items-center gap-3 px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all border shadow-2xl ${isLive
            ? 'bg-emerald-50 border-emerald-100 text-emerald-600 shadow-emerald-500/10'
            : 'bg-white border-slate-100 text-slate-400 hover:text-slate-600 hover:border-slate-200 shadow-slate-200/50'
            }`}
        >
          <span className={`w-3 h-3 rounded-full ${isLive ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`} />
          {isLive ? 'Link Established' : 'Initialize Status'}
        </motion.button>
      </div>

      {/* ─── Stats row ─── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { icon: DollarSign, label: 'Earnings', value: `₹${(profile?.sessions_count || 0) * (profile?.price_per_hour || 500)}`, change: '+12%', color: 'emerald' },
          { icon: Users, label: 'Active Roster', value: students.length.toString(), change: '+3 new', color: 'blue' },
          { icon: Clock, label: 'Hours Toted', value: `${(profile?.sessions_count || 0)}h`, change: 'This month', color: 'blue' },
          { icon: Star, label: 'Expert Core', value: (profile?.rating || 4.9).toString(), change: '↑ from 4.8', color: 'amber' },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-premium hover:shadow-2xl transition-all group overflow-hidden relative">
            <div className="absolute -bottom-4 -right-4 w-28 h-28 bg-udanix-blue/[0.02] rounded-full group-hover:scale-150 transition-transform duration-700" />
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border transition-all ${s.color === 'emerald' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
              s.color === 'amber' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                'bg-udanix-blue/5 text-udanix-blue border-udanix-blue/10'
              } group-hover:scale-110 group-hover:rotate-6`}>
              <s.icon className="w-7 h-7" />
            </div>
            <p style={{ fontFamily: 'var(--font-space-grotesk)' }} className="text-4xl font-black text-slate-900 tracking-tighter uppercase">{s.value}</p>
            <div className="flex items-center justify-between mt-2">
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] group-hover:text-udanix-blue transition-colors">{s.label}</p>
              <p className="text-emerald-600 text-[10px] font-black uppercase tracking-tighter bg-emerald-50 px-2 py-0.5 rounded-full">{s.change}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ─── Main grid ─── */}
      <div className="grid lg:grid-cols-3 gap-10">

        {/* Today's Schedule */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center justify-between px-2">
            <h2 style={{ fontFamily: 'var(--font-space-grotesk)' }} className="text-2xl font-black text-slate-900 tracking-tighter uppercase flex items-center gap-3">
              <div className="w-2 h-8 bg-udanix-blue rounded-full" />
              Active Syncs
            </h2>
            <button className="text-xs font-black text-udanix-blue hover:text-blue-700 transition-colors flex items-center gap-2 uppercase tracking-widest group">
              Master Logs <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="space-y-5">
            {sessions.length === 0 ? (
              <div className="bg-white rounded-[2.5rem] border border-slate-100 p-12 text-center">
                <p className="text-slate-400 font-bold uppercase tracking-widest italic">No active syncs found.</p>
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
                <div className="w-18 h-18 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-slate-600 font-black text-2xl shadow-inner border border-slate-200 shrink-0 group-hover:scale-105 group-hover:bg-udanix-blue group-hover:text-white transition-all">
                  {s.profiles?.full_name?.charAt(0) || 'S'}
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
                  <Button size="sm" className="h-13 px-8 bg-udanix-blue hover:bg-blue-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-blue-500/10 transition-all group-hover:scale-105 active:scale-95">
                    Link <Video className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Performance */}
        <div className="space-y-8">
          <h2 style={{ fontFamily: 'var(--font-space-grotesk)' }} className="text-2xl font-black text-slate-900 tracking-tighter uppercase flex items-center gap-3 px-2">
            <div className="w-2 h-8 bg-udanix-cyan rounded-full" />
            Core Analytics
          </h2>
          <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 space-y-8 shadow-premium group hover:shadow-2xl transition-all">
            {[
              { label: 'Completion Rate', value: 96, color: 'blue' },
              { label: 'Satisfaction', value: 98, color: 'emerald' },
              { label: 'Response Time', value: 87, color: 'blue' },
            ].map(m => (
              <div key={m.label} className="space-y-4">
                <div className="flex justify-between items-center px-1">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">{m.label}</span>
                  <span className="text-sm font-black text-slate-900 uppercase">LVL {m.value}</span>
                </div>
                <div className="h-2 bg-slate-50 rounded-full overflow-hidden border border-slate-100 shadow-inner">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${m.value}%` }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className={`h-full rounded-full ${m.color === 'emerald' ? 'bg-gradient-to-r from-emerald-500 to-emerald-400' : 'bg-gradient-to-r from-udanix-blue to-udanix-cyan shadow-lg shadow-blue-500/20'}`}
                  />
                </div>
              </div>
            ))}

            <div className="pt-8 border-t border-slate-50">
              <div className="flex items-center gap-4 p-5 rounded-[1.5rem] bg-amber-50 border border-amber-100 shadow-sm">
                <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center shrink-0">
                  <Award className="w-6 h-6 text-amber-600" />
                </div>
                <p className="text-[13px] font-black text-amber-900 uppercase tracking-tighter leading-tight">Elite Node Tier:<br /><span className="text-[9px] font-bold text-amber-600 opacity-80 tracking-widest uppercase">Top 5% Global Index</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── My Students ─── */}
      <div className="space-y-8">
        <div className="flex items-center justify-between px-2">
          <h2 style={{ fontFamily: 'var(--font-space-grotesk)' }} className="text-2xl font-black text-slate-900 tracking-tighter uppercase flex items-center gap-3">
            <div className="w-2 h-8 bg-udanix-blue rounded-full" />
            Personnel Index
          </h2>
          <button className="text-xs font-black text-udanix-blue hover:text-blue-700 transition-colors flex items-center gap-2 uppercase tracking-widest group">
            Directory <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {students.length === 0 ? (
            <div className="col-span-full bg-white rounded-[2.5rem] border border-slate-100 p-12 text-center text-slate-400 font-bold uppercase tracking-widest italic">
              No students recorded in the registry yet.
            </div>
          ) : students.map((s, i) => (
            <motion.div
              key={s.id}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-premium hover:shadow-2xl transition-all group relative border-t-4 border-t-udanix-blue"
            >
              <div className="flex items-center gap-5 mb-8">
                <div className="w-16 h-16 rounded-[1.25rem] bg-slate-50 border border-slate-100 flex items-center justify-center text-udanix-blue font-black text-xl shadow-inner group-hover:bg-udanix-blue group-hover:text-white transition-all shrink-0">
                  {s.full_name?.charAt(0) || 'S'}
                </div>
                <div className="min-w-0">
                  <p style={{ fontFamily: 'var(--font-space-grotesk)' }} className="font-black text-slate-900 text-lg tracking-tight truncate uppercase group-hover:text-udanix-blue transition-colors">{s.full_name}</p>
                  <p className="text-slate-400 text-[10px] font-black truncate opacity-80 uppercase tracking-widest mt-0.5">{s.stream || 'General Study'}</p>
                </div>
              </div>

              <div className="space-y-3 mb-8 bg-slate-50/50 p-5 rounded-[1.5rem] border border-slate-100 shadow-inner">
                <div className="flex justify-between text-[10px] uppercase font-black tracking-widest">
                  <span className="text-slate-400">Node Completion</span>
                  <span className="text-udanix-blue font-black">{s.progress || '50%'}</span>
                </div>
                <div className="h-2 bg-white rounded-full overflow-hidden border border-slate-100">
                  <div className="h-full bg-gradient-to-r from-udanix-blue to-udanix-cyan rounded-full shadow-sm" style={{ width: s.progress || '50%' }} />
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{s.sessions_count || 0} Syncs · Active</span>
                <Button variant="ghost" size="sm" className="h-11 px-6 text-udanix-blue hover:bg-udanix-blue/5 text-xs font-black uppercase tracking-widest rounded-2xl transition-all">
                  Sync <MessageSquare className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
