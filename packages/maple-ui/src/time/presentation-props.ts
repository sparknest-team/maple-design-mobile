import type { HTMLAttributes } from 'vue'

const panelOwnedKeys = [
  'modelValue',
  'defaultValue',
  'open',
  'defaultOpen',
  'disabled',
  'readonly',
  'format',
  'use12Hours',
  'step',
  'min',
  'max',
  'disabledHours',
  'disabledMinutes',
  'disabledSeconds',
  'hideDisabledOptions',
  'disableConfirm',
  'showNextDay',
  'showNowButton',
  'presentation',
  'type',
  'popupContainer',
  'onUpdate:modelValue',
  'onUpdate:open',
  'onChange',
  'onSelect',
  'onConfirm',
  'onClear',
  'onOpenChange',
] as const
const wheelOwnedKeys = [
  'open',
  'defaultOpen',
  'selectedValues',
  'cascade',
  'dynamic',
  'fieldNames',
  'columnsCount',
  'onUpdate:open',
  'modelValue',
  'defaultValue',
  'columns',
  'toolbar',
  'onUpdate:modelValue',
  'onChange',
  'onConfirm',
  'onCancel',
] as const
const popupOwnedKeys = [
  'open',
  'defaultOpen',
  'onUpdate:open',
  'onOpenChange',
  'disabled',
  'trigger',
  'closeOnClickReference',
  'preventFocus',
] as const

type PresentationProps<T, K extends PropertyKey> = Omit<T, K> & Partial<Record<K, never>>
export type TimePanelPresentationProps<T> = PresentationProps<T, (typeof panelOwnedKeys)[number]> &
  Pick<HTMLAttributes, 'class' | 'style'>
export type TimeWheelPresentationProps<T> = PresentationProps<T, (typeof wheelOwnedKeys)[number]>
export type TimePopupPresentationProps<T> = PresentationProps<T, (typeof popupOwnedKeys)[number]>

function omitOwned<T extends object, K extends string>(props: T | undefined, keys: readonly K[]): Omit<T, K> {
  const owned = new Set<string>(keys)
  return Object.fromEntries(
    Object.entries(props ?? {}).filter(
      ([key]) => !owned.has(key.replace(/-([a-z])/g, (_, letter: string) => letter.toUpperCase())),
    ),
  ) as Omit<T, K>
}

/** Nested options customize views; state, constraints and notifications belong to the field/panel owner. */
export const getTimePanelPresentationProps = <T extends object>(props?: T) => omitOwned(props, panelOwnedKeys)
export const getTimeWheelPresentationProps = <T extends object>(props?: T) => omitOwned(props, wheelOwnedKeys)
export const getTimePopupPresentationProps = <T extends object>(props?: T) => omitOwned(props, popupOwnedKeys)
