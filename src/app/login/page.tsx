'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, ArrowRight, Eye, EyeOff, Sparkles } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { GoogleLoginButton } from '@/components/auth/google-login-button';
import { ForgotPasswordDialog } from '@/components/auth/forgot-password-dialog';

const ROLES = [
  { id: 'student', label: 'Student', emoji: '🎓', desc: 'Find your path' },
  { id: 'counselor', label: 'Counselor', emoji: '🧑‍💼', desc: 'Guide others' },
  { id: 'admin', label: 'Admin', emoji: '🛡️', desc: 'Manage platform' },
] as const;

type Role = 'student' | 'counselor' | 'admin';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState<Role>('student');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        alert(error.message);
        setIsLoading(false);
        return;
      }

      // Role is managed by metadata in this implementation
      const userRole = data.user?.user_metadata?.role || 'student';

      router.push(`/${userRole}`);
      router.refresh();
    } catch (err) {
      console.error('Login error:', err);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex selection:bg-udanix-blue/10">

      {/* ─── LEFT: Premium Light branding panel ─── */}
      <div className="hidden lg:flex w-[44%] bg-slate-50 border-r border-slate-100 flex-col justify-between p-16 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 dot-grid opacity-[0.03] pointer-events-none" />
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-udanix-blue/[0.04] rounded-full blur-[120px]" />
        <div className="absolute bottom-[-5%] left-[-5%] w-[400px] h-[400px] bg-udanix-cyan/[0.03] rounded-full blur-[100px]" />

        {/* Logo */}
        <Link href="/" className="flex items-center gap-4 relative z-10 group">
          <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center shadow-2xl group-hover:bg-udanix-blue transition-all duration-500">
            <GraduationCap className="w-7 h-7 text-white" />
          </div>
          <span style={{ fontFamily: 'var(--font-space-grotesk)' }} className="font-black text-2xl text-slate-900 tracking-tighter uppercase">UDANIX</span>
        </Link>

        {/* Hero text */}
        <div className="relative z-10 space-y-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-slate-100 text-udanix-blue text-[10px] font-black uppercase tracking-[0.2em] shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            Empowering 50k+ Future Leaders
          </div>

          <div className="space-y-6">
            <h2
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
              className="text-6xl font-black text-slate-900 leading-[1] tracking-tighter uppercase"
            >
              Build your<br />
              <span className="text-udanix-blue">brilliant future.</span>
            </h2>
            <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-sm">
              Discover your path. Connect with world-class mentors and grow your career with the right guidance.
            </p>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-10 pt-10 border-t border-slate-200/60">
            {[
              { v: '50k+', l: 'Active Students' },
              { v: '200+', l: 'Expert Mentors' },
              { v: '98%', l: 'Success Rate' },
            ].map((s) => (
              <div key={s.l}>
                <p style={{ fontFamily: 'var(--font-space-grotesk)' }} className="text-3xl font-black text-slate-900 tracking-tighter uppercase">{s.v}</p>
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">{s.l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center gap-6 relative z-10 uppercase tracking-widest text-[10px] font-black text-slate-400/60">
          <span>© 2026 UDANIX</span>
          <div className="w-1 h-1 rounded-full bg-slate-300" />
          <span>UDANIX Platform</span>
        </div>
      </div>

      {/* ─── RIGHT: Form panel ─── */}
      <div className="flex-1 bg-white flex items-center justify-center p-8 sm:p-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md space-y-10"
        >
          {/* Mobile logo */}
          <Link href="/" className="flex items-center gap-3.5 lg:hidden mb-8">
            <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span style={{ fontFamily: 'var(--font-space-grotesk)' }} className="font-black text-xl text-slate-900 tracking-tighter uppercase">UDANIX</span>
          </Link>

          {/* Header */}
          <div className="space-y-3 px-1">
            <h1 style={{ fontFamily: 'var(--font-space-grotesk)' }} className="text-4xl font-black text-slate-900 tracking-tighter uppercase">Welcome Back</h1>
            <p className="text-slate-500 font-medium text-lg leading-snug">Log in to your account to continue.</p>
          </div>

          {/* Role tabs */}
          <div className="grid grid-cols-3 gap-2 p-1.5 rounded-2xl bg-slate-50 border border-slate-100 shadow-inner">
            {ROLES.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => setRole(r.id)}
                className={`relative py-3.5 px-2 rounded-[1rem] text-center transition-all duration-300 ${role === r.id
                  ? 'text-slate-900'
                  : 'text-slate-400 hover:text-slate-600'
                  }`}
              >
                {role === r.id && (
                  <motion.div
                    layoutId="role-indicator"
                    className="absolute inset-0 rounded-[1rem] bg-white shadow-xl shadow-slate-200/50 border border-slate-100"
                    transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
                  />
                )}
                <span className="relative z-10 block text-xl mb-1">{r.emoji}</span>
                <span className="relative z-10 text-[10px] font-black uppercase tracking-widest block">{r.label}</span>
              </button>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email */}
            <div className="space-y-2">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
              <Input
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-14 rounded-2xl border-slate-200 bg-[#F8FAFC] focus:bg-white focus:ring-4 focus:ring-udanix-blue/5 focus:border-udanix-blue transition-all font-medium text-base shadow-inner"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex items-center justify-between px-1">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Password</label>
                <ForgotPasswordDialog />
              </div>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-14 rounded-2xl border-slate-200 bg-[#F8FAFC] focus:bg-white pr-14 focus:ring-4 focus:ring-udanix-blue/5 focus:border-udanix-blue transition-all font-medium text-base shadow-inner"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-900 transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-15 bg-slate-900 hover:bg-slate-800 text-white rounded-[1.25rem] font-black text-xs uppercase tracking-[0.2em] shadow-2xl transition-all active:scale-[0.98] disabled:opacity-70"
            >
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.span key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3">
                    <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    Logging in...
                  </motion.span>
                ) : (
                  <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
                    Log In
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </motion.span>
                )}
              </AnimatePresence>
            </Button>
          </form>

          {/* Divider */}
          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-100" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Or log in with</span>
            </div>
          </div>

          <GoogleLoginButton />

          {/* Register link */}
          <div className="pt-2 text-center">
            <p className="text-[13px] font-bold text-slate-400">
              DON'T HAVE AN ACCOUNT?{' '}
              <Link href="/register" className="text-udanix-blue font-black hover:text-blue-700 transition-colors underline-offset-4 hover:underline ml-1">
                SIGN UP
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}