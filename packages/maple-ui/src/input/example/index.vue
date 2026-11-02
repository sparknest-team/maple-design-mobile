<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maple-design/cli/client'
import ControlSizes from '../../field-decorator/example/demos/control-sizes.vue'
import OrganizedAppearanceLab from './demos/appearance-lab.vue'
import BasicDemo from './demos/basic.vue'
import GroupedCommitProtocolDemo from './demos/commit-protocol.vue'
import CustomClearIconDemo from './demos/custom-clear-icon.vue'
import DefaultValueDemo from './demos/default-value.vue'
import DemoEmptyValue from './demos/empty-value.vue'
import EnBasicDemo from './demos/en-US/basic.vue'
import EnCustomClearIconDemo from './demos/en-US/custom-clear-icon.vue'
import DemoEmptyValueEn from './demos/en-US/empty-value.vue'
import EnPipelineDemo from './demos/en-US/event-pipeline.vue'
import EnFormFeedbackDemo from './demos/en-US/form-feedback.vue'
import EnGroupStateDemo from './demos/en-US/group-state.vue'
import EnGroupDemo from './demos/en-US/group.vue'
import EnHintDemo from './demos/en-US/hint.vue'
import EnMaxLengthDemo from './demos/en-US/max-length.vue'
import EnModelModifierDemo from './demos/en-US/model-modifier.vue'
import EnNativeAttrsDemo from './demos/en-US/native-attrs.vue'
import EnPasswordDemo from './demos/en-US/password.vue'
import EnPrefixSuffixDemo from './demos/en-US/prefix-suffix.vue'
import EnTypeDemo from './demos/en-US/type.vue'
import PipelineDemo from './demos/event-pipeline.vue'
import FormFeedbackDemo from './demos/form-feedback.vue'
import GroupStateDemo from './demos/group-state.vue'
import GroupDemo from './demos/group.vue'
import HintDemo from './demos/hint.vue'
import LoadingDemo from './demos/loading.vue'
import MaxLengthDemo from './demos/max-length.vue'
import ModelModifierDemo from './demos/model-modifier.vue'
import NativeAttrsDemo from './demos/native-attrs.vue'
import PasswordDemo from './demos/password.vue'
import PrefixSuffixDemo from './demos/prefix-suffix.vue'
import OrganizedStateLab from './demos/state-lab.vue'
import TypeDemo from './demos/type.vue'

const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')

watchLang((value) => {
  language.value = value
})
onThemeChange()
</script>

<template>
  <h2 class="mobile-demo-group-heading" data-demo-group="basic-examples" data-demo-component="input">
    <span lang="zh-CN">基础示例</span>
    <span lang="en-US">Basic examples</span>
  </h2>

  <section data-demo="basic">
    <app-type>{{ english ? 'Basic Usage' : '基础用法' }}</app-type>
    <EnBasicDemo v-if="english" />
    <BasicDemo v-else />
  </section>

  <section data-demo="control-sizes">
    <h3>Form controls / 表单控件尺寸对照</h3>
    <ControlSizes />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="appearance-and-states">
    <span lang="zh-CN">外观与状态</span>
    <span lang="en-US">Appearance and states</span>
  </h2>

  <section data-demo="appearance-lab">
    <h3 class="mobile-demo-case-heading">
      <span lang="zh-CN">外观配置对比</span><span lang="en-US">Appearance configuration comparison</span>
    </h3>
    <OrganizedAppearanceLab />
  </section>

  <section data-demo="form-feedback">
    <app-type>{{ english ? 'Form Feedback' : '表单反馈' }}</app-type>
    <EnFormFeedbackDemo v-if="english" />
    <FormFeedbackDemo v-else />
  </section>

  <section data-demo="hint">
    <app-type>{{ english ? 'Hint' : '提示文字' }}</app-type>
    <EnHintDemo v-if="english" />
    <HintDemo v-else />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="input-content-and-layout">
    <span lang="zh-CN">输入内容与布局</span>
    <span lang="en-US">Input content and layout</span>
  </h2>

  <section data-demo="max-length">
    <app-type>{{ english ? 'Character Limit' : '字数限制' }}</app-type>
    <EnMaxLengthDemo v-if="english" />
    <MaxLengthDemo v-else />
  </section>

  <section data-demo="password">
    <app-type>{{ english ? 'Password Input' : '密码输入框' }}</app-type>
    <EnPasswordDemo v-if="english" />
    <PasswordDemo v-else />
  </section>

  <section data-demo="prefix-suffix">
    <app-type>{{ english ? 'Prefix and Suffix' : '前缀和后缀' }}</app-type>
    <EnPrefixSuffixDemo v-if="english" />
    <PrefixSuffixDemo v-else />
  </section>

  <section data-demo="custom-clear-icon">
    <app-type>{{ english ? 'Custom Clear Icon' : '自定义清除图标' }}</app-type>
    <EnCustomClearIconDemo v-if="english" />
    <CustomClearIconDemo v-else />
  </section>

  <section data-demo="group">
    <app-type>{{ english ? 'Input Group' : '输入框组合' }}</app-type>
    <EnGroupDemo v-if="english" />
    <GroupDemo v-else />
  </section>

  <section data-demo="group-state">
    <app-type>{{ english ? 'Group State Inheritance' : '组合状态继承' }}</app-type>
    <EnGroupStateDemo v-if="english" />
    <GroupStateDemo v-else />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="content-and-presentation">
    <span lang="zh-CN">内容与展示</span>
    <span lang="en-US">Content and presentation</span>
  </h2>

  <section data-demo="type">
    <app-type>{{ english ? 'Input Types' : '输入类型' }}</app-type>
    <EnTypeDemo v-if="english" />
    <TypeDemo v-else />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="value-model-and-interaction">
    <span lang="zh-CN">值模型与交互</span>
    <span lang="en-US">Value model and interaction</span>
  </h2>

  <section data-demo="default-value">
    <app-type>{{ english ? 'Default value and v-model' : '默认值与双向绑定' }}</app-type>
    <DefaultValueDemo :english="english" />
  </section>

  <section data-demo="empty-value">
    <app-type>{{ english ? 'Clear icon and manual deletion' : '清空按钮与手动删空' }}</app-type>
    <component :is="english ? DemoEmptyValueEn : DemoEmptyValue" />
  </section>

  <section data-demo="model-modifier">
    <app-type>{{ english ? 'Model Modifier' : '输入修饰符' }}</app-type>
    <EnModelModifierDemo v-if="english" />
    <ModelModifierDemo v-else />
  </section>

  <section data-demo="state-lab">
    <h3 class="mobile-demo-case-heading">
      <span lang="zh-CN">交互状态对比</span><span lang="en-US">Interaction state comparison</span>
    </h3>
    <OrganizedStateLab />
  </section>

  <section data-demo="event-pipeline">
    <app-type>{{ english ? 'Body and event contract' : '主体与事件契约' }}</app-type
    ><EnPipelineDemo v-if="english" /><PipelineDemo v-else />
  </section>

  <section data-demo="native-attrs">
    <app-type>{{ english ? 'Native Attributes' : '原生属性' }}</app-type>
    <EnNativeAttrsDemo v-if="english" />
    <NativeAttrsDemo v-else />
  </section>

  <section data-demo="commit-protocol">
    <h3 class="app-type mobile-demo-case-heading">
      <span lang="zh-CN">配置清空后的值</span><span lang="en-US">Configuring the clear result</span>
    </h3>
    <GroupedCommitProtocolDemo />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="loading-and-waiting">
    <span lang="zh-CN">加载与等待</span>
    <span lang="en-US">Loading and waiting</span>
  </h2>

  <section data-demo="loading">
    <app-type>{{ english ? 'Loading' : '加载状态' }}</app-type>
    <LoadingDemo />
  </section>
</template>
