'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, Clock, Video, User, ChevronRight, 
  Search, Filter, Sparkles, Loader2, AlertCircle 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/client';
import { StudentSidebar } from '@/components/dashboard/student-sidebar';
import { fadeUpStagger as fadeUp } from '@/lib/animations';


export default function StudentSessions() {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [sessions, setSessions] = useState<any[]>([]);
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'completed'>('all');

  useEffect(() => {
    async function loadSessions() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('sessions')
        .select('*, profiles:counselor_id(full_name, stream, avatar_url)')
        .eq('student_id', user.id)
        .order('start_time', { ascending: true });

      if (data) setSessions(data);
      setLoading(false);
    }
    loadSessions();
  }, [supabase]);

  const filteredSessions = sessions.filter(s => {
    if (filter === 'upcoming') return new Date(s.start_time) > new Date();
    if (filter === 'completed') return new Date(s.start_time) <= new Date();
    return true;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex p-5 gap-8">
      <StudentSidebar />

      <main className="flex-1 space-y-10 pb-16 pr-4 overflow-x-hidden">
        {/* Header Area */}
        <motion.div 
          initial="hidden" 
          animate="visible" 
          variants={fadeUp} 
          custom={0}
          className="relative overflow-hidden bg-white rounded-[2.5rem] border border-slate-100 p-12 shadow-2xl shadow-slate-200/50 group"
        >
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-udanix-blue/[0.03] to-transparent pointer-events-none" />
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-udanix-blue/10 blur-[120px] rounded-full opacity-50 group-hover:opacity-70 transition-opacity duration-1000" />
          
          <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-6 bg-udanix-blue rounded-full" />
              <span className="bg-udanix-blue/10 text-udanix-blue px-4 py-1.5 rounded-full font-black text-[10px] uppercase tracking-[0.2em]">
                Active Scheduling Hub
              </span>
            </div>
            <h1 style={{ fontFamily: 'var(--font-space-grotesk)' }} className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 uppercase leading-[0.9]">
              Counseling <br />
              <span className="text-udanix-blue/30">Sessions Log</span>
            </h1>
            <p className="text-slate-500 text-xl font-medium leading-relaxed max-w-lg">
              Monitor, join, and manage your personalized career growth interactions.
            </p>
          </div>
        </motion.div>

        {/* Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-2">
          <div className="flex bg-white p-1.5 rounded-2xl border border-slate-100 shadow-sm">
            {(['all', 'upcoming', 'completed'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`px-8 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  filter === t 
                    ? 'bg-udanix-blue text-white shadow-lg shadow-blue-900/20' 
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span className="text-[10px] font-black uppercase tracking-widest italic">{filteredSessions.length} Entries found</span>
          </div>
        </div>

        {/* Sessions List */}
        {loading ? (
          <div className="flex items-center justify-center p-32">
            <Loader2 className="w-12 h-12 text-udanix-blue animate-spin" />
          </div>
        ) : filteredSessions.length === 0 ? (
          <div className="text-center py-32 bg-white rounded-[3rem] border-2 border-dashed border-slate-100 mx-2">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-10 h-10 text-slate-200" />
            </div>
            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-2">No Active Logs</h3>
            <p className="text-slate-400 font-medium">You haven't scheduled any sessions yet. Visit the directory node.</p>
            <Button variant="outline" className="mt-8 rounded-2xl px-10 h-12 text-[10px] font-black uppercase tracking-widest border-2 hover:bg-udanix-blue hover:text-white transition-all">
              Launch Directory
            </Button>
          </div>
        ) : (
          <div className="space-y-6 px-2">
            {filteredSessions.map((session, i) => {
              const isUpcoming = new Date(session.start_time) > new Date();
              return (
                <motion.div
                  key={session.id}
                  initial="hidden"
                  animate="visible"
                  variants={fadeUp}
                  custom={i}
                  className="bg-white rounded-[2rem] border border-slate-100 p-8 flex flex-col md:flex-row items-center justify-between gap-8 group hover:shadow-2xl hover:shadow-slate-200/50 transition-all border-l-8"
                  style={{ borderLeftColor: isUpcoming ? '#003E8A' : '#E2E8F0' }}
                >
                  <div className="flex items-center gap-8">
                    <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100 overflow-hidden relative">
                      {session.profiles?.avatar_url ? (
                        <img src={session.profiles.avatar_url} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <User className="w-8 h-8 text-slate-300" />
                      )}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">{session.profiles?.full_name}</h3>
                        {isUpcoming && (
                          <span className="animate-pulse w-2 h-2 rounded-full bg-emerald-500" />
                        )}
                      </div>
                      <p className="text-udanix-blue text-[10px] font-black uppercase tracking-[0.2em]">{session.profiles?.stream || 'EXPERT_NODE'}</p>
                      <p className="text-slate-400 font-medium text-sm pt-2 italic line-clamp-1">"{session.topic || 'No topic specified'}"</p>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row items-center gap-12">
                    <div className="flex items-center gap-10">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-slate-400">
                          <Calendar className="w-3.5 h-3.5" />
                          <span className="text-[10px] font-black uppercase tracking-widest">Date</span>
                        </div>
                        <p className="text-sm font-black text-slate-900">{new Date(session.start_time).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-slate-400">
                          <Clock className="w-3.5 h-3.5" />
                          <span className="text-[10px] font-black uppercase tracking-widest">Window</span>
                        </div>
                        <p className="text-sm font-black text-slate-900">{new Date(session.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {isUpcoming ? (
                        <Button className="bg-udanix-blue text-white rounded-2xl h-14 px-8 text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-blue-900/20 gap-3 group-hover:scale-105 transition-all">
                          <Video className="w-4 h-4" />
                          Initialize Link
                        </Button>
                      ) : (
                        <Button variant="outline" className="rounded-2xl h-14 px-8 text-[10px] font-black uppercase tracking-[0.2em] border-2 border-slate-100 text-slate-400">
                          Archive Log
                        </Button>
                      )}
                      <button className="p-4 bg-slate-50 text-slate-400 rounded-2xl hover:bg-udanix-blue hover:text-white transition-all">
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
