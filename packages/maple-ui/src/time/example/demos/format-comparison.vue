<script setup lang="ts">
import { proxyRefs as demoProxyRefs, reactive, ref } from 'vue'
import { AppType, onThemeChange } from '@maple-design/cli/client'

const scene1 = demoProxyRefs(
  (() => {
    const time = ref()

    const time24 = ref()
    return { time, time24 }
  })(),
)

const scene2 = demoProxyRefs(
  (() => {
    const time = ref()

    const timeWithSeconds = ref()
    return { time, timeWithSeconds }
  })(),
)

const scene3 = demoProxyRefs(
  (() => {
    const value = ref('12:00:00 am')

    const noon = ref('12:00:00 pm')
    return { value, noon }
  })(),
)
</script>

<template>
  <div class="demo-comparison">
    <section class="demo-comparison-case demo-comparison-case--1" data-comparison-scene="hour24">
      <h4><span lang="zh-CN">24 小时制</span><span lang="en-US">24-Hour Format</span></h4>
      <mp-space direction="column" size="lg">
        <mp-time v-model="scene1.time24" format="HH:mm" placeholder="24 小时制" clearable />
      </mp-space>
    </section>

    <section class="demo-comparison-case demo-comparison-case--2" data-comparison-scene="show-second">
      <h4><span lang="zh-CN">显示秒</span><span lang="en-US">Show Seconds</span></h4>
      <mp-space direction="column" size="lg">
        <mp-time v-model="scene2.timeWithSeconds" format="HH:mm:ss" placeholder="含秒" clearable />
      </mp-space>
    </section>

    <section class="demo-comparison-case demo-comparison-case--3" data-comparison-scene="ampm">
      <h4><span lang="zh-CN">AM/PM 与午夜/中午</span><span lang="en-US">AM/PM and midnight/noon</span></h4>
      <mp-space direction="column" :size="12" style="width: 100%">
        <p>12 AM 是午夜，12 PM 是中午。字段与面板联动展示。</p>
        <mp-time v-model="scene3.value" use12-hours style="width: 100%; max-width: 360px" />
        <mp-time v-model="scene3.noon" use12-hours style="width: 100%; max-width: 360px" />
        <mp-time-picker v-model="scene3.noon" use12-hours />
        <span>当前值: {{ scene3.value }}</span>
      </mp-space>
    </section>
  </div>
</template>

<style scoped lang="less">
.demo-comparison {
  display: grid;
  gap: 24px;
  min-width: 0;
  max-width: 100%;
}
.demo-comparison-case {
  min-width: 0;
  max-width: 100%;
}
.demo-comparison-case > h4 {
  margin: 0 0 12px;
  font-size: 14px;
}
html:not([lang='en-US']) .demo-comparison-case > h4 > [lang='en-US'],
html[lang='en-US'] .demo-comparison-case > h4 > [lang='zh-CN'] {
  display: none;
}
</style>
