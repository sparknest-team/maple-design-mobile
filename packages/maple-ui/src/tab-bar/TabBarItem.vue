<template>
  <button
    v-ripple
    type="button"
    :aria-pressed="isActive"
    :disabled="tabBar.loading.value"
    :class="
      classes(
        n(),
        n('$--box'),
        [variant === 'pill', n('--variant-padding')],
        [isActive && variant === 'standard', n('--active')],
      )
    "
    :style="{
      color: isActive ? activeColor : inactiveColor,
    }"
    @click="handleClick"
  >
    <div
      :class="
        classes(
          n('icon-container'),
          [variant === 'pill', n('--variant-icon-container')],
          [isActive && variant === 'pill', n('--variant-active')],
        )
      "
    >
      <mp-badge v-if="badge" v-bind="badgeProps" :class="n('badge')" mp-tab-bar-item-cover>
        <slot name="icon" :active="isActive">
          <mp-registered-icon v-if="icon" :name="icon" :class="n('icon')" mp-tab-bar-item-cover />
        </slot>
      </mp-badge>
      <slot v-else name="icon" :active="isActive">
        <mp-registered-icon v-if="icon" :name="icon" :class="n('icon')" mp-tab-bar-item-cover />
      </slot>
    </div>

    <span :class="n('label')">
      <slot :active="isActive">{{ label }}</slot>
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { call } from '@maple-design/shared'
import type { BadgeProps } from '../badge'
import MpBadge from '../badge'
import MpRegisteredIcon from '../icon/RegisteredIcon.vue'
import vRipple from '../ripple'
import { createNamespace } from '../utils/components'
import { props as tabBarItemProps } from './item-props'
import { useTabBar, type TabBarItemProvider } from './item-provide'

const { n, classes } = createNamespace('tab-bar-item')

const defaultBadgeProps = {
  status: 'danger',
  size: 'xs',
  position: 'top-right',
  mode: 'floating',
}

defineOptions({ name: createNamespace('tab-bar-item').name })
const props = defineProps(tabBarItemProps)
const emit = defineEmits<{ click: [active: number | string] }>()

const name = computed<number | string | undefined>(() => props.name)
const isActive = computed<boolean>(() => tabBar.isActive(index.value))
const badgeProps = computed(
  () => ({ ...defaultBadgeProps, ...(props.badge === true ? { dot: true } : props.badge || {}) }) as BadgeProps,
)
const { index, tabBar, bindTabBar } = useTabBar()
const { activeColor, inactiveColor, variant } = tabBar
const tabBarItemProvider: TabBarItemProvider = {
  name,
  index,
}

bindTabBar(tabBarItemProvider)

function handleClick() {
  if (tabBar.loading.value) {
    return
  }
  const active = name.value ?? index.value

  emit('click', active)
  call(tabBar.onToggle, active)
}
</script>
