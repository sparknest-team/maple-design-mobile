<script setup></script>

<template>
  <mp-list :data="[]" loading />
  <mp-list :data="[]" style="margin-top: 12px">
    <template #empty>暂无联系人</template>
  </mp-list>
</template>
