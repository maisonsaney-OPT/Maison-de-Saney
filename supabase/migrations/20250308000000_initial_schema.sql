
-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- 1. Profiles Table (Linked to Auth)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text,
  full_name text,
  role text default 'client' check (role in ('client', 'admin')),
  phone text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Services Table
create table if not exists public.services (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  benefits text[], -- Array of strings
  duration text,
  price text,
  icon_name text,
  image_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Products Table
create table if not exists public.products (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  description text,
  price numeric not null,
  category text,
  image_url text,
  stock_count integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Gallery Table
create table if not exists public.gallery (
  id uuid default uuid_generate_v4() primary key,
  image_url text not null,
  category text default 'General',
  title text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. Formations Table
create table if not exists public.formations (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  price numeric,
  duration text,
  image_url text,
  program text[],
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. Orders Table
create table if not exists public.orders (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete set null,
  status text default 'pending' check (status in ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
  total_amount numeric not null,
  items jsonb not null, -- Stores snapshot of cart items
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 7. Questionnaires Table
create table if not exists public.questionnaires (
  id uuid default uuid_generate_v4() primary key,
  formation_id uuid references public.formations(id) on delete set null,
  user_id uuid references public.profiles(id) on delete set null,
  user_name text,
  user_email text,
  answers jsonb not null,
  submitted_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 8. Messages Table
create table if not exists public.messages (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  email text not null,
  subject text,
  message text not null,
  is_read boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.profiles enable row level security;
alter table public.services enable row level security;
alter table public.products enable row level security;
alter table public.gallery enable row level security;
alter table public.formations enable row level security;
alter table public.orders enable row level security;
alter table public.questionnaires enable row level security;
alter table public.messages enable row level security;

-- Policies

-- Profiles: Users can view/edit their own. Admins can view all.
create policy "Public profiles are viewable by everyone" on public.profiles for select using (true);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);

-- Services/Products/Gallery/Formations: Public read, Admin write
create policy "Public read services" on public.services for select using (true);
create policy "Admin write services" on public.services for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

create policy "Public read products" on public.products for select using (true);
create policy "Admin write products" on public.products for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

create policy "Public read gallery" on public.gallery for select using (true);
create policy "Admin write gallery" on public.gallery for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

create policy "Public read formations" on public.formations for select using (true);
create policy "Admin write formations" on public.formations for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- Orders: Users read own, Admins read all. Users create own.
create policy "Users can view own orders" on public.orders for select using (
  auth.uid() = user_id or exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);
create policy "Users can create orders" on public.orders for insert with check (auth.uid() = user_id);
create policy "Admins can update orders" on public.orders for update using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- Questionnaires: Public insert (submissions), Admin read all.
create policy "Admins view questionnaires" on public.questionnaires for select using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);
create policy "Public insert questionnaires" on public.questionnaires for insert with check (true);

-- Messages: Public insert, Admin read/update.
create policy "Admins view messages" on public.messages for select using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);
create policy "Public insert messages" on public.messages for insert with check (true);
create policy "Admins update messages" on public.messages for update using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- Function to handle new user creation
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', 'client');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger for new user creation
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Storage Buckets Setup (You might need to run this manually in dashboard if SQL fails for buckets)
insert into storage.buckets (id, name, public) values ('images', 'images', true) on conflict do nothing;

-- Storage Policies
create policy "Public Access" on storage.objects for select using ( bucket_id = 'images' );
create policy "Admin Insert" on storage.objects for insert with check (
  bucket_id = 'images' and exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);
create policy "Admin Update" on storage.objects for update using (
  bucket_id = 'images' and exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);
create policy "Admin Delete" on storage.objects for delete using (
  bucket_id = 'images' and exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- Keep Alive Table
create extension if not exists pg_cron;
create table if not exists public.keep_alive (
  id int primary key,
  last_ping timestamp with time zone
);
insert into public.keep_alive (id, last_ping) values (1, now()) on conflict (id) do nothing;
select cron.schedule(
  'keep-project-alive', -- job name
  '0 0 * * *',          -- cron schedule (every day at midnight)
  $$ update public.keep_alive set last_ping = now() where id = 1 $$
);
