<script setup>
import ChildSeparatorDemo from './child-separator.vue'
import SeparatorSlotDemo from './separator-slot.vue'
</script>

<template>
  <mp-space direction="column">
    <SeparatorSlotDemo />
    <mp-breadcrumb separator="~">
      <mp-breadcrumb-item>Home</mp-breadcrumb-item>
      <mp-breadcrumb-item>Channel</mp-breadcrumb-item>
      <mp-breadcrumb-item>News</mp-breadcrumb-item>
    </mp-breadcrumb>
    <ChildSeparatorDemo />
  </mp-space>
</template>
