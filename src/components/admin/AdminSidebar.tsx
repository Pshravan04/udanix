'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, Users, GraduationCap, Calendar, 
  Settings, Shield, LogOut, BarChart3, Bell, Search
} from 'lucide-react';
import { motion } from 'framer-motion';

import { useAdminData } from '@/hooks/useAdminData';

const MENU_ITEMS = [
  { icon: LayoutDashboard, label: 'Overview', href: '/admin' },
  { icon: GraduationCap, label: 'Students', href: '/admin/students' },
  { icon: Users, label: 'Counselors', href: '/admin/counselors', badge: 'pendingVerifications' },
  { icon: Calendar, label: 'Sessions', href: '/admin/sessions', badge: 'pendingSessions' },
  { icon: BarChart3, label: 'Analytics', href: '/admin/analytics' },
  { icon: Shield, label: 'Security', href: '/admin/security' },
  { icon: Settings, label: 'Settings', href: '/admin/settings' },
];

interface AdminSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const { stats, sessions } = useAdminData();

  const getBadgeValue = (key?: string) => {
    if (!key) return 0;
    if (key === 'pendingVerifications') return stats.pendingVerifications;
    if (key === 'pendingSessions') return sessions.filter(s => s.status === 'pending').length;
    return 0;
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden"
          onClick={onClose}
        />
      )}

      <aside className={`fixed left-0 top-0 h-screen w-64 bg-[var(--admin-sidebar)] border-r border-[var(--admin-border)] z-[70] flex flex-col transition-transform duration-300 lg:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
      <div className="p-6">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-gradient-to-br from-[var(--admin-accent)] to-[#0EA5E9] rounded-xl flex items-center justify-center shadow-lg admin-accent-glow">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <span className="font-black text-xl text-white tracking-tighter uppercase">UDANIX</span>
        </Link>
      </div>

      <div className="px-4 mb-6">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-[var(--admin-accent)] transition-colors" />
          <input 
            type="text" 
            placeholder="Global Search..." 
            className="w-full bg-black/20 border border-white/5 rounded-xl py-2 pl-10 pr-4 text-xs text-slate-300 focus:outline-none focus:border-[var(--admin-accent)]/50 transition-all"
          />
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar">
        {MENU_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const badgeValue = getBadgeValue(item.badge);

          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={`relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${
                isActive ? 'text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {isActive && (
                <motion.div 
                  layoutId="active-nav"
                  className="absolute inset-0 bg-gradient-to-r from-[var(--admin-accent)]/20 to-transparent border-l-2 border-[var(--admin-accent)] rounded-xl"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <item.icon className={`w-5 h-5 relative z-10 ${isActive ? 'text-[var(--admin-accent)]' : 'group-hover:text-[var(--admin-accent)]'} transition-colors`} />
              <span className="text-sm font-medium relative z-10 flex-1">{item.label}</span>
              
              {badgeValue > 0 && (
                <span className="relative z-10 px-2 py-0.5 rounded-full bg-rose-500 text-[10px] font-black text-white min-w-[20px] text-center">
                  {badgeValue}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/5 bg-black/40 backdrop-blur-xl">
        <div className="relative group p-3 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-all duration-300">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--admin-accent)] to-blue-600 flex items-center justify-center font-bold text-white shadow-lg shadow-[var(--admin-accent)]/20">
                AD
              </div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#0A0B10] shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-white truncate uppercase tracking-wider">System Operator</p>
              <p className="text-[10px] text-slate-500 truncate">admin@udanix.com</p>
            </div>
          </div>
          
          <button className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-500 transition-all duration-300 group/logout border border-red-500/20">
            <LogOut className="w-4 h-4 group-hover/logout:-translate-x-1 transition-transform" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Terminate Session</span>
          </button>
        </div>
      </div>
    </aside>
    </>
  );
}
