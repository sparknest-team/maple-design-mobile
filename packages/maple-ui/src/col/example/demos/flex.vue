<template>
  <div>
    <mp-row :gutter="12"
      ><mp-col :flex="1"><div class="cell">1</div></mp-col
      ><mp-col :flex="2"><div class="cell soft">2</div></mp-col></mp-row
    >
    <mp-row :gutter="12" :wrap="false"
      ><mp-col flex="100px"><div class="cell">100px</div></mp-col
      ><mp-col flex="auto"><div class="cell soft">auto</div></mp-col></mp-row
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
