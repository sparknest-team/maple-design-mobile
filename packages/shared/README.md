# Shared foundation utilities

Independent Cedar / Maple copies follow the same runtime and type contract in `design-ui/standards/shared-foundation.md`.

The package exposes 41 explicit runtime utilities and the `MotionState` type. Array, DOM, function, motion, namespace, number, object, predicate and string modules remain tree-shakeable. Import types with `import type`; no wholesale rattail export or deprecated compatibility aliases are retained before the first public release.

Run `pnpm check:shared` from the repository root to build ESM / CJS and declarations in a temporary directory and verify behavior and bundle limits. Run `pnpm check:foundations` in the adjacent design-ui repository for cross-library source and type parity. See `THIRD_PARTY_NOTICES` for retained license attribution.

## Motion duration

`motion` defaults an omitted duration to 300ms. Finite nonnegative durations are supported. Zero, negative and nonfinite durations complete at the target on the next scheduled frame, with one finished notification and no continuing frame loop. Pausing/resetting before that frame cancels completion. `useMotion` preserves an explicit numeric zero rather than replacing it with the default.

## Decimal floor

`floor(value, precision)` returns a number rounded toward negative infinity, including scientific notation. Precision is an integer clamped to [-292, 292]; fractional and nonfinite precision falls back to 0. Omitted precision is 0. Negative precision rounds at tens/hundreds and larger decimal places. The number result does not retain trailing zeros. Nonfinite values and signed zero retain Math.floor behavior. Decimal digits are truncated before constructing the result to avoid scaling overflow or subnormal underflow. IEEE-754 representability still applies to the returned number.
