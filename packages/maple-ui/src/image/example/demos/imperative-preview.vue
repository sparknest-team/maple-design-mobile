<script setup lang="ts">
import { imagePreview } from '@maple-design/ui'

const images = ['/cat.jpg', '/cat2.jpg']
let handle: { next: () => void; close: () => void } | undefined

function previewSingle() {
  imagePreview(images[0])
}

function previewMultiple() {
  handle = imagePreview({ images, modelValue: 1 })
}

function next() {
  handle?.next()
}

function close() {
  handle?.close()
}
</script>

<template>
  <mp-space :size="12" wrap>
    <mp-button status="primary" size="sm" @click="previewSingle">预览单图</mp-button>
    <mp-button status="primary" size="sm" @click="previewMultiple">预览多图</mp-button>
    <mp-button size="sm" @click="next">下一张</mp-button>
    <mp-button size="sm" @click="close">关闭</mp-button>
  </mp-space>
</template>
