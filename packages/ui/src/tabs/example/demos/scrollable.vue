<script setup lang="ts">
const categories = [
  { key: 'all', title: '全部' },
  { key: 'music', title: '音乐' },
  { key: 'video', title: '视频' },
  { key: 'books', title: '图书', disabled: true },
  { key: 'games', title: '游戏' },
  { key: 'sports', title: '运动' },
]
</script>

<template>
  <mp-tabs default-value="all" swipeable scroll-position="center">
    <mp-tabs-navs aria-label="内容分类">
      <mp-tab-nav
        v-for="category in categories"
        :key="category.key"
        :name="category.key"
        :title="category.title"
        :disabled="category.disabled"
      />
    </mp-tabs-navs>
    <mp-tabs-items>
      <mp-tab-item v-for="category in categories" :key="category.key" :name="category.key"
        >{{ category.title }}内容</mp-tab-item
      >
    </mp-tabs-items>
  </mp-tabs>
</template>
