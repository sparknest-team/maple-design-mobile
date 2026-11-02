<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maple-design/cli/client'
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
import ContentGroupDeclarationComparison from './demos/group-declaration-comparison.vue'
import GroupStateDemo from './demos/group-state.vue'
import KeyboardNavigationDemo from './demos/keyboard-navigation.vue'
import NativeControlDemo from './demos/native-control.vue'
import OptionDataDemo from './demos/option-data.vue'
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
  <h2 class="mobile-demo-group-heading" data-demo-group="basic-examples" data-demo-component="radio">
    <span lang="zh-CN">基础示例</span>
    <span lang="en-US">Basic examples</span>
  </h2>

  <section data-demo="basic-usage">
    <app-type>{{ english ? 'Basic Usage' : '基本使用' }}</app-type>
    <BasicUsageDemo />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="appearance-and-states">
    <span lang="zh-CN">外观与状态</span>
    <span lang="en-US">Appearance and states</span>
  </h2>

  <section data-demo="disabled">
    <app-type>{{ english ? 'Disabled' : '禁用' }}</app-type>
    <DisabledDemo />
  </section>

  <section data-demo="readonly">
    <app-type>{{ english ? 'Readonly' : '只读' }}</app-type>
    <ReadonlyDemo />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="groups-and-layout">
    <span lang="zh-CN">分组与布局</span>
    <span lang="en-US">Groups and layout</span>
  </h2>

  <section data-demo="group-declaration-comparison">
    <h3 class="mobile-demo-case-heading">
      <span lang="zh-CN">单选组声明方式</span><span lang="en-US">Radio group declarations</span>
    </h3>
    <ContentGroupDeclarationComparison />
  </section>

  <section data-demo="vertical">
    <app-type>{{ english ? 'Vertical Direction' : '垂直布局' }}</app-type>
    <VerticalDemo />
  </section>

  <section data-demo="group-state">
    <app-type>{{ english ? 'Group state and readonly' : '分组状态与只读' }}</app-type>
    <EnglishGroupStateDemo v-if="english" /><GroupStateDemo v-else />
  </section>

  <section data-demo="button-sizes">
    <app-type>{{ english ? 'Button sizes' : '按钮尺寸' }}</app-type>
    <EnglishButtonSizesDemo v-if="english" /><ButtonSizesDemo v-else />
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

  <h2 class="mobile-demo-group-heading" data-demo-group="interaction-and-keyboard">
    <span lang="zh-CN">交互与键盘</span>
    <span lang="en-US">Interaction and keyboard</span>
  </h2>

  <section data-demo="state-lab">
    <app-type>{{ english ? 'Interaction states' : '交互状态切换' }}</app-type>
    <OrganizedStateLab />
  </section>

  <section data-demo="keyboard-navigation">
    <app-type>{{ english ? 'Keyboard navigation' : '键盘导航' }}</app-type>
    <EnglishKeyboardNavigationDemo v-if="english" /><KeyboardNavigationDemo v-else />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="control-and-content-customization">
    <span lang="zh-CN">控件与内容定制</span>
    <span lang="en-US">Control and content customization</span>
  </h2>

  <section data-demo="native-control">
    <app-type>{{ english ? 'Native control and custom icons' : '原生控件与自定义图标' }}</app-type>
    <EnglishNativeControlDemo v-if="english" /><NativeControlDemo v-else />
  </section>

  <section data-demo="set-style">
    <app-type>{{ english ? 'Modify Icon And Color' : '修改图标和颜色' }}</app-type>
    <SetStyleDemo />
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
