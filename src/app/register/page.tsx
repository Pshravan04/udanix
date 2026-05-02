'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';
import {
    GraduationCap, ArrowRight, Eye, EyeOff, Check,
    Upload, FileText, ChevronRight,
} from 'lucide-react';
import { SearchableSelect } from '@/components/ui/searchable-select';
import { COURSES } from '@/lib/edu-data';
import { createClient } from '@/lib/supabase/client';
import { GoogleLoginButton } from '@/components/auth/google-login-button';

const ROLES = [
    { id: 'counselor', label: 'Counselor', emoji: '🧑‍💼', desc: 'Guide students, grow my practice' },
] as const;

type Role = 'counselor';

const COUNSELING_STYLES = [
    { id: 'logic', label: 'Logic-Based', desc: 'Data-driven, goal-oriented approach' },
    { id: 'empathy', label: 'Empathetic', desc: 'Holistic, emotion-first listening' },
    { id: 'solution', label: 'Solution-Focused', desc: 'Practical, action-forward methods' },
    { id: 'narrative', label: 'Narrative', desc: 'Story-led personal exploration' },
];

export default function RegisterPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const role: Role = 'counselor';
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [uploadedFile, setUploadedFile] = useState<string | null>(null);
    const [selectedStyle, setSelectedStyle] = useState<string>('');
    const [form, setForm] = useState({
        name: '', email: '', password: '',
        specialty: '', experience: '',
        institution: '', major: '', degree: '',
    });

    const update = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) setUploadedFile(file.name);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const supabase = createClient();

            // 1. Sign up user
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email: form.email,
                password: form.password,
                options: {
                    data: {
                        full_name: form.name,
                        role: role,
                    }
                }
            });

            if (authError) {
                alert(authError.message);
                setIsLoading(false);
                return;
            }

            if (authData.user) {
                // 2. Create profile record
                const { error: profileError } = await supabase.from('profiles').insert({
                    id: authData.user.id,
                    full_name: form.name,
                    email: form.email,
                    role: role,
                    school: form.institution,
                    stream: form.major,
                    class: form.degree,
                    // Additional counselor specific data
                    bio: `Specialization: ${form.specialty}`,
                });

                if (profileError) {
                    console.error('Profile creation error:', profileError);
                }
            }

            router.push(`/${role}`);
            router.refresh();
        } catch (err) {
            console.error('Registration error:', err);
            setIsLoading(false);
        }
    };

    const totalSteps = 3;
    const progress = ((step - 1) / (totalSteps - 1)) * 100;

    const stepDesc = ['Your Role', 'Basic Info', 'Verify Account'];

    return (
        <div className="min-h-screen flex selection:bg-udanix-blue/10">

            {/* ─── LEFT: Premium Step Panel ─── */}
            <div className="hidden lg:flex w-[38%] bg-slate-50 border-r border-slate-100 flex-col justify-between p-16 relative overflow-hidden">
                {/* Background elements */}
                <div className="absolute inset-0 dot-grid opacity-[0.03] pointer-events-none" />
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-udanix-blue/[0.04] rounded-full blur-[120px]" />

                {/* Logo */}
                <Link href="/" className="flex items-center gap-4 relative z-10 group">
                    <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center shadow-2xl group-hover:bg-udanix-blue transition-all duration-500">
                        <GraduationCap className="w-7 h-7 text-white" />
                    </div>
                    <span style={{ fontFamily: 'var(--font-space-grotesk)' }} className="font-black text-2xl text-slate-900 tracking-tighter uppercase">UDANIX</span>
                </Link>

                {/* Step progression */}
                <div className="relative z-10 space-y-12">
                    <div className="space-y-4">
                        <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]">Your Progress</p>
                        <div className="w-full h-1.5 bg-slate-200/50 rounded-full overflow-hidden">
                            <motion.div
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                className="h-full bg-slate-900"
                            />
                        </div>
                        <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Step {step}/{totalSteps}</p>
                    </div>

                    <div className="space-y-6">
                        {stepDesc.map((label, i) => (
                            <div key={i} className="flex items-center gap-5 group">
                                <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-[11px] font-black transition-all duration-500
                  ${i + 1 < step
                                        ? 'bg-udanix-blue text-white shadow-lg shadow-blue-500/20'
                                        : i + 1 === step
                                            ? 'bg-slate-900 text-white shadow-xl shadow-slate-900/10'
                                            : 'bg-white border border-slate-200 text-slate-300'}`}
                                >
                                    {i + 1 < step ? <Check className="w-4 h-4" /> : i + 1}
                                </div>
                                <div className="space-y-1">
                                    <span className={`text-[10px] font-black uppercase tracking-widest block transition-colors duration-500 ${i + 1 <= step ? 'text-udanix-blue' : 'text-slate-300'}`}>Phase 0{i + 1}</span>
                                    <span className={`text-base font-bold transition-colors duration-500 ${i + 1 <= step ? 'text-slate-900' : 'text-slate-300'}`}>{label}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Branding Quote */}
                    <div className="pt-12 border-t border-slate-200/60 max-w-[240px]">
                        <p className="text-slate-400 text-sm leading-relaxed font-medium italic">
                            &quot;The best way to predict the future is to architect it.&quot;
                        </p>
                    </div>
                </div>

                {/* Bottom note */}
                <div className="flex items-center gap-6 relative z-10 uppercase tracking-widest text-[10px] font-black text-slate-400/60">
                    <span>© 2026 UDANIX</span>
                    <div className="w-1 h-1 rounded-full bg-slate-300" />
                    <span>Join Us</span>
                </div>
            </div>

            {/* ─── RIGHT: Form panel ─── */}
            <div className="flex-1 bg-white flex items-center justify-center p-8 sm:p-12 overflow-y-auto">
                <motion.div
                    key={`step-${step}`}
                    initial={{ opacity: 0, scale: 0.98, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98, y: -10 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full max-w-md my-12"
                >
                    {/* Mobile logo */}
                    <Link href="/" className="flex items-center gap-3.5 lg:hidden mb-10">
                        <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center">
                            <GraduationCap className="w-5 h-5 text-white" />
                        </div>
                        <span style={{ fontFamily: 'var(--font-space-grotesk)' }} className="font-black text-xl text-slate-900 tracking-tighter uppercase">UDANIX</span>
                    </Link>

                    {/* Mobile progress */}
                    <div className="lg:hidden mb-10 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Progress</span>
                            <span className="text-[10px] font-black text-udanix-blue uppercase tracking-widest">{stepDesc[step - 1]}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            {Array.from({ length: totalSteps }).map((_, i) => (
                                <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${i + 1 <= step ? 'bg-slate-900' : 'bg-slate-200'}`} />
                            ))}
                        </div>
                    </div>

                    {/* ─── STEP 1: ROLE SELECTION ─── */}
                    {step === 1 && (
                        <div className="space-y-10">
                            <div className="space-y-3">
                                <h1 style={{ fontFamily: 'var(--font-space-grotesk)' }} className="text-4xl font-black text-slate-900 tracking-tighter uppercase leading-tight">Join as a Counselor</h1>
                                <p className="text-slate-500 font-medium text-lg leading-snug">Empower the next generation and grow your mentorship practice.</p>
                            </div>

                            <div className="space-y-4">
                                {ROLES.map((r) => (
                                    <button
                                        key={r.id}
                                        type="button"
                                        className={`w-full text-left p-6 rounded-[2rem] border-2 transition-all duration-300 relative group border-slate-900 bg-slate-900 shadow-2xl shadow-slate-900/20`}
                                    >
                                        <div className="flex items-center gap-5 relative z-10">
                                            <div className="w-16 h-16 rounded-[1.25rem] flex items-center justify-center text-3xl transition-all duration-300 bg-white/10 scale-110">
                                                {r.emoji}
                                            </div>
                                            <div className="flex-1 space-y-1">
                                                <p style={{ fontFamily: 'var(--font-space-grotesk)' }} className="font-black text-lg uppercase tracking-tight text-white">{r.label}</p>
                                                <p className="font-medium text-[13px] leading-tight text-slate-400">{r.desc}</p>
                                            </div>
                                            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 shadow-lg animate-in zoom-in duration-300">
                                                <Check className="w-4 h-4 text-slate-900" />
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>

                            <Button
                                onClick={() => setStep(2)}
                                className="w-full h-15 bg-udanix-blue hover:bg-blue-700 text-white rounded-[1.25rem] font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-blue-500/20 group active:scale-[0.98] transition-all"
                            >
                                Get Started
                                <ArrowRight className="w-4 h-4 ml-3 group-hover:translate-x-1 transition-transform" />
                            </Button>

                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t border-slate-100" />
                                </div>
                                <div className="relative flex justify-center text-[10px] font-black uppercase tracking-[0.3em]">
                                    <span className="bg-white px-4 text-slate-400">OR</span>
                                </div>
                            </div>

                            <GoogleLoginButton role={role} />

                            <div className="pt-2 text-center">
                                <p className="text-[13px] font-bold text-slate-400 tracking-tight">
                                    ALREADY HAVE AN ACCOUNT?{' '}
                                    <Link href="/login" className="text-udanix-blue font-black hover:text-blue-700 transition-colors uppercase tracking-widest ml-1">
                                        LOG IN
                                    </Link>
                                </p>
                            </div>
                        </div>
                    )}

                    {/* ─── STEP 2: ACCOUNT DETAILS ─── */}
                    {step === 2 && (
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            setStep(3);
                        }} className="space-y-8">
                            <div className="space-y-3">
                                <h1 style={{ fontFamily: 'var(--font-space-grotesk)' }} className="text-4xl font-black text-slate-900 tracking-tighter uppercase leading-none">Professional Profile</h1>
                                <p className="text-slate-500 font-medium text-lg leading-snug">Tell us about your professional background.</p>
                            </div>

                            <div className="space-y-5">
                                {[
                                    { label: 'Full Name', key: 'name', type: 'text', placeholder: 'Your Name' },
                                    { label: 'Email Address', key: 'email', type: 'email', placeholder: 'your@email.com' },
                                ].map(field => (
                                    <div key={field.key} className="space-y-2">
                                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{field.label}</label>
                                        <Input
                                            type={field.type}
                                            placeholder={field.placeholder}
                                            value={form[field.key as keyof typeof form]}
                                            onChange={e => update(field.key, e.target.value)}
                                            required
                                            className="h-14 rounded-2xl border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-udanix-blue/5 focus:border-udanix-blue transition-all font-medium text-base shadow-inner placeholder:opacity-30"
                                        />
                                    </div>
                                ))}

                                <div className="grid grid-cols-2 gap-4">
                                    <SearchableSelect
                                        label="Specialization"
                                        options={COURSES}
                                        value={form.specialty}
                                        onChange={(val) => update('specialty', val)}
                                        placeholder="Core specialty"
                                    />
                                    <div className="space-y-2">
                                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Years of Experience</label>
                                        <Input type="number" placeholder="Years" min="0" max="50" value={form.experience} onChange={e => update('experience', e.target.value)} className="h-14 rounded-2xl border-slate-200 bg-slate-50 font-medium shadow-inner" required />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Create Password</label>
                                    <div className="relative">
                                        <Input
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="••••••••"
                                            value={form.password}
                                            onChange={e => update('password', e.target.value)}
                                            required minLength={8}
                                            className="h-14 rounded-2xl border-slate-200 bg-slate-50 focus:bg-white pr-14 focus:ring-4 focus:ring-udanix-blue/5 focus:border-udanix-blue transition-all font-medium text-base shadow-inner"
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
                            </div>

                            <div className="flex gap-4 pt-4">
                                <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1 h-15 rounded-[1.25rem] border-slate-100 bg-slate-50 text-slate-500 font-black text-[10px] uppercase tracking-widest hover:bg-white hover:border-slate-200 transition-all">
                                    Back
                                </Button>
                                <Button type="submit" disabled={isLoading} className="flex-[2.5] h-15 bg-slate-900 hover:bg-slate-800 text-white rounded-[1.25rem] font-black text-xs uppercase tracking-[0.2em] shadow-2xl group transition-all">
                                    {isLoading ? (
                                        <span className="flex items-center gap-3">
                                            <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                            Processing...
                                        </span>
                                    ) : (
                                        <>
                                            Next Step
                                            <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>
                    )}

                    {/* ─── STEP 3: VERIFICATION ─── */}
                    {step === 3 && (
                        <form onSubmit={handleSubmit} className="space-y-10">
                            <div className="space-y-3">
                                <h1 style={{ fontFamily: 'var(--font-space-grotesk)' }} className="text-4xl font-black text-slate-900 tracking-tighter uppercase leading-none">
                                    Verify Account
                                </h1>
                                <p className="text-slate-500 font-medium text-lg leading-snug pt-1">
                                    Upload your certificates for verification to join the elite network.
                                </p>
                            </div>

                            <div className="space-y-8">
                                <div className="space-y-4">
                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Counseling Style</label>
                                    <div className="space-y-2.5">
                                        {COUNSELING_STYLES.map(s => (
                                            <button
                                                key={s.id}
                                                type="button"
                                                onClick={() => setSelectedStyle(s.id)}
                                                className={`w-full p-5 rounded-[1.5rem] border transition-all duration-300 text-left relative group
                            ${selectedStyle === s.id
                                                        ? 'border-slate-900 bg-slate-900 shadow-xl'
                                                        : 'border-slate-100 bg-slate-50 hover:border-slate-200 hover:bg-white'}`}
                                            >
                                                <div className="flex items-center justify-between relative z-10">
                                                    <div className="space-y-1">
                                                        <p className={`font-black text-sm uppercase tracking-tight ${selectedStyle === s.id ? 'text-white' : 'text-slate-900'}`}>{s.label}</p>
                                                        <p className={`font-medium text-[12px] leading-tight ${selectedStyle === s.id ? 'text-slate-400' : 'text-slate-500'}`}>{s.desc}</p>
                                                    </div>
                                                    {selectedStyle === s.id && (
                                                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 shadow-lg animate-in zoom-in duration-300">
                                                            <Check className="w-4 h-4 text-slate-900" />
                                                        </div>
                                                    )}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Certificate upload */}
                                <div className="space-y-3">
                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Certificates <span className="text-udanix-blue ml-1">*</span></label>
                                    <label className={`cursor-pointer flex flex-col items-center justify-center p-10 rounded-[2.5rem] border-2 border-dashed transition-all duration-500
                    ${uploadedFile ? 'border-udanix-blue bg-blue-50/30 shadow-xl' : 'border-slate-200 bg-slate-50 hover:border-udanix-blue/40 shadow-inner'}`}>
                                        <input type="file" className="hidden" accept=".jpg,.jpeg,.png,.pdf" onChange={handleFileUpload} required />
                                        {uploadedFile ? (
                                            <div className="text-center space-y-3">
                                                <div className="w-14 h-14 rounded-2xl bg-udanix-blue flex items-center justify-center mx-auto shadow-2xl shadow-blue-500/30">
                                                    <FileText className="w-7 h-7 text-white" />
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-slate-900 font-black text-sm uppercase tracking-tight truncate max-w-[200px] mx-auto">{uploadedFile}</p>
                                                    <p className="text-udanix-blue font-bold text-[10px] uppercase tracking-widest">Credential Transmitted</p>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="text-center space-y-4">
                                                <div className="w-16 h-16 rounded-3xl bg-white flex items-center justify-center mx-auto shadow-lg">
                                                    <Upload className="w-8 h-8 text-slate-300" />
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-slate-900 text-sm font-black uppercase tracking-widest leading-tight">Upload Certificates</p>
                                                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">REQUIRED FOR VERIFICATION</p>
                                                </div>
                                            </div>
                                        )}
                                    </label>
                                </div>
                            </div>

                            <div className="space-y-6 pt-4">
                                <div className="flex gap-4">
                                    <Button type="button" variant="outline" onClick={() => setStep(2)} className="flex-1 h-15 rounded-[1.25rem] border-slate-100 bg-slate-50 text-slate-500 font-black text-[10px] uppercase tracking-widest hover:bg-white hover:border-slate-200 transition-all">
                                        Back
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={isLoading}
                                        className="flex-[2.5] h-15 bg-udanix-blue hover:bg-blue-700 text-white rounded-[1.25rem] font-black text-xs uppercase tracking-[0.2em] shadow-2xl transition-all"
                                    >
                                        {isLoading ? (
                                            <span className="flex items-center gap-3">
                                                <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                                Processing...
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-2">
                                                Complete Registration <Check className="w-4 h-4 ml-1" />
                                            </span>
                                        )}
                                    </Button>
                                </div>

                                <p className="text-center text-[11px] font-bold text-slate-400 tracking-tight leading-relaxed">
                                    By signing up, you agree to our{' '}
                                    <Link href="#" className="text-udanix-blue font-black hover:underline underline-offset-4 decoration-2">Terms of Service</Link>
                                    {' and '}
                                    <Link href="#" className="text-udanix-blue font-black hover:underline underline-offset-4 decoration-2">Privacy Policy</Link>.
                                </p>
                            </div>
                        </form>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
