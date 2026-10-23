<template>
  <mp-space direction="column">
    <mp-breadcrumb :routes="routes" @click.prevent />
    <mp-breadcrumb :routes="routes">
      <template #item-render="{ route, routes, paths }">
        <span v-if="route === routes[routes.length - 1]">{{ route.label }}</span>
        <mp-link v-else :href="paths.join('/')" @click.prevent>
          {{ route.label }}
        </mp-link>
      </template>
    </mp-breadcrumb>
    <mp-breadcrumb :routes="routes">
      <template #item-render="{ route, routes }">
        <span v-if="route === routes[routes.length - 1]">{{ route.label }}</span>
        <RouterLink v-else :to="route.to">
          {{ route.label }}
        </RouterLink>
      </template>
    </mp-breadcrumb>
  </mp-space>
</template>

<script lang="ts">
import { RouterLink } from 'vue-router'

export default {
  components: { RouterLink },
  setup() {
    const routes = [
      {
        path: '/',
        to: { query: { breadcrumb: 'home' } },
        label: 'Home',
      },
      {
        path: '/channel',
        to: { query: { breadcrumb: 'channel' } },
        label: 'Channel',
      },
      {
        path: '/news',
        to: { query: { breadcrumb: 'news' } },
        label: 'News',
      },
    ]
    return { routes }
  },
}
</script>
