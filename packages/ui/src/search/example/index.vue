<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maple-design/cli-vue/client'
import ActionDemo from './demos/action.vue'
import BasicDemo from './demos/basic.vue'
import EnActionDemo from './demos/en-US/action.vue'
import EnBasicDemo from './demos/en-US/basic.vue'
import EnFieldsDemo from './demos/en-US/fields.vue'
import EnHistoryDemo from './demos/en-US/history.vue'
import EnPresentationDemo from './demos/en-US/presentation.vue'
import EnSearchButtonDemo from './demos/en-US/search-button.vue'
import EnShapeDemo from './demos/en-US/shape.vue'
import EnStateDemo from './demos/en-US/state.vue'
import FieldsDemo from './demos/fields.vue'
import HistoryDemo from './demos/history.vue'
import NativeFormDemo from './demos/native-form.vue'
import PresentationDemo from './demos/presentation.vue'
import SearchButtonDemo from './demos/search-button.vue'
import ShapeDemo from './demos/shape.vue'
import OrganizedStateLab from './demos/state-lab.vue'
import StateDemo from './demos/state.vue'

const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')

watchLang((value) => {
  language.value = value
})
onThemeChange()
</script>

<template>
  <h2 class="mobile-demo-group-heading" data-demo-group="basic-examples" data-demo-component="search">
    <span lang="zh-CN">基础示例</span>
    <span lang="en-US">Basic examples</span>
  </h2>

  <section data-demo="basic">
    <app-type>{{ english ? 'Basic Usage' : '基础用法' }}</app-type>
    <EnBasicDemo v-if="english" />
    <BasicDemo v-else />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="appearance-and-states">
    <span lang="zh-CN">外观与状态</span>
    <span lang="en-US">Appearance and states</span>
  </h2>

  <section data-demo="shape">
    <app-type>{{ english ? 'Search Shape' : '搜索框形状' }}</app-type>
    <EnShapeDemo v-if="english" />
    <ShapeDemo v-else />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="data-and-options">
    <span lang="zh-CN">数据与选项</span>
    <span lang="en-US">Data and options</span>
  </h2>

  <section data-demo="search-button">
    <app-type>{{ english ? 'Search Button' : '搜索按钮' }}</app-type>
    <EnSearchButtonDemo v-if="english" />
    <SearchButtonDemo v-else />
  </section>

  <section data-demo="fields">
    <app-type>{{ english ? 'Field Select' : '带下拉字段选择' }}</app-type>
    <EnFieldsDemo v-if="english" />
    <FieldsDemo v-else />
  </section>

  <section data-demo="history">
    <app-type>{{ english ? 'Search History' : '搜索历史' }}</app-type>
    <EnHistoryDemo v-if="english" />
    <HistoryDemo v-else />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="customization-and-slots">
    <span lang="zh-CN">自定义与插槽</span>
    <span lang="en-US">Customization and slots</span>
  </h2>

  <section data-demo="presentation">
    <app-type>{{ english ? 'History presentation and slots' : '历史展示与插槽' }}</app-type>
    <EnPresentationDemo v-if="english" />
    <PresentationDemo v-else />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="content-and-presentation">
    <span lang="zh-CN">内容与展示</span>
    <span lang="en-US">Content and presentation</span>
  </h2>

  <section data-demo="action">
    <app-type>{{ english ? 'Cancel Button' : '取消按钮' }}</app-type>
    <EnActionDemo v-if="english" />
    <ActionDemo v-else />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="interaction-and-control">
    <span lang="zh-CN">交互与控制</span>
    <span lang="en-US">Interaction and control</span>
  </h2>

  <section data-demo="state-lab">
    <app-type>{{ english ? 'Interaction states' : '交互状态切换' }}</app-type>
    <OrganizedStateLab />
  </section>

  <section data-demo="state">
    <app-type>{{ english ? 'States' : '状态' }}</app-type>
    <EnStateDemo v-if="english" />
    <StateDemo v-else />
  </section>

  <section data-demo="native-form">
    <app-type>{{ english ? 'Native form and popup ownership' : '原生表单与弹层身份' }}</app-type
    ><NativeFormDemo />
  </section>
</template>
