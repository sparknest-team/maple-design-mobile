import type { Slot } from 'vue'

// Preserve Vue's SSR slot arguments and mark the forwarded slot as dynamic.
// Normalizing a conditional SSR slot as an ordinary client slot drops its output.
export function forwardTableSlot(slot: Slot | undefined) {
  return { default: slot, _: 2 as const }
}

// Data-defined columns may provide plain functions returning a single value.
// Compiled SSR slots must still receive their push and parent arguments.
export function forwardTableColumnSlot(slot: Slot) {
  const forward = (...args: unknown[]) => {
    const value = (slot as (...args: unknown[]) => unknown)(...args)
    return Array.isArray(value) ? value : value == null ? (typeof args[1] === 'function' ? undefined : []) : [value]
  }
  return { default: forward, _: 2 as const }
}
