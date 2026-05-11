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
  GraduationCap, Briefcase, Hash, FileText
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
      <DialogContent className="max-w-2xl bg-slate-950 border-slate-800 text-slate-200">
        <DialogHeader>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-emerald-500/20">
              {user.full_name?.[0] || 'U'}
            </div>
            <div>
              <DialogTitle className="text-2xl font-black text-white flex items-center gap-2">
                {user.full_name || 'Anonymous User'}
                {user.is_verified && <ShieldCheck className="w-5 h-5 text-emerald-400" />}
              </DialogTitle>
              <DialogDescription className="text-slate-400">
                Member since {new Date(user.updated_at || '').toLocaleDateString()} • ID: {user.id.slice(0, 8)}...
              </DialogDescription>
            </div>
          </div>
          <div className="flex gap-2">
            <Badge variant={user.role === 'admin' ? 'default' : 'secondary'} className="uppercase tracking-widest text-[10px]">
              {user.role}
            </Badge>
            <Badge variant={user.is_verified ? 'success' : 'warning'} className="uppercase tracking-widest text-[10px]">
              {user.is_verified ? 'Verified' : 'Pending'}
            </Badge>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {/* Profile Section */}
          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
              <User className="w-3 h-3" /> Core Identity
            </h3>
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-xs">Email</span>
                <span className="text-sm font-medium flex items-center gap-2">
                  {user.email} <Mail className="w-3 h-3 text-slate-500" />
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-xs">School/Org</span>
                <span className="text-sm font-medium flex items-center gap-2">
                  {user.school || 'Not set'} <School className="w-3 h-3 text-slate-500" />
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-xs">Academic Level</span>
                <span className="text-sm font-medium flex items-center gap-2">
                  {user.class || 'N/A'} <GraduationCap className="w-3 h-3 text-slate-500" />
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-xs">Stream</span>
                <span className="text-sm font-medium flex items-center gap-2">
                  {user.stream || 'General'} <BookOpen className="w-3 h-3 text-slate-500" />
                </span>
              </div>
            </div>

            <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
              <Star className="w-3 h-3" /> Performance & Stats
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-3">
                <p className="text-[10px] text-slate-500 uppercase font-black">Sessions</p>
                <p className="text-xl font-black text-white">{user.sessions_count || 0}</p>
              </div>
              <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-3">
                <p className="text-[10px] text-slate-500 uppercase font-black">Rating</p>
                <p className="text-xl font-black text-emerald-400">{user.rating?.toFixed(1) || '5.0'}</p>
              </div>
            </div>
          </div>

          {/* Context & Professional Section */}
          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
              <Hash className="w-3 h-3" /> Bio & Interests
            </h3>
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
              <p className="text-sm text-slate-300 leading-relaxed italic">
                "{user.bio || 'This user hasn\'t added a bio yet.'}"
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {user.interests?.map((interest, i) => (
                  <span key={i} className="text-[10px] bg-slate-800 px-2 py-1 rounded-md text-slate-400 border border-slate-700">
                    #{interest}
                  </span>
                )) || <span className="text-xs text-slate-500">No interests tagged</span>}
              </div>
            </div>

            {isCounselor && (
              <>
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                  <Briefcase className="w-3 h-3" /> Financial Configuration
                </h3>
                <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-emerald-500/70 text-xs font-bold">Base Rate</span>
                    <span className="text-xl font-black text-emerald-400">₹{user.price_per_hour || 0}/hr</span>
                  </div>
                </div>
              </>
            )}

            <div className="pt-2 space-y-4">
              <Button variant="outline" className="w-full border-slate-800 hover:bg-slate-900 text-xs" asChild>
                <a href={user.linkedin || '#'} target="_blank" rel="noopener noreferrer">
                  View LinkedIn Profile <ExternalLink className="w-3 h-3 ml-2" />
                </a>
              </Button>

              <div className="space-y-2">
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                  <FileText className="w-3 h-3" /> Internal Admin Notes
                </h3>
                <textarea 
                  className="w-full h-24 bg-slate-900/50 border border-slate-800 rounded-xl p-3 text-xs text-slate-300 focus:outline-none focus:border-emerald-500/50 transition-all resize-none"
                  placeholder="Enter private notes about this user..."
                  defaultValue={""}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-900 pt-6">
          <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 flex items-center gap-2 mb-4">
            <Calendar className="w-3 h-3" /> Recent Activity Timeline
          </h3>
          <div className="space-y-3">
             <div className="flex gap-4 p-3 rounded-lg bg-white/5 border border-white/5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                <div className="flex-1">
                   <p className="text-xs font-bold text-white uppercase">Profile Verified</p>
                   <p className="text-[10px] text-slate-500">{new Date().toLocaleDateString()} • System Automator</p>
                </div>
             </div>
             <div className="flex gap-4 p-3 rounded-lg bg-white/5 border border-white/5">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                <div className="flex-1">
                   <p className="text-xs font-bold text-white uppercase">Session Completed</p>
                   <p className="text-[10px] text-slate-500">2 days ago • Career Guidance with R. Sharma</p>
                </div>
             </div>
          </div>
        </div>

        <DialogFooter className="mt-8 pt-6 border-t border-slate-900">
          <div className="w-full flex items-center justify-between">
            <div className="flex gap-2">
              <Button 
                variant="destructive" 
                size="sm" 
                onClick={() => onDelete(user.id)}
                className="bg-red-500/10 text-red-500 border-red-500/20 hover:bg-red-500 hover:text-white transition-all"
              >
                <Trash2 className="w-4 h-4 mr-2" /> Delete Account
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-slate-800 hover:bg-slate-900"
                onClick={() => onUpdateRole(user.id, user.role === 'admin' ? 'counselor' : 'admin')}
              >
                {user.role === 'admin' ? 'Revoke Admin' : 'Make Admin'}
              </Button>
            </div>
            <Button 
              className={user.is_verified ? "bg-amber-500 hover:bg-amber-600" : "bg-emerald-500 hover:bg-emerald-600"}
              size="sm"
              onClick={() => onVerify(user.id, !user.is_verified)}
            >
              {user.is_verified ? (
                <><ShieldAlert className="w-4 h-4 mr-2" /> Revoke Verify</>
              ) : (
                <><ShieldCheck className="w-4 h-4 mr-2" /> Verify Account</>
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
