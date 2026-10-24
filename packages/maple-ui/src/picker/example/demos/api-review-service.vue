<script setup>
import { onUnmounted, shallowRef } from 'vue'
import { Picker as ReviewService } from '@maple-design/ui'
import { defineReviewConfig } from '@sparknest/ui-doc-preview'
import DemoApiReviewPanel from '../../../../docs/components/ApiReviewPanel.vue'
import raw from './api-review-service.config.json'

const handle = shallowRef()
const sample = {
  src: '/cat.jpg',
  images: ['/cat.jpg', '/cat2.jpg'],
  title: '审查 / Review',
  content: '组合配置和回调后再次触发 / Trigger after combining controls',
  message: 'Review',
  duration: 0,
  actions: [{ name: 'Review A' }, { name: 'Review B', disabled: true }],
  columns: [
    [
      { text: 'Review A', value: 'a' },
      { text: 'Review B', value: 'b' },
    ],
  ],
}
const options = (bindings) => ({
  ...sample,
  ...Object.fromEntries(
    Object.entries(bindings)
      .filter(([key]) => !key.startsWith('onVnode'))
      .map(([key, value]) => [key.replace(/-([a-z])/g, (_, c) => c.toUpperCase()), value]),
  ),
})
const publicNames = [
  'open',
  'confirm',
  'alert',
  'info',
  'success',
  'warning',
  'error',
  'loading',
  'normal',
  'close',
  'clear',
  'start',
  'finish',
  'setDefaultOptions',
  'resetDefaultOptions',
  'config',
  'destroy',
]
const service = Object.fromEntries(
  publicNames
    .filter((name) => typeof ReviewService[name] === 'function')
    .map((name) => [name, (...args) => ReviewService[name](...args)]),
)
const methodDefaults = Object.fromEntries(
  publicNames.map((name) => [
    name,
    /^(open|confirm|alert|info|success|warning|error|loading|normal|config|setDefaultOptions)$/.test(name)
      ? [sample]
      : [],
  ]),
)
function run(bindings, record) {
  const config = options(bindings)
  record('service:call', [config])
  const fn =
    typeof ReviewService === 'function'
      ? ReviewService
      : (ReviewService.open ?? ReviewService.info ?? ReviewService.start)
  if (!fn) {
    record('service:error', ['No callable service'])
    return
  }
  handle.value = fn(config)
  record('service:return', [handle.value])
  handle.value?.then?.(
    (value) => record('service:resolved', [value]),
    (error) => record('service:rejected', [String(error)]),
  )
}
function act(name, record) {
  const result = handle.value?.[name]?.(
    name === 'update' ? { title: 'Updated review', content: 'Updated review', message: 'Updated review' } : undefined,
  )
  record('handle:' + name, [result])
}
onUnmounted(() => {
  ReviewService.close?.()
  ReviewService.clear?.()
  ReviewService.finish?.()
  ReviewService.resetDefaultOptions?.()
})
</script>
<template>
  <DemoApiReviewPanel
    v-slot="scope"
    v-bind="defineReviewConfig(raw)"
    :service="service"
    :handle="handle"
    :method-defaults="methodDefaults"
    ><p>
      修改配置后点击触发；可在下方选择方法、编辑参数并查看调用结果 / Trigger after changing controls; inspect methods
      and results below.
    </p>
    <mp-space wrap
      ><mp-button @click="run(scope.bindings, scope.record)">触发 / Trigger</mp-button
      ><mp-button :disabled="typeof handle?.update !== 'function'" @click="act('update', scope.record)"
        >更新返回句柄 / Update handle</mp-button
      ><mp-button :disabled="typeof handle?.close !== 'function'" @click="act('close', scope.record)"
        >关闭返回句柄 / Close handle</mp-button
      ></mp-space
    ></DemoApiReviewPanel
  >
</template>
