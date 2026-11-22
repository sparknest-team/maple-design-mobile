<script setup>
import { AppType, onThemeChange } from '@maple-design/cli-vue/client'
import { demoEnglish as english } from '@maple-design/cli-vue/demo-language'
import OrganizedAppearanceLab from './demos/appearance-lab.vue'
import AutoSizeDemo from './demos/auto-size.vue'
import BodyDemo from './demos/body-contract.vue'
import Demo1 from './demos/demo-1.vue'
import Demo3 from './demos/demo-3.vue'
import Demo4 from './demos/demo-4.vue'
import Demo5 from './demos/demo-5.vue'
import Demo6 from './demos/demo-6.vue'
import EmptyPolicyDemo from './demos/empty-policy.vue'
import EnAutoSizeDemo from './demos/en-US/auto-size.vue'
import EnBodyDemo from './demos/en-US/body-contract.vue'
import EnDemo1 from './demos/en-US/demo-1.vue'
import EnDemo3 from './demos/en-US/demo-3.vue'
import EnDemo4 from './demos/en-US/demo-4.vue'
import EnDemo5 from './demos/en-US/demo-5.vue'
import EnDemo6 from './demos/en-US/demo-6.vue'
import OrganizedStateLab from './demos/state-lab.vue'

onThemeChange()
</script>
<template>
  <h2 class="mobile-demo-group-heading" data-demo-group="basic-examples" data-demo-component="textarea">
    <span lang="zh-CN">基础示例</span>
    <span lang="en-US">Basic examples</span>
  </h2>

  <section data-demo="demo-1">
    <app-type>{{ english ? 'Basic usage and value models' : '基础用法与值模型' }}</app-type
    ><EnDemo1 v-if="english" /><Demo1 v-else />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="appearance-and-states">
    <span lang="zh-CN">外观与状态</span>
    <span lang="en-US">Appearance and states</span>
  </h2>

  <section data-demo="demo-3">
    <app-type>{{ english ? 'Hint' : '浮动提示' }}</app-type
    ><EnDemo3 v-if="english" /><Demo3 v-else />
  </section>

  <section data-demo="demo-4">
    <app-type>{{ english ? 'Sizes' : '尺寸' }}</app-type
    ><EnDemo4 v-if="english" /><Demo4 v-else />
  </section>

  <section data-demo="demo-6">
    <app-type>{{ english ? 'States' : '状态' }}</app-type
    ><EnDemo6 v-if="english" /><Demo6 v-else />
  </section>

  <section data-demo="appearance-lab">
    <h3 class="mobile-demo-case-heading">
      <span lang="zh-CN">外观配置对比</span><span lang="en-US">Appearance configuration comparison</span>
    </h3>
    <OrganizedAppearanceLab />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="content-and-presentation">
    <span lang="zh-CN">内容与展示</span>
    <span lang="en-US">Content and presentation</span>
  </h2>

  <section data-demo="demo-5">
    <app-type>{{ english ? 'Length and resize' : '外边框与字数限制' }}</app-type
    ><EnDemo5 v-if="english" /><Demo5 v-else />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="interaction-and-control">
    <span lang="zh-CN">交互与控制</span>
    <span lang="en-US">Interaction and control</span>
  </h2>

  <section data-demo="state-lab">
    <app-type>{{ english ? 'Interaction states' : '交互状态切换' }}</app-type>
    <OrganizedStateLab />
  </section>

  <section data-demo="auto-size">
    <app-type>自动高度 / Auto Size</app-type><component :is="english ? EnAutoSizeDemo : AutoSizeDemo" />
  </section>

  <section data-demo="body-contract">
    <app-type>{{ english ? 'Body and event contract' : '主体与事件契约' }}</app-type
    ><EnBodyDemo v-if="english" /><BodyDemo v-else />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="value-model-and-interaction">
    <span lang="zh-CN">值模型与交互</span>
    <span lang="en-US">Value model and interaction</span>
  </h2>

  <section data-demo="empty-policy">
    <h3>动态清空策略 / Dynamic empty values</h3>
    <EmptyPolicyDemo />
  </section>
</template>
