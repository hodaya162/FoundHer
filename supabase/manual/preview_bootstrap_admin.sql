-- Run only in the foundher-preview project after the migration.
-- Replace both confirmation values below before running this script.
-- The script grants owner only to the exact matching Auth email.
do $$
declare
  required_project_ref constant text := 'eedufkhysjjjqryxxsog';
  confirmed_project_ref constant text := 'REPLACE_WITH_PROJECT_REF_FROM_CURRENT_DASHBOARD';
  expected_email constant text := lower(trim('REPLACE_WITH_AUTH_EMAIL'));
  candidate_count integer;
  candidate_id uuid;
begin
  if confirmed_project_ref <> required_project_ref then
    raise exception
      'Preview project confirmation failed. Expected project ref %, received %.',
      required_project_ref,
      confirmed_project_ref;
  end if;

  if expected_email = '' or expected_email = 'replace_with_auth_email' then
    raise exception 'Owner email was not configured. No admin was granted.';
  end if;

  select count(*), min(id)
  into candidate_count, candidate_id
  from auth.users
  where lower(trim(email)) = expected_email;

  if candidate_count <> 1 then
    raise exception
      'Expected exactly one Auth user matching %, found %. No admin was granted.',
      expected_email,
      candidate_count;
  end if;

  if exists (
    select 1
    from public.admin_users
    where role = 'owner' and user_id <> candidate_id
  ) then
    raise exception
      'A different owner already exists. No admin permissions were changed.';
  end if;

  insert into public.admin_users (user_id, role, active)
  values (candidate_id, 'owner', true)
  on conflict (user_id) do update
    set role = 'owner', active = true, updated_at = now();
end $$;

select au.user_id, au.role, au.active, u.email
from public.admin_users au
join auth.users u on u.id = au.user_id
where au.role = 'owner';

