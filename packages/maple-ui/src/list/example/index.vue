<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import DemoApiReview from './demos/api-review.vue'
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
  <section data-demo="basic-usage">
    <app-type>{{ english ? 'basic usage' : 'basic usage' }}</app-type>
    <BasicUsageDemo />
  </section>

  <section data-demo="manual-usage">
    <app-type>{{ english ? 'manual usage' : 'manual usage' }}</app-type>
    <ManualUsageDemo />
  </section>

  <section data-demo="states">
    <app-type>{{ english ? 'states' : 'states' }}</app-type>
    <StatesDemo />
  </section>
  <section data-demo="virtual-lifecycle">
    <app-type>{{ english ? 'virtual-lifecycle' : '保留命令与 KeepAlive 生命周期' }}</app-type>
    <OrganizedVirtualLifecycle />
  </section>
  <section data-demo="bounded-scroll">
    <app-type>{{ english ? 'Bounded scrolling' : '容器滚动' }}</app-type
    ><BoundedEnDemo v-if="english" /><BoundedDemo v-else />
  </section>
  <section data-demo="virtual-navigation">
    <app-type>{{ english ? 'Virtual navigation' : '虚拟定位' }}</app-type
    ><VirtualEnDemo v-if="english" /><VirtualDemo v-else />
  </section>
  <section data-demo="api-review"><DemoApiReview /></section>
</template>
