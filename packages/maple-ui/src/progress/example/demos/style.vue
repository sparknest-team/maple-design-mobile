<script setup></script>

<template>
  <mp-space direction="column" :size="['3vh', '3vh']">
    <mp-progress :percent="40" color="linear-gradient(131.53deg, #3fecff 0%, #6149f6 100%)" />
    <mp-progress status="info" :percent="40" />
    <mp-progress status="success" :percent="60" />
    <mp-progress percent="80" stroke-width="8" color="#ff9f00" track-color="#f5cb90" />
  </mp-space>
</template>
