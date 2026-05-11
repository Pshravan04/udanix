'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Profile, Session } from '@/types';
import { 
  getDetailedStats, 
  updateVerificationStatus, 
  deleteUser, 
  updateSessionStatus,
  updateUserRole,
  recordSystemAction
} from '@/lib/admin-actions';
import { toast } from 'sonner';

export function useAdminData() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const loadAdminData = useCallback(async () => {
    setLoading(true);
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (profile?.role !== 'admin') {
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      setIsAdmin(true);
      const { profiles: fetchedProfiles, sessions: fetchedSessions } = await getDetailedStats();
      
      setProfiles(fetchedProfiles || []);
      setSessions(fetchedSessions || []);
    } catch (err) {
      console.error('Error loading admin data:', err);
      toast.error('Failed to sync with neural grid');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAdminData();
  }, [loadAdminData]);

  const handleVerify = async (id: string, status: boolean) => {
    setActionLoading(`verify-${id}`);
    const { error } = await updateVerificationStatus(id, status);
    if (!error) {
      toast.success(status ? 'Entity authorized' : 'Authorization revoked');
      await recordSystemAction(status ? 'VERIFY' : 'UNVERIFY', 'PROFILE', `ID: ${id}`);
      await loadAdminData();
    } else {
      toast.error('Protocol failed');
    }
    setActionLoading(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to purge this entity?')) return;
    setActionLoading(`delete-${id}`);
    const { error } = await deleteUser(id);
    if (!error) {
      toast.success('Entity purged from system');
      await recordSystemAction('DELETE', 'PROFILE', `ID: ${id}`);
      await loadAdminData();
    } else {
      toast.error('Purge failed');
    }
    setActionLoading(null);
  };

  const handleSessionUpdate = async (id: string, status: string) => {
    setActionLoading(`session-${id}`);
    const { error } = await updateSessionStatus(id, status);
    if (!error) {
      toast.success(`Session status set to ${status}`);
      await recordSystemAction('UPDATE_STATUS', 'SESSION', `ID: ${id}, Status: ${status}`);
      await loadAdminData();
    } else {
      toast.error('Status update failed');
    }
    setActionLoading(null);
  };

  const handleUpdateRole = async (id: string, role: string) => {
    setActionLoading(`role-${id}`);
    const { error } = await updateUserRole(id, role);
    if (!error) {
      toast.success(`Entity role updated to ${role}`);
      await recordSystemAction('UPDATE_ROLE', 'PROFILE', `ID: ${id}, Role: ${role}`);
      await loadAdminData();
    } else {
      toast.error('Role update failed');
    }
    setActionLoading(null);
  };

  // Calculate high-level stats
  const stats = {
    totalUsers: profiles.length,
    students: profiles.filter(p => p.role === 'student').length,
    counselors: profiles.filter(p => p.role === 'counselor').length,
    activeCounselors: profiles.filter(p => p.role === 'counselor' && p.is_verified).length,
    pendingVerifications: profiles.filter(p => p.role === 'counselor' && !p.is_verified).length,
    totalSessions: sessions.length,
    activeSessions: sessions.filter(s => s.status === 'confirmed').length,
    completedSessions: sessions.filter(s => s.status === 'completed').length,
    totalGMV: sessions
      .filter(s => s.status === 'completed')
      .reduce((acc, s) => acc + (s.counselor?.price_per_hour || 0), 0)
  };

  return {
    profiles,
    sessions,
    loading,
    isAdmin,
    actionLoading,
    stats,
    loadAdminData,
    handleVerify,
    handleDelete,
    handleSessionUpdate,
    handleUpdateRole,
    setActionLoading
  };
}
