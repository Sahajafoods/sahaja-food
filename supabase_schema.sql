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
  event_time time not null,
  guest_count text not null,
  menu_preference text not null,
  location text,
  message text,
  status text default 'new' check (status in ('new', 'contacted', 'confirmed', 'closed')),
  created_at timestamptz default now()
);

-- ── MIGRATION (run this in the Supabase SQL Editor if the table already exists in production) ──
-- alter table public.enquiries add column event_time time not null default '12:00';
-- alter table public.enquiries alter column event_time drop default;
-- alter table public.enquiries alter column guest_count type text using guest_count::text;

alter table public.enquiries enable row level security;

-- ── RLS POLICIES ────────────────────────────────────────────────────

-- Public: anyone can INSERT (enquiry form submissions)
create policy "Anyone can submit enquiry"
  on public.enquiries for insert
  with check (true);

-- Admin only: SELECT — only nandinips90@gmail.com and foodssahaja@gmail.com
--
-- NOTE: this is intentionally scoped to the two admin emails, not just
-- `auth.role() = 'authenticated'`. Google OAuth sign-in is open to any
-- Google account — restricting the SELECT/UPDATE policies to `authenticated`
-- alone would let ANY signed-in Google user read every customer's name,
-- phone and address directly via the Supabase REST API, even though the
-- app's UI immediately signs out and blocks non-admin emails on the client.
-- RLS is the real security boundary; the client-side check is just UX.
create policy "Admin can view enquiries"
  on public.enquiries for select
  using (
    auth.jwt() ->> 'email' in ('nandinips90@gmail.com', 'foodssahaja@gmail.com')
  );

-- Admin only: UPDATE status
create policy "Admin can update status"
  on public.enquiries for update
  using (
    auth.jwt() ->> 'email' in ('nandinips90@gmail.com', 'foodssahaja@gmail.com')
  );

-- ── SUPABASE AUTH SETUP (do this in Dashboard) ──────────────────────
-- 1. Authentication > Providers > Google → Enable, and paste the OAuth
--    Client ID + Client Secret from a Google Cloud Console OAuth 2.0
--    Web application credential.
-- 2. In that same Google Cloud OAuth client, add this Authorized redirect URI:
--      https://<your-project-ref>.supabase.co/auth/v1/callback
--    (shown on the Supabase Google provider settings page)
-- 3. Authentication > URL Configuration > Redirect URLs → add:
--      https://sahaja.food/admin
--    Add http://localhost:5173/admin too if you want to test Google
--    sign-in from a local dev server.
-- Both nandinips90@gmail.com and foodssahaja@gmail.com can sign in via
-- Google. Any other Google account is signed out immediately by the app
-- and blocked from reading/writing enquiries by the RLS policies above.
