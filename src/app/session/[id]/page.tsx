'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Loader2, ChevronLeft, Info, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { VideoPlayer } from '@/components/video-player';
import { ChatBox } from '@/components/chat-box';
import { Session } from '@/types';

export default function SessionPage() {
  const { id } = useParams();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('sessions')
          .select('*, profiles:counselor_id(full_name, avatar_url)')
          .eq('id', id)
          .single();

        if (error) throw error;
        setSession(data);
      } catch (err) {
        console.error('Session fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchSession();
  }, [id]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-10 h-10 animate-spin text-udanix-blue" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-slate-50 gap-4">
        <h1 className="text-2xl font-black text-slate-900 uppercase">Session Not Found</h1>
        <Link href="/student">
          <Button>Return to Dashboard</Button>
        </Link>
      </div>
    );
  }

  const counselorName = session.profiles?.full_name || 'Counselor';

  return (
    <div className="h-screen bg-[#F8FAFC] flex flex-col selection:bg-udanix-blue/10">
      {/* Top Header */}
      <header className="h-20 bg-white/80 backdrop-blur-xl border-b border-slate-100 px-8 flex items-center justify-between shrink-0 z-50">
        <div className="flex items-center gap-8">
          <Link href="/student/sessions">
            <Button variant="ghost" size="icon" className="rounded-2xl text-slate-400 hover:text-slate-900 border border-transparent hover:border-slate-100 hover:bg-slate-50 transition-all">
              <ChevronLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="h-10 w-px bg-slate-100" />
          <div className="flex flex-col">
            <h1 style={{ fontFamily: 'var(--font-space-grotesk)' }} className="text-xl font-black text-slate-900 leading-none uppercase tracking-tighter">
              Session with <span className="text-udanix-blue">{counselorName}</span>
            </h1>
            <div className="flex items-center gap-2.5 mt-2">
              <div className="relative">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                <div className="absolute inset-0 bg-green-400 rounded-full scale-150 opacity-20 animate-ping" />
              </div>
              <span className="text-[9px] text-slate-400 font-black uppercase tracking-[0.2em] leading-none">
                {session.topic || 'Career Counseling'}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <div className="flex -space-x-3 mr-4">
            <div className="w-10 h-10 rounded-xl border-4 border-white bg-slate-900 flex items-center justify-center text-[10px] font-black text-white shadow-xl uppercase">
              {counselorName.substring(0, 2)}
            </div>
            <div className="w-10 h-10 rounded-xl border-4 border-white bg-udanix-blue flex items-center justify-center text-[10px] font-black text-white shadow-xl">ME</div>
          </div>
          <Button variant="outline" size="sm" className="rounded-xl border-2 border-slate-50 bg-white text-slate-900 font-black text-[10px] uppercase tracking-widest h-11 px-6 hover:bg-slate-900 hover:text-white transition-all shadow-sm">
            <Info className="w-4 h-4 mr-2" />
            Session Info
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex gap-6 p-6 min-h-0 overflow-hidden relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] border border-slate-100/50 rounded-[10rem] pointer-events-none opacity-50" />

        {/* Left: Video */}
        <div className="flex-1 h-full lg:flex-[2.5] relative z-10">
          <div className="h-full rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-2xl shadow-slate-200/50 bg-white">
            <VideoPlayer />
          </div>
        </div>

        {/* Right: Chat — wired to real session */}
        <div className="hidden lg:flex lg:flex-1 h-full max-w-md relative z-10">
          <div className="w-full h-full rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-2xl shadow-slate-200/50 bg-white">
            <ChatBox
              sessionId={session.id}
              peerName={counselorName}
            />
          </div>
        </div>
      </main>

      {/* Bottom Status Bar */}
      <div className="h-14 bg-slate-900 px-10 flex items-center justify-between shrink-0 text-white z-50">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-4 h-4 text-udanix-blue" />
          <span className="text-[10px] font-black uppercase tracking-[0.25em] opacity-80">End-to-End Encrypted</span>
        </div>
        <div className="flex items-center gap-8">
          <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Status: {session.status}</span>
          <div className="w-px h-3 bg-white/20" />
          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">
            {session.topic || 'Career Counseling'}
          </span>
        </div>
      </div>
    </div>
  );
}
