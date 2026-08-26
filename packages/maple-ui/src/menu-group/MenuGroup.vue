<template>
  <div :class="n()">
    <div :class="n('title')">
      <slot name="title">{{ title }}</slot>
    </div>
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { createNamespace } from '../utils/components'
import { props } from './props'

const { name, n } = createNamespace('menu-group')

export default defineComponent({
  name,
  props,
  setup() {
    return { n }
  },
})
</script>

<style lang="less">
@import '../styles/common';
@import './menuGroup';
</style>
