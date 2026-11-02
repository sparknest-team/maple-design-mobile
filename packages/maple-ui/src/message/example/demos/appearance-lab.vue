<script setup>
import { reactive as __demoReactive, computed as demoComputed, ref as demoRef, reactive, toRefs } from 'vue'

const shows = reactive({
  show1: false,
  show2: false,
  show3: false,
  show4: false,
  show5: false,
  showCenter: false,
  showClosable: false,
})
const { show1, show2, show3, show4, show5, showCenter, showClosable } = toRefs(shows)
const __demoAppearance = __demoReactive({ variant: 'neutral', status: 'default' })
const demoCompareFields = [
  { name: 'variant', values: ['neutral', 'tonal', 'solid'] },
  { name: 'status', values: ['default', 'info', 'success', 'warning', 'danger', 'loading'] },
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
        <mp-radio-group
          v-model="__demoAppearance['variant']"
          aria-label="variant"
          :options="[
            { label: 'neutral', value: 'neutral' },
            { label: 'tonal', value: 'tonal' },
            { label: 'solid', value: 'solid' },
          ]"
          variant="button"
          size="sm"
        />
      </mp-form-item>
      <mp-form-item layout="vertical" size="sm" label="status">
        <mp-select
          v-model="__demoAppearance['status']"
          :clearable="false"
          :options="[
            { label: 'default', value: 'default' },
            { label: 'info', value: 'info' },
            { label: 'success', value: 'success' },
            { label: 'warning', value: 'warning' },
            { label: 'danger', value: 'danger' },
            { label: 'loading', value: 'loading' },
          ]"
          aria-label="status"
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
    <mp-space wrap
      ><mp-button
        v-for="sample in demoComparedOptions"
        :key="String(sample)"
        @click="
          () => {
            __demoAppearance[demoCompareAxis] = sample
            show1 = true
          }
        "
        >{{ demoCompareAxis }}={{ sample }}</mp-button
      ></mp-space
    >
    <mp-message v-model:open="show1" v-bind="__demoAppearance"> 这是一条消息提示 </mp-message>
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
