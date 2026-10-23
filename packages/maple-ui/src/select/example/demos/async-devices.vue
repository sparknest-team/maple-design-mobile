<script setup lang="ts">
import { ref } from 'vue'

const presentation = ref<'inline' | 'popup'>('inline')
const value = ref([2])
const options = ref<{ id: number; name: string; disabled?: boolean }[]>([])
const loading = ref(false)
const notice = ref('')
async function load() {
  loading.value = true
  try {
    options.value = await Promise.resolve(
      Array.from({ length: 200 }, (_, index) => ({
        id: index + 1,
        name: `设备 ${index + 1}`,
        disabled: index === 3,
      })),
    )
  } finally {
    loading.value = false
  }
}
</script>
<template>
  <mp-space direction="column" :size="16">
    <mp-radio-group v-model="presentation" aria-label="展示方式">
      <mp-radio value="inline">inline</mp-radio>
      <mp-radio value="popup">popup</mp-radio>
    </mp-radio-group>
    <mp-button @click="load">加载设备列表</mp-button>
    <mp-select
      v-model="value"
      :presentation="presentation"
      :options="options"
      :loading="loading"
      :field-names="{ label: 'name', value: 'id' }"
      :virtual-list-props="{ height: 180 }"
      :limit="3"
      multiple
      filterable
      clearable
      placeholder="最多选择三个设备"
      @exceed-limit="notice = '最多选择三个设备，请先移除一个再选择。'"
      @change="notice = ''"
    />
    <p role="note">
      {{
        presentation === 'popup'
          ? '列表模式：勾选设备后点击“确认”提交；“取消”会丢弃草稿。'
          : '菜单模式：点选立即提交。设备 4 为停用状态，不可选择。'
      }}
    </p>
    <p role="status" aria-live="polite">{{ notice || `已选择：${value.length} / 3` }}</p>
    <p>已提交 ID：{{ value }}。加载前显示 ID，加载后自动回显名称。</p>
  </mp-space>
</template>
