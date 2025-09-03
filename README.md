# Todo Tracker

This README was generated with [readme-md-generator](https://github.com/kefranabg/readme-md-generator).

A simple, responsive Todo application built with React, TypeScript, and Material UI. It lets you add, complete, filter, sort, and delete tasks. Data is persisted in the browser via LocalStorage.

Live app: https://todo-tracker2.vercel.app/ListCards

Contact: parbanas@gmail.com

## Features
- Add todos with description, position, completed flag, and due date
- Toggle completion status
- Delete todos
- Filter by description, position, completion status, and due date range
- Sort by description, position, status, or due date
- Client-side persistence with LocalStorage
- Protected routes (login-gated sections)
- Responsive UI using Material UI and Flexbox

## Tech Stack
- React 19 + TypeScript
- Vite for dev/build
- React Router for routing
- Zustand (with immer + persist) for state management
- Material UI (@mui/material, @mui/icons-material, @mui/x-date-pickers)
- date-fns and dayjs for date handling
- Vitest + Testing Library for tests
- ESLint for linting

## Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation
1. Clone the repository
2. Install dependencies:
   npm install

### Development
Run the dev server with Vite:
   npm run dev

The app will be available on the address printed in the console (by default http://localhost:5173). The dev script is configured to bind to 0.0.0.0 so you can access it from your LAN as well.

### Build
Create a production build:
   npm run build

Preview the production build locally:
   npm run preview

### Test
Run unit and component tests using Vitest and Testing Library:
   npm test

### Lint
Run ESLint:
   npm run lint

## Project Structure
- src/main.tsx: Entry point that calls renderAppRoot
- src/appRoot.tsx: Sets up StrictMode, Material UI baseline, BrowserRouter, and renders routes
- src/MyRoutes.tsx: Application routes, including protected routes and 404
- src/App.tsx: Top-level layout (header, sidebar, footer, main content); navigation and logout/reset controls
- src/AppState.ts: Zustand store with persisted state (LocalStorage); todo actions (add, remove, toggle complete)
- src/Types/DataTypes.ts: Shared TypeScript types for todos, state, and props
- src/Helpers: Misc helpers, e.g., ProtectedRoute and date-picker wrapper
- public/ and index.html: Static assets and HTML template

## State Management
State is managed with Zustand and persisted to LocalStorage under the key app-state. The store exposes:
- isAuthenticated: boolean flag for route protection
- todoData: array of todos
- actions: addTodo, removeTodo, completedTodo, setIsAuthenticated

On app start, sample todos get randomized due dates for the current month.

## Routing
- /: Home page
- /login: Login page
- /ListCards: List of todos (protected)
- /addTodo: Add todo (protected)
- /about: About page (protected)
- *: 404 page

## Usage Tips
- Use the sidebar to navigate. After logging in, protected routes become available.
- Use Reset Storage to clear persisted state and restore the initial sample todos.
- Due dates can be chosen using the Material UI Date Pickers.

## Deployment
This repo includes a vercel.json. A typical deployment flow on Vercel will detect the Vite app:
- Build command: npm run build
- Output directory: dist
- Framework preset: Vite

## Contributing
- Fork the repo and create a feature branch
- Run lint and tests before opening a PR
- Keep components typed and prefer colocating component-specific styles and helpers when sensible

## License
This project is part of a personal portfolio. If you plan to reuse parts of it, please provide attribution.
