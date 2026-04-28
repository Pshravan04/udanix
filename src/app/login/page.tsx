'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { GraduationCap, ArrowRight, UserCheck, ShieldCheck, Sparkles } from 'lucide-react';

const PORTALS = [
  {
    id: 'student',
    title: 'Student Portal',
    desc: 'Explore careers and find your path.',
    href: '/login/student',
    icon: GraduationCap,
    color: 'bg-udanix-blue',
    textColor: 'text-udanix-blue',
    primary: true
  },
  {
    id: 'counselor',
    title: 'Counselor Portal',
    desc: 'Expert access to guide students.',
    href: '/login/counselor',
    icon: UserCheck,
    color: 'bg-slate-900',
    textColor: 'text-slate-900',
    primary: false
  },
  {
    id: 'admin',
    title: 'System Admin',
    desc: 'Platform management and oversight.',
    href: '/login/admin',
    icon: ShieldCheck,
    color: 'bg-red-600',
    textColor: 'text-red-600',
    primary: false
  }
];

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6 sm:p-12 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 dot-grid opacity-[0.03] pointer-events-none" />
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-udanix-blue/[0.03] rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-udanix-cyan/[0.02] rounded-full blur-[100px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl space-y-12 relative z-10"
      >
        {/* Header */}
        <div className="text-center space-y-6">
          <Link href="/" className="inline-flex items-center gap-3.5 group">
            <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center shadow-2xl group-hover:bg-udanix-blue transition-all duration-500">
              <GraduationCap className="w-7 h-7 text-white" />
            </div>
            <span style={{ fontFamily: 'var(--font-space-grotesk)' }} className="font-black text-2xl text-slate-900 tracking-tighter uppercase">UDANIX</span>
          </Link>

          <div className="space-y-2">
            <h1 style={{ fontFamily: 'var(--font-space-grotesk)' }} className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter uppercase leading-none text-center">
              Welcome to the<br />
              <span className="text-udanix-blue text-center">Future of Career.</span>
            </h1>
            <p className="text-slate-500 font-medium text-lg max-w-xl mx-auto text-center">
              Select your entry point to access the UDANIX platform.
            </p>
          </div>
        </div>

        {/* Portal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PORTALS.map((portal, idx) => (
            <motion.div
              key={portal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Link
                href={portal.href}
                className={`group relative flex flex-col h-full p-8 rounded-[2.5rem] bg-white border border-slate-100 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${portal.primary ? 'ring-2 ring-udanix-blue/10' : ''}`}
              >
                <div className={`w-14 h-14 ${portal.color} rounded-2xl flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform`}>
                  <portal.icon className="w-7 h-7 text-white" />
                </div>

                <div className="flex-1 space-y-2">
                  <h3 style={{ fontFamily: 'var(--font-space-grotesk)' }} className="text-xl font-black text-slate-900 uppercase tracking-tight">
                    {portal.title}
                  </h3>
                  <p className="text-slate-500 font-medium text-sm leading-relaxed">
                    {portal.desc}
                  </p>
                </div>

                <div className="mt-8 flex items-center justify-between text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-udanix-blue transition-colors">
                  <span>Enter Portal</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>

                {portal.primary && (
                  <div className="absolute top-6 right-8">
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-udanix-blue opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-udanix-blue"></span>
                    </span>
                  </div>
                )}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Footer info */}
        <div className="pt-8 text-center">
          <p className="text-[13px] font-bold text-slate-400 tracking-tight">
            NEVER BEEN HERE BEFORE?{' '}
            <Link href="/register" className="text-udanix-blue font-black hover:text-blue-700 transition-colors uppercase tracking-widest ml-1">
              CREATE AN ACCOUNT
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}