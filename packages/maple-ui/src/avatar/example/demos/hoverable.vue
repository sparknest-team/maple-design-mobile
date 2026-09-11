<template>
  <mp-space direction="column" :size="24">
    <mp-space align="center" :size="16" wrap>
      <mp-avatar hoverable>H</mp-avatar>
      <mp-avatar hoverable image-url="/cat.jpg" alt="悬停放大" />
      <mp-avatar hoverable shape="square">方</mp-avatar>
    </mp-space>
    <mp-avatar-group>
      <mp-avatar hoverable image-url="/cat.jpg" alt="用户一" bordered />
      <mp-avatar hoverable image-url="/cat2.jpg" alt="用户二" bordered />
      <mp-avatar hoverable image-url="/cat.jpg" alt="用户三" bordered />
      <mp-avatar hoverable bordered>+2</mp-avatar>
    </mp-avatar-group>
  </mp-space>
</template>
