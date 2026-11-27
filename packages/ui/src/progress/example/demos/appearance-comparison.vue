<script setup lang="ts">
import { proxyRefs as demoProxyRefs } from 'vue'

const scene1 = demoProxyRefs(
  (() => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
    return { sizes }
  })(),
)

const scene2 = demoProxyRefs(
  (() => {
    const statuses = ['default', 'primary', 'secondary', 'tertiary', 'info', 'success', 'warning', 'danger'] as const
    return { statuses }
  })(),
)
</script>

<template>
  <div class="demo-comparison">
    <section class="demo-comparison-case demo-comparison-case--1" data-comparison-scene="size">
      <h4><span lang="zh-CN">五档与自定义尺寸</span><span lang="en-US">size</span></h4>
      <mp-space direction="column" size="16px">
        <mp-space v-for="size in scene1.sizes" :key="size" wrap size="16px" align="center">
          <span>{{ size }}</span><mp-progress :size="size" :percent="42" /><mp-progress
            mode="circle"
            :size="size"
            :percent="42"
          />
        </mp-space>
        <mp-progress :size="10" :percent="12.5" />
        <mp-progress size="0.75rem" :stroke-width="6" :percent="60" />
        <mp-progress mode="circle" size="6rem" :percent="75" />
      </mp-space>
    </section>

    <section class="demo-comparison-case demo-comparison-case--2" data-comparison-scene="status">
      <h4><span lang="zh-CN">八种状态</span><span lang="en-US">status</span></h4>
      <mp-space direction="column" size="16px">
        <mp-progress v-for="status in scene2.statuses" :key="status" :status="status" :percent="60"
          ><template #text>{{ status }}</template></mp-progress
        >
        <mp-progress :percent="100" />
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
