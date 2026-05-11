'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, ShieldCheck, Calendar, DollarSign, 
  RefreshCw, LayoutGrid, CheckCircle2, Eye,
  TrendingUp, Activity, ArrowUpRight, Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAdminData } from '@/hooks/useAdminData';
import { SessionsChart } from '@/components/admin/AdminCharts';
import Link from 'next/link';

export default function AdminOverviewPage() {
  const { 
    profiles, sessions, loading, isAdmin, stats, 
    loadAdminData 
  } = useAdminData();

  if (loading) return null;
  if (!isAdmin) return null;

  const pendingCounselors = profiles.filter(p => p.role === 'counselor' && !p.is_verified);

  const statCards = [
    { icon: Users, label: 'Total Entities', value: stats.totalUsers, growth: `+${stats.userGrowthWoW}%`, color: 'var(--admin-accent)', href: '/admin/students' },
    { icon: ShieldCheck, label: 'Verified Nodes', value: stats.activeCounselors, growth: `${stats.verificationRate}% Rate`, color: '#10B981', href: '/admin/counselors' },
    { icon: Calendar, label: 'Session Flow', value: stats.totalSessions, growth: `${stats.sessionSuccessRate}% Success`, color: '#0EA5E9', href: '/admin/sessions' },
    { icon: DollarSign, label: 'System GMV', value: `₹${(stats.totalGMV / 1000).toFixed(1)}k`, growth: '+12%', color: '#FBB03B', href: '/admin/analytics' },
  ];

  return (
    <div className="space-y-10 pb-20">
      {/* ─── Header ─── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-2">
          <div className="flex items-center gap-3 mb-2">
            <span className="px-3 py-1 rounded-lg bg-[var(--admin-accent)]/10 text-[var(--admin-accent)] text-[10px] font-black uppercase tracking-widest border border-[var(--admin-accent)]/20">
               Command Center v2.5
            </span>
            <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Grid Online</span>
            </div>
          </div>
          <h1 className="text-5xl font-black text-white tracking-tighter uppercase leading-[0.9]">
            Admin <span className="text-[var(--admin-accent)] admin-accent-glow">Overview</span>
          </h1>
          <p className="text-slate-400 text-lg font-medium">Real-time system heuristics and operational status.</p>
        </div>
        
        <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Grid Sync</p>
                <p className="text-sm font-bold text-white">{profiles.length > 0 ? '100% Synchronized' : 'Initializing...'}</p>
            </div>
            <button 
              onClick={loadAdminData}
              className="w-12 h-12 rounded-xl glass-admin flex items-center justify-center hover:bg-white/5 transition-all group active:scale-95"
            >
              <RefreshCw className="w-5 h-5 text-[var(--admin-accent)] group-hover:rotate-180 transition-transform duration-500" />
            </button>
        </div>
      </div>

      {/* ─── Stats Grid ─── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((s) => (
          <Link key={s.label} href={s.href}>
            <div className="glass-admin p-8 group relative overflow-hidden cursor-pointer hover:border-[var(--admin-accent)]/30 transition-all active:scale-95">
              <div className="absolute top-0 right-0 w-24 h-24 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
                <s.icon className="w-full h-full -rotate-12 translate-x-8 -translate-y-8" />
              </div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center border border-white/10 bg-white/5">
                  <s.icon className="w-6 h-6" style={{ color: s.color }} />
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-black px-2 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-1">
                    {s.growth}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-slate-600 group-hover:text-[var(--admin-accent)] transition-colors" />
                </div>
              </div>
              <p className="text-4xl font-black text-white tracking-tighter mb-1">{s.value}</p>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">{s.label}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* ─── Main Content ─── */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Charts Section */}
        <div className="lg:col-span-2 space-y-8">
          <div className="glass-admin p-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-black text-white tracking-tight uppercase">Session Propagation</h3>
              <div className="flex items-center gap-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[var(--admin-accent)]" />
                  Last 7 Days
                </div>
              </div>
            </div>
            <SessionsChart data={stats.sessionChartData} />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="glass-admin p-8">
              <h3 className="text-sm font-black text-white uppercase tracking-widest mb-6">Revenue Allocation</h3>
              <div className="h-64 flex items-center justify-center relative">
                {/* Simplified Donut Visual using CSS */}
                <div className="relative w-40 h-40 rounded-full border-[12px] border-white/5 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-[12px] border-transparent border-t-[var(--admin-accent)] -rotate-45" />
                  <div className="absolute inset-0 rounded-full border-[12px] border-transparent border-r-emerald-500 rotate-12" />
                  <div className="text-center">
                    <p className="text-2xl font-black text-white">₹{(stats.totalGMV/1000).toFixed(1)}k</p>
                    <p className="text-[8px] font-bold text-slate-500 uppercase">Total Revenue</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-6">
                {stats.streamRevenue.map(s => (
                  <div key={s.name} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }} />
                    <span className="text-[10px] font-bold text-slate-400 uppercase">{s.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-admin p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-sm font-black text-white uppercase tracking-widest">System Heuristics</h3>
                  <Activity className="w-4 h-4 text-emerald-500" />
                </div>
                <div className="space-y-4">
                  {[
                    { label: 'Verification Pipeline', val: stats.verificationRate },
                    { label: 'Session Completion', val: stats.sessionSuccessRate },
                    { label: 'Profile Integrity', val: 85 },
                  ].map(item => (
                    <div key={item.label}>
                      <div className="flex justify-between text-[10px] font-bold uppercase mb-2">
                        <span className="text-slate-500">{item.label}</span>
                        <span className="text-white">{item.val}%</span>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-[var(--admin-accent)]" style={{ width: `${item.val}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
             </div>

             <div className="glass-admin p-8 flex flex-col justify-center items-center text-center">
                <TrendingUp className="w-12 h-12 text-[var(--admin-accent)] mb-4" />
                <h3 className="text-lg font-black text-white uppercase tracking-tighter">System Growth</h3>
                <p className="text-xs text-slate-500 font-medium mt-2 leading-relaxed">
                  Organic expansion is trending at {stats.userGrowthWoW}% Week-over-Week. Neural mesh density optimizing.
                </p>
                <Button variant="link" className="text-[var(--admin-accent)] text-[10px] font-black uppercase mt-4">
                  Analysis Complete
                </Button>
             </div>
          </div>

          {/* New Recent Activity Section */}
          <div className="glass-admin p-8">
            <h3 className="text-xl font-black text-white tracking-tight uppercase mb-8">System Activity Pulse</h3>
            <div className="space-y-4">
              {stats.recentActivity.map((act, idx) => (
                <div key={idx} className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold ${act.type === 'USER' ? 'bg-blue-500/10 text-blue-400' : 'bg-purple-500/10 text-purple-400'}`}>
                    {act.type[0]}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-white">{act.label}</p>
                    <p className="text-[10px] text-slate-500 font-medium uppercase">{act.date ? new Date(act.date).toLocaleString() : 'Recent'}</p>
                  </div>
                </div>
              ))}
              {stats.recentActivity.length === 0 && (
                <p className="text-center py-8 text-[10px] font-bold text-slate-500 uppercase italic">No recent activity detected in grid</p>
              )}
            </div>
          </div>
        </div>

        {/* Action Sidebar */}
        <div className="space-y-8">
          {/* Operational Velocity */}
          <div className="glass-admin p-6 bg-gradient-to-br from-[var(--admin-accent)]/10 to-transparent border-[var(--admin-accent)]/20 relative overflow-hidden group">
              <div className="absolute top-[-20%] right-[-10%] w-32 h-32 bg-[var(--admin-accent)]/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
              <div className="relative z-10 flex items-center justify-between mb-4">
                 <div className="w-10 h-10 rounded-xl bg-[var(--admin-accent)]/20 flex items-center justify-center text-[var(--admin-accent)]">
                    <Zap className="w-5 h-5 animate-pulse" />
                 </div>
                 <div className="text-right">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Velocity</p>
                    <p className="text-xl font-black text-white">4.2 <span className="text-xs text-[var(--admin-accent)]">req/s</span></p>
                 </div>
              </div>
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                 <motion.div 
                   className="h-full bg-[var(--admin-accent)] shadow-[0_0_10px_rgba(var(--admin-accent-rgb),0.5)]"
                   initial={{ width: "0%" }}
                   animate={{ width: "65%" }}
                   transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                 />
              </div>
              <p className="mt-3 text-[10px] font-bold text-slate-400 italic">Processing neural handshake vectors...</p>
          </div>

          <div className="glass-admin p-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-black text-white tracking-tight uppercase">Clearance</h3>
              <div className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 text-[10px] font-black border border-amber-500/20">
                {pendingCounselors.length} PENDING
              </div>
            </div>
            
            <div className="space-y-4">
              {pendingCounselors.slice(0, 3).map(p => (
                <div key={p.id} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                  <div>
                    <p className="text-xs font-black text-white uppercase">{p.full_name}</p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase">{p.stream || 'General'}</p>
                  </div>
                  <Link href={`/admin/counselors?search=${p.full_name}`}>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-8 w-8 p-0 rounded-lg text-[var(--admin-accent)]"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              ))}
              {pendingCounselors.length === 0 && (
                <div className="py-12 text-center">
                  <CheckCircle2 className="w-12 h-12 text-emerald-500/20 mx-auto mb-4" />
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">All nodes authorized</p>
                </div>
              )}
            </div>
          </div>

          <div className="glass-admin p-8 bg-gradient-to-br from-blue-500/10 to-transparent">
             <h3 className="text-sm font-black text-white uppercase tracking-widest mb-4">Neural Insights</h3>
             <ul className="space-y-3">
               {[
                 `Top stream: ${stats.topStream}`,
                 'Peak activity: 6PM - 9PM IST',
                 `Nodes Active: ${stats.activeCounselors}`,
                 `Success Rate: ${stats.sessionSuccessRate}%`
               ].map(insight => (
                 <li key={insight} className="flex items-center gap-3 text-xs text-slate-400">
                    <div className="w-1 h-1 rounded-full bg-[var(--admin-accent)]" />
                    {insight}
                 </li>
               ))}
             </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
