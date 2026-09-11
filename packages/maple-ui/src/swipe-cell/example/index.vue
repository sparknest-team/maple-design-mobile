<template>
  <div class="swipe-cell-example">
    <mp-swipe-cell>
      <template #right>
        <mp-button status="danger" style="height: 100%; border-radius: 0">删除</mp-button>
      </template>
      <mp-cell title="左滑显示操作" border />
    </mp-swipe-cell>

    <mp-swipe-cell style="margin-top: 12px">
      <template #left>
        <mp-button status="primary" style="height: 100%; border-radius: 0">选择</mp-button>
      </template>
      <mp-cell title="两侧均可滑动" border />
      <template #right>
        <mp-button status="danger" style="height: 100%; border-radius: 0">删除</mp-button>
      </template>
    </mp-swipe-cell>
  </div>
</template>
