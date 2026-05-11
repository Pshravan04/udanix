'use client';

import React from 'react';
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Session } from '@/types';
import { 
  Calendar, Clock, User, Video, FileText, 
  CheckCircle2, XCircle, AlertCircle, ExternalLink,
  MessageSquare, IndianRupee, MapPin
} from 'lucide-react';

interface SessionDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  session: any | null; // Complex joined session object
  onUpdateStatus: (id: string, status: string) => void;
}

export function SessionDetailModal({ 
  isOpen, onClose, session, onUpdateStatus 
}: SessionDetailModalProps) {
  if (!session) return null;

  const statusColors: any = {
    pending: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    confirmed: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    completed: 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20',
    cancelled: 'bg-red-500/10 text-red-500 border-red-500/20',
  };

  const scheduledDate = new Date(session.scheduled_at);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-slate-950 border-slate-800 text-slate-200">
        <DialogHeader>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center">
                <Video className="w-6 h-6 text-emerald-500" />
              </div>
              <div>
                <DialogTitle className="text-xl font-black text-white">
                  {session.topic || 'Untitled Session'}
                </DialogTitle>
                <DialogDescription className="text-slate-400">
                  ID: {session.id}
                </DialogDescription>
              </div>
            </div>
            <Badge className={`uppercase tracking-widest text-[10px] ${statusColors[session.status]}`}>
              {session.status}
            </Badge>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {/* Time & Logistics */}
          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
              <Clock className="w-3 h-3" /> Logistics
            </h3>
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 space-y-4">
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-slate-500" />
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-black">Date</p>
                  <p className="text-sm font-medium">{scheduledDate.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-slate-500" />
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-black">Time & Duration</p>
                  <p className="text-sm font-medium">
                    {scheduledDate.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })} • {session.duration_minutes || 60} mins
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <IndianRupee className="w-4 h-4 text-slate-500" />
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-black">Estimated Value</p>
                  <p className="text-sm font-medium text-emerald-400">₹{session.counselor?.price_per_hour || 0}</p>
                </div>
              </div>
            </div>

            <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
              <FileText className="w-3 h-3" /> Session Notes
            </h3>
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 min-h-[100px]">
              <p className="text-sm text-slate-400 leading-relaxed italic">
                {session.notes || 'No pre-session notes provided by the student.'}
              </p>
            </div>
          </div>

          {/* Participants */}
          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
              <User className="w-3 h-3" /> Participants
            </h3>
            
            <div className="space-y-3">
              <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-3 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500 font-bold">
                  {session.student?.full_name?.[0] || 'S'}
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-black">Student</p>
                  <p className="text-sm font-bold text-white">{session.student?.full_name || 'Anonymous'}</p>
                  <p className="text-[10px] text-slate-400">{session.student?.email}</p>
                </div>
              </div>

              <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-3 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-500 font-bold">
                  {session.counselor?.full_name?.[0] || 'C'}
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-black">Counselor</p>
                  <p className="text-sm font-bold text-white">{session.counselor?.full_name || 'Anonymous'}</p>
                  <p className="text-[10px] text-slate-400">{session.counselor?.email}</p>
                </div>
              </div>
            </div>

            <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
              <ExternalLink className="w-3 h-3" /> Meeting Access
            </h3>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              {session.meeting_link ? (
                <div className="flex flex-col gap-2">
                  <p className="text-xs text-slate-400 truncate mb-2">{session.meeting_link}</p>
                  <Button className="w-full bg-emerald-500 hover:bg-emerald-600 h-8 text-xs" asChild>
                    <a href={session.meeting_link} target="_blank" rel="noopener noreferrer">
                      Join as Monitor <ExternalLink className="w-3 h-3 ml-2" />
                    </a>
                  </Button>
                </div>
              ) : (
                <p className="text-sm text-slate-500 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" /> Link not generated yet
                </p>
              )}
            </div>
          </div>
        </div>

        <DialogFooter className="mt-8 pt-6 border-t border-slate-900">
          <div className="w-full flex items-center justify-between">
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="border-red-500/20 text-red-500 hover:bg-red-500/10"
                onClick={() => onUpdateStatus(session.id, 'cancelled')}
              >
                <XCircle className="w-4 h-4 mr-2" /> Cancel Session
              </Button>
            </div>
            <div className="flex gap-2">
              {session.status === 'pending' && (
                <Button 
                  className="bg-emerald-500 hover:bg-emerald-600"
                  size="sm"
                  onClick={() => onUpdateStatus(session.id, 'confirmed')}
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" /> Confirm Session
                </Button>
              )}
              {session.status === 'confirmed' && (
                <Button 
                  className="bg-cyan-500 hover:bg-cyan-600"
                  size="sm"
                  onClick={() => onUpdateStatus(session.id, 'completed')}
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" /> Mark Completed
                </Button>
              )}
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
