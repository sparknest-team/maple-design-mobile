<script setup>
import { defineReviewConfig } from '@sparknest/ui-doc-preview-vue'
import DemoApiReviewPanel from '../../../../docs/components/ApiReviewPanel.vue'
import config from './api-review.config.json'
import Fixture from './basic.vue'
</script>

<template>
  <DemoApiReviewPanel v-slot="review" v-bind="defineReviewConfig(config)">
    <Fixture v-bind="review.bindings" v-on="review.listeners" />
  </DemoApiReviewPanel>
</template>
