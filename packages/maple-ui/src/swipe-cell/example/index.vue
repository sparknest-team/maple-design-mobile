<template>
  <div class="swipe-cell-example">
    <mp-swipe-cell>
      <template #right>
        <mp-button type="danger" style="height: 100%; border-radius: 0">删除</mp-button>
      </template>
      <mp-cell title="左滑显示操作" border />
    </mp-swipe-cell>

    <mp-swipe-cell style="margin-top: 12px">
      <template #left>
        <mp-button type="primary" style="height: 100%; border-radius: 0">选择</mp-button>
      </template>
      <mp-cell title="两侧均可滑动" border />
      <template #right>
        <mp-button type="danger" style="height: 100%; border-radius: 0">删除</mp-button>
      </template>
    </mp-swipe-cell>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import SwipeCell from '..'
import Button from '../../button'
import Cell from '../../cell'

export default defineComponent({
  name: 'SwipeCellExample',
  components: {
    [Button.name]: Button,
    [Cell.name]: Cell,
    [SwipeCell.name]: SwipeCell,
  },
})
</script>
