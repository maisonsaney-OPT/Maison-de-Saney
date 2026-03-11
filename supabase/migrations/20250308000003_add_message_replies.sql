
-- Migration to add reply capabilities to messages
ALTER TABLE public.messages ADD COLUMN IF NOT EXISTS admin_reply text;
ALTER TABLE public.messages ADD COLUMN IF NOT EXISTS reply_at timestamp with time zone;
