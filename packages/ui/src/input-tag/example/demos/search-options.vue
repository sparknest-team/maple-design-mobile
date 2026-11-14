<script setup lang="ts">
import { ref } from 'vue'

const tags = ref<string[]>([])
const singleTag = ref<string | null>(null)
const error = ref('')
const people = [
  { value: 'alice', label: 'Alice · 设计' },
  { value: 'alan', label: 'Alan · 产品' },
  { value: 'bob', label: 'Bob · 开发' },
]

// 模拟服务端搜索；真实请求可把 signal 传入 fetch。
async function searchPeople(query: string, { signal }: { signal: AbortSignal }) {
  await new Promise<void>((resolve, reject) => {
    const cancel = () => {
      clearTimeout(timer)
      reject(new DOMException('Aborted', 'AbortError'))
    }
    const timer = setTimeout(() => {
      signal.removeEventListener('abort', cancel)
      resolve()
    }, 350)
    if (signal.aborted) {
      cancel()
    } else {
      signal.addEventListener('abort', cancel, { once: true })
    }
  })
  error.value = ''
  return people.filter((person) => person.value.includes(query.toLowerCase()))
}
</script>

<template>
  <mp-space direction="column" style="width: 100%" :size="12">
    <p>输入或粘贴至少两个字符，输入 al 选择多个结果中的一项；输入 bob 自动提交唯一结果。</p>
    <p>Type or paste at least two characters. Choose an “al” result, or type “bob” to commit the only result.</p>
    <mp-input-tag
      v-model="tags"
      :options="searchPeople"
      :min-search-length="2"
      :search-delay="250"
      auto-commit-single
      unique-value
      placeholder="搜索账号 / Search accounts"
      aria-label="搜索账号 / Search accounts"
      @load-error="error = '搜索失败 / Search failed'"
    />
    <p v-if="error" role="alert">{{ error }}</p>
    <p>保存的账号 / Saved IDs: {{ JSON.stringify(tags) }}</p>
    <p>单值模式：选择新账号替换旧值；无匹配时按回车保存输入。</p>
    <mp-input-tag
      v-model="singleTag"
      :multiple="false"
      :options="searchPeople"
      :min-search-length="2"
      :search-delay="250"
      auto-commit-single
      placeholder="单个账号 / Single account"
      aria-label="单个账号 / Single account"
    />
    <p>单个账号 / Single ID: {{ JSON.stringify(singleTag) }}</p>
  </mp-space>
</template>
