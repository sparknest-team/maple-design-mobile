<template>
  <div class="verification-demo">
    <mp-verification-code
      default-value="1234"
      :length="4"
      masked
      mask-symbol="*"
      aria-label="Masked verification code"
    /><mp-verification-code
      default-value="1234"
      :length="4"
      variant="filled"
      size="lg"
      align="start"
      :gutter="12"
      aria-label="Filled verification code"
    /><mp-verification-code
      default-value="12"
      :length="4"
      variant="standard"
      focus-color="#6750a4"
      aria-label="Standard verification code"
    />
  </div>
</template>
<style scoped>
.verification-demo {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 420px;
}
</style>
