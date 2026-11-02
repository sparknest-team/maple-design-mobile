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
import { provideOptionRequest, useOptionRequest } from '../../_hooks/use-option-request'
import { provideEmptyValues, resolveEmptyValue, useEmptyValues } from '../../utils/empty-value'
import { useSelectionSession } from '../selection-field/use-selection-session'
import { fieldControlFormEvents, fieldEditorBoundary, invokeBeforeCommit, useFieldPresentation } from './context'
import type { FieldEditMode as FieldPresentationMode } from './context'
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
  setup?: () => void
  reference?: (
    context: FieldEditorContext & { open: boolean; setOpen: (open: boolean) => void; referenceRef: any },
  ) => VNodeChild
  defaultPresentation?: FieldPresentationMode
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
  // Declared notifications belong to the public wrapper. Vue owns their Once
  // lifecycle; forwarding the same listener to the control invokes it twice.
  const ownedListenerKeys = new Set(
    events.flatMap((event) => {
      const aliases = [
        event,
        event.replace(/-(\w)/g, (_, letter: string) => letter.toUpperCase()),
        event.replace(/\B([A-Z])/g, '-$1').toLowerCase(),
      ]
      return aliases.flatMap((alias) => {
        const key = 'on' + alias[0].toUpperCase() + alias.slice(1)
        return [key, key + 'Once']
      })
    }),
  )
  const Component = defineComponent({
    name: base.name,
    inheritAttrs: false,
    render() {
      return (this as any).renderField()
    },
    props: base.props,
    emits: [...new Set([...events, 'update:open', 'open-change'])],
    setup(props: Record<string, any>, { attrs, slots, emit, expose }) {
      adapter.setup?.()
      const instance = getCurrentInstance()!
      const state = useFieldPresentation(
        () => props.editMode,
        () => props.readPretty,
        adapter.defaultPresentation,
      )
      const emptyPolicy = useEmptyValues(props, undefined, Boolean(state.item))
      provideEmptyValues({
        get emptyValues() {
          return emptyPolicy.emptyValues.value
        },
        get emptyText() {
          return emptyPolicy.emptyText.value
        },
      })
      // The public field owns presentation; nested controls only render its editor.
      provide(fieldEditorBoundary, true)
      provide(
        fieldControlFormEvents,
        computed(() => state.editMode.value === 'direct'),
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
      const sourceKey = ['options', 'data'].find((key) => {
        const definition = base.props?.[key]
        const types = Array.isArray(definition?.type) ? definition.type : [definition?.type]
        return types.includes(Array) && types.includes(Function)
      })
      const source = sourceKey
        ? useOptionRequest(
            () => props[sourceKey],
            () => blocked.value,
            (error) => emit('load-error', error),
            // AutoComplete debounces here; Cascader already debounces its search events.
            () => (base.name.endsWith('AutoComplete') ? (props.searchDelay ?? 0) : 0),
            base.props,
            true,
          )
        : undefined
      if (source) {
        provideOptionRequest(base.props, source)
      }

      const open = computed(() => !blocked.value && Boolean(props.open ?? localOpen.value))
      watch(open, (next) => {
        if (next && source?.remote.value) {
          const query = props.inputValue ?? props.defaultInputValue ?? ''
          if (source.query.value !== query) {
            void source.search(query)
          }
        }
      })
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
            return invokeBeforeCommit(props.beforeCommit, next, { previousValue: value.value, signal })
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
        [state.editMode, state.readPretty, blocked],
        ([editMode], previous) => {
          state.item?.resolved?.(editMode, state.readPretty.value)
          if (blocked.value || (previous && previous.length > 0 && editMode !== previous[0])) {
            setOpen(false)
            session.reset()
            if (editMode !== 'direct') {
              state.item?.resetValidation?.()
            }
          }
        },
        { immediate: true, flush: 'sync' },
      )
      state.register({
        active: () => state.editMode.value !== 'direct' && open.value,
        cancel: () => {
          setOpen(false)
          session.reset()
        },
        focus: () => host.value?.focus(),
      })
      const exposed: Record<string, any> = {}
      const bindings: Record<string, any> = {}
      if (source) {
        bindings.refresh = source.refresh
      }
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
        if (state.editMode.value === 'direct' && !state.readPretty.value) {
          const original = { ...(instance.vnode.props ?? {}) }
          for (const key of ['ref', 'ref_for', 'ref_key', 'key', ...ownedListenerKeys]) {
            delete original[key]
          }
          const controlled =
            Object.prototype.hasOwnProperty.call(original, 'modelValue') ||
            Object.prototype.hasOwnProperty.call(original, 'model-value')
          const rendered = h(
            control,
            {
              ...attrs,
              ...original,
              ...(controlled ? {} : { defaultValue: localValue.value }),
              emptyValues: emptyPolicy.emptyValues.value,
              ...adapter.inlineProps?.(props),
              ...handlers,
              ...(props.loading ? { 'aria-busy': true } : {}),
              ref: inner,
            },
            slots,
          )
          return rendered
        }
        const textProps = source && sourceKey ? { ...props, [sourceKey]: source.options.value } : props
        const text = (adapter.text ?? formatFieldValue)(value.value, textProps)
        return h(
          FieldPresentation,
          {
            ...attrs,
            ...(props.textAlign ? { style: [attrs.style, { '--mp-form-content-align': props.textAlign }] } : {}),
            ref: host,
            intent: adapter.intent,
            editMode: state.editMode.value,
            openTriggerTarget: props.openTriggerTarget,
            readPretty: state.readPretty.value,
            empty: emptyPolicy.isEmpty(value.value),
            emptyText: emptyPolicy.emptyText.value,
            label: state.label.value ?? props.ariaLabel,
            text,
            placeholder: typeof props.placeholder === 'string' ? props.placeholder : undefined,
            popupContainer: props.popupContainer,
            open: open.value,
            disabled: form.mergedDisabled.value,
            readonly: form.mergedReadonly.value,
            needConfirm: true,
            clearable: props.clearable,
            onClear: () => {
              if (!open.value || blocked.value || session.pending.value) {
                return
              }
              const fallback =
                'uncheckedValue' in props
                  ? props.uncheckedValue
                  : typeof props.defaultValue === 'boolean'
                    ? false
                    : Array.isArray(value.value)
                      ? []
                      : props.defaultValue
              session.update(resolveEmptyValue(props, fallback))
            },
            loading: props.loading,
            pending: session.pending.value,
            confirmDisabled: adapter.valid?.(session.draft.value, props) === false,
            error: session.error.value || state.item?.message?.value,
            onOpen: setOpen,
            onCancel: cancel,
            commit: confirm,
            onConfirm: confirm,
            referenceFocus: adapter.reference ? () => inner.value?.focus?.() : undefined,
          },
          {
            reference: adapter.reference
              ? () =>
                  adapter.reference!({
                    props,
                    attrs,
                    value: value.value,
                    update: publish,
                    emit,
                    slots,
                    disabled: form.mergedDisabled.value || session.pending.value,
                    readonly: form.mergedReadonly.value,
                    open: open.value,
                    setOpen,
                    referenceRef: inner,
                  })
              : undefined,
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
                      editMode: 'direct',
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
