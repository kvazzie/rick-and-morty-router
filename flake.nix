{
  description = "Rick and Morty Platform";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs =
    { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = import nixpkgs { inherit system; };
      in
      {
        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [
            nodejs_22
            pnpm
            nodePackages.typescript
            nodePackages.typescript-language-server
          ];

          shellHook = ''
            export PATH="$PWD/node_modules/.bin:$PATH"
            echo "Rick and Morty Platform dev environment"
            echo "  Node: $(node --version)"
            echo "  pnpm: $(pnpm --version)"
            echo "Run 'pnpm install' first if not done yet"
          '';
        };
      }
    );
}
