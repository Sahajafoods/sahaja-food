-- ══════════════════════════════════════════════════════
-- SAHAJA FOOD — Supabase Schema
-- Run this in your Supabase SQL Editor
-- ══════════════════════════════════════════════════════

create table public.enquiries (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  phone text not null,
  email text not null,
  event_type text not null,
  event_date date not null,
  guest_count integer not null,
  menu_preference text not null,
  location text,
  message text,
  status text default 'new' check (status in ('new', 'contacted', 'confirmed', 'closed')),
  created_at timestamptz default now()
);

alter table public.enquiries enable row level security;

-- ── RLS POLICIES ────────────────────────────────────────────────────

-- Public: anyone can INSERT (enquiry form submissions)
create policy "Anyone can submit enquiry"
  on public.enquiries for insert
  with check (true);

-- Admin only: SELECT — only nandinips90@gmail.com and nageshug@gmail.com
create policy "Admin can view enquiries"
  on public.enquiries for select
  using (
    auth.jwt() ->> 'email' in ('nandinips90@gmail.com', 'nageshug@gmail.com')
  );

-- Admin only: UPDATE status
create policy "Admin can update status"
  on public.enquiries for update
  using (
    auth.jwt() ->> 'email' in ('nandinips90@gmail.com', 'nageshug@gmail.com')
  );

-- ── SUPABASE AUTH SETUP (do this in Dashboard) ──────────────────────
-- Authentication > Providers > Email → Enable "Magic Link / OTP"
-- Authentication > Email Templates → customise if desired
-- No additional steps needed — OTP login is built into Supabase Auth by default.
-- Both nandinips90@gmail.com and nageshug@gmail.com can sign in via OTP.
-- The app blocks other emails before even calling Supabase.
