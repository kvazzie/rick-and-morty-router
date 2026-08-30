# Domain docs

## Before exploring

Read the root `CONTEXT.md` when it exists. If `CONTEXT-MAP.md` exists instead, read the relevant mapped context. Read root `docs/adr/` records that affect the work.

When these files do not exist, continue without calling out their absence. Create them only when a domain-modeling decision requires them.

## Layout

This is a single-context project.

```text
/
├── CONTEXT.md
├── docs/adr/
└── src/
```

## Terminology

Use terms defined in `CONTEXT.md` in issues, proposals, and tests. If a needed term is missing, reconsider the wording or record the gap for domain modeling.

## ADR conflicts

Call out any proposal that conflicts with an existing ADR rather than silently overriding it.
