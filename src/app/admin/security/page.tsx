'use client';

import React from 'react';
import { Shield, ShieldCheck, Lock, Key, Eye, UserX, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SecurityPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl font-black text-[var(--admin-text-main)] tracking-tighter uppercase mb-2">
          Security <span className="text-[var(--admin-accent)]">Protocols</span>
        </h1>
        <p className="text-[var(--admin-text-muted)] font-medium">System hardening and access control monitoring.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <div className="glass-admin p-8">
            <h3 className="text-sm font-black text-[var(--admin-text-main)] uppercase tracking-widest mb-6">Active Security Policies</h3>
            <div className="space-y-4">
              {[
                { label: 'Two-Factor Authentication', status: 'Enforced', icon: Lock, color: 'text-emerald-600' },
                { label: 'Session Expiry (48h)', status: 'Active', icon: Key, color: 'text-[var(--admin-accent)]' },
                { label: 'Neural Mesh Encryption', status: 'AES-256-GCM', icon: ShieldCheck, color: 'text-[var(--admin-accent)]' },
              ].map(policy => (
                <div key={policy.label} className="flex items-center justify-between p-4 rounded-xl bg-[var(--admin-item-bg)] border border-[var(--admin-border)]">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg bg-[var(--admin-item-hover)] flex items-center justify-center ${policy.color}`}>
                      <policy.icon className="w-5 h-5" />
                    </div>
                    <p className="text-sm font-bold text-[var(--admin-text-main)]">{policy.label}</p>
                  </div>
                  <span className={`text-[10px] font-black uppercase tracking-widest ${policy.color}`}>{policy.status}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-admin p-8">
            <h3 className="text-sm font-black text-[var(--admin-text-main)] uppercase tracking-widest mb-6">Recent Access Logs</h3>
            <div className="space-y-4">
               {[
                 { user: 'admin@udanix.com', action: 'Login Success', ip: '192.168.1.1', time: '2 mins ago' },
                 { user: 'sys_root', action: 'DB Backup', ip: 'internal_mesh', time: '1 hour ago' },
                 { user: 'admin@udanix.com', action: 'Profile Purge', ip: '192.168.1.1', time: '3 hours ago' },
               ].map((log, i) => (
                 <div key={i} className="flex items-center justify-between py-3 border-b border-[var(--admin-border)] last:border-0">
                    <div>
                       <p className="text-xs font-bold text-[var(--admin-text-main)]">{log.user}</p>
                       <p className="text-[10px] text-[var(--admin-text-muted)] uppercase">{log.action}</p>
                    </div>
                    <div className="text-right">
                       <p className="text-[10px] font-bold text-[var(--admin-text-muted)]">{log.ip}</p>
                       <p className="text-[10px] text-[var(--admin-text-muted)]/70 uppercase">{log.time}</p>
                    </div>
                 </div>
               ))}
            </div>
            <Button variant="ghost" className="w-full mt-6 text-[10px] font-black uppercase text-[var(--admin-text-muted)] hover:text-[var(--admin-text-main)] hover:bg-[var(--admin-item-hover)]">
              View full audit trail
            </Button>
          </div>
        </div>

        <div className="space-y-8">
          <div className="glass-admin p-8 bg-emerald-500/5 border-emerald-500/20">
             <Shield className="w-12 h-12 text-emerald-600 mb-6" />
             <h3 className="text-lg font-black text-[var(--admin-text-main)] uppercase tracking-tighter">Shield Status: 100%</h3>
             <p className="text-xs text-[var(--admin-text-muted)] mt-2 leading-relaxed">
               All systems are within normal operating parameters. No unauthorized intrusion attempts detected in the last 24 cycles.
             </p>
          </div>

          <div className="glass-admin p-8 border-[var(--admin-border)]">
             <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-5 h-5 text-rose-600" />
                <h4 className="text-xs font-black text-[var(--admin-text-main)] uppercase tracking-widest">Threat Intelligence</h4>
             </div>
             <p className="text-xs text-[var(--admin-text-muted)] font-medium">
               Global monitoring suggests increased brute-force activity on SSR endpoints. Ensure all admin accounts have MFA active.
             </p>
             <Button variant="destructive" className="w-full mt-6 text-[10px] font-black uppercase h-10 text-white">
               Restrict System Access
             </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
