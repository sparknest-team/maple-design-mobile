<script setup>
import { Message } from '@maplejs/maple-ui'

const handleBack = () => Message.info('点击返回')
</script>

<template>
  <mp-page-header show-back title="标题" subtitle="详情" @back="handleBack" />
</template>
