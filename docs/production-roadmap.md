# PawMatch — production roadmap

## Product target

One product across iPhone, Android and the web, with a shared React Native / Expo codebase. The web build is also the public discovery and shelter-onboarding surface.

## Architecture

- Client: Expo + React Native + Expo Router (universal iOS, Android and web routing).
- Backend: Supabase / PostgreSQL for Auth, database, Storage and server-side functions.
- Security: Row Level Security (RLS) on every exposed table. Shelter membership is separate from adopter accounts; only verified shelters can publish listings.
- Source control: GitHub (nojusdr-lab/myliu-tave).
- Mobile delivery: EAS Build / Submit. Web deployment will be configured after the first production-ready web build.

## Current state

- Existing Expo prototype retained.
- Initial Supabase schema and RLS migration added.
- Supabase client configuration is optional until project credentials are supplied.
- Demo animal and shelter data must not be represented as live or verified inventory.

## Milestones

1. Backend foundation: create Supabase project, apply migration, configure environment variables, test RLS.
2. Authentication: adopter sign-up/sign-in, profile editing, password recovery, account deletion.
3. Shelter onboarding: application, legal-entity verification, manager membership, staff invitations and role management.
4. Listings: create/edit/publish/archive animal profiles, photo upload, moderation, adopted-state handling.
5. Adoption workflow: enquiry forms, private applicant details, status changes, event history and email notifications.
6. Discovery: persistent favourites, filters, pagination, location and accessibility improvements.
7. Trust and safety: reporting, moderation queue, audit trail, GDPR requests, retention rules, privacy policy and terms.
8. Release: automated tests, crash/error monitoring, accessibility review, EAS development/production builds, TestFlight and Play internal testing.

## Security notes

- Never put a Supabase service-role or secret key in EXPO_PUBLIC variables or client code.
- The client may use only the Supabase publishable key; RLS is mandatory.
- Shelter members are created by a database trigger when a shelter application is submitted. Additional staff membership must be granted by a trusted admin workflow, not by an unrestricted client insert.
- Application event creation is reserved for trusted server-side workflows.
- Real shelter partnerships and real animal listings require direct verification before publication.

## Local setup

1. Install Node.js LTS.
2. Run npm install.
3. Copy .env.example to .env and fill in the Supabase project URL and publishable key when the project exists.
4. Run npx expo start.
