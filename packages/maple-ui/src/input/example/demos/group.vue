<template>
  <mp-space direction="column" :size="[12, 0]">
    <mp-input-group variant="outline">
      <mp-input-group-label>https://</mp-input-group-label>
      <mp-input placeholder="输入域名" :hint="false" />
    </mp-input-group>
    <mp-input-group size="sm" variant="filled">
      <mp-input placeholder="姓" :hint="false" />
      <mp-input placeholder="名" :hint="false" />
    </mp-input-group>
  </mp-space>
</template>
