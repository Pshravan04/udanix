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
import { UserDonutChart, StreamDistribution, RatingDistribution } from '@/components/admin/AdminCharts';

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
          {/* Stream Distribution Chart */}
          <div className="glass-admin p-8">
              <h3 className="text-sm font-black text-white uppercase tracking-widest mb-6">Expertise Density</h3>
              <StreamDistribution data={stats.streamRevenue} />
          </div>

          {/* Top Performance Chart */}
          <div className="glass-admin p-8">
              <h3 className="text-sm font-black text-white uppercase tracking-widest mb-6">Satisfaction Spread</h3>
              <RatingDistribution data={stats.ratingDistribution} />
          </div>

          {/* Performance Leaderboard */}
          <div className="glass-admin p-8">
              <h3 className="text-sm font-black text-white uppercase tracking-widest mb-6 flex items-center justify-between">
                Top Performing Entities
                <TrendingUp className="w-4 h-4 text-emerald-500" />
              </h3>
              <div className="space-y-6">
                {stats.topCounselors.map((c: any, i: number) => (
                  <div key={c.id} className="flex items-center gap-4 group cursor-pointer" onClick={() => openProfileDetail(c)}>
                    <div className="relative">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 text-blue-500 font-bold text-xs">
                        {c.full_name?.charAt(0)}
                      </div>
                      <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-blue-600 border-2 border-[#050505] flex items-center justify-center text-[8px] font-black text-white">
                        {i + 1}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-black text-white truncate group-hover:text-blue-400 transition-colors">{c.full_name}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <div className="flex items-center gap-1 text-[10px] text-amber-500 font-bold">
                           <Star className="w-2.5 h-2.5 fill-current" />
                           {c.rating || 0}
                        </div>
                        <span className="text-[10px] text-slate-500 font-black uppercase tracking-tighter">
                          {c.completedCount} Sessions
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="ghost" className="w-full mt-8 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white hover:bg-white/5 py-6">
                View Full Leaderboard
              </Button>
          </div>

          <div className="glass-admin p-8 border-l-4 border-blue-500">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
                  <ShieldAlert className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-white uppercase">System Integrity</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    All counselors must complete Phase 2 verification before they can accept premium sessions.
                  </p>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}
