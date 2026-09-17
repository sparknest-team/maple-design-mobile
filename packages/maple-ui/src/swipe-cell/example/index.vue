<script setup>
import BasicDemo from './demos/basic.vue'
import BeforeCloseDemo from './demos/before-close.vue'
import BothSidesDemo from './demos/both-sides.vue'
</script>

<template>
  <section data-demo="basic">
    <BasicDemo />
  </section>

  <section data-demo="both-sides">
    <BothSidesDemo />
  </section>

  <section data-demo="before-close">
    <BeforeCloseDemo />
  </section>
</template>
