export const componentSizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
export type ComponentSize = (typeof componentSizes)[number]
export const BORDER_SHAPES = ['square', 'round', 'circle'] as const
export type BorderShape = (typeof BORDER_SHAPES)[number]
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
export const MESSAGE_TYPES = ['info', 'success', 'warning', 'error'] as const
export type MessageType = (typeof MESSAGE_TYPES)[number]
export { triggerEvents as TRIGGER_EVENTS } from '../trigger/contract'
export type { TriggerEvent } from '../trigger/contract'
export { orientations, type Orientation } from '../utils/constants'
export const INPUT_EVENTS = [
  // focus events
  'onFocus',
  'onFocusin',
  'onFocusout',
  'onBlur',
  // form events
  'onChange',
  'onBeforeinput',
  'onInput',
  'onReset',
  'onSubmit',
  'onInvalid',
  // keyboard events
  'onKeydown',
  'onKeypress',
  'onKeyup',
  // clipboard events
  'onCopy',
  'onCut',
  'onPaste',
  // composition events
  'onCompositionstart',
  'onCompositionupdate',
  'onCompositionend',
  // selection events
  'onSelect',
  // attrs
  'autocomplete',
  'autofocus',
  'maxlength',
  'minlength',
  'name',
  'pattern',
  'readonly',
  'required',
]
export const TEXT_ALIGNS = ['left', 'center', 'right'] as const
export type TextAlign = (typeof TEXT_ALIGNS)[number]
