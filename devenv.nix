{ pkgs, ... }:

{
  # https://devenv.sh/languages/
  # Replaces the old flake.nix mkShell (nodejs_22 + pnpm +
  # nodePackages.typescript/typescript-language-server, the latter removed
  # upstream in nixpkgs: `nodePackages has been removed`).
  languages.javascript = {
    enable = true;
    package = pkgs.nodejs_22;
    pnpm = {
      enable = true;
      # Repo pins pnpm@10 via `packageManager`; keep Nix pnpm on v10.
      package = pkgs.pnpm_10;
      install.enable = true;
    };
  };

  languages.typescript.enable = true;

  # https://devenv.sh/basics/
  enterShell = ''
    export PATH="$PWD/node_modules/.bin:$PATH"
    echo "Rick and Morty Platform dev environment"
    echo "  Node: $(node --version)"
    echo "  pnpm: $(pnpm --version)"
    echo "Run 'pnpm install' first if not done yet"
  '';

  # https://devenv.sh/tasks/
  # Mirrors root package.json scripts (`pnpm <name>` stays canonical).
  tasks = {
    "platform:dev".exec = "pnpm dev";
    "platform:build".exec = "pnpm build";
    "platform:lint".exec = "pnpm lint";
    "platform:fmt".exec = "pnpm fmt";
    "platform:test".exec = "pnpm test";
    "platform:preview".exec = "pnpm preview";
    "platform:generate-pwa-assets".exec = "pnpm generate-pwa-assets";
  };

  # https://devenv.sh/processes/
  # `devenv up` starts the Vite dev server (`pnpm dev`).
  processes.dev.exec = "pnpm dev";
}
