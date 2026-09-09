import { computed, mergeProps, shallowRef, type ComputedRef } from 'vue'
import { triggerProps } from './props'
import type { Reference, TriggerElement } from './reference'

export interface TriggerWrapperHandle {
  open(): void
  close(): void
  resize(): void
  allowClose(): void
  getReference(): TriggerElement | undefined
  focusReference(): void
  setReference(reference?: Reference): void
}
export interface TriggerWrapperAppearance {
  triggerBindings: ComputedRef<Record<string, unknown>>
  contentBindings?: ComputedRef<Record<string, unknown>>
  titleClass?: string
  bodyClass?: string
}

/** Pass every declared Trigger prop once; Trigger owns state and lifecycle. */
export function useTriggerWrapper(
  props: Record<string, any>,
  attrs: Record<string, unknown>,
  appearance: () => Record<string, unknown>,
) {
  const triggerRef = shallowRef<TriggerWrapperHandle>()
  const triggerBindings = computed(() => {
    const forwarded: Record<string, unknown> = {}
    for (const key of Object.keys(triggerProps)) {
      if (key in props) {
        forwarded[key] = props[key]
      }
    }
    return mergeProps(forwarded, appearance(), attrs)
  })
  return {
    triggerRef,
    triggerBindings,
    open: () => triggerRef.value?.open(),
    close: () => triggerRef.value?.close(),
    resize: () => triggerRef.value?.resize(),
    allowClose: () => triggerRef.value?.allowClose(),
    getReference: () => triggerRef.value?.getReference(),
    focusReference: () => triggerRef.value?.focusReference(),
    setReference: (...args: Parameters<TriggerWrapperHandle['setReference']>) =>
      triggerRef.value?.setReference(...args),
  }
}
