<template>
  <trigger-reference :set-reference="setDefaultReference">
    <slot />
  </trigger-reference>

  <Teleport
    :to="popupContainer === false ? undefined : popupContainer"
    :disabled="teleportDisabled || popupContainer === false"
  >
    <transition :name="animationName" @after-enter="$emit('opened')" @after-leave="handleClosed">
      <div
        v-show="show"
        ref="popover"
        :class="[n('popup'), popupClass]"
        :style="{
          ...popupStyle,
          zIndex,
          width: sameWidth ? toSizeUnit(Math.ceil(referenceSize.width)) : popupStyle?.width,
        }"
        @click.stop
        @mouseenter="handlePopoverMouseenter"
        @mouseleave="handlePopoverMouseleave"
      >
        <slot name="content" />
      </div>
    </transition>
  </Teleport>
</template>

<script lang="ts">
import { cloneVNode, defineComponent, Fragment, type ComponentPublicInstance, type PropType, type VNode } from 'vue'
import { isArray } from '@maplejs/maple-shared'
import { createNamespace, useTeleport } from '../utils/components'
import { toSizeUnit } from '../utils/elements'
import { triggerProps } from './props'
import { useFloatingTrigger } from './useFloatingTrigger'

const { name, n } = createNamespace('trigger')

function toElement(value: Element | ComponentPublicInstance | null): HTMLElement | undefined {
  if (value instanceof HTMLElement) {
    return value
  }

  const element = value?.$el
  return element instanceof HTMLElement ? element : undefined
}

function bindFirstElement(
  vnodes: VNode[],
  referenceRef: (value: Element | ComponentPublicInstance | null) => void,
): boolean {
  for (let index = 0; index < vnodes.length; index++) {
    const vnode = vnodes[index]

    if (typeof vnode.type === 'string' || typeof vnode.type === 'object' || typeof vnode.type === 'function') {
      vnodes[index] = cloneVNode(vnode, { ref: referenceRef }, true)
      return true
    }

    if (vnode.type === Fragment && isArray(vnode.children)) {
      const children = [...vnode.children] as VNode[]
      if (bindFirstElement(children, referenceRef)) {
        vnodes[index] = cloneVNode(vnode, undefined)
        vnodes[index].children = children
        return true
      }
    }
  }

  return false
}

const TriggerReference = defineComponent({
  name: 'MpTriggerReference',
  props: {
    setReference: {
      type: Function as PropType<(element?: HTMLElement) => void>,
      required: true,
    },
  },
  setup(props, { slots }) {
    const referenceRef = (value: Element | ComponentPublicInstance | null) => props.setReference(toElement(value))

    return () => {
      const children = slots.default?.() ?? []
      bindFirstElement(children, referenceRef)
      return children
    }
  },
})

export default defineComponent({
  name,
  inheritAttrs: false,
  components: { TriggerReference },
  props: triggerProps,
  emits: ['update:open', 'open', 'opened', 'close', 'closed', 'click-outside'],
  setup(props, { emit }) {
    const { disabled: teleportDisabled } = useTeleport()
    const {
      popover,
      referenceSize,
      show,
      zIndex,
      handlePopoverMouseenter,
      handlePopoverMouseleave,
      handleClosed,
      getReference,
      setDefaultReference,
      setAllowClose,
      open,
      close,
      resize,
      setReference,
    } = useFloatingTrigger(props, emit)

    const allowClose = () => setAllowClose(true)

    return {
      popover,
      referenceSize,
      show,
      zIndex,
      teleportDisabled,
      n,
      toSizeUnit,
      handlePopoverMouseenter,
      handlePopoverMouseleave,
      handleClosed,
      allowClose,
      getReference,
      setDefaultReference,
      open,
      close,
      resize,
      setReference,
    }
  },
})
</script>
