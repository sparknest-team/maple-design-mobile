<script setup>
import VaButton from '..'
import { t, useComponentLanguage } from './locale'

useComponentLanguage()
</script>

<template>
  <va-button color="#03A9F4">{{ t('start') }}</va-button>
</template>
