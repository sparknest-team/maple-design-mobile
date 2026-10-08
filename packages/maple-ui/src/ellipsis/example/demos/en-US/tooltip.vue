<template>
  <div class="ellipsis-demo">
    <mp-ellipsis
      style="width: 240px; max-width: 100%"
      :tooltip="{ status: 'primary', trigger: ['hover', 'focus', 'click'], content: 'Custom tooltip content' }"
    >
      This is a long description demonstrating text truncation inside a constrained container. Activate the text with a
      pointer or keyboard to expand it, and activate it again to collapse. Text follows the available container width.
    </mp-ellipsis>
  </div>
</template>

<style scoped>
.ellipsis-demo {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
}
.ellipsis-demo p {
  margin: 0;
}
</style>
