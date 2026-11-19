<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { demoEnglish as english } from '@maple-design/cli-vue/demo-language'
import type { SectionVariant } from '../../../section/props'

const text = computed(() =>
  english.value
    ? {
        event: 'Event type',
        level: 'Event level',
        tags: 'Tags',
        remote: 'Remote SOP',
        section: 'Onsite handling',
        onsite: 'Onsite SOP',
        safety: 'Safety notice',
        points: 'Key points',
        skill: 'Skill level',
        certificates: 'Certificates',
        review: 'Review',
        abnormal: 'Multiple anomalies',
      }
    : {
        event: '事件类型',
        level: '事件级别',
        tags: '标签',
        remote: '远程处置SOP',
        section: '现场处置',
        onsite: '现场处置SOP',
        safety: '安全须知',
        points: '处置要点',
        skill: '技能等级',
        certificates: '作业证',
        review: '审核',
        abnormal: '多元异常',
      },
)
const controls = computed(() =>
  english.value
    ? {
        variantLabel: 'Section style',
        optionsLabel: 'Display options',
        variants: { line: 'Divider', plain: 'Title only', card: 'Bordered card' },
        markerLabel: 'Title marker',
        endLabel: 'End divider',
        styleHint: 'Switching styles preserves your entries. A card uses its border to mark the section boundary.',
      }
    : {
        variantLabel: '分组风格',
        optionsLabel: '展示选项',
        variants: { line: '分隔线', plain: '仅标题', card: '边框卡片' },
        markerLabel: '显示标题标记',
        endLabel: '底部结束线',
        styleHint: '切换风格会保留已填内容。卡片使用外框表示分组范围。',
      },
)
const variant = ref<SectionVariant>('line')
const showMarker = ref(true)
const showEndDivider = ref(true)
const variantOptions = computed(() =>
  (['line', 'plain', 'card'] as const).map((value) => ({ value, label: controls.value.variants[value] })),
)
const model = reactive({
  event: 'abnormal',
  level: '3',
  tags: [],
  remote: ['review'],
  onsite: ['review'],
  safety: '1',
  points: '1',
  skill: 'L3',
  certificates: ['electric', 'entry', 'height', 'high'],
})
const certificateOptions = computed(() => [
  { value: 'electric', label: english.value ? 'Low voltage' : '低压电工证' },
  { value: 'entry', label: english.value ? 'Entry permit' : '进仓许可' },
  { value: 'height', label: english.value ? 'Work at height' : '登高证' },
  { value: 'high', label: english.value ? 'High voltage' : '高压电工证' },
])
</script>

<template>
  <div data-section-demo="variants">
    <mp-form layout="vertical">
      <mp-form-item :label="controls.variantLabel">
        <mp-radio-group v-model="variant" :options="variantOptions" :aria-label="controls.variantLabel" />
      </mp-form-item>
      <mp-form-item :label="controls.optionsLabel">
        <mp-space wrap>
          <mp-checkbox v-model="showMarker">{{ controls.markerLabel }}</mp-checkbox>
          <mp-checkbox v-model="showEndDivider" :disabled="variant === 'card'">{{ controls.endLabel }}</mp-checkbox>
        </mp-space>
      </mp-form-item>
    </mp-form>
    <p>{{ controls.styleHint }}</p>

    <mp-form :model="model" layout="horizontal" label-col-flex="7rem" edit-mode="direct">
      <mp-form-item field="event" :label="text.event" required>
        <mp-select v-model="model.event" :options="[{ value: 'abnormal', label: text.abnormal }]" />
      </mp-form-item>
      <mp-form-item field="level" :label="text.level" required>
        <mp-select v-model="model.level" :options="[{ value: '3', label: english ? 'Level 3' : '三级' }]" />
      </mp-form-item>
      <mp-form-item field="tags" :label="text.tags">
        <mp-select v-model="model.tags" multiple :options="[{ value: 'review', label: text.review }]" />
      </mp-form-item>
      <mp-form-item field="remote" :label="text.remote">
        <mp-select v-model="model.remote" multiple :options="[{ value: 'review', label: text.review }]" />
      </mp-form-item>

      <mp-section :title="text.section" :variant="variant" :show-marker="showMarker" :show-end-divider="showEndDivider">
        <mp-form-item field="onsite" :label="text.onsite">
          <mp-select v-model="model.onsite" multiple :options="[{ value: 'review', label: text.review }]" />
        </mp-form-item>
        <mp-form-item field="safety" :label="text.safety">
          <mp-textarea v-model="model.safety" :max-length="200" show-word-limit />
        </mp-form-item>
        <mp-form-item field="points" :label="text.points">
          <mp-textarea v-model="model.points" :max-length="200" show-word-limit />
        </mp-form-item>
      </mp-section>

      <mp-form-item field="skill" :label="text.skill">
        <mp-select v-model="model.skill" :options="[{ value: 'L3', label: 'L3' }]" />
      </mp-form-item>
      <mp-form-item field="certificates" :label="text.certificates">
        <mp-select v-model="model.certificates" multiple :options="certificateOptions" />
      </mp-form-item>
    </mp-form>
  </div>
</template>
