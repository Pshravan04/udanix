'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
   Users, TrendingUp, DollarSign, AlertCircle, CheckCircle2,
   Clock, Shield, Search, ArrowRight, BarChart3, Zap, Loader2
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

const COUNSELORS = [
   { name: 'Dr. Sarah Jenkins', specialty: 'Psychology', status: 'verified', rating: '4.9', sessions: '1.2k', initials: 'SJ' },
   { name: 'Michael Chen', specialty: 'Career Coach', status: 'pending', rating: '4.8', sessions: '890', initials: 'MC' },
   { name: 'Aisha Khan', specialty: 'Adolescents', status: 'verified', rating: '5.0', sessions: '2.1k', initials: 'AK' },
   { name: 'James Wilson', specialty: 'Academic', status: 'review', rating: '4.6', sessions: '320', initials: 'JW' },
];

const ACTIVITY = [
   { event: 'New counselor registration', sub: 'James Wilson applied for Psychology', time: '5m ago', type: 'info' },
   { event: 'Verification approved', sub: 'Dr. Patel verified by admin team', time: '1h ago', type: 'success' },
   { event: 'Report flagged', sub: 'Session #3241 reported by student', time: '3h ago', type: 'warn' },
   { event: 'Revenue milestone', sub: 'Platform crossed ₹5M monthly GMV', time: '5h ago', type: 'success' },
];

const fadeUp = {
   hidden: { opacity: 0, y: 20 },
   visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.08 } }),
};

const STATUS_STYLES: Record<string, string> = {
   verified: 'bg-emerald-50 text-emerald-600 border-emerald-100',
   pending: 'bg-amber-50 text-amber-600 border-amber-100',
   review: 'bg-rose-50 text-rose-600 border-rose-100',
};

export default function AdminDashboard() {
   const supabase = createClient();
   const [search, setSearch] = useState('');
   const [loading, setLoading] = useState(true);
   const [counselors, setCounselors] = useState([] as any[]);
   const [stats, setStats] = useState({
      totalUsers: 0,
      activeCounselors: 0,
      totalGMV: 0,
      pendingVerifications: 0
   });

   useEffect(() => {
      async function loadAdminData() {
         // 1. Fetch all profiles
         const { data: profiles } = await supabase.from('profiles').select('*');

         if (profiles) {
            const counselorsOnly = profiles.filter(p => p.role === 'counselor');
            setCounselors(counselorsOnly);

            // 2. Aggregate Stats
            const totalGMV = counselorsOnly.reduce((sum, c) => sum + ((c.sessions_count || 0) * (c.price_per_hour || 500)), 0);

            setStats({
               totalUsers: profiles.length,
               activeCounselors: counselorsOnly.length,
               totalGMV,
               pendingVerifications: counselorsOnly.filter(c => !c.is_verified).length // Assuming a field for verification
            });
         }

         setLoading(false);
      }
      loadAdminData();
   }, [supabase]);

   const filtered = counselors.filter(c =>
      c.full_name?.toLowerCase().includes(search.toLowerCase()) ||
      c.stream?.toLowerCase().includes(search.toLowerCase())
   );

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
         <div className="pt-4">
            <motion.h1
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               style={{ fontFamily: 'var(--font-space-grotesk)' }}
               className="text-5xl font-black text-slate-900 tracking-tighter uppercase"
            >
               System Node <span className="text-udanix-blue">01</span>
            </motion.h1>
            <p className="text-slate-500 mt-2 text-xl font-medium">
               <span className="text-rose-600 font-black tracking-tight uppercase tracking-widest text-sm bg-rose-50 px-3 py-1 rounded-full mr-3">Alert</span>
               {stats.pendingVerifications} Security events require administrative override.
            </p>
         </div>

         {/* ─── Stats ─── */}
         <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
               { icon: Users, label: 'Global Traffic', value: (stats.totalUsers * 12).toString(), change: '+842 this week', color: 'blue' },
               { icon: TrendingUp, label: 'Active Matrix', value: stats.activeCounselors.toString(), change: '↑ 18% vs last wk', color: 'blue' },
               { icon: DollarSign, label: 'Platform GMV', value: `₹${(stats.totalGMV / 100000).toFixed(1)}L`, change: '+23% MoM', color: 'emerald' },
               { icon: AlertCircle, label: 'Neural Flux', value: stats.pendingVerifications.toString(), change: '2 critical', color: 'red' },
            ].map((s) => (
               <div key={s.label} className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-premium hover:shadow-2xl transition-all group overflow-hidden relative">
                  <div className="absolute -bottom-4 -right-4 w-28 h-28 bg-udanix-blue/[0.02] rounded-full group-hover:scale-150 transition-transform duration-700" />
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border transition-all ${s.color === 'emerald' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                     s.color === 'red' ? 'bg-rose-50 text-rose-600 border-rose-100' :
                        'bg-udanix-blue/5 text-udanix-blue border-udanix-blue/10'
                     } group-hover:scale-110 group-hover:rotate-6 shadow-sm`}>
                     <s.icon className="w-7 h-7" />
                  </div>
                  <p style={{ fontFamily: 'var(--font-space-grotesk)' }} className="text-4xl font-black text-slate-900 tracking-tighter uppercase">{s.value}</p>
                  <div className="flex items-center justify-between mt-2">
                     <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] group-hover:text-udanix-blue transition-colors">{s.label}</p>
                     <p className={`text-[10px] font-black uppercase tracking-tighter px-2 py-0.5 rounded-full ${s.color === 'red' ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'}`}>{s.change}</p>
                  </div>
               </div>
            ))}
         </div>

         {/* ─── Main grid ─── */}
         <div className="grid lg:grid-cols-3 gap-10">

            {/* Counselor Table */}
            <div className="lg:col-span-2 space-y-8">
               <div className="flex items-center justify-between px-2">
                  <h2 style={{ fontFamily: 'var(--font-space-grotesk)' }} className="text-2xl font-black text-slate-900 tracking-tighter uppercase flex items-center gap-3">
                     <div className="w-2 h-8 bg-rose-500 rounded-full" />
                     Entity Management
                  </h2>
                  <Button size="sm" variant="outline" className="h-12 px-8 rounded-2xl border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-50 text-xs font-black uppercase tracking-widest transition-all shadow-sm">
                     Master Database <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
               </div>

               {/* Search */}
               <div className="relative group mx-2">
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-udanix-blue transition-colors" />
                  <input
                     type="text"
                     placeholder="Search node database (e.g. Psychology, Bio, Name)..."
                     value={search}
                     onChange={e => setSearch(e.target.value)}
                     className="w-full h-16 pl-16 pr-8 rounded-[1.5rem] bg-white border border-slate-200 text-slate-900 placeholder-slate-400 text-sm outline-none focus:border-udanix-blue focus:ring-4 focus:ring-udanix-blue/5 transition-all font-medium shadow-sm"
                  />
               </div>

               {/* Counselor list */}
               <div className="space-y-4">
                  {filtered.length === 0 ? (
                     <div className="bg-white rounded-[2rem] border border-slate-100 p-12 text-center text-slate-400 font-bold uppercase tracking-widest italic">
                        No counselor nodes matching query.
                     </div>
                  ) : filtered.map((c, i) => (
                     <motion.div
                        key={c.id}
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        custom={i}
                        className="bg-white rounded-[2rem] border border-slate-100 p-6 flex flex-col sm:flex-row items-center gap-6 shadow-premium hover:shadow-2xl transition-all group"
                     >
                        <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600 font-black text-xl shadow-inner group-hover:bg-udanix-blue group-hover:text-white transition-all shrink-0">
                           {c.full_name?.charAt(0) || 'C'}
                        </div>
                        <div className="flex-1 min-w-0 text-center sm:text-left">
                           <p style={{ fontFamily: 'var(--font-space-grotesk)' }} className="font-black text-slate-900 text-lg tracking-tight uppercase group-hover:text-udanix-blue transition-colors">{c.full_name}</p>
                           <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mt-1 opacity-80">{c.stream || 'General'} · {c.sessions_count || 0} cycles · <span className="text-amber-500">★ {c.rating || 5.0}</span></p>
                        </div>
                        <div className="flex items-center gap-6 shrink-0">
                           <span className={`text-[10px] font-black px-4 py-2 rounded-xl uppercase tracking-[0.2em] border shadow-sm ${c.is_verified ? STATUS_STYLES.verified : STATUS_STYLES.pending}`}>
                              {c.is_verified ? 'verified' : 'pending'}
                           </span>
                           {!c.is_verified && (
                              <Button size="sm" className="h-12 px-8 bg-udanix-blue hover:bg-blue-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-blue-500/10 transition-all hover:scale-105 active:scale-95">
                                 Validate
                              </Button>
                           )}
                        </div>
                     </motion.div>
                  ))}
               </div>
            </div>

            {/* Activity Feed */}
            <div className="space-y-8">
               <h2 style={{ fontFamily: 'var(--font-space-grotesk)' }} className="text-2xl font-black text-slate-900 tracking-tighter uppercase flex items-center gap-3 px-2">
                  <div className="w-2 h-8 bg-udanix-blue rounded-full" />
                  Event Log
               </h2>
               <div className="bg-white rounded-[2.5rem] border border-slate-100 divide-y divide-slate-50 p-3 shadow-premium">
                  {ACTIVITY.map((a, i) => (
                     <div key={i} className="p-6 hover:bg-slate-50/50 transition-colors first:rounded-t-[2.2rem] last:rounded-b-[2.2rem]">
                        <div className="flex items-start gap-5">
                           <div className={`w-2.5 h-2.5 rounded-full mt-2.5 shrink-0 shadow-sm ${a.type === 'success' ? 'bg-emerald-500' :
                              a.type === 'warn' ? 'bg-amber-500' : 'bg-udanix-blue'
                              }`} />
                           <div className="flex-1 min-w-0">
                              <p className="font-black text-slate-900 text-[15px] tracking-tight uppercase leading-tight">{a.event}</p>
                              <p className="text-slate-400 text-xs font-medium mt-1.5 leading-relaxed">{a.sub}</p>
                              <p className="text-slate-300 text-[10px] font-black uppercase tracking-widest mt-3 flex items-center gap-2">
                                 <Clock className="w-3 h-3" /> {a.time}
                              </p>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>

         {/* ─── Platform health ─── */}
         <div className="space-y-8">
            <h2 style={{ fontFamily: 'var(--font-space-grotesk)' }} className="text-2xl font-black text-slate-900 tracking-tighter uppercase flex items-center gap-3 px-2">
               <div className="w-2 h-8 bg-udanix-cyan rounded-full" />
               Infrastructure Health
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
               {[
                  { icon: Zap, label: 'Uptime Flow', value: '99.98%', bar: 99.98, color: 'emerald' },
                  { icon: Clock, label: 'Latency Node', value: '120ms', bar: 90, color: 'blue' },
                  { icon: BarChart3, label: 'Response Load', value: '99.7%', bar: 99.7, color: 'blue' },
                  { icon: Shield, label: 'Security Status', value: 'A+', bar: 98, color: 'emerald' },
               ].map(m => (
                  <div key={m.label} className="bg-white rounded-[2.5rem] border border-slate-100 p-8 group hover:shadow-2xl transition-all shadow-premium border-t-4 border-t-udanix-cyan">
                     <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border transition-all ${m.color === 'emerald' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-udanix-blue/5 text-udanix-blue border-udanix-blue/10'} group-hover:scale-110 shadow-sm`}>
                        <m.icon className="w-6 h-6" />
                     </div>
                     <p style={{ fontFamily: 'var(--font-space-grotesk)' }} className="text-3xl font-black text-slate-900 tracking-tighter uppercase">{m.value}</p>
                     <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mt-1 group-hover:text-udanix-blue transition-colors">{m.label}</p>
                     <div className="h-2 bg-slate-50 rounded-full mt-6 overflow-hidden border border-slate-100 shadow-inner">
                        <motion.div
                           initial={{ width: 0 }}
                           animate={{ width: `${m.bar}%` }}
                           transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                           className={`h-full rounded-full ${m.color === 'emerald' ? 'bg-gradient-to-r from-emerald-500 to-emerald-400' : 'bg-gradient-to-r from-udanix-blue to-udanix-cyan'}`}
                        />
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
}
