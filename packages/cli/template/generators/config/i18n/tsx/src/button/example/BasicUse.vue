<script setup>
import { watchLang } from '@maple-design/cli-vue/client'
import VaButton from '..'
import { t, use } from './locale'

watchLang(use, 'pc')
</script>

<template>
  <va-button>{{ t('start') }}</va-button>
</template>
