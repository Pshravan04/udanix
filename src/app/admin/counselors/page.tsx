'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, Search, ShieldCheck, ShieldAlert, Eye, 
  Star, Briefcase, TrendingUp, CheckCircle2, Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAdminData } from '@/hooks/useAdminData';
import { EntityDetailModal } from '@/components/admin/EntityDetailModal';
import { UserDonutChart, StreamDistribution } from '@/components/admin/AdminCharts';

export default function CounselorsAdminPage() {
  const { 
    profiles, loading, isAdmin, actionLoading, stats,
    handleVerify, handleDelete, handleUpdateRole 
  } = useAdminData();
  
  const [search, setSearch] = useState('');
  const [selectedProfile, setSelectedProfile] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const counselors = profiles.filter(p => p.role === 'counselor' && (
    p.full_name?.toLowerCase().includes(search.toLowerCase()) ||
    p.email?.toLowerCase().includes(search.toLowerCase()) ||
    p.stream?.toLowerCase().includes(search.toLowerCase())
  ));

  const openProfileDetail = (profile: any) => {
    setSelectedProfile(profile);
    setIsModalOpen(true);
  };

  // Status Distribution for Counselors
  const statusData = [
    { name: 'Verified', value: stats.activeCounselors, color: '#10B981' },
    { name: 'Pending', value: stats.pendingVerifications, color: '#FBB03B' },
  ];

  if (loading) return null;
  if (!isAdmin) return null;

  return (
    <div className="space-y-10">
      <EntityDetailModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={selectedProfile}
        onVerify={handleVerify}
        onDelete={handleDelete}
        onUpdateRole={handleUpdateRole}
      />

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tighter uppercase mb-2">
            Counselor <span className="text-emerald-500">Fleet</span>
          </h1>
          <p className="text-slate-400 font-medium">Verifying and managing {stats.counselors} expert nodes.</p>
        </div>
        <div className="flex gap-4">
           <div className="px-6 py-3 rounded-2xl glass-admin border-emerald-500/20 flex items-center gap-4">
              <ShieldCheck className="w-6 h-6 text-emerald-500" />
              <div>
                <p className="text-sm font-black text-white leading-none">{stats.activeCounselors}</p>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">Verified Nodes</p>
              </div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* List Section */}
          <div className="glass-admin overflow-hidden">
            <div className="p-6 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input 
                  type="text" 
                  placeholder="Search by name, email or expertise..." 
                  className="w-full bg-black/20 border border-white/5 rounded-xl py-3 pl-10 pr-4 text-sm text-slate-300 focus:outline-none focus:border-emerald-500/50 transition-all"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-white/[0.02]">
                  <tr>
                    <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Counselor</th>
                    <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Expertise</th>
                    <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Status</th>
                    <th className="px-6 py-4 text-right text-[10px] font-black text-slate-500 uppercase tracking-widest">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {counselors.map((counselor) => (
                    <tr key={counselor.id} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center border font-bold text-xs ${
                            counselor.is_verified ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' : 'bg-slate-500/10 border-white/10 text-slate-400'
                          }`}>
                            {counselor.full_name?.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-white">{counselor.full_name}</p>
                            <p className="text-[10px] text-slate-500">{counselor.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                           <span className="px-3 py-1 rounded-full bg-emerald-500/5 border border-emerald-500/10 text-[10px] font-bold text-emerald-400 uppercase">
                             {counselor.stream}
                           </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {counselor.is_verified ? (
                          <div className="flex items-center gap-1.5 text-emerald-500">
                             <CheckCircle2 className="w-3 h-3" />
                             <span className="text-[10px] font-black uppercase tracking-widest">Verified</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 text-amber-500">
                             <Clock className="w-3 h-3" />
                             <span className="text-[10px] font-black uppercase tracking-widest">Pending</span>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-9 w-9 p-0 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white"
                          onClick={() => openProfileDetail(counselor)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-8">
           <div className="glass-admin p-8">
              <h3 className="text-sm font-black text-white uppercase tracking-widest mb-6">Verification Ratio</h3>
              <UserDonutChart data={statusData} />
           </div>

           <div className="glass-admin p-8 border-l-4 border-emerald-500">
              <h4 className="text-sm font-black text-white uppercase mb-4">Top Performance</h4>
              <div className="space-y-4">
                 {counselors.filter(c => c.is_verified).slice(0, 3).map(c => (
                   <div key={c.id} className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-500 font-black text-[10px]">
                            {c.full_name?.charAt(0)}
                         </div>
                         <p className="text-xs font-bold text-white">{c.full_name}</p>
                      </div>
                      <div className="flex items-center gap-1 text-amber-400">
                         <Star className="w-3 h-3 fill-current" />
                         <span className="text-[10px] font-bold">4.9</span>
                      </div>
                   </tr>
                 ))}
              </div>
           </div>

           <div className="glass-admin p-8 bg-gradient-to-br from-emerald-500/10 to-transparent border-emerald-500/20">
              <ShieldAlert className="w-10 h-10 text-emerald-500 mb-4" />
              <h4 className="text-sm font-black text-white uppercase">Quality Assurance</h4>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Counselors with less than 4.0 average rating are automatically flagged for system review.
              </p>
              <Button className="w-full mt-6 bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest rounded-xl">
                 Run Compliance Check
              </Button>
           </div>
        </div>
      </div>
    </div>
  );
}
