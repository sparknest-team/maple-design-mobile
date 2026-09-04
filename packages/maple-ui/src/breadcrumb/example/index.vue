<script setup>
import { computed } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import { Message } from '@maplejs/maple-ui'
import { RouterLink } from 'vue-router'
import { t, use } from './locale'

watchLang(use)
onThemeChange()

const routes = computed(() => [
  { path: '/', to: { query: { breadcrumb: 'home-fill' } }, label: t('level1') },
  { path: '/channel', to: { query: { breadcrumb: 'channel' } }, label: t('channel') },
  { path: '/news', to: { query: { breadcrumb: 'news' } }, label: t('news') },
])

const routesWithChildren = computed(() => [
  routes.value[0],
  {
    ...routes.value[1],
    children: [
      { path: '/goods', label: t('goods') },
      { path: '/wallet', label: t('wallet') },
    ],
  },
  routes.value[2],
])

const droplist = computed(() => [
  { path: '/goods', label: t('goods') },
  { path: '/wallet', label: t('wallet') },
])

const maxRoutes = computed(() => [
  { path: '/', label: t('level1') },
  { path: '/sub-home', label: t('subHome') },
  { path: '/all-channel', label: t('allChannel') },
  { path: '/channel', label: t('channel') },
  { path: '/news', label: t('news') },
  { path: '/post', label: t('post') },
])
</script>

<template>
  <app-type>{{ t('basicUsage') }}</app-type>
  <mp-breadcrumb>
    <mp-breadcrumb-item>{{ t('level1') }}</mp-breadcrumb-item>
    <mp-breadcrumb-item>{{ t('level2') }}</mp-breadcrumb-item>
    <mp-breadcrumb-item>{{ t('level3') }}</mp-breadcrumb-item>
  </mp-breadcrumb>

  <app-type>{{ t('customIcon') }}</app-type>
  <mp-breadcrumb>
    <mp-breadcrumb-item><m-icon-home-fill /></mp-breadcrumb-item>
    <mp-breadcrumb-item><m-icon-link /> {{ t('channel') }}</mp-breadcrumb-item>
    <mp-breadcrumb-item>{{ t('news') }}</mp-breadcrumb-item>
  </mp-breadcrumb>

  <app-type>{{ t('separator') }}</app-type>
  <mp-breadcrumb separator="\">
    <mp-breadcrumb-item>{{ t('level1') }}</mp-breadcrumb-item>
    <mp-breadcrumb-item>{{ t('level2') }}</mp-breadcrumb-item>
    <mp-breadcrumb-item>{{ t('level3') }}</mp-breadcrumb-item>
  </mp-breadcrumb>

  <app-type>{{ t('childSeparator') }}</app-type>
  <mp-breadcrumb>
    <mp-breadcrumb-item>{{ t('level1') }}</mp-breadcrumb-item>
    <mp-breadcrumb-item separator="~">{{ t('level2') }}</mp-breadcrumb-item>
    <mp-breadcrumb-item>{{ t('level3') }}</mp-breadcrumb-item>
  </mp-breadcrumb>

  <app-type>{{ t('separatorSlot') }}</app-type>
  <mp-breadcrumb>
    <template #separator>
      <m-icon-menu-right style="margin: 1px 4px 0" />
    </template>
    <mp-breadcrumb-item>{{ t('level1') }}</mp-breadcrumb-item>
    <mp-breadcrumb-item>{{ t('level2') }}</mp-breadcrumb-item>
    <mp-breadcrumb-item>{{ t('level3') }}</mp-breadcrumb-item>
  </mp-breadcrumb>

  <app-type>{{ t('routesMode') }}</app-type>
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

  <app-type>{{ t('dropdown') }}</app-type>
  <mp-space direction="column" :size="['2.666vmin', '2.666vmin']">
    <mp-breadcrumb :routes="routesWithChildren" @click.prevent />
    <mp-breadcrumb>
      <mp-breadcrumb-item>{{ t('level1') }}</mp-breadcrumb-item>
      <mp-breadcrumb-item :droplist="droplist">{{ t('channel') }}</mp-breadcrumb-item>
      <mp-breadcrumb-item>{{ t('news') }}</mp-breadcrumb-item>
    </mp-breadcrumb>
    <mp-breadcrumb>
      <mp-breadcrumb-item>{{ t('level1') }}</mp-breadcrumb-item>
      <mp-breadcrumb-item>
        <template #droplist>
          <mp-menu-option value="goods">{{ t('goods') }}</mp-menu-option>
          <mp-menu-option value="wallet">{{ t('wallet') }}</mp-menu-option>
        </template>
        {{ t('channel') }}
      </mp-breadcrumb-item>
      <mp-breadcrumb-item>{{ t('news') }}</mp-breadcrumb-item>
    </mp-breadcrumb>
  </mp-space>

  <app-type>{{ t('maxCount') }}</app-type>
  <mp-breadcrumb :max-count="3">
    <mp-breadcrumb-item>{{ t('level1') }}</mp-breadcrumb-item>
    <mp-breadcrumb-item>{{ t('subHome') }}</mp-breadcrumb-item>
    <mp-breadcrumb-item>{{ t('allChannel') }}</mp-breadcrumb-item>
    <mp-breadcrumb-item>{{ t('channel') }}</mp-breadcrumb-item>
    <mp-breadcrumb-item>{{ t('news') }}</mp-breadcrumb-item>
    <mp-breadcrumb-item>{{ t('post') }}</mp-breadcrumb-item>
  </mp-breadcrumb>
  <mp-breadcrumb :routes="maxRoutes" :max-count="3" @click.prevent>
    <template #more-icon="{ omittedItems }">
      <mp-tooltip :content="omittedItems.map((item) => item.label).join(' / ')">
        <m-icon-more />
      </mp-tooltip>
    </template>
  </mp-breadcrumb>

  <app-type>{{ t('clickEvent') }}</app-type>
  <mp-breadcrumb>
    <mp-breadcrumb-item href="#/home" @click.prevent="Message(t('level1'))">
      {{ t('level1') }}
    </mp-breadcrumb-item>
    <mp-breadcrumb-item href="#/list" @click.prevent="Message(t('level2'))">
      {{ t('level2') }}
    </mp-breadcrumb-item>
    <mp-breadcrumb-item>{{ t('level3') }}</mp-breadcrumb-item>
  </mp-breadcrumb>
</template>
