# Shared foundation utilities

Independent Cedar / Maple copies follow the same runtime and type contract in `design-ui/standards/shared-foundation.md`.

The package exposes 41 explicit runtime utilities and the `MotionState` type. Array, DOM, function, motion, namespace, number, object, predicate and string modules remain tree-shakeable. Import types with `import type`; no wholesale rattail export or deprecated compatibility aliases are retained before the first public release.

Run `pnpm check:shared` from the repository root to build ESM / CJS and declarations in a temporary directory and verify behavior and bundle limits. Run `pnpm check:foundations` in the adjacent design-ui repository for cross-library source and type parity. See `THIRD_PARTY_NOTICES` for retained license attribution.
