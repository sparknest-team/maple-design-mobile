<script setup lang="ts">
import { proxyRefs as demoProxyRefs, ref } from 'vue'

const scene1 = demoProxyRefs(
  (() => {
    const attempts = ref(0)
    return { attempts }
  })(),
)
</script>

<template>
  <div class="demo-comparison">
    <section class="demo-comparison-case demo-comparison-case--1" data-comparison-scene="extra-slot">
      <h4><span lang="zh-CN">操作按钮</span><span lang="en-US">Extra Action</span></h4>
      <mp-empty :description="scene1.attempts ? 'No data. Local refresh completed.' : 'No data, please reload'">
        <template #extra>
          <mp-button status="primary" @click="scene1.attempts++">Reload</mp-button>
          <p aria-live="polite">Local refresh attempts: {{ scene1.attempts }}</p>
        </template>
      </mp-empty>
    </section>

    <section class="demo-comparison-case demo-comparison-case--2" data-comparison-scene="custom-image">
      <h4><span lang="zh-CN">自定义图片和文案</span><span lang="en-US">Custom Image and Copy</span></h4>
      <mp-space direction="column" :size="24">
        <mp-empty>
          <template #image>
            <m-icon-alert-circle />
          </template>
          No data, please reload!!
        </mp-empty>
        <mp-empty image-url="/cat.jpg" alt="空状态图片" description="自定义图片和文案" />
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
