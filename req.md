# SkillGrid — Product Requirements Document (PRD)

**Version:** 1.0
**Status:** Planning
**Product Type:** Student Productivity and Social Learning Platform

---

## 1. Product Overview

SkillGrid is a student productivity platform that helps college students manage academics, DSA practice, development projects, habits, focus sessions, and personal goals in one place.

The platform also enables students to connect with friends, join study groups, participate in challenges, share progress, and compete through leaderboards.

### Product tagline

**Track your progress. Build your future.**

### Primary goals

* Help students organize their academic and personal goals.
* Track DSA practice and development progress.
* Build consistent study habits.
* Provide meaningful progress analytics.
* Enable friendly competition and accountability through social features.

---

## 2. Target Users

* College students preparing for placements.
* Students learning programming and development.
* Students tracking academics, exams, and assignments.
* Friends who want to study and improve together.

---

## 3. User Roles

### 3.1 Guest

* Access login and signup pages.
* View public landing or introductory pages.
* Cannot access private student data.

### 3.2 Student

* Manage personal tasks, academics, DSA, projects, habits, and focus sessions.
* Connect with friends.
* Join and create study groups.
* Participate in challenges.
* View leaderboards and progress reports.
* Control personal profile and privacy settings.

### 3.3 Group Owner

* Create and manage study groups.
* Invite members and manage membership.
* Create shared goals and group tasks.
* Assign admin roles.
* Manage group settings and permissions.

### 3.4 Group Admin

* Manage group members and shared activities within assigned permissions.
* Moderate group content.
* Cannot access members' private personal records.

---

## 4. Authentication and Onboarding

### Features

* Email and password signup.
* Login and logout.
* Email verification.
* Forgot password and password reset.
* Protected application routes.
* Persistent authenticated sessions.

### Onboarding

Collect:

* Full name and username.
* College and degree.
* Branch and academic year.
* Current semester.
* Interests and learning goals.
* Preferred coding platforms.
* Profile visibility preferences.

### Acceptance Criteria

* A user can create an account and sign in securely.
* Duplicate usernames are rejected.
* Protected pages require authentication.
* A user can reset their password.
* Onboarding information is saved and editable.

---

## 5. Dashboard

### Features

* Personalized greeting and current date.
* Today's task list and completion percentage.
* Upcoming assignments and exams.
* Weekly focus time.
* DSA problems solved.
* Academic progress.
* Current streak and XP level.
* Recent activity.
* Weekly activity chart.
* Subject-wise progress.
* Active challenges and group activity.
* Quick actions to create tasks, start focus sessions, and add DSA problems.

### Acceptance Criteria

* Dashboard values reflect saved user data.
* Users can navigate from summary cards to relevant details.
* Empty states appear when no data exists.

---

## 6. Task Management

### Task Fields

* Title and description.
* Category and optional subject.
* Priority.
* Due date and reminder.
* Estimated duration.
* Tags and subtasks.
* Visibility.
* Completion status.

### Features

* Create, edit, complete, delete, and archive tasks.
* Today, Upcoming, Overdue, Completed, and All Tasks views.
* List, calendar, and board views.
* Search, sorting, and filters.
* Recurring tasks.
* Task detail view.
* Quick-add task form.

### Acceptance Criteria

* Task changes persist in the database.
* Users can access only tasks they are authorized to view.
* Completed tasks are reflected in progress statistics.
* Invalid task data is rejected.

---

## 7. Academics

### Semester Management

* Academic year and semester selection.
* Subject list.
* Subject-wise progress.
* Assignment and exam overview.

### Subject Management

Each subject includes:

* Name and subject code.
* Credits and instructor, if applicable.
* Units and topics.
* Syllabus completion.
* Notes.
* Assignments and exams.
* Marks and attendance records, if tracked.

### Assignment Management

* Title and description.
* Subject.
* Due date.
* Priority.
* Completion status.

### Exam Management

* Exam name and subject.
* Exam date.
* Syllabus and preparation progress.
* Marks and result, when available.

### Acceptance Criteria

* Users can create and update semesters, subjects, units, assignments, and exams.
* Subject progress is calculated from completed units or topics.
* Upcoming deadlines are displayed on the dashboard.

---

## 8. DSA Tracker

### Problem Fields

* Problem title.
* Platform.
* Problem URL.
* Topic and difficulty.
* Status.
* Date solved.
* Notes.
* Revision date.

### Features

* Add, edit, and remove problem records.
* Track Easy, Medium, and Hard problems.
* Track topics such as Arrays, Strings, Linked Lists, Trees, Graphs, and Dynamic Programming.
* Filter by platform, topic, difficulty, and status.
* Search and sort problems.
* Bookmark problems.
* Maintain revision queue and problem history.
* Display topic-wise progress and weekly activity.

### Problem Statuses

* Not Started.
* Attempted.
* Solved.
* Needs Revision.

### Acceptance Criteria

* Users can track problems from different coding platforms.
* Problem statistics are calculated from saved records.
* Users can update revision dates and notes.
* External problem links open the corresponding platform.

---

## 9. Development and Project Tracker

### Project Fields

* Project name and description.
* Tech stack.
* Repository URL.
* Live demo URL.
* Status.
* Start date and target date.
* Tasks and milestones.
* Progress and notes.

### Features

* Create, edit, archive, and delete projects.
* Track active and completed projects.
* Add milestones and project tasks.
* Track skills being learned.
* Add learning resources.
* Track skill progress and learning goals.

### Acceptance Criteria

* Users can view projects by status.
* Milestone completion updates project progress.
* Repository and demo links are validated before saving.

---

## 10. Focus Timer

### Features

* Configurable focus duration.
* Short break and long break.
* Custom session duration.
* Start, pause, resume, reset, and complete actions.
* Link a session to a task, subject, DSA topic, or project.
* Save session history.
* Daily and weekly focus statistics.
* Focus session charts.

### Session Fields

* Start and end time.
* Duration.
* Associated task or category.
* Completion status.
* Notes.

### Acceptance Criteria

* Completed sessions are saved.
* Paused or interrupted sessions are not incorrectly counted as completed.
* Focus statistics are calculated from valid session records.

---

## 11. Habit Tracker

### Features

* Create, edit, pause, archive, and delete habits.
* Daily habit checklist.
* Weekly calendar.
* Monthly activity heatmap.
* Completion percentage.
* Habit streaks and history.
* Habit reminders.

### Habit Fields

* Name and category.
* Frequency.
* Target.
* Reminder.
* Active status.

### Acceptance Criteria

* A user can mark a habit complete for a given date.
* Duplicate completion records are prevented.
* Habit statistics reflect recorded activity.
* Missed days do not delete historical records.

---

## 12. Progress and Analytics

### Features

* Daily, weekly, monthly, and custom date ranges.
* Task completion statistics.
* Focus time analytics.
* DSA problem-solving progress.
* Academic progress.
* Habit consistency.
* Project milestone progress.
* XP history.
* Activity heatmap.
* Achievement history.
* Report export.

### Acceptance Criteria

* Analytics are derived from stored records.
* Date filters update relevant charts.
* Empty charts show meaningful empty states.
* Personal analytics remain private by default.

---

## 13. Friends and Social Connections

### Features

* Search users by username, name, or college.
* Send friend requests.
* Accept or reject incoming requests.
* Cancel outgoing requests.
* Remove friends.
* View friends list.
* View public friend profiles.
* View shared groups and public activity.

### Acceptance Criteria

* Duplicate friend requests are prevented.
* Users cannot accept or reject requests addressed to someone else.
* Private profile data is not exposed to friends without permission.

---

## 14. Study Groups

### Group Features

* Create and edit groups.
* Public and private group visibility.
* Join requests and invitations.
* Group member list.
* Member roles: Owner, Admin, Member.
* Shared tasks and goals.
* Group activity feed.
* Group leaderboard.
* Group settings and moderation.

### Shared Tasks

* Title and description.
* Assignee.
* Due date.
* Priority.
* Completion status.

### Shared Goals

* Goal title and description.
* Target and deadline.
* Progress.
* Milestones.

### Acceptance Criteria

* Only authorized members can access private groups.
* Only permitted roles can modify group settings.
* Group tasks and goals are visible to authorized members.
* Leaving or deleting a group follows the appropriate permission rules.

---

## 15. Leaderboard

### Leaderboard Categories

* Friends.
* Study Groups.
* College.
* Global.

### Time Filters

* Weekly.
* Monthly.
* All Time.

### Display Fields

* Rank.
* Username and avatar.
* Level.
* XP.
* Rating.
* Streak.
* Progress.

### Features

* Ranking tables.
* Rank movement.
* User profile links.
* Rating history.
* Current user's position.

### Acceptance Criteria

* Leaderboard rankings are based on defined scoring rules.
* XP changes are validated server-side.
* Users cannot directly modify their XP or ranking.
* Private personal records are not exposed through rankings.

---

## 16. Challenges

### Challenge Categories

* DSA.
* Study goals.
* Academic goals.
* Habits.
* Project milestones.

### Challenge Fields

* Title and description.
* Category.
* Goal and measurement unit.
* Start and end dates.
* Organizer.
* Visibility.
* Participant settings.
* Rules.

### Features

* Browse active, upcoming, and completed challenges.
* Join and leave challenges.
* Create challenges.
* Track participant progress.
* Challenge leaderboard.
* Challenge milestones.
* Challenge activity feed.

### Acceptance Criteria

* Users can join only eligible challenges.
* Challenge progress follows the defined goal and scoring rules.
* Expired challenges are marked completed or expired as appropriate.
* Participation and progress changes are validated.

---

## 17. Notifications

### Notification Types

* Friend requests.
* Group invitations.
* Challenge updates.
* Task reminders.
* Achievements.
* Shared goal updates.

### Features

* Notification center.
* Unread count.
* Mark as read.
* Mark all as read.
* Notification preferences.
* In-app notifications.

### Acceptance Criteria

* Notifications are visible only to their intended recipients.
* Read status is saved.
* Users can control supported notification preferences.

---

## 18. Profile and Settings

### Profile

* Avatar.
* Full name and username.
* Bio.
* College, branch, and year.
* Skills.
* XP and level.
* Achievements.
* Public statistics.
* Projects and public activity.

### Settings

* Account details.
* Password management.
* Privacy settings.
* Notification preferences.
* Appearance and theme.
* Timezone.
* Connected coding platforms.
* Data export.
* Account deletion.

### Acceptance Criteria

* Users can edit their own profile.
* Public and private profile settings are enforced.
* Account deletion requires confirmation.
* Private information is excluded from public profile responses.

---

## 19. XP, Levels, and Achievements

### Features

* XP points for eligible activities.
* Level progression.
* Achievement badges.
* Streak milestones.
* XP history.
* Locked and unlocked achievements.

### Rules

* XP values are defined centrally.
* XP is awarded only after server-side validation.
* Duplicate awards are prevented.
* XP transactions are recorded in an immutable ledger.
* Reversals or corrections are recorded as separate transactions.

### Acceptance Criteria

* Users cannot directly update XP balances.
* XP history is traceable.
* Achievement eligibility is validated before awarding.

---

## 20. Search and Navigation

### Features

* Global search across tasks, subjects, DSA problems, projects, friends, groups, and challenges.
* Search suggestions.
* Recent searches.
* Search filters.
* No-results state.
* Keyboard-friendly navigation.

### Acceptance Criteria

* Search results respect user permissions.
* Search results link to the corresponding detail pages.

---

## 21. Privacy and Security

* Personal records are private by default.
* Users can explicitly choose what progress to share.
* Database access is protected by Row Level Security.
* Authorization is enforced on the server.
* Users cannot modify another user's records without permission.
* Group roles and permissions are checked server-side.
* Secrets are stored in environment variables.
* Input validation is applied to user-submitted data.
* Sensitive information is excluded from logs and public responses.
* XP and challenge progress are validated before being counted.
* Destructive actions require confirmation where appropriate.

---

## 22. Non-Functional Requirements

### Performance

* Fast navigation and responsive interactions.
* Paginated or limited queries for large lists.
* Efficient database queries and appropriate indexes.
* Loading states for asynchronous operations.

### Usability

* Responsive desktop, tablet, and mobile layouts.
* Clear labels and accessible forms.
* Consistent navigation and component styling.
* Useful empty, loading, success, and error states.

### Reliability

* Handle network and database errors gracefully.
* Prevent duplicate submissions where applicable.
* Validate data on both client and server.
* Maintain consistent records for related operations.

### Maintainability

* Modular feature-based code structure.
* Reusable UI components.
* Strict TypeScript checks.
* Consistent naming and coding conventions.
* Documented setup and development workflow.

---

## 23. Implementation Phases

### Phase 1 — Foundation and Personal Tracker

* Project setup.
* Authentication and onboarding.
* Dashboard.
* Tasks.
* Academics.
* DSA Tracker.
* Focus Timer.

### Phase 2 — Personal Productivity

* Development Tracker.
* Habit Tracker.
* Progress and Analytics.
* Profile and Settings.

### Phase 3 — Social Platform

* Friends.
* Study Groups.
* Shared Tasks and Goals.
* Leaderboards.
* Challenges.
* XP and Achievements.
* Notifications.

### Phase 4 — Quality and Launch

* Security testing.
* Responsive testing.
* Performance optimization.
* Error handling.
* Deployment.
* Bug fixes.

---

## 24. Global Acceptance Criteria

The platform is ready for release when:

1. Users can register, log in, and manage their accounts.
2. Personal features save and retrieve data correctly.
3. Social features enforce membership and privacy permissions.
4. Leaderboard and XP calculations are validated server-side.
5. Major workflows work on desktop and mobile.
6. Forms display appropriate validation errors.
7. Loading, empty, success, and error states are implemented.
8. Database access is protected by appropriate authorization policies.
9. No secrets are committed to the repository.
10. The application passes its required functional and security tests.

---

## 25. Out of Scope for Initial Release

* Native Android and iOS applications.
* Paid subscriptions and payment processing.
* AI-generated study plans.
* Real-time video calls.
* Automated grading of coding submissions.
* Automatic integration with every coding platform.
* Public messaging between arbitrary users.

These features may be considered for future versions.

---

**End of Product Requirements Document**
