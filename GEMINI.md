# Gemini Project Context: Rick and Morty Viewer

## Project Overview

This project is a web application called "Rick and Morty Viewer". It's built with React, TypeScript, and Vite, and styled with Tailwind CSS. The application allows users to browse information about characters, locations, and episodes from the "Rick and Morty" TV show by fetching data from the official Rick and Morty API (`https://rickandmortyapi.com/api`).

It features client-side routing using `react-router` (v7) and includes an authentication system (login/signup) to protect certain routes.

**Key Technologies:**

- **Framework:** React (v19 experimental)
- **Language:** TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router v7
- **Package Manager:** npm

## Building and Running

The project is managed with npm. Here are the primary commands found in `package.json`:

- **`npm run dev`**: Starts the Vite development server for the frontend application.
- **`npm run build`**: Compiles the TypeScript code and builds the application for production.
- **`npm run lint`**: Runs the ESLint linter to check for code quality issues.
- **`npm run preview`**: Serves the production build locally to preview it.

**To run the project locally:**

1.  Run `npm install` to install the dependencies.
2.  Run `npm run dev`.
3.  Open the URL provided by the Vite server in your browser.

## Development Conventions

- **Component-Based Architecture:** The code is organized into components (`src/components`), pages (`src/pages`), and a main layout (`src/components/Layout.tsx`).
- **Routing:** All routes are defined in `src/router/index.tsx` using `createBrowserRouter`.
- **State Management:** Global state, such as authentication status, is managed via React Context (`src/context`).
- **Data Fetching:** Custom hooks (`src/hooks`) are used to fetch data from the API.
- **Styling:** Utility-first CSS is implemented with Tailwind CSS.
- **Types:** All custom types are centralized in `src/types/index.ts`.

### Commits

This project follows the [Conventional Commits](https://www.conventionalcommits.org/) specification.

**Commonly used scopes:**

- `hooks`
- `datasource`
- `components`
- `routing`
- `api`
- `ai`
