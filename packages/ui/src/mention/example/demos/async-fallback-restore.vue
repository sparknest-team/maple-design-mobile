<script setup lang="ts">
import MpMention from '../../index'
import '../../style'
import { onBeforeUnmount, ref } from 'vue'

const content = ref('请联系 @[shuai.meng]、@[xiaoming]、@[lisi]')
const saved = ref(content.value)
const names = ref<Record<string, string>>({ 'shuai.meng': '孟帅', xiaoming: '小明', lisi: '李四' })
const generation = ref(0)
const readPretty = ref(false)
const loading = ref(false)
let timer: ReturnType<typeof setTimeout> | undefined

// fallback 只同步读取业务数据，未找到时返回 undefined。
const fallbackOption = (value: string | number | boolean) => {
  const label = names.value[String(value)]
  return label === undefined ? undefined : { value, label }
}

function saveAndReload() {
  // 用内存模拟数据库保存；实际业务应保存 content.value，再按 ID 请求姓名。
  saved.value = content.value
  if (timer) {
    clearTimeout(timer)
  }
  names.value = {}
  content.value = saved.value
  generation.value++ // 重新挂载组件，模拟打开已保存的数据。
  loading.value = true
  timer = setTimeout(() => {
    names.value = { 'shuai.meng': '孟帅', xiaoming: '小明', lisi: '李四' }
    loading.value = false
  }, 1500)
}

onBeforeUnmount(() => {
  if (timer) {
    clearTimeout(timer)
  }
})
</script>

<template>
  <mp-space direction="column" style="width: 100%" :size="12" data-demo="mention-async-fallback-restore">
    <p>
      模拟保存后重新初始化：请求期间先显示 ID，姓名返回后自动更新。 / Save and reload to resolve names asynchronously.
    </p>
    <mp-mention
      :key="generation"
      v-model="content"
      atomic
      type="textarea"
      :options="[]"
      :fallback-option="fallbackOption"
      :read-pretty="readPretty"
      aria-label="重新初始化的人员提及"
    />
    <mp-space wrap>
      <mp-button @click="saveAndReload">模拟保存并重新加载 / Save and reload</mp-button>
      <mp-button @click="readPretty = !readPretty">{{
        readPretty ? '切换到编辑态 / Edit' : '切换到阅读态 / Read'
      }}</mp-button>
    </mp-space>
    <div role="status">{{ loading ? '正在加载姓名… / Loading names…' : '姓名已加载 / Names loaded' }}</div>
    <div>
      模拟保存值 / Saved value：<code data-saved-value>{{ saved }}</code>
    </div>
  </mp-space>
</template>
