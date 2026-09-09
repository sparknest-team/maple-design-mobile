<template>
  <trigger-reference :set-reference="setDefaultReference">
    <slot />
  </trigger-reference>

  <Teleport :to="popupTarget" :disabled="teleportDisabled || popupContainer === false">
    <trigger-popup :options="popupOptions">
      <template #content><slot name="content" /></template>
    </trigger-popup>
  </Teleport>
</template>

<script lang="ts">
import { computed, defineComponent, type PropType } from 'vue'
import { createNamespace, useTeleport } from '../utils/components'
import { toSizeUnit } from '../utils/elements'
import { usePopupContainer } from '../utils/popup-container'
import { getTransformOrigin } from './geometry'
import TriggerPopup, { type TriggerPopupOptions } from './popup'
import { triggerProps } from './props'
import { useTriggerReference, type TriggerElement } from './reference'
import { useTriggerRender } from './render'
import { useFloatingTrigger } from './useFloatingTrigger'

const { name, n } = createNamespace('trigger')

const TriggerReference = defineComponent({
  name: createNamespace('trigger-reference').name,
  props: {
    setReference: {
      type: Function as PropType<(element?: TriggerElement) => void>,
      required: true,
    },
  },
  setup(props, { slots }) {
    const { nodes } = useTriggerReference(props.setReference)

    return () => {
      nodes.value = slots.default?.() ?? []
      return nodes.value
    }
  },
})

export default defineComponent({
  name,
  inheritAttrs: false,
  components: { TriggerReference, TriggerPopup },
  props: triggerProps,
  emits: ['update:open', 'open-change', 'open', 'opened', 'close', 'closed', 'click-outside'],
  setup(props, { emit }) {
    const popupTarget = usePopupContainer(() => props.popupContainer)
    const { disabled: teleportDisabled } = useTeleport()
    const {
      popover,
      referenceSize,
      show,
      zIndex,
      handlePopoverMouseenter,
      handlePopoverMouseleave,
      handlePopoverFocus,
      handlePopoverBlur,
      actualPlacement,
      arrowStyle,
      getReference,
      focusReference,
      isTopLayer,
      setDefaultReference,
      setAllowClose,
      open,
      close,
      resize,
      setReference,
    } = useFloatingTrigger(props, emit)

    const renderState = useTriggerRender(show, () => props.unmountOnClose, emit)
    const setPopup = (element: any) => {
      popover.value = element
    }
    const popupOptions = computed<TriggerPopupOptions>(() => ({
      rendered: renderState.rendered.value,
      displayed: renderState.displayed.value,
      visible: show.value,
      animating: renderState.animating.value,
      placement: actualPlacement.value,
      setPopup,
      popupClass: [n('popup'), props.popupClass],
      wrapperClass: n('popup-wrapper'),
      contentClass: [n('content'), props.contentClass],
      arrowClass: [n('arrow'), props.arrowClass],
      popupStyle: {
        ...props.popupStyle,
        zIndex: zIndex.value,
        width: props.autoFitPopupWidth ? toSizeUnit(referenceSize.value.width) : props.popupStyle?.width,
      },
      wrapperStyle: { transformOrigin: getTransformOrigin(actualPlacement.value) },
      contentStyle: props.contentStyle,
      arrowStyle: { ...arrowStyle.value, ...props.arrowStyle },
      showArrow: props.showArrow,
      animationName: props.animationName,
      duration: props.duration,
      hooks: renderState.hooks,
      handlers: {
        onMouseenter: handlePopoverMouseenter,
        onMouseleave: handlePopoverMouseleave,
        onFocusin: handlePopoverFocus,
        onFocusout: handlePopoverBlur,
      },
    }))
    const allowClose = () => setAllowClose(true)

    return {
      popupTarget,
      popover,
      referenceSize,
      show,
      zIndex,
      teleportDisabled,
      n,
      toSizeUnit,
      handlePopoverMouseenter,
      handlePopoverMouseleave,
      handlePopoverFocus,
      handlePopoverBlur,
      popupOptions,
      allowClose,
      getReference,
      focusReference,
      isTopLayer,
      setDefaultReference,
      open,
      close,
      resize,
      setReference,
    }
  },
})
</script>
