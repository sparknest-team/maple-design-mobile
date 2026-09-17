<script setup>
import { Message } from '@maplejs/maple-ui'
</script>

<template>
  <mp-breadcrumb>
    <mp-breadcrumb-item href="#/home" @click.prevent="Message('首页')"> 首页 </mp-breadcrumb-item>
    <mp-breadcrumb-item href="#/list" @click.prevent="Message('一级')"> 一级 </mp-breadcrumb-item>
    <mp-breadcrumb-item>二级</mp-breadcrumb-item>
  </mp-breadcrumb>
</template>
