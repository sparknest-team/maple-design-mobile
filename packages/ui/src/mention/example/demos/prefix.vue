<template>
  <mp-space direction="column" size="lg" style="width: 100%">
    <mp-mention :options="['Bytedance', 'Bytedesign', 'Bytenumner']" placeholder="input @" />
    <mp-mention :options="['Bytedance', 'Bytedesign', 'Bytenumner']" prefix="#" placeholder="input #" />
    <mp-mention :options="['Bytedance', 'Bytedesign', 'Bytenumner']" prefix="$" placeholder="input $" />
  </mp-space>
</template>

<script lang="ts" setup></script>
