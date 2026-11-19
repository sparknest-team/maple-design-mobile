<template>
  <mp-section :title="copy.permissions" :description="copy.scope">
    <dl>
      <dt>{{ copy.admin }}</dt>
      <dd>{{ copy.manage }}</dd>
      <dt>{{ copy.member }}</dt>
      <dd>{{ copy.update }}</dd>
    </dl>
  </mp-section>
</template>

<script setup lang="ts">
import { copy } from '../messages'
</script>
