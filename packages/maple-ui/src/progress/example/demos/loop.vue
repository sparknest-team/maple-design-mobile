<template>
  <mp-space direction="column" size="16px">
    <mp-progress indeterminate aria-label="Loading" />
    <mp-progress mode="circle" indeterminate aria-label="Loading" />
    <mp-progress :percent="60" animation />
  </mp-space>
</template>
