'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState<'student' | 'counselor' | 'admin'>('student');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Mock Authentication Logic for UI preview
    // Setting test cookie to demonstrate RBAC middleware without a real Supabase backend connection yet
    document.cookie = `mock_role=${role}; path=/`;
    
    // In production, you would use:
    // const supabase = createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
    // await supabase.auth.signInWithPassword({ email, password })

    setTimeout(() => {
      setIsLoading(false);
      router.push(`/${role}`);
      router.refresh(); // ensure middleware runs anew
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-semibold tracking-tight">Sign in to UDANIX</CardTitle>
          <CardDescription>
            Choose your role and sign in to continue
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-2">
              <Button
                type="button"
                variant={role === 'student' ? 'default' : 'outline'}
                onClick={() => setRole('student')}
                className="w-full text-xs"
              >
                Student
              </Button>
              <Button
                type="button"
                variant={role === 'counselor' ? 'default' : 'outline'}
                onClick={() => setRole('counselor')}
                className="w-full text-xs"
              >
                Counselor
              </Button>
              <Button
                type="button"
                variant={role === 'admin' ? 'default' : 'outline'}
                onClick={() => setRole('admin')}
                className="w-full text-xs"
              >
                Admin
              </Button>
            </div>
            <div className="space-y-2">
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
              {isLoading ? 'Signing in...' : `Sign in as ${role === 'student' ? 'Student' : role === 'counselor' ? 'Counselor' : 'Admin'}`}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}