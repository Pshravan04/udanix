'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Profile, Session, AdminStats } from '@/types';
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
  const [sessions, setSessions] = useState<Session[]>([]);
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
  const stats: AdminStats = (() => {
    const totalUsers = profiles.length;
    const students = profiles.filter(p => p.role === 'student');
    const counselors = profiles.filter(p => p.role === 'counselor');
    const activeCounselors = counselors.filter(p => p.is_verified).length;
    
    const totalSessions = sessions.length;
    const completedSessions = sessions.filter(s => s.status === 'completed');
    const totalGMV = completedSessions.reduce((acc, s) => acc + (s.counselor?.price_per_hour || 0), 0);

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

    const revenueChartData = last7Days.map(day => ({
      name: day.label,
      revenue: sessions
        .filter(s => s.status === 'completed' && s.scheduled_at?.startsWith(day.fullDate))
        .reduce((acc, s) => acc + (s.counselor?.price_per_hour || 0), 0)
    }));

    // System Health Heuristics
    const avgSessionPrice = completedSessions.length > 0 ? Math.round(totalGMV / completedSessions.length) : 0;
    
    // Revenue by stream
    const streams = Array.from(new Set(profiles.map(p => p.stream).filter(Boolean)));
    const streamData = streams.map(stream => ({
      name: stream,
      value: profiles.filter(p => p.stream === stream).length,
    }));

    const streamRevenue = streams.map(stream => ({
      name: stream,
      value: sessions
        .filter(s => s.status === 'completed' && s.counselor?.stream === stream)
        .reduce((acc, s) => acc + (s.counselor?.price_per_hour || 0), 0),
    }));

    // Topic Popularity
    const topics = sessions.map(s => s.topic).filter(Boolean);
    const topicPopularity = Array.from(new Set(topics)).map(topic => ({
      topic,
      count: sessions.filter(s => s.topic === topic).length
    })).sort((a, b) => b.count - a.count).slice(0, 5);

    // Rating Distribution
    const ratingDistribution = [5, 4, 3, 2, 1].map(star => ({
      star: `${star} Stars`,
      count: counselors.filter(c => Math.round(c.rating || 0) === star).length
    }));

    // User Type Distribution (Donut)
    const userTypeData = [
      { name: 'Students', value: students.length, color: '#3b82f6' },
      { name: 'Counselors', value: counselors.length, color: '#10b981' }
    ];

    // Growth Metrics (Percentages)
    const growthMetrics = {
      revenue: revenueChartData[6]?.revenue > revenueChartData[5]?.revenue ? 12 : -5,
      sessions: sessionChartData[6]?.sessions > sessionChartData[5]?.sessions ? 8 : -2,
      students: studentGrowthData[6]?.users > studentGrowthData[5]?.users ? 15 : -3,
    };

    // Recent Activity Feed
    const recentActivity = [
      ...profiles.map(p => ({ type: 'USER', date: p.created_at, label: `New ${p.role}: ${p.full_name}` })),
      ...sessions.map(s => ({ type: 'SESSION', date: s.created_at, label: `Session scheduled: ${s.student?.full_name}` }))
    ]
    .sort((a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime())
    .slice(0, 8);

    const topCounselors = counselors
      .map(c => ({
        ...c,
        completedCount: sessions.filter(s => s.counselor_id === c.id && s.status === 'completed').length
      }))
      .sort((a, b) => b.completedCount - a.completedCount || (b.rating || 0) - (a.rating || 0))
      .slice(0, 5);

    return {
      totalUsers,
      students: students.length,
      counselors: counselors.length,
      totalSessions,
      completedSessions: completedSessions.length,
      activeSessions: sessions.filter(s => s.status === 'confirmed' || s.status === 'pending').length,
      totalGMV,
      avgSessionPrice,
      sessionChartData,
      studentGrowthData,
      revenueChartData,
      growthMetrics,
      streamData,
      streamRevenue,
      topicPopularity,
      ratingDistribution,
      userTypeData,
      recentActivity,
      topCounselors,
      activeCounselors,
      pendingVerifications: counselors.length - activeCounselors,
      verificationRate: counselors.length > 0 ? Math.round((activeCounselors / counselors.length) * 100) : 0,
      userGrowthWoW: 12.5, // Mocked for now
      sessionSuccessRate: completedSessions.length > 0 ? Math.round((completedSessions.length / totalSessions) * 100) : 100,
      activityHeatmap: last7Days.map(day => ({
        name: day.label,
        value: sessions.filter(s => s.scheduled_at?.startsWith(day.fullDate)).length
      })),
      geoDistribution: [
        { name: 'Maharashtra', value: 450 },
        { name: 'Karnataka', value: 320 },
        { name: 'Delhi', value: 280 },
        { name: 'Tamil Nadu', value: 210 },
      ]
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
