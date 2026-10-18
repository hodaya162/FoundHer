create type public.catalog_moderation_status as enum ('pending', 'approved', 'hidden');
create type public.catalog_admin_role as enum ('owner', 'content_manager');
create type public.catalog_audit_actor as enum ('admin_user', 'service_role', 'database');

create table public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role public.catalog_admin_role not null default 'content_manager',
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.catalog_product_moderation (
  source_id text not null,
  external_product_id text not null,
  status public.catalog_moderation_status not null default 'pending',
  first_seen_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now(),
  reviewed_at timestamptz,
  reviewed_by uuid references public.admin_users(user_id) on delete set null,
  primary key (source_id, external_product_id)
);

create table public.catalog_image_moderation (
  source_id text not null,
  external_product_id text not null,
  image_id text not null,
  image_url text not null,
  status public.catalog_moderation_status not null default 'pending',
  first_seen_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now(),
  reviewed_at timestamptz,
  reviewed_by uuid references public.admin_users(user_id) on delete set null,
  primary key (source_id, external_product_id, image_id),
  foreign key (source_id, external_product_id)
    references public.catalog_product_moderation(source_id, external_product_id)
    on delete cascade
);

create table public.catalog_moderation_audit (
  id bigint generated always as identity primary key,
  entity_type text not null check (entity_type in ('product', 'image')),
  source_id text not null,
  external_product_id text not null,
  image_id text,
  previous_status public.catalog_moderation_status,
  next_status public.catalog_moderation_status not null,
  changed_by uuid references public.admin_users(user_id) on delete set null,
  changed_via public.catalog_audit_actor not null,
  changed_at timestamptz not null default now()
);

create index catalog_product_moderation_status_idx
  on public.catalog_product_moderation(status);
create index catalog_image_moderation_product_status_idx
  on public.catalog_image_moderation(source_id, external_product_id, status);

create or replace function public.is_catalog_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.admin_users
    where user_id = auth.uid() and active = true
  );
$$;

create or replace function public.is_catalog_owner()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.admin_users
    where user_id = auth.uid() and role = 'owner' and active = true
  );
$$;

revoke all on function public.is_catalog_admin() from public;
revoke all on function public.is_catalog_owner() from public;
grant execute on function public.is_catalog_admin() to authenticated;
grant execute on function public.is_catalog_owner() to authenticated;

alter table public.admin_users enable row level security;
alter table public.catalog_product_moderation enable row level security;
alter table public.catalog_image_moderation enable row level security;
alter table public.catalog_moderation_audit enable row level security;

-- Every active admin may read only her own membership row.
create policy "admins can read their own membership"
  on public.admin_users for select to authenticated
  using (user_id = auth.uid() and active = true);

-- Owners may inspect all administrator memberships.
create policy "owners can read all admin memberships"
  on public.admin_users for select to authenticated
  using ((select public.is_catalog_owner()));

-- Both owner and content_manager may review catalog products and images.
create policy "catalog admins can read product moderation"
  on public.catalog_product_moderation for select to authenticated
  using ((select public.is_catalog_admin()));
create policy "catalog admins can update product moderation"
  on public.catalog_product_moderation for update to authenticated
  using ((select public.is_catalog_admin()))
  with check ((select public.is_catalog_admin()));

create policy "catalog admins can read image moderation"
  on public.catalog_image_moderation for select to authenticated
  using ((select public.is_catalog_admin()));
create policy "catalog admins can update image moderation"
  on public.catalog_image_moderation for update to authenticated
  using ((select public.is_catalog_admin()))
  with check ((select public.is_catalog_admin()));

create policy "catalog admins can read audit history"
  on public.catalog_moderation_audit for select to authenticated
  using ((select public.is_catalog_admin()));

-- Role changes are possible only through this owner-checked function.
create or replace function public.manage_catalog_admin(
  target_user_id uuid,
  target_role public.catalog_admin_role,
  target_active boolean default true
)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  target_is_last_owner boolean;
begin
  if auth.uid() is null or not public.is_catalog_owner() then
    raise exception 'Only an active owner may manage administrator roles.'
      using errcode = '42501';
  end if;

  if not exists (select 1 from auth.users where id = target_user_id) then
    raise exception 'The target Auth user does not exist.'
      using errcode = '22023';
  end if;

  select exists (
    select 1
    from public.admin_users
    where user_id = target_user_id
      and role = 'owner'
      and active = true
      and (
        select count(*)
        from public.admin_users
        where role = 'owner' and active = true
      ) = 1
  )
  into target_is_last_owner;

  if target_is_last_owner and (target_role <> 'owner' or target_active = false) then
    raise exception 'The final active owner cannot be demoted or deactivated.'
      using errcode = '42501';
  end if;

  insert into public.admin_users (user_id, role, active)
  values (target_user_id, target_role, target_active)
  on conflict (user_id) do update
    set role = excluded.role,
        active = excluded.active,
        updated_at = now();
end;
$$;

revoke all
  on function public.manage_catalog_admin(uuid, public.catalog_admin_role, boolean)
  from public;
grant execute
  on function public.manage_catalog_admin(uuid, public.catalog_admin_role, boolean)
  to authenticated;

-- reviewed_by/reviewed_at are derived by the database and cannot be forged.
create or replace function public.protect_catalog_review_metadata()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if old.status is distinct from new.status then
    if auth.role() = 'service_role' then
      new.reviewed_by := null;
    elsif auth.uid() is not null and public.is_catalog_admin() then
      new.reviewed_by := auth.uid();
    else
      raise exception 'A catalog status may be changed only by an active admin or service role.'
        using errcode = '42501';
    end if;

    new.reviewed_at := now();
  else
    new.reviewed_by := old.reviewed_by;
    new.reviewed_at := old.reviewed_at;
  end if;

  return new;
end;
$$;

revoke all on function public.protect_catalog_review_metadata() from public;

create trigger catalog_product_review_metadata_trigger
before update on public.catalog_product_moderation
for each row execute function public.protect_catalog_review_metadata();

create trigger catalog_image_review_metadata_trigger
before update on public.catalog_image_moderation
for each row execute function public.protect_catalog_review_metadata();

create or replace function public.record_catalog_moderation_change()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  actor_id uuid;
  actor_kind public.catalog_audit_actor;
begin
  if old.status is distinct from new.status then
    if auth.role() = 'service_role' then
      actor_id := null;
      actor_kind := 'service_role';
    elsif auth.uid() is not null then
      actor_id := auth.uid();
      actor_kind := 'admin_user';
    else
      actor_id := null;
      actor_kind := 'database';
    end if;

    insert into public.catalog_moderation_audit (
      entity_type,
      source_id,
      external_product_id,
      image_id,
      previous_status,
      next_status,
      changed_by,
      changed_via
    ) values (
      case when tg_table_name = 'catalog_image_moderation' then 'image' else 'product' end,
      new.source_id,
      new.external_product_id,
      to_jsonb(new)->>'image_id',
      old.status,
      new.status,
      actor_id,
      actor_kind
    );
  end if;
  return new;
end;
$$;

revoke all on function public.record_catalog_moderation_change() from public;

create trigger catalog_product_moderation_audit_trigger
after update on public.catalog_product_moderation
for each row execute function public.record_catalog_moderation_change();

create trigger catalog_image_moderation_audit_trigger
after update on public.catalog_image_moderation
for each row execute function public.record_catalog_moderation_change();

create or replace function public.sync_catalog_moderation(
  products_payload jsonb,
  images_payload jsonb
)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.catalog_product_moderation (
    source_id,
    external_product_id,
    status,
    first_seen_at,
    last_seen_at
  )
  select
    item->>'source_id',
    item->>'external_product_id',
    'pending'::public.catalog_moderation_status,
    now(),
    now()
  from jsonb_array_elements(products_payload) item
  where nullif(item->>'source_id', '') is not null
    and nullif(item->>'external_product_id', '') is not null
  on conflict (source_id, external_product_id)
  do update set last_seen_at = excluded.last_seen_at;

  insert into public.catalog_image_moderation (
    source_id,
    external_product_id,
    image_id,
    image_url,
    status,
    first_seen_at,
    last_seen_at
  )
  select
    item->>'source_id',
    item->>'external_product_id',
    item->>'image_id',
    item->>'image_url',
    'pending'::public.catalog_moderation_status,
    now(),
    now()
  from jsonb_array_elements(images_payload) item
  where nullif(item->>'source_id', '') is not null
    and nullif(item->>'external_product_id', '') is not null
    and nullif(item->>'image_id', '') is not null
    and nullif(item->>'image_url', '') is not null
  on conflict (source_id, external_product_id, image_id)
  do update set
    image_url = excluded.image_url,
    last_seen_at = excluded.last_seen_at;
end;
$$;

revoke all on function public.sync_catalog_moderation(jsonb, jsonb)
  from public, anon, authenticated;
grant execute on function public.sync_catalog_moderation(jsonb, jsonb)
  to service_role;

-- Explicit table privileges. RLS remains the final row-level gate.
revoke all on public.admin_users
  from anon, authenticated;
revoke all on public.catalog_product_moderation
  from anon, authenticated;
revoke all on public.catalog_image_moderation
  from anon, authenticated;
revoke all on public.catalog_moderation_audit
  from anon, authenticated, service_role;

revoke all on public.admin_users
  from service_role;
revoke all on public.catalog_product_moderation
  from service_role;
revoke all on public.catalog_image_moderation
  from service_role;

grant select on public.admin_users to authenticated;
grant select on public.catalog_product_moderation to authenticated;
grant select on public.catalog_image_moderation to authenticated;
grant select on public.catalog_moderation_audit to authenticated;
grant update (status) on public.catalog_product_moderation to authenticated;
grant update (status) on public.catalog_image_moderation to authenticated;

-- The server secret may read moderation state, but writes only through sync_catalog_moderation.
grant select on public.catalog_product_moderation to service_role;
grant select on public.catalog_image_moderation to service_role;
grant select on public.catalog_moderation_audit to service_role;
