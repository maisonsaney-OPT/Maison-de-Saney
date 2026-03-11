
-- Final Fix Migration for Messages, RLS, and Realtime

-- 1. Add user_id column to messages for reliable RLS
ALTER TABLE public.messages ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL;

-- 2. Update existing messages to link user_id based on email (best effort)
UPDATE public.messages m
SET user_id = p.id
FROM public.profiles p
WHERE m.email = p.email AND m.user_id IS NULL;

-- 3. Overhaul RLS Policies for Messages (Make them bulletproof)
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- DELETE old policies to avoid conflicts
DROP POLICY IF EXISTS "Admins view messages" ON public.messages;
DROP POLICY IF EXISTS "Public insert messages" ON public.messages;
DROP POLICY IF EXISTS "Admins update messages" ON public.messages;
DROP POLICY IF EXISTS "Admins delete messages" ON public.messages;
DROP POLICY IF EXISTS "Users view own messages" ON public.messages;
DROP POLICY IF EXISTS "Users can delete own messages" ON public.messages;

-- NEW Policies
-- Admin: Full Access
CREATE POLICY "Admins full access on messages" ON public.messages 
FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Public: Insert (needed for Contact form on homepage)
CREATE POLICY "Anyone can insert messages" ON public.messages 
FOR INSERT WITH CHECK (true);

-- User: View own
CREATE POLICY "Users view own messages" ON public.messages 
FOR SELECT USING (
  user_id = auth.uid() OR email = (SELECT email FROM auth.users WHERE id = auth.uid())
);

-- User: Delete own
CREATE POLICY "Users delete own messages" ON public.messages 
FOR DELETE USING (
  user_id = auth.uid() OR email = (SELECT email FROM auth.users WHERE id = auth.uid())
);

-- 4. Force Realtime Publication (Drop and recreate to be sure)
-- This is the "Nuclear Option" to ensure Realtime is 100% active for these tables
DROP PUBLICATION IF EXISTS supabase_realtime;
CREATE PUBLICATION supabase_realtime FOR TABLE 
  public.messages, 
  public.services, 
  public.products, 
  public.gallery, 
  public.formations, 
  public.orders, 
  public.profiles, 
  public.questionnaires;

-- 5. Ensure all tables have Replica Identity Full (Required for DELETE events in some Realtime setups)
ALTER TABLE public.messages REPLICA IDENTITY FULL;
ALTER TABLE public.services REPLICA IDENTITY FULL;
ALTER TABLE public.products REPLICA IDENTITY FULL;
ALTER TABLE public.orders REPLICA IDENTITY FULL;
ALTER TABLE public.profiles REPLICA IDENTITY FULL;
