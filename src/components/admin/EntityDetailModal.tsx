'use client';

import React from 'react';
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Profile } from '@/types';
import { 
  User, Mail, School, BookOpen, Star, Calendar, 
  ShieldCheck, ShieldAlert, Trash2, ExternalLink,
  GraduationCap, Briefcase, Hash, FileText, DollarSign
} from 'lucide-react';

interface EntityDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: Profile | null;
  onVerify: (id: string, status: boolean) => void;
  onDelete: (id: string) => void;
  onUpdateRole: (id: string, role: string) => void;
}

export function EntityDetailModal({ 
  isOpen, onClose, user, onVerify, onDelete, onUpdateRole 
}: EntityDetailModalProps) {
  if (!user) return null;

  const isCounselor = user.role === 'counselor';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-[#0A0B10] border-white/10 text-slate-200 p-0 overflow-hidden flex flex-col max-h-[90vh] md:max-h-[85vh] rounded-[2rem]">
        <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar flex-1 space-y-8">
          <DialogHeader className="text-left relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-[50px] -z-10 rounded-full" />
            <div className="flex flex-col md:flex-row md:items-center gap-8 mb-8">
              <div className="relative shrink-0">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-[2.5rem] bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white text-4xl font-black shadow-2xl shadow-blue-500/20 relative group">
                  <div className="absolute inset-0 bg-white/20 rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity" />
                  {user.full_name?.[0] || 'U'}
                </div>
                {user.is_verified && (
                  <div className="absolute -bottom-2 -right-2 p-3 rounded-2xl bg-[#0A0B10] border border-emerald-500/30 shadow-xl shadow-emerald-500/10">
                    <ShieldCheck className="w-6 h-6 text-emerald-400" />
                  </div>
                )}
              </div>
              
              <div className="space-y-3 flex-1">
                <div>
                  <DialogTitle className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-none mb-2">
                    {user.full_name || 'Anonymous User'}
                  </DialogTitle>
                  <DialogDescription className="text-slate-500 font-bold uppercase tracking-[0.2em] text-[10px] flex flex-wrap items-center gap-x-4 gap-y-2">
                    <span className="flex items-center gap-2 text-blue-400"><Calendar className="w-3 h-3" /> Joined {new Date(user.updated_at || '').toLocaleDateString()}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-800" />
                    <span>ID: {user.id.slice(0, 12)}</span>
                  </DialogDescription>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  <Badge variant="outline" className="uppercase tracking-[0.2em] text-[9px] font-black bg-white/5 border-white/10 px-4 py-1.5 rounded-xl text-slate-300">
                    {user.role}
                  </Badge>
                  <Badge className={`uppercase tracking-[0.2em] text-[9px] font-black px-4 py-1.5 rounded-xl ${user.is_verified ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'}`}>
                    {user.is_verified ? 'Verified Entity' : 'Pending Authorization'}
                  </Badge>
                </div>
              </div>
            </div>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Profile Section */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 flex items-center gap-3">
                  <div className="w-1.5 h-4 bg-blue-500 rounded-full" />
                  Core Identity
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: 'Email', value: user.email, icon: Mail, color: 'text-blue-400' },
                    { label: 'School/Org', value: user.school || 'Not set', icon: School, color: 'text-indigo-400' },
                    { label: 'Academic Level', value: user.class || 'N/A', icon: GraduationCap, color: 'text-purple-400' },
                    { label: 'Stream', value: user.stream || 'General', icon: BookOpen, color: 'text-emerald-400' },
                  ].map((field) => (
                    <div key={field.label} className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 space-y-2 group hover:bg-white/[0.05] transition-all">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">{field.label}</span>
                        <field.icon className={`w-3.5 h-3.5 ${field.color} opacity-50 group-hover:opacity-100 transition-opacity`} />
                      </div>
                      <p className="text-sm font-bold text-white truncate break-all">
                        {field.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 flex items-center gap-3">
                  <div className="w-1.5 h-4 bg-amber-500 rounded-full" />
                  Platform Stats
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-5 group hover:bg-white/[0.05] transition-all">
                    <p className="text-[9px] text-slate-600 uppercase font-black tracking-widest mb-1">Sessions</p>
                    <p className="text-3xl font-black text-white">{user.sessions_count || 0}</p>
                  </div>
                  <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-5 group hover:bg-white/[0.05] transition-all">
                    <p className="text-[9px] text-slate-600 uppercase font-black tracking-widest mb-1">Avg Rating</p>
                    <p className="text-3xl font-black text-emerald-400">{user.rating?.toFixed(1) || '5.0'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Context & Professional Section */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 flex items-center gap-3">
                  <div className="w-1.5 h-4 bg-purple-500 rounded-full" />
                  Bio & Context
                </h3>
                <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-6 relative overflow-hidden group hover:bg-white/[0.04] transition-all">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 blur-3xl rounded-full" />
                  <p className="text-sm text-slate-300 leading-relaxed font-medium italic relative z-10">
                    "{user.bio || 'This entity has not defined a core narrative yet.'}"
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2 relative z-10">
                    {user.interests?.map((interest, i) => (
                      <span key={i} className="text-[9px] font-black bg-blue-500/5 px-3 py-1.5 rounded-xl text-blue-400/70 border border-blue-500/10 hover:border-blue-500/30 hover:text-blue-400 transition-all cursor-default">
                        #{interest.toUpperCase()}
                      </span>
                    )) || <span className="text-[9px] font-black text-slate-700 uppercase tracking-widest">No interest mapping</span>}
                  </div>
                </div>
              </div>

              {isCounselor && (
                <div className="space-y-4">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 flex items-center gap-3">
                    <div className="w-1.5 h-4 bg-emerald-500 rounded-full" />
                    Revenue Node
                  </h3>
                  <div className="bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/20 rounded-[2rem] p-6 flex items-center justify-between group hover:from-emerald-500/15 transition-all shadow-xl shadow-emerald-500/5">
                    <div>
                      <p className="text-[9px] font-black text-emerald-500/70 uppercase tracking-widest">Hourly Rate</p>
                      <p className="text-4xl font-black text-emerald-400 mt-1">₹{user.price_per_hour || 0}</p>
                    </div>
                    <div className="p-5 rounded-[1.5rem] bg-emerald-500/10 text-emerald-500 shadow-inner">
                      <DollarSign className="w-8 h-8" />
                    </div>
                  </div>
                </div>
              )}

              <div className="pt-2 space-y-6">
                <Button variant="outline" className="w-full h-14 border-white/10 bg-white/[0.02] hover:bg-white/[0.05] text-xs font-black uppercase tracking-[0.2em] rounded-2xl group" asChild>
                  <a href={user.linkedin || '#'} target="_blank" rel="noopener noreferrer">
                    Connect via LinkedIn <ExternalLink className="w-4 h-4 ml-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </a>
                </Button>

                <div className="space-y-4">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 flex items-center gap-3">
                    <div className="w-1.5 h-4 bg-slate-700 rounded-full" />
                    Neural Metadata
                  </h3>
                  <textarea 
                    className="w-full h-32 bg-white/[0.02] border border-white/10 rounded-[2rem] p-6 text-xs text-slate-300 focus:outline-none focus:border-blue-500/50 transition-all resize-none shadow-inner font-medium placeholder:text-slate-800"
                    placeholder="Enter private administrative notes..."
                    defaultValue={""}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 flex items-center gap-3">
              <div className="w-1.5 h-4 bg-blue-500 rounded-full animate-pulse" />
              Event Timeline
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="flex gap-5 p-5 rounded-[1.5rem] bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all group">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 shadow-[0_0_15px_rgba(16,185,129,0.5)] shrink-0" />
                  <div>
                     <p className="text-[11px] font-black text-white uppercase tracking-wider group-hover:text-emerald-400 transition-colors">Profile Verified</p>
                     <p className="text-[10px] font-bold text-slate-600 mt-1">{new Date().toLocaleDateString()} • System Automator</p>
                  </div>
               </div>
               <div className="flex gap-5 p-5 rounded-[1.5rem] bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all group">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 shadow-[0_0_15px_rgba(59,130,246,0.5)] shrink-0" />
                  <div>
                     <p className="text-[11px] font-black text-white uppercase tracking-wider group-hover:text-blue-400 transition-colors">Session Completed</p>
                     <p className="text-[10px] font-bold text-slate-600 mt-1">2 days ago • Career Guidance</p>
                  </div>
               </div>
            </div>
          </div>
        </div>

        <DialogFooter className="p-6 md:p-8 bg-black/40 border-t border-white/5">
          <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex w-full sm:w-auto gap-3">
              <Button 
                variant="destructive" 
                size="sm" 
                onClick={() => onDelete(user.id)}
                className="flex-1 sm:flex-none h-12 px-6 bg-red-500/10 text-red-500 border-red-500/20 hover:bg-red-500 hover:text-white transition-all font-black text-[10px] uppercase tracking-widest rounded-xl"
              >
                <Trash2 className="w-4 h-4 mr-2" /> Purge Entity
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1 sm:flex-none h-12 px-6 border-white/10 bg-white/[0.03] hover:bg-white/[0.08] text-white font-black text-[10px] uppercase tracking-widest rounded-xl"
                onClick={() => onUpdateRole(user.id, user.role === 'admin' ? 'counselor' : 'admin')}
              >
                {user.role === 'admin' ? 'Revoke Access' : 'Elevate Admin'}
              </Button>
            </div>
            <Button 
              className={`w-full sm:w-auto h-12 px-10 font-black text-[10px] uppercase tracking-[0.2em] rounded-xl shadow-2xl transition-all ${user.is_verified ? "bg-amber-500 hover:bg-amber-600 text-black shadow-amber-500/20" : "bg-emerald-500 hover:bg-emerald-600 text-black shadow-emerald-500/20"}`}
              size="sm"
              onClick={() => onVerify(user.id, !user.is_verified)}
            >
              {user.is_verified ? (
                <><ShieldAlert className="w-4 h-4 mr-2" /> Revoke Verification</>
              ) : (
                <><ShieldCheck className="w-4 h-4 mr-2" /> Authorize Identity</>
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>

    </Dialog>
  );
}
