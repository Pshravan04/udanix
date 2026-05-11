import { createClient } from './supabase/client';
import { DUMMY_STUDENTS, DUMMY_COUNSELORS, DUMMY_SESSIONS } from './dummy-data';
import { Profile } from '@/types';

export async function seedDummyData() {
  const supabase = createClient();
  
  // Seed Students
  const { error: studentError } = await supabase
    .from('profiles')
    .upsert(DUMMY_STUDENTS.map(s => ({
      ...s,
      id: crypto.randomUUID()
    })), { onConflict: 'email' });

  if (studentError) console.error('Error seeding students:', studentError);

  // Seed Counselors
  const { error: counselorError } = await supabase
    .from('profiles')
    .upsert(DUMMY_COUNSELORS.map(c => ({
      ...c,
      id: crypto.randomUUID()
    })), { onConflict: 'email' });

  if (counselorError) console.error('Error seeding counselors:', counselorError);

  // Get some IDs to link sessions
  const { data: profiles } = await supabase.from('profiles').select('id, role').limit(20);
  const studentIds = profiles?.filter(p => p.role === 'student').map(p => p.id) || [];
  const counselorIds = profiles?.filter(p => p.role === 'counselor').map(p => p.id) || [];

  if (studentIds.length > 0 && counselorIds.length > 0) {
    const { error: sessionError } = await supabase
      .from('sessions')
      .insert(DUMMY_SESSIONS.map((s, i) => ({
        ...s,
        student_id: studentIds[i % studentIds.length],
        counselor_id: counselorIds[i % counselorIds.length]
      })));
    if (sessionError) console.error('Error seeding sessions:', sessionError);
  }

  return { studentError, counselorError };
}

export async function updateVerificationStatus(id: string, status: boolean) {
  const supabase = createClient();
  const { error } = await supabase
    .from('profiles')
    .update({ is_verified: status })
    .eq('id', id);
  return { error };
}

export async function deleteUser(id: string) {
  const supabase = createClient();
  const { error } = await supabase
    .from('profiles')
    .delete()
    .eq('id', id);
  return { error };
}

export async function elevateToAdmin(id: string) {
  const supabase = createClient();
  const { error } = await supabase
    .from('profiles')
    .update({ role: 'admin' })
    .eq('id', id);
  return { error };
}

export async function getAllSessions() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('sessions')
    .select(`
      *,
      student:profiles!student_id(full_name, email),
      counselor:profiles!counselor_id(full_name, email)
    `)
    .order('scheduled_at', { ascending: false });
  return { data, error };
}

export async function updateSessionStatus(id: string, status: string) {
  const supabase = createClient();
  const { error } = await supabase
    .from('sessions')
    .update({ status })
    .eq('id', id);
  return { error };
}

export async function updateProfileDetails(id: string, updates: Partial<Profile>) {
  const supabase = createClient();
  const { error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', id);
  return { error };
}

export async function getAdminAnalytics() {
  const supabase = createClient();
  
  // Get profiles for role distribution and streams
  const { data: profiles } = await supabase.from('profiles').select('role, stream, created_at');
  
  // Get sessions for propagation and revenue
  const { data: sessions } = await supabase
    .from('sessions')
    .select('scheduled_at, status, counselor_id, profiles!counselor_id(price_per_hour)');

  return { profiles, sessions };
}

export async function updateUserRole(id: string, role: string) {
  const supabase = createClient();
  const { error } = await supabase
    .from('profiles')
    .update({ role })
    .eq('id', id);
  return { error };
}

export async function getDetailedStats() {
  const supabase = createClient();
  
  const { data: profiles } = await supabase.from('profiles').select('*');
  const { data: sessions } = await supabase
    .from('sessions')
    .select(`
      *,
      student:profiles!student_id(full_name, email),
      counselor:profiles!counselor_id(full_name, email, price_per_hour, stream)
    `);

  return { profiles, sessions };
}

export async function purgeAllData() {
  const supabase = createClient();
  const { error: sessionError } = await supabase.from('sessions').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  const { error: profileError } = await supabase.from('profiles').delete().neq('role', 'admin');
  return { sessionError, profileError };
}

// System for recording actions
export async function recordSystemAction(action: string, entity: string, details: string) {
  const timestamp = new Date().toISOString();
  console.log(`[SYSTEM AUDIT] [${timestamp}] ${action} | ${entity} | ${details}`);
  
  // Future implementation: Write to 'audit_logs' table
  // const supabase = createClient();
  // await supabase.from('audit_logs').insert({ action, entity, details, timestamp });
  
  return { success: true, timestamp };
}
