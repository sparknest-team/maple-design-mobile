<script setup>
import { AppType } from '@maple-design/cli-vue/client'
import { demoEnglish as english } from '@maple-design/cli-vue/demo-language'
import OrganizedAppearanceLab from './demos/appearance-lab.vue'
import EnglishDemo9 from './demos/en-US/accessibility.vue'
import EnglishDemo0 from './demos/en-US/basic.vue'
import EnglishDemo2 from './demos/en-US/case-sensitive.vue'
import EnglishCustomDraft from './demos/en-US/custom-draft.vue'
import EnglishDemo8 from './demos/en-US/decorator.vue'
import EnglishDemo4 from './demos/en-US/footer.vue'
import EnglishDemo1 from './demos/en-US/opening-policy.vue'
import EnglishDemo3 from './demos/en-US/remote.vue'
import EnglishDemo5 from './demos/en-US/virtual-list.vue'
import PassthroughOptionsDemo from './demos/passthrough-options.vue'
import OrganizedStateLab from './demos/state-lab.vue'
import Demo9 from './demos/zh-CN/accessibility.vue'
import Demo0 from './demos/zh-CN/basic.vue'
import Demo2 from './demos/zh-CN/case-sensitive.vue'
import CustomDraft from './demos/zh-CN/custom-draft.vue'
import Demo8 from './demos/zh-CN/decorator.vue'
import Demo4 from './demos/zh-CN/footer.vue'
import GroupSpacingDemo from './demos/zh-CN/group-spacing.vue'
import Demo1 from './demos/zh-CN/opening-policy.vue'
import Demo3 from './demos/zh-CN/remote.vue'
import Demo5 from './demos/zh-CN/virtual-list.vue'
</script>
<template>
  <h2 class="mobile-demo-group-heading" data-demo-group="basic-examples" data-demo-component="auto-complete">
    <span lang="zh-CN">基础示例</span>
    <span lang="en-US">Basic examples</span>
  </h2>

  <section data-demo="basic">
    <app-type>{{ english ? 'Input and selection' : '基础输入与选择' }}</app-type>
    <EnglishDemo0 v-if="english" /><Demo0 v-else />
  </section>

  <section data-demo="custom-draft">
    <app-type>{{ english ? 'Custom text submission' : '自定义文本提交' }}</app-type>
    <EnglishCustomDraft v-if="english" /><CustomDraft v-else />
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

  <h2 class="mobile-demo-group-heading" data-demo-group="matching-and-suggestions">
    <span lang="zh-CN">匹配与候选列表</span>
    <span lang="en-US">Matching and suggestions</span>
  </h2>

  <section data-demo="opening-policy">
    <app-type>{{ english ? 'Opening and filtering' : '展开条件与过滤' }}</app-type>
    <EnglishDemo1 v-if="english" /><Demo1 v-else />
  </section>

  <section data-demo="case-sensitive">
    <app-type>{{ english ? 'Case sensitivity' : '大小写匹配' }}</app-type>
    <EnglishDemo2 v-if="english" /><Demo2 v-else />
  </section>

  <section data-demo="group-spacing">
    <app-type>{{ english ? 'Group spacing' : '分组间距' }}</app-type>
    <GroupSpacingDemo />
  </section>

  <section data-demo="virtual-list">
    <app-type>{{ english ? 'Virtual list' : '虚拟列表' }}</app-type>
    <EnglishDemo5 v-if="english" /><Demo5 v-else />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="content-and-field-customization">
    <span lang="zh-CN">内容与字段定制</span>
    <span lang="en-US">Content and field customization</span>
  </h2>

  <section data-demo="footer">
    <app-type>{{ english ? 'Field names and slots' : '自定义字段与内容' }}</app-type>
    <EnglishDemo4 v-if="english" /><Demo4 v-else />
  </section>

  <section data-demo="decorator">
    <app-type>{{ english ? 'Variants and colors' : '外观与颜色' }}</app-type>
    <EnglishDemo8 v-if="english" /><Demo8 v-else />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="interaction-and-keyboard">
    <span lang="zh-CN">交互与键盘</span>
    <span lang="en-US">Interaction and keyboard</span>
  </h2>

  <section data-demo="state-lab">
    <h3 class="mobile-demo-case-heading">
      <span lang="zh-CN">交互状态对比</span><span lang="en-US">Interaction state comparison</span>
    </h3>
    <OrganizedStateLab />
  </section>

  <section data-demo="accessibility">
    <app-type>{{ english ? 'Keyboard and accessibility' : '键盘与无障碍' }}</app-type>
    <EnglishDemo9 v-if="english" /><Demo9 v-else />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="async-data-and-configuration">
    <span lang="zh-CN">异步与配置</span>
    <span lang="en-US">Async data and configuration</span>
  </h2>

  <section data-demo="remote">
    <app-type>{{ english ? 'Async suggestions' : '异步建议' }}</app-type>
    <EnglishDemo3 v-if="english" /><Demo3 v-else />
  </section>

  <section data-demo="passthrough-options"><app-type>透传配置边界</app-type><PassthroughOptionsDemo /></section>
</template>
