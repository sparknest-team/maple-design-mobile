<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const routes = computed(() => [
  { path: '/', to: { query: { breadcrumb: 'home-fill' } }, label: '首页' },
  { path: '/channel', to: { query: { breadcrumb: 'channel' } }, label: '频道' },
  { path: '/news', to: { query: { breadcrumb: 'news' } }, label: '资讯' },
])
</script>

<template>
  <mp-space direction="column" :size="['2.666vmin', '2.666vmin']">
    <mp-breadcrumb :routes="routes" @click.prevent />
    <mp-breadcrumb :routes="routes">
      <template #item-render="{ route, paths }">
        <a :href="'#/' + paths.join('/')" @click.prevent>{{ route.label }}</a>
      </template>
    </mp-breadcrumb>
    <mp-breadcrumb :routes="routes">
      <template #item-render="{ route }">
        <RouterLink :to="route.to">
          {{ route.label }}
        </RouterLink>
      </template>
    </mp-breadcrumb>
  </mp-space>
</template>
