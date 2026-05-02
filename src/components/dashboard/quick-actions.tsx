'use client';

import { motion } from 'framer-motion';
import { Target, User, MessageSquare, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

const ACTIONS = [
  {
    title: 'Take Assessment',
    description: 'Find your ideal career path',
    icon: Target,
    href: '/student/assessments',
    color: 'bg-udanix-orange',
  },
  {
    title: 'Update Profile',
    description: 'Keep your information current',
    icon: User,
    href: '/student/profile',
    color: 'bg-udanix-blue',
  },
  {
    title: 'AI Assistant',
    description: 'Get instant career advice',
    icon: MessageSquare,
    href: '/student/chat',
    color: 'bg-[#0274c1]',
  },
];

export function QuickActions() {
  return (
    <div className="space-y-6">
      <h3 className="text-sm font-black text-slate-900 uppercase tracking-[0.2em] px-1">
        Quick Actions
      </h3>
      <div className="space-y-4">
        {ACTIONS.map((action, i) => (
          <motion.div
            key={action.title}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Link href={action.href} className="group block">
              <div className="bg-white p-5 rounded-[2rem] border border-slate-200 hover:border-udanix-blue/30 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 relative overflow-hidden">
                <div className="flex items-center gap-4 relative z-10">
                  <div className={`w-12 h-12 rounded-2xl ${action.color} flex items-center justify-center text-white shadow-lg shadow-black/5 group-hover:scale-110 transition-transform`}>
                    <action.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight group-hover:text-udanix-blue transition-colors">
                      {action.title}
                    </h4>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest truncate">
                      {action.description}
                    </p>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-slate-300 group-hover:text-udanix-blue group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </div>
                
                {/* Subtle Hover Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
      
      {/* Premium CTA Card */}
      <div className="relative mt-8 group cursor-pointer">
        <div className="absolute -inset-1 bg-gradient-to-r from-udanix-blue to-udanix-orange rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-500" />
        <div className="relative bg-slate-950 rounded-[2.5rem] p-8 overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-udanix-blue/20 rounded-full blur-2xl -mr-16 -mt-16" />
          <div className="relative z-10 space-y-4">
            <h4 className="text-white text-lg font-black uppercase tracking-tighter leading-none">
              Need Help?
            </h4>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest leading-relaxed">
              Connect with a certified expert for a 1:1 session.
            </p>
            <button className="w-full py-3 rounded-xl bg-white text-slate-950 text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all">
              Book Call
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
