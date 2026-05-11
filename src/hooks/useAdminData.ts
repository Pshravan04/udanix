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
  const stats = (() => {
    const totalUsers = profiles.length;
    const students = profiles.filter(p => p.role === 'student').length;
    const counselors = profiles.filter(p => p.role === 'counselor').length;
    const activeCounselors = profiles.filter(p => p.role === 'counselor' && p.is_verified).length;
    const pendingVerifications = profiles.filter(p => p.role === 'counselor' && !p.is_verified).length;
    const totalSessions = sessions.length;
    const completedSessions = sessions.filter(s => s.status === 'completed').length;
    const activeSessions = sessions.filter(s => s.status === 'scheduled' || s.status === 'confirmed').length;
    const totalGMV = sessions
      .filter(s => s.status === 'completed')
      .reduce((acc, s) => acc + (s.counselor?.price_per_hour || 0), 0);

    // Accurate Last 7 Days calculation
    const getLast7Days = () => {
      return Array.from({ length: 7 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (6 - i));
        const dateStr = d.toISOString().split('T')[0];
        return {
          fullDate: dateStr,
          label: d.toLocaleDateString('en-US', { weekday: 'short' })
        };
      });
    };

    const last7Days = getLast7Days();

    const studentGrowthData = last7Days.map(day => ({
      name: day.label,
      users: profiles.filter(p => p.role === 'student' && p.created_at?.startsWith(day.fullDate)).length
    }));

    const sessionChartData = last7Days.map(day => ({
      name: day.label,
      sessions: sessions.filter(s => s.scheduled_at?.startsWith(day.fullDate)).length
    }));

    const growthData = last7Days.map(day => ({
      name: day.label,
      revenue: sessions
        .filter(s => s.status === 'completed' && s.scheduled_at?.startsWith(day.fullDate))
        .reduce((acc, s) => acc + (s.counselor?.price_per_hour || 0), 0)
    }));

    // System Health Heuristics
    const verificationRate = counselors > 0 ? Math.round((activeCounselors / counselors) * 100) : 0;
    const sessionSuccessRate = totalSessions > 0 ? Math.round((completedSessions / totalSessions) * 100) : 0;
    
    // Calculate Week-over-Week Growth (Simplified)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const prevWeekUsers = profiles.filter(p => p.created_at && new Date(p.created_at) < sevenDaysAgo).length;
    const userGrowthWoW = prevWeekUsers > 0 
      ? ((totalUsers - prevWeekUsers) / prevWeekUsers * 100).toFixed(1)
      : '100';

    // Revenue by stream
    const streams = Array.from(new Set(profiles.map(p => p.stream).filter(Boolean)));
    const streamRevenue = streams.map(stream => ({
      name: stream,
      revenue: sessions
        .filter(s => s.status === 'completed' && s.counselor?.stream === stream)
        .reduce((acc, s) => acc + (s.counselor?.price_per_hour || 0), 0),
      color: stream === 'Engineering' ? '#0EA5E9' : stream === 'Medicine' ? '#10B981' : '#FBB03B'
    }));

    // Top stream for insights
    const streamCounts = streams.map(s => ({
      name: s,
      count: profiles.filter(p => p.stream === s).length
    })).sort((a, b) => b.count - a.count);

    const topStream = streamCounts.length > 0 ? streamCounts[0].name : 'N/A';

    // Mock Rating distribution (Real data would come from a reviews table)
    const ratingDistribution = [
      { rating: '5★', count: Math.floor(totalSessions * 0.7) },
      { rating: '4★', count: Math.floor(totalSessions * 0.2) },
      { rating: '3★', count: Math.floor(totalSessions * 0.05) },
      { rating: '2★', count: Math.floor(totalSessions * 0.03) },
      { rating: '1★', count: Math.floor(totalSessions * 0.02) },
    ];

    // Activity Heatmap (7 days x 12 slots = 84 points)
    const activityHeatmap = Array.from({ length: 84 }, (_, i) => ({
      value: Math.floor(Math.random() * 10)
    }));

    // Recent Activity Feed (Derived from actual events)
    const recentActivity = [
      ...profiles.map(p => ({ type: 'USER', date: p.created_at, label: `New ${p.role}: ${p.full_name}` })),
      ...sessions.map(s => ({ type: 'SESSION', date: s.created_at, label: `Session scheduled: ${s.student?.full_name}` }))
    ]
    .sort((a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime())
    .slice(0, 8);

    return {
      totalUsers,
      students,
      counselors,
      activeCounselors,
      pendingVerifications,
      totalSessions,
      completedSessions,
      activeSessions,
      totalGMV,
      sessionChartData,
      studentGrowthData,
      growthData,
      verificationRate,
      sessionSuccessRate,
      userGrowthWoW,
      streamRevenue,
      recentActivity,
      activityHeatmap,
      topStream,
      streamData: streamCounts,
      ratingDistribution: [5, 4, 3, 2, 1].map(rating => ({
        rating: `${rating} Star`,
        count: profiles.filter(p => p.role === 'counselor' && Math.round(p.rating || 0) === rating).length
      })),
      topCounselors: profiles
        .filter(p => p.role === 'counselor')
        .map(c => ({
          ...c,
          completedCount: sessions.filter(s => s.counselor_id === c.id && s.status === 'completed').length
        }))
        .sort((a, b) => b.completedCount - a.completedCount || (b.rating || 0) - (a.rating || 0))
        .slice(0, 5),
    };
  })();

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
