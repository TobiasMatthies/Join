# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm start` (`ng serve`) — dev server at http://localhost:4200
- `npm run build` — production build into `dist/join/` (served by Firebase Hosting, see `firebase.json`; all routes rewrite to `index.html`)
- `npm run watch` — development-configuration build in watch mode
- `npm test` (`ng test`) — Karma/Jasmine unit tests (needs Chrome); single spec: `ng test --include='src/app/path/to/file.spec.ts'`
- Formatting uses Prettier (with `prettier-plugin-tailwindcss`); there is no lint script.

## Stack

Angular 21 app (standalone components, no NgModules; bootstrapped in `src/main.ts` with `bootstrapApplication`), Tailwind CSS v4 (theme tokens like `custom-blue` defined in `src/styles.css` via `@theme`), Angular CDK drag-drop, rxjs. Many components still have per-component `.css` files alongside Tailwind utility classes. The README is the stale Angular CLI boilerplate.

## Architecture

"Join" is a Kanban-style task manager. There is **no Firebase SDK and no custom backend**: everything talks to Firebase over plain REST via `HttpClient`.

- **Auth** (`services/auth.service.ts`): Firebase Identity Toolkit REST (`signUp` / `signInWithPassword`). The user (incl. ID token) is held in a `BehaviorSubject<User>` and persisted to `localStorage['user']`; `AppComponent.ngOnInit` calls `autoLogin()`. `AuthGuard` (`auth/auth.guard.ts`) protects routes by reading that subject; unknown routes redirect to `/welcome`. Usernames are stored in `localStorage` keyed by email.
- **Persistence** (`services/data-storage.service.ts`): Realtime Database REST at `https://join-12c12-default-rtdb.firebaseio.com/<endpoint>`, authenticated with `?auth=<user.token>`. `getItem` / `setItem` (PUT, fire-and-forget) operate on whole collections: `tasks.json`, `contacts.json`, `categories.json`. `AuthService` and `DataStorageService` depend on each other, so the latter fetches the former lazily through `Injector`. `getItem(..., skipAuth=true)` is for unauthenticated reads (e.g. the public `/create-request` page).
- **State** (`services/app-state.service.ts`): a plain singleton holding `tasks`, `contacts`, `categories` in memory. Components mutate these arrays directly, then call `setItem` to push the *entire* array back — there are no per-record updates, so refetch/overwrite races are possible. `fetchData()` loads all three collections.
- **Task logic** (`services/add-task.service.ts`, `task-detail.service.ts`): `AddTaskService` is a large singleton owning the add/edit task reactive form (`initAddTaskForm` / `initEditForm`), overlay open/close flags and animations, contact/category/subtask selection, and task persistence. It is shared by the `/add-task` page, the add-task overlay, and the board's task-detail edit view. `TaskDetailService` tracks the currently opened task.
- **Models** (`models/`): `Task.status` is `'triage' | 'toDo' | 'inProgress' | 'awaitingFeedback' | 'done'`; new tasks default to `triage`, and the board has a column/drop list per status (`board/board.component.ts`, `board-column`). `Task.aiGenerated` flags tasks created by AI (shown in task-detail-info). `Task.assignedTo` holds `Contact`s, which distinguish members from externs.
- **Routing** (`app.routes.ts`): guarded pages are summary (`''` and `/summary`), board, add-task, contacts, help; public pages are welcome, login, signup, forgot-password, create-request (`email-requests/`), legal-notice.
- **Layout**: feature folders under `src/app/` (`board`, `contacts`, `add-task`, `summary`, `auth`, `email-requests`); shared chrome in `headers/`, `navbar/`, `layout/`; reusable bits in `customComponents/`.

## Gotchas

- The Firebase web API key and database URL are hard-coded in the services (the `environments/` files only contain `production`). Don't copy keys into docs or commits.
- `angular.json` currently has an uncommitted `cli.analytics: false` change; unrelated to feature work.
