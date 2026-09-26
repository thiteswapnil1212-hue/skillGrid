# SkillGrid — Development Roadmap

## 1. Project Overview

**Project:** SkillGrid
**Tagline:** Track your progress. Build your future.

SkillGrid is a student productivity platform for tracking academics, DSA, development projects, focus sessions, habits, and social learning activities.

### Development Principles

* Follow `req.md` for product requirements.
* Follow `UI_UX.md` for design and interface guidelines.
* Follow `ARCHITECTURE.md` for application structure.
* Follow `DATABASE.md` for database schema and security.
* Follow `API.md` for API conventions.
* Build one feature at a time.
* Test each feature before marking it complete.
* Do not use mock data in production features.
* Keep all private data protected.
* Commit completed milestones to Git.

---

## 2. Task Status Convention

Use the following status labels:

* `[ ]` Not started
* `[x]` Completed

A task is complete only when its implementation has been tested and meets its acceptance criteria.

---

# Phase 0 — Project Setup

## 0.1 Repository and Environment

* [ ] Verify the Git repository and project root.
* [ ] Initialize the Next.js App Router project.
* [ ] Configure TypeScript.
* [ ] Configure Tailwind CSS.
* [ ] Install and configure shadcn/ui.
* [ ] Configure Lucide React.
* [ ] Configure ESLint.
* [ ] Configure Prettier if needed.
* [ ] Create `.gitignore`.
* [ ] Create `.env.example`.
* [ ] Verify the application runs locally.
* [ ] Verify the production build succeeds.

## 0.2 Supabase Setup

* [ ] Create a Supabase project.
* [ ] Configure environment variables.
* [ ] Install the Supabase client libraries.
* [ ] Create browser and server Supabase clients.
* [ ] Configure authentication session handling.
* [ ] Configure database migrations.
* [ ] Verify database connectivity.
* [ ] Create a development environment separate from production.

**Acceptance criteria:**

* The application runs locally.
* Supabase connectivity works.
* No secrets are committed to GitHub.

---

# Phase 1 — Core Personal Tracker

## 1.1 Authentication

* [ ] Create the login page.
* [ ] Create the signup page.
* [ ] Create the forgot-password page.
* [ ] Implement registration with Supabase Auth.
* [ ] Implement login.
* [ ] Implement logout.
* [ ] Implement password recovery.
* [ ] Handle authentication callbacks.
* [ ] Create the profile automatically after registration.
* [ ] Add protected route handling.
* [ ] Add loading and error states.
* [ ] Test unauthorized access.

**Acceptance criteria:**

* Users can register, log in, and log out.
* Protected routes require authentication.
* Users cannot access another user's private data.

## 1.2 Application Layout

* [ ] Create the main application shell.
* [ ] Build the sidebar navigation.
* [ ] Build the mobile navigation.
* [ ] Create the page header.
* [ ] Create the reusable page container.
* [ ] Create reusable cards and buttons.
* [ ] Create reusable dialog and form components.
* [ ] Create loading skeletons.
* [ ] Create empty states.
* [ ] Create error states.
* [ ] Implement responsive layouts.

**Acceptance criteria:**

* All protected pages use a consistent layout.
* Navigation works on desktop and mobile.
* UI follows `UI_UX.md`.

## 1.3 Dashboard

* [ ] Create the dashboard page.
* [ ] Display a personalized greeting.
* [ ] Display today's tasks.
* [ ] Display academic progress.
* [ ] Display DSA statistics.
* [ ] Display focus-time summary.
* [ ] Display habit completion.
* [ ] Display recent activity.
* [ ] Add quick-action buttons.
* [ ] Connect dashboard widgets to real database data.
* [ ] Add loading, empty, and error states.

**Acceptance criteria:**

* Dashboard data belongs to the authenticated user.
* Summary values are calculated from real records.

## 1.4 Task Management

* [ ] Create the tasks page.
* [ ] Implement task creation.
* [ ] Implement task editing.
* [ ] Implement task deletion.
* [ ] Implement task completion.
* [ ] Add task categories.
* [ ] Add priority levels.
* [ ] Add due dates.
* [ ] Add status filters.
* [ ] Add category filters.
* [ ] Add search.
* [ ] Add sorting.
* [ ] Add pagination if needed.
* [ ] Display overdue tasks.
* [ ] Connect tasks to the database.
* [ ] Test ownership and authorization.

**Acceptance criteria:**

* Users can manage their own tasks.
* Filters and sorting work correctly.
* Invalid data is rejected.

## 1.5 Academic Tracker

* [ ] Create the academics page.
* [ ] Implement semester creation and editing.
* [ ] Implement subject creation and editing.
* [ ] Implement unit creation and editing.
* [ ] Implement unit completion tracking.
* [ ] Implement progress percentage tracking.
* [ ] Implement assessment creation.
* [ ] Implement assessment editing and deletion.
* [ ] Track exam dates.
* [ ] Track maximum and obtained marks.
* [ ] Display subject-wise progress.
* [ ] Display semester-wise progress.
* [ ] Connect academic tasks to the task tracker.
* [ ] Add validation for academic records.
* [ ] Test parent-child ownership.

**Acceptance criteria:**

* Users can manage semesters, subjects, units, and assessments.
* Progress calculations are accurate.
* Academic records remain private by default.

## 1.6 DSA Tracker

* [ ] Create the DSA tracker page.
* [ ] Implement problem creation.
* [ ] Implement problem editing and deletion.
* [ ] Track problem platform.
* [ ] Track problem difficulty.
* [ ] Track problem topics.
* [ ] Track problem-solving status.
* [ ] Add topic filters.
* [ ] Add difficulty filters.
* [ ] Add status filters.
* [ ] Add search.
* [ ] Implement revision history.
* [ ] Display total solved problems.
* [ ] Display difficulty-wise statistics.
* [ ] Display topic-wise progress.
* [ ] Add external problem links.
* [ ] Connect the tracker to the database.

**Acceptance criteria:**

* Users can track their own problems and revisions.
* Statistics reflect actual stored records.

## 1.7 Focus Timer

* [ ] Create the focus page.
* [ ] Implement a configurable focus timer.
* [ ] Implement short breaks.
* [ ] Implement long breaks.
* [ ] Implement start, pause, resume, and stop controls.
* [ ] Allow linking a session to a task.
* [ ] Record completed sessions.
* [ ] Record interrupted sessions.
* [ ] Display daily focus time.
* [ ] Display session history.
* [ ] Handle timer state safely across navigation.
* [ ] Prevent invalid session records.
* [ ] Test session ownership.

**Acceptance criteria:**

* Focus sessions are recorded accurately.
* Timer controls work correctly.
* Users can access only their own session history.

---

# Phase 2 — Personal Growth and Analytics

## 2.1 Development Projects

* [ ] Create the development projects page.
* [ ] Implement project creation.
* [ ] Implement project editing and deletion.
* [ ] Track project status.
* [ ] Add repository URLs.
* [ ] Add live deployment URLs.
* [ ] Add project milestones.
* [ ] Track milestone completion.
* [ ] Display project progress.
* [ ] Add project filters.
* [ ] Connect projects to the database.

**Acceptance criteria:**

* Users can track their own projects and milestones.

## 2.2 Skills Tracker

* [ ] Create the skills page.
* [ ] Implement skill creation.
* [ ] Implement skill editing and deletion.
* [ ] Add skill categories.
* [ ] Track proficiency levels.
* [ ] Track skill progress.
* [ ] Display skill progress cards.
* [ ] Connect skills to the database.

**Acceptance criteria:**

* Users can manage their own skills and progress.

## 2.3 Habit Tracker

* [ ] Create the habits page.
* [ ] Implement habit creation.
* [ ] Implement habit editing and deletion.
* [ ] Add daily and weekly frequencies.
* [ ] Implement habit completion logs.
* [ ] Display daily habit status.
* [ ] Calculate completion streaks.
* [ ] Display completion history.
* [ ] Add habit filters.
* [ ] Connect habits to the database.
* [ ] Test date and time-zone handling.

**Acceptance criteria:**

* Habit logs are accurate.
* Streaks use consistent date boundaries.

## 2.4 Analytics

* [ ] Create the analytics page.
* [ ] Display task completion statistics.
* [ ] Display academic progress charts.
* [ ] Display DSA problem statistics.
* [ ] Display focus-time charts.
* [ ] Display habit completion statistics.
* [ ] Display project progress.
* [ ] Add weekly analytics.
* [ ] Add monthly analytics.
* [ ] Add date-range filters.
* [ ] Connect charts to real database queries.
* [ ] Validate calculations.

**Acceptance criteria:**

* Analytics use real user data.
* Date filters and totals work correctly.

---

# Phase 3 — Social Features

## 3.1 User Profiles

* [ ] Create the public profile page.
* [ ] Implement profile editing.
* [ ] Add profile pictures.
* [ ] Add username uniqueness validation.
* [ ] Add privacy settings.
* [ ] Display only permitted public information.
* [ ] Test private profile access.

## 3.2 Friends

* [ ] Create the friends page.
* [ ] Implement user search.
* [ ] Implement friend requests.
* [ ] Implement request acceptance.
* [ ] Implement request rejection.
* [ ] Implement request cancellation.
* [ ] Display incoming requests.
* [ ] Display outgoing requests.
* [ ] Display accepted friends.
* [ ] Implement friend removal.
* [ ] Add appropriate notifications.
* [ ] Test duplicate request prevention.
* [ ] Test authorization.

## 3.3 Study Groups

* [ ] Create the groups page.
* [ ] Implement group creation.
* [ ] Implement group editing.
* [ ] Implement group deletion.
* [ ] Implement public and private groups.
* [ ] Implement joining and leaving groups.
* [ ] Implement invitation codes.
* [ ] Implement group membership roles.
* [ ] Display group members.
* [ ] Implement group tasks.
* [ ] Implement task assignment.
* [ ] Add group activity.
* [ ] Test group permissions.

## 3.4 Shared Goals

* [ ] Implement shared goal creation.
* [ ] Implement goal editing.
* [ ] Implement goal progress tracking.
* [ ] Support group-associated goals.
* [ ] Display goal completion.
* [ ] Validate goal progress.
* [ ] Test access permissions.

## 3.5 Challenges

* [ ] Create the challenges page.
* [ ] Implement challenge creation.
* [ ] Implement challenge participation.
* [ ] Implement challenge progress tracking.
* [ ] Display active challenges.
* [ ] Display completed challenges.
* [ ] Validate challenge completion.
* [ ] Prevent duplicate participation.
* [ ] Add challenge notifications.
* [ ] Test reward validation.

## 3.6 Leaderboards

* [ ] Create the leaderboard page.
* [ ] Implement friends leaderboard.
* [ ] Implement group leaderboard.
* [ ] Implement college leaderboard.
* [ ] Implement global leaderboard.
* [ ] Add weekly filters.
* [ ] Add monthly filters.
* [ ] Add all-time filters.
* [ ] Implement pagination.
* [ ] Apply privacy settings.
* [ ] Test leaderboard calculations.

## 3.7 Notifications

* [ ] Create the notifications page.
* [ ] Implement notification creation.
* [ ] Display notifications.
* [ ] Implement mark-as-read.
* [ ] Implement mark-all-as-read.
* [ ] Add notification categories.
* [ ] Add notification links to related pages.
* [ ] Test notification ownership.

---

# Phase 4 — Gamification

## 4.1 XP System

* [ ] Define XP reward rules.
* [ ] Implement the XP ledger.
* [ ] Award XP for validated qualifying actions.
* [ ] Prevent duplicate XP awards.
* [ ] Display XP totals.
* [ ] Implement level calculations.
* [ ] Display level progress.
* [ ] Test reward integrity.

## 4.2 Achievements

* [ ] Define achievement criteria.
* [ ] Create achievement definitions.
* [ ] Implement achievement validation.
* [ ] Award eligible achievements.
* [ ] Display earned achievements.
* [ ] Display achievement progress where applicable.
* [ ] Prevent duplicate achievement awards.
* [ ] Test achievement permissions.

## 4.3 Leaderboard Integration

* [ ] Integrate XP ledger with leaderboard queries.
* [ ] Verify weekly and monthly calculations.
* [ ] Verify all-time totals.
* [ ] Verify privacy restrictions.
* [ ] Test leaderboard consistency.

---

# Phase 5 — Quality Assurance

## 5.1 Functional Testing

* [ ] Test signup and login.
* [ ] Test protected routes.
* [ ] Test task CRUD operations.
* [ ] Test academic CRUD operations.
* [ ] Test DSA CRUD operations.
* [ ] Test focus sessions.
* [ ] Test habit tracking.
* [ ] Test project management.
* [ ] Test friend requests.
* [ ] Test study groups.
* [ ] Test challenges.
* [ ] Test XP and achievements.

## 5.2 Security Testing

* [ ] Verify RLS policies on private tables.
* [ ] Test unauthorized data access.
* [ ] Test cross-user record access.
* [ ] Test parent-child ownership checks.
* [ ] Test group membership permissions.
* [ ] Test XP manipulation prevention.
* [ ] Test input validation.
* [ ] Verify environment secrets are not exposed.

## 5.3 UI and Accessibility

* [ ] Test desktop layouts.
* [ ] Test tablet layouts.
* [ ] Test mobile layouts.
* [ ] Test navigation.
* [ ] Test forms and dialogs.
* [ ] Test loading states.
* [ ] Test empty states.
* [ ] Test error states.
* [ ] Check keyboard navigation.
* [ ] Check form labels and accessible names.
* [ ] Check color contrast.
* [ ] Test dark mode if implemented.

## 5.4 Performance

* [ ] Optimize large lists with pagination.
* [ ] Review database query performance.
* [ ] Add indexes where required.
* [ ] Reduce unnecessary client-side JavaScript.
* [ ] Optimize image loading.
* [ ] Review caching behavior.
* [ ] Test production build performance.

---

# Phase 6 — Deployment

## 6.1 Production Setup

* [ ] Create the production Supabase project.
* [ ] Configure production environment variables.
* [ ] Apply reviewed database migrations.
* [ ] Configure authentication redirect URLs.
* [ ] Verify RLS policies in production.
* [ ] Configure Vercel deployment.
* [ ] Connect the GitHub repository.
* [ ] Verify production build.
* [ ] Test the deployed application.

## 6.2 Final Release

* [ ] Verify all MVP features.
* [ ] Verify authentication and authorization.
* [ ] Verify database connectivity.
* [ ] Verify responsive layouts.
* [ ] Verify error handling.
* [ ] Update README.md.
* [ ] Add screenshots to documentation.
* [ ] Document setup instructions.
* [ ] Document known limitations.
* [ ] Create the first stable release.

---

# Phase 7 — Future Enhancements

These features are optional and should be considered after the core application is stable.

* [ ] Calendar integration.
* [ ] Advanced study planning.
* [ ] AI-assisted study recommendations.
* [ ] Import and export functionality.
* [ ] Additional profile customization.
* [ ] More detailed analytics.
* [ ] Email notifications.
* [ ] Progressive Web App enhancements.
* [ ] Additional integrations with learning platforms.

---

# Development Rules for AI Coding Tools

When implementing a task:

1. Read the relevant sections of `req.md`, `UI_UX.md`, `ARCHITECTURE.md`, `DATABASE.md`, and `API.md`.
2. Inspect the existing project structure before modifying files.
3. Implement only the requested task and its necessary dependencies.
4. Use real database operations for completed features.
5. Add server-side validation and authorization.
6. Follow the existing design system.
7. Test the implementation and fix errors.
8. Update this file only after verifying the task is complete.
9. Provide a concise summary of changed files and testing results.
10. Suggest a suitable Git commit message.

Do not mark a feature complete merely because its UI has been created.

---

# MVP Completion Criteria

The first usable MVP is complete when:

* Authentication and protected routes work.
* Dashboard displays real user data.
* Tasks can be created, updated, completed, and deleted.
* Academic semesters, subjects, units, and assessments can be tracked.
* DSA problems and revision history can be managed.
* Focus sessions are recorded.
* Database access is protected by authorization and RLS.
* Responsive layouts work on desktop and mobile.
* The application builds and deploys successfully.
