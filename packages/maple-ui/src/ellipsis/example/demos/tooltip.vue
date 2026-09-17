<script setup></script>

<template>
  <mp-ellipsis style="max-width: 50vmin" :tooltip="{ type: 'primary', autoFitPopupWidth: false }">
    其实没有什么事情是不可能的，我都拿到世界冠军了，真的没有什么事情是不可能的。

    <template #tooltip-content>
      <m-icon-github />
    </template>
  </mp-ellipsis>
</template>
