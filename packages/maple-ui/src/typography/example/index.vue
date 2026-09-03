<script setup>
import { onThemeChange } from '@maplejs/maple-cli/client'

onThemeChange()
</script>

<template>
  <div class="demo mp-px-16 mp-py-16">
    <div class="mp-text-1 mp-mb-8">mp-text-1 主文案</div>
    <div class="mp-text-2 mp-mb-8">mp-text-2 次级</div>
    <div class="mp-text-3 mp-mb-8">mp-text-3 辅助</div>
    <div class="mp-text-4">mp-text-4 弱化</div>
    <div class="mp-text-3 mp-mt-24">PC 排版工具类见 Cedar Typography；Mobile 用 token / 原子化 CSS。</div>
  </div>
</template>

<style lang="less">
@import '../../style/theme/css-variables.less';
@import '../../utilities/style/utilities.less';
</style>
