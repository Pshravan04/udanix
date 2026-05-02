'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { createClient } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';
import { Profile } from '@/types';

interface AuthContextType {
    user: User | null;
    profile: Profile | null;
    isLoading: boolean;
    isLoginModalOpen: boolean;
    setLoginModalOpen: (open: boolean) => void;
    refreshAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);
    const supabase = createClient();

    const fetchAuthData = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);

            if (user) {
                const { data: profileData } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', user.id)
                    .single();
                setProfile(profileData);
            } else {
                setProfile(null);
            }
        } catch (error) {
            console.error('Error fetching auth data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAuthData();

        const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
            fetchAuthData();
        });

        return () => subscription.unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ 
            user, 
            profile, 
            isLoading, 
            isLoginModalOpen, 
            setLoginModalOpen,
            refreshAuth: fetchAuthData 
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
