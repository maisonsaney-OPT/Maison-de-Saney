
-- Enable users to delete their own messages
DROP POLICY IF EXISTS "Users can delete own messages" ON public.messages;
CREATE POLICY "Users can delete own messages" ON public.messages FOR DELETE USING (
  email = (SELECT email FROM auth.users WHERE id = auth.uid())
);

-- Ensure users can see only their own messages (for privacy)
DROP POLICY IF EXISTS "Users view own messages" ON public.messages;
CREATE POLICY "Users view own messages" ON public.messages FOR SELECT USING (
  email = (SELECT email FROM auth.users WHERE id = auth.uid())
  OR 
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);
