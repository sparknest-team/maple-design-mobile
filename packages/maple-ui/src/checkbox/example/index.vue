<script setup>
import { computed, reactive, ref, toRefs } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maple-design/cli/client'
import AsyncOptionsDemo from './demos/async-options.vue'
import BasicUsageDemo from './demos/basic-usage.vue'
import ControlValueDemo from './demos/control-value.vue'
import CustomControlDemo from './demos/custom-control.vue'
import CustomFieldsDemo from './demos/custom-fields.vue'
import EnglishAsyncOptionsDemo from './demos/en-US/async-options.vue'
import EnglishControlValueDemo from './demos/en-US/control-value.vue'
import EnglishCustomControlDemo from './demos/en-US/custom-control.vue'
import EnglishGroupMethodsDemo from './demos/en-US/group-methods.vue'
import EnglishGroupStateDemo from './demos/en-US/group-state.vue'
import EnglishNativeControlDemo from './demos/en-US/native-control.vue'
import EnglishOptionDataDemo from './demos/en-US/option-data.vue'
import ContentGroupDeclarationComparison from './demos/group-declaration-comparison.vue'
import GroupMethodsDemo from './demos/group-methods.vue'
import GroupStateDemo from './demos/group-state.vue'
import IndeterminateDemo from './demos/indeterminate.vue'
import MaxDemo from './demos/max.vue'
import NativeControlDemo from './demos/native-control.vue'
import OptionDataDemo from './demos/option-data.vue'
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
  <h2 class="mobile-demo-group-heading" data-demo-group="basic-examples" data-demo-component="checkbox">
    <span lang="zh-CN">基础示例</span>
    <span lang="en-US">Basic examples</span>
  </h2>

  <section data-demo="basic-usage">
    <app-type>{{ english ? 'Basic Usage' : '基本使用' }}</app-type>
    <BasicUsageDemo />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="groups-and-layout">
    <span lang="zh-CN">分组与布局</span>
    <span lang="en-US">Groups and layout</span>
  </h2>

  <section data-demo="group-declaration-comparison">
    <h3 class="mobile-demo-case-heading">
      <span lang="zh-CN">选项声明方式对比</span><span lang="en-US">Option declaration comparison</span>
    </h3>
    <ContentGroupDeclarationComparison />
  </section>

  <section data-demo="group-state">
    <app-type>{{ english ? 'Group state and readonly' : '分组状态与只读' }}</app-type>
    <EnglishGroupStateDemo v-if="english" /><GroupStateDemo v-else />
  </section>

  <section data-demo="vertical">
    <app-type>{{ english ? 'Vertical Direction' : '垂直布局' }}</app-type>
    <VerticalDemo />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="options-and-value-model">
    <span lang="zh-CN">选项与值模型</span>
    <span lang="en-US">Options and value model</span>
  </h2>

  <section data-demo="control-value">
    <app-type>{{ english ? 'Standalone values and methods' : '独立值模型与方法' }}</app-type>
    <EnglishControlValueDemo v-if="english" /><ControlValueDemo v-else />
  </section>

  <section data-demo="option-data">
    <app-type>{{ english ? 'Option data and labels' : '选项数据与标签' }}</app-type>
    <EnglishOptionDataDemo v-if="english" /><OptionDataDemo v-else />
  </section>

  <section data-demo="custom-fields">
    <app-type>{{ english ? 'Custom Fields' : '自定义字段' }}</app-type>
    <CustomFieldsDemo />
  </section>

  <section data-demo="set-state">
    <app-type>{{ english ? 'Set State Value' : '设置状态值' }}</app-type>
    <SetStateDemo />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="selection-and-bulk-actions">
    <span lang="zh-CN">选择与批量操作</span>
    <span lang="en-US">Selection and bulk actions</span>
  </h2>

  <section data-demo="max">
    <app-type>{{ english ? 'Maximum Number Of Checked' : '最大选中数量' }}</app-type>
    <MaxDemo />
  </section>

  <section data-demo="indeterminate">
    <app-type>{{ english ? 'Indeterminate' : '不确定状态' }}</app-type>
    <IndeterminateDemo />
  </section>

  <section data-demo="group-methods">
    <app-type>{{ english ? 'Group bulk methods' : '分组批量方法' }}</app-type>
    <EnglishGroupMethodsDemo v-if="english" /><GroupMethodsDemo v-else />
  </section>

  <section data-demo="state-lab">
    <h3 class="mobile-demo-case-heading">
      <span lang="zh-CN">交互状态对比</span><span lang="en-US">Interaction state comparison</span>
    </h3>
    <OrganizedStateLab />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="control-and-slot-customization">
    <span lang="zh-CN">控件与插槽定制</span>
    <span lang="en-US">Control and slot customization</span>
  </h2>

  <section data-demo="native-control">
    <app-type>{{ english ? 'Native controls and appearance' : '原生控件与外观' }}</app-type>
    <EnglishNativeControlDemo v-if="english" /><NativeControlDemo v-else />
  </section>

  <section data-demo="set-style">
    <app-type>{{ english ? 'Modify The Icon And Color' : '修改图标和颜色' }}</app-type>
    <SetStyleDemo />
  </section>

  <section data-demo="custom-control">
    <app-type>{{ english ? 'Custom control slot' : '自定义控件插槽' }}</app-type>
    <EnglishCustomControlDemo v-if="english" /><CustomControlDemo v-else />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="async-options">
    <span lang="zh-CN">异步选项</span>
    <span lang="en-US">Async options</span>
  </h2>

  <section data-demo="async-options">
    <app-type>{{ english ? 'Asynchronous options' : '异步选项' }}</app-type>
    <EnglishAsyncOptionsDemo v-if="english" /><AsyncOptionsDemo v-else />
  </section>
</template>
