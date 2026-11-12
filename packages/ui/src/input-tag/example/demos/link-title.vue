<script setup lang="ts">
import MpInputTag from '../../index'
import '../../style'
import { reactive, ref } from 'vue'

const links = ref<string[]>([])
const titles = reactive<Record<string, string>>({})
const fallbackOption = (value: string | number) => ({ value, label: titles[String(value)] ?? String(value) })
const inputValue = ref('')
const loading = ref(false)
const error = ref('')
const submitted = ref<string[] | null>(null)

// 模拟接口：延迟返回标题，实际使用时替换为业务请求。
function fetchTitle(url: string): Promise<string> {
  const titles: Record<string, string> = {
    'vuejs.org': 'Vue.js',
    'github.com': 'GitHub',
  }
  return new Promise((resolve) => {
    setTimeout(() => resolve(titles[new URL(url).hostname] || new URL(url).hostname), 1200)
  })
}

async function handlePaste(event: ClipboardEvent) {
  const url = event.clipboardData?.getData('text/plain').trim()
  if (url) {
    await addLink(url)
  }
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key !== 'Enter' || event.isComposing || event.keyCode === 229) {
    return
  }
  event.preventDefault()
  void addLink(inputValue.value.trim())
}

async function addLink(url: string) {
  if (loading.value || !url) {
    return
  }
  error.value = ''
  try {
    const parsed = new URL(url)
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      throw new Error()
    }
  } catch {
    error.value = '请粘贴完整的 http 或 https 链接 / Paste a valid http or https URL.'
    return
  }
  if (links.value.includes(url)) {
    error.value = '链接已添加 / This URL has already been added.'
    return
  }
  loading.value = true
  try {
    const title = await fetchTitle(url)
    titles[url] = title
    links.value.push(url)
    inputValue.value = ''
  } catch {
    error.value = '获取标题失败，请重试 / Could not fetch the title. Try again.'
  } finally {
    loading.value = false
  }
}

function submit() {
  submitted.value = [...links.value]
}
</script>

<template>
  <mp-space direction="column" style="width: 100%" :size="12">
    <p>粘贴链接，或输入链接后按回车，例如 https://vuejs.org / Paste a URL or type one and press Enter.</p>
    <div @paste.capture.prevent="handlePaste" @keydown.capture="handleKeydown">
      <mp-input-tag
        v-model="links"
        v-model:input-value="inputValue"
        :fallback-option="fallbackOption"
        :retain-input-value="true"
        :loading="loading"
        :disabled="loading"
        placeholder="粘贴或输入链接 / Paste or type a URL"
        aria-label="粘贴或输入链接 / Paste or type a URL"
        clearable
      />
    </div>
    <p v-if="error" role="alert">{{ error }}</p>
    <mp-button :disabled="loading || !links.length" @click="submit">提交 / Submit</mp-button>
    <pre v-if="submitted !== null" aria-live="polite">{{ JSON.stringify({ links: submitted }, null, 2) }}</pre>
  </mp-space>
</template>
