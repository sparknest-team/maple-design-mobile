<script setup lang="ts">
import { proxyRefs as demoProxyRefs } from 'vue'

const scene1 = demoProxyRefs(
  (() => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
    return { sizes }
  })(),
)
</script>

<template>
  <div class="demo-comparison">
    <section class="demo-comparison-case demo-comparison-case--1" data-comparison-scene="size">
      <h4><span lang="zh-CN">五种尺寸</span><span lang="en-US">Sizes</span></h4>
      <mp-space direction="column" size="md">
        <mp-space v-for="size in scene1.sizes" :key="size" wrap size="md" align="center">
          <mp-link :size="size" status="primary">{{ size }} 链接</mp-link>
          <mp-link :size="size" status="primary" icon>{{ size }} 图标</mp-link>
          <mp-link :size="size" loading>{{ size }} 加载中</mp-link>
        </mp-space>
      </mp-space>
    </section>

    <section class="demo-comparison-case demo-comparison-case--2" data-comparison-scene="semantic-status">
      <h4><span lang="zh-CN">语义状态</span><span lang="en-US">Semantic Status</span></h4>
      <mp-space wrap size="sm">
        <mp-link>默认链接</mp-link>
        <mp-link status="primary">主要链接</mp-link>
        <mp-link status="secondary">次要链接</mp-link>
        <mp-link status="tertiary">三级链接</mp-link>
        <mp-link status="info">信息链接</mp-link>
        <mp-link status="success">成功链接</mp-link>
        <mp-link status="warning">警告链接</mp-link>
        <mp-link status="danger">危险链接</mp-link>
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
