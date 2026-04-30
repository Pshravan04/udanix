'use client';

import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  TrendingUp, 
  Settings,
  Target,
  Star,
  Sparkles,
  Plus
} from 'lucide-react';

const NAV_ITEMS = [
  { icon: LayoutDashboard, active: true },
  { icon: Users },
  { icon: Calendar },
  { icon: TrendingUp },
  { icon: Settings },
];

const STATS = [
  { label: 'Sessions', value: '12', icon: Target, color: '#F43F5E', bgColor: '#FFF1F2' },
  { label: 'Rating', value: '4.9', icon: Star, color: '#FBBF24', bgColor: '#FFFBEB' },
  { label: 'Goals', value: '85%', icon: TrendingUp, color: '#6366F1', bgColor: '#EEF2FF' },
];

export function DashboardPreview() {
  return (
    <div className="relative w-full max-w-5xl mx-auto group perspective-1000">
      <motion.div
        initial={{ opacity: 0, y: 40, rotateX: 10 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative bg-[#F8FAFC] rounded-[2.5rem] border border-slate-200 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] overflow-hidden flex h-[600px]"
      >
        {/* Sidebar */}
        <div className="w-20 lg:w-64 bg-white border-r border-slate-100 p-6 flex flex-col gap-8">
          <div className="flex items-center gap-3 px-2">
            <div className="w-8 h-8 rounded-lg bg-udanix-blue flex items-center justify-center text-white font-black">U</div>
            <div className="hidden lg:block font-black text-slate-800 tracking-tighter">UDANIX</div>
          </div>
          
          <div className="flex-1 space-y-2">
            {NAV_ITEMS.map((item, i) => (
              <div 
                key={i} 
                className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${item.active ? 'bg-blue-50 text-udanix-blue' : 'text-slate-400'}`}
              >
                <item.icon size={20} />
                <div className={`hidden lg:block text-sm font-bold ${item.active ? 'text-udanix-blue' : 'text-slate-400'}`}>
                  {['Dashboard', 'Counselors', 'Sessions', 'Progress', 'Profile'][i]}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8 overflow-hidden space-y-8">
          {/* Header */}
          <div className="flex justify-between items-end">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-udanix-blue text-[10px] font-black uppercase tracking-widest mb-2">
                Active Node
              </div>
              <h3 className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tighter leading-none">
                Good Morning, <span className="text-udanix-blue">Alex</span>! 👋
              </h3>
            </div>
            <div className="hidden lg:flex items-center gap-2 bg-udanix-blue text-white px-6 py-3 rounded-xl text-xs font-black shadow-lg shadow-blue-200">
              <Plus size={16} /> Book Session
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {STATS.map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</div>
                  <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: stat.bgColor }}>
                    <stat.icon size={12} style={{ color: stat.color }} />
                  </div>
                </div>
                <div className="text-2xl font-black text-slate-900 leading-none">{stat.value}</div>
              </div>
            ))}
          </div>


          {/* Sessions */}
          <div className="bg-white rounded-[2rem] border border-slate-100 p-6 shadow-sm">
             <div className="flex items-center justify-between mb-6">
               <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                 <Calendar className="w-3 h-3 text-udanix-blue" />
                 Upcoming Sessions
               </h4>
               <div className="text-[10px] font-bold text-slate-400 px-2 py-1 bg-slate-50 rounded-lg">2 Active</div>
             </div>

             <div className="space-y-4">
                {[
                  { name: 'Dr. Sarah Wilson', topic: 'Medical Career Path', time: 'Today, 4:00 PM' },
                  { name: 'Prof. Michael Chen', topic: 'Engineering Entrance', time: 'Tomorrow, 11:30 AM' }
                ].map((session, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-2xl border border-slate-50 bg-slate-50/30 group/item hover:bg-white hover:shadow-md transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-udanix-blue/10 flex items-center justify-center text-udanix-blue font-black text-sm">
                        {session.name.charAt(4)}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-sm">{session.name}</div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{session.topic}</div>
                      </div>
                    </div>
                    <div className="text-right">
                       <div className="text-[11px] font-bold text-slate-600">{session.time}</div>
                       <div className="text-[9px] font-black text-udanix-blue uppercase">Join Now</div>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </div>

        {/* Decorative Overlay */}
        <div className="absolute inset-0 pointer-events-none border-[12px] border-white/50 rounded-[2.5rem]" />
      </motion.div>

      {/* Floating UI Elements */}
      <motion.div 
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-12 -right-12 hidden xl:block bg-white/80 backdrop-blur-xl p-6 rounded-3xl border border-white shadow-2xl z-20"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600">
            <TrendingUp size={24} />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 leading-none">98%</div>
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Match Accuracy</div>
          </div>
        </div>
      </motion.div>

      <motion.div 
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -bottom-10 -left-10 hidden xl:block bg-slate-900 p-6 rounded-3xl shadow-2xl z-20 text-white"
      >
        <div className="flex items-center gap-4">
          <div className="p-3 bg-udanix-blue rounded-2xl">
            <Sparkles size={24} />
          </div>
          <div>
            <div className="text-sm font-black uppercase tracking-widest mb-1">AI Career Agent</div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <div className="text-[11px] text-slate-400">Analyzing Potential...</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
