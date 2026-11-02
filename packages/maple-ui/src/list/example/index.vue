<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maple-design/cli/client'
import BasicUsageDemo from './demos/basic-usage.vue'
import BoundedDemo from './demos/bounded-scroll.vue'
import BoundedEnDemo from './demos/en-US/bounded-scroll.vue'
import VirtualEnDemo from './demos/en-US/virtual-navigation.vue'
import ManualUsageDemo from './demos/manual-usage.vue'
import StatesDemo from './demos/states.vue'
import OrganizedVirtualLifecycle from './demos/virtual-lifecycle.vue'
import VirtualDemo from './demos/virtual-navigation.vue'

const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')

watchLang((value) => {
  language.value = value
})
onThemeChange()
</script>

<template>
  <h2 class="mobile-demo-group-heading" data-demo-group="basic-examples" data-demo-component="list">
    <span lang="zh-CN">基础示例</span>
    <span lang="en-US">Basic examples</span>
  </h2>

  <section data-demo="basic-usage">
    <app-type>{{ english ? 'basic usage' : 'basic usage' }}</app-type>
    <BasicUsageDemo />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="appearance-and-states">
    <span lang="zh-CN">外观与状态</span>
    <span lang="en-US">Appearance and states</span>
  </h2>

  <section data-demo="states">
    <app-type>{{ english ? 'states' : 'states' }}</app-type>
    <StatesDemo />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="scrolling-and-virtualization">
    <span lang="zh-CN">滚动与虚拟列表</span>
    <span lang="en-US">Scrolling and virtualization</span>
  </h2>

  <section data-demo="bounded-scroll">
    <app-type>{{ english ? 'Bounded scrolling' : '容器滚动' }}</app-type
    ><BoundedEnDemo v-if="english" /><BoundedDemo v-else />
  </section>

  <section data-demo="virtual-navigation">
    <app-type>{{ english ? 'Virtual navigation' : '虚拟定位' }}</app-type
    ><VirtualEnDemo v-if="english" /><VirtualDemo v-else />
  </section>

  <section data-demo="manual-usage">
    <app-type>{{ english ? 'manual usage' : 'manual usage' }}</app-type>
    <ManualUsageDemo />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="lifecycle">
    <span lang="zh-CN">生命周期</span>
    <span lang="en-US">Lifecycle</span>
  </h2>

  <section data-demo="virtual-lifecycle">
    <app-type>{{ english ? 'virtual-lifecycle' : '保留命令与 KeepAlive 生命周期' }}</app-type>
    <OrganizedVirtualLifecycle />
  </section>
</template>
