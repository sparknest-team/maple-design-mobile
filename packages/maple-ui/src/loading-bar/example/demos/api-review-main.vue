<script setup>
import { onUnmounted } from 'vue'
import { LoadingBar } from '@maple-design/ui'
import { defineReviewConfig } from '@sparknest/ui-doc-preview'
import DemoApiReviewPanel from '../../../../docs/components/ApiReviewPanel.vue'
import __apiReviewRawConfig from './api-review.config.json'

function run(action, bindings) {
  const options = Object.fromEntries(
    Object.entries(bindings)
      .filter(([key]) => !key.startsWith('onVnode'))
      .map(([key, value]) => [key.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase()), value]),
  )(LoadingBar.setDefaultOptions(options), LoadingBar[action]())
}
onUnmounted(() => {
  LoadingBar.finish()
  LoadingBar.resetDefaultOptions()
})
</script>
<template>
  <DemoApiReviewPanel v-slot="__apiReview" v-bind="defineReviewConfig(__apiReviewRawConfig)">
    <p>修改选项后重新触发 / Trigger again to apply options.</p>
    <div style="display: flex; flex-wrap: wrap; gap: 12px">
      <mp-button @click="run('start', __apiReview.bindings)">start</mp-button>
      <mp-button @click="run('finish', __apiReview.bindings)">finish</mp-button>
      <mp-button @click="run('error', __apiReview.bindings)">error</mp-button>
    </div>
  </DemoApiReviewPanel>
</template>
