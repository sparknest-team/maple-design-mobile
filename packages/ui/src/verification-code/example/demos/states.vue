<template>
  <div class="verification-demo">
    <mp-verification-code default-value="123456" readonly aria-label="只读验证码" /><mp-verification-code
      default-value="123456"
      disabled
      aria-label="禁用验证码"
    /><mp-verification-code default-value="12" error aria-label="错误验证码" />
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
