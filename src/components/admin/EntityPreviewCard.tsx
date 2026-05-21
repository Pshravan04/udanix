'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  ShieldAlert, 
  Star, 
  Calendar, 
  BookOpen, 
  ArrowRight,
  Eye,
  Trash2,
  Mail,
  School
} from 'lucide-react';
import { Profile } from '@/types';

interface EntityPreviewCardProps {
  user: Profile;
  variant?: 'compact' | 'full';
  onView?: (user: Profile) => void;
  onDelete?: (id: string) => void;
  rank?: number;
}

export function EntityPreviewCard({ user, variant = 'full', onView, onDelete, rank }: EntityPreviewCardProps) {
  const isCounselor = user.role === 'counselor';

  if (variant === 'compact') {
    return (
      <motion.div 
        whileHover={{ x: 5, backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
        className="flex items-center gap-4 p-4 bg-white/[0.02] border border-white/5 rounded-3xl transition-all cursor-pointer group relative overflow-hidden"
        onClick={() => onView?.(user)}
      >
        <div className={`absolute inset-y-0 left-0 w-1 transition-transform duration-300 ${isCounselor ? 'bg-amber-500' : 'bg-blue-500'} -translate-x-full group-hover:translate-x-0`} />
        
        <div className="relative shrink-0">
          <div className="w-12 h-12 rounded-2xl overflow-hidden border border-white/10 shadow-lg bg-gradient-to-br from-white/5 to-transparent flex items-center justify-center text-white font-black">
             {user.avatar_url ? (
               <img src={user.avatar_url} className="w-full h-full object-cover" alt={user.full_name} />
             ) : (
               user.full_name?.[0] || 'U'
             )}
          </div>
          {rank !== undefined && (
            <div className="absolute -top-2 -left-2 w-5 h-5 rounded-lg bg-blue-600 border border-white/10 flex items-center justify-center text-[10px] font-black text-white shadow-xl">
              {rank}
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-white truncate">{user.full_name || 'Anonymous'}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest truncate">
              {user.stream || 'Professional'}
            </span>
            <div className="w-1 h-1 rounded-full bg-slate-700 shrink-0" />
            <span className="text-[9px] text-emerald-400 font-bold flex items-center gap-0.5 shrink-0">
              ★ {user.rating?.toFixed(1) || '5.0'}
            </span>
          </div>
        </div>

        <div className="text-right shrink-0">
          <p className="text-xs font-black text-[var(--admin-accent)] tabular-nums">
            {user.sessions_count || 0} SESSIONS
          </p>
          <div className="flex items-center justify-end gap-1 mt-1">
             {user.is_verified ? (
               <ShieldCheck className="w-3 h-3 text-emerald-500/50" />
             ) : (
               <ShieldAlert className="w-3 h-3 text-amber-500/50" />
             )}
             <p className="text-[8px] text-slate-600 font-black uppercase tracking-widest">
               {user.is_verified ? 'Verified' : 'Pending'}
             </p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 bg-white/[0.02] border border-white/10 rounded-[2rem] group hover:bg-white/[0.04] transition-all relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/[0.03] to-transparent rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-700" />
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 relative z-10">
        <div className="relative shrink-0">
          <div className={`w-16 h-16 rounded-[1.25rem] border border-white/10 flex items-center justify-center text-2xl font-black text-white shadow-2xl overflow-hidden ${
            user.is_verified ? 'bg-emerald-500/10' : 'bg-slate-500/10'
          }`}>
             {user.avatar_url ? (
               <img src={user.avatar_url} className="w-full h-full object-cover" alt={user.full_name} />
             ) : (
               user.full_name?.[0] || 'U'
             )}
          </div>
          <div className={`absolute -bottom-1 -right-1 p-1.5 rounded-lg border shadow-lg ${
            user.is_verified ? 'bg-[#0A0B10] border-emerald-500/30 text-emerald-500' : 'bg-[#0A0B10] border-amber-500/30 text-amber-500'
          }`}>
            {user.is_verified ? <ShieldCheck className="w-3 h-3" /> : <ShieldAlert className="w-3 h-3" />}
          </div>
        </div>

        <div className="flex-1 min-w-0 w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h4 className="text-lg font-black text-white tracking-tight truncate">
                {user.full_name || 'Anonymous User'}
              </h4>
              <div className="flex flex-wrap items-center gap-3 mt-1.5">
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500">
                  <Mail className="w-3 h-3" />
                  {user.email}
                </div>
                <span className="w-1 h-1 rounded-full bg-slate-800 hidden sm:block" />
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-[var(--admin-accent)]">
                  <BookOpen className="w-3 h-3" />
                  {user.stream || 'General Stream'}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-xs font-black text-white tabular-nums">★ {user.rating?.toFixed(1) || '5.0'}</p>
                <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Platform Rating</p>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div className="text-right">
                <p className="text-xs font-black text-white tabular-nums">{user.sessions_count || 0}</p>
                <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Sessions</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
             <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-3">
                <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest mb-1">Status</p>
                <p className={`text-[10px] font-bold ${user.is_verified ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {user.is_verified ? 'Verified' : 'Pending'}
                </p>
             </div>
             <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-3">
                <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest mb-1">Joined</p>
                <p className="text-[10px] font-bold text-slate-400">
                  {user.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                </p>
             </div>
             {user.school && (
               <div className="col-span-2 bg-white/[0.02] border border-white/5 rounded-2xl p-3 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                    <School className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest">Institution</p>
                    <p className="text-[10px] font-bold text-slate-400 truncate">{user.school}</p>
                  </div>
               </div>
             )}
          </div>
        </div>

        <div className="flex sm:flex-col gap-2 w-full sm:w-auto shrink-0 mt-4 sm:mt-0">
          <button 
            onClick={() => onView?.(user)}
            className="flex-1 sm:flex-none h-12 w-full sm:w-12 rounded-2xl bg-[var(--admin-accent)] text-white flex items-center justify-center hover:scale-105 transition-all shadow-xl shadow-[var(--admin-accent)]/10"
          >
            <Eye className="w-5 h-5" />
          </button>
          <button 
            onClick={() => onDelete?.(user.id)}
            className="flex-1 sm:flex-none h-12 w-full sm:w-12 rounded-2xl bg-white/[0.03] border border-white/10 text-slate-500 hover:text-red-500 hover:bg-red-500/10 transition-all flex items-center justify-center"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
