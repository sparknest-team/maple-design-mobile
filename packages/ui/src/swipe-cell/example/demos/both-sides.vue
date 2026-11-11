<template>
  <mp-swipe-cell>
    <template #left>
      <mp-button status="primary" style="height: 100%; border-radius: 0">选择</mp-button>
    </template>
    <mp-cell title="两侧均可滑动" border />
    <template #right>
      <mp-button status="danger" style="height: 100%; border-radius: 0">删除</mp-button>
    </template>
  </mp-swipe-cell>
</template>
