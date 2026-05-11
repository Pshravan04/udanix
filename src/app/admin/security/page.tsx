'use client';

import React from 'react';
import { Shield, ShieldCheck, Lock, Key, Eye, UserX, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SecurityPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl font-black text-white tracking-tighter uppercase mb-2">
          Security <span className="text-emerald-500">Protocols</span>
        </h1>
        <p className="text-slate-400 font-medium">System hardening and access control monitoring.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <div className="glass-admin p-8">
            <h3 className="text-sm font-black text-white uppercase tracking-widest mb-6">Active Security Policies</h3>
            <div className="space-y-4">
              {[
                { label: 'Two-Factor Authentication', status: 'Enforced', icon: Lock, color: 'text-emerald-500' },
                { label: 'Session Expiry (48h)', status: 'Active', icon: Key, color: 'text-blue-500' },
                { label: 'Neural Mesh Encryption', status: 'AES-256-GCM', icon: ShieldCheck, color: 'text-[var(--admin-accent)]' },
              ].map(policy => (
                <div key={policy.label} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center ${policy.color}`}>
                      <policy.icon className="w-5 h-5" />
                    </div>
                    <p className="text-sm font-bold text-white">{policy.label}</p>
                  </div>
                  <span className={`text-[10px] font-black uppercase tracking-widest ${policy.color}`}>{policy.status}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-admin p-8">
            <h3 className="text-sm font-black text-white uppercase tracking-widest mb-6">Recent Access Logs</h3>
            <div className="space-y-4">
               {[
                 { user: 'admin@udanix.com', action: 'Login Success', ip: '192.168.1.1', time: '2 mins ago' },
                 { user: 'sys_root', action: 'DB Backup', ip: 'internal_mesh', time: '1 hour ago' },
                 { user: 'admin@udanix.com', action: 'Profile Purge', ip: '192.168.1.1', time: '3 hours ago' },
               ].map((log, i) => (
                 <div key={i} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                    <div>
                       <p className="text-xs font-bold text-white">{log.user}</p>
                       <p className="text-[10px] text-slate-500 uppercase">{log.action}</p>
                    </div>
                    <div className="text-right">
                       <p className="text-[10px] font-bold text-slate-400">{log.ip}</p>
                       <p className="text-[10px] text-slate-600 uppercase">{log.time}</p>
                    </div>
                 </div>
               ))}
            </div>
            <Button variant="ghost" className="w-full mt-6 text-[10px] font-black uppercase text-slate-500 hover:text-white">
              View full audit trail
            </Button>
          </div>
        </div>

        <div className="space-y-8">
          <div className="glass-admin p-8 bg-emerald-500/5 border-emerald-500/20">
             <Shield className="w-12 h-12 text-emerald-500 mb-6" />
             <h3 className="text-lg font-black text-white uppercase tracking-tighter">Shield Status: 100%</h3>
             <p className="text-xs text-slate-400 mt-2 leading-relaxed">
               All systems are within normal operating parameters. No unauthorized intrusion attempts detected in the last 24 cycles.
             </p>
          </div>

          <div className="glass-admin p-8 border-rose-500/20">
             <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-5 h-5 text-rose-500" />
                <h4 className="text-xs font-black text-white uppercase tracking-widest">Threat Intelligence</h4>
             </div>
             <p className="text-xs text-slate-500 font-medium">
               Global monitoring suggests increased brute-force activity on SSR endpoints. Ensure all admin accounts have MFA active.
             </p>
             <Button variant="destructive" className="w-full mt-6 text-[10px] font-black uppercase h-10">
               Restrict System Access
             </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
