<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import BasicUsageDemo from './demos/basic-usage.vue'
import CustomFieldsDemo from './demos/custom-fields.vue'
import DisabledDemo from './demos/disabled.vue'
import RadioGroupOptionsDemo from './demos/radio-group-options.vue'
import RadioGroupDemo from './demos/radio-group.vue'
import ReadonlyDemo from './demos/readonly.vue'
import SetStateDemo from './demos/set-state.vue'
import SetStyleDemo from './demos/set-style.vue'
import VerticalDemo from './demos/vertical.vue'

const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')

watchLang((value) => {
  language.value = value
})
onThemeChange()
</script>

<template>
  <section data-demo="basic-usage">
    <app-type>{{ english ? 'Basic Usage' : '基本使用' }}</app-type>
    <BasicUsageDemo />
  </section>

  <section data-demo="set-state">
    <app-type>{{ english ? 'Set State Value' : '设置状态值' }}</app-type>
    <SetStateDemo />
  </section>

  <section data-demo="set-style">
    <app-type>{{ english ? 'Modify Icon And Color' : '修改图标和颜色' }}</app-type>
    <SetStyleDemo />
  </section>

  <section data-demo="disabled">
    <app-type>{{ english ? 'Disabled' : '禁用' }}</app-type>
    <DisabledDemo />
  </section>

  <section data-demo="readonly">
    <app-type>{{ english ? 'Readonly' : '只读' }}</app-type>
    <ReadonlyDemo />
  </section>

  <section data-demo="radio-group">
    <app-type>{{ english ? 'RadioGroup' : '单选框组' }}</app-type>
    <RadioGroupDemo />
  </section>

  <section data-demo="radio-group-options">
    <app-type>{{ english ? 'Options API' : '选项式 API' }}</app-type>
    <RadioGroupOptionsDemo />
  </section>

  <section data-demo="custom-fields">
    <app-type>{{ english ? 'Custom Fields' : '自定义字段' }}</app-type>
    <CustomFieldsDemo />
  </section>

  <section data-demo="vertical">
    <app-type>{{ english ? 'Vertical Direction' : '垂直布局' }}</app-type>
    <VerticalDemo />
  </section>
</template>
