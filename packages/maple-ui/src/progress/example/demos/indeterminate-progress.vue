<script setup></script>

<template>
  <mp-space direction="column" :size="['3vh', '3vh']">
    <mp-progress indeterminate />
    <mp-progress indeterminate status="info" />

    <mp-space justify="space-between">
      <mp-progress mode="circle" indeterminate size="18vmin" />
      <mp-progress mode="circle" status="info" indeterminate size="18vmin" />
    </mp-space>
  </mp-space>
</template>
