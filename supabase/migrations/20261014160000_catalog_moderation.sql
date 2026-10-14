create type public.catalog_moderation_status as enum ('pending', 'approved', 'hidden');
create type public.catalog_admin_role as enum ('owner', 'content_manager');

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
  changed_at timestamptz not null default now()
);

create index catalog_product_moderation_status_idx
  on public.catalog_product_moderation(status);
create index catalog_image_moderation_product_status_idx
  on public.catalog_image_moderation(source_id, external_product_id, status);

create or replace function public.is_catalog_admin(candidate uuid default auth.uid())
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.admin_users
    where user_id = candidate and active = true
  );
$$;

revoke all on function public.is_catalog_admin(uuid) from public;
grant execute on function public.is_catalog_admin(uuid) to authenticated, service_role;

alter table public.admin_users enable row level security;
alter table public.catalog_product_moderation enable row level security;
alter table public.catalog_image_moderation enable row level security;
alter table public.catalog_moderation_audit enable row level security;

create policy "catalog admins can read admin users"
  on public.admin_users for select to authenticated
  using ((select public.is_catalog_admin()));

create policy "catalog admins can read product moderation"
  on public.catalog_product_moderation for select to authenticated
  using ((select public.is_catalog_admin()));
create policy "catalog admins can insert product moderation"
  on public.catalog_product_moderation for insert to authenticated
  with check ((select public.is_catalog_admin()));
create policy "catalog admins can update product moderation"
  on public.catalog_product_moderation for update to authenticated
  using ((select public.is_catalog_admin()))
  with check ((select public.is_catalog_admin()));

create policy "catalog admins can read image moderation"
  on public.catalog_image_moderation for select to authenticated
  using ((select public.is_catalog_admin()));
create policy "catalog admins can insert image moderation"
  on public.catalog_image_moderation for insert to authenticated
  with check ((select public.is_catalog_admin()));
create policy "catalog admins can update image moderation"
  on public.catalog_image_moderation for update to authenticated
  using ((select public.is_catalog_admin()))
  with check ((select public.is_catalog_admin()));

create policy "catalog admins can read audit history"
  on public.catalog_moderation_audit for select to authenticated
  using ((select public.is_catalog_admin()));

create or replace function public.record_catalog_moderation_change()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if old.status is distinct from new.status then
    insert into public.catalog_moderation_audit (
      entity_type,
      source_id,
      external_product_id,
      image_id,
      previous_status,
      next_status,
      changed_by
    ) values (
      case when tg_table_name = 'catalog_image_moderation' then 'image' else 'product' end,
      new.source_id,
      new.external_product_id,
      case when tg_table_name = 'catalog_image_moderation' then new.image_id else null end,
      old.status,
      new.status,
      new.reviewed_by
    );
  end if;
  return new;
end;
$$;

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
  on conflict (source_id, external_product_id, image_id)
  do update set
    image_url = excluded.image_url,
    last_seen_at = excluded.last_seen_at;
end;
$$;

revoke all on function public.sync_catalog_moderation(jsonb, jsonb) from public, anon, authenticated;
grant execute on function public.sync_catalog_moderation(jsonb, jsonb) to service_role;

revoke all on public.admin_users from anon;
revoke all on public.catalog_product_moderation from anon;
revoke all on public.catalog_image_moderation from anon;
revoke all on public.catalog_moderation_audit from anon;

