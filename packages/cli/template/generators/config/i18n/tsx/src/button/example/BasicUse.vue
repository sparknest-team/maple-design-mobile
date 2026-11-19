<script setup>
import VaButton from '..'
import { t, useComponentLanguage } from './locale'

useComponentLanguage()
</script>

<template>
  <va-button>{{ t('start') }}</va-button>
</template>
