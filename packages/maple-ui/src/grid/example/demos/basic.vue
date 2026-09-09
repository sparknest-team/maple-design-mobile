<template>
  <div>
    <mp-grid :cols="4" :col-gap="12" :row-gap="12"
      ><mp-grid-item v-for="i in 8" :key="i" class="cell">{{ i }}</mp-grid-item></mp-grid
    >
    <mp-grid :cols="4" :col-gap="12" :row-gap="12"
      ><mp-grid-item :span="2" class="cell">span 2</mp-grid-item
      ><mp-grid-item :offset="1" class="cell soft">offset 1</mp-grid-item
      ><mp-grid-item :span="4" class="cell">span 4</mp-grid-item></mp-grid
    >
  </div>
</template>

<style scoped>
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
