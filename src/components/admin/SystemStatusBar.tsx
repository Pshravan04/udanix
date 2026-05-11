'use client';

import React, { useState, useEffect } from 'react';
import { useAdminData } from '@/hooks/useAdminData';
import { CheckCircle2, Clock, RefreshCcw } from 'lucide-react';

export function SystemStatusBar() {
  const { loading } = useAdminData();
  const [lastSync, setLastSync] = useState<string>('');

  useEffect(() => {
    setLastSync(new Date().toLocaleTimeString());
  }, []);

  if (loading) return null;

  return (
    <div className="flex items-center gap-6 px-8 py-2 bg-black/20 border-b border-white/5 backdrop-blur-md overflow-x-auto no-scrollbar">
      <div className="flex items-center gap-2 shrink-0">
        <CheckCircle2 className="w-3 h-3 text-[var(--admin-accent)]" />
        <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">System Status:</span>
        <span className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest">Operational</span>
      </div>
      
      <div className="h-3 w-px bg-white/5 shrink-0" />
      
      <div className="flex items-center gap-2 shrink-0">
        <Clock className="w-3 h-3 text-slate-500" />
        <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Session Duration:</span>
        <span className="text-[9px] font-bold text-white uppercase tracking-widest">02:45:12</span>
      </div>

      <div className="ml-auto flex items-center gap-3 shrink-0">
        <div className="flex items-center gap-2">
          <RefreshCcw className="w-3 h-3 text-blue-500" />
          <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Last Sync:</span>
          <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">{lastSync}</span>
        </div>
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
      </div>
    </div>
  );
}

