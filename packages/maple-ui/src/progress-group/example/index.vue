<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import BasicDemo from './demos/basic.vue'
import CircleDemo from './demos/circle.vue'
import ColorDemo from './demos/color.vue'
import CustomDemo from './demos/custom.vue'
import OrientationDemo from './demos/orientation.vue'
import OverflowKeyboardDemo from './demos/overflow-keyboard.vue'
import SizeDemo from './demos/size.vue'

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
    <BasicDemo />
  </section>

  <section data-demo="size">
    <app-type>{{ english ? 'Track Sizes' : '进度轨尺寸' }}</app-type>
    <SizeDemo />
  </section>

  <section data-demo="orientation">
    <app-type>{{ english ? 'Orientation' : '排列方向' }}</app-type>
    <OrientationDemo />
  </section>

  <section data-demo="circle">
    <app-type>{{ english ? 'Circular Segments' : '环形分段进度' }}</app-type>
    <CircleDemo />
  </section>

  <section data-demo="color">
    <app-type>{{ english ? 'Default Color and Track Only' : '默认颜色与纯进度轨' }}</app-type>
    <ColorDemo />
  </section>

  <section data-demo="custom">
    <app-type>{{ english ? 'Custom Content' : '自定义内容' }}</app-type>
    <CustomDemo />
  </section>
  <section data-demo="overflow-keyboard">
    <app-type>{{ english ? 'Overflow and Keyboard' : '超额与键盘提示' }}</app-type
    ><OverflowKeyboardDemo />
  </section>
</template>
