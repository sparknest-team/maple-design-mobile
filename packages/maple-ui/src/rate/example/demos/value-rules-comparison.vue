<script setup lang="ts">
import { proxyRefs as demoProxyRefs, reactive } from 'vue'

const scene1 = demoProxyRefs(
  (() => {
    const scores = reactive({
      score: 3,
      score1: 3,
      score3: 3,
      score4: 3,
      score6: 3.5,
      score7: 3,
      score8: 3,
      score10: 3,
      score12: 3.5,
    })
    return { scores }
  })(),
)

const scene2 = demoProxyRefs(
  (() => {
    const scores = reactive({
      score: 3,
      score1: 3,
      score3: 3,
      score4: 3,
      score6: 3.5,
      score7: 3,
      score8: 3,
      score10: 3,
      score12: 3.5,
    })
    return { scores }
  })(),
)
</script>

<template>
  <div class="demo-comparison">
    <section class="demo-comparison-case demo-comparison-case--1" data-comparison-scene="clearable">
      <h4><span lang="zh-CN">可清空</span><span lang="en-US">Can Be Cleared</span></h4>
      <mp-rate v-model="scene1.scores.score12" clearable allow-half />
    </section>

    <section class="demo-comparison-case demo-comparison-case--2" data-comparison-scene="custom-total-rating">
      <h4><span lang="zh-CN">自定义评分总数</span><span lang="en-US">Customize Total Rating</span></h4>
      <mp-rate v-model="scene2.scores.score1" :count="8" />
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
