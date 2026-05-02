-- ============================================================
-- UDANIX: Messages Table for Real-Time Session Chat
-- Run this in Supabase Dashboard → SQL Editor
-- ============================================================

CREATE TABLE IF NOT EXISTS public.messages (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id  uuid REFERENCES public.sessions(id) ON DELETE CASCADE,
  sender_id   uuid REFERENCES public.profiles(id),
  content     text NOT NULL,
  created_at  timestamptz DEFAULT now()
);

-- Enable Realtime for this table
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;

-- Row Level Security
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Session participants can read messages"
  ON public.messages FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.sessions s
      WHERE s.id = session_id
        AND (s.student_id = auth.uid() OR s.counselor_id = auth.uid())
    )
  );

CREATE POLICY "Session participants can insert messages"
  ON public.messages FOR INSERT
  WITH CHECK (
    sender_id = auth.uid()
    AND EXISTS (
      SELECT 1 FROM public.sessions s
      WHERE s.id = session_id
        AND (s.student_id = auth.uid() OR s.counselor_id = auth.uid())
    )
  );

-- Index for fast lookups
CREATE INDEX IF NOT EXISTS messages_session_id_idx ON public.messages(session_id);
CREATE INDEX IF NOT EXISTS messages_created_at_idx ON public.messages(created_at);

-- Verify
SELECT 'messages table created ✅' AS status;
