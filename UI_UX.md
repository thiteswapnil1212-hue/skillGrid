# SkillGrid — UI/UX Design Specification

**Version:** 1.0
**Status:** Design Specification
**Design Direction:** Codeforces-inspired, clean, professional, minimal
**Primary Theme:** Light mode

---

## 1. Design Philosophy

SkillGrid is a student productivity platform designed around clarity, efficiency, and consistency.

The interface should feel like a serious productivity and competitive programming tool rather than a generic AI-generated dashboard.

### Core principles

* Minimal and functional design.
* Clear visual hierarchy.
* Compact layouts with useful information density.
* Consistent spacing, typography, and components.
* Fast navigation with minimal unnecessary interactions.
* Responsive layouts for desktop, tablet, and mobile.
* Accessible colors and readable text.
* No decorative elements that do not serve a purpose.

### Avoid

* Excessive gradients.
* Glassmorphism.
* Oversized headings.
* Excessive rounded cards.
* Unnecessary animations.
* Emoji-based navigation.
* Decorative illustrations.
* Repeated generic dashboard cards.
* Excessive empty space.
* Fake statistics or misleading progress indicators.

---

## 2. Brand Identity

### Product Name

**SkillGrid**

### Tagline

Track your progress. Build your future.

### Brand Personality

* Professional.
* Student-focused.
* Modern.
* Competitive.
* Friendly but not childish.
* Minimal and practical.

### Logo Direction

Create a simple geometric logo based on a grid or connected squares.

The logo should:

* Work on light and dark backgrounds.
* Remain recognizable at small sizes.
* Use the primary blue color.
* Avoid complicated illustrations and unnecessary details.

---

## 3. Color System

### Primary Palette

| Token          | Hex       | Usage                                     |
| -------------- | --------- | ----------------------------------------- |
| Primary        | `#3B5998` | Primary buttons, links, active navigation |
| Primary Hover  | `#2F477A` | Hover states                              |
| Primary Light  | `#EAF0FA` | Selected items and subtle highlights      |
| Background     | `#FFFFFF` | Main application background               |
| Sidebar        | `#F8FAFC` | Sidebar background                        |
| Surface        | `#FFFFFF` | Cards, forms, dialogs                     |
| Border         | `#E2E8F0` | Dividers, borders                         |
| Text Primary   | `#1E293B` | Main text                                 |
| Text Secondary | `#64748B` | Supporting text                           |
| Text Muted     | `#94A3B8` | Placeholder and muted text                |

### Semantic Colors

| Token         | Hex       | Usage                               |
| ------------- | --------- | ----------------------------------- |
| Success       | `#2F9E44` | Completed tasks and positive states |
| Success Light | `#EAF7EC` | Success backgrounds                 |
| Warning       | `#E6A817` | Deadlines and warnings              |
| Warning Light | `#FFF7E0` | Warning backgrounds                 |
| Danger        | `#DC2626` | Errors and destructive actions      |
| Danger Light  | `#FEF2F2` | Error backgrounds                   |
| Info          | `#2563EB` | Informational states                |

### Competitive Programming Rating Colors

Use these colors sparingly for DSA ratings and leaderboard badges.

| Rating Category | Color     |
| --------------- | --------- |
| Beginner        | `#808080` |
| Novice          | `#008000` |
| Intermediate    | `#03A89E` |
| Advanced        | `#0000FF` |
| Expert          | `#AA00AA` |
| Master          | `#FF8C00` |
| Grandmaster     | `#FF0000` |

These are visual inspiration only. SkillGrid must define its own rating thresholds and must not imply official Codeforces ratings.

---

## 4. Typography

### Font Family

Use **Inter** as the primary font.

Fallbacks: system-ui, sans-serif.

### Typography Scale

| Element         | Size | Weight |
| --------------- | ---- | ------ |
| Page Title      | 24px | 600    |
| Section Title   | 18px | 600    |
| Card Title      | 15px | 600    |
| Body Text       | 14px | 400    |
| Supporting Text | 13px | 400    |
| Table Text      | 13px | 400    |
| Button Text     | 14px | 500    |
| Small Labels    | 12px | 500    |

### Typography Rules

* Use sentence case for headings and labels.
* Avoid oversized display typography.
* Keep paragraph line lengths readable.
* Use consistent font weights.
* Use tabular numerals for statistics and rankings where appropriate.

---

## 5. Spacing and Layout

Use a consistent 4px-based spacing system.

| Token      | Value |
| ---------- | ----- |
| `space-1`  | 4px   |
| `space-2`  | 8px   |
| `space-3`  | 12px  |
| `space-4`  | 16px  |
| `space-5`  | 20px  |
| `space-6`  | 24px  |
| `space-8`  | 32px  |
| `space-10` | 40px  |
| `space-12` | 48px  |

### Layout Dimensions

* Desktop sidebar: 240px.
* Collapsed sidebar: 72px.
* Topbar: 60px.
* Main content maximum width: 1440px.
* Main content padding: 24px desktop.
* Tablet content padding: 20px.
* Mobile content padding: 16px.
* Card border radius: 8px.
* Button border radius: 6px.
* Input border radius: 6px.
* Modal border radius: 10px.

### Layout Rules

* Keep the main content aligned consistently.
* Use a grid for dashboard statistics.
* Prefer tables for structured records.
* Use cards only when they improve grouping or readability.
* Avoid unnecessary nested cards.
* Keep forms compact and organized.

---

## 6. Global Application Shell

### Desktop Layout

The desktop application consists of:

1. Fixed left sidebar.
2. Compact top navigation bar.
3. Main page content.
4. Optional right-side detail panel when needed.

### Sidebar Navigation

Display the SkillGrid logo and navigation links.

#### Main

* Overview.
* Tasks.
* Academics.
* DSA Tracker.
* Development.
* Focus.
* Habits.

#### Community

* Leaderboard.
* Challenges.
* Friends.
* Study Groups.

#### Personal

* Progress.
* Profile.
* Settings.

### Sidebar Behavior

* Active page uses a subtle blue background.
* Active icon and label use the primary blue.
* Hover states use a light neutral background.
* Support collapsed and expanded states.
* Tooltips appear when collapsed.
* Group navigation items under clear section headings.

### Topbar

Include:

* Current page title or breadcrumb.
* Global search.
* Notifications button with unread count.
* Profile avatar and account menu.

### Profile Menu

Options:

* View Profile.
* Settings.
* Theme.
* Logout.

---

## 7. Mobile Navigation

### Bottom Navigation

Show five primary destinations:

1. Home.
2. Tasks.
3. Rank.
4. Groups.
5. Profile.

All other pages are available through a More menu.

### Mobile Rules

* Use a compact header.
* Keep primary actions reachable.
* Tables should become scrollable or transform into compact list items.
* Forms should use full-width fields.
* Dialogs should adapt to available screen space.
* Avoid horizontal overflow.
* Ensure important actions are not hidden behind the bottom navigation.

### Responsive Breakpoints

| Breakpoint | Width            |
| ---------- | ---------------- |
| Mobile     | Below 640px      |
| Tablet     | 640px–1023px     |
| Desktop    | 1024px and above |

---

## 8. Reusable UI Components

### Buttons

Variants:

* Primary.
* Secondary.
* Outline.
* Ghost.
* Destructive.

Sizes:

* Small.
* Medium.
* Large.

Rules:

* Buttons must have clear action labels.
* Use consistent heights and padding.
* Show disabled and loading states.
* Avoid icon-only buttons without accessible labels.

### Inputs

Components:

* Text input.
* Textarea.
* Select.
* Multi-select.
* Date picker.
* Search input.
* Checkbox.
* Radio group.
* Switch.

Rules:

* Every field has a visible label.
* Show validation errors near the field.
* Use placeholders only as examples, not as replacements for labels.

### Cards

Use cards for:

* Statistics.
* Project summaries.
* Challenge summaries.
* Habit summaries.
* Subject summaries.

Cards should use subtle borders and minimal shadows.

### Tables

Use tables for:

* Tasks.
* DSA problems.
* Leaderboards.
* Assignments.
* Notifications.
* Group members.

Table features:

* Sortable columns where appropriate.
* Search and filters.
* Pagination for large datasets.
* Clear empty states.
* Responsive behavior.

### Modals and Drawers

Use modals for:

* Creating or editing records.
* Confirming destructive actions.
* Quick actions.

Use side drawers for:

* Task details.
* Problem details.
* Notification details.

### Feedback Components

Include:

* Toast notifications.
* Inline validation errors.
* Loading skeletons.
* Empty states.
* Error messages.
* Success messages.
* Confirmation dialogs.

---

## 9. Authentication Screens

### Login Page

Layout:

* Minimal centered form.
* SkillGrid logo and name.
* Email field.
* Password field.
* Remember session option.
* Forgot password link.
* Login button.
* Signup link.

### Signup Page

Fields:

* Full name.
* Username.
* Email.
* Password.
* Confirm password.

Include:

* Terms acceptance if required.
* Password validation.
* Link to login.

### Forgot Password Page

* Email input.
* Send reset link button.
* Confirmation message.

### Onboarding Wizard

Steps:

1. Basic profile.
2. Academic information.
3. Interests and learning goals.
4. Coding platforms.
5. Privacy preferences.
6. Confirmation.

Use a simple step indicator and allow users to edit previous steps.

---

## 10. Dashboard UI

### Header

Display:

* Greeting.
* Current date.
* Quick-add action.

### Summary Statistics

Use compact cards for:

* Tasks completed today.
* Weekly focus time.
* DSA problems solved.
* Academic progress.
* Current streak.
* XP and level.

### Main Dashboard Sections

#### Today's Tasks

* Task title.
* Priority.
* Due time.
* Completion checkbox.
* View all link.

#### Upcoming Deadlines

* Assignment or exam name.
* Subject.
* Due date.
* Status.

#### Weekly Activity

* Compact activity chart.
* Date range selector.

#### Subject Progress

* Subject name.
* Progress percentage.
* Completion indicator.

#### DSA Progress

* Problems solved.
* Difficulty breakdown.
* Topic progress.

#### Recent Activity

* Recent task completions.
* Study sessions.
* DSA progress.
* Group activity.

#### Challenges and Groups

* Active challenge summaries.
* Shared group goals.
* Recent group updates.

### Dashboard Rules

* Keep the most actionable information at the top.
* Allow users to navigate to detailed pages from each section.
* Use realistic data only.
* Hide empty sections or show useful empty states.

---

## 11. Task Management UI

### Task List Page

Header:

* Page title.
* Add Task button.

Tabs:

* Today.
* Upcoming.
* Overdue.
* Completed.
* All Tasks.

Toolbar:

* Search.
* Priority filter.
* Category filter.
* Date filter.
* Sort menu.
* View selector.

### Task Table Columns

* Checkbox.
* Task title.
* Category.
* Priority.
* Due date.
* Status.
* Actions.

### Task Creation Form

Fields:

* Title.
* Description.
* Category.
* Subject.
* Priority.
* Due date.
* Reminder.
* Estimated duration.
* Tags.
* Subtasks.
* Visibility.

### Task Detail Drawer

Show:

* Full description.
* Due date.
* Priority.
* Subtasks.
* Activity history.
* Edit and delete actions.

### Task Views

* List view.
* Calendar view.
* Board view.

Each view must preserve the same underlying task data and filters where appropriate.

---

## 12. Academics UI

### Semester Overview

Display:

* Academic year.
* Semester selector.
* Subject count.
* Overall progress.
* Upcoming exams.
* Pending assignments.

### Subject Cards

Each card shows:

* Subject name.
* Subject code.
* Unit completion.
* Assignment count.
* Next exam date.

### Subject Detail Page

Tabs:

* Overview.
* Units.
* Assignments.
* Exams.
* Notes.

### Units Tab

Table columns:

* Unit number.
* Unit title.
* Topics.
* Completion status.
* Progress.

### Assignments Tab

Table columns:

* Assignment.
* Subject.
* Due date.
* Priority.
* Status.

### Exams Tab

Display:

* Exam name.
* Date.
* Subject.
* Preparation progress.
* Marks when available.

### Forms

Provide create/edit forms for:

* Semester.
* Subject.
* Unit.
* Topic.
* Assignment.
* Exam.
* Notes.

---

## 13. DSA Tracker UI

### DSA Overview

Display:

* Total problems solved.
* Easy, Medium, Hard breakdown.
* Weekly solving activity.
* Topic-wise progress.
* Revision queue.
* Platform distribution.

### DSA Problem Table

Columns:

* Problem title.
* Platform.
* Topic.
* Difficulty.
* Status.
* Date solved.
* Revision date.
* Actions.

### Filters

* Platform.
* Topic.
* Difficulty.
* Status.
* Date range.

### Add/Edit Problem Form

Fields:

* Problem title.
* Platform.
* Problem URL.
* Topic.
* Difficulty.
* Status.
* Date solved.
* Notes.
* Revision date.

### Topic Detail Page

Display:

* Topic name.
* Total problems.
* Solved count.
* Progress.
* Problem list.
* Related revision items.

### Revision Queue

Show:

* Problem title.
* Last solved date.
* Next revision date.
* Status.
* Mark revised action.

---

## 14. Development Tracker UI

### Project Dashboard

Display:

* Active projects.
* Completed projects.
* Upcoming milestones.
* Skills in progress.

### Project Cards

Show:

* Project name.
* Short description.
* Tech stack.
* Status.
* Progress.
* Target date.

### Project Detail Page

Tabs:

* Overview.
* Tasks.
* Milestones.
* Notes.

Display:

* Repository link.
* Live demo link.
* Start date.
* Target date.
* Project progress.
* Milestone history.

### Skills Page

Display:

* Skill name.
* Category.
* Proficiency level.
* Learning progress.
* Learning resources.
* Goal.

### Forms

Provide forms for:

* Projects.
* Milestones.
* Project tasks.
* Skills.
* Learning goals.

---

## 15. Focus Timer UI

### Focus Page

Display:

* Large but compact timer.
* Start, pause, resume, and reset controls.
* Focus mode selector.
* Session duration selector.
* Associated task or subject selector.

### Timer States

* Idle.
* Running.
* Paused.
* Completed.
* Interrupted.

### Session History

Columns:

* Date.
* Duration.
* Category.
* Associated task.
* Completion status.

### Focus Analytics

Display:

* Daily focus time.
* Weekly focus time.
* Session count.
* Focus history chart.

---

## 16. Habit Tracker UI

### Habit Overview

Display:

* Today's habits.
* Completion percentage.
* Current streak.
* Weekly completion summary.

### Habit List

Each habit shows:

* Name.
* Category.
* Frequency.
* Completion checkbox.
* Streak.
* Edit action.

### Calendar View

* Weekly checklist.
* Monthly heatmap.
* Completion history.

### Habit Detail Page

Display:

* Habit description.
* Frequency.
* Current streak.
* Longest streak.
* Completion history.
* Progress chart.

### Habit Form

Fields:

* Habit name.
* Description.
* Category.
* Frequency.
* Target.
* Reminder.
* Active status.

---

## 17. Progress and Analytics UI

### Analytics Header

* Page title.
* Date range selector.
* Export action.

### Analytics Sections

#### Task Analytics

* Completion percentage.
* Completed versus pending tasks.
* Daily completion trend.

#### Focus Analytics

* Total focus time.
* Session count.
* Focus time distribution.

#### DSA Analytics

* Problems solved.
* Difficulty breakdown.
* Topic-wise progress.
* Weekly activity.

#### Academic Analytics

* Subject completion.
* Assignment completion.
* Exam preparation.

#### Habit Analytics

* Habit completion.
* Streak history.
* Monthly heatmap.

#### Development Analytics

* Active projects.
* Completed milestones.
* Skill progress.

#### XP Analytics

* XP history.
* Level progress.
* Achievement history.

Charts should have readable labels, appropriate legends, and empty states.

---

## 18. Leaderboard UI

### Leaderboard Header

Display:

* Page title.
* Category tabs.
* Time period selector.

### Categories

* Friends.
* Study Groups.
* College.
* Global.

### Time Filters

* Weekly.
* Monthly.
* All Time.

### Leaderboard Table

Columns:

* Rank.
* User.
* Level.
* XP.
* Rating.
* Streak.
* Progress.

### Additional Features

* Current user's row highlight.
* Rank movement.
* Profile navigation.
* Rating history.
* Empty state when no rankings are available.

Use restrained rating colors and avoid excessive decorative badges.

---

## 19. Challenges UI

### Challenge Discovery

Tabs:

* Active.
* Upcoming.
* Completed.

Filters:

* Category.
* Duration.
* Participation type.

### Challenge Card

Show:

* Challenge title.
* Category.
* Organizer.
* Participants.
* Start and end dates.
* Goal.
* Progress.
* Status.

### Challenge Detail Page

Tabs:

* Overview.
* Leaderboard.
* Participants.
* Activity.

Display:

* Challenge rules.
* Goal and progress.
* Participant list.
* Milestones.
* Leaderboard.
* Join or leave action.

### Create Challenge Form

Fields:

* Title.
* Description.
* Category.
* Goal.
* Measurement unit.
* Start date.
* End date.
* Visibility.
* Participant settings.
* Rules.

---

## 20. Friends UI

### Friends Page

Tabs:

* My Friends.
* Requests Received.
* Requests Sent.
* Find Friends.

### Find Friends

Search by:

* Username.
* Name.
* College.

### User Result Card

Show:

* Avatar.
* Name.
* Username.
* College.
* Public progress summary.
* Add Friend action.

### Friend Profile

Tabs:

* Overview.
* Projects.
* Achievements.
* Public Activity.

Display only information permitted by the user's privacy settings.

---

## 21. Study Groups UI

### Group Discovery

Display:

* Group name.
* Description.
* Category.
* Member count.
* Visibility.
* Join action.

### Group Creation Form

Fields:

* Group name.
* Description.
* Category.
* Visibility.
* Membership rules.

### Group Detail Page

Tabs:

* Overview.
* Members.
* Shared Goals.
* Tasks.
* Challenges.
* Leaderboard.
* Activity.

### Members Page

Display:

* Avatar.
* Name.
* Role.
* Membership date.
* Available management actions.

### Shared Goals

Display:

* Goal title.
* Progress.
* Deadline.
* Milestones.
* Assigned members.

### Shared Tasks

Columns:

* Task.
* Assignee.
* Priority.
* Due date.
* Status.

### Group Settings

Include:

* Edit group.
* Manage roles.
* Invitations.
* Membership settings.
* Leave group.
* Delete group for authorized owners.

---

## 22. Notifications UI

### Notification Center

Display:

* Unread count.
* All notifications.
* Unread filter.
* Mark as read.
* Mark all as read.

### Notification Types

* Friend requests.
* Group invitations.
* Challenge updates.
* Task reminders.
* Achievements.
* Shared goal updates.

Each notification includes:

* Short message.
* Timestamp.
* Read status.
* Relevant destination link.

---

## 23. Profile UI

### Profile Header

Display:

* Avatar.
* Name.
* Username.
* Bio.
* College.
* Branch.
* Academic year.
* Skills.
* Edit Profile action.

### Profile Statistics

* XP.
* Level.
* Streak.
* Public DSA statistics.
* Public project count.
* Achievements.

### Profile Tabs

* Overview.
* Achievements.
* Projects.
* Activity.

### Edit Profile Form

Fields:

* Name.
* Username.
* Bio.
* College.
* Branch.
* Academic year.
* Skills.
* Avatar.
* Visibility.

---

## 24. Settings UI

### Settings Navigation

Sections:

* Account.
* Profile.
* Privacy.
* Notifications.
* Appearance.
* Connected Accounts.
* Data and Security.

### Account Settings

* Email.
* Password.
* Account details.
* Logout.
* Account deletion.

### Privacy Settings

* Profile visibility.
* Public progress settings.
* Activity visibility.
* Friend permissions.
* Group sharing preferences.

### Notification Settings

* In-app notifications.
* Email notifications.
* Reminder preferences.

### Appearance Settings

* Light mode.
* Dark mode.
* System preference.

### Connected Accounts

* Coding platform connections.
* Connection status.
* Disconnect action.

### Data and Security

* Data export.
* Account deletion.
* Session management where supported.

---

## 25. Search UI

### Global Search

Search across:

* Tasks.
* Subjects.
* DSA problems.
* Projects.
* Friends.
* Groups.
* Challenges.

### Search States

* Idle.
* Typing.
* Suggestions.
* Results.
* No results.
* Loading.
* Error.

### Search Results

Group results by category and provide direct navigation to each result.

Only return records the user is authorized to access.

---

## 26. XP and Achievements UI

### XP Overview

Display:

* Current XP.
* Current level.
* Progress to next level.
* Recent XP transactions.

### Achievement Gallery

Display:

* Achievement icon.
* Achievement name.
* Description.
* Unlock status.
* Unlock date.

### Achievement Categories

* DSA.
* Academics.
* Habits.
* Focus.
* Projects.
* Community.

Use subtle icons and restrained colors.

---

## 27. Dark Mode

Dark mode is optional and should preserve the same design system.

### Dark Palette

| Token          | Hex       |
| -------------- | --------- |
| Background     | `#0F172A` |
| Sidebar        | `#111827` |
| Surface        | `#1E293B` |
| Border         | `#334155` |
| Primary        | `#7EA2E8` |
| Primary Text   | `#F8FAFC` |
| Secondary Text | `#94A3B8` |

### Rules

* Maintain readable contrast.
* Avoid pure black backgrounds.
* Keep semantic colors consistent.
* Persist the user's selected theme.
* Respect system preference when selected.

---

## 28. Accessibility

* Use semantic HTML elements.
* Provide accessible labels for controls.
* Support keyboard navigation.
* Provide visible focus indicators.
* Maintain sufficient color contrast.
* Do not use color as the only indicator of status.
* Provide accessible validation messages.
* Ensure dialogs are keyboard accessible.
* Respect reduced-motion preferences.

---

## 29. Interaction and Feedback States

Every major feature should support appropriate UI states.

### Loading

* Skeletons for cards and tables.
* Loading indicators for actions.

### Empty

* Short explanation.
* Clear next action.
* No unnecessary illustrations.

### Error

* Clear error message.
* Retry action where appropriate.
* Preserve user-entered form data where possible.

### Success

* Confirmation toast.
* Updated data.
* Clear completion state.

### Validation

* Inline field errors.
* Clear required-field indicators.
* Prevent invalid submissions.

### Destructive Actions

* Confirmation dialog for deleting important records.
* Explain what will be removed.
* Provide cancel and confirm actions.

---

## 30. Responsive Behavior

### Desktop

* Full sidebar.
* Multi-column dashboard.
* Full data tables.
* Optional detail drawers.

### Tablet

* Collapsible sidebar.
* Reduced dashboard columns.
* Responsive tables.

### Mobile

* Bottom navigation.
* Single-column dashboard.
* Compact list-based data views.
* Full-width forms.
* Touch-friendly controls.
* Responsive dialogs.
* No horizontal overflow.

---

## 31. UI Quality Checklist

Before considering a page complete, verify:

* [ ] Correct color tokens and typography.
* [ ] Consistent spacing and alignment.
* [ ] Clear page title and navigation.
* [ ] Functional primary actions.
* [ ] Appropriate loading state.
* [ ] Appropriate empty state.
* [ ] Appropriate error state.
* [ ] Form validation.
* [ ] Responsive mobile layout.
* [ ] Keyboard accessibility.
* [ ] Privacy-aware data presentation.
* [ ] Consistent component styling.
* [ ] No unnecessary decoration or fake data presented as real.

---

## 32. Design Deliverables

The UI design should include:

1. Authentication and onboarding screens.
2. Dashboard.
3. Tasks.
4. Academics and subject details.
5. DSA Tracker and revision queue.
6. Development and project details.
7. Focus Timer.
8. Habit Tracker.
9. Progress and Analytics.
10. Leaderboard.
11. Challenges.
12. Friends.
13. Study Groups and group details.
14. Notifications.
15. Profile.
16. Settings.
17. Responsive mobile versions.
18. Shared reusable component library.

---

**End of UI/UX Design Specification**
