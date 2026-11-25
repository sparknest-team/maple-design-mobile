<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { SectionMarkerPlacement, SectionStatus, SectionVariant } from '@maple-design/ui-vue'

const variants = ['plain', 'heading-line', 'tonal', 'outline'] as const
const variant = ref<SectionVariant>('outline')
const statuses = ['default', 'info', 'success', 'warning', 'danger'] as const
const status = ref<SectionStatus>('default')
const showTitle = ref(true)
const showDescription = ref(true)
const showMarker = ref(true)
const preferredPlacement = ref<SectionMarkerPlacement>('title')
const markerPlacement = computed({
  get: () => (showTitle.value ? preferredPlacement.value : 'section'),
  set: (value: SectionMarkerPlacement) => {
    preferredPlacement.value = value
  },
})

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
const size = ref<(typeof sizes)[number]>('md')
const levels = [1, 2, 3, 4, 5, 6] as const
const level = ref<(typeof levels)[number]>(4)
const showContent = ref(true)
const preview = ref<HTMLElement | null>(null)
const titleMetrics = ref('')
const descriptionMetrics = ref('')

function measureText() {
  const container = preview.value?.querySelector<HTMLElement>('.mp-section__surface')
  const title = container?.querySelector(`h${level.value}`)
  const description = container?.querySelector('.mp-section__description')
  if (!container) {
    return
  }

  titleMetrics.value = title ? formatMetrics(title, getComputedStyle(container).paddingTop) : ''
  descriptionMetrics.value = description ? formatMetrics(description, getComputedStyle(description).marginTop) : ''
}

function formatMetrics(element: Element, gap: string) {
  const fontSize = getComputedStyle(element).fontSize
  return `字号 ${fontSize} · 上方间距 ${gap}`
}

watch(
  [preview, size, level, showTitle, showDescription, variant, showMarker, markerPlacement],
  () => {
    measureText()
    const view = preview.value?.ownerDocument.defaultView
    view?.requestAnimationFrame?.(measureText)
  },
  { flush: 'post' },
)
</script>

<template>
  <mp-space direction="column" align="stretch">
    <span>分区尺寸</span>
    <mp-radio-group v-model="size" aria-label="分区尺寸">
      <mp-radio v-for="value in sizes" :key="value" :value="value">{{ value }}</mp-radio>
    </mp-radio-group>
    <span>标题层级</span>
    <mp-radio-group v-model="level" aria-label="标题层级">
      <mp-radio v-for="value in levels" :key="value" :value="value">h{{ value }}</mp-radio>
    </mp-radio-group>
    <mp-radio-group v-model="variant" aria-label="分组风格">
      <mp-radio v-for="value in variants" :key="value" :value="value">{{ value }}</mp-radio>
    </mp-radio-group>
    <mp-radio-group v-model="status" aria-label="分组状态">
      <mp-radio v-for="value in statuses" :key="value" :value="value">{{ value }}</mp-radio>
    </mp-radio-group>
    <mp-space wrap>
      <mp-checkbox v-model="showTitle">显示标题</mp-checkbox>
      <mp-checkbox v-model="showDescription">显示描述</mp-checkbox>
      <mp-checkbox v-model="showMarker">显示色条</mp-checkbox>
      <mp-checkbox v-model="showContent">显示正文</mp-checkbox>
    </mp-space>
    <mp-radio-group v-model="markerPlacement" :disabled="!showMarker" aria-label="色条位置">
      <mp-radio value="title" :disabled="!showTitle">标题旁</mp-radio>
      <mp-radio value="section">整个分区</mp-radio>
    </mp-radio-group>
    <output>
      尺寸 {{ size }} · 标题层级 h{{ level }}
      <template v-if="showTitle"><br />标题 · {{ titleMetrics }}</template>
      <template v-if="showDescription"><br />说明 · {{ descriptionMetrics }}</template>
    </output>
    <div ref="preview" @transitionend="measureText">
      <mp-section
        :size="size"
        :heading-level="level"
        :marker-placement="markerPlacement"
        :variant="variant"
        :status="status"
        :show-marker="showMarker"
        :title="showTitle ? '成员权限' : undefined"
        :description="showDescription ? '权限变更将应用到所有项目成员。' : undefined"
      >
        <!-- 隐藏正文后，插槽中只剩注释。 -->
        <span v-if="showContent">管理员可以邀请成员。</span>
      </mp-section>
    </div>
  </mp-space>
</template>
