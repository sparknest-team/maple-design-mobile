<script setup lang="ts">
import { ref } from 'vue'
import type { MenuRenderContext } from '@maple-design/ui-vue'

const selectedValue = ref('account')
const status = ({ active }: MenuRenderContext) => (active ? '当前项已选中' : '当前项未选中')
const options = [
  {
    label: '设置',
    value: 'settings',
    extra: status,
    children: [
      { label: '账户', value: 'account', extra: status },
      { label: '通知', value: 'notifications', extra: status },
    ],
  },
  { label: '帮助', value: 'help', extra: status },
]
const helpLabel = ({ active }: MenuRenderContext) => (active ? '帮助（已选中）' : '帮助（未选中，仅视觉强调）')
</script>

<template>
  <p>当前值：{{ selectedValue }}。默认选中“账户”；父分支“设置”处于选中路径，但 active=false。</p>
  <mp-space wrap>
    <mp-menu v-model="selectedValue" :options="options" :hide-on-select="false" submenu-trigger="click">
      <mp-button>渲染函数中的 active</mp-button>
    </mp-menu>
    <mp-menu v-model="selectedValue" :options="options" :hide-on-select="false" submenu-trigger="click">
      <mp-button>作用域插槽中的 active</mp-button>
      <template #option-extra="{ active }">
        <mp-tag :status="active ? 'primary' : 'default'">{{ active ? '当前项已选中' : '当前项未选中' }}</mp-tag>
      </template>
    </mp-menu>
    <mp-menu v-model="selectedValue" :hide-on-select="false">
      <mp-button>自定义子项与 highlight</mp-button>
      <template #content>
        <mp-menu-option value="account">
          <template #default="{ active }">账户：{{ active ? '已选中' : '未选中' }}</template>
        </mp-menu-option>
        <mp-menu-option value="help" :label="helpLabel" highlight />
      </template>
    </mp-menu>
  </mp-space>
</template>
