# Premium Ballers Website (Option B)
This is a production-ready starter for:
- Public tryout info + registration (Ages 6–17, $10 fee)
- Supabase Postgres database
- Admin login + registrations dashboard (export CSV)
- Stripe Checkout + webhook to mark paid
- Resend email confirmation after payment
- Public landing page: /february-tryouts

## What you need
- Node.js 18+ (recommended)
- A Supabase project
- Stripe account (test keys fine to start)
- Resend account + verified sending domain (or use Resend sandbox)

## Setup
1) Install dependencies:
   npm install

2) Create `.env.local` in the project root (copy from `.env.example`)

3) In Supabase SQL Editor, run:
   - `supabase/schema.sql`

4) Start dev server:
   npm run dev

Open: http://localhost:3000

## Deployment
Deploy to Vercel:
- Import the repo
- Add the same environment variables in Vercel Project Settings
- Set Stripe webhook endpoint to:
  https://YOURDOMAIN.com/api/stripe/webhook

## Notes
- Gym location is currently "TBA" by default and shown publicly.
- Tryout events are seeded for Feb 7 and Feb 21, 2026. Update in Supabase table `tryout_events`.
