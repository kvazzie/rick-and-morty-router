# Rick and Morty Platform

Rick and Morty Platform is a private TypeScript monorepo. The existing React PWA lives in the
`@rick-and-morty-platform/web` workspace under `apps/web`.

## Workspaces

- `apps/web` contains the Rick and Morty Viewer application.

New applications and shared packages belong in the repository only when a product requirement needs them.

## Development

Install the pinned pnpm version and dependencies, then run commands from the repository root.

```sh
pnpm install
pnpm dev
```

The root also provides `build`, `lint`, `fmt`, `fmt:check`, `test`, `preview`, and `generate-pwa-assets` commands.
Application commands select the web workspace, so contributors do not need to change directories.

## Releases

The root `package.json` owns the repository version. Workspace packages are private and unversioned, which prevents
them from drifting into independent release lines. Releases use one root changelog and never publish a workspace to
npm.
