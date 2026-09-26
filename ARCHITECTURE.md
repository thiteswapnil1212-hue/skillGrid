# SkillGrid — System Architecture

## 1. Overview

SkillGrid is a student productivity and social platform that helps students track academics, DSA practice, development projects, habits, and focus sessions while connecting with friends through study groups, challenges, and leaderboards.

### Architecture Goals

* Maintain a modular and scalable codebase.
* Keep UI components separate from business logic.
* Protect private student data.
* Enforce authorization on the server and database.
* Make future feature additions easy without major restructuring.
* Keep the MVP simple and cost-effective.

---

## 2. Technology Stack

| Layer           | Technology                                |
| --------------- | ----------------------------------------- |
| Frontend        | Next.js App Router                        |
| Language        | TypeScript                                |
| Styling         | Tailwind CSS                              |
| UI Components   | shadcn/ui                                 |
| Icons           | Lucide React                              |
| Backend         | Next.js Server Actions and Route Handlers |
| Database        | Supabase PostgreSQL                       |
| Authentication  | Supabase Auth                             |
| Authorization   | PostgreSQL Row Level Security (RLS)       |
| Form Validation | Zod                                       |
| Form Handling   | React Hook Form                           |
| Charts          | Recharts                                  |
| Date Handling   | date-fns                                  |
| Deployment      | Vercel                                    |
| Version Control | Git and GitHub                            |

Use stable, mutually compatible package versions. Avoid adding unnecessary dependencies.

---

## 3. High-Level Architecture

The application follows a modular full-stack architecture.

```text
                    Student / User
                          |
                          v
                  Next.js Application
                          |
              +-----------+-----------+
              |                       |
              v                       v
         UI Components          Server Layer
              |                       |
              |              +--------+--------+
              |              |                 |
              v              v                 v
          User Input     Server Actions    Route Handlers
                                 |                 |
                                 +--------+--------+
                                          |
                                          v
                                Service / Business Logic
                                          |
                                          v
                                Supabase PostgreSQL
                                          |
                                          v
                                   RLS Policies
```

### Data Flow

1. The user interacts with a page or component.
2. The application validates input using Zod.
3. Server Actions or Route Handlers handle protected mutations and API requests.
4. Business logic runs in the appropriate service module.
5. Supabase performs database operations.
6. PostgreSQL RLS policies enforce access restrictions.
7. The application returns the result and updates the UI.

---

## 4. Application Structure

Use the following directory structure:

```text
skillgrid/
├── public/
│   ├── images/
│   └── icons/
│
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   ├── signup/
│   │   │   ├── forgot-password/
│   │   │   └── layout.tsx
│   │   │
│   │   ├── (dashboard)/
│   │   │   ├── dashboard/
│   │   │   ├── tasks/
│   │   │   ├── academics/
│   │   │   ├── dsa/
│   │   │   ├── development/
│   │   │   ├── focus/
│   │   │   ├── habits/
│   │   │   ├── analytics/
│   │   │   ├── friends/
│   │   │   ├── groups/
│   │   │   ├── leaderboard/
│   │   │   ├── challenges/
│   │   │   ├── notifications/
│   │   │   ├── profile/
│   │   │   ├── settings/
│   │   │   └── layout.tsx
│   │   │
│   │   ├── api/
│   │   │   ├── health/
│   │   │   └── webhooks/
│   │   │
│   │   ├── auth/
│   │   │   └── callback/
│   │   │
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── error.tsx
│   │   ├── loading.tsx
│   │   └── not-found.tsx
│   │
│   ├── components/
│   │   ├── ui/
│   │   ├── layout/
│   │   ├── dashboard/
│   │   ├── tasks/
│   │   ├── academics/
│   │   ├── dsa/
│   │   ├── development/
│   │   ├── focus/
│   │   ├── habits/
│   │   ├── analytics/
│   │   ├── social/
│   │   └── shared/
│   │
│   ├── features/
│   │   ├── tasks/
│   │   │   ├── actions.ts
│   │   │   ├── queries.ts
│   │   │   ├── service.ts
│   │   │   ├── schema.ts
│   │   │   └── types.ts
│   │   ├── academics/
│   │   ├── dsa/
│   │   ├── development/
│   │   ├── focus/
│   │   ├── habits/
│   │   ├── analytics/
│   │   ├── friends/
│   │   ├── groups/
│   │   ├── leaderboard/
│   │   └── challenges/
│   │
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts
│   │   │   ├── server.ts
│   │   │   └── middleware.ts
│   │   ├── auth/
│   │   ├── validations/
│   │   ├── constants/
│   │   ├── utils/
│   │   └── date/
│   │
│   ├── hooks/
│   ├── types/
│   └── middleware.ts
│
├── supabase/
│   ├── migrations/
│   ├── seed.sql
│   └── config.toml
│
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
├── .env.example
├── .gitignore
├── components.json
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── tsconfig.json
├── README.md
├── req.md
├── UI_UX.md
└── ARCHITECTURE.md
```

---

## 5. Routing and Layout

### Public Routes

* `/` — Landing page
* `/login` — Login
* `/signup` — Registration
* `/forgot-password` — Password recovery

### Protected Routes

* `/dashboard`
* `/tasks`
* `/academics`
* `/dsa`
* `/development`
* `/focus`
* `/habits`
* `/analytics`
* `/friends`
* `/groups`
* `/leaderboard`
* `/challenges`
* `/notifications`
* `/profile`
* `/settings`

All protected routes must verify the authenticated user on the server.

Unauthenticated users attempting to access protected pages should be redirected to `/login`.

---

## 6. Feature Module Architecture

Each feature should have clearly separated responsibilities.

### Component Layer

Responsible for:

* Rendering UI.
* Handling user interactions.
* Displaying loading, empty, and error states.
* Calling the appropriate action or query.

### Schema Layer

Responsible for:

* Validating user input.
* Defining form schemas using Zod.
* Enforcing field types and constraints.

### Action Layer

Responsible for:

* Handling user-triggered mutations.
* Validating input.
* Checking authentication.
* Calling service functions.
* Returning structured results.

### Query Layer

Responsible for:

* Fetching feature-specific data.
* Applying filters, pagination, and sorting.
* Returning typed results.

### Service Layer

Responsible for:

* Business rules.
* Database operations.
* Reusable feature logic.
* Authorization checks where required.

### Types Layer

Responsible for:

* Feature-specific TypeScript types.
* Input and output types.
* Shared data contracts.

Do not place all application logic inside page components.

---

## 7. Authentication and Authorization

### Authentication

Use Supabase Auth for:

* Email and password registration.
* Login and logout.
* Session management.
* Password recovery.
* Email verification where configured.

### Authorization

* Every protected operation must verify the authenticated user.
* Users can access and modify only records they are authorized to access.
* Use PostgreSQL RLS policies as a database-level security layer.
* Never trust a user ID supplied by the client for authorization.
* Derive the authenticated user identity from the verified session.
* Validate ownership before updating or deleting records.
* Private profile data must not be exposed through public queries.

### Service Role Key

The Supabase service role key must never be exposed to browser-side code.

Use the public anon/publishable key for client-side Supabase initialization and rely on RLS for access control.

---

## 8. Database Integration

Use Supabase PostgreSQL as the primary database.

### Database Rules

* Use UUID primary keys for main entities.
* Add `created_at` and `updated_at` timestamps where appropriate.
* Use foreign keys to maintain relationships.
* Add indexes for frequently queried columns.
* Use database constraints to prevent invalid data.
* Store timestamps consistently and handle display time zones in the application.
* Use migrations for schema changes.
* Keep development seed data separate from production data.

The detailed schema, relationships, indexes, and RLS policies will be documented in `DATABASE.md`.

---

## 9. Business Logic and XP System

XP, levels, achievements, and leaderboard scores must be calculated on the server.

### XP Rules

* Clients must never directly set their own XP balance.
* XP must be awarded only for validated actions.
* Store XP changes in a ledger with the source action and timestamp.
* Prevent duplicate XP awards for the same qualifying event.
* Keep leaderboard totals derived from trusted records.
* Validate challenge completion before awarding rewards.
* Do not allow users to modify another user's XP or achievements.

---

## 10. State Management

Use the simplest suitable state management approach.

### Server State

Use Server Components and server-side queries for data that can be fetched on the server.

### Local UI State

Use React state for:

* Dialog visibility.
* Tabs and dropdowns.
* Temporary form interactions.
* Timer display state.
* Filters and other local controls.

### Shared State

Introduce a shared state library only if multiple components genuinely need synchronized client-side state.

Avoid storing duplicate copies of database data in global state.

---

## 11. Error Handling

Use consistent error handling across the application.

### Expected Errors

Examples:

* Invalid form input.
* Unauthenticated requests.
* Unauthorized access.
* Missing records.
* Duplicate records.
* Network failures.

### Error Handling Rules

* Return structured errors from Server Actions and Route Handlers.
* Display simple, user-friendly error messages.
* Log useful diagnostic information on the server.
* Never expose secrets, stack traces, or internal database details to users.
* Provide retry options for recoverable failures.
* Use loading, error, and empty states consistently.

---

## 12. Security Requirements

* Validate all incoming data on the server.
* Enforce RLS on all user-owned and private tables.
* Verify permissions for group and social operations.
* Prevent unauthorized access to private study data.
* Protect XP and leaderboard calculations from client manipulation.
* Keep secrets in environment variables.
* Avoid exposing sensitive information in logs.
* Use secure authentication and session handling.
* Apply rate limits to sensitive or abuse-prone endpoints where needed.
* Use database constraints and transactions for operations that require consistency.

---

## 13. Performance and Scalability

* Prefer Server Components for data-heavy pages.
* Use pagination for large lists.
* Add indexes based on actual query patterns.
* Avoid fetching unnecessary columns.
* Use caching only for data that can safely be shared or reused.
* Keep user-specific data out of shared caches.
* Use optimized images and lazy loading where appropriate.
* Avoid unnecessary client-side JavaScript.
* Monitor slow queries and application errors.
* Introduce background jobs only when a feature requires them.

---

## 14. Testing Strategy

### Unit Tests

Test isolated business logic, validation schemas, and utility functions.

### Integration Tests

Test database operations, authorization rules, and feature workflows.

### End-to-End Tests

Test important user journeys:

* Sign up and log in.
* Create and complete a task.
* Add academic subjects and units.
* Record DSA progress.
* Start and complete a focus session.
* Create a study group.
* Send and accept a friend request.

Security tests must verify that users cannot access or modify another user's private records.

---

## 15. Environment Configuration

Store configuration in environment variables.

Required variables:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

If the project uses a Supabase publishable key, configure the appropriate variable consistently.

Server-only secrets must use non-public environment variable names.

Never commit actual credentials to GitHub.

---

## 16. Deployment Architecture

### Development

* Run the Next.js application locally.
* Use a development Supabase project.
* Apply migrations before testing schema changes.

### Production

* Deploy the Next.js application on Vercel.
* Connect it to a production Supabase project.
* Configure production environment variables.
* Apply reviewed database migrations.
* Verify authentication redirects and RLS policies.
* Monitor deployment logs and database performance.

Keep development and production environments separate.

---

## 17. Development Principles

1. Build features in small, testable increments.
2. Follow the requirements in `req.md`.
3. Follow the visual rules in `UI_UX.md`.
4. Follow the database design in `DATABASE.md`.
5. Keep components reusable but avoid unnecessary abstraction.
6. Use TypeScript types consistently.
7. Never bypass authorization to make a feature work.
8. Do not introduce a new library without a clear need.
9. Test each feature before marking it complete.
10. Update documentation when architecture changes.

---

## 18. Architecture Completion Criteria

The architecture is considered implemented when:

* The application has a clear modular folder structure.
* Authentication and protected routing work correctly.
* Server-side operations validate input and authorization.
* Database access follows the defined security model.
* Feature modules follow consistent conventions.
* Errors are handled consistently.
* Environment variables are configured safely.
* The application can be deployed to the intended environments.
