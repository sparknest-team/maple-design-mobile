<script setup lang="ts">
import MpInputTag from '../../index'
import '../../style'
import { proxyRefs as demoProxyRefs, ref } from 'vue'

const scene1 = demoProxyRefs(
  (() => {
    const size = ref<'xs' | 'sm' | 'md' | 'lg' | 'xl'>('md')
    return { size }
  })(),
)
</script>

<template>
  <div class="demo-comparison">
    <section class="demo-comparison-case demo-comparison-case--1" data-comparison-scene="size">
      <h4><span lang="zh-CN">输入框尺寸</span><span lang="en-US">size</span></h4>
      <mp-space direction="column" size="lg">
        <mp-radio-group v-model="scene1.size" type="button">
          <mp-radio value="xs">xs</mp-radio>
          <mp-radio value="sm">sm</mp-radio>
          <mp-radio value="md">md</mp-radio>
          <mp-radio value="lg">lg</mp-radio>
          <mp-radio value="xl">xl</mp-radio>
        </mp-radio-group>
        <mp-input-tag :default-value="['one']" placeholder="Please enter something" :size="scene1.size" clearable />
      </mp-space>
    </section>

    <section class="demo-comparison-case demo-comparison-case--2" data-comparison-scene="status">
      <h4><span lang="zh-CN">输入框状态</span><span lang="en-US">status</span></h4>
      <mp-space direction="column" size="lg">
        <mp-input-tag :default-value="['test']" placeholder="Please Enter" disabled />
        <mp-input-tag :default-value="['test']" placeholder="Please Enter" readonly />
        <mp-input-tag :default-value="['test']" placeholder="Please Enter" error />
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
