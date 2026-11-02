<script setup lang="ts">
import { proxyRefs as demoProxyRefs, ref } from 'vue'

const scene2 = demoProxyRefs(
  (() => {
    const divider = ref(true)
    return { divider }
  })(),
)
</script>

<template>
  <div class="demo-comparison">
    <section class="demo-comparison-case demo-comparison-case--1" data-comparison-scene="border-less">
      <h4><span lang="zh-CN">无边框模式</span><span lang="en-US">Borderless</span></h4>
      <mp-collapse :default-value="['1']" :bordered="false">
        <mp-collapse-item title="Beijing Toutiao Technology Co., Ltd." name="1">
          <div>Beijing Toutiao Technology Co., Ltd.</div>
        </mp-collapse-item>
        <mp-collapse-item title="Beijing Toutiao Technology Co., Ltd." name="2" disabled>
          <div>Beijing Toutiao Technology Co., Ltd.</div>
        </mp-collapse-item>
        <mp-collapse-item title="Beijing Toutiao Technology Co., Ltd." name="3">
          <div>Beijing Toutiao Technology Co., Ltd.</div>
        </mp-collapse-item>
      </mp-collapse>
    </section>

    <section class="demo-comparison-case demo-comparison-case--2" data-comparison-scene="divider">
      <h4><span lang="zh-CN">分割线</span><span lang="en-US">Divider</span></h4>
      <mp-space
        direction="column"
        :style="{
          width: '100%',
        }"
      >
        <mp-button @click="scene2.divider = !scene2.divider">
          {{ scene2.divider ? 'Hide divider' : 'Show divider' }}
        </mp-button>
        <mp-collapse :default-value="[]" :divider="scene2.divider">
          <mp-collapse-item title="Beijing Toutiao Technology Co., Ltd." name="1">
            <div>Beijing Toutiao Technology Co., Ltd.</div>
          </mp-collapse-item>
          <mp-collapse-item title="Beijing Toutiao Technology Co., Ltd." name="2">
            <div>Beijing Toutiao Technology Co., Ltd.</div>
          </mp-collapse-item>
          <mp-collapse-item title="Beijing Toutiao Technology Co., Ltd." name="3">
            <div>Beijing Toutiao Technology Co., Ltd.</div>
          </mp-collapse-item>
        </mp-collapse>
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
