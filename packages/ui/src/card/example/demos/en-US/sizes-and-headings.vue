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
  return `font size ${fontSize} · gap above ${gap}`
}

watch([preview, size, level, showDescription], measureText, { flush: 'post' })
</script>

<template>
  <mp-space direction="column" align="stretch">
    <span>Card size</span>
    <mp-radio-group v-model="size" aria-label="Card size">
      <mp-radio v-for="value in sizes" :key="value" :value="value">{{ value }}</mp-radio>
    </mp-radio-group>
    <span>Heading level</span>
    <mp-radio-group v-model="level" aria-label="Heading level">
      <mp-radio value="default">Default</mp-radio>
      <mp-radio v-for="value in levels" :key="value" :value="value">h{{ value }}</mp-radio>
    </mp-radio-group>
    <mp-checkbox v-model="showDescription">Show description</mp-checkbox>
    <mp-checkbox v-model="showContent">Show content</mp-checkbox>
    <output>
      Size {{ size }} · Heading {{ level === 'default' ? 'Default' : `h${level}` }}<br />
      Title · {{ titleMetrics }}
      <template v-if="showDescription"><br />Description · {{ descriptionMetrics }}</template>
    </output>
    <div ref="preview" @transitionend="measureText">
      <mp-card
        :size="size"
        :heading-level="level === 'default' ? undefined : level"
        title="Project overview"
        :description="showDescription ? 'Project settings apply to the entire team.' : undefined"
      >
        <!-- Only this comment remains when content is hidden. -->
        <span v-if="showContent">Administrators can invite members.</span>
      </mp-card>
    </div>
  </mp-space>
</template>
