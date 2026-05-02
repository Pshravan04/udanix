'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, Loader2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const handleLogout = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      title="Log out"
      className="w-9 h-9 sm:w-11 sm:h-11 rounded-2xl text-slate-400 hover:text-red-500 hover:bg-red-50 flex items-center justify-center transition-all border border-slate-100 sm:ml-2 disabled:opacity-60"
    >
      {loading
        ? <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
        : <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
      }
    </button>
  );
}
