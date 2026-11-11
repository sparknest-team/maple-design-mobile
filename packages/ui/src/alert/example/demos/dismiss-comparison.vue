<script setup lang="ts">
import { proxyRefs as demoProxyRefs, ref } from 'vue'

const scene1 = demoProxyRefs(
  (() => {
    const generation = ref(0)

    const closeCount = ref(0)

    const closedCount = ref(0)
    return { generation, closeCount, closedCount }
  })(),
)

const scene2 = demoProxyRefs(
  (() => {
    const showCloseIcon = ref(true)
    return { showCloseIcon }
  })(),
)
</script>

<template>
  <div class="demo-comparison">
    <section class="demo-comparison-case demo-comparison-case--1" data-comparison-scene="allow-to-close">
      <h4><span lang="zh-CN">允许关闭</span><span lang="en-US">Allow To Close</span></h4>
      <section class="alert-close-demo">
        <mp-alert
          :key="scene1.generation"
          title="傲慢与偏见"
          message="我也说不准是在什么时间，什么地点，看见你的什么神情，听见你的什么言语，便开始爱上了你。"
          closable
          @close="scene1.closeCount++"
          @closed="scene1.closedCount++"
        />
        <p role="status">Close: {{ scene1.closeCount }} · Closed: {{ scene1.closedCount }}</p>
        <mp-button :disabled="scene1.closedCount === scene1.generation" @click="scene1.generation++"
          >Reopen / 重新打开</mp-button
        >
      </section>
    </section>

    <section class="demo-comparison-case demo-comparison-case--2" data-comparison-scene="custom-close-icon">
      <h4><span lang="zh-CN">自定义关闭图标</span><span lang="en-US">Custom Close Icon</span></h4>
      <mp-alert
        v-if="scene2.showCloseIcon"
        title="傲慢与偏见"
        message="我也说不准是在什么时间，什么地点，看见你的什么神情，听见你的什么言语，便开始爱上了你。"
        closable
        @close="scene2.showCloseIcon = false"
      >
        <template #close-icon>
          <m-icon-close />
        </template>
      </mp-alert>
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
