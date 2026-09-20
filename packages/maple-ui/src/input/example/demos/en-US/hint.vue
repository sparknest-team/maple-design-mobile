<template>
  <div class="input-example__caption">Hint enabled: the label floats on focus</div>
  <mp-space direction="column" :size="[12, 0]">
    <mp-input variant="filled" placeholder="Username" />
    <mp-input variant="outline" placeholder="Username" />
    <mp-input variant="standard" placeholder="Username" />
  </mp-space>
  <div class="input-example__caption">Hint disabled: the text remains a placeholder</div>
  <mp-space direction="column" :size="[12, 0]">
    <mp-input variant="filled" :hint="false" placeholder="Username" />
    <mp-input variant="outline" :hint="false" placeholder="Username" />
    <mp-input variant="standard" :hint="false" placeholder="Username" />
  </mp-space>
</template>

<style lang="less" scoped>
.input-example {
  &__caption,
  &__value {
    color: var(--mp-field-blur-color);
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
