import {
  computed,
  defineComponent,
  h,
  inject,
  mergeProps,
  onActivated,
  onBeforeUnmount,
  onDeactivated,
  onMounted,
  provide,
  ref,
  shallowReactive,
  shallowRef,
  ssrContextKey,
} from 'vue'
import { useDirection } from '@maple-design/use-vue'
import { createNamespace } from '../utils/components'
import { useId } from '../utils/vue-compat'
import { useNavMenuItemNames } from './item-names'
import { navMenuProps } from './props'
import { navMenuKey, type NavMenuEntry } from './provide'
import { renderSubtree, type ServerRender } from './ssr'
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
    const serverPanels = inject(ssrContextKey, null) ? ([] as Array<() => Promise<string>>) : undefined
    const panelHostId = 'mp-nav-panels-' + useId()
    const panelHost = shallowRef<HTMLElement>()
    // Hydration can reach the shared overlay before an async slot registers its item.
    const pendingPanelId = ref(
      serverPanels || typeof document === 'undefined'
        ? undefined
        : document.getElementById(panelHostId)?.querySelector<HTMLElement>('[id]:not([aria-hidden="true"])')?.id,
    )
    const localActiveItem = ref(props.defaultActiveItem)
    const activeItem = computed(() => (props.activeItem !== undefined ? props.activeItem : localActiveItem.value))
    const entries = shallowReactive(new Map<symbol, NavMenuEntry>())
    const hasOpenItem = () => [...entries.values()].some((entry) => entry.open.value)
    const mounted = ref(false)
    onMounted(() => {
      mounted.value = true
    })
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
      () => hasOpenItem() || !!pendingPanelId.value,
      () => ({
        ...props,
        popupContainer:
          [...entries.values()].find((entry) => entry.open.value)?.popupContainer() ?? props.popupContainer,
      }),
      close,
      () =>
        h('div', { ref: panelHost, id: panelHostId, class: n('panels') }, serverPanels ? [h(PanelOutlet)] : undefined),
    )
    const renderBar = () =>
      h('div', { ref: bar, class: n('bar'), role: 'group', onKeydown: navigate }, slots.default?.())
    let barReady: Promise<string>
    const Bar = {
      setup: () => renderBar,
      ssrRender: ((_ctx, push, parent) => {
        barReady = renderSubtree(renderBar(), parent)
        push(barReady.then((html) => [html]))
      }) satisfies ServerRender,
    }
    const PanelOutlet = {
      ssrRender: ((_ctx, push) => {
        for (const render of serverPanels ?? []) {
          // Vue hydrates each Item Teleport between its own pair of target anchors.
          push('<!--teleport start anchor-->')
          push(render().then((html) => [html]))
          push('<!--teleport anchor-->')
        }
      }) satisfies ServerRender,
    }
    const SharedOverlay = {
      setup: () => surface.render,
      ssrRender: ((_ctx, push, parent) => {
        push(barReady.then(async () => [await renderSubtree(surface.render(), parent)]))
      }) satisfies ServerRender,
    }
    provide(navMenuKey, {
      props,
      activeItem,
      panelHost,
      panelHostId,
      serverPanels,
      canDefaultOpen: () => mounted.value || !hasOpenItem(),
      activateItem,
      selectItem: setActiveItem,
      registerItem(id, entry, itemName, panelId) {
        if (disposed) {
          return () => undefined
        }
        const unregisterName = itemNames.register(id, itemName)
        entries.set(id, entry)
        if (pendingPanelId.value === panelId) {
          pendingPanelId.value = undefined
        }
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
      if (event.defaultPrevented || event.isComposing || event.keyCode === 229 || props.disabled) {
        return
      }
      const items = Array.from(
        bar.value?.querySelectorAll<HTMLElement>('[data-nav-item]:not([aria-disabled="true"])') ?? [],
      )
      const index = items.findIndex((item) => item === event.target)
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
          style: mounted.value && surface.open.value ? { zIndex: surface.layer.value + 1 } : undefined,
        }),
        [h(Bar), h(SharedOverlay)],
      )
  },
})
