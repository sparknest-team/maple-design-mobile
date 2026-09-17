<template>
  <div class="input-example__caption">启用 hint：聚焦后提示文字上浮</div>
  <mp-space direction="column" :size="[12, 0]">
    <mp-input variant="filled" placeholder="用户名" />
    <mp-input variant="outline" placeholder="用户名" />
    <mp-input variant="standard" placeholder="用户名" />
  </mp-space>
  <div class="input-example__caption">关闭 hint：提示文字保持为占位符</div>
  <mp-space direction="column" :size="[12, 0]">
    <mp-input variant="filled" :hint="false" placeholder="用户名" />
    <mp-input variant="outline" :hint="false" placeholder="用户名" />
    <mp-input variant="standard" :hint="false" placeholder="用户名" />
  </mp-space>
</template>

<style lang="less" scoped>
.input-example {
  &__caption,
  &__value {
    color: var(--mp-field-color-blur);
    font-size: 12px;
  }

  &__caption {
    margin: 16px 0 8px;
  }

  &__bottom-space {
    height: 40px;
  }
}
</style>
