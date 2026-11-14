# PawMatch 🐾

A Lithuanian-first animal adoption platform for iPhone, Android and the web.

## Stack

- Expo + React Native (shared iOS / Android / web app)
- Supabase + PostgreSQL (authentication, data, photo storage)
- GitHub for source control
- Expo Application Services (EAS) for mobile builds

## Current status

This repository contains an early UI prototype and the first production-backend foundation. It is **not yet a live adoption service**: no real user accounts, live shelter inventory, or adoption applications are active. Existing sample content must be treated as demo content until each shelter and listing has been verified.

## Run locally

```bash
npm install
npx expo start
```

Press `w` for web. For iPhone, use Expo Go during early development; a development build will be introduced as native functionality is added.

## Supabase setup

1. Create a Supabase project.
2. Apply supabase/migrations/202611140001_initial_schema.sql using the Supabase CLI or SQL Editor.
3. Copy .env.example to .env.
4. Set EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY.
5. Never put a service-role or secret key in the app.

See docs/production-roadmap.md for the architecture and release plan.

## Important

The database migration is an initial foundation and must be tested against a real Supabase project before production use. RLS policies, onboarding, storage policies, notification flows, legal documents and moderation workflows still need implementation and review.
