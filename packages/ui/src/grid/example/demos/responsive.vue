<template>
  <div>
    <p>xs: 1 column · sm: 2 columns · md: 4 columns</p>
    <mp-grid :cols="{ xs: 1, sm: 2, md: 4 }" :col-gap="{ xs: 8, md: 16 }" :row-gap="{ xs: 8, md: 16 }">
      <mp-grid-item :span="{ xs: 1, md: 2 }" class="cell">Responsive span</mp-grid-item
      ><mp-grid-item v-for="i in 6" :key="i" class="cell soft">{{ i }}</mp-grid-item>
    </mp-grid>
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
