<script setup>
import { Dialog } from '@maplejs/maple-ui'

async function beforeClose({ position }) {
  if (position !== 'right') {
    return true
  }

  try {
    await Dialog({ title: '确认删除？' })
    return true
  } catch {
    return false
  }
}
</script>

<template>
  <mp-swipe-cell :before-close="beforeClose">
    <mp-cell title="删除前确认" border />
    <template #right>
      <mp-button status="danger" style="height: 100%; border-radius: 0">删除</mp-button>
    </template>
  </mp-swipe-cell>
</template>
