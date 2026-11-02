<script setup lang="ts">
import { proxyRefs as demoProxyRefs, ref } from 'vue'
import type { UploadFileItem, UploadRejectedFile, UploadRejectedReason } from '@maple-design/ui'

const scene1 = demoProxyRefs(
  (() => {
    const files = ref<UploadFileItem[]>([])

    const reasons = ref<UploadRejectedReason[]>([])

    const onRejected = (items: UploadRejectedFile[]) => {
      reasons.value = items.map((item) => item.reason)
    }
    return { files, reasons, onRejected }
  })(),
)

const scene2 = demoProxyRefs(
  (() => {
    const files = ref<UploadFileItem[]>([])

    const count = ref(0)

    const onExceed = (files: File[]) => {
      count.value = files.length
    }
    return { files, count, onExceed }
  })(),
)
</script>

<template>
  <div class="demo-comparison">
    <section class="demo-comparison-case demo-comparison-case--1" data-comparison-scene="max-file-size">
      <h4><span lang="zh-CN">单文件大小限制</span><span lang="en-US">File size limit</span></h4>
      <div>
        <mp-upload v-model="scene1.files" :max-file-size="1024" @rejected="scene1.onRejected"></mp-upload>
        <p>{{ scene1.reasons.join(', ') }}</p>
      </div>
    </section>

    <section class="demo-comparison-case demo-comparison-case--2" data-comparison-scene="max-files">
      <h4><span lang="zh-CN">文件数量限制</span><span lang="en-US">File count limit</span></h4>
      <div>
        <mp-upload v-model="scene2.files" :max-files="2" multiple @exceed="scene2.onExceed"></mp-upload>
        <p>Rejected by count：{{ scene2.count }}</p>
      </div>
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
