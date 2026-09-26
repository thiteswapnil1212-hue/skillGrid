# SkillGrid — API Specification

## 1. Overview

SkillGrid uses Next.js Server Actions and Route Handlers to handle application operations.

Supabase PostgreSQL is the primary database, and Supabase Auth manages authentication.

### API Design Principles

* Validate all incoming data on the server.
* Authenticate users before accessing protected resources.
* Enforce authorization for every protected operation.
* Use TypeScript and Zod for type safety and validation.
* Return consistent response structures.
* Keep business logic inside feature service modules.
* Avoid exposing database internals or secrets.
* Use pagination for large lists.
* Prevent duplicate operations where necessary.

---

## 2. API Architecture

```text
Frontend Components
        |
        v
Server Actions / Route Handlers
        |
        v
Authentication + Validation
        |
        v
Feature Service Layer
        |
        v
Supabase PostgreSQL + RLS
        |
        v
Structured Response
```

### Server Actions

Use Server Actions for authenticated, user-triggered operations such as:

* Creating and updating tasks.
* Updating academic progress.
* Adding DSA problems.
* Logging focus sessions.
* Managing habits.
* Sending friend requests.
* Joining study groups.

### Route Handlers

Use Route Handlers for:

* Health checks.
* External integrations.
* Webhooks.
* Operations that require a conventional HTTP API.
* Future integrations with external applications.

Do not create unnecessary REST endpoints for every database operation.

---

## 3. API Conventions

### Base URL

Production:

`https://<your-domain>/api`

Development:

`http://localhost:3000/api`

### HTTP Methods

| Method | Purpose                        |
| ------ | ------------------------------ |
| GET    | Retrieve data                  |
| POST   | Create or trigger an operation |
| PATCH  | Update an existing resource    |
| DELETE | Delete a resource              |

Server Actions are not conventional REST endpoints and do not need to follow this HTTP method table.

### Data Format

Use JSON for Route Handler request and response bodies unless the endpoint requires another format.

### Date and Time

* Use ISO 8601 timestamps.
* Store timestamps consistently in the database.
* Convert dates to the user's local time zone for display.

---

## 4. Authentication

Supabase Auth manages authentication and sessions.

### Authentication Operations

| Operation          | Method        |
| ------------------ | ------------- |
| Sign up            | Supabase Auth |
| Login              | Supabase Auth |
| Logout             | Supabase Auth |
| Password recovery  | Supabase Auth |
| Session validation | Supabase Auth |

### Authentication Rules

* Protected operations require an authenticated session.
* Verify the user on the server.
* Derive the user ID from the verified session.
* Never trust a client-provided user ID for authorization.
* Redirect unauthenticated users to `/login` for protected pages.
* Return an appropriate authentication error for unauthorized API requests.

---

## 5. Standard Response Format

### Success Response

```json
{
  "success": true,
  "data": {
    "id": "resource-uuid"
  },
  "message": "Operation completed successfully."
}
```

### Error Response

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Please check the submitted information."
  }
}
```

### Server Action Result

Use a consistent TypeScript result type:

```ts
type ActionResult<T> =
  | {
      success: true;
      data: T;
      message?: string;
    }
  | {
      success: false;
      error: {
        code: string;
        message: string;
      };
    };
```

Do not return raw database errors or stack traces to the client.

---

## 6. Error Codes

| Code             | Meaning                            |
| ---------------- | ---------------------------------- |
| VALIDATION_ERROR | Invalid input                      |
| UNAUTHENTICATED  | User is not logged in              |
| FORBIDDEN        | User lacks permission              |
| NOT_FOUND        | Requested resource does not exist  |
| CONFLICT         | Duplicate or conflicting operation |
| RATE_LIMITED     | Too many requests                  |
| INTERNAL_ERROR   | Unexpected server error            |

Use suitable HTTP status codes for Route Handler errors.

---

## 7. Tasks API

### Create Task

**Operation:** `createTask`

Input:

```json
{
  "title": "Complete DSA practice",
  "description": "Solve array problems",
  "category": "dsa",
  "priority": "high",
  "due_date": null
}
```

Behavior:

* Validate required fields.
* Verify the authenticated user.
* Create the task for the current user.
* Return the created task.

### List Tasks

**Operation:** `getTasks`

Supported filters:

* `status`
* `category`
* `priority`
* `due_date`
* `search`

Behavior:

* Return only tasks belonging to the current user.
* Support pagination and sorting.

### Update Task

**Operation:** `updateTask`

Input:

```json
{
  "task_id": "task-uuid",
  "title": "Complete DSA practice",
  "status": "in_progress"
}
```

Behavior:

* Verify task ownership.
* Validate updated fields.
* Return the updated task.

### Complete Task

**Operation:** `completeTask`

Behavior:

* Verify task ownership.
* Mark the task as completed.
* Set the completion timestamp.
* Process any eligible reward through trusted server-side logic.

### Delete Task

**Operation:** `deleteTask`

Behavior:

* Verify ownership.
* Delete the task.
* Return a success result.

---

## 8. Academics API

### Create Semester

**Operation:** `createSemester`

Input:

```json
{
  "name": "Semester 3",
  "semester_number": 3,
  "academic_year": "2026-2027"
}
```

### Create Subject

**Operation:** `createSubject`

Input:

```json
{
  "semester_id": "semester-uuid",
  "name": "Data Structures",
  "subject_code": "DSA"
}
```

### Create Unit

**Operation:** `createAcademicUnit`

Input:

```json
{
  "subject_id": "subject-uuid",
  "title": "Arrays and Linked Lists",
  "unit_number": 1
}
```

### Update Unit Progress

**Operation:** `updateUnitProgress`

Input:

```json
{
  "unit_id": "unit-uuid",
  "progress": 50,
  "status": "in_progress"
}
```

### Create Assessment

**Operation:** `createAssessment`

Input:

```json
{
  "subject_id": "subject-uuid",
  "title": "Unit Test 1",
  "assessment_type": "exam",
  "max_marks": 30
}
```

### Academic Rules

* Verify ownership of semesters, subjects, units, and assessments.
* Validate numeric values and statuses.
* Return only the current user's academic data.

---

## 9. DSA Tracker API

### Create Problem

**Operation:** `createDsaProblem`

Input:

```json
{
  "title": "Two Sum",
  "platform": "LeetCode",
  "difficulty": "easy",
  "topic": "Arrays",
  "problem_url": "https://leetcode.com/problems/two-sum/"
}
```

### List Problems

**Operation:** `getDsaProblems`

Supported filters:

* `difficulty`
* `topic`
* `status`
* `platform`
* `search`

### Update Problem

**Operation:** `updateDsaProblem`

Behavior:

* Verify ownership.
* Validate updated fields.
* Update the problem record.

### Log Revision

**Operation:** `logDsaRevision`

Input:

```json
{
  "problem_id": "problem-uuid",
  "notes": "Reviewed the solution and complexity."
}
```

### DSA Rules

* Validate problem URLs where applicable.
* Verify problem ownership before creating revisions.
* Prevent unauthorized access to private notes.
* Track solve and revision history accurately.

---

## 10. Development Projects API

### Create Project

**Operation:** `createProject`

Input:

```json
{
  "title": "SkillGrid",
  "description": "Student productivity platform",
  "status": "in_progress",
  "repository_url": "https://github.com/example/skillgrid"
}
```

### Update Project

**Operation:** `updateProject`

Behavior:

* Verify ownership.
* Validate project fields.
* Update the project.

### Create Milestone

**Operation:** `createProjectMilestone`

Input:

```json
{
  "project_id": "project-uuid",
  "title": "Complete authentication",
  "due_date": null
}
```

### Project Rules

* Validate URLs and status values.
* Verify project ownership before modifying milestones.
* Keep personal project information private by default.

---

## 11. Focus Sessions API

### Start Session

**Operation:** `startFocusSession`

Input:

```json
{
  "session_type": "focus",
  "planned_duration": 1500,
  "task_id": null
}
```

### Complete Session

**Operation:** `completeFocusSession`

Input:

```json
{
  "session_id": "session-uuid"
}
```

Behavior:

* Verify ownership.
* Validate session state and timing.
* Record completion using trusted server-side timestamps.
* Process eligible rewards only after validating the session.

### Interrupt Session

**Operation:** `interruptFocusSession`

Behavior:

* Verify ownership.
* Record the interruption.
* Preserve the session history.

### Focus Rules

* Prevent invalid or negative durations.
* Do not trust client-submitted elapsed time for reward calculations.
* Prevent multiple conflicting active sessions if the product requires a single active session.

---

## 12. Habits API

### Create Habit

**Operation:** `createHabit`

Input:

```json
{
  "title": "Practice Java",
  "frequency": "daily",
  "target_count": 1
}
```

### List Habits

**Operation:** `getHabits`

Behavior:

* Return the current user's habits.
* Support active and inactive filters.

### Log Habit

**Operation:** `logHabit`

Input:

```json
{
  "habit_id": "habit-uuid",
  "log_date": "2026-09-26",
  "completed_count": 1
}
```

### Update Habit

**Operation:** `updateHabit`

Behavior:

* Verify ownership.
* Validate frequency and target values.
* Update the habit.

### Habit Rules

* Prevent duplicate logs where required.
* Validate completion counts.
* Calculate streaks using consistent date and time-zone rules.

---

## 13. Friends API

### Search Users

**Operation:** `searchUsers`

Input:

```json
{
  "query": "username",
  "limit": 20
}
```

Behavior:

* Search only profiles that are discoverable.
* Return limited public profile information.
* Do not expose private fields.

### Send Friend Request

**Operation:** `sendFriendRequest`

Input:

```json
{
  "receiver_id": "user-uuid"
}
```

### Accept Friend Request

**Operation:** `acceptFriendRequest`

Input:

```json
{
  "request_id": "request-uuid"
}
```

### Reject Friend Request

**Operation:** `rejectFriendRequest`

Input:

```json
{
  "request_id": "request-uuid"
}
```

### Cancel Friend Request

**Operation:** `cancelFriendRequest`

Input:

```json
{
  "request_id": "request-uuid"
}
```

### List Friends

**Operation:** `getFriends`

Behavior:

* Return accepted connections for the authenticated user.
* Apply privacy settings to profile information.

---

## 14. Study Groups API

### Create Group

**Operation:** `createStudyGroup`

Input:

```json
{
  "name": "Java DSA Study Group",
  "description": "Practice and discuss DSA",
  "visibility": "private"
}
```

### Join Group

**Operation:** `joinStudyGroup`

Input:

```json
{
  "group_id": "group-uuid"
}
```

### Leave Group

**Operation:** `leaveStudyGroup`

Input:

```json
{
  "group_id": "group-uuid"
}
```

### Create Group Task

**Operation:** `createGroupTask`

Input:

```json
{
  "group_id": "group-uuid",
  "title": "Solve array problems",
  "assigned_to": null
}
```

### Group Rules

* Verify membership and role permissions.
* Validate group visibility and invitation requirements.
* Verify assigned users are group members.
* Restrict private group content to authorized members.

---

## 15. Shared Goals and Challenges API

### Create Shared Goal

**Operation:** `createSharedGoal`

Input:

```json
{
  "title": "Solve 50 DSA problems",
  "target_value": 50,
  "unit": "problems",
  "start_date": "2026-09-26",
  "end_date": "2026-10-26"
}
```

### Create Challenge

**Operation:** `createChallenge`

Input:

```json
{
  "title": "7-Day Focus Challenge",
  "challenge_type": "focus",
  "target_value": 7,
  "start_at": "2026-09-26T00:00:00Z",
  "end_at": "2026-10-03T00:00:00Z"
}
```

### Join Challenge

**Operation:** `joinChallenge`

Input:

```json
{
  "challenge_id": "challenge-uuid"
}
```

### Update Challenge Progress

**Operation:** `updateChallengeProgress`

Behavior:

* Verify participation.
* Validate progress against trusted activity records.
* Prevent duplicate rewards.
* Update completion status when criteria are met.

---

## 16. Leaderboard API

### Get Leaderboard

**Operation:** `getLeaderboard`

Supported filters:

* `scope`: friends, group, college, global
* `period`: weekly, monthly, all_time
* `limit`: page size
* `cursor`: pagination cursor

Behavior:

* Calculate rankings using validated XP records.
* Apply privacy and visibility rules.
* Return only fields needed for the leaderboard.
* Use consistent period boundaries.
* Do not expose private academic or activity records.

Example response:

```json
{
  "success": true,
  "data": {
    "period": "weekly",
    "entries": [
      {
        "rank": 1,
        "username": "student123",
        "xp": 250
      }
    ]
  }
}
```

---

## 17. Notifications API

### List Notifications

**Operation:** `getNotifications`

Supported filters:

* `is_read`
* `limit`
* `cursor`

### Mark Notification as Read

**Operation:** `markNotificationRead`

Input:

```json
{
  "notification_id": "notification-uuid"
}
```

### Mark All as Read

**Operation:** `markAllNotificationsRead`

Behavior:

* Update only notifications belonging to the authenticated user.

---

## 18. Profile and Settings API

### Get Profile

**Operation:** `getProfile`

Behavior:

* Return the current user's permitted profile information.

### Update Profile

**Operation:** `updateProfile`

Input:

```json
{
  "full_name": "Student Name",
  "bio": "Learning Java and building projects",
  "college": "College Name"
}
```

### Update Privacy Settings

**Operation:** `updatePrivacySettings`

Input:

```json
{
  "is_public": false
}
```

### Profile Rules

* Validate usernames and profile fields.
* Enforce username uniqueness.
* Prevent users from editing another user's profile.
* Apply privacy settings consistently across search and social features.

---

## 19. Analytics API

### Get Dashboard Summary

**Operation:** `getDashboardSummary`

Returns:

* Tasks completed.
* Pending tasks.
* Academic progress.
* DSA problem counts.
* Focus time.
* Habit completion.
* Recent activity.

### Get Analytics

**Operation:** `getAnalytics`

Supported filters:

* `period`
* `start_date`
* `end_date`

Behavior:

* Calculate metrics from authorized records.
* Use consistent date boundaries.
* Return only the current user's private analytics unless the data is explicitly shared.

---

## 20. Health Check

### Endpoint

`GET /api/health`

Purpose:

* Confirm that the application is responding.
* Optionally report the status of required dependencies without exposing secrets.

Example response:

```json
{
  "success": true,
  "data": {
    "status": "ok"
  }
}
```

Do not expose credentials, database connection strings, or detailed internal errors.

---

## 21. Pagination

Use cursor-based pagination for large or frequently changing lists.

Example:

```json
{
  "success": true,
  "data": {
    "items": [],
    "next_cursor": null
  }
}
```

Rules:

* Apply a reasonable default page size.
* Enforce a maximum page size.
* Use stable ordering.
* Validate cursor values.
* Enforce authorization on every page request.

---

## 22. Validation

Use Zod schemas for incoming data.

Example:

```ts
import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().trim().min(1).max(200),
  description: z.string().max(2000).optional(),
  category: z.enum([
    "personal",
    "academics",
    "dsa",
    "development",
    "other",
  ]),
  priority: z.enum(["low", "medium", "high"]),
  due_date: z.string().datetime().nullable().optional(),
});
```

Validation rules:

* Validate all input on the server.
* Reject unknown or invalid values where appropriate.
* Apply reasonable text length limits.
* Validate UUIDs and URLs.
* Validate dates and numeric ranges.
* Do not rely only on frontend validation.

---

## 23. Rate Limiting and Abuse Prevention

Apply rate limits to operations that can be abused, including:

* Login-related endpoints.
* User search.
* Friend requests.
* Group invitations.
* Challenge creation.
* XP-generating operations.

Use server-side rate limiting and enforce appropriate restrictions on sensitive operations.

Do not rely on client-side restrictions alone.

---

## 24. API Security Checklist

* [ ] Authenticate every protected operation.
* [ ] Validate every incoming payload.
* [ ] Enforce ownership and authorization.
* [ ] Verify parent-child relationships.
* [ ] Apply RLS to private database tables.
* [ ] Prevent duplicate friend requests and XP rewards.
* [ ] Protect private group content.
* [ ] Avoid exposing private profile fields.
* [ ] Keep secrets out of client-side code.
* [ ] Return structured errors.
* [ ] Apply rate limits where needed.
* [ ] Test unauthorized access attempts.

---

## 25. Implementation Order

### Phase 1 — Core Tracker

* Authentication and profile.
* Tasks.
* Academics.
* DSA tracker.
* Focus sessions.

### Phase 2 — Personal Growth

* Development projects.
* Skills.
* Habits.
* Analytics.

### Phase 3 — Social Features

* Friends.
* Study groups.
* Shared goals.
* Challenges.
* Notifications.

### Phase 4 — Gamification

* XP ledger.
* Achievements.
* Leaderboards.

---

## 26. Completion Criteria

The API layer is ready when:

* All implemented operations validate their inputs.
* Protected operations verify authentication and authorization.
* Database access follows the security rules.
* Response formats are consistent.
* Errors are handled safely.
* Pagination works for large lists.
* XP and challenge rewards cannot be manipulated by clients.
* Critical operations have appropriate automated tests.
