<template>
  <div>
    <div class="vertical-row">
      <span>Before</span>
      <mp-divider orientation="vertical" />
      <span>Middle</span>
      <mp-divider orientation="vertical" type="dashed" />
      <span>After</span>
    </div>
    <div class="vertical-labels">
      <mp-divider orientation="vertical" text-align="start" description="Start" />
      <mp-divider orientation="vertical" description="Center" />
      <mp-divider orientation="vertical" text-align="end" description="End" />
    </div>
  </div>
</template>

<style scoped>
.vertical-row {
  display: flex;
  align-items: center;
  min-height: 40px;
}
.vertical-labels {
  display: flex;
  height: 160px;
}
</style>
