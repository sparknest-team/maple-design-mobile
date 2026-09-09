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
