
-- Migration to add 'role' column to profiles table if it's missing
-- and set the default role for existing users

DO $$
BEGIN
    -- Check if column exists
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='role') THEN
        -- Add column
        ALTER TABLE public.profiles ADD COLUMN role text DEFAULT 'client' CHECK (role IN ('client', 'admin'));
    END IF;

    -- Update your specific user to admin immediately
    UPDATE public.profiles
    SET role = 'admin'
    WHERE email = 'optimum.tech.911@gmail.com';
END $$;
