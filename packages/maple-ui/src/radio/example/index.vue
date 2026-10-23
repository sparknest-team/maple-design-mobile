<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import DemoApiReview from './demos/api-review.vue'
import AsyncOptionsDemo from './demos/async-options.vue'
import BasicUsageDemo from './demos/basic-usage.vue'
import ButtonSizesDemo from './demos/button-sizes.vue'
import ControlValueDemo from './demos/control-value.vue'
import CustomFieldsDemo from './demos/custom-fields.vue'
import DisabledDemo from './demos/disabled.vue'
import EnglishAsyncOptionsDemo from './demos/en-US/async-options.vue'
import EnglishButtonSizesDemo from './demos/en-US/button-sizes.vue'
import EnglishControlValueDemo from './demos/en-US/control-value.vue'
import EnglishGroupStateDemo from './demos/en-US/group-state.vue'
import EnglishKeyboardNavigationDemo from './demos/en-US/keyboard-navigation.vue'
import EnglishNativeControlDemo from './demos/en-US/native-control.vue'
import EnglishOptionDataDemo from './demos/en-US/option-data.vue'
import GroupStateDemo from './demos/group-state.vue'
import KeyboardNavigationDemo from './demos/keyboard-navigation.vue'
import NativeControlDemo from './demos/native-control.vue'
import OptionDataDemo from './demos/option-data.vue'
import RadioGroupOptionsDemo from './demos/radio-group-options.vue'
import RadioGroupDemo from './demos/radio-group.vue'
import ReadonlyDemo from './demos/readonly.vue'
import SetStateDemo from './demos/set-state.vue'
import SetStyleDemo from './demos/set-style.vue'
import OrganizedStateLab from './demos/state-lab.vue'
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
    <app-type>{{ english ? 'Modify Icon And Color' : '修改图标和颜色' }}</app-type>
    <SetStyleDemo />
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
  <section data-demo="keyboard-navigation">
    <app-type>{{ english ? 'Keyboard navigation' : '键盘导航' }}</app-type>
    <EnglishKeyboardNavigationDemo v-if="english" /><KeyboardNavigationDemo v-else />
  </section>
  <section data-demo="button-sizes">
    <app-type>{{ english ? 'Button sizes' : '按钮尺寸' }}</app-type>
    <EnglishButtonSizesDemo v-if="english" /><ButtonSizesDemo v-else />
  </section>
  <section data-demo="native-control">
    <app-type>{{ english ? 'Native control and custom icons' : '原生控件与自定义图标' }}</app-type>
    <EnglishNativeControlDemo v-if="english" /><NativeControlDemo v-else />
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
