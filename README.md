# Task Management — Frontend

A task and project management application built with Next.js (App Router), Tailwind CSS, and TypeScript, based on the provided Figma design.

## Live Demo
- Frontend: [your Vercel URL here]
- Backend API: [your Railway URL here]

## Tech Stack
- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- React Context for state management

## Features Implemented

### Authentication
- Guest login (creates a guest user via backend API, redirects to Tasks board)
- "Login with Google" UI present but not functionally wired (out of scope)

### Tasks
- Board view (Kanban: To Do / Doing / Completed / On Hold)
- List view (grouped table)
- Toggle between Board and List views
- Create task (top-right button and per-column quick-add)
- Delete task
- Edit priority directly from Board/List views (color-coded)
- Search (filters by title)
- Filter by Priority, Status, Labels, Members, Due Date
- Fields dropdown (toggle visible card/row properties)
- Click a task to open its full Detail page

### Task Detail Page
- Editable title, description, assignee, labels
- Priority, editable via dropdown
- Subtasks: add, delete, edit priority and due date per subtask
- Comments: add comments and threaded replies
- Auto-generated Updates/activity log (logs priority changes)
- All changes persist to the backend and reflect across Board/List views

### Projects
- Project list (table view: Priority, Lead, Due Date)
- Create, edit (priority, due date), delete projects
- Click into a project to view its scoped tasks

### Theme & Settings
- Light/Dark theme toggle, persisted via localStorage
- Accent color picker (6 options), persisted via localStorage, applied to primary action buttons
- Profile page: editable full name, title, username, email
- Leave Workspace (clears local session, returns to login)

### Responsive Design
- Layout adapts across desktop and smaller viewports

## Known Limitations / Scope Decisions
- "Login with Google" is UI-only, not functionally wired (no real OAuth needed for this assessment's scope)
- Dark mode is implemented via global CSS overrides targeting common utility classes rather than exhaustive per-component `dark:` variants, for full-app coverage within the project timeline
- Color Mode accent is applied to primary buttons (Add Task/Add Project), not exhaustively across every UI element
- Members field is editable only from the Task Detail page, not directly from Board/List cards (matches Figma's "Add members" affordance shown only on the detail view)
- Activity log (Updates) currently auto-logs priority changes only; other field changes are not logged, to keep scope focused

## Getting Started

```bash
npm install
```

Create a `.env.local` file: