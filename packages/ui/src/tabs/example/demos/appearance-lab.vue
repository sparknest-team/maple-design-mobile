<script setup>
import { reactive as __demoReactive, computed as demoComputed, ref as demoRef } from 'vue'

const __demoAppearance = __demoReactive({ variant: 'line', size: 'md' })
const demoCompareFields = [
  { name: 'variant', values: ['line', 'card', 'outline', 'plain', 'capsule', 'enclosed'] },
  { name: 'size', values: ['xs', 'sm', 'md', 'lg', 'xl'] },
]
const demoCompareAxis = demoRef('variant')
const demoComparedOptions = demoComputed(
  () => demoCompareFields.find((field) => field.name === demoCompareAxis.value)?.values ?? [],
)
</script>
<template>
  <mp-space direction="column" :size="16">
    <mp-form layout="vertical">
      <mp-form-item layout="vertical" size="sm" label="variant">
        <mp-select
          v-model="__demoAppearance['variant']"
          :clearable="false"
          :options="[
            { label: 'line', value: 'line' },
            { label: 'card', value: 'card' },
            { label: 'outline', value: 'outline' },
            { label: 'plain', value: 'plain' },
            { label: 'capsule', value: 'capsule' },
            { label: 'enclosed', value: 'enclosed' },
          ]"
          aria-label="variant"
        />
      </mp-form-item>
      <mp-form-item layout="vertical" size="sm" label="size">
        <mp-radio-group
          v-model="__demoAppearance['size']"
          aria-label="size"
          :options="[
            { label: 'xs', value: 'xs' },
            { label: 'sm', value: 'sm' },
            { label: 'md', value: 'md' },
            { label: 'lg', value: 'lg' },
            { label: 'xl', value: 'xl' },
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
        <mp-tabs default-value="overview" v-bind="{ ...__demoAppearance, [demoCompareAxis]: sample }">
          <mp-tab-pane name="overview" title="概览">概览内容</mp-tab-pane>
          <mp-tab-pane name="details" title="详情">详情内容</mp-tab-pane>
          <mp-tab-pane name="settings" title="设置">设置内容</mp-tab-pane>
        </mp-tabs>
      </section>
    </div>
  </mp-space>
</template>

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
