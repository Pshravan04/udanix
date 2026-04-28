'use client';

import { motion } from 'framer-motion';
import { Calendar, Video, Clock } from 'lucide-react';

interface Session {
  id: string;
  topic: string;
  start_time: string;
  status: string;
  type?: string;
  profiles: {
    full_name: string;
  } | null;
}

interface UpcomingSessionsProps {
  sessions: Session[];
}

export function UpcomingSessions({ sessions }: UpcomingSessionsProps) {
  return (
    <div className="bg-white border border-[#E5E7EB] rounded-[32px] p-8 shadow-sm">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-[#111827] text-sm font-black uppercase tracking-[0.2em] flex items-center gap-2">
          <Calendar className="w-4 h-4 text-udanix-blue" />
          Upcoming Sessions
        </h3>
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
            {sessions.length} Scheduled
        </span>
      </div>

      <div className="space-y-6">
        {sessions.length === 0 ? (
           <div className="py-12 text-center border-2 border-dashed border-slate-100 rounded-3xl">
              <p className="text-[#9CA3AF] text-sm font-bold uppercase tracking-widest italic">No active syncs found.</p>
           </div>
        ) : sessions.map((session, i) => (
          <motion.div
            key={session.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            className="flex items-center justify-between pb-6 border-b border-[#F3F4F6] last:border-0 last:pb-0 group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-udanix-blue/5 flex items-center justify-center text-udanix-blue text-sm font-black border border-udanix-blue/10 group-hover:bg-udanix-blue group-hover:text-white transition-all">
                {session.profiles?.full_name?.charAt(0) || 'C'}
              </div>
              <div className="space-y-0.5">
                <p className="font-bold text-[#111827] leading-tight text-[15px] group-hover:text-udanix-blue transition-colors">
                  {session.profiles?.full_name || 'Expert Counselor'}
                </p>
                <p className="text-[#9CA3AF] text-[11px] font-black uppercase tracking-wider">
                  {session.topic}
                </p>
              </div>
            </div>

            <div className="text-right space-y-1">
              <p className="text-[13px] font-bold text-[#4B5563]">
                {new Date(session.start_time).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
              </p>
              <div className="flex items-center justify-end gap-2">
                <Clock className="w-3 h-3 text-[#9CA3AF]" />
                <span className="text-[11px] font-black uppercase tracking-widest text-[#9CA3AF]">
                  {new Date(session.start_time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
