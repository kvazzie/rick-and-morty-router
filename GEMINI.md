# Gemini Project Context: Rick and Morty Platform

## Project Overview

This project is a private TypeScript monorepo. Its current product is the "Rick and Morty Viewer" web application under `apps/web`. The application uses React, TypeScript, Vite, and Tailwind CSS. It allows users to browse information about characters, locations, and episodes from the "Rick and Morty" TV show by fetching data from the official Rick and Morty API (`https://rickandmortyapi.com/api`).

It features client-side routing using `react-router` (v7) and includes an authentication system (login/signup) to protect certain routes.

**Key Technologies:**

- **Framework:** React (v19 experimental)
- **Language:** TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router v7
- **Package Manager:** pnpm

## Building and Running

The project is managed with pnpm. Run these root `package.json` commands from the repository root:

- **`pnpm dev`**: Starts the Vite development server for the web application.
- **`pnpm build`**: Builds the web application for production.
- **`pnpm lint`**: Runs Oxlint for the web application.
- **`pnpm preview`**: Serves the production build locally to preview it.

**To run the project locally:**

1.  Run `pnpm install` to install the dependencies.
2.  Run `pnpm dev`.
3.  Open the URL provided by the Vite server in your browser.

## Development Conventions

- **Component-Based Architecture:** The web code is organized into components (`apps/web/src/components`), pages (`apps/web/src/pages`), and a main layout (`apps/web/src/components/Layout.tsx`).
- **Routing:** The web workspace uses React Router.
- **State Management:** Global state, such as authentication status, is managed via React Context (`apps/web/src/context`).
- **Data Fetching:** Custom hooks (`apps/web/src/hooks`) are used to fetch data from the API.
- **Styling:** Utility-first CSS is implemented with Tailwind CSS.
- **Types:** All custom types are centralized in `apps/web/src/types/index.ts`.

### Commits

This project follows the [Conventional Commits](https://www.conventionalcommits.org/) specification.

**Commonly used scopes:**

- `hooks`
- `datasource`
- `components`
- `routing`
- `api`
- `ai`
