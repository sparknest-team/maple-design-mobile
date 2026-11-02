/** Shared by Button and ButtonGroup without a runtime props import cycle. */
export const buttonVariants = ['default', 'text', 'outline', 'tonal'] as const
export type ButtonVariant = (typeof buttonVariants)[number]
