'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, Clock, Search, Eye, CheckCircle2, 
  XCircle, AlertCircle, Filter, FileDown, TrendingUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAdminData } from '@/hooks/useAdminData';
import { SessionDetailModal } from '@/components/admin/SessionDetailModal';
import { SessionsChart, FinancialsChart } from '@/components/admin/AdminCharts';

const SESSION_STATUS_STYLES: Record<string, string> = {
  confirmed: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
  pending: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
  completed: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  cancelled: 'bg-rose-500/10 text-rose-600 border-rose-500/20',
};

export default function SessionsAdminPage() {
  const { 
    sessions, loading, isAdmin, actionLoading, stats,
    handleSessionUpdate
  } = useAdminData();
  
  const [search, setSearch] = useState('');
  const [selectedSession, setSelectedSession] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredSessions = sessions.filter(s => 
    s.student?.full_name?.toLowerCase().includes(search.toLowerCase()) ||
    s.counselor?.full_name?.toLowerCase().includes(search.toLowerCase())
  );

  const openSessionDetail = (session: any) => {
    setSelectedSession(session);
    setIsModalOpen(true);
  };


  if (loading) return null;
  if (!isAdmin) return null;

  return (
    <div className="space-y-10">
      <SessionDetailModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        session={selectedSession}
        onUpdateStatus={handleSessionUpdate}
      />

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <h1 className="text-4xl font-black text-[var(--admin-text-main)] tracking-tighter uppercase mb-2">
            Session <span className="text-[var(--admin-accent)]">Pipeline</span>
          </h1>
          <p className="text-[var(--admin-text-muted)] font-medium">Monitoring {stats.totalSessions} transactional sessions.</p>
        </div>
        <div className="flex gap-4">
           <Button variant="outline" className="glass-admin border-[var(--admin-border)] text-[var(--admin-text-main)] hover:bg-[var(--admin-item-hover)] gap-2">
             <FileDown className="w-4 h-4" />
             Download Logs
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
             {[
               { label: 'Confirmed', value: sessions.filter(s => s.status === 'confirmed').length, color: 'text-emerald-500' },
               { label: 'Pending', value: sessions.filter(s => s.status === 'pending').length, color: 'text-amber-500' },
               { label: 'Completed', value: sessions.filter(s => s.status === 'completed').length, color: 'text-blue-500' },
               { label: 'Cancelled', value: sessions.filter(s => s.status === 'cancelled').length, color: 'text-rose-500' },
             ].map((s) => (
               <div key={s.label} className="glass-admin p-4 text-center">
                  <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
                  <p className="text-[10px] font-black text-[var(--admin-text-muted)] uppercase tracking-widest">{s.label}</p>
               </div>
             ))}
          </div>

          {/* List Section */}
          <div className="glass-admin overflow-hidden">
            <div className="p-6 border-b border-[var(--admin-border)] flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--admin-text-muted)]" />
                <input 
                  type="text" 
                  placeholder="Search by participant name..." 
                  className="w-full bg-[var(--admin-item-bg)] border border-[var(--admin-border)] rounded-xl py-3 pl-10 pr-4 text-sm text-[var(--admin-text-main)] placeholder-[var(--admin-text-muted)] focus:outline-none focus:border-[var(--admin-accent)]/50 transition-all"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-[var(--admin-item-bg)]">
                  <tr>
                    <th className="px-6 py-4 text-[10px] font-black text-[var(--admin-text-muted)] uppercase tracking-widest">Participants</th>
                    <th className="px-6 py-4 text-[10px] font-black text-[var(--admin-text-muted)] uppercase tracking-widest">Schedule</th>
                    <th className="px-6 py-4 text-[10px] font-black text-[var(--admin-text-muted)] uppercase tracking-widest">Status</th>
                    <th className="px-6 py-4 text-right text-[10px] font-black text-[var(--admin-text-muted)] uppercase tracking-widest">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--admin-border)]">
                  {filteredSessions.map((session) => (
                    <tr key={session.id} className="hover:bg-[var(--admin-item-hover)] transition-colors group">
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                             <div className="w-4 h-4 rounded bg-blue-500/25 text-[8px] flex items-center justify-center text-blue-600 font-bold">S</div>
                             <p className="text-xs font-bold text-[var(--admin-text-main)]">{session.student?.full_name}</p>
                          </div>
                          <div className="flex items-center gap-2">
                             <div className="w-4 h-4 rounded bg-emerald-500/25 text-[8px] flex items-center justify-center text-emerald-600 font-bold">C</div>
                             <p className="text-xs font-bold text-[var(--admin-text-muted)]">{session.counselor?.full_name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-xs font-bold text-[var(--admin-text-main)]">
                          {session.scheduled_at ? new Date(session.scheduled_at).toLocaleDateString() : 'N/A'}
                        </div>
                        <div className="text-[10px] text-[var(--admin-text-muted)] uppercase">
                          {session.scheduled_at ? new Date(session.scheduled_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-lg border text-[10px] font-black uppercase tracking-widest ${SESSION_STATUS_STYLES[session.status] || ''}`}>
                          {session.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-9 w-9 p-0 rounded-xl hover:bg-[var(--admin-item-hover)] text-[var(--admin-text-muted)] hover:text-[var(--admin-text-main)]"
                          onClick={() => openSessionDetail(session)}
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
              <h3 className="text-sm font-black text-[var(--admin-text-main)] uppercase tracking-widest mb-6">Traffic Volume</h3>
              <SessionsChart data={stats.sessionChartData} />
           </div>

           <div className="glass-admin p-8 bg-gradient-to-br from-[var(--admin-accent-glow)] to-transparent border-[var(--admin-border)]">
              <div className="flex items-center gap-4 mb-4">
                 <div className="w-10 h-10 rounded-xl bg-[var(--admin-accent-glow)] flex items-center justify-center text-[var(--admin-accent)]">
                    <TrendingUp className="w-6 h-6" />
                 </div>
                 <div>
                    <h4 className="text-sm font-black text-[var(--admin-text-main)] uppercase leading-none">Market Efficiency</h4>
                    <p className="text-[10px] text-[var(--admin-text-muted)] mt-1">
                      {stats.totalSessions > 0 ? Math.round((stats.completedSessions / stats.totalSessions) * 100) : 0}% Completion Rate
                    </p>
                 </div>
              </div>
              <p className="text-xs text-[var(--admin-text-muted)] leading-relaxed">
                Total system revenue from completed sessions has reached ₹{(stats.totalGMV / 1000).toFixed(1)}k this timeframe.
              </p>
           </div>

           <div className="glass-admin p-8 border-[var(--admin-border)]">
              <h4 className="text-sm font-black text-[var(--admin-text-main)] uppercase mb-6 flex items-center gap-2">
                 <AlertCircle className="w-4 h-4 text-rose-500" />
                 Action Required
              </h4>
              <div className="space-y-4">
                 {sessions.filter(s => s.status === 'pending').slice(0, 3).map(s => (
                   <div key={s.id} className="p-4 rounded-xl bg-rose-500/5 border border-rose-500/10">
                      <p className="text-[10px] font-black text-rose-500 uppercase mb-1">Overdue Confirmation</p>
                      <p className="text-xs font-bold text-[var(--admin-text-main)]">{s.student?.full_name} with {s.counselor?.full_name}</p>
                      <div className="mt-3 flex gap-2">
                         <Button className="h-7 px-3 text-[8px] bg-emerald-600 hover:bg-emerald-500 font-black uppercase text-white">Confirm</Button>
                         <Button variant="ghost" className="h-7 px-3 text-[8px] text-[var(--admin-text-muted)] font-black uppercase hover:bg-[var(--admin-item-hover)] hover:text-[var(--admin-text-main)]">Details</Button>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
