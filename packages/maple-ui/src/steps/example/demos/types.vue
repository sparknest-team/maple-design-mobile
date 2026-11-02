<script setup lang="ts">
import { ref } from 'vue'
import type { StepsType } from '@maple-design/ui'

const current = ref(2)
const statuses = ['wait', 'process', 'finish', 'error'] as const
const status = ref<(typeof statuses)[number]>('process')
const types: StepsType[] = ['default', 'arrow', 'dot', 'navigation']
</script>

<template>
  <section class="step-type-comparison">
    <mp-form-item layout="vertical" size="sm" label="Current step">
      <mp-radio-group
        v-model="current"
        aria-label="Current step"
        :options="[
          { label: '1', value: 1 },
          { label: '2', value: 2 },
          { label: '3', value: 3 },
        ]"
        variant="button"
        size="sm"
      />
    </mp-form-item>
    <mp-form-item layout="vertical" size="sm" label="Status"
      ><mp-radio-group
        v-model="status"
        aria-label="Step status"
        :options="statuses.map((value) => ({ label: value, value }))"
    /></mp-form-item>
    <p>点击步骤或选择序号，对比同一进度的四种外观。Click a step to compare the same progress.</p>
    <section v-for="type in types" :key="type" :data-step-type="type">
      <p>
        <code>{{ type }}</code>
      </p>
      <mp-steps v-model="current" :type="type" :status="status" changeable>
        <mp-step
          ><span lang="zh-CN">提交</span><span lang="en-US">Submit</span
          ><template #description
            ><span lang="zh-CN">提交信息</span><span lang="en-US">Details</span></template
          ></mp-step
        >
        <mp-step
          ><span lang="zh-CN">审核</span><span lang="en-US">Review</span
          ><template #description><span lang="zh-CN">审核信息</span><span lang="en-US">Review</span></template></mp-step
        >
        <mp-step
          ><span lang="zh-CN">完成</span><span lang="en-US">Done</span
          ><template #description
            ><span lang="zh-CN">完成信息</span><span lang="en-US">Complete</span></template
          ></mp-step
        >
      </mp-steps>
    </section>
  </section>
</template>

<style scoped>
html:not([lang='en-US']) .step-type-comparison [lang='en-US'],
html[lang='en-US'] .step-type-comparison [lang='zh-CN'] {
  display: none;
}
</style>
