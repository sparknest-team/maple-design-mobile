<script setup>
import { defineReviewConfig } from '@sparknest/ui-doc-preview'
import DemoApiReviewPanel from '../../../../docs/components/ApiReviewPanel.vue'
import __apiReviewRawConfig from './api-review.config.json'
</script>
<template>
  <DemoApiReviewPanel v-slot="__apiReview" v-bind="defineReviewConfig(__apiReviewRawConfig)"
    ><mp-paper
      v-hover:[__apiReview.bindings.device]="
        __apiReview.bindings.enabled === false
          ? {}
          : { color: __apiReview.bindings.color ?? '#ffffff', background: __apiReview.bindings.background ?? '#5268cc' }
      "
      style="padding: 32px; text-align: center"
      >鼠标移入、移出以验证 / Move pointer in and out</mp-paper
    ></DemoApiReviewPanel
  >
</template>
