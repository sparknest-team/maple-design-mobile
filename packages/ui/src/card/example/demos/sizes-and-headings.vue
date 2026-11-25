<script setup lang="ts">
import { ref, watch } from 'vue'

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
const size = ref<(typeof sizes)[number]>('md')
const levels = [1, 2, 3, 4, 5, 6] as const
const level = ref<(typeof levels)[number] | 'default'>('default')
const showDescription = ref(true)
const showContent = ref(true)
const preview = ref<HTMLElement | null>(null)
const titleMetrics = ref('')
const descriptionMetrics = ref('')

function measureText() {
  const container = preview.value?.querySelector<HTMLElement>('.mp-card__container')
  const title = container?.querySelector('.mp-card__title-text')
  const description = container?.querySelector('.mp-card__description')
  if (!container || !title?.parentElement) {
    return
  }

  titleMetrics.value = formatMetrics(title, getComputedStyle(title.parentElement).marginTop)
  descriptionMetrics.value = description ? formatMetrics(description, getComputedStyle(description).marginTop) : ''
}

function formatMetrics(element: Element, gap: string) {
  const fontSize = getComputedStyle(element).fontSize
  return `字号 ${fontSize} · 上方间距 ${gap}`
}

watch([preview, size, level, showDescription], measureText, { flush: 'post' })
</script>

<template>
  <mp-space direction="column" align="stretch">
    <span>卡片尺寸</span>
    <mp-radio-group v-model="size" aria-label="卡片尺寸">
      <mp-radio v-for="value in sizes" :key="value" :value="value">{{ value }}</mp-radio>
    </mp-radio-group>
    <span>标题层级</span>
    <mp-radio-group v-model="level" aria-label="标题层级">
      <mp-radio value="default">默认</mp-radio>
      <mp-radio v-for="value in levels" :key="value" :value="value">h{{ value }}</mp-radio>
    </mp-radio-group>
    <mp-checkbox v-model="showDescription">显示描述</mp-checkbox>
    <mp-checkbox v-model="showContent">显示正文</mp-checkbox>
    <output>
      尺寸 {{ size }} · 标题层级 {{ level === 'default' ? '默认' : `h${level}` }}<br />
      标题 · {{ titleMetrics }}
      <template v-if="showDescription"><br />说明 · {{ descriptionMetrics }}</template>
    </output>
    <div ref="preview" @transitionend="measureText">
      <mp-card
        :size="size"
        :heading-level="level === 'default' ? undefined : level"
        title="项目概览"
        :description="showDescription ? '项目设置适用于整个团队。' : undefined"
      >
        <!-- 隐藏正文后，插槽中只剩注释。 -->
        <span v-if="showContent">管理员可以邀请成员。</span>
      </mp-card>
    </div>
  </mp-space>
</template>
