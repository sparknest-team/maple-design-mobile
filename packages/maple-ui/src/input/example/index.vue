<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maple-design/cli/client'
import ControlSizes from '../../field-decorator/example/demos/control-sizes.vue'
import DemoApiReview from './demos/api-review.vue'
import OrganizedAppearanceLab from './demos/appearance-lab.vue'
import BasicDemo from './demos/basic.vue'
import CustomClearIconDemo from './demos/custom-clear-icon.vue'
import DefaultValueDemo from './demos/default-value.vue'
import EnBasicDemo from './demos/en-US/basic.vue'
import EnCustomClearIconDemo from './demos/en-US/custom-clear-icon.vue'
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
import EnSizeDemo from './demos/en-US/size.vue'
import EnStateDemo from './demos/en-US/state.vue'
import EnTypeDemo from './demos/en-US/type.vue'
import EnVariantDemo from './demos/en-US/variant.vue'
import PipelineDemo from './demos/event-pipeline.vue'
import FormFeedbackDemo from './demos/form-feedback.vue'
import GroupStateDemo from './demos/group-state.vue'
import GroupDemo from './demos/group.vue'
import HintDemo from './demos/hint.vue'
import MaxLengthDemo from './demos/max-length.vue'
import ModelModifierDemo from './demos/model-modifier.vue'
import NativeAttrsDemo from './demos/native-attrs.vue'
import PasswordDemo from './demos/password.vue'
import PrefixSuffixDemo from './demos/prefix-suffix.vue'
import SizeDemo from './demos/size.vue'
import OrganizedStateLab from './demos/state-lab.vue'
import StateDemo from './demos/state.vue'
import TypeDemo from './demos/type.vue'
import VariantDemo from './demos/variant.vue'

const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')

watchLang((value) => {
  language.value = value
})
onThemeChange()
</script>

<template>
  <section data-demo="basic">
    <app-type>{{ english ? 'Basic Usage' : '基础用法' }}</app-type>
    <EnBasicDemo v-if="english" />
    <BasicDemo v-else />
  </section>
  <section data-demo="default-value">
    <app-type>{{ english ? 'Default value and v-model' : '默认值与双向绑定' }}</app-type>
    <DefaultValueDemo :english="english" />
  </section>
  <section data-demo="variant">
    <app-type>{{ english ? 'Variants' : '外观变体' }}</app-type>
    <EnVariantDemo v-if="english" />
    <VariantDemo v-else />
  </section>

  <section data-demo="size">
    <app-type>{{ english ? 'Sizes' : '尺寸' }}</app-type>
    <EnSizeDemo v-if="english" />
    <SizeDemo v-else />
  </section>

  <section data-demo="state">
    <app-type>{{ english ? 'States' : '状态' }}</app-type>
    <EnStateDemo v-if="english" />
    <StateDemo v-else />
  </section>

  <section data-demo="control-sizes">
    <h3>Form controls / 表单控件尺寸对照</h3>
    <ControlSizes />
  </section>

  <section data-demo="hint">
    <app-type>{{ english ? 'Hint' : '提示文字' }}</app-type>
    <EnHintDemo v-if="english" />
    <HintDemo v-else />
  </section>

  <section data-demo="type">
    <app-type>{{ english ? 'Input Types' : '输入类型' }}</app-type>
    <EnTypeDemo v-if="english" />
    <TypeDemo v-else />
  </section>

  <section data-demo="prefix-suffix">
    <app-type>{{ english ? 'Prefix and Suffix' : '前缀和后缀' }}</app-type>
    <EnPrefixSuffixDemo v-if="english" />
    <PrefixSuffixDemo v-else />
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

  <section data-demo="form-feedback">
    <app-type>{{ english ? 'Form Feedback' : '表单反馈' }}</app-type>
    <EnFormFeedbackDemo v-if="english" />
    <FormFeedbackDemo v-else />
  </section>

  <section data-demo="password">
    <app-type>{{ english ? 'Password Input' : '密码输入框' }}</app-type>
    <EnPasswordDemo v-if="english" />
    <PasswordDemo v-else />
  </section>

  <section data-demo="max-length">
    <app-type>{{ english ? 'Character Limit' : '字数限制' }}</app-type>
    <EnMaxLengthDemo v-if="english" />
    <MaxLengthDemo v-else />
  </section>

  <section data-demo="custom-clear-icon">
    <app-type>{{ english ? 'Custom Clear Icon' : '自定义清除图标' }}</app-type>
    <EnCustomClearIconDemo v-if="english" />
    <CustomClearIconDemo v-else />
  </section>

  <section data-demo="model-modifier">
    <app-type>{{ english ? 'Model Modifier' : '输入修饰符' }}</app-type>
    <EnModelModifierDemo v-if="english" />
    <ModelModifierDemo v-else />
  </section>

  <section data-demo="native-attrs">
    <app-type>{{ english ? 'Native Attributes' : '原生属性' }}</app-type>
    <EnNativeAttrsDemo v-if="english" />
    <NativeAttrsDemo v-else />
  </section>
  <section data-demo="event-pipeline">
    <app-type>{{ english ? 'Body and event contract' : '主体与事件契约' }}</app-type
    ><EnPipelineDemo v-if="english" /><PipelineDemo v-else />
  </section>
  <section data-demo="appearance-lab">
    <app-type>{{ english ? 'Appearance combinations' : '外观组合' }}</app-type>
    <OrganizedAppearanceLab />
  </section>
  <section data-demo="state-lab">
    <app-type>{{ english ? 'Interaction states' : '交互状态切换' }}</app-type>
    <OrganizedStateLab />
  </section>
  <section data-demo="api-review"><DemoApiReview /></section>
</template>
