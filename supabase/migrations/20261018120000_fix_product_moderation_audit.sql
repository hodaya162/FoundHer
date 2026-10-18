-- Apply manually to foundher-preview only. Preserves all existing decisions.
-- A product row has no image_id field. Reading it through JSON safely returns
-- NULL for products and the stable image ID for image moderation changes.
begin;

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
      entity_type, source_id, external_product_id, image_id,
      previous_status, next_status, changed_by, changed_via
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

commit;
