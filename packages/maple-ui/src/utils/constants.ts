export const componentSizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
export type ComponentSize = (typeof componentSizes)[number]

export const semanticStatuses = [
  'default',
  'primary',
  'secondary',
  'tertiary',
  'info',
  'success',
  'warning',
  'danger',
] as const
export type SemanticStatus = (typeof semanticStatuses)[number]

export const orientations = ['horizontal', 'vertical'] as const
export type Orientation = (typeof orientations)[number]
