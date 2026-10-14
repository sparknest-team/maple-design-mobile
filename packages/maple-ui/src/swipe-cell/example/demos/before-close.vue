<script setup>
import { Dialog } from '@maplejs/maple-ui'

let confirming = false

async function beforeClose({ position }) {
  if (confirming) {
    return false
  }
  if (position !== 'right') {
    return true
  }

  confirming = true
  try {
    const action = await Dialog.confirm({ title: '确认删除？' })
    return action === 'confirm'
  } finally {
    confirming = false
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
