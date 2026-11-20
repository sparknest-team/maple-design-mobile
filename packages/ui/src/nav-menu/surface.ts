import { computed, h, onActivated, onDeactivated, ref, watch, type VNodeChild } from 'vue'
import { useDirection, useEventListener } from '@maple-design/use-vue'
import { useZIndex } from '../context/zIndex'
import Overlay from '../overlay'
import { createNamespace } from '../utils/components'
import { useElementResize } from '../utils/resize-observer'
import type { NavMenuProps } from './types'

const { n } = createNamespace('nav-menu')

/** Mobile presentation adapter. State and Item contracts are migrated from Cedar. */
export function useNavMenuSurface(
  reference: () => HTMLElement | undefined,
  opened: () => boolean,
  props: () => NavMenuProps,
  close: () => void,
  content: () => VNodeChild,
) {
  const { dir } = useDirection(reference)
  const suspended = ref(false)
  const open = computed(() => !suspended.value && opened())
  const bounds = ref<{ top: number; left: number; width: number; height: number }>()
  const { zIndex } = useZIndex(() => open.value, 3)
  const layer = computed(() => props().zIndex ?? zIndex.value)
  const resize = () => {
    const element = reference(),
      win = element?.ownerDocument.defaultView
    if (!open.value || !element || !win) {
      return
    }
    const viewport = win.visualViewport
    const viewportTop = viewport?.offsetTop ?? 0
    const bottom = viewportTop + (viewport?.height ?? win.innerHeight)
    const top = Math.min(bottom, Math.max(viewportTop, element.getBoundingClientRect().bottom))
    bounds.value = {
      top,
      left: viewport?.offsetLeft ?? 0,
      width: viewport?.width ?? win.innerWidth,
      height: Math.max(0, bottom - top),
    }
  }
  useElementResize(
    () => [reference()],
    () => open.value,
    resize,
  )
  useEventListener(() => reference()?.ownerDocument.defaultView, 'scroll', resize, { capture: true, passive: true })
  watch(
    open,
    (value) => {
      if (value) {
        resize()
      }
    },
    { flush: 'post' },
  )
  onDeactivated(() => {
    suspended.value = true
  })
  onActivated(() => {
    suspended.value = false
    resize()
  })
  return {
    open,
    layer,
    resize,
    render: () =>
      h(
        Overlay,
        {
          open: open.value,
          dir: dir.value,
          popupContainer: props().popupContainer,
          overlayClosable: props().overlayClosable ?? true,
          escToClose: props().escToClose ?? true,
          lockScroll: props().lockScroll ?? true,
          unmountOnClose: false,
          zIndex: layer.value,
          class: [n('overlay'), { [n('overlay--transparent')]: props().overlay === false }],
          style: bounds.value
            ? {
                top: `${bounds.value.top}px`,
                left: `${bounds.value.left}px`,
                right: 'auto',
                bottom: 'auto',
                width: `${bounds.value.width}px`,
                height: `${bounds.value.height}px`,
              }
            : { top: 'var(--mp-nav-menu-height)' },
          'onUpdate:open': (value: boolean) => {
            if (!value) {
              close()
            }
          },
        },
        { default: content },
      ),
  }
}
