
-- Update a specific user's role to 'admin'
-- Replace 'optimum.tech.911@gmail.com' with the actual email if different

update public.profiles
set role = 'admin'
where email = 'optimum.tech.911@gmail.com';
