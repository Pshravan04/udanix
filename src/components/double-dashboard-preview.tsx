'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  TrendingUp, 
  Target,
  Star,
  Plus,
  Video,
  Clock,
  DollarSign,
  Award,
  ChevronRight
} from 'lucide-react';
import Image from 'next/image';

const STUDENT_NAV = [
  { icon: LayoutDashboard, label: 'Overview', active: true },
  { icon: Users, label: 'Counselors' },
  { icon: Target, label: 'Assessment' },
  { icon: Calendar, label: 'Sessions' },
];

const COUNSELOR_NAV = [
  { icon: LayoutDashboard, label: 'Overview', active: true },
  { icon: Users, label: 'Personnel' },
  { icon: DollarSign, label: 'Earnings' },
  { icon: Calendar, label: 'Schedule' },
];

export function DoubleDashboardPreview() {
  const [view, setView] = useState<'student' | 'counselor'>('student');

  return (
    <section className="pb-32 relative overflow-hidden bg-white">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(0,62,138,0.03)_0%,transparent_70%)]" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-udanix-blue/[0.02] rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-udanix-orange/[0.02] rounded-full blur-[100px]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        {/* Section Header - Toggle Only */}
        <div className="text-center mb-16">
          {/* Toggle Switch */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center"
          >
            <div className="p-1.5 bg-slate-100 rounded-3xl flex items-center gap-1 shadow-inner relative">
              <motion.div 
                layoutId="toggle"
                className="absolute inset-y-1.5 w-[calc(50%-6px)] bg-white rounded-2xl shadow-premium border border-slate-200/50 z-0"
                initial={false}
                animate={{ x: view === 'student' ? 0 : '100%' }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
              <button 
                onClick={() => setView('student')}
                className={`relative z-10 px-10 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all ${view === 'student' ? 'text-udanix-blue' : 'text-slate-400 hover:text-slate-600'}`}
              >
                Student View
              </button>
              <button 
                onClick={() => setView('counselor')}
                className={`relative z-10 px-10 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all ${view === 'counselor' ? 'text-udanix-blue' : 'text-slate-400 hover:text-slate-600'}`}
              >
                Counselor View
              </button>
            </div>
          </motion.div>
        </div>

        {/* Dashboard Frame */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative glass-extreme rounded-[3rem] p-4 lg:p-8 shadow-[0_40px_100px_-20px_rgba(0,62,138,0.15)] overflow-hidden border border-white/60"
        >
          <AnimatePresence mode="wait">
            {view === 'student' ? (
              <motion.div 
                key="student"
                initial={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 1.02, filter: 'blur(10px)' }}
                transition={{ duration: 0.5, ease: "circOut" }}
                className="flex flex-col lg:flex-row gap-8 min-h-[700px]"
              >
                {/* Sidebar Mock */}
                <div className="w-full lg:w-72 glass-premium rounded-[2.5rem] p-8 flex flex-col gap-10 border border-white/50">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-brand-gradient flex items-center justify-center text-white font-black text-xl shadow-lg">U</div>
                      <div style={{ fontFamily: 'var(--font-space-grotesk)' }} className="font-black text-slate-900 tracking-tighter text-xl">UDANIX</div>
                   </div>
                   <div className="space-y-2 text-left">
                      {STUDENT_NAV.map((item, i) => (
                        <div key={i} className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${item.active ? 'bg-udanix-blue text-white shadow-xl shadow-blue-200' : 'text-slate-400 hover:bg-slate-50'}`}>
                           <item.icon size={20} />
                           <span className="text-xs font-black uppercase tracking-widest">{item.label}</span>
                        </div>
                      ))}
                   </div>
                   <div className="mt-auto pt-8 border-t border-slate-100">
                      <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                        <div className="w-10 h-10 rounded-full bg-slate-200 shrink-0 overflow-hidden">
                           <Image src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200&auto=format&fit=crop" alt="Profile" width={40} height={40} className="w-full h-full object-cover" />
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
                      <h3 style={{ fontFamily: 'var(--font-space-grotesk)' }} className="text-4xl font-black text-slate-900 tracking-tighter uppercase leading-none">
                        Good Morning, <span className="text-udanix-blue">Alex!</span>
                      </h3>
                      <p className="text-slate-400 text-sm font-bold mt-2 uppercase tracking-widest">System identifies 3 high-impact paths for you today.</p>
                    </div>
                    <button className="bg-udanix-blue text-white px-8 py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] shadow-xl shadow-blue-500/20 hover:scale-105 transition-all flex items-center gap-3">
                      <Plus className="w-4 h-4" /> Book Sync
                    </button>
                  </div>

                  {/* Bento Grid Content */}
                  <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
                    {/* Main Card */}
                    <div className="md:col-span-4 glass-premium rounded-[2.5rem] p-10 border border-white/50 space-y-8 relative overflow-hidden group text-left">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-udanix-blue/[0.03] rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-udanix-blue/[0.06] transition-all" />
                      <div className="flex items-center justify-between relative z-10">
                        <div className="space-y-1">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Profile Match</p>
                          <h4 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Full-Stack Architect</h4>
                        </div>
                        <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shadow-sm">
                           <TrendingUp size={28} />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 relative z-10">
                        {[
                          { label: 'Demand', value: 'High', color: 'text-emerald-600' },
                          { label: 'Complexity', value: 'Level 8', color: 'text-udanix-blue' },
                          { label: 'Match Index', value: '98%', color: 'text-blue-600' },
                        ].map((s, i) => (
                          <div key={i} className="p-5 rounded-3xl bg-white/50 border border-white shadow-sm">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{s.label}</p>
                            <p className={`text-2xl font-black tracking-tighter ${s.color}`}>{s.value}</p>
                          </div>
                        ))}
                      </div>

                      <div className="p-6 rounded-[2rem] bg-slate-900 text-white flex items-center justify-between group-hover:translate-x-2 transition-transform cursor-pointer relative z-10">
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 rounded-xl bg-udanix-blue flex items-center justify-center">
                              <Target className="w-5 h-5 text-white" />
                           </div>
                           <div className="text-left">
                              <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Next Objective</p>
                              <p className="text-xs font-black uppercase tracking-tight">Explore Backend Technologies</p>
                           </div>
                        </div>
                        <ChevronRight className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Side Stat Cards */}
                    <div className="md:col-span-2 space-y-6 text-left">
                       <div className="glass-premium rounded-[2.5rem] p-8 border border-white/50 shadow-premium flex flex-col justify-between h-[220px]">
                          <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 mb-4">
                             <Star size={24} />
                          </div>
                          <div>
                            <p className="text-4xl font-black text-slate-900 tracking-tighter leading-none">4.9</p>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Counselor Rating</p>
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
                  <div className="glass-premium rounded-[2.5rem] p-8 border border-white/50 shadow-premium">
                     <div className="flex items-center justify-between mb-8 px-2">
                        <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-3">
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
                          <div key={i} className="flex items-center justify-between p-5 rounded-[2rem] bg-white border border-slate-100 hover:shadow-xl transition-all group/item text-left">
                             <div className="flex items-center gap-5">
                                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-udanix-blue font-black text-lg group-hover/item:bg-udanix-blue group-hover/item:text-white transition-colors">
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
            ) : (
              <motion.div 
                key="counselor"
                initial={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 1.02, filter: 'blur(10px)' }}
                transition={{ duration: 0.5, ease: "circOut" }}
                className="flex flex-col lg:flex-row gap-8 min-h-[700px]"
              >
                {/* Sidebar Mock */}
                <div className="w-full lg:w-72 glass-dark rounded-[2.5rem] p-8 flex flex-col gap-10 border border-white/10 text-white shadow-2xl">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-udanix-orange flex items-center justify-center text-white font-black text-xl shadow-lg">U</div>
                      <div style={{ fontFamily: 'var(--font-space-grotesk)' }} className="font-black text-white tracking-tighter text-xl">UDANIX</div>
                   </div>
                   <div className="space-y-2 text-left">
                      {COUNSELOR_NAV.map((item, i) => (
                        <div key={i} className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${item.active ? 'bg-white/10 text-udanix-orange shadow-inner border border-white/5' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
                           <item.icon size={20} />
                           <span className="text-xs font-black uppercase tracking-widest">{item.label}</span>
                        </div>
                      ))}
                   </div>
                   <div className="mt-auto pt-8 border-t border-white/10">
                      <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                        <div className="w-10 h-10 rounded-full bg-slate-700 shrink-0 overflow-hidden">
                           <Image src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop" alt="Profile" width={40} height={40} className="w-full h-full object-cover" />
                        </div>
                        <div className="min-w-0 text-left">
                          <p className="text-[11px] font-black text-white uppercase truncate">Dr. Robert Fox</p>
                          <p className="text-[9px] font-bold text-udanix-orange uppercase">Elite Partner</p>
                        </div>
                      </div>
                   </div>
                </div>

                {/* Main Content Mock */}
                <div className="flex-1 space-y-8">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 text-left">
                    <div>
                      <h3 style={{ fontFamily: 'var(--font-space-grotesk)' }} className="text-4xl font-black text-slate-900 tracking-tighter uppercase leading-none">
                        Counselor <span className="text-udanix-orange">Dashboard</span>
                      </h3>
                      <p className="text-slate-400 text-sm font-bold mt-2 uppercase tracking-widest">System identifies <span className="text-emerald-600 font-black">12 active syncs</span> pending approval.</p>
                    </div>
                    <div className="flex items-center gap-3 bg-emerald-50 px-6 py-4 rounded-2xl border border-emerald-100">
                       <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                       <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Link Established</span>
                    </div>
                  </div>

                  {/* Bento Grid Content */}
                  <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
                    {/* Stats */}
                    {[
                      { icon: DollarSign, label: 'Earnings', value: '₹22,500', color: 'blue', change: '+12%' },
                      { icon: Users, label: 'Active Roster', value: '45', color: 'orange', change: '+3 new' },
                      { icon: Clock, label: 'Hours Toted', value: '128h', color: 'blue', change: 'This Mo' },
                    ].map((s, i) => (
                      <div key={i} className="md:col-span-2 glass-premium rounded-[2.5rem] p-8 border border-white/50 shadow-premium group hover:shadow-2xl transition-all text-left">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 border transition-all ${s.color === 'orange' ? 'bg-orange-50 text-udanix-orange border-orange-100' : 'bg-blue-50 text-udanix-blue border-blue-100'} group-hover:scale-110 group-hover:rotate-6`}>
                          <s.icon className="w-6 h-6" />
                        </div>
                        <div className="flex items-end justify-between">
                          <div>
                            <p style={{ fontFamily: 'var(--font-space-grotesk)' }} className="text-3xl font-black text-slate-900 tracking-tighter uppercase">{s.value}</p>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{s.label}</p>
                          </div>
                          <div className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full mb-1">{s.change}</div>
                        </div>
                      </div>
                    ))}

                    {/* Performance Analytics */}
                    <div className="md:col-span-3 glass-premium rounded-[2.5rem] p-8 border border-white/50 shadow-premium space-y-6 text-left">
                       <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-3">
                          <div className="w-1 h-4 bg-udanix-orange rounded-full" />
                          Core Analytics
                       </h4>
                       <div className="space-y-5">
                          {[
                            { label: 'Completion Rate', value: 96 },
                            { label: 'Satisfaction', value: 98 },
                            { label: 'Response Time', value: 87 },
                          ].map((m, i) => (
                            <div key={i} className="space-y-2">
                               <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                                  <span className="text-slate-400">{m.label}</span>
                                  <span className="text-slate-900">LVL {m.value}</span>
                               </div>
                               <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                  <motion.div 
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${m.value}%` }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                    className="h-full bg-brand-gradient rounded-full"
                                  />
                               </div>
                            </div>
                          ))}
                       </div>
                    </div>

                    {/* Achievement Card */}
                    <div className="md:col-span-3 bg-slate-900 rounded-[2.5rem] p-8 text-white flex items-center gap-6 shadow-2xl relative overflow-hidden group">
                       <div className="absolute inset-0 bg-brand-gradient opacity-10 group-hover:opacity-20 transition-opacity" />
                       <div className="w-20 h-20 bg-udanix-orange/20 rounded-[2rem] flex items-center justify-center shrink-0 border border-udanix-orange/30 group-hover:scale-110 transition-transform">
                          <Award className="w-10 h-10 text-udanix-orange" />
                       </div>
                       <div className="text-left relative z-10">
                          <p className="text-[11px] font-black text-udanix-orange uppercase tracking-[0.2em] mb-2">Platform Rank</p>
                          <h4 className="text-2xl font-black uppercase tracking-tight">Elite Node Tier</h4>
                          <p className="text-xs text-slate-400 font-bold mt-1 uppercase tracking-widest">Top 5% Global Index</p>
                       </div>
                    </div>
                  </div>

                  {/* Active Syncs Table */}
                  <div className="glass-premium rounded-[2.5rem] p-8 border border-white/50 shadow-premium">
                     <div className="flex items-center justify-between mb-8 px-2">
                        <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-3">
                           <div className="w-1 h-4 bg-udanix-orange rounded-full" />
                           Pending Sync Operations
                        </h4>
                        <button className="text-[10px] font-black text-udanix-orange uppercase tracking-widest">View Directory</button>
                     </div>
                     <div className="space-y-4">
                        {[
                          { name: 'Rohan Malhotra', stream: '12th Science', time: '14:00 PM', topic: 'JEE Roadmap' },
                          { name: 'Priya Kapoor', stream: '10th Standard', time: '16:30 PM', topic: 'Stream Choice' }
                        ].map((s, i) => (
                          <div key={i} className="flex items-center justify-between p-5 rounded-[2rem] bg-white border border-slate-100 hover:shadow-xl transition-all group/item text-left">
                             <div className="flex items-center gap-5">
                                <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-udanix-orange font-black text-lg group-hover/item:bg-udanix-orange group-hover/item:text-white transition-colors">
                                   {s.name.charAt(0)}
                                </div>
                                <div className="text-left">
                                   <p className="text-[13px] font-black text-slate-900 uppercase tracking-tight">{s.name}</p>
                                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{s.stream}</p>
                                </div>
                             </div>
                             <div className="flex items-center gap-10">
                                <div className="hidden sm:block text-right">
                                   <p className="text-[11px] font-black text-slate-900 uppercase">{s.topic}</p>
                                   <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Topic Context</p>
                                </div>
                                <div className="flex items-center gap-3">
                                   <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:bg-slate-100 transition-colors">
                                      <Video size={18} />
                                   </button>
                                   <button className="bg-udanix-orange text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-orange-500/20 hover:scale-105 transition-all">
                                      Initialize
                                   </button>
                                </div>
                             </div>
                          </div>
                        ))}
                     </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </motion.div>
      </div>
    </section>
  );
}
