import {
  computed,
  defineComponent,
  h,
  mergeProps,
  onActivated,
  onBeforeUnmount,
  onDeactivated,
  provide,
  ref,
  shallowReactive,
  shallowRef,
} from 'vue'
import { useDirection } from '@maple-design/use-vue'
import { createNamespace } from '../utils/components'
import { useNavMenuItemNames } from './item-names'
import { navMenuProps } from './props'
import { navMenuKey, type NavMenuEntry } from './provide'
import { useNavMenuSurface } from './surface'
import type { NavMenuKey } from './types'

const { name, n, classes } = createNamespace('nav-menu')

export default defineComponent({
  name,
  inheritAttrs: false,
  props: navMenuProps,
  emits: { 'update:activeItem': (_key: NavMenuKey | null) => true },
  setup(props, { attrs, emit, slots, expose }) {
    const root = ref<HTMLElement>()
    const bar = ref<HTMLElement>()
    const { isRtl } = useDirection(() => root.value)
    const panelHost = shallowRef<HTMLElement>()
    const localActiveItem = ref(props.defaultActiveItem)
    const activeItem = computed(() => (props.activeItem !== undefined ? props.activeItem : localActiveItem.value))
    const entries = shallowReactive(new Map<symbol, NavMenuEntry>())
    const itemNames = useNavMenuItemNames()
    let disposed = false,
      suspended = false,
      activationGeneration = 0
    const available = () => !disposed && !suspended
    // Cedar's reentrancy-safe Item coordination, independent of business selection.
    function activateItem(id?: symbol) {
      if (!available()) {
        return false
      }
      const request = ++activationGeneration
      for (const [key, entry] of [...entries]) {
        if (!available() || request !== activationGeneration) {
          return false
        }
        if (key !== id && entries.get(key) === entry) {
          entry.close()
        }
      }
      return available() && request === activationGeneration
    }
    function setActiveItem(value: NavMenuKey | null) {
      if (!available() || value === activeItem.value) {
        return
      }
      if (props.activeItem === undefined) {
        localActiveItem.value = value
      }
      emit('update:activeItem', value)
    }
    const close = () => {
      if (!available()) {
        return
      }
      const request = ++activationGeneration
      for (const [key, entry] of [...entries]) {
        if (!available() || request !== activationGeneration) {
          return
        }
        if (entry.open.value && entries.get(key) === entry) {
          entry.close(true)
        }
      }
    }
    const surface = useNavMenuSurface(
      () => root.value,
      () => [...entries.values()].some((entry) => entry.open.value),
      () => ({
        ...props,
        popupContainer:
          [...entries.values()].find((entry) => entry.open.value)?.popupContainer() ?? props.popupContainer,
      }),
      close,
      () => h('div', { ref: panelHost, class: n('panels') }),
    )
    provide(navMenuKey, {
      props,
      activeItem,
      panelHost,
      activateItem,
      selectItem: setActiveItem,
      registerItem(id, entry, itemName) {
        if (disposed) {
          return () => undefined
        }
        const unregisterName = itemNames.register(id, itemName)
        entries.set(id, entry)
        return () => {
          entries.delete(id)
          unregisterName()
        }
      },
    })
    onDeactivated(() => {
      close()
      suspended = true
    })
    onActivated(() => {
      suspended = false
    })
    onBeforeUnmount(() => {
      disposed = true
      activationGeneration++
      entries.clear()
      itemNames.clear()
    })
    expose({ close, resize: surface.resize, setActiveItem })
    function navigate(event: KeyboardEvent) {
      if (
        event.defaultPrevented ||
        event.isComposing ||
        event.keyCode === 229 ||
        props.disabled ||
        !(event.target instanceof HTMLElement) ||
        !event.target.hasAttribute('data-nav-item')
      ) {
        return
      }
      const items = Array.from(
        bar.value?.querySelectorAll<HTMLElement>('[data-nav-item]:not([aria-disabled="true"])') ?? [],
      )
      const index = items.indexOf(event.target)
      const next =
        event.key === 'Home'
          ? 0
          : event.key === 'End'
            ? items.length - 1
            : event.key === (isRtl.value ? 'ArrowLeft' : 'ArrowRight')
              ? (index + 1) % items.length
              : event.key === (isRtl.value ? 'ArrowRight' : 'ArrowLeft')
                ? (index - 1 + items.length) % items.length
                : -1
      if (index >= 0 && next >= 0) {
        event.preventDefault()
        items[next]?.focus()
      }
    }
    return () =>
      h(
        'div',
        mergeProps(attrs, {
          ref: root,
          class: classes(n(), n('$--box')),
          style: surface.open.value ? { zIndex: surface.layer.value + 1 } : undefined,
        }),
        [
          h('div', { ref: bar, class: n('bar'), role: 'group', onKeydown: navigate }, slots.default?.()),
          surface.render(),
        ],
      )
  },
})
