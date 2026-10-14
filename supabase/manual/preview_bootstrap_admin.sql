-- Run only in the foundher-preview project after the migration.
-- This block refuses to choose an identity unless exactly one Auth user exists.
do $$
declare
  candidate_count integer;
  candidate_id uuid;
begin
  select count(*), min(id)
  into candidate_count, candidate_id
  from auth.users;

  if candidate_count <> 1 then
    raise exception 'Expected exactly one Auth user, found %. No admin was granted.', candidate_count;
  end if;

  insert into public.admin_users (user_id, role, active)
  values (candidate_id, 'owner', true)
  on conflict (user_id) do update
    set role = 'owner', active = true, updated_at = now();
end $$;

select au.user_id, au.role, au.active, u.email
from public.admin_users au
join auth.users u on u.id = au.user_id;

