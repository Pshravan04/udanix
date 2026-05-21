'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, Search, GraduationCap, ArrowRight, Eye, 
  Trash2, ShieldAlert, TrendingUp, Globe, FileDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAdminData } from '@/hooks/useAdminData';
import { EntityDetailModal } from '@/components/admin/EntityDetailModal';
import { EntityPreviewCard } from '@/components/admin/EntityPreviewCard';
import { GrowthChart, StreamDistribution } from '@/components/admin/AdminCharts';

export default function StudentsAdminPage() {
  const { 
    profiles, loading, isAdmin, actionLoading, stats,
    handleVerify, handleDelete, handleUpdateRole 
  } = useAdminData();
  
  const [search, setSearch] = useState('');
  const [selectedProfile, setSelectedProfile] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const students = profiles.filter(p => p.role === 'student' && (
    p.full_name?.toLowerCase().includes(search.toLowerCase()) ||
    p.email?.toLowerCase().includes(search.toLowerCase())
  ));

  const openProfileDetail = (profile: any) => {
    setSelectedProfile(profile);
    setIsModalOpen(true);
  };


  if (loading) return null; // Handled by layout or main admin loading state
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

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase mb-2 leading-none">
            Student <span className="text-[var(--admin-accent)]">Management</span>
          </h1>
          <p className="text-slate-400 font-medium text-sm md:text-base">Monitoring {stats.students} active student entities.</p>
        </div>
        <div className="flex gap-4">
           <Button variant="outline" className="glass-admin border-white/5 text-white gap-2 flex-1 md:flex-none">
             <FileDown className="w-4 h-4" />
             Export Data
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="glass-admin p-6 flex items-center gap-6">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                <Users className="w-7 h-7 text-blue-500" />
              </div>
              <div>
                <p className="text-3xl font-black text-white">{stats.students}</p>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Total Students</p>
              </div>
            </div>
            <div className="glass-admin p-6 flex items-center gap-6">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                <TrendingUp className="w-7 h-7 text-emerald-500" />
              </div>
              <div>
                <p className="text-3xl font-black text-white">{stats.growthMetrics.students > 0 ? '+' : ''}{stats.growthMetrics.students}%</p>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Weekly Growth</p>
              </div>
            </div>
          </div>

          {/* List Section */}
          <div className="space-y-6">
            <div className="glass-admin p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input 
                  type="text" 
                  placeholder="Search by name or email..." 
                  className="w-full bg-black/20 border border-white/5 rounded-xl py-3 pl-10 pr-4 text-sm text-slate-300 focus:outline-none focus:border-[var(--admin-accent)]/50 transition-all"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {students.map((student) => (
                <EntityPreviewCard 
                  key={student.id}
                  user={student}
                  onView={openProfileDetail}
                  onDelete={handleDelete}
                />
              ))}
              {students.length === 0 && (
                <div className="glass-admin p-20 text-center">
                   <Users className="w-12 h-12 text-slate-700 mx-auto mb-4" />
                   <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">No entities found in this sector</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-8">
           <div className="glass-admin p-8">
              <h3 className="text-sm font-black text-white uppercase tracking-widest mb-6">Growth Distribution</h3>
              <GrowthChart data={stats.studentGrowthData} />
           </div>

           <div className="glass-admin p-8">
              <h3 className="text-sm font-black text-white uppercase tracking-widest mb-6">Stream Allocation</h3>
              <StreamDistribution data={stats.streamData} />
           </div>

           <div className="glass-admin p-8 border-l-4 border-amber-500">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
                  <ShieldAlert className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-white uppercase">System Alert</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Student registrations have increased by 24% in the last 48 hours. Ensure session capacity is optimal.
                  </p>
                </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
