import { VideoPlayer } from '@/components/video-player';
import { ChatBox } from '@/components/chat-box';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Info, Users } from 'lucide-react';
import Link from 'next/link';

export default function SessionPage() {
  return (
    <div className="h-screen bg-slate-50 flex flex-col">
      {/* Top Header */}
      <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-6">
          <Link href="/student">
            <Button variant="ghost" size="icon" className="rounded-xl text-slate-400 hover:text-slate-900">
              <ChevronLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="h-8 w-[1px] bg-slate-100" />
          <div className="flex flex-col">
            <h1 className="text-lg font-semibold text-slate-900 leading-none">Session with Dr. Sarah Jenkins</h1>
            <div className="flex items-center gap-2 mt-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-none">Live Consultation</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex -space-x-2 mr-4">
            <div className="w-8 h-8 rounded-full border-2 border-white bg-blue-100 flex items-center justify-center text-[10px] font-bold text-blue-600">SJ</div>
            <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-600">JD</div>
          </div>
          <Button variant="outline" size="sm" className="rounded-xl border-slate-200 text-slate-700">
            <Info className="w-4 h-4 mr-2" />
            Session Info
          </Button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex gap-6 p-6 min-h-0 overflow-hidden">
        {/* Left: Video Area */}
        <div className="flex-1 h-full lg:flex-[2.5]">
          <VideoPlayer />
        </div>

        {/* Right: Chat Sidebar */}
        <div className="hidden lg:flex lg:flex-1 h-full max-w-md">
          <ChatBox />
        </div>
      </main>

      {/* Bottom Status / Warning Bar (Optional) */}
      <div className="h-12 bg-blue-600 px-8 flex items-center justify-between shrink-0 text-white/90 text-xs font-light">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 opacity-70" />
          This is an encrypted private session between you and the counselor.
        </div>
        <div className="flex items-center gap-4">
          <span className="opacity-70">Duration: 42:15 / 60:00</span>
          <div className="w-24 h-1.5 bg-white/20 rounded-full overflow-hidden">
            <div className="w-[70%] h-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
          </div>
        </div>
      </div>
    </div>
  );
}
