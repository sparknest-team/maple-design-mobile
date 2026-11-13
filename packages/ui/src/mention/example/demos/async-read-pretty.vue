<script setup lang="ts">
import { ref } from 'vue'

const content = ref('请联系 @[shuai.meng]')
const readPretty = ref(false)
const people = [
  { value: 'xiaoming', label: '小明' },
  { value: 'lisi', label: '李四' },
]

// 初始化 ID 的名称由业务提供；搜索并选中的名称由组件在当前实例中缓存。
const fallbackOption = (value: string | number | boolean) =>
  value === 'shuai.meng' ? { value, label: '孟帅' } : undefined

const searchPeople = (query: string, { signal }: { signal: AbortSignal }) =>
  new Promise<typeof people>((resolve) => {
    const finish = () => {
      signal.removeEventListener('abort', cancel)
      const keyword = query.toLowerCase()
      resolve(people.filter((person) => person.value.includes(keyword) || person.label.includes(query)))
    }
    const timer = setTimeout(finish, 500)
    const cancel = () => {
      clearTimeout(timer)
      resolve([])
    }
    if (signal.aborted) {
      cancel()
    } else {
      signal.addEventListener('abort', cancel, { once: true })
    }
  })
</script>

<template>
  <mp-space direction="column" style="width: 100%" :size="12" data-demo="async-read-pretty">
    <p>
      输入 @xiaoming 并选择小明，再输入 @lisi 搜索其他人员，然后切换阅读态查看反显。 / Select @xiaoming, search @lisi,
      then switch to reading mode.
    </p>
    <mp-mention
      v-model="content"
      atomic
      type="textarea"
      :options="searchPeople"
      :fallback-option="fallbackOption"
      :read-pretty="readPretty"
      aria-label="异步人员提及"
    />
    <mp-button @click="readPretty = !readPretty">{{
      readPretty ? '切换到编辑态 / Edit' : '切换到阅读态 / Read'
    }}</mp-button>
    <div>
      保存值 / Model：<code data-mention-model>{{ content }}</code>
    </div>
  </mp-space>
</template>
