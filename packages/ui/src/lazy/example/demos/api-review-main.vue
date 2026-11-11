<script setup>
import { defineReviewConfig } from '@sparknest/ui-doc-preview-vue'
import DemoApiReviewPanel from '../../../../docs/components/ApiReviewPanel.vue'
import __apiReviewRawConfig from './api-review.config.json'
</script>
<template>
  <DemoApiReviewPanel v-slot="__apiReview" v-bind="defineReviewConfig(__apiReviewRawConfig)"
    ><p>
      修改地址或加载选项后点击重新挂载；滚动图片进入可视区 / Remount after editing, then scroll the image into view.
    </p>
    <div style="height: 240px; overflow: auto">
      <div style="height: 260px">向下滚动 / Scroll down</div>
      <img
        v-lazy="__apiReview.bindings.src ?? '/cat.jpg'"
        :lazy-loading="__apiReview.bindings['lazy-loading']"
        :lazy-error="__apiReview.bindings['lazy-error']"
        :lazy-attempt="__apiReview.bindings['lazy-attempt'] ?? 3"
        alt="Lazy review"
        style="width: 100%; height: 180px; object-fit: cover"
      /></div
  ></DemoApiReviewPanel>
</template>
