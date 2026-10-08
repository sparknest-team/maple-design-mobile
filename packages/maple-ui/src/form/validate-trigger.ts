export const VALIDATE_TRIGGERS = ['change', 'input', 'focus', 'blur', 'clear'] as const

export type ValidateTrigger = (typeof VALIDATE_TRIGGERS)[number]

export function hasValidateTrigger(
  configured: ValidateTrigger | readonly ValidateTrigger[] | undefined,
  trigger: ValidateTrigger,
): boolean {
  if (!configured) {
    return false
  }
  return Array.isArray(configured) ? configured.includes(trigger) : configured === trigger
}
