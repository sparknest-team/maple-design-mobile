<script setup lang="ts">
import { getCurrentInstance, h, onBeforeUnmount, ref, shallowRef } from 'vue'
import { Dialog } from '@maple-design/ui'
import ServiceContainerContent from './service-container-content.vue'

const first = ref<HTMLElement>()
const second = ref<HTMLElement>()
const active = shallowRef<ReturnType<typeof Dialog.open>>()
const context = getCurrentInstance()?.appContext
const result = ref('尚未打开 / Not opened')
function openSample() {
  if (!first.value) {
    return
  }
  active.value?.close()
  const owned: ReturnType<typeof Dialog.open> = Dialog.open(
    {
      title: '服务挂载区域 / Service target',
      popupContainer: first.value,
      content: () =>
        h(ServiceContainerContent, {
          onMove(to: 'A' | 'B') {
            const target = to === 'A' ? first.value : second.value
            if (target) {
              owned.update({ popupContainer: target })
            }
          },
        }),
    },
    context,
  )
  active.value = owned
  result.value = '已打开 / Opened'
  void owned.then((action) => {
    if (active.value === owned) {
      active.value = undefined
      result.value = String(action)
    }
  })
}
onBeforeUnmount(() => {
  active.value?.close()
  active.value = undefined
})
</script>
<template>
  <mp-space direction="column" :size="16">
    <mp-button @click="openSample">打开区域 A / Open in A</mp-button>
    <div ref="first" data-service-target="A" style="min-height: 64px; border: 1px dashed currentColor; padding: 12px">
      挂载区域 A / Target A
    </div>
    <div ref="second" data-service-target="B" style="min-height: 64px; border: 1px dashed currentColor; padding: 12px">
      挂载区域 B / Target B
    </div>
    <p role="status">{{ result }}</p>
  </mp-space>
</template>
