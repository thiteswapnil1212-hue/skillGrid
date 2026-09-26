# SkillGrid — Contribution Guidelines

## 1. Introduction

Welcome to SkillGrid!

SkillGrid is a student productivity platform designed to help students track academics, DSA practice, development projects, habits, and focus sessions while connecting with friends.

This document defines the coding standards, development workflow, and contribution guidelines for the project.

---

## 2. Documentation to Follow

Before implementing a feature, review the relevant documentation:

| File              | Purpose                         |
| ----------------- | ------------------------------- |
| `README.md`       | Project overview and setup      |
| `req.md`          | Product requirements            |
| `UI_UX.md`        | Design system and UI guidelines |
| `ARCHITECTURE.md` | Application architecture        |
| `DATABASE.md`     | Database schema and security    |
| `API.md`          | API conventions                 |
| `TASKS.md`        | Development roadmap             |
| `.env.example`    | Required environment variables  |

If implementation conflicts with documented requirements, resolve the conflict before proceeding.

---

## 3. Development Environment

### Prerequisites

* Node.js LTS compatible with the project.
* npm.
* Git.
* A Supabase account and development project.
* A code editor such as VS Code.

### Local Setup

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Create a local `.env.local` file.
4. Configure the required Supabase environment variables.
5. Apply the required database migrations.
6. Start the development server using `npm run dev`.

Do not commit `.env.local` or any file containing secrets.

---

## 4. Coding Standards

### TypeScript

* Use TypeScript for application code.
* Define explicit types for important data structures.
* Avoid `any` unless there is a clear and justified reason.
* Prefer type inference where it improves readability.
* Keep shared types in appropriate modules.
* Avoid duplicating type definitions.

### React and Next.js

* Use the App Router.
* Prefer Server Components by default.
* Use Client Components only when browser-side interactivity is needed.
* Keep components focused on a single responsibility.
* Extract reusable logic into hooks or service modules when appropriate.
* Avoid unnecessary client-side state.
* Use appropriate loading and error boundaries.

### Naming Conventions

| Item                 | Convention           | Example            |
| -------------------- | -------------------- | ------------------ |
| Components           | PascalCase           | `TaskCard.tsx`     |
| Hooks                | camelCase with `use` | `useFocusTimer.ts` |
| Functions            | camelCase            | `createTask()`     |
| Variables            | camelCase            | `taskList`         |
| Constants            | UPPER_SNAKE_CASE     | `MAX_PAGE_SIZE`    |
| Database tables      | snake_case           | `focus_sessions`   |
| Types and interfaces | PascalCase           | `TaskStatus`       |

### Component Guidelines

* Keep components small and readable.
* Use reusable UI components when appropriate.
* Avoid unnecessary duplication.
* Keep business logic out of presentation-only components.
* Use semantic HTML.
* Include accessible labels for form controls.
* Handle loading, empty, and error states.

---

## 5. Styling Guidelines

* Use Tailwind CSS for styling.
* Follow the color palette and typography in `UI_UX.md`.
* Use consistent spacing and component patterns.
* Avoid unnecessary gradients and decorative effects.
* Ensure responsive layouts.
* Maintain readable text and accessible contrast.
* Avoid adding global CSS rules when component-level styling is sufficient.
* Use the shared design system rather than creating unrelated styles for every page.

---

## 6. Database and Backend Guidelines

* Follow `DATABASE.md` for schema design.
* Follow `API.md` for server operation conventions.
* Use Supabase PostgreSQL as the primary database.
* Use migrations for schema changes.
* Enable RLS on private tables.
* Validate input using Zod on the server.
* Verify authentication and authorization before protected operations.
* Never trust client-submitted user IDs for ownership checks.
* Keep service role credentials server-side.
* Use transactions for operations requiring atomicity.
* Prevent duplicate XP rewards using database-enforced safeguards.

---

## 7. Git Workflow

### Branch Naming

Use descriptive branch names.

Examples:

* `feature/task-management`
* `feature/academic-tracker`
* `feature/focus-timer`
* `fix/auth-redirect`
* `docs/update-readme`

### Commit Message Convention

Use the following format:

`type: short description`

Supported types:

| Type       | Purpose                       |
| ---------- | ----------------------------- |
| `feat`     | New feature                   |
| `fix`      | Bug fix                       |
| `docs`     | Documentation                 |
| `style`    | Formatting or styling changes |
| `refactor` | Code restructuring            |
| `test`     | Tests                         |
| `chore`    | Maintenance                   |

Examples:

```bash
git add .
git commit -m "feat: add task management"
```

```bash
git add .
git commit -m "fix: correct authentication redirect"
```

```bash
git add .
git commit -m "docs: update project setup instructions"
```

### Git Rules

* Make small, focused commits.
* Do not commit secrets or generated build files.
* Review changes before committing.
* Avoid unrelated changes in a feature commit.
* Pull or fetch remote changes before pushing when necessary.
* Resolve merge conflicts carefully.
* Do not force-push shared branches without explicit agreement.

---

## 8. Feature Development Workflow

Follow this workflow for every feature:

1. Read the relevant documentation.
2. Inspect the existing codebase.
3. Identify the required files and dependencies.
4. Implement the smallest complete feature.
5. Validate input and enforce authorization.
6. Connect the feature to the database.
7. Add appropriate loading, empty, and error states.
8. Test the feature.
9. Run linting and type checks.
10. Review the changes.
11. Update `TASKS.md` after verification.
12. Commit the completed work.

Do not mark a feature complete if it only contains static UI or mock data.

---

## 9. Testing Guidelines

### Before Committing

Run the checks configured in the project.

Typical commands:

```bash
npm run lint
```

```bash
npx tsc --noEmit
```

```bash
npm run build
```

Run available tests:

```bash
npm test
```

Only run commands that are configured or supported by the project.

### Functional Testing

Verify:

* The feature works with valid input.
* Invalid input is rejected.
* Loading and error states work.
* Unauthorized access is blocked.
* Data persists correctly.
* Existing features are not broken.

### Security Testing

* Verify RLS policies.
* Test cross-user access restrictions.
* Verify ownership checks.
* Verify group permissions.
* Verify XP reward integrity.
* Check that secrets are not exposed.

---

## 10. AI Coding Tool Guidelines

AI coding tools may be used to implement features, but the generated code must be reviewed and tested.

### Before Coding

* Read the relevant project documentation.
* Inspect existing files and conventions.
* Understand the task and its acceptance criteria.
* Avoid rewriting unrelated code.

### During Coding

* Implement only the requested feature and necessary dependencies.
* Reuse existing components and utilities.
* Follow the existing architecture.
* Use real database operations for completed features.
* Add validation and authorization.
* Avoid unnecessary dependencies.
* Never hardcode secrets or credentials.

### After Coding

* Run relevant tests and checks.
* Fix errors before declaring the task complete.
* Report files changed.
* Report tests actually executed and their results.
* Mention any remaining limitations.
* Suggest a suitable Git commit message.

AI-generated code must not be considered correct merely because it compiles.

---

## 11. Pull Request Guidelines

Before submitting a pull request:

* Ensure the feature follows the documentation.
* Confirm that tests pass.
* Confirm that no secrets are included.
* Provide a clear description of the changes.
* Mention database migrations where applicable.
* Include screenshots for UI changes when useful.
* Document known limitations.

### Pull Request Template

```markdown
## Summary
Describe the changes.

## Related Task
Reference the relevant task in TASKS.md.

## Changes
- Change 1
- Change 2

## Testing
- [ ] Lint passed
- [ ] Type checks passed
- [ ] Tests passed
- [ ] Manual testing completed

## Screenshots
Add screenshots for UI changes if applicable.

## Notes
Mention any known limitations.
```

---

## 12. Security Guidelines

* Never commit API keys, passwords, or private credentials.
* Keep secrets in environment variables.
* Never expose service role keys to the browser.
* Validate all server-side inputs.
* Enforce authorization and RLS.
* Do not expose private user data.
* Do not bypass security checks to make a feature work.
* Report security issues responsibly.

---

## 13. Documentation Guidelines

Update documentation whenever a change affects:

* Product requirements.
* UI behavior.
* Application architecture.
* Database schema.
* API contracts.
* Development setup.
* Task completion status.

Keep documentation consistent with the actual implementation.

---

## 14. Definition of Done

A feature is complete when:

* It meets the acceptance criteria.
* It follows the documented architecture.
* Input validation is implemented.
* Authentication and authorization are enforced.
* Database operations work correctly.
* Loading, empty, and error states are handled.
* Relevant tests pass.
* No secrets are exposed.
* Documentation is updated where necessary.
* A suitable commit is created.

---

## 15. Final Principle

Build SkillGrid incrementally.

Prefer understandable, secure, tested code over unnecessary complexity. Every completed feature should work reliably, protect user data, and fit into the existing application architecture.
