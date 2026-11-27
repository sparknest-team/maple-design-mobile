<script setup lang="ts">
import { usePageLang } from 'vuepress/client'
import Layout from './MapleLayout.vue'
import { useRouter } from 'vue-router'
import MapleLanding from '@maple-design/cli-vue/docs/landing'
const lang = usePageLang()
const router = useRouter()
</script>

<template>
  <Layout>
    <template #default>
      <main class="maple-landing">
        <MapleLanding :language="lang" @start="router.push('/' + lang + '/quickstart/')" />
      </main>
    </template>
  </Layout>
</template>

<style scoped>
.maple-landing { padding-top: var(--navbar-height, 3.75rem); }
</style>
