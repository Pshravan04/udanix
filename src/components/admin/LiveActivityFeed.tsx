'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, 
  UserPlus, 
  Calendar, 
  CreditCard, 
  ShieldCheck,
  Globe,
  Bell
} from 'lucide-react';

const EVENT_TYPES = [
  { icon: UserPlus, color: 'text-blue-500', bg: 'bg-blue-500/10', label: 'New Registration', template: 'User {id} joined the matrix from {region}' },
  { icon: Calendar, color: 'text-purple-500', bg: 'bg-purple-500/10', label: 'Session Booked', template: 'Session confirmed: {id} for {stream}' },
  { icon: CreditCard, color: 'text-emerald-500', bg: 'bg-emerald-500/10', label: 'Transaction', template: 'Payment of ₹{amount} verified via Node-{node}' },
  { icon: ShieldCheck, color: 'text-amber-500', bg: 'bg-amber-500/10', label: 'Security Alert', template: 'Counselor {id} completed Tier-3 verification' },
  { icon: Globe, color: 'text-pink-500', bg: 'bg-pink-500/10', label: 'Global Traffic', template: 'Active surge detected in {region} cluster' }
];

const REGIONS = ['Maharashtra', 'Delhi', 'Karnataka', 'Telangana', 'Tamil Nadu', 'West Bengal'];
const STREAMS = ['Engineering', 'Medical', 'UPSC', 'Study Abroad', 'Psychology'];

export function LiveActivityFeed() {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    // Initial events
    const initialEvents = Array.from({ length: 6 }).map((_, i) => generateEvent(i));
    setEvents(initialEvents);

    const interval = setInterval(() => {
      setEvents(prev => [generateEvent(Date.now()), ...prev.slice(0, 5)]);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  function generateEvent(id: number) {
    const type = EVENT_TYPES[Math.floor(Math.random() * EVENT_TYPES.length)];
    let description = type.template
      .replace('{id}', Math.random().toString(36).substring(7).toUpperCase())
      .replace('{region}', REGIONS[Math.floor(Math.random() * REGIONS.length)])
      .replace('{stream}', STREAMS[Math.floor(Math.random() * STREAMS.length)])
      .replace('{amount}', (Math.floor(Math.random() * 50) * 100 + 499).toString())
      .replace('{node}', Math.floor(Math.random() * 99).toString());

    return {
      id,
      ...type,
      description,
      time: 'Just now'
    };
  }

  return (
    <div className="glass-admin rounded-[2.5rem] p-8 flex flex-col h-full">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-500 border border-blue-500/20 shadow-inner">
            <Zap className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="text-sm font-black text-[var(--admin-text-main)] uppercase tracking-wider">Live Signal</h3>
            <p className="text-[9px] font-black text-[var(--admin-text-muted)] uppercase tracking-[0.2em]">Real-time Event Streaming</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Active</span>
        </div>
      </div>

      <div className="flex-1 space-y-4 overflow-hidden relative">
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[var(--admin-bg)] to-transparent z-10 pointer-events-none" />
        
        <AnimatePresence mode="popLayout">
          {events.map((event) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              layout
              className="p-5 bg-[var(--admin-item-bg)] border border-[var(--admin-border-subtle)] rounded-3xl group hover:bg-[var(--admin-item-hover)] transition-all relative overflow-hidden"
            >
              <div className="flex gap-4 relative z-10">
                <div className={`w-12 h-12 rounded-2xl ${event.bg} ${event.color} flex items-center justify-center shrink-0 shadow-inner`}>
                   <event.icon className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className={`text-[10px] font-black uppercase tracking-widest ${event.color}`}>{event.label}</p>
                    <span className="text-[9px] font-bold text-[var(--admin-text-muted)] uppercase tracking-widest">{event.time}</span>
                  </div>
                  <p className="text-xs font-medium text-[var(--admin-text-main)] leading-relaxed truncate">{event.description}</p>
                </div>
              </div>
              <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                 <Bell className="w-3 h-3 text-[var(--admin-text-muted)]" />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <button className="mt-8 w-full py-4 bg-[var(--admin-item-bg)] hover:bg-[var(--admin-item-hover)] border border-[var(--admin-border-subtle)] rounded-[1.25rem] text-[10px] font-black text-[var(--admin-text-muted)] hover:text-[var(--admin-text-main)] uppercase tracking-[0.3em] transition-all">
        Inspect Event Log
      </button>
    </div>
  );
}
