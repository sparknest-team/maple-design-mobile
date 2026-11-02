// Field references can cancel their own opening without changing ordinary .stop/.prevent semantics.
const blockedReferenceClicks = new WeakSet<Event>()

export function blockTriggerReferenceClick(event: Event) {
  blockedReferenceClicks.add(event)
}

export function isTriggerReferenceClickBlocked(event: Event) {
  return blockedReferenceClicks.has(event)
}
