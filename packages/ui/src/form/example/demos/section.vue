<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import type { SectionVariant } from '@maple-design/ui-vue'

const variants = { 'heading-line': '标题线', plain: '仅标题', outline: '描边分区' }
const variant = ref<SectionVariant>('heading-line')
const showMarker = ref(true)
const variantOptions = computed(() =>
  (['heading-line', 'plain', 'outline'] as const).map((value) => ({ value, label: variants[value] })),
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
  { value: 'electric', label: '低压电工证' },
  { value: 'entry', label: '进仓许可' },
  { value: 'height', label: '登高证' },
  { value: 'high', label: '高压电工证' },
])
</script>

<template>
  <div data-section-demo="variants">
    <mp-form layout="vertical">
      <mp-form-item label="分组风格">
        <mp-radio-group v-model="variant" :options="variantOptions" aria-label="分组风格" />
      </mp-form-item>
      <mp-form-item label="展示选项">
        <mp-space wrap>
          <mp-checkbox v-model="showMarker">显示标题标记</mp-checkbox>
        </mp-space>
      </mp-form-item>
    </mp-form>
    <p>切换风格会保留已填内容。描边分区使用外框表示分组范围。</p>

    <mp-form :model="model" layout="horizontal" label-col-flex="7rem" edit-mode="direct">
      <mp-form-item field="event" label="事件类型" required>
        <mp-select v-model="model.event" :options="[{ value: 'abnormal', label: '多元异常' }]" />
      </mp-form-item>
      <mp-form-item field="level" label="事件级别" required>
        <mp-select v-model="model.level" :options="[{ value: '3', label: '三级' }]" />
      </mp-form-item>
      <mp-form-item field="tags" label="标签">
        <mp-select v-model="model.tags" multiple :options="[{ value: 'review', label: '审核' }]" />
      </mp-form-item>
      <mp-form-item field="remote" label="远程处置SOP">
        <mp-select v-model="model.remote" multiple :options="[{ value: 'review', label: '审核' }]" />
      </mp-form-item>

      <mp-section title="现场处置" :variant="variant" :show-marker="showMarker">
        <mp-form-item field="onsite" label="现场处置SOP">
          <mp-select v-model="model.onsite" multiple :options="[{ value: 'review', label: '审核' }]" />
        </mp-form-item>
        <mp-form-item field="safety" label="安全须知">
          <mp-textarea v-model="model.safety" :max-length="200" show-word-limit />
        </mp-form-item>
        <mp-form-item field="points" label="处置要点">
          <mp-textarea v-model="model.points" :max-length="200" show-word-limit />
        </mp-form-item>
      </mp-section>
      <mp-divider v-if="variant !== 'outline'" />

      <mp-form-item field="skill" label="技能等级">
        <mp-select v-model="model.skill" :options="[{ value: 'L3', label: 'L3' }]" />
      </mp-form-item>
      <mp-form-item field="certificates" label="作业证">
        <mp-select v-model="model.certificates" multiple :options="certificateOptions" />
      </mp-form-item>
    </mp-form>
  </div>
</template>
