<template>
  <div
    :class="classes(n(), [offset && isShow, n('--active')], [disabled, n('--disable')])"
    :style="`--mp-collapse-divider-top: ${divider ? 'var(--mp-collapse-border-top)' : 'none'}`"
  >
    <div :class="classes(n('shadow'), formatElevation(elevation, 2))"></div>
    <div
      :class="classes(n('header'), [!disabled, n('header--cursor-pointer')], n(`header--icon-${expandIconPosition}`))"
      :aria-expanded="isShow"
      :aria-disabled="disabled"
      :role="accordion ? 'tab' : 'button'"
      @click="toggle"
    >
      <div v-if="mergedShowExpandIcon && expandIconPosition === 'left'" :class="n('header-icon')">
        <slot name="expand-icon" v-bind="expandIconSlotProps">
          <component :is="renderExpandIconFallback" />
        </slot>
      </div>
      <div v-if="$slots.title || title" :class="n('header-title')">
        <slot name="title">{{ title }}</slot>
      </div>
      <div v-if="$slots.extra" :class="n('header-extra')" @click.stop>
        <slot name="extra" />
      </div>
      <div v-if="mergedShowExpandIcon && expandIconPosition === 'right'" :class="n('header-icon')">
        <slot name="expand-icon" v-bind="expandIconSlotProps">
          <component :is="renderExpandIconFallback" />
        </slot>
      </div>
    </div>
    <div
      v-show="showContent"
      ref="contentEl"
      :class="n('content')"
      @transitionend="handleTransitionEnd"
      @transitionstart="handleTransitionStart"
    >
      <div v-if="contentMounted" :class="n('content-wrap')">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, h, ref, watch } from 'vue'
import { useCollapseTransition } from '../collapse-transition/useCollapseTransition'
import MpIcon from '../icon'
import { createNamespace, formatElevation } from '../utils/components'
import { props } from './props'
import { useCollapse, type CollapseItemProvider } from './provide'

const { name, n, classes } = createNamespace('collapse-item')

export default defineComponent({
  name,
  components: {
    MpIcon,
  },
  props,
  setup(props) {
    const isShow = ref(false)
    const showContent = ref(false)
    const contentEl = ref<HTMLElement | null>(null)
    const itemName = computed(() => props.name)
    const disabled = computed(() => props.disabled)
    const { index, collapse, bindCollapse } = useCollapse()
    const {
      offset,
      divider,
      elevation,
      accordion,
      expandIconPosition,
      showExpandIcon,
      destroyOnHide,
      slots: collapseSlots,
      updateItem,
    } = collapse

    const mergedDestroyOnHide = computed(() => destroyOnHide.value || props.destroyOnHide)
    const mergedShowExpandIcon = computed(() => showExpandIcon.value ?? props.showExpandIcon)
    const contentMounted = ref(!mergedDestroyOnHide.value)
    const expandIconSlotProps = computed(() => ({
      active: isShow.value,
      disabled: props.disabled,
      position: expandIconPosition.value,
    }))

    const collapseItemProvider: CollapseItemProvider = {
      index,
      name: itemName,
      disabled,
      init,
    }

    bindCollapse(collapseItemProvider)

    const { handleTransitionEnd: onTransitionEnd, handleTransitionStart } = useCollapseTransition({
      contentEl,
      showContent,
      expand: isShow,
    })

    watch(isShow, (show) => {
      if (show) {
        contentMounted.value = true
      }
    })

    function init(open: boolean) {
      isShow.value = open
      if (open) {
        contentMounted.value = true
      } else if (mergedDestroyOnHide.value && !showContent.value) {
        contentMounted.value = false
      }
    }

    function toggle() {
      if (props.disabled) {
        return
      }

      updateItem(props.name ?? index.value, !isShow.value)
    }

    function handleTransitionEnd() {
      onTransitionEnd()
      if (!isShow.value && mergedDestroyOnHide.value) {
        contentMounted.value = false
      }
    }

    function renderExpandIconFallback() {
      if (collapseSlots['expand-icon']) {
        return collapseSlots['expand-icon'](expandIconSlotProps.value)
      }

      return h(MpIcon, {
        name: props.icon,
        transition: 250,
        class: classes(
          n('header-icon'),
          [isShow.value && props.icon === 'chevron-down', n('header-open')],
          [props.disabled, n('header--disable')],
        ),
      })
    }

    return {
      isShow,
      showContent,
      contentMounted,
      offset,
      divider,
      elevation,
      contentEl,
      accordion,
      expandIconPosition,
      mergedShowExpandIcon,
      expandIconSlotProps,
      renderExpandIconFallback,
      n,
      classes,
      toggle,
      formatElevation,
      handleTransitionEnd,
      handleTransitionStart,
    }
  },
})
</script>

<style lang="less">
@import '../styles/common';
@import '../icon/icon';
@import './collapseItem';
</style>
