-- Instantly campaign webhook events ingested by POST /api/webhooks/instantly.
-- Server-only: no public insert. Service role (SUPABASE_SECRET_KEY) in the
-- API route bypasses RLS — there is no anon-facing policy on purpose.
--
-- This project shares its Supabase instance with Levron Labs, which already
-- has its own `instantly_events` table (see that repo's
-- supabase/migrations/012_instantly_events.sql). This is levronpartners'
-- own copy so the two sites' outreach events don't mix in one table.

create table if not exists instantly_events (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  event_type text not null,
  occurred_at timestamptz,
  workspace text,
  campaign_id text,
  campaign_name text,
  lead_email text,
  email_account text,
  unibox_url text,
  step integer,
  reply_subject text,
  reply_text text,
  fingerprint text not null,
  payload jsonb not null default '{}'::jsonb
);

create unique index if not exists idx_instantly_events_fingerprint
  on instantly_events (fingerprint);

create index if not exists idx_instantly_events_created_at
  on instantly_events (created_at desc);

create index if not exists idx_instantly_events_lead_email
  on instantly_events (lead_email)
  where lead_email is not null;

create index if not exists idx_instantly_events_event_type
  on instantly_events (event_type);

create or replace function set_instantly_events_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_instantly_events_updated_at on instantly_events;

create trigger trg_instantly_events_updated_at
  before update on instantly_events
  for each row
  execute function set_instantly_events_updated_at();

alter table instantly_events enable row level security;

drop policy if exists "Service role full access" on instantly_events;

create policy "Service role full access"
  on instantly_events
  using (auth.role() = 'service_role');
