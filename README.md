# Task Management — Frontend

A task and project management application built with Next.js (App Router), Tailwind CSS, and TypeScript, based on the provided Figma design (Pyramid task manager).

## Live Demo
- **Frontend:** https://task-management-jed0ooqho-renuka-u.vercel.app
- **Backend API:** https://task-management-backend-production-5e7f.up.railway.app

## Tech Stack
- Next.js (App Router)
- TypeScript
- Tailwind CSS v4
- React Context API for global state management (Tasks, Projects, Theme, User)
- Lucide React for icons

## Application Workflow

This mirrors the flow shown across the 13 Figma reference screens:

1. **Login** — "Continue as Guest" creates a guest user via the backend and redirects into the app. "Login with Google" is present in the UI to match the design but has no functionality wired to it (see Known Limitations).

2. **Tasks — Board view** — the default landing screen after login. Kanban board with four columns (To Do, Doing, Completed, On Hold). Each card shows title, priority, assignee, due date, and labels (toggle-able via Fields). Supports search, multi-field filtering (Priority, Status, Labels, Members), adding tasks (both a general "+ Add Task" and a per-column quick-add), and deleting tasks.

3. **Tasks — List view** — same underlying task data as Board view, rendered as grouped tables instead of columns. Toggled via the Fields dropdown. Search, filters, and Add Task all work identically here since both views share the same data and logic.

4. **Task Detail page** — clicking any task (from either Board or List) opens its full page:
   - Editable title, description, assignee, labels
   - Priority dropdown (color-coded), editable directly
   - Subtasks table — add, delete, and edit priority/due date per subtask
   - Comments section — post comments and threaded replies
   - Updates panel — an auto-generated activity log; currently logs priority changes automatically (e.g. "You changed priority from No priority to High")
   - All edits here save to the backend immediately and are reflected back on the Board/List views without needing a refresh

5. **Projects** — clicking "Projects" in the sidebar opens a table of projects (Priority, Lead, Due Date). Clicking "+ Add Project" creates a new project, which then appears in this list. Projects and Tasks are related: a task can optionally belong to a project via `projectId`.

6. **Project Detail page** — clicking a project from the list opens its own scoped view, showing only the tasks that belong to that project, grouped by status (To Do / Doing / Completed / On Hold) — reusing the same List view component as the main Tasks page.

7. **Settings (via sidebar avatar → Settings)** — Profile tab lets you edit full name, title, username, and email. Theme tab switches Light/Dark mode. Color tab switches an accent color (used on primary buttons like "Add Task"). Both Theme and Color persist across page refreshes via localStorage. "Leave Workspace" clears local session data and returns to the Login page.

## Features Implemented

### Authentication
- Guest login (calls backend, creates a guest user, redirects to Tasks)
- "Login with Google" button is present for design fidelity but is not functionally wired (no real OAuth was implemented — out of scope for this assessment)

### Tasks
- Board view and List view, fully interactive in both
- Create, delete tasks
- Edit priority directly from Board/List cards, with color coding
- Search by title
- Filter by Priority, Status, Labels, Members
- Fields dropdown to toggle visible card/row properties

### Task Detail Page
- Full editable properties (description, assignee, labels)
- Subtasks: add, delete, edit priority and due date individually
- Comments and threaded replies
- Auto-logged Updates panel (priority changes)
- Right-side icon row (Lock, Eye/viewer count, Share, More, Panel toggle) is present visually to match the Figma design, but these icons are **static/non-functional** — they were not wired to real sharing/visibility/panel-collapse behavior, since that functionality wasn't part of the core task management flow being assessed.

### Projects
- Project list with Priority, Lead, Due Date
- "+ Add Project" creates a new project
- Editable priority and due date per project row, with delete
- Clicking a project opens its own filtered task list, scoped to that project, using the same task table component as the main Tasks page

### Theme & Settings
- Light/Dark theme toggle, persisted via localStorage
- Accent color picker (6 options), persisted via localStorage, applied to primary buttons (Add Task / Add Project)
- Editable Profile (name, title, username, email)
- Leave Workspace (clears local session, returns to Login)

### Responsive Design
- Layout adapts across desktop and smaller viewports

## Known Limitations / Intentional Scope Decisions

- **"Login with Google"** is visually present to match the Figma design but has no real OAuth integration — clicking it does nothing. Only Guest login is functional, which is what the assignment explicitly asked for.
- **The icon row on the Task Detail page** (Lock, Eye count, Share, More, Panel toggle) — visible in the Figma reference — is static UI only. These were not implemented functionally, as they represent secondary features (sharing, visibility settings, panel collapsing) outside the core CRUD/task-management scope this assessment focuses on.
- **Dark mode** is implemented via global CSS overrides targeting the app's common utility classes, rather than exhaustive per-component `dark:` Tailwind variants, to get full-app coverage within the project timeline.
- **Accent color** is applied to primary action buttons only (Add Task, Add Project), not reskinned across every UI element.
- **Members** (task assignee) is editable only from the Task Detail page, not directly from Board/List cards — this matches the Figma design, where "Add members" only appears in the Details panel on the detail view, not on the card/row itself.
- **Activity log (Updates)** currently auto-logs priority changes only. Other field edits (labels, dates, assignee) are not logged, to keep this feature proportionate in scope.
- **Comment author** is a static "You" label rather than tied to a real authenticated user identity, consistent with the guest-only auth model.

## Getting Started (Local Development)

```bash
npm install
```

Create a `.env.local` file in the project root:
```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

Run the backend (see backend README) separately, then:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deployment
Deployed on Vercel. The `NEXT_PUBLIC_API_URL` environment variable is set in Vercel's project settings to point to the deployed backend.

## Backend Repository
[https://github.com/renuka0309/task-management-backend.git]