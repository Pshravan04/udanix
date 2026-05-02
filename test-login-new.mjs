import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://bzvltegajwypkhbrzpof.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ6dmx0ZWdhand5cGtoYnJ6cG9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcyODA0NjcsImV4cCI6MjA5Mjg1NjQ2N30.TrYr6cHlnjFbUYfyFajMMYOi6grZ8CKV36v4HiEKHXU'
);

async function testLoginNewUser() {
  console.log('Attempting to sign in with new user...');
  const { data, error } = await supabase.auth.signInWithPassword({
    email: 'test.signup@udanix.com',
    password: 'Udanix@1234',
  });

  if (error) {
    console.error('Sign-in Error:', error);
  } else {
    console.log('Sign-in successful!', data.user.id);
  }
}

testLoginNewUser();
