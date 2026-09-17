<script setup></script>

<template>
  <mp-countdown :time="108000000">
    <template #default="{ hours, minutes, seconds }">
      <span class="countdown-example-block">{{ hours }}</span>
      <span class="countdown-example-colon">:</span>
      <span class="countdown-example-block">{{ minutes }}</span>
      <span class="countdown-example-colon">:</span>
      <span class="countdown-example-block">{{ seconds }}</span>
    </template>
  </mp-countdown>
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
