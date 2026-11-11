<template>
  <div>
    <mp-row :gutter="24"
      ><mp-col :span="16"
        ><mp-row :gutter="8"
          ><mp-col :span="12"><div class="cell">Inner 12</div></mp-col
          ><mp-col :span="12"><div class="cell soft">Inner 12</div></mp-col></mp-row
        ></mp-col
      ><mp-col :span="8"><div class="cell">Outer 8</div></mp-col></mp-row
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
