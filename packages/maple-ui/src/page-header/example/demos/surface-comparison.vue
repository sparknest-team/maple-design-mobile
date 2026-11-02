<script setup lang="ts">
import { proxyRefs as demoProxyRefs } from 'vue'
import { Message } from '@maple-design/ui'

const scene2 = demoProxyRefs(
  (() => {
    const handleAction = () => Message.success('已关注项目')
    return { handleAction }
  })(),
)
</script>

<template>
  <div class="demo-comparison">
    <section class="demo-comparison-case demo-comparison-case--1" data-comparison-scene="breadcrumb">
      <h4><span lang="zh-CN">页头上方内容</span><span lang="en-US">Content above the heading</span></h4>
      <mp-card variant="outline" size="sm">
        <mp-page-header>
          <template #header>
            <mp-breadcrumb>
              <mp-breadcrumb-item>工作台</mp-breadcrumb-item>
              <mp-breadcrumb-item>项目</mp-breadcrumb-item>
              <mp-breadcrumb-item>设计系统</mp-breadcrumb-item>
            </mp-breadcrumb>
          </template>
          <template #title>
            <mp-space direction="column" :size="0">
              <span>设计系统</span>
              <small>项目概览</small>
            </mp-space>
          </template>
        </mp-page-header>
      </mp-card>
    </section>

    <section class="demo-comparison-case demo-comparison-case--2" data-comparison-scene="transparent">
      <h4><span lang="zh-CN">透明底色</span><span lang="en-US">Transparent background</span></h4>
      <mp-card variant="tonal" size="sm">
        <mp-page-header>
          <template #title>
            <mp-space direction="column" :size="0">
              <span>设计系统</span>
              <small>项目概览</small>
            </mp-space>
          </template>
          <template #extra><mp-button @click="scene2.handleAction">关注</mp-button></template>
          <span>页头默认透明，可以融入页面背景。</span>
        </mp-page-header>
      </mp-card>
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
