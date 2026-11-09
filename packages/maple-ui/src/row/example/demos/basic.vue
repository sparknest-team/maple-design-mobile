<template>
  <div class="row-demo">
    <mp-row
      ><mp-col :span="12"><div class="cell">12</div></mp-col
      ><mp-col :span="12"><div class="cell soft">12</div></mp-col></mp-row
    >
    <mp-row
      ><mp-col v-for="i in 3" :key="i" :span="8"><div class="cell">8</div></mp-col></mp-row
    >
  </div>
</template>

<style scoped>
.row-demo {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}
.cell {
  box-sizing: border-box;
  padding: 12px;
  min-width: 0;
  border-radius: 4px;
  background: var(--mp-color-primary);
  color: var(--mp-color-white);
  text-align: center;
  overflow-wrap: anywhere;
}
.soft {
  opacity: 0.7;
}
</style>
