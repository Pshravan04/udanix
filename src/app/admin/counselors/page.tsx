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
import { EntityPreviewCard } from '@/components/admin/EntityPreviewCard';
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
          <h1 className="text-4xl font-black text-[var(--admin-text-main)] tracking-tighter uppercase mb-2">
            Counselor <span className="text-[var(--admin-accent)]">Fleet</span>
          </h1>
          <p className="text-[var(--admin-text-muted)] font-medium">Verifying and managing {stats.counselors} expert nodes.</p>
        </div>
        <div className="flex gap-4">
           <div className="px-6 py-3 rounded-2xl glass-admin border-emerald-500/20 flex items-center gap-4">
              <ShieldCheck className="w-6 h-6 text-emerald-500" />
              <div>
                <p className="text-sm font-black text-[var(--admin-text-main)] leading-none">{stats.activeCounselors}</p>
                <p className="text-[10px] font-black text-[var(--admin-text-muted)] uppercase tracking-widest mt-1">Verified Nodes</p>
              </div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* List Section */}
          <div className="space-y-6">
            <div className="glass-admin p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--admin-text-muted)]" />
                <input 
                  type="text" 
                  placeholder="Search by name, email or expertise..." 
                  className="w-full bg-[var(--admin-item-bg)] border border-[var(--admin-border)] rounded-xl py-3 pl-10 pr-4 text-sm text-[var(--admin-text-main)] placeholder-[var(--admin-text-muted)] focus:outline-none focus:border-[var(--admin-accent)]/50 transition-all"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {counselors.map((counselor) => (
                <EntityPreviewCard 
                  key={counselor.id}
                  user={counselor}
                  onView={openProfileDetail}
                  onDelete={handleDelete}
                />
              ))}
              {counselors.length === 0 && (
                <div className="glass-admin p-20 text-center">
                   <Users className="w-12 h-12 text-[var(--admin-text-muted)] opacity-50 mx-auto mb-4" />
                   <p className="text-[var(--admin-text-muted)] font-bold uppercase tracking-widest text-xs">No active nodes in this sector</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Stream Distribution Chart */}
          <div className="glass-admin p-8">
              <h3 className="text-sm font-black text-[var(--admin-text-main)] uppercase tracking-widest mb-6">Expertise Density</h3>
              <StreamDistribution data={stats.streamRevenue} />
          </div>

          {/* Top Performance Chart */}
          <div className="glass-admin p-8">
              <h3 className="text-sm font-black text-[var(--admin-text-main)] uppercase tracking-widest mb-6">Satisfaction Spread</h3>
              <RatingDistribution data={stats.ratingDistribution} />
          </div>

          {/* Performance Leaderboard */}
          <div className="glass-admin p-8">
              <h3 className="text-sm font-black text-[var(--admin-text-main)] uppercase tracking-widest mb-6 flex items-center justify-between">
                Top Performing Entities
                <TrendingUp className="w-4 h-4 text-emerald-500" />
              </h3>
              <div className="space-y-4">
                {stats.topCounselors.map((c: any, i: number) => (
                  <EntityPreviewCard 
                    key={c.id}
                    user={c}
                    variant="compact"
                    rank={i + 1}
                    onView={openProfileDetail}
                  />
                ))}
              </div>
              <Button variant="ghost" className="w-full mt-8 text-[10px] font-black uppercase tracking-widest text-[var(--admin-text-muted)] hover:text-[var(--admin-text-main)] hover:bg-[var(--admin-item-hover)] py-6">
                View Full Leaderboard
              </Button>
          </div>

          <div className="glass-admin p-8 border-l-4 border-[var(--admin-accent)]">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[var(--admin-accent-glow)] flex items-center justify-center shrink-0">
                  <ShieldAlert className="w-5 h-5 text-[var(--admin-accent)]" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-[var(--admin-text-main)] uppercase">System Integrity</h4>
                  <p className="text-xs text-[var(--admin-text-muted)] mt-1 leading-relaxed">
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
