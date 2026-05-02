import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://bzvltegajwypkhbrzpof.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ6dmx0ZWdhand5cGtoYnJ6cG9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcyODA0NjcsImV4cCI6MjA5Mjg1NjQ2N30.TrYr6cHlnjFbUYfyFajMMYOi6grZ8CKV36v4HiEKHXU'
);

async function testSignup() {
  console.log('Attempting to sign up...');
  const { data, error } = await supabase.auth.signUp({
    email: 'test.signup@udanix.com',
    password: 'Udanix@1234',
    options: {
      data: {
        full_name: 'Test Signup User',
        role: 'student',
      }
    }
  });

  if (error) {
    console.error('Sign-up Error:', error);
  } else {
    console.log('Sign-up successful!', data.user?.id);
  }
}

testSignup();
