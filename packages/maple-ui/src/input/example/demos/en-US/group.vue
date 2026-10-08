<template>
  <mp-space direction="column" :size="[12, 0]">
    <mp-input-group variant="outline">
      <mp-input-group-label>https://</mp-input-group-label>
      <mp-input placeholder="Domain" :hint="false" />
    </mp-input-group>
    <mp-input-group size="sm" variant="filled">
      <mp-input placeholder="First name" :hint="false" />
      <mp-input placeholder="Last name" :hint="false" />
    </mp-input-group>
  </mp-space>
</template>
