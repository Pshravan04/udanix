'use client';

import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  TrendingUp, 
  Target,
  Star,
  Plus,
  ChevronRight
} from 'lucide-react';
import Image from 'next/image';

const STUDENT_NAV = [
  { icon: LayoutDashboard, label: 'Overview', active: true },
  { icon: Users, label: 'Counselors' },
  { icon: Calendar, label: 'Sessions' },
  { icon: TrendingUp, label: 'Progress' },
  { icon: Target, label: 'Objectives' },
];

export function DoubleDashboardPreview() {
  return (
    <div id="dashboard-demo" className="relative pb-32 overflow-hidden -mt-20">
      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative bg-white rounded-[3.5rem] p-3 lg:p-6 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.08)] overflow-hidden border border-slate-100"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.5, ease: "circOut" }}
            className="flex flex-col lg:flex-row gap-8 min-h-[700px]"
          >
            {/* Sidebar Mock */}
            <div className="w-full lg:w-72 bg-slate-50 rounded-[2.5rem] p-8 flex flex-col gap-10 border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-gradient flex items-center justify-center text-white font-black text-xl shadow-lg">U</div>
                  <div style={{ fontFamily: 'var(--font-space-grotesk)' }} className="font-black text-slate-900 tracking-tighter text-xl">UDANIX</div>
                </div>
                <div className="space-y-2 text-left">
                  {STUDENT_NAV.map((item, i) => (
                    <div key={i} className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${item.active ? 'bg-udanix-blue text-white shadow-xl shadow-blue-500/20' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'}`}>
                        <item.icon size={20} />
                        <span className="text-xs font-black uppercase tracking-widest">{item.label}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-auto pt-8 border-t border-slate-100">
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm">
                    <div className="w-10 h-10 rounded-full bg-slate-100 shrink-0 overflow-hidden border border-slate-200">
                        <Image src="/images/student-1.png" alt="Profile" width={40} height={40} className="w-full h-full object-cover grayscale" />
                    </div>
                    <div className="min-w-0 text-left">
                      <p className="text-[11px] font-black text-slate-900 uppercase truncate">Alex Johnson</p>
                      <p className="text-[9px] font-bold text-slate-400 uppercase">Premium Member</p>
                    </div>
                  </div>
                </div>
            </div>

            {/* Main Content Mock */}
            <div className="flex-1 space-y-8">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 text-left">
                <div>
                  <h3 style={{ fontFamily: 'var(--font-space-grotesk)' }} className="text-4xl font-black text-slate-950 tracking-tighter uppercase leading-none">
                    Good Morning, <span className="text-udanix-blue">Alex!</span>
                  </h3>
                  <p className="text-slate-500 text-sm font-bold mt-2 uppercase tracking-widest">System identifies 3 high-impact paths for you today.</p>
                </div>
                <button className="bg-brand-gradient text-white px-8 py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] shadow-xl shadow-blue-500/20 hover:scale-105 transition-all flex items-center gap-3">
                  <Plus className="w-4 h-4" /> Book Sync
                </button>
              </div>

              {/* Bento Grid Content */}
              <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
                {/* Main Card */}
                <div className="md:col-span-4 bg-slate-50 rounded-[2.5rem] p-10 border border-slate-100 space-y-8 relative overflow-hidden group text-left shadow-sm">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-udanix-blue/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-udanix-blue/10 transition-all" />
                  <div className="flex items-center justify-between relative z-10">
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Profile Match</p>
                      <h4 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Full-Stack Architect</h4>
                    </div>
                    <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shadow-sm">
                        <TrendingUp size={28} />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 relative z-10">
                    {[
                      { label: 'Demand', value: 'High', color: 'text-emerald-600' },
                      { label: 'Complexity', value: 'Level 8', color: 'text-blue-600' },
                      { label: 'Match Index', value: '98%', color: 'text-indigo-600' },
                    ].map((s, i) => (
                      <div key={i} className="p-5 rounded-3xl bg-white border border-slate-100 shadow-sm">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{s.label}</p>
                        <p className={`text-2xl font-black tracking-tighter ${s.color}`}>{s.value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="p-6 rounded-[2rem] bg-white text-slate-900 border border-slate-100 shadow-sm flex items-center justify-between group-hover:translate-x-2 transition-transform cursor-pointer relative z-10">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-udanix-blue flex items-center justify-center">
                          <Target className="w-5 h-5 text-white" />
                        </div>
                        <div className="text-left">
                          <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Next Objective</p>
                          <p className="text-xs font-black uppercase tracking-tight">Explore Backend Technologies</p>
                        </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-300" />
                  </div>
                </div>

                {/* Side Stat Cards */}
                <div className="md:col-span-2 space-y-6 text-left">
                    <div className="bg-slate-50 rounded-[2.5rem] p-8 border border-slate-100 shadow-premium flex flex-col justify-between h-[220px]">
                      <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 mb-4">
                          <Star size={24} />
                      </div>
                      <div>
                        <p className="text-4xl font-black text-slate-950 tracking-tighter leading-none">4.9</p>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-2">Counselor Rating</p>
                      </div>
                    </div>
                    <div className="bg-brand-gradient rounded-[2.5rem] p-8 text-white shadow-xl shadow-blue-500/20 flex flex-col justify-between h-[220px]">
                      <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-white mb-4">
                          <Calendar size={24} />
                      </div>
                      <div>
                        <p className="text-3xl font-black tracking-tighter leading-none italic uppercase">Today 4:00 PM</p>
                        <p className="text-[10px] font-black uppercase tracking-widest mt-2 opacity-70">Next Session Sync</p>
                      </div>
                    </div>
                </div>
              </div>

              {/* Upcoming Syncs Row */}
              <div className="bg-slate-50 rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
                  <div className="flex items-center justify-between mb-8 px-2">
                    <h4 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] flex items-center gap-3">
                        <div className="w-1 h-4 bg-udanix-blue rounded-full" />
                        Upcoming Session Registry
                    </h4>
                    <button className="text-[10px] font-black text-udanix-blue uppercase tracking-widest">Master Logs</button>
                  </div>
                  <div className="space-y-4">
                    {[
                      { name: 'Dr. Sarah Wilson', topic: 'Medical Career Path', time: 'Today, 4:00 PM', status: 'Join Now' },
                      { name: 'Prof. Michael Chen', topic: 'Engineering Entrance', time: 'Tomorrow, 11:30 AM', status: 'Scheduled' }
                    ].map((s, i) => (
                      <div key={i} className="flex items-center justify-between p-5 rounded-[2rem] bg-white border border-slate-100 hover:shadow-md transition-all group/item text-left">
                          <div className="flex items-center gap-5">
                            <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-blue-600 font-black text-lg group-hover/item:bg-udanix-blue group-hover/item:text-white transition-colors">
                                {s.name.charAt(4)}
                            </div>
                            <div className="text-left">
                                <p className="text-[13px] font-black text-slate-900 uppercase tracking-tight">{s.name}</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{s.topic}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-8">
                            <div className="hidden sm:block text-right">
                                <p className="text-[11px] font-black text-slate-900 uppercase">{s.time}</p>
                                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Time Sync</p>
                            </div>
                            <div className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${s.status === 'Join Now' ? 'bg-udanix-blue text-white shadow-lg border-udanix-blue' : 'bg-slate-50 text-slate-400 border-slate-100'}`}>
                                {s.status}
                            </div>
                          </div>
                      </div>
                    ))}
                  </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
