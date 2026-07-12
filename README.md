# Sahaja Food Website

## Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Set environment variables
Copy `.env.example` to `.env.local` and fill in:
```
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
VITE_ADMIN_PASSWORD=your_admin_password
RESEND_API_KEY=re_...
ADMIN_EMAIL=hello@sahaja.food
```

### 3. Set up Supabase
Run `supabase_schema.sql` in your Supabase SQL editor.

### 4. Run locally
```bash
npm run dev
```

### 5. Deploy to Vercel
Push to GitHub → Import in Vercel → Add env vars → Deploy.
Vercel auto-deploys on every push to main.

## Pages
- `/` — Home
- `/menu` — Menu (Veg / Non-Veg tabs)
- `/about` — About page
- `/enquiry` — Booking enquiry form
- `/thank-you` — Post-submission confirmation
- `/admin` — Password-protected enquiry dashboard

## Admin Access

Two authorised admins: `nandinips90@gmail.com` and `nageshug@gmail.com`

Login flow: go to `/admin` → enter email → receive a 6-digit OTP to that email → enter code → access granted. No passwords to manage.

**Supabase setup for OTP:**
1. Dashboard → Authentication → Providers → Email → ensure **Enable Email Provider** is ON
2. Magic links are enabled by default — no extra config needed
3. The RLS policies in `supabase_schema.sql` restrict data access to only the two authorised emails

## Phone / WhatsApp
All references updated to: **+91 97319 10575**
