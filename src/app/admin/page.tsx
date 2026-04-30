'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Users, AlertCircle, Clock, Search, ArrowRight, Loader2,
  Lock, Activity, Layers, Database
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { fadeUpStagger as fadeUp } from '@/lib/animations';
import { Profile } from '@/types';


const STATUS_STYLES: Record<string, string> = {
  verified: 'bg-emerald-50 text-emerald-600 border-emerald-100',
  pending: 'bg-amber-50 text-amber-600 border-amber-100',
  review: 'bg-rose-50 text-rose-600 border-rose-100',
};

const ACTIVITY = [
  { event: 'Node Auth Success', sub: 'Admin Terminal 01 authorized', time: '2m ago', type: 'info' },
  { event: 'Verification Pulse', sub: '3 Expert nodes verified', time: '1h ago', type: 'success' },
  { event: 'Protocol Deviation', sub: 'Latency spike in Node 04', time: '3h ago', type: 'warn' },
  { event: 'System Milestone', sub: 'Platform GMV targets reached', time: '5h ago', type: 'success' },
];

export default function AdminDashboard() {
  const supabase = createClient();
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [counselors, setCounselors] = useState<Profile[]>([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeCounselors: 0,
    totalGMV: 0,
    pendingVerifications: 0
  });

  useEffect(() => {
    async function loadAdminData() {
      const { data: profiles } = await supabase.from('profiles').select('*');
      if (profiles) {
        const counselorsOnly = profiles.filter(p => p.role === 'counselor');
        setCounselors(counselorsOnly);
        const totalGMV = counselorsOnly.reduce((sum, c) => sum + ((c.sessions_count || 0) * (c.price_per_hour || 500)), 0);
        setStats({
          totalUsers: profiles.length,
          activeCounselors: counselorsOnly.length,
          totalGMV,
          pendingVerifications: counselorsOnly.filter(c => !c.is_verified).length
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
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="relative">
           <Loader2 className="w-16 h-16 text-udanix-blue animate-spin" />
           <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2 h-2 bg-udanix-blue rounded-full animate-ping" />
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-24">
      {/* ─── Header ─── */}
      <div className="relative flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] shadow-float">
               Admin Terminal
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
            className="text-5xl font-black text-slate-900 tracking-tighter uppercase leading-none"
          >
            System Node <span className="text-udanix-blue">Control</span>
          </motion.h1>
          <p className="text-slate-500 text-lg font-medium">Managing core platform infrastructure and verified entities.</p>
        </div>
        <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Protocol Version</p>
                <p className="text-sm font-black text-slate-900 uppercase tracking-tighter">v.4.8.2-SECURE</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 shadow-float flex items-center justify-center">
                <Lock className="w-5 h-5 text-udanix-blue" />
            </div>
        </div>
      </div>

      {/* ─── Stats Grid ─── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: Users, label: 'Global Traffic', value: (stats.totalUsers * 12).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), change: '+842 Pulse', color: 'blue' },
          { icon: Database, label: 'Expert Nodes', value: stats.activeCounselors.toString(), change: '↑ 12 online', color: 'blue' },
          { icon: Activity, label: 'Platform GMV', value: `₹${(stats.totalGMV / 100000).toFixed(1)}L`, change: '+23% Cycle', color: 'emerald' },
          { icon: AlertCircle, label: 'Security Flux', value: stats.pendingVerifications.toString(), change: 'Critical Ops', color: 'red' },
        ].map((s, i) => (
          <motion.div 
            key={s.label} 
            variants={fadeUp} 
            custom={i} 
            initial="hidden" 
            animate="visible"
            className="bg-white rounded-[2rem] border border-slate-100 p-8 shadow-premium hover:shadow-2xl transition-all group overflow-hidden relative"
          >
            <div className="absolute -bottom-4 -right-4 w-28 h-28 bg-udanix-blue/[0.02] rounded-full group-hover:scale-150 transition-transform duration-700" />
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border transition-all ${
              s.color === 'emerald' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
              s.color === 'red' ? 'bg-rose-50 text-rose-600 border-rose-100' :
              'bg-udanix-blue/5 text-udanix-blue border-udanix-blue/10'
            } group-hover:scale-110 group-hover:rotate-3 shadow-sm`}>
              <s.icon className="w-7 h-7" />
            </div>
            <p style={{ fontFamily: 'var(--font-space-grotesk)' }} className="text-4xl font-black text-slate-900 tracking-tighter uppercase">{s.value}</p>
            <div className="flex items-center justify-between mt-2">
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] group-hover:text-udanix-blue transition-colors">{s.label}</p>
              <p className={`text-[10px] font-black uppercase tracking-tighter px-2 py-0.5 rounded-full ${s.color === 'red' ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'}`}>{s.change}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        {/* ─── Entity Management ─── */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center justify-between px-2">
            <h2 style={{ fontFamily: 'var(--font-space-grotesk)' }} className="text-2xl font-black text-slate-900 tracking-tighter uppercase flex items-center gap-3">
              <div className="w-2 h-8 bg-udanix-blue rounded-full shadow-lg shadow-blue-500/20" />
              Node Management
            </h2>
            <Button size="sm" variant="outline" className="h-12 px-8 rounded-2xl border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-50 text-xs font-black uppercase tracking-widest transition-all shadow-sm">
              Deep Archive <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <div className="relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-udanix-blue transition-colors" />
            <input
              type="text"
              placeholder="Search entity database (Psychology, Name, ID)..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full h-16 pl-16 pr-8 rounded-[1.5rem] bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 text-sm outline-none focus:border-udanix-blue focus:ring-4 focus:ring-udanix-blue/5 transition-all font-medium shadow-sm"
            />
          </div>

          <div className="space-y-4">
            {filtered.length === 0 ? (
              <div className="bg-white rounded-[2rem] border border-slate-100 p-16 text-center shadow-premium">
                 <Search className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                 <p className="text-slate-400 font-bold uppercase tracking-widest italic">No node matches found in database.</p>
              </div>
            ) : filtered.map((c, i) => (
              <motion.div
                key={c.id}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={i}
                className="bg-white rounded-[2rem] border border-slate-100 p-6 flex flex-col sm:flex-row items-center gap-6 shadow-premium hover:shadow-2xl transition-all group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-udanix-blue/[0.01] -rotate-45 translate-x-12 -translate-y-12" />
                <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600 font-black text-xl shadow-inner group-hover:bg-udanix-blue group-hover:text-white transition-all shrink-0">
                  {c.full_name?.charAt(0) || 'E'}
                </div>
                <div className="flex-1 min-w-0 text-center sm:text-left">
                  <p style={{ fontFamily: 'var(--font-space-grotesk)' }} className="font-black text-slate-900 text-lg tracking-tight uppercase group-hover:text-udanix-blue transition-colors">{c.full_name}</p>
                  <p className="text-slate-400 text-[11px] font-bold uppercase tracking-widest mt-1 opacity-80">
                    {c.stream || 'General'} <span className="mx-2 text-slate-200">|</span> 
                    {c.sessions_count || 0} Cycles <span className="mx-2 text-slate-200">|</span> 
                    <span className="text-amber-500 font-black tracking-tighter italic">RATIO: {c.rating || 5.0}</span>
                  </p>
                </div>
                <div className="flex items-center gap-6 shrink-0">
                  <span className={`text-[10px] font-black px-4 py-2 rounded-xl uppercase tracking-[0.2em] border shadow-sm ${c.is_verified ? STATUS_STYLES.verified : STATUS_STYLES.pending}`}>
                    {c.is_verified ? 'verified' : 'pending'}
                  </span>
                  {!c.is_verified && (
                    <Button size="sm" className="h-12 px-8 bg-udanix-blue hover:bg-blue-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-blue-500/10 transition-all hover:scale-105 active:scale-95">
                      Authorize
                    </Button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ─── Event Log ─── */}
        <div className="space-y-8">
          <h2 style={{ fontFamily: 'var(--font-space-grotesk)' }} className="text-2xl font-black text-slate-900 tracking-tighter uppercase flex items-center gap-3 px-2">
            <div className="w-2 h-8 bg-slate-900 rounded-full shadow-lg" />
            Protocol Log
          </h2>
          <div className="bg-white rounded-[2.5rem] border border-slate-100 divide-y divide-slate-50 p-3 shadow-premium">
            {ACTIVITY.map((a, i) => (
              <div key={i} className="p-6 hover:bg-slate-50/50 transition-colors first:rounded-t-[2.2rem] last:rounded-b-[2.2rem] group/log">
                <div className="flex items-start gap-4">
                  <div className={`w-2 h-2 rounded-full mt-2.5 shrink-0 shadow-sm ${
                    a.type === 'success' ? 'bg-emerald-500' :
                    a.type === 'warn' ? 'bg-amber-500' : 'bg-udanix-blue'
                  } group-hover/log:scale-125 transition-transform`} />
                  <div className="flex-1 min-w-0">
                    <p className="font-black text-slate-900 text-[14px] tracking-tight uppercase leading-tight">{a.event}</p>
                    <p className="text-slate-400 text-xs font-medium mt-1 leading-relaxed">{a.sub}</p>
                    <p className="text-slate-300 text-[9px] font-black uppercase tracking-[0.15em] mt-3 flex items-center gap-2">
                      <Clock className="w-3 h-3" /> {a.time}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            <div className="p-4 bg-slate-50/50 rounded-b-[2.2rem]">
                <button className="w-full py-3 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-udanix-blue transition-colors">Load Master Logs</button>
            </div>
          </div>

          {/* Micro Card */}
          <div className="bg-udanix-blue p-8 rounded-[2.5rem] text-white shadow-2xl shadow-blue-900/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16 group-hover:scale-110 transition-transform duration-700" />
            <Layers className="w-10 h-10 mb-6 opacity-40" />
            <h3 className="text-xl font-black tracking-tight uppercase mb-2">Protocol Override</h3>
            <p className="text-blue-100 text-sm font-medium mb-6">Manually adjust platform parameters and neural routing.</p>
            <button className="w-full py-4 bg-white text-udanix-blue text-[11px] font-black uppercase tracking-widest rounded-2xl shadow-lg hover:-translate-y-1 transition-all">Start Session</button>
          </div>
        </div>
      </div>
    </div>
  );
}
