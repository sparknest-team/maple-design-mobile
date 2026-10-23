import {
  computed,
  defineComponent,
  getCurrentInstance,
  h,
  nextTick,
  onMounted,
  provide,
  proxyRefs,
  ref,
  shallowRef,
  watch,
  type Component,
  type ComponentPublicInstance,
  type VNodeChild,
} from 'vue'
import { useSelectionSession } from '../selection-field/use-selection-session'
import { fieldControlFormEvents, fieldEditorBoundary, useFieldPresentation } from './context'
import FieldPresentation from './FieldPresentation.vue'
import { usePresentationForm } from './form-bridge'

export interface FieldEditorContext {
  props: Record<string, any>
  attrs: Record<string, unknown>
  value: any
  update: (value: any) => void
  emit: (event: string, ...args: any[]) => void
  slots: Record<string, any>
  disabled: boolean
  readonly: boolean
}
export interface FieldPresentationAdapter {
  intent?: 'input' | 'select'
  text?: (value: any, props: Record<string, any>) => string
  editor?: (context: FieldEditorContext) => VNodeChild
  valid?: (value: any, props: Record<string, any>) => boolean
  changeArgs?: (value: any, props: Record<string, any>) => unknown[]
  inlineProps?: (props: Record<string, any>) => Record<string, any>
}
/** Keep class instances (File, Blob, option identities) intact; isolate mutable value records. */
function cloneValue(value: any, seen = new WeakMap<object, any>()): any {
  if (value instanceof Date) {
    return new Date(value.getTime())
  }
  if (
    !value ||
    typeof value !== 'object' ||
    (!Array.isArray(value) && Object.getPrototypeOf(value) !== Object.prototype)
  ) {
    return value
  }
  if (seen.has(value)) {
    return seen.get(value)
  }
  const result: any = Array.isArray(value) ? [] : {}
  seen.set(value, result)
  for (const key of Object.keys(value)) {
    result[key] = cloneValue(value[key], seen)
  }
  return result
}
function sameFieldValue(left: any, right: any, seen = new WeakMap<object, object>()): boolean {
  if (Object.is(left, right)) {
    return true
  }
  if (left instanceof Date && right instanceof Date) {
    return left.getTime() === right.getTime()
  }
  if (!left || !right || typeof left !== 'object' || typeof right !== 'object') {
    return false
  }
  if (Object.getPrototypeOf(left) !== Object.getPrototypeOf(right)) {
    return false
  }
  if (!Array.isArray(left) && Object.getPrototypeOf(left) !== Object.prototype) {
    return false
  }
  if (seen.get(left) === right) {
    return true
  }
  seen.set(left, right)
  const keys = Object.keys(left)
  return (
    keys.length === Object.keys(right).length &&
    keys.every((key) => Object.prototype.hasOwnProperty.call(right, key) && sameFieldValue(left[key], right[key], seen))
  )
}
export function formatFieldValue(value: any): string {
  if (value == null || value === '') {
    return ''
  }
  if (typeof value === 'boolean') {
    return value ? '✓' : '—'
  }
  if (value instanceof Date) {
    return value.toLocaleDateString()
  }
  if (Array.isArray(value)) {
    return value.map(formatFieldValue).filter(Boolean).join(', ')
  }
  if (typeof value === 'object') {
    return String(value.label ?? value.name ?? value.value ?? '')
  }
  return String(value)
}
/** Internal adapter: public components keep their existing props, slots, methods and inline renderer. */
export function withFieldPresentation<T extends Component>(Base: T, adapter: FieldPresentationAdapter = {}): T {
  const base = Base as any
  const control = { ...base, name: base.name + 'Control' }
  const events: string[] = Array.isArray(base.emits) ? base.emits : Object.keys(base.emits ?? {})
  const Component = defineComponent({
    name: base.name,
    inheritAttrs: false,
    render() {
      return (this as any).renderField()
    },
    props: base.props,
    emits: [...new Set([...events, 'update:open', 'open-change'])],
    setup(props: Record<string, any>, { attrs, slots, emit, expose }) {
      const instance = getCurrentInstance()!
      const state = useFieldPresentation(
        () => props.presentation,
        () => props.readPretty,
      )
      // The public field owns presentation; nested controls only render its editor.
      provide(fieldEditorBoundary, true)
      provide(
        fieldControlFormEvents,
        computed(() => state.presentation.value === 'inline'),
      )
      const form = usePresentationForm({
        disabled: computed(() => (Array.isArray(props.disabled) ? props.disabled.every(Boolean) : props.disabled)),
        readonly: computed(() => props.readonly),
        size: computed(() => props.size),
      })
      const inner = shallowRef<ComponentPublicInstance & Record<string, any>>()
      const host = ref<InstanceType<typeof FieldPresentation>>()
      const localValue = shallowRef(props.defaultValue ?? props.modelValue)
      const value = computed(() => {
        const raw = instance.vnode.props ?? {}
        return Object.prototype.hasOwnProperty.call(raw, 'modelValue') ||
          Object.prototype.hasOwnProperty.call(raw, 'model-value')
          ? props.modelValue
          : localValue.value
      })
      const localOpen = ref(props.defaultOpen ?? false)
      const blocked = computed(() => form.mergedDisabled.value || form.mergedReadonly.value || state.readPretty.value)
      const open = computed(() => !blocked.value && Boolean(props.open ?? localOpen.value))
      const setOpen = (next: boolean) => {
        if (next && blocked.value) {
          return
        }
        if (!next && !open.value && !(props.open ?? localOpen.value)) {
          return
        }
        localOpen.value = next
        emit('update:open', next)
        emit('open-change', next)
      }
      const publish = (next: unknown) => {
        localValue.value = next
        emit('update:modelValue', next)
        emit('change', ...(adapter.changeArgs?.(next, props) ?? [next]))
        if (!state.item?.validate) {
          form.eventHandlers.value?.onChange?.()
        }
      }
      const session = useSelectionSession({
        value: () => value.value,
        open,
        deferred: () => true,
        blocked: () => blocked.value,
        clone: cloneValue,
        same: sameFieldValue,
        valid: (next) => adapter.valid?.(next, props) !== false,
        publish,
        close: () => setOpen(false),
        cancelOnExternalChange: true,
        beforeCommit: async (next, signal) => {
          if (state.item?.validate && !(await state.item.validate(next))) {
            return false
          }
          if (signal.aborted) {
            return false
          }
          if (!sameFieldValue(next, value.value)) {
            return props.beforeCommit?.(next, { previousValue: value.value, signal })
          }
        },
      })
      const updateDraft = (next: unknown) => {
        if (open.value && !blocked.value) {
          session.update(next)
        }
      }
      const cancel = () => {
        if (session.pending.value) {
          return
        }
        session.cancel()
        state.item?.resetValidation?.()
      }
      const confirm = async () => {
        inner.value?.blur?.()
        await nextTick()
        return session.commit()
      }
      watch(
        [state.presentation, state.readPretty, blocked],
        ([presentation], previous) => {
          state.item?.resolved?.(presentation, state.readPretty.value)
          if (blocked.value || (previous && presentation !== previous[0])) {
            setOpen(false)
            session.reset()
            if (presentation !== 'inline') {
              state.item?.resetValidation?.()
            }
          }
        },
        { immediate: true, flush: 'sync' },
      )
      state.register({
        active: () => state.presentation.value !== 'inline' && open.value,
        cancel: () => {
          setOpen(false)
          session.reset()
        },
        focus: () => host.value?.focus(),
      })
      const exposed: Record<string, any> = {}
      const bindings: Record<string, any> = {}
      const syncExposed = () => {
        const child = inner.value
        if (!child) {
          return
        }
        const members = proxyRefs(
          child.$.exposed ?? (child.$ as unknown as { setupState: Record<string, any> }).setupState,
        )
        for (const key of Object.keys(members)) {
          if (key.startsWith('$') || key.startsWith('__')) {
            continue
          }
          Object.defineProperty(bindings, key, {
            configurable: true,
            enumerable: true,
            get: () => exposed[key],
            set: (next) => {
              exposed[key] = next
            },
          })
          if (typeof members[key] === 'function') {
            exposed[key] = members[key].bind(child)
          } else {
            Object.defineProperty(exposed, key, {
              configurable: true,
              enumerable: true,
              get: () => members[key],
              set: (next) => {
                members[key] = next
              },
            })
          }
        }
      }
      expose(exposed)
      onMounted(syncExposed)
      watch(inner, syncExposed, { flush: 'post' })
      const forward = (event: string, ...args: any[]) => {
        if (event === 'update:modelValue') {
          localValue.value = args[0]
        }
        if (event === 'update:open') {
          localOpen.value = args[0]
        }
        emit(event, ...args)
      }
      const handlers = Object.fromEntries(
        events.map((event) => [
          'on' + event[0].toUpperCase() + event.slice(1),
          (...args: any[]) => forward(event, ...args),
        ]),
      )
      const editorHandlers = {
        ...Object.fromEntries(
          events.map((event) => [
            'on' + event[0].toUpperCase() + event.slice(1),
            (...args: any[]) => {
              if (event === 'update:modelValue') {
                updateDraft(args[0])
              } else if (event !== 'change' && event !== 'update:open' && event !== 'open-change') {
                emit(event, ...args)
              }
            },
          ]),
        ),
        'onUpdate:modelValue': updateDraft,
        onChange: () => {},
      }
      const render = () => {
        if (state.presentation.value === 'inline' && !state.readPretty.value) {
          const original = { ...(instance.vnode.props ?? {}) }
          for (const key of ['ref', 'ref_for', 'ref_key', 'key']) {
            delete original[key]
          }
          const controlled =
            Object.prototype.hasOwnProperty.call(original, 'modelValue') ||
            Object.prototype.hasOwnProperty.call(original, 'model-value')
          return h(
            control,
            {
              ...attrs,
              ...original,
              ...(controlled ? {} : { defaultValue: localValue.value }),
              ...adapter.inlineProps?.(props),
              ...handlers,
              ref: inner,
            },
            slots,
          )
        }
        const text = (adapter.text ?? formatFieldValue)(value.value, props)
        return h(
          FieldPresentation,
          {
            ...attrs,
            ref: host,
            intent: adapter.intent,
            presentation: state.presentation.value,
            readPretty: state.readPretty.value,
            label: state.label.value ?? props.ariaLabel,
            text,
            placeholder: typeof props.placeholder === 'string' ? props.placeholder : undefined,
            popupContainer: props.popupContainer,
            open: open.value,
            disabled: form.mergedDisabled.value,
            readonly: form.mergedReadonly.value,
            needConfirm: true,
            pending: session.pending.value,
            confirmDisabled: adapter.valid?.(session.draft.value, props) === false,
            error: session.error.value || state.item?.message?.value,
            onOpen: setOpen,
            onCancel: cancel,
            commit: confirm,
            onConfirm: confirm,
          },
          {
            read: slots.read ? () => slots.read?.({ value: value.value, text }) : undefined,
            default: () =>
              !open.value
                ? null
                : (!state.nativeEditor &&
                    adapter.editor?.({
                      props,
                      attrs,
                      value: session.value.value,
                      update: updateDraft,
                      emit,
                      slots,
                      disabled: form.mergedDisabled.value || session.pending.value,
                      readonly: form.mergedReadonly.value,
                    })) ||
                  h(
                    control,
                    {
                      ...props,
                      ...attrs,
                      ...editorHandlers,
                      ref: inner,
                      modelValue: session.value.value,
                      presentation: 'inline',
                      readPretty: false,
                      beforeCommit: undefined,
                      ...(state.nativeEditor && 'disableConfirm' in base.props ? { disableConfirm: true } : {}),
                      open: undefined,
                      defaultOpen: false,
                      disabled: form.mergedDisabled.value || session.pending.value,
                      readonly: form.mergedReadonly.value,
                    },
                    slots,
                  ),
          },
        )
      }
      bindings.renderField = render
      return bindings
    },
  })
  Object.defineProperty(Component, '__fieldControl', { value: control })
  return Component as unknown as T
}
