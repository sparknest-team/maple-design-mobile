<template>
  <mp-space direction="column">
    <mp-breadcrumb :max-count="3">
      <mp-breadcrumb-item>Home</mp-breadcrumb-item>
      <mp-breadcrumb-item>Sub Home</mp-breadcrumb-item>
      <mp-breadcrumb-item>All Channel</mp-breadcrumb-item>
      <mp-breadcrumb-item>Channel</mp-breadcrumb-item>
      <mp-breadcrumb-item>News</mp-breadcrumb-item>
      <mp-breadcrumb-item>Post</mp-breadcrumb-item>
    </mp-breadcrumb>
    <mp-breadcrumb :routes="maxRoutes" :max-count="3" @click.prevent>
      <template #more-icon="{ omittedItems }">
        <mp-tooltip :trigger="['hover', 'focus', 'click']" :content="omittedLabel(omittedItems)">
          <mp-button html-type="button" variant="text" class="more-trigger" aria-label="查看隐藏路径">
            <m-icon-more aria-hidden="true" />
          </mp-button>
        </mp-tooltip>
      </template>
    </mp-breadcrumb>
  </mp-space>
</template>

<script lang="ts">
import type { BreadcrumbRoute } from '../../types'

const omittedLabel = (items: BreadcrumbRoute[]) => items.map((item) => item.label).join(' / ')

export default {
  setup() {
    const maxRoutes = [
      { path: '/', label: 'Home' },
      { path: '/sub-home', label: 'Sub Home' },
      { path: '/all-channel', label: 'All Channel' },
      { path: '/channel', label: 'Channel' },
      { path: '/news', label: 'News' },
      { path: '/post', label: 'Post' },
    ]
    return { maxRoutes, omittedLabel }
  },
}
</script>

<style scoped>
.more-trigger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 44px;
  min-height: 44px;
  padding: 0;
  border: 0;
  color: inherit;
  background: transparent;
  cursor: pointer;
}
</style>
