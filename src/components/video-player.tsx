'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Video, VideoOff, PhoneOff, Settings, Maximize2 } from "lucide-react";

export function VideoPlayer() {
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);

  return (
    <div className="relative h-full bg-slate-900 rounded-3xl overflow-hidden group border border-slate-800">
      {/* Remote Video (Mock) */}
      <div className="absolute inset-0 flex items-center justify-center bg-slate-950">
        <div className="text-center space-y-4">
          <div className="w-24 h-24 rounded-full bg-blue-600/20 flex items-center justify-center mx-auto border border-blue-500/30 animate-pulse">
            <span className="text-3xl font-light text-blue-400">DJ</span>
          </div>
          <p className="text-blue-200/50 text-sm font-light tracking-widest uppercase">Dr.Sarah Jenkins is speaking...</p>
        </div>
      </div>

      {/* Local Video (Mock Overlay) */}
      <div className="absolute top-6 right-6 w-48 h-32 bg-slate-800 rounded-2xl border border-slate-700 shadow-2xl overflow-hidden z-10">
        <div className="absolute inset-0 flex items-center justify-center">
          {isCameraOff ? (
            <VideoOff className="w-8 h-8 text-slate-600" />
          ) : (
            <div className="w-full h-full bg-slate-700" />
          )}
        </div>
        <div className="absolute bottom-2 left-2 bg-black/40 backdrop-blur-md px-2 py-0.5 rounded text-[10px] text-white/80">You</div>
      </div>

      {/* Controls Overlay */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-slate-900/40 backdrop-blur-xl px-6 py-4 rounded-3xl border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
        <Button 
          variant="ghost" 
          size="icon" 
          className={`h-12 w-12 rounded-2xl transition-colors ${isMuted ? 'bg-red-500/20 text-red-500 hover:bg-red-500/30' : 'bg-white/10 text-white hover:bg-white/20'}`}
          onClick={() => setIsMuted(!isMuted)}
        >
          {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className={`h-12 w-12 rounded-2xl transition-colors ${isCameraOff ? 'bg-red-500/20 text-red-500 hover:bg-red-500/30' : 'bg-white/10 text-white hover:bg-white/20'}`}
          onClick={() => setIsCameraOff(!isCameraOff)}
        >
          {isCameraOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
        </Button>
        <div className="h-8 w-[1px] bg-white/10 mx-2" />
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-12 w-12 rounded-2xl bg-white/10 text-white hover:bg-white/20"
        >
          <Settings className="w-5 h-5" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-12 w-12 rounded-2xl bg-white/10 text-white hover:bg-white/20"
        >
          <Maximize2 className="w-5 h-5" />
        </Button>
        <Button 
          variant="destructive" 
          size="icon" 
          className="h-12 w-12 rounded-2xl bg-red-600 hover:bg-red-700 shadow-lg shadow-red-900/40"
        >
          <PhoneOff className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
