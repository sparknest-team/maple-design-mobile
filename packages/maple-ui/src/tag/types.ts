export const TAG_COLORS = [
  'red',
  'orangered',
  'orange',
  'gold',
  'lime',
  'green',
  'cyan',
  'blue',
  'brand',
  'purple',
  'pinkpurple',
  'magenta',
  'gray',
] as const

export type TagColor = (typeof TAG_COLORS)[number]

export type TagVariant = 'default' | 'outline'

export interface TagSlots {
  default?: () => import('vue').VNodeChild
  icon?: () => import('vue').VNodeChild
  'close-icon'?: () => import('vue').VNodeChild
}

export type TagEmits = {
  'update:show': [show: boolean]
  'update:modelValue': [checked: boolean]
  close: [event: MouseEvent]
  check: [checked: boolean, event: MouseEvent]
}
