'use client';

import React from 'react';
import { useAdminData } from '@/hooks/useAdminData';
import { Shield, Zap, Globe, Activity } from 'lucide-react';

export function SystemStatusBar() {
  const { stats, loading } = useAdminData();

  if (loading) return null;

  return (
    <div className="flex items-center gap-6 px-8 py-2 bg-black/40 border-b border-white/5 backdrop-blur-md overflow-x-auto no-scrollbar">
      <div className="flex items-center gap-2 shrink-0">
        <Shield className="w-3 h-3 text-[var(--admin-accent)]" />
        <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Security:</span>
        <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">L3 Active</span>
      </div>
      <div className="h-3 w-px bg-white/5 shrink-0" />
      <div className="flex items-center gap-2 shrink-0">
        <Zap className="w-3 h-3 text-amber-500" />
        <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Latency:</span>
        <span className="text-[9px] font-black text-white uppercase tracking-widest">14ms</span>
      </div>
      <div className="h-3 w-px bg-white/5 shrink-0" />
      <div className="flex items-center gap-2 shrink-0">
        <Activity className="w-3 h-3 text-blue-500" />
        <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">CPU:</span>
        <span className="text-[9px] font-black text-white uppercase tracking-widest">12%</span>
      </div>
      <div className="h-3 w-px bg-white/5 shrink-0" />
      <div className="flex items-center gap-2 shrink-0">
        <div className="w-3 h-3 rounded-sm border border-purple-500/50 flex items-center justify-center text-[7px] font-black text-purple-500">M</div>
        <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">MEM:</span>
        <span className="text-[9px] font-black text-white uppercase tracking-widest">1.2GB</span>
      </div>
      <div className="h-3 w-px bg-white/5 shrink-0" />
      <div className="flex items-center gap-2 shrink-0">
        <Globe className="w-3 h-3 text-blue-400" />
        <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Region:</span>
        <span className="text-[9px] font-black text-white uppercase tracking-widest">Global-Edge</span>
      </div>
      <div className="ml-auto flex items-center gap-2 shrink-0">
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic">Live Neural Sync</span>
      </div>
    </div>
  );
}

