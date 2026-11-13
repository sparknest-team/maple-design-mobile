<script setup lang="ts">
import { ref } from 'vue'
import type { OptionsLoader } from '../../../_hooks/use-option-request'

const localValue = ref('')
const remoteValue = ref('')
const people = [
  { value: 'xiaoming', label: '小明' },
  { value: 'xiaohong', label: '小红' },
  { value: 'lisi', label: '李四' },
]

// 实际业务可以在这里调用接口，并将 signal 传给 fetch。
const searchPeople: OptionsLoader<(typeof people)[number]> = (query, { signal }) =>
  new Promise((resolve) => {
    const finish = () => {
      signal.removeEventListener('abort', cancel)
      const keyword = query.toLowerCase()
      resolve(people.filter((person) => person.value.includes(keyword) || person.label.includes(query)))
    }
    // 模拟不同网络耗时，方便快速改词时观察 loading 和最新结果。
    const timer = setTimeout(finish, query.toLowerCase().startsWith('x') ? 1400 : 450)
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
  <mp-space direction="column" style="width: 100%" :size="12" data-demo="mention-search-options">
    <p>本地候选按账号或姓名筛选；异步搜索时可快速从 @x 改为 @lisi，观察下拉加载和最新结果。</p>
    <p>
      Local options match ID or name. For remote search, quickly change @x to @lisi to see loading and the latest
      results.
    </p>
    <mp-mention v-model="localValue" atomic :options="people" aria-label="本地人员搜索 / Local people search" />
    <mp-mention v-model="remoteValue" atomic :options="searchPeople" aria-label="异步人员搜索 / Remote people search" />
    <div>
      本地保存值 / Local value：<code data-local-value>{{ localValue }}</code>
    </div>
    <div>
      异步保存值 / Remote value：<code data-remote-value>{{ remoteValue }}</code>
    </div>
  </mp-space>
</template>
