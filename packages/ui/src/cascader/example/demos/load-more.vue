<script setup lang="ts">
import { ref, shallowRef } from 'vue'
import type { CascaderOption } from '../../types'

const roots = () => [{ value: 'root', label: 'Remote group', isLeaf: false }]
const options = ref<CascaderOption[]>(roots())
const requests = shallowRef<((children?: CascaderOption[]) => void)[]>([])
const stale = shallowRef<((children?: CascaderOption[]) => void)[]>([])
const status = ref('展开 Remote group 后选择返回结果 / Expand Remote group, then settle below')
const loadMore = (_option: CascaderOption, done: (children?: CascaderOption[]) => void) => {
  requests.value = [...requests.value, done]
}
function settle(success: boolean) {
  const callbacks = requests.value
  requests.value = []
  callbacks.forEach((done) => done(success ? [{ value: 'leaf', label: 'Loaded child', isLeaf: true }] : undefined))
  status.value = success
    ? '子项已返回 / Children received'
    : 'done() 结束等待，可重新展开重试 / Retry by expanding again'
}
function replace() {
  stale.value = [...stale.value, ...requests.value]
  requests.value = []
  options.value = roots()
  status.value = '已替换数据，旧回调失效 / Data replaced; old callbacks are invalid'
}
function settleOld() {
  stale.value.forEach((done) => done([{ value: 'stale', label: 'Stale child', isLeaf: true }]))
  stale.value = []
  status.value = '旧请求已返回，不应出现 Stale child / Old responses must not add Stale child'
}
</script>
<template>
  <mp-space direction="column" size="lg">
    <mp-cascader
      :options="options"
      edit-mode="direct"
      :load-more="loadMore"
      placeholder="展开远程分组 / Expand remote group"
    />
    <mp-cascader-panel :options="options" :load-more="loadMore" />
    <mp-space wrap>
      <mp-button :disabled="!requests.length" @click="settle(true)">返回子项 / Resolve</mp-button>
      <mp-button :disabled="!requests.length" @click="settle(false)">结束并重试 / Retry</mp-button>
      <mp-button @click="replace">替换数据 / Replace data</mp-button>
      <mp-button :disabled="!stale.length" @click="settleOld">返回旧请求 / Resolve old</mp-button>
    </mp-space>
    <p role="status">{{ status }}</p>
    <p>
      load-more 使用 done(children) 成功、done() 结束等待；返回值不作为子项。loadMore uses a callback; its return value
      does not supply children.
    </p>
  </mp-space>
</template>
