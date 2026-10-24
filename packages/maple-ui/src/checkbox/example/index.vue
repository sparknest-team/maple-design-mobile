<script setup>
import { computed, reactive, ref, toRefs } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maple-design/cli/client'
import DemoApiReview from './demos/api-review.vue'
import AsyncOptionsDemo from './demos/async-options.vue'
import BasicUsageDemo from './demos/basic-usage.vue'
import CheckboxGroupOptionsDemo from './demos/checkbox-group-options.vue'
import CheckboxGroupDemo from './demos/checkbox-group.vue'
import ControlValueDemo from './demos/control-value.vue'
import CustomControlDemo from './demos/custom-control.vue'
import CustomFieldsDemo from './demos/custom-fields.vue'
import DisabledDemo from './demos/disabled.vue'
import EnglishAsyncOptionsDemo from './demos/en-US/async-options.vue'
import EnglishControlValueDemo from './demos/en-US/control-value.vue'
import EnglishCustomControlDemo from './demos/en-US/custom-control.vue'
import EnglishGroupMethodsDemo from './demos/en-US/group-methods.vue'
import EnglishGroupStateDemo from './demos/en-US/group-state.vue'
import EnglishNativeControlDemo from './demos/en-US/native-control.vue'
import EnglishOptionDataDemo from './demos/en-US/option-data.vue'
import GroupMethodsDemo from './demos/group-methods.vue'
import GroupStateDemo from './demos/group-state.vue'
import IndeterminateDemo from './demos/indeterminate.vue'
import MaxDemo from './demos/max.vue'
import NativeControlDemo from './demos/native-control.vue'
import OptionDataDemo from './demos/option-data.vue'
import ReadonlyDemo from './demos/readonly.vue'
import SetStateDemo from './demos/set-state.vue'
import SetStyleDemo from './demos/set-style.vue'
import OrganizedStateLab from './demos/state-lab.vue'
import VerticalDemo from './demos/vertical.vue'

const values = reactive({
  value: false,
  value2: false,
  value3: false,
  value4: false,
  value5: false,
  value6: [],
  value9: [],
  value10: false,
  value11: [],
  group: null,
  indeterminate: true,
  optionsValue: [],
  fieldValue: [],
})
const {
  value,
  value2,
  value3,
  value4,
  value5,
  value6,
  value9,
  group,
  value10,
  value11,
  indeterminate,
  optionsValue,
  fieldValue,
} = toRefs(values)
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

  <section data-demo="disabled">
    <app-type>{{ english ? 'Disabled' : '禁用' }}</app-type>
    <DisabledDemo />
  </section>

  <section data-demo="readonly">
    <app-type>{{ english ? 'Readonly' : '只读' }}</app-type>
    <ReadonlyDemo />
  </section>

  <section data-demo="set-state">
    <app-type>{{ english ? 'Set State Value' : '设置状态值' }}</app-type>
    <SetStateDemo />
  </section>

  <section data-demo="set-style">
    <app-type>{{ english ? 'Modify The Icon And Color' : '修改图标和颜色' }}</app-type>
    <SetStyleDemo />
  </section>

  <section data-demo="indeterminate">
    <app-type>{{ english ? 'Indeterminate' : '不确定状态' }}</app-type>
    <IndeterminateDemo />
  </section>

  <section data-demo="checkbox-group">
    <app-type>{{ english ? 'CheckboxGroup' : '复选框组' }}</app-type>
    <CheckboxGroupDemo />
  </section>

  <section data-demo="checkbox-group-options">
    <app-type>{{ english ? 'Options API' : '选项式 API' }}</app-type>
    <CheckboxGroupOptionsDemo />
  </section>

  <section data-demo="custom-fields">
    <app-type>{{ english ? 'Custom Fields' : '自定义字段' }}</app-type>
    <CustomFieldsDemo />
  </section>

  <section data-demo="vertical">
    <app-type>{{ english ? 'Vertical Direction' : '垂直布局' }}</app-type>
    <VerticalDemo />
  </section>

  <section data-demo="max">
    <app-type>{{ english ? 'Maximum Number Of Checked' : '最大选中数量' }}</app-type>
    <MaxDemo />
  </section>
  <section data-demo="group-state">
    <app-type>{{ english ? 'Group state and readonly' : '分组状态与只读' }}</app-type>
    <EnglishGroupStateDemo v-if="english" /><GroupStateDemo v-else />
  </section>
  <section data-demo="control-value">
    <app-type>{{ english ? 'Standalone values and methods' : '独立值模型与方法' }}</app-type>
    <EnglishControlValueDemo v-if="english" /><ControlValueDemo v-else />
  </section>
  <section data-demo="option-data">
    <app-type>{{ english ? 'Option data and labels' : '选项数据与标签' }}</app-type>
    <EnglishOptionDataDemo v-if="english" /><OptionDataDemo v-else />
  </section>
  <section data-demo="group-methods">
    <app-type>{{ english ? 'Group bulk methods' : '分组批量方法' }}</app-type>
    <EnglishGroupMethodsDemo v-if="english" /><GroupMethodsDemo v-else />
  </section>
  <section data-demo="native-control">
    <app-type>{{ english ? 'Native controls and appearance' : '原生控件与外观' }}</app-type>
    <EnglishNativeControlDemo v-if="english" /><NativeControlDemo v-else />
  </section>
  <section data-demo="custom-control">
    <app-type>{{ english ? 'Custom control slot' : '自定义控件插槽' }}</app-type>
    <EnglishCustomControlDemo v-if="english" /><CustomControlDemo v-else />
  </section>
  <section data-demo="state-lab">
    <app-type>{{ english ? 'Interaction states' : '交互状态切换' }}</app-type>
    <OrganizedStateLab />
  </section>
  <section data-demo="async-options">
    <app-type>{{ english ? 'Asynchronous options' : '异步选项' }}</app-type>
    <EnglishAsyncOptionsDemo v-if="english" /><AsyncOptionsDemo v-else />
  </section>
  <section data-demo="api-review"><DemoApiReview /></section>
</template>
