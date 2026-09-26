# SkillGrid — Database Design

## 1. Overview

SkillGrid uses Supabase PostgreSQL as its primary database.

The database stores user profiles, tasks, academic progress, DSA practice, development projects, focus sessions, habits, social connections, study groups, challenges, notifications, and XP records.

### Database Principles

* Use UUID primary keys for main entities.
* Use foreign keys to maintain data integrity.
* Keep private user data protected using Row Level Security (RLS).
* Store timestamps using `TIMESTAMPTZ`.
* Use database constraints to prevent invalid records.
* Award XP only through validated server-side operations.
* Use migrations for schema changes.
* Avoid storing duplicate or unnecessary data.

---

## 2. Database Naming Conventions

* Table names: `snake_case`, plural.
* Column names: `snake_case`.
* Primary keys: `id`.
* Foreign keys: `<entity>_id`.
* Timestamps: `created_at`, `updated_at`.
* Boolean columns: descriptive names such as `is_public`.
* Use UUIDs for primary keys unless a specific table requires another type.

---

## 3. Authentication and User Profiles

### 3.1 `profiles`

Stores public profile information and user preferences.

| Column          | Type        | Description                             |
| --------------- | ----------- | --------------------------------------- |
| id              | UUID        | Primary key; references `auth.users.id` |
| username        | TEXT        | Unique username                         |
| full_name       | TEXT        | Display name                            |
| avatar_url      | TEXT        | Profile image URL                       |
| bio             | TEXT        | Short profile description               |
| college         | TEXT        | College name                            |
| degree          | TEXT        | Degree or program                       |
| graduation_year | INTEGER     | Expected graduation year                |
| is_public       | BOOLEAN     | Whether the profile is publicly visible |
| created_at      | TIMESTAMPTZ | Creation time                           |
| updated_at      | TIMESTAMPTZ | Last update time                        |

Rules:

* `username` must be unique.
* A user can access and edit only their own private profile fields.
* Public profile fields must be exposed through appropriately restricted queries.
* Profile creation should be triggered safely after account registration.

---

## 4. Tasks

### 4.1 `tasks`

Stores personal tasks and assignments.

| Column              | Type        | Description                        |
| ------------------- | ----------- | ---------------------------------- |
| id                  | UUID        | Primary key                        |
| user_id             | UUID        | Owner; references `profiles.id`    |
| title               | TEXT        | Task title                         |
| description         | TEXT        | Optional description               |
| category            | TEXT        | Task category                      |
| priority            | TEXT        | Low, medium, or high               |
| status              | TEXT        | Pending, in progress, or completed |
| due_date            | TIMESTAMPTZ | Optional deadline                  |
| completed_at        | TIMESTAMPTZ | Completion time                    |
| academic_subject_id | UUID        | Optional related subject           |
| created_at          | TIMESTAMPTZ | Creation time                      |
| updated_at          | TIMESTAMPTZ | Last update time                   |

Rules:

* Every task belongs to one user.
* Validate category, priority, and status using database constraints.
* A user can modify only their own tasks.
* Completing a task must not automatically award XP unless a validated reward rule exists.

---

## 5. Academics

### 5.1 `academic_semesters`

Stores a user's academic semesters.

| Column          | Type        | Description         |
| --------------- | ----------- | ------------------- |
| id              | UUID        | Primary key         |
| user_id         | UUID        | Owner               |
| name            | TEXT        | Semester name       |
| semester_number | INTEGER     | Semester number     |
| academic_year   | TEXT        | Academic year       |
| start_date      | DATE        | Optional start date |
| end_date        | DATE        | Optional end date   |
| created_at      | TIMESTAMPTZ | Creation time       |

### 5.2 `academic_subjects`

Stores subjects within a semester.

| Column       | Type        | Description                        |
| ------------ | ----------- | ---------------------------------- |
| id           | UUID        | Primary key                        |
| user_id      | UUID        | Owner                              |
| semester_id  | UUID        | References `academic_semesters.id` |
| name         | TEXT        | Subject name                       |
| subject_code | TEXT        | Optional subject code              |
| credits      | NUMERIC     | Optional credits                   |
| target_marks | NUMERIC     | Optional target marks              |
| created_at   | TIMESTAMPTZ | Creation time                      |
| updated_at   | TIMESTAMPTZ | Last update time                   |

### 5.3 `academic_units`

Stores units or chapters within subjects.

| Column      | Type        | Description                         |
| ----------- | ----------- | ----------------------------------- |
| id          | UUID        | Primary key                         |
| user_id     | UUID        | Owner                               |
| subject_id  | UUID        | References `academic_subjects.id`   |
| title       | TEXT        | Unit title                          |
| unit_number | INTEGER     | Unit number                         |
| status      | TEXT        | Not started, in progress, completed |
| progress    | INTEGER     | Completion percentage               |
| created_at  | TIMESTAMPTZ | Creation time                       |
| updated_at  | TIMESTAMPTZ | Last update time                    |

### 5.4 `academic_assessments`

Stores exams, assignments, quizzes, and other assessments.

| Column          | Type        | Description                      |
| --------------- | ----------- | -------------------------------- |
| id              | UUID        | Primary key                      |
| user_id         | UUID        | Owner                            |
| subject_id      | UUID        | Related subject                  |
| title           | TEXT        | Assessment title                 |
| assessment_type | TEXT        | Exam, assignment, quiz, or other |
| scheduled_at    | TIMESTAMPTZ | Optional scheduled date          |
| max_marks       | NUMERIC     | Maximum marks                    |
| obtained_marks  | NUMERIC     | Marks obtained                   |
| status          | TEXT        | Upcoming, completed, or missed   |
| created_at      | TIMESTAMPTZ | Creation time                    |
| updated_at      | TIMESTAMPTZ | Last update time                 |

Rules:

* A semester belongs to one user.
* Subjects must belong to a semester owned by the same user.
* Units and assessments must belong to subjects owned by the same user.
* Validate progress between 0 and 100.
* Validate obtained marks against the maximum marks.

---

## 6. DSA Tracker

### 6.1 `dsa_problems`

Stores coding problems tracked by users.

| Column      | Type        | Description                   |
| ----------- | ----------- | ----------------------------- |
| id          | UUID        | Primary key                   |
| user_id     | UUID        | Owner                         |
| title       | TEXT        | Problem title                 |
| platform    | TEXT        | LeetCode, GeeksforGeeks, etc. |
| problem_url | TEXT        | Optional problem URL          |
| difficulty  | TEXT        | Easy, medium, or hard         |
| status      | TEXT        | To do, solved, or revision    |
| topic       | TEXT        | Primary topic                 |
| notes       | TEXT        | Personal notes                |
| solved_at   | TIMESTAMPTZ | Optional solve time           |
| created_at  | TIMESTAMPTZ | Creation time                 |
| updated_at  | TIMESTAMPTZ | Last update time              |

### 6.2 `dsa_problem_topics`

Stores additional topics associated with a problem.

| Column     | Type | Description                  |
| ---------- | ---- | ---------------------------- |
| id         | UUID | Primary key                  |
| problem_id | UUID | References `dsa_problems.id` |
| topic_name | TEXT | Topic name                   |

### 6.3 `dsa_revisions`

Stores revision history for a problem.

| Column     | Type        | Description                  |
| ---------- | ----------- | ---------------------------- |
| id         | UUID        | Primary key                  |
| user_id    | UUID        | Owner                        |
| problem_id | UUID        | References `dsa_problems.id` |
| revised_at | TIMESTAMPTZ | Revision time                |
| notes      | TEXT        | Optional revision notes      |
| created_at | TIMESTAMPTZ | Creation time                |

Rules:

* A user can manage only their own DSA records.
* Validate difficulty and status using constraints.
* Revision records must belong to problems owned by the same user.

---

## 7. Development Projects and Skills

### 7.1 `development_projects`

Stores personal development projects.

| Column         | Type        | Description                     |
| -------------- | ----------- | ------------------------------- |
| id             | UUID        | Primary key                     |
| user_id        | UUID        | Owner                           |
| title          | TEXT        | Project title                   |
| description    | TEXT        | Project description             |
| status         | TEXT        | Planned, in progress, completed |
| repository_url | TEXT        | Optional GitHub URL             |
| live_url       | TEXT        | Optional deployment URL         |
| start_date     | DATE        | Optional start date             |
| target_date    | DATE        | Optional target date            |
| completed_at   | TIMESTAMPTZ | Optional completion time        |
| created_at     | TIMESTAMPTZ | Creation time                   |
| updated_at     | TIMESTAMPTZ | Last update time                |

### 7.2 `skills`

Stores skills tracked by a user.

| Column            | Type        | Description                      |
| ----------------- | ----------- | -------------------------------- |
| id                | UUID        | Primary key                      |
| user_id           | UUID        | Owner                            |
| name              | TEXT        | Skill name                       |
| category          | TEXT        | Skill category                   |
| proficiency_level | TEXT        | Beginner, intermediate, advanced |
| progress          | INTEGER     | Progress percentage              |
| created_at        | TIMESTAMPTZ | Creation time                    |
| updated_at        | TIMESTAMPTZ | Last update time                 |

### 7.3 `project_milestones`

Stores milestones within a project.

| Column       | Type        | Description                          |
| ------------ | ----------- | ------------------------------------ |
| id           | UUID        | Primary key                          |
| user_id      | UUID        | Owner                                |
| project_id   | UUID        | References `development_projects.id` |
| title        | TEXT        | Milestone title                      |
| description  | TEXT        | Optional description                 |
| status       | TEXT        | Pending or completed                 |
| due_date     | DATE        | Optional deadline                    |
| completed_at | TIMESTAMPTZ | Optional completion time             |
| created_at   | TIMESTAMPTZ | Creation time                        |

Rules:

* Project milestones must belong to projects owned by the same user.
* Validate progress percentages and status values.
* Project and skill data are private by default.

---

## 8. Focus Sessions

### 8.1 `focus_sessions`

Stores completed and interrupted focus sessions.

| Column           | Type        | Description                       |
| ---------------- | ----------- | --------------------------------- |
| id               | UUID        | Primary key                       |
| user_id          | UUID        | Owner                             |
| task_id          | UUID        | Optional related task             |
| session_type     | TEXT        | Focus, short break, long break    |
| planned_duration | INTEGER     | Planned duration in seconds       |
| actual_duration  | INTEGER     | Actual duration in seconds        |
| started_at       | TIMESTAMPTZ | Session start time                |
| ended_at         | TIMESTAMPTZ | Session end time                  |
| status           | TEXT        | Completed, interrupted, cancelled |
| created_at       | TIMESTAMPTZ | Creation time                     |

Rules:

* Durations must be non-negative.
* Sessions must belong to the authenticated user.
* Validate session timing on the server.
* Do not trust client-submitted durations for reward calculations.

---

## 9. Habits

### 9.1 `habits`

Stores user-defined habits.

| Column       | Type        | Description                 |
| ------------ | ----------- | --------------------------- |
| id           | UUID        | Primary key                 |
| user_id      | UUID        | Owner                       |
| title        | TEXT        | Habit title                 |
| description  | TEXT        | Optional description        |
| frequency    | TEXT        | Daily, weekly, custom       |
| target_count | INTEGER     | Target completion count     |
| is_active    | BOOLEAN     | Whether the habit is active |
| created_at   | TIMESTAMPTZ | Creation time               |
| updated_at   | TIMESTAMPTZ | Last update time            |

### 9.2 `habit_logs`

Stores habit completion records.

| Column          | Type        | Description            |
| --------------- | ----------- | ---------------------- |
| id              | UUID        | Primary key            |
| user_id         | UUID        | Owner                  |
| habit_id        | UUID        | References `habits.id` |
| log_date        | DATE        | Completion date        |
| completed_count | INTEGER     | Number of completions  |
| notes           | TEXT        | Optional notes         |
| created_at      | TIMESTAMPTZ | Creation time          |

Rules:

* A user can log only their own habits.
* Prevent duplicate daily logs where the habit frequency requires one entry per day.
* Validate completion counts against configured targets where appropriate.

---

## 10. Social Connections

### 10.1 `friend_requests`

Stores friend requests between users.

| Column      | Type        | Description                            |
| ----------- | ----------- | -------------------------------------- |
| id          | UUID        | Primary key                            |
| sender_id   | UUID        | References `profiles.id`               |
| receiver_id | UUID        | References `profiles.id`               |
| status      | TEXT        | Pending, accepted, rejected, cancelled |
| created_at  | TIMESTAMPTZ | Creation time                          |
| updated_at  | TIMESTAMPTZ | Last update time                       |

Rules:

* Sender and receiver must be different users.
* Prevent duplicate pending requests between the same pair.
* Only the sender or receiver may perform permitted actions.
* Accepted friendships must be represented consistently in friend-related queries.

---

## 11. Study Groups

### 11.1 `study_groups`

Stores study groups.

| Column      | Type        | Description                 |
| ----------- | ----------- | --------------------------- |
| id          | UUID        | Primary key                 |
| name        | TEXT        | Group name                  |
| description | TEXT        | Optional description        |
| owner_id    | UUID        | Group creator               |
| visibility  | TEXT        | Public or private           |
| invite_code | TEXT        | Optional unique invite code |
| created_at  | TIMESTAMPTZ | Creation time               |
| updated_at  | TIMESTAMPTZ | Last update time            |

### 11.2 `study_group_members`

Stores group membership.

| Column    | Type        | Description                  |
| --------- | ----------- | ---------------------------- |
| id        | UUID        | Primary key                  |
| group_id  | UUID        | References `study_groups.id` |
| user_id   | UUID        | Member                       |
| role      | TEXT        | Owner, admin, member         |
| joined_at | TIMESTAMPTZ | Membership time              |

Rules:

* A user must be a group member to access private group content.
* Only authorized owners and admins may manage membership.
* Enforce unique membership per group and user.
* Validate invite codes on the server.

### 11.3 `group_tasks`

Stores tasks shared within study groups.

| Column       | Type        | Description                     |
| ------------ | ----------- | ------------------------------- |
| id           | UUID        | Primary key                     |
| group_id     | UUID        | References `study_groups.id`    |
| created_by   | UUID        | Task creator                    |
| assigned_to  | UUID        | Optional assigned member        |
| title        | TEXT        | Task title                      |
| description  | TEXT        | Optional description            |
| status       | TEXT        | Pending, in progress, completed |
| due_date     | TIMESTAMPTZ | Optional deadline               |
| completed_at | TIMESTAMPTZ | Optional completion time        |
| created_at   | TIMESTAMPTZ | Creation time                   |

Rules:

* Only authorized group members may access group tasks.
* Validate assignees against group membership.
* Enforce permissions for creating, updating, and deleting tasks.

---

## 12. Shared Goals and Challenges

### 12.1 `shared_goals`

Stores goals shared between friends or groups.

| Column        | Type        | Description                  |
| ------------- | ----------- | ---------------------------- |
| id            | UUID        | Primary key                  |
| created_by    | UUID        | Goal creator                 |
| group_id      | UUID        | Optional associated group    |
| title         | TEXT        | Goal title                   |
| description   | TEXT        | Optional description         |
| target_value  | NUMERIC     | Target value                 |
| current_value | NUMERIC     | Current value                |
| unit          | TEXT        | Goal measurement unit        |
| start_date    | DATE        | Start date                   |
| end_date      | DATE        | End date                     |
| status        | TEXT        | Active, completed, cancelled |
| created_at    | TIMESTAMPTZ | Creation time                |

### 12.2 `challenges`

Stores platform and group challenges.

| Column         | Type        | Description                            |
| -------------- | ----------- | -------------------------------------- |
| id             | UUID        | Primary key                            |
| created_by     | UUID        | Creator                                |
| group_id       | UUID        | Optional associated group              |
| title          | TEXT        | Challenge title                        |
| description    | TEXT        | Challenge description                  |
| challenge_type | TEXT        | DSA, focus, habits, academics, other   |
| target_value   | NUMERIC     | Target value                           |
| start_at       | TIMESTAMPTZ | Start time                             |
| end_at         | TIMESTAMPTZ | End time                               |
| status         | TEXT        | Upcoming, active, completed, cancelled |
| created_at     | TIMESTAMPTZ | Creation time                          |

### 12.3 `challenge_participants`

Stores challenge participation and progress.

| Column       | Type        | Description                          |
| ------------ | ----------- | ------------------------------------ |
| id           | UUID        | Primary key                          |
| challenge_id | UUID        | References `challenges.id`           |
| user_id      | UUID        | Participant                          |
| progress     | NUMERIC     | Current progress                     |
| status       | TEXT        | Joined, in progress, completed, left |
| joined_at    | TIMESTAMPTZ | Participation time                   |
| completed_at | TIMESTAMPTZ | Optional completion time             |

Rules:

* Prevent duplicate participation in the same challenge.
* Validate progress through trusted server-side logic.
* Challenge rewards must be awarded only after verifying completion.

---

## 13. XP, Levels, and Achievements

### 13.1 `xp_ledger`

Stores immutable XP transactions.

| Column          | Type        | Description                               |
| --------------- | ----------- | ----------------------------------------- |
| id              | UUID        | Primary key                               |
| user_id         | UUID        | XP recipient                              |
| source_type     | TEXT        | Task, DSA, focus, habit, challenge, other |
| source_id       | UUID        | Optional related record                   |
| points          | INTEGER     | XP awarded or deducted                    |
| idempotency_key | TEXT        | Unique key to prevent duplicate rewards   |
| metadata        | JSONB       | Optional reward metadata                  |
| created_at      | TIMESTAMPTZ | Transaction time                          |

### 13.2 `achievements`

Stores achievement definitions.

| Column      | Type        | Description              |
| ----------- | ----------- | ------------------------ |
| id          | UUID        | Primary key              |
| name        | TEXT        | Achievement name         |
| description | TEXT        | Achievement description  |
| icon        | TEXT        | Optional icon identifier |
| criteria    | JSONB       | Achievement criteria     |
| xp_reward   | INTEGER     | Optional XP reward       |
| created_at  | TIMESTAMPTZ | Creation time            |

### 13.3 `user_achievements`

Stores achievements earned by users.

| Column         | Type        | Description                  |
| -------------- | ----------- | ---------------------------- |
| id             | UUID        | Primary key                  |
| user_id        | UUID        | User                         |
| achievement_id | UUID        | References `achievements.id` |
| earned_at      | TIMESTAMPTZ | Achievement time             |

Rules:

* XP changes must be recorded through trusted server-side operations.
* Prevent duplicate awards using idempotency keys and database constraints.
* Users must not directly modify XP transactions or achievement records.
* Calculate XP totals from the ledger or maintain a securely updated balance.
* Achievement criteria must be validated before awarding an achievement.

---

## 14. Notifications

### 14.1 `notifications`

Stores notifications for users.

| Column      | Type        | Description                  |
| ----------- | ----------- | ---------------------------- |
| id          | UUID        | Primary key                  |
| user_id     | UUID        | Recipient                    |
| actor_id    | UUID        | Optional initiating user     |
| type        | TEXT        | Notification type            |
| title       | TEXT        | Notification title           |
| message     | TEXT        | Notification message         |
| entity_type | TEXT        | Optional related entity type |
| entity_id   | UUID        | Optional related record      |
| is_read     | BOOLEAN     | Read status                  |
| created_at  | TIMESTAMPTZ | Creation time                |

Rules:

* Users can read and update only their own notifications.
* Notification creation must be authorized.
* Do not include private data belonging to other users.

---

## 15. Analytics

Analytics should primarily be calculated from existing records.

### Data Sources

| Metric              | Source                                       |
| ------------------- | -------------------------------------------- |
| Tasks completed     | `tasks`                                      |
| Academic progress   | `academic_units`, `academic_assessments`     |
| DSA problems solved | `dsa_problems`                               |
| Focus time          | `focus_sessions`                             |
| Habit completion    | `habit_logs`                                 |
| Project progress    | `development_projects`, `project_milestones` |
| XP earned           | `xp_ledger`                                  |
| Challenge progress  | `challenge_participants`                     |

Use database views or carefully designed queries for aggregate metrics.

Do not create duplicate analytics tables unless performance measurements justify them.

---

## 16. Relationships

```text
auth.users
    |
    └── profiles
          |
          ├── tasks
          ├── academic_semesters
          |       └── academic_subjects
          |                ├── academic_units
          |                └── academic_assessments
          |
          ├── dsa_problems
          |       ├── dsa_problem_topics
          |       └── dsa_revisions
          |
          ├── development_projects
          |       └── project_milestones
          |
          ├── skills
          ├── focus_sessions
          ├── habits
          |       └── habit_logs
          |
          ├── friend_requests
          ├── study_groups
          |       ├── study_group_members
          |       └── group_tasks
          |
          ├── shared_goals
          ├── challenges
          |       └── challenge_participants
          |
          ├── xp_ledger
          ├── user_achievements
          └── notifications
```

---

## 17. Row Level Security (RLS)

Enable RLS on all tables containing user-owned or private data.

### Personal Data

For tasks, academics, DSA, projects, focus sessions, habits, and personal analytics:

* Users may access only records they own.
* Users may insert records only for themselves.
* Users may update or delete only records they own.
* Child records must be checked against the ownership of their parent records.

### Social Data

For friends, groups, shared goals, and challenges:

* Users may access only the social data they are authorized to see.
* Private group content is available only to authorized members.
* Only permitted roles can manage group settings and membership.
* Friend requests are visible only to their sender and receiver.

### XP and Achievements

* XP ledger entries are not directly writable by ordinary clients.
* Achievement definitions are read-only for ordinary users.
* Users may read their own earned achievements.
* Reward issuance is handled by trusted server-side logic.

### Notifications

* Users may read and update only their own notifications.
* Users cannot create notifications on behalf of arbitrary users.

---

## 18. Indexing Strategy

Add indexes for frequently used filters and relationships.

Recommended indexes:

* `profiles(username)` — unique.
* `tasks(user_id, status)`.
* `tasks(user_id, due_date)`.
* `academic_subjects(semester_id)`.
* `academic_units(subject_id)`.
* `dsa_problems(user_id, status)`.
* `dsa_problems(user_id, topic)`.
* `focus_sessions(user_id, started_at)`.
* `habit_logs(habit_id, log_date)`.
* `friend_requests(sender_id, status)`.
* `friend_requests(receiver_id, status)`.
* `study_group_members(group_id, user_id)` — unique.
* `challenge_participants(challenge_id, user_id)` — unique.
* `xp_ledger(user_id, created_at)`.
* `notifications(user_id, is_read, created_at)`.

Review indexes against actual query patterns and avoid unnecessary indexes.

---

## 19. Data Validation and Integrity

* Use `NOT NULL` constraints for required fields.
* Use `CHECK` constraints for valid statuses, percentages, and numeric ranges.
* Use unique constraints for usernames and membership records.
* Use foreign keys to enforce relationships.
* Use transactions for operations that must succeed or fail together.
* Validate ownership and authorization in trusted server-side logic.
* Prevent duplicate XP awards through database-enforced idempotency.
* Define appropriate deletion behavior for related records.

---

## 20. Database Migrations

Store schema changes in:

`supabase/migrations/`

Migration rules:

1. Every schema change must have a migration.
2. Review migrations before applying them to production.
3. Add RLS policies alongside new private tables.
4. Avoid destructive changes without a backup and migration plan.
5. Keep seed data separate from production data.
6. Test schema changes in the development environment first.

---

## 21. Implementation Phases

### Phase 1 — Core Personal Tracker

* profiles
* tasks
* academic_semesters
* academic_subjects
* academic_units
* academic_assessments
* dsa_problems
* focus_sessions

### Phase 2 — Development and Analytics

* development_projects
* project_milestones
* skills
* habits
* habit_logs
* analytics queries

### Phase 3 — Social Features

* friend_requests
* study_groups
* study_group_members
* group_tasks
* shared_goals
* challenges
* challenge_participants
* notifications

### Phase 4 — Gamification

* xp_ledger
* achievements
* user_achievements
* leaderboard queries

---

## 22. Completion Criteria

The database is ready when:

* All required tables and relationships are implemented.
* Foreign keys and validation constraints are configured.
* RLS is enabled and tested on private tables.
* Ownership checks work for parent and child records.
* XP rewards cannot be manipulated by clients.
* Required indexes are created.
* Migrations can be applied consistently.
* Core queries and social permissions are tested.
