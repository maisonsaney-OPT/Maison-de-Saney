
-- To prevent Supabase projects from pausing (Free Tier limitation), you can set up a Cron Job
-- that pings your database periodically.

-- This requires the pg_cron extension.
create extension if not exists pg_cron;

-- Create a dummy table to update/select from to keep activity alive
create table if not exists public.keep_alive (
  id int primary key,
  last_ping timestamp with time zone
);

insert into public.keep_alive (id, last_ping) values (1, now()) on conflict (id) do nothing;

-- Schedule a cron job to run every day at midnight (or more frequently if needed)
-- Note: Free tier projects pause after 1 week of inactivity. A daily ping is sufficient.
select cron.schedule(
  'keep-project-alive', -- job name
  '0 0 * * *',          -- cron schedule (every day at midnight)
  $$ update public.keep_alive set last_ping = now() where id = 1 $$
);

-- Alternatively, you can use an external uptime monitor (like UptimeRobot) to ping your
-- Supabase project URL (https://ubmjgpmfrfkrhmnykqzj.supabase.co) periodically.
-- This is often more reliable as it generates network traffic.
