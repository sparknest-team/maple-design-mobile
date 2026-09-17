<script setup></script>

<template>
  <mp-count-to :to="123456" :timing-function="(v) => 1 - Math.pow(1 - v, 3)" />
</template>
