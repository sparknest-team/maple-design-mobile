<template>
  <div>
    <p>主题色 / Theme color</p>
    <mp-divider color="var(--mp-sys-color-action-primary)" />
    <p>线宽 / Thickness · 3px</p>
    <mp-divider :thickness="3" />
    <p>半透明 / Half opacity · 0.5</p>
    <mp-divider :thickness="3" :opacity="0.5" />
    <p>隐藏线条，保留间距 / Zero opacity preserves spacing</p>
    <mp-divider :opacity="0" />
    <p>细线优先 / Hairline overrides thickness</p>
    <mp-divider hairline :thickness="4" />
  </div>
</template>
