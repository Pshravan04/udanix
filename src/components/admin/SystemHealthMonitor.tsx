'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, 
  Cpu, 
  Database, 
  Globe, 
  ShieldCheck,
  Server,
  Workflow,
  Radio
} from 'lucide-react';

const Metric = ({ label, value, subValue, color, icon: Icon, percentage }: any) => {
  const textColorClass = color === 'blue' ? 'text-blue-600' : color === 'emerald' ? 'text-emerald-600' : color === 'amber' ? 'text-amber-600' : 'text-purple-600';
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-xl bg-${color}-500/10 border border-${color}-500/20 ${textColorClass}`}>
            <Icon className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[10px] font-black text-[var(--admin-text-muted)] uppercase tracking-[0.2em]">{label}</p>
            <p className="text-sm font-bold text-[var(--admin-text-main)] tabular-nums">{value}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-black text-[var(--admin-text-main)]">{percentage}%</p>
          <p className="text-[9px] font-bold text-[var(--admin-text-muted)] uppercase tracking-widest">{subValue}</p>
        </div>
      </div>
      <div className="h-1.5 w-full bg-[var(--admin-item-bg)] rounded-full overflow-hidden p-[2px]">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`h-full rounded-full bg-${color}-500 shadow-[0_0_10px_rgba(var(--${color}-rgb),0.5)]`}
          style={{ 
              backgroundColor: color === 'blue' ? '#3b82f6' : color === 'emerald' ? '#10b981' : color === 'amber' ? '#f59e0b' : '#8b5cf6' 
          }}
        />
      </div>
    </div>
  );
};

export function SystemHealthMonitor() {
  const [metrics, setMetrics] = useState({
    cpu: 24,
    mem: 42,
    db: 12,
    net: 18
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics({
        cpu: 20 + Math.floor(Math.random() * 15),
        mem: 40 + Math.floor(Math.random() * 10),
        db: 10 + Math.floor(Math.random() * 5),
        net: 15 + Math.floor(Math.random() * 20)
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-admin rounded-[2.5rem] p-8 flex flex-col h-full">
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 shadow-inner">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-black text-[var(--admin-text-main)] uppercase tracking-wider">Node Status</h3>
            <p className="text-[9px] font-black text-[var(--admin-text-muted)] uppercase tracking-[0.2em]">Infrastructure Integrity</p>
          </div>
        </div>
        <div className="p-2 rounded-xl bg-[var(--admin-item-bg)] border border-[var(--admin-border)]">
            <Workflow className="w-4 h-4 text-[var(--admin-text-muted)]" />
        </div>
      </div>

      <div className="flex-1 space-y-10">
        <Metric 
          label="Cluster CPU" 
          value="Node-X Core" 
          subValue="Load Balanced" 
          color="blue" 
          icon={Cpu} 
          percentage={metrics.cpu} 
        />
        <Metric 
          label="Memory Matrix" 
          value="Edge Cache" 
          subValue="8.4GB / 32GB" 
          color="emerald" 
          icon={Server} 
          percentage={metrics.mem} 
        />
        <Metric 
          label="DB Throughput" 
          value="Postgres Node" 
          subValue="1.2k queries/s" 
          color="amber" 
          icon={Database} 
          percentage={metrics.db} 
        />
        <Metric 
          label="Network Pulse" 
          value="Global Edge" 
          subValue="24ms latency" 
          color="purple" 
          icon={Radio} 
          percentage={metrics.net} 
        />
      </div>

      <div className="mt-12 p-6 rounded-[1.5rem] bg-[var(--admin-item-bg)] border border-[var(--admin-border-subtle)] relative overflow-hidden group">
         <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
         <div className="flex items-center gap-4 relative z-10">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
               <ShieldCheck className="w-5 h-5 text-emerald-500" />
            </div>
            <div>
               <p className="text-[10px] font-black text-[var(--admin-text-main)] uppercase tracking-widest">Security Protocol</p>
               <p className="text-[9px] font-medium text-[var(--admin-text-muted)] uppercase tracking-widest mt-0.5">Level-4 Shield Active</p>
            </div>
         </div>
      </div>
    </div>
  );
}
