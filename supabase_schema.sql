-- ══════════════════════════════════════════════════════
-- SAHAJA FOOD — Supabase Schema
-- Run this in your Supabase SQL Editor
-- ══════════════════════════════════════════════════════

create table public.enquiries (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete set null,
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
-- alter table public.enquiries add column if not exists user_id uuid references auth.users(id) on delete set null;
--
-- The INSERT and SELECT policies below changed too (added user_id checks).
-- If they already exist from a prior run, drop and recreate them:
--   drop policy if exists "Anyone can submit enquiry" on public.enquiries;
--   drop policy if exists "Users can view their own enquiries" on public.enquiries;
-- then re-run the two `create policy` statements for them further down this file.

alter table public.enquiries enable row level security;

-- ── RLS POLICIES ────────────────────────────────────────────────────

-- Public: anyone can INSERT (enquiry form submissions), guest or signed-in.
-- Signed-in users may only attach their OWN user_id — this stops an
-- authenticated visitor from spoofing someone else's user_id and polluting
-- their "My Bookings" list with fake entries.
create policy "Anyone can submit enquiry"
  on public.enquiries for insert
  with check (user_id is null or auth.uid() = user_id);

-- Signed-in users: SELECT only their own enquiries (for the My Bookings page)
create policy "Users can view their own enquiries"
  on public.enquiries for select
  using (auth.uid() = user_id);

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
-- 3. Authentication > URL Configuration > Redirect URLs → Google sign-in
--    now also happens on /enquiry and /my-bookings (customer-facing, open
--    to any Google account), not just /admin. Either add each path:
--      https://sahaja.food/admin
--      https://sahaja.food/enquiry
--      https://sahaja.food/my-bookings
--    or add the wildcard https://sahaja.food/* to cover all current and
--    future pages in one entry. Add the http://localhost:5173/* equivalents
--    too if you want to test Google sign-in from a local dev server.
-- Admin panel access (nandinips90@gmail.com and foodssahaja@gmail.com only)
-- is enforced both client-side and by the admin RLS policies above. Any
-- Google account can sign in on /enquiry or /my-bookings to manage their
-- OWN bookings — that's by design (it's a customer account feature, not
-- an admin gate) — and the RLS "Users can view their own enquiries" policy
-- above ensures they only ever see their own rows.
