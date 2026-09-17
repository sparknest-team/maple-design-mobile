<script setup></script>

<template>
  <mp-countdown :time="4 * 24 * 60 * 60 * 1000" format="DD 天 HH 时 mm 分 ss 秒" />
</template>

<style scoped>
.countdown-example-block {
  background: var(--mp-color-primary);
  color: var(--mp-color-white);
  width: 30px;
  height: 30px;
  border-radius: 50%;
  padding: 18px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.countdown-example-colon {
  margin: 0 5px;
  font-size: 18px;
  font-weight: 500;
}
</style>
