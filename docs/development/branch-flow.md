# Branch flow

`main` is the public release line. `dev` is the integration branch. Work reaches
`main` only through a release pull request from `dev`.

## Feature pull requests

Start each change from an up-to-date `dev` and use the `feature/*` namespace.
Open the pull request against `dev`.

```sh
git switch dev
git pull --ff-only
git switch -c feature/<change>
```

Keep commits small, readable, and compatible with Conventional Commits. Rebase
merge feature pull requests so those commits remain visible on `dev`. Delete the
feature branch after merge.

For dependent changes, root the stack on `dev` explicitly:

```sh
gh stack init --base dev feature/<first-change>
gh stack add feature/<next-change>
gh stack submit
```

After updating an earlier layer, rebase and push the rest of the stack. After a
pull request merges, sync and prune the local stack.

```sh
gh stack rebase
gh stack push
gh stack sync --prune
```

## Releases

When `dev` is ready, open a pull request whose head is `dev` and whose base is
`main`:

```sh
gh pr create --base main --head dev
```

Merge that pull request with an explicit merge commit after its required checks
pass. The merge makes the reviewed `dev` tree the public release tree while
retaining the feature commits in its ancestry.

Do not create a long-lived release branch. Release automation may add versioning
commits to `main`; do not merge those commits back into `dev`.
