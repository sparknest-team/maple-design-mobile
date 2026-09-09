<template>
  <div :class="classes(n(), [animation, n('--animation')])" :aria-busy="loading">
    <template v-if="loading">
      <div v-if="fullscreen" :class="n('fullscreen')" :style="{ zIndex: toNumber(fullscreenZIndex) }">
        <span :class="n('shimmer')" />
      </div>
      <slot v-else name="template">
        <div :class="n('content')">
          <div v-if="card" :class="n('card')" :style="{ height: toSizeUnit(cardHeight) }">
            <span :class="n('shimmer')" />
          </div>
          <div v-if="avatar || title || rowCount > 0" :class="n('article')">
            <div
              v-if="avatar"
              :class="n('avatar')"
              :style="{
                width: toSizeUnit(avatarSize),
                height: toSizeUnit(avatarSize),
              }"
            >
              <span :class="n('shimmer')" />
            </div>
            <div v-if="title || rowCount > 0" :class="n('section')">
              <div v-if="title" :class="n('title')" :style="{ width: toSizeUnit(titleWidth) }">
                <span :class="n('shimmer')" />
              </div>
              <div
                v-for="(_, index) in rowCount"
                :key="index"
                :class="n('row')"
                :style="{ width: toSizeUnit(rowsWidth[index]) }"
              >
                <span :class="n('shimmer')" />
              </div>
            </div>
          </div>
        </div>
      </slot>
    </template>
    <slot v-else />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { createNamespace } from '../utils/components'
import { toSizeUnit } from '../utils/elements'
import { skeletonProps } from './props'

defineOptions({ name: createNamespace('skeleton').name })

const { n, classes } = createNamespace('skeleton')
const props = defineProps(skeletonProps)
const rowCount = computed(() => Math.max(0, Math.floor(toNumber(props.rows))))

function toNumber(value: number | string | undefined) {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : 0
}
</script>
