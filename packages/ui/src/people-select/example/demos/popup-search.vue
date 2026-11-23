<script setup lang="ts">
import type { PeopleSelectOptionsLoader } from '@maple-design/ui-vue'
import { ref } from 'vue'

const open = ref(false)
const personId = ref<string | null>(null)
const reason = ref('')
const people = Array.from({ length: 20 }, (_, index) => {
  const number = String(index + 1).padStart(2, '0')
  return { value: `demo-${number}`, label: `测试人员 ${number}（demo-${number}）` }
})

const loadPeople: PeopleSelectOptionsLoader = async (query, { signal }) => {
  const keyword = query.trim().toLowerCase()
  if (!keyword) return []

  await new Promise<void>((resolve) => setTimeout(resolve, 150))
  if (signal.aborted) return []

  return people.filter((person) => person.label.toLowerCase().includes(keyword))
}
</script>

<template>
  <mp-button @click="open = true">打开人员搜索弹层</mp-button>

  <mp-popup v-model:open="open" placement="bottom" lock-scroll>
    <section style="display: grid; gap: 16px; padding: 16px; text-align: start">
      <h3 style="margin: 0">改派处理人</h3>
      <p style="margin: 0">输入「测试」可查到 20 条模拟人员。</p>
      <mp-people-select
        v-model="personId"
        edit-mode="direct"
        :options="loadPeople"
        :search-delay="0"
        aria-label="新处理人"
        placeholder="搜索测试人员"
      />
      <mp-textarea v-model="reason" edit-mode="direct" :rows="3" aria-label="改派原因" placeholder="填写改派原因" />
      <output aria-live="polite">已选人员 ID {{ personId || '未选择' }}</output>
      <mp-button @click="open = false">关闭</mp-button>
    </section>
  </mp-popup>
</template>
