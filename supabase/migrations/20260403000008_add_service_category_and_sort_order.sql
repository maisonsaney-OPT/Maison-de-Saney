alter table public.services
  add column if not exists category text,
  add column if not exists sort_order integer;

alter table public.formations
  add column if not exists sort_order integer;
