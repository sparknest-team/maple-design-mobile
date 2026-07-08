<template>
  <button
    v-ripple
    :class="classes(n(), n('$--box'), [variant, n('--variant-padding')], [isActive && !variant, n('--active')])"
    :style="{
      color: isActive ? activeColor : inactiveColor,
    }"
    @click="handleClick"
  >
    <div
      :class="
        classes(
          n('icon-container'),
          [variant, n('--variant-icon-container')],
          [isActive && variant, n('--variant-active')],
        )
      "
    >
      <mp-badge v-if="badge" v-bind="badgeProps" :class="n('badge')" mp-bottom-navigation-item-cover>
        <slot name="icon" :active="isActive">
          <mp-icon v-if="icon" :name="icon" :namespace="namespace" :class="n('icon')" mp-bottom-navigation-item-cover />
        </slot>
      </mp-badge>
      <slot v-else name="icon" :active="isActive">
        <mp-icon v-if="icon" :name="icon" :namespace="namespace" :class="n('icon')" mp-bottom-navigation-item-cover />
      </slot>
    </div>

    <span :class="n('label')">
      <slot>{{ label }}</slot>
    </span>
  </button>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { call } from '@maplejs/maple-shared'
import { type BadgeProps } from '../../types'
import MpBadge from '../badge'
import MpIcon from '../icon'
import Ripple from '../ripple'
import { createNamespace } from '../utils/components'
import { props } from './props'
import { useBottomNavigation, type BottomNavigationItemProvider } from './provide'

const { name, n, classes } = createNamespace('bottom-navigation-item')

const defaultBadgeProps = {
  status: 'danger',
  dot: true,
}

export default defineComponent({
  name,
  components: {
    MpBadge,
    MpIcon,
  },
  directives: { Ripple },
  props,
  setup(props) {
    const name = computed<string | undefined>(() => props.name)
    const isActive = computed<boolean>(() => [name.value, index.value].includes(active.value))
    const badgeProps = computed(() => (props.badge === true ? defaultBadgeProps : props.badge) as BadgeProps)
    const { index, bottomNavigation, bindBottomNavigation } = useBottomNavigation()
    const { active, activeColor, inactiveColor, variant } = bottomNavigation
    const bottomNavigationItemProvider: BottomNavigationItemProvider = {
      name,
      index,
    }

    bindBottomNavigation(bottomNavigationItemProvider)

    function handleClick() {
      const active = name.value ?? index.value

      call(props.onClick, active)
      call(bottomNavigation.onToggle, active)
    }

    return {
      activeColor,
      inactiveColor,
      badgeProps,
      isActive,
      variant,
      n,
      classes,
      handleClick,
    }
  },
})
</script>

<style lang="less">
@import '../styles/common';
@import '../ripple/ripple';
@import '../badge/badge';
@import '../icon/icon';
@import './bottomNavigationItem';
</style>
