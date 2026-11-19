<script setup>
import { AppType } from '@maple-design/cli-vue/client'
import VaButton from '..'
import { t, useComponentLanguage } from './locale'

useComponentLanguage()
</script>

<template>
  <app-type>{{ t('basicUse') }}</app-type>
  <va-button>{{ t('start') }}</va-button>

  <app-type>{{ t('modifyColor') }}</app-type>
  <va-button color="#03A9F4">{{ t('start') }}</va-button>
</template>
