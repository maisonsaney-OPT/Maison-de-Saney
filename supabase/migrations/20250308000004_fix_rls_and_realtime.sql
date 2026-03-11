
-- Migration to fix RLS policies and enable Realtime for messages and other tables

-- 1. Add DELETE policy for admins on messages (it was missing)
DROP POLICY IF EXISTS "Admins delete messages" ON public.messages;
CREATE POLICY "Admins delete messages" ON public.messages FOR DELETE USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- 2. Add DELETE policies for other admin-managed tables while we're at it
DROP POLICY IF EXISTS "Admin delete services" ON public.services;
CREATE POLICY "Admin delete services" ON public.services FOR DELETE USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

DROP POLICY IF EXISTS "Admin delete products" ON public.products;
CREATE POLICY "Admin delete products" ON public.products FOR DELETE USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

DROP POLICY IF EXISTS "Admin delete gallery" ON public.gallery;
CREATE POLICY "Admin delete gallery" ON public.gallery FOR DELETE USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

DROP POLICY IF EXISTS "Admin delete formations" ON public.formations;
CREATE POLICY "Admin delete formations" ON public.formations FOR DELETE USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- 3. Enable Realtime for all tables by adding them to the publication
-- This is how Supabase enables the "Realtime" toggle via SQL
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.services;
ALTER PUBLICATION supabase_realtime ADD TABLE public.products;
ALTER PUBLICATION supabase_realtime ADD TABLE public.gallery;
ALTER PUBLICATION supabase_realtime ADD TABLE public.formations;
ALTER PUBLICATION supabase_realtime ADD TABLE public.orders;
ALTER PUBLICATION supabase_realtime ADD TABLE public.profiles;
ALTER PUBLICATION supabase_realtime ADD TABLE public.questionnaires;
