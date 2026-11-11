<script setup lang="ts">
import { reactive as __demoReactive, computed as demoComputed, ref as demoRef, ref } from 'vue'

const current = ref(1)
const __demoAppearance = __demoReactive({ status: 'wait', size: 'md' })
const demoCompareFields = [
  { name: 'status', values: ['wait', 'process', 'finish', 'error'] },
  { name: 'size', values: ['sm', 'md'] },
]
const demoCompareAxis = demoRef('status')
const demoComparedOptions = demoComputed(
  () => demoCompareFields.find((field) => field.name === demoCompareAxis.value)?.values ?? [],
)
</script>
<template>
  <mp-space direction="column" :size="16">
    <mp-form layout="vertical">
      <mp-form-item layout="vertical" size="sm" label="status">
        <mp-radio-group
          v-model="__demoAppearance['status']"
          aria-label="status"
          :options="[
            { label: 'wait', value: 'wait' },
            { label: 'process', value: 'process' },
            { label: 'finish', value: 'finish' },
            { label: 'error', value: 'error' },
          ]"
          variant="button"
          size="sm"
        />
      </mp-form-item>
      <mp-form-item layout="vertical" size="sm" label="size">
        <mp-radio-group
          v-model="__demoAppearance['size']"
          aria-label="size"
          :options="[
            { label: 'sm', value: 'sm' },
            { label: 'md', value: 'md' },
          ]"
          variant="button"
          size="sm"
        />
      </mp-form-item>
    </mp-form>
    <p class="demo-config-comparison-hint">
      <span lang="zh-CN">选择一个对比维度；其他配置和内容保持一致。输入类示例共享同一个值，便于比较外观。</span
      ><span lang="en-US"
        >Compare one dimension while keeping the other settings and content identical. Input specimens share the same
        value.</span
      >
    </p>
    <mp-radio-group
      v-model="demoCompareAxis"
      aria-label="Compare configuration"
      :options="demoCompareFields.map((field) => ({ label: field.name, value: field.name }))"
    />
    <div class="demo-config-comparison">
      <section v-for="sample in demoComparedOptions" :key="String(sample)">
        <p>
          <code>{{ demoCompareAxis }}={{ sample }}</code>
        </p>
        <mp-steps
          :model-value="2"
          content-placement="bottom"
          v-bind="{ ...__demoAppearance, [demoCompareAxis]: sample }"
        >
          <mp-step>步骤1</mp-step>
          <mp-step>步骤2</mp-step>
          <mp-step>步骤3</mp-step>
        </mp-steps>
      </section>
    </div>
  </mp-space>
</template>
<style scoped lang="less">
.status-switch {
  margin-bottom: 16px;
}
</style>

<style scoped>
.demo-config-comparison {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 220px), 1fr));
  gap: 20px;
  min-width: 0;
  max-width: 100%;
}
.demo-config-comparison > section {
  min-width: 0;
}
.demo-config-comparison p {
  margin: 0 0 8px;
}
html:not([lang='en-US']) .demo-config-comparison-hint > [lang='en-US'],
html[lang='en-US'] .demo-config-comparison-hint > [lang='zh-CN'] {
  display: none;
}
</style>
