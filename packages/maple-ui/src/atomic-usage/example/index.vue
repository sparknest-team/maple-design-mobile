<script setup>
import { onThemeChange } from '@maplejs/maple-cli/client'

onThemeChange()
</script>

<template>
  <div class="demo mp-px-16 mp-py-16">
    <div class="mp-text-3 mp-mb-8">Flex · 间距 · 省略</div>
    <div class="mp-flex mp-items-center mp-justify-between mp-gap-8 mp-rounded-md mp-bg-primary mp-px-12 mp-py-8">
      <span class="mp-text-white">start</span>
      <span class="mp-text-white mp-truncate" style="max-width: 96px">很长很长很长的标题</span>
    </div>

    <div class="mp-text-3 mp-mt-24 mp-mb-8">尺寸 · 1 = 1px</div>
    <div class="mp-flex mp-items-end mp-gap-8">
      <div class="box mp-h-24 mp-w-24">24</div>
      <div class="box mp-h-40 mp-w-40">40</div>
      <div class="box mp-h-56 mp-w-56">56</div>
    </div>

    <div class="mp-text-3 mp-mt-24 mp-mb-8">line-clamp-2</div>
    <div class="mp-line-clamp-2 mp-rounded-md mp-bg-info mp-p-12">
      两行省略示例。后面这些文字会被截断，用来确认多行省略类是否生效。后面这些文字会被截断。
    </div>
  </div>
</template>

<style lang="less">
@import '../../style/theme/css-variables.less';
@import '../../utilities/style/utilities.less';

.box {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  background: var(--mp-color-primary);
  border-radius: 4px;
  font-size: 12px;
}
</style>
