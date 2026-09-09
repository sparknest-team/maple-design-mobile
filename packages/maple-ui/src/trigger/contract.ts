export const triggerEvents = ['hover', 'click', 'focus', 'contextMenu', 'manual'] as const
export type TriggerEvent = (typeof triggerEvents)[number]
export const triggerPlacements = [
  'top',
  'top-start',
  'top-end',
  'bottom',
  'bottom-start',
  'bottom-end',
  'left',
  'left-start',
  'left-end',
  'right',
  'right-start',
  'right-end',
] as const
export type TriggerPlacement = (typeof triggerPlacements)[number]
