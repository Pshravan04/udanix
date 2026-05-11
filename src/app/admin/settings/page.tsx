'use client';

import React from 'react';
import { Settings, Globe, Bell, CreditCard, Database, Zap, HardDrive } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SettingsPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl font-black text-white tracking-tighter uppercase mb-2">
          System <span className="text-blue-500">Configuration</span>
        </h1>
        <p className="text-slate-400 font-medium">Fine-tune the platform core parameters.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="glass-admin p-8">
             <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 border border-blue-500/20">
                   <Globe className="w-6 h-6" />
                </div>
                <div>
                   <h3 className="text-sm font-black text-white uppercase tracking-widest">Platform Identity</h3>
                   <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">Global branding and localization</p>
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                   <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Platform Name</label>
                   <input 
                     type="text" 
                     defaultValue="UDANIX"
                     className="w-full bg-black/20 border border-white/5 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-blue-500/50"
                   />
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Support Email</label>
                   <input 
                     type="email" 
                     defaultValue="ops@udanix.com"
                     className="w-full bg-black/20 border border-white/5 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-blue-500/50"
                   />
                </div>
             </div>
          </div>

          <div className="glass-admin p-8">
             <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500 border border-amber-500/20">
                   <CreditCard className="w-6 h-6" />
                </div>
                <div>
                   <h3 className="text-sm font-black text-white uppercase tracking-widest">Financial Matrix</h3>
                   <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">Commission and payment logic</p>
                </div>
             </div>

             <div className="space-y-6">
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                   <div>
                      <p className="text-xs font-bold text-white">Platform Commission</p>
                      <p className="text-[10px] text-slate-500 font-medium">Applied to every successful session</p>
                   </div>
                   <div className="flex items-center gap-3">
                      <input 
                        type="text" 
                        defaultValue="15"
                        className="w-16 bg-black/40 border border-white/10 rounded-lg py-2 text-center text-xs font-bold text-white focus:outline-none"
                      />
                      <span className="text-xs font-black text-slate-500">%</span>
                   </div>
                </div>
                
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 opacity-50 cursor-not-allowed">
                   <div>
                      <p className="text-xs font-bold text-white">GST Integration</p>
                      <p className="text-[10px] text-slate-500 font-medium">Automatic tax calculation</p>
                   </div>
                   <div className="w-10 h-5 bg-slate-800 rounded-full relative">
                      <div className="absolute left-1 top-1 w-3 h-3 bg-slate-600 rounded-full" />
                   </div>
                </div>
             </div>
          </div>
        </div>

        <div className="space-y-8">
           <div className="glass-admin p-8">
              <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">System Health</h4>
              <div className="space-y-6">
                 {[
                   { label: 'DB Latency', value: '42ms', icon: Database, color: 'text-emerald-500' },
                   { label: 'Storage', value: '12% Used', icon: HardDrive, color: 'text-blue-500' },
                   { label: 'Compute', value: 'Normal', icon: Zap, color: 'text-amber-500' },
                 ].map(item => (
                   <div key={item.label} className="flex items-center gap-4">
                      <item.icon className={`w-4 h-4 ${item.color}`} />
                      <div className="flex-1">
                         <div className="flex justify-between mb-1">
                            <span className="text-[10px] font-bold text-slate-400">{item.label}</span>
                            <span className="text-[10px] font-black text-white uppercase">{item.value}</span>
                         </div>
                         <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                            <div className={`h-full ${item.color.replace('text-', 'bg-')}`} style={{ width: '40%' }} />
                         </div>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           <div className="glass-admin p-8 bg-blue-600/5 border-blue-500/20">
              <h4 className="text-sm font-black text-white uppercase tracking-tighter mb-4">Save Changes</h4>
              <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                Modifying platform identity or financial parameters will require a system-wide revalidation.
              </p>
              <Button className="w-full bg-blue-600 hover:bg-blue-500 font-black uppercase text-xs h-12 shadow-lg shadow-blue-500/20">
                Commit Changes
              </Button>
           </div>
        </div>
      </div>
    </div>
  );
}
