-- Fix messages RLS: avoid querying auth.users (permission denied)
-- Clients cannot SELECT from auth.users, so policies must use auth.uid() and JWT claims.

ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Drop policies that reference auth.users
DROP POLICY IF EXISTS "Admins full access on messages" ON public.messages;
DROP POLICY IF EXISTS "Anyone can insert messages" ON public.messages;
DROP POLICY IF EXISTS "Users view own messages" ON public.messages;
DROP POLICY IF EXISTS "Users delete own messages" ON public.messages;

-- Helper note:
-- Supabase exposes JWT claims via current_setting('request.jwt.claims', true).
-- We use it to get the authenticated user's email without touching auth.users.

-- Admin: full access (SELECT/INSERT/UPDATE/DELETE)
CREATE POLICY "Admins full access on messages" ON public.messages
FOR ALL
USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
)
WITH CHECK (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Public: Insert (needed for Contact form)
CREATE POLICY "Anyone can insert messages" ON public.messages
FOR INSERT
WITH CHECK (true);

-- User: View own messages (prefer user_id; fallback to email claim for older rows)
CREATE POLICY "Users view own messages" ON public.messages
FOR SELECT
USING (
  user_id = auth.uid()
  OR email = (current_setting('request.jwt.claims', true)::jsonb ->> 'email')
);

-- User: Delete own messages (prefer user_id; fallback to email claim for older rows)
CREATE POLICY "Users delete own messages" ON public.messages
FOR DELETE
USING (
  user_id = auth.uid()
  OR email = (current_setting('request.jwt.claims', true)::jsonb ->> 'email')
);

