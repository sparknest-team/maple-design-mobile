<script setup></script>

<template>
  <mp-count-to :to="123456">
    <template #default="{ value }">
      {{ value.toLocaleString() }}
    </template>
  </mp-count-to>
</template>
