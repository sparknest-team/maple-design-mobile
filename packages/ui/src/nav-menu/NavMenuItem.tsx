import {
  computed,
  defineComponent,
  h,
  inject,
  mergeProps,
  nextTick,
  onActivated,
  onBeforeUnmount,
  onDeactivated,
  ref,
  Teleport,
  Transition,
  vShow,
  watch,
  withDirectives,
} from 'vue'
import { useDirection } from '@maple-design/use-vue'
import { useThemeScope } from '../theme-provider/context'
import { createNamespace } from '../utils/components'
import { useId } from '../utils/vue-compat'
import { navMenuItemProps, type NavMenuItemSlotContext } from './item-props'
import NavMenuOptions from './NavMenuOptions'
import { navMenuKey } from './provide'
import { useNavMenuSurface } from './surface'
import { createNavMenuTree } from './tree'
import type { NavMenuContent, NavMenuKey, NavMenuOption } from './types'

const { name } = createNamespace('nav-menu-item')
const { n } = createNamespace('nav-menu')
export default defineComponent({
  name,
  inheritAttrs: false,
  props: navMenuItemProps,
  emits: {
    'update:modelValue': (_key: NavMenuKey | null) => true,
    'update:open': (_open: boolean) => true,
    select: (_key: NavMenuKey | null, _option: NavMenuOption | undefined, _event?: Event) => true,
    click: (_event: MouseEvent) => true,
  },
  setup(props, { slots, emit, attrs, expose }) {
    const themeScope = useThemeScope()
    const parent = inject(navMenuKey, undefined)
    const uid = useId()
    const panelId = `${n()}-${uid}`
    const generatedEntryId = `${n()}-entry-${uid}`
    const entryId = () => (typeof attrs.id === 'string' && attrs.id ? attrs.id : generatedEntryId)
    const panelLabelledBy = () =>
      typeof attrs['aria-labelledby'] === 'string' && attrs['aria-labelledby'].trim()
        ? attrs['aria-labelledby']
        : entryId()
    const suspendedState = ref(false)
    const rendered = ref(false)
    const hasOpened = ref(false)
    const leaving = ref(false)
    const itemId = Symbol('NavMenuItem')
    const localValue = ref(props.defaultValue),
      localOpen = ref(props.defaultOpen)
    const panel = ref<HTMLElement>()
    const reference = ref<HTMLElement>()
    const { dir } = useDirection(() => reference.value)
    const value = computed(() => (props.modelValue !== undefined ? props.modelValue : localValue.value))
    const disabled = computed(() => props.disabled || !!parent?.props.disabled)
    const hasPopup = () => !!slots.content || props.options.length > 0
    const open = computed(
      () => !suspendedState.value && !disabled.value && hasPopup() && (props.open ?? localOpen.value),
    )
    const tree = computed(() => createNavMenuTree(props.options, props.fieldNames))
    const selected = computed(() => (value.value == null ? undefined : tree.value.byKey.get(value.value)))
    const active = computed(() =>
      props.name !== undefined && parent ? parent.activeItem.value === props.name : selected.value?.type === 'item',
    )
    const highlighted = computed(() => props.highlight ?? active.value)
    let suspended = false,
      disposed = false,
      focusGeneration = 0
    let focusTask: { kind: 'open' | 'close' } | undefined
    const available = () => !suspended && !disposed
    function cancelFocus() {
      focusGeneration++
      focusTask = undefined
    }
    watch(
      open,
      (opened) => {
        if (focusTask && opened !== (focusTask.kind === 'open')) {
          cancelFocus()
        }
      },
      { flush: 'sync' },
    )
    watch(() => [disabled.value, props.options, props.fieldNames, props.popupLayout], cancelFocus, {
      deep: true,
      flush: 'sync',
    })
    onBeforeUnmount(() => {
      disposed = true
      cancelFocus()
    })
    const surface = useNavMenuSurface(
      () => reference.value,
      () => !parent && open.value,
      () => ({ popupContainer: props.popupContainer }),
      close,
      () => renderPanel(),
    )
    const unregister = parent?.registerItem(
      itemId,
      {
        open,
        popupContainer: () => props.popupContainer,
        close: (restoreFocus = false) => {
          if (open.value) {
            if (restoreFocus) {
              close()
            } else {
              setOpen(false)
            }
          }
        },
      },
      () => props.name,
    )
    onBeforeUnmount(() => unregister?.())
    function activate() {
      return available() && (parent?.activateItem(itemId) ?? true)
    }
    watch(
      open,
      (value) => {
        if (value) {
          hasOpened.value = true
          rendered.value = true
          activate()
        }
      },
      { immediate: true, flush: 'sync' },
    )
    watch(
      () => props.unmountOnClose,
      (unmount) => {
        if (!unmount && hasOpened.value) {
          rendered.value = true
        } else if (unmount && !open.value && !leaving.value) {
          rendered.value = false
        }
      },
      { flush: 'post' },
    )
    function requestOpen(next: boolean, deactivating = false) {
      if (!available() && !deactivating) {
        return
      }
      if (next && (disabled.value || !hasPopup())) {
        return
      }
      if (next && !activate()) {
        return
      }
      if (!available() && !deactivating) {
        return
      }
      if (next === open.value) {
        return
      }
      if (props.open === undefined) {
        localOpen.value = next
      }
      emit('update:open', next)
    }
    function setOpen(next: boolean) {
      if (!available()) {
        return
      }
      cancelFocus()
      requestOpen(next)
    }
    function queueFocus(kind: 'open' | 'close') {
      if (!available() || disabled.value) {
        return
      }
      cancelFocus()
      const task = { kind },
        generation = focusGeneration,
        element = reference.value
      const document = element?.ownerDocument,
        origin = document?.activeElement
      const current = () =>
        available() && !disabled.value && generation === focusGeneration && element === reference.value
      focusTask = task
      nextTick(() => {
        if (focusTask !== task || !current()) {
          return
        }
        focusTask = undefined
        if (open.value !== (kind === 'open') || !document) {
          return
        }
        const focused = document.activeElement
        if (focused && focused !== origin && focused !== document.body && focused.isConnected) {
          return
        }
        const target =
          kind === 'open'
            ? panel.value?.querySelector<HTMLElement>(
                '[data-nav-item]:not([aria-disabled="true"]),button:not(:disabled),input:not(:disabled),[tabindex="0"]',
              )
            : element
        if (current()) {
          target?.focus()
        }
      })
    }
    function focusPanel() {
      queueFocus('open')
    }
    function close() {
      if (!available()) {
        return
      }
      setOpen(false)
      queueFocus('close')
    }
    onDeactivated(() => {
      cancelFocus()
      requestOpen(false, true)
      suspended = true
      suspendedState.value = true
    })
    onActivated(() => {
      if (!disposed && suspended) {
        suspended = false
        suspendedState.value = false
      }
    })
    function select(key: NavMenuKey | null, event?: Event) {
      const node = key == null ? undefined : tree.value.byKey.get(key)
      if (
        !available() ||
        disabled.value ||
        node?.disabled ||
        (node && (node.type !== 'item' || node.children.length))
      ) {
        return
      }
      if (props.modelValue === undefined) {
        localValue.value = key
      }
      if (props.name !== undefined) {
        parent?.selectItem(props.name)
      }
      emit('update:modelValue', key)
      emit('select', key, node?.option, event)
      if (props.hideOnSelect) {
        close()
      }
    }
    const context = (): NavMenuItemSlotContext => ({
      modelValue: value.value,
      selectedOption: selected.value?.option,
      active: active.value,
      open: open.value,
      select,
      close,
    })
    function renderLabel() {
      const node = selected.value
      const content = (node ? node.option[tree.value.names.label] : props.label) as NavMenuContent
      return typeof content === 'function'
        ? content({ option: node?.option ?? {}, active: node?.type === 'item', expanded: open.value, level: 0 })
        : content
    }
    expose({ close, select, setOpen })
    function renderPanel() {
      if (!rendered.value) {
        return null
      }
      return h(
        Transition,
        {
          name: n('panel'),
          onAfterEnter: surface.resize,
          onBeforeLeave: () => {
            leaving.value = true
          },
          onLeaveCancelled: () => {
            leaving.value = false
          },
          onAfterLeave: () => {
            leaving.value = false
            if (props.unmountOnClose && !open.value) {
              rendered.value = false
            }
          },
        },
        {
          default: () =>
            withDirectives(
              h(
                'div',
                {
                  ...themeScope.value,
                  ref: panel,
                  dir: dir.value,
                  id: panelId,
                  inert: open.value ? undefined : '',
                  'aria-hidden': open.value ? undefined : 'true',
                  role: slots.content ? 'group' : undefined,
                  'aria-labelledby': slots.content ? panelLabelledBy() : undefined,
                  class: [
                    n('popup'),
                    n(`--${parent?.props.size ?? 'md'}`),
                    n(`panel--${props.popupLayout}`),
                    props.popupClass ?? parent?.props.popupClass,
                    { [n('panel--custom')]: !!slots.content },
                  ],
                  style: [
                    themeScope.value.style,
                    props.popupStyle,
                    !open.value ? { pointerEvents: 'none' } : undefined,
                  ],
                },
                slots.content?.(context()) ?? [
                  h(
                    NavMenuOptions,
                    {
                      options: props.options,
                      fieldNames: props.fieldNames,
                      modelValue: value.value,
                      mode: props.optionsMode,
                      onSelect: (key: NavMenuKey, event: Event) => select(key, event),
                    },
                    { label: slots['option-label'], icon: slots['option-icon'], extra: slots['option-extra'] },
                  ),
                ],
              ),
              [[vShow, open.value]],
            ),
        },
      )
    }
    return () =>
      h('div', { class: n('node') }, [
        h(
          'button',
          mergeProps(attrs, {
            ref: reference,
            id: slots.content ? entryId() : attrs.id,
            type: 'button',
            disabled: disabled.value,
            'data-nav-item': '',
            'aria-disabled': disabled.value || undefined,
            'aria-expanded': hasPopup() ? open.value : undefined,
            'aria-controls': hasPopup() && rendered.value && (!parent || parent.panelHost.value) ? panelId : undefined,
            class: [
              n('item'),
              n(`--${parent?.props.size ?? 'md'}`),
              { [n('--active')]: highlighted.value, [n('--disabled')]: disabled.value },
            ],
            onClick: (event: MouseEvent) => {
              if (!available()) {
                return
              }
              if (disabled.value) {
                event.preventDefault()
                return
              }
              if (hasPopup()) {
                setOpen(!open.value)
              } else if (activate() && props.name !== undefined) {
                parent?.selectItem(props.name)
              }
              emit('click', event)
            },
            onKeydown: (event: KeyboardEvent) => {
              if (
                !available() ||
                event.defaultPrevented ||
                event.isComposing ||
                event.keyCode === 229 ||
                event.target !== event.currentTarget ||
                disabled.value
              ) {
                return
              }
              if (event.key === 'ArrowDown' && hasPopup()) {
                event.preventDefault()
                setOpen(true)
                focusPanel()
              }
            },
          }),
          slots.default?.(context()) ?? [
            slots.icon?.(context()),
            h('span', { class: n('label') }, [slots.label?.(context()) ?? renderLabel()]),
            hasPopup()
              ? h('span', { class: [n('arrow'), { [n('--expanded')]: open.value }], 'aria-hidden': 'true' })
              : null,
          ],
        ),
        parent
          ? parent.panelHost.value && rendered.value
            ? h(Teleport, { to: parent.panelHost.value }, [renderPanel()])
            : null
          : surface.render(),
      ])
  },
})
