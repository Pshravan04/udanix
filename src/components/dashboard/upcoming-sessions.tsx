'use client';

import { motion } from 'framer-motion';

const SESSIONS = [
  { 
    counselor: 'Dr. Sarah Jenkins', 
    topic: 'Career Roadmap', 
    time: 'Tomorrow 4:00 PM', 
    status: 'Video',
    online: true 
  },
  { 
    counselor: 'Michael Chen', 
    topic: 'Resume Review', 
    time: 'Friday 11:00 AM', 
    status: 'Pending',
    online: false 
  },
];

export function UpcomingSessions() {
  return (
    <div className="bg-white border border-[#E5E7EB] rounded-[32px] p-8 shadow-sm">
      <div className="flex items-center justify-center mb-8">
        <h3 className="text-[#111827] text-sm font-black uppercase tracking-[0.2em]">
          Upcoming Sessions
        </h3>
      </div>

      <div className="space-y-6">
        {SESSIONS.map((session, i) => (
          <motion.div
            key={session.counselor}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            className="flex items-center justify-between pb-6 border-b border-[#F3F4F6] last:border-0 last:pb-0"
          >
            <div className="flex items-center gap-4">
              {/* Initials Avatar */}
              <div className="w-12 h-12 rounded-full bg-[#EFF6FF] flex items-center justify-center text-udanix-blue text-sm font-black border border-blue-50/50">
                {session.counselor.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="space-y-0.5">
                <p className="font-bold text-[#111827] leading-tight text-[15px]">
                  {session.counselor}
                </p>
                <p className="text-[#9CA3AF] text-xs font-semibold">
                  {session.topic}
                </p>
              </div>
            </div>

            <div className="text-right space-y-1">
              <p className="text-[13px] font-bold text-[#4B5563]">
                {session.time}
              </p>
              <div className="flex items-center justify-end gap-1.5">
                <div className={`w-1.5 h-1.5 rounded-full ${session.online ? 'bg-emerald-500' : 'bg-gray-300'}`} />
                <span className={`text-[11px] font-black uppercase tracking-wider ${session.online ? 'text-emerald-500' : 'text-[#9CA3AF]'}`}>
                  {session.status}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
