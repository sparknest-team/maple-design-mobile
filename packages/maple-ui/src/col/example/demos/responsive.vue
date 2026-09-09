<template>
  <div>
    <p>xs → sm (576px) → md (768px). Hidden columns return at larger breakpoints.</p>
    <mp-row :gutter="[12, 12]"
      ><mp-col :xs="24" :sm="12" :md="8"><div class="cell">24 / 12 / 8</div></mp-col
      ><mp-col :xs="0" :sm="12" :md="8"><div class="cell soft">Hidden / 12 / 8</div></mp-col
      ><mp-col :span="8" :xs="{ span: 20, offset: 4, order: 2 }" :md="{ span: 8, offset: 0, order: 0 }"
        ><div class="cell">Reset offset / order</div></mp-col
      ></mp-row
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
