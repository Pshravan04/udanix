import { createClient } from './supabase/client';
import { DUMMY_STUDENTS, DUMMY_COUNSELORS, DUMMY_SESSIONS } from './dummy-data';

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

export async function purgeAllData() {
  const supabase = createClient();
  // Profiles delete cascade to sessions and achievements usually, 
  // but let's be explicit if needed.
  const { error: sessionError } = await supabase.from('sessions').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  const { error: profileError } = await supabase.from('profiles').delete().neq('role', 'admin');
  return { sessionError, profileError };
}
