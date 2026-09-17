<template>
  <mp-space wrap :size="[8, 6]">
    <mp-button v-for="item in 8" :key="item">项目 {{ item }}</mp-button>
  </mp-space>
</template>
