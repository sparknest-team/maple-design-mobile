<script setup lang="ts"></script>

<template>
  <div class="demo-comparison">
    <section class="demo-comparison-case demo-comparison-case--1" data-comparison-scene="group">
      <h4><span lang="zh-CN">头像组</span><span lang="en-US">Avatar group</span></h4>
      <mp-space direction="column" :size="24">
        <mp-space direction="column" :size="8">
          <span class="label">默认叠层</span>
          <mp-avatar-group>
            <mp-avatar image-url="/cat.jpg" alt="用户一" bordered />
            <mp-avatar image-url="/cat2.jpg" alt="用户二" bordered />
            <mp-avatar image-url="/cat.jpg" alt="用户三" bordered />
            <mp-avatar bordered>+2</mp-avatar>
          </mp-avatar-group>
        </mp-space>

        <mp-space direction="column" :size="8">
          <span class="label">max-count + max-style</span>
          <mp-avatar-group
            :max-count="3"
            :size="48"
            :max-style="{
              backgroundColor: '#1d2129',
              color: '#fff',
            }"
          >
            <mp-avatar image-url="/cat.jpg" alt="用户一" />
            <mp-avatar image-url="/cat2.jpg" alt="用户二" />
            <mp-avatar color="#00bebe">A</mp-avatar>
            <mp-avatar color="#f59e0b">B</mp-avatar>
            <mp-avatar color="#ef4444">C</mp-avatar>
          </mp-avatar-group>
        </mp-space>

        <mp-space direction="column" :size="8">
          <span class="label">z-index-ascend</span>
          <mp-avatar-group z-index-ascend>
            <mp-avatar image-url="/cat.jpg" alt="用户一" />
            <mp-avatar image-url="/cat2.jpg" alt="用户二" />
            <mp-avatar color="#7b61ff">CD</mp-avatar>
          </mp-avatar-group>
        </mp-space>

        <mp-space direction="column" :size="8">
          <span class="label">shape="square" · offset="-16"</span>
          <mp-avatar-group shape="square" :offset="-16" :size="40">
            <mp-avatar image-url="/cat.jpg" alt="用户一" />
            <mp-avatar image-url="/cat2.jpg" alt="用户二" />
            <mp-avatar color="#00bebe">A</mp-avatar>
            <mp-avatar color="#7b61ff">B</mp-avatar>
          </mp-avatar-group>
        </mp-space>
      </mp-space>
    </section>

    <section class="demo-comparison-case demo-comparison-case--2" data-comparison-scene="group-vertical">
      <h4><span lang="zh-CN">纵向头像组</span><span lang="en-US">Vertical group</span></h4>
      <mp-space align="flex-end" :size="32" wrap>
        <mp-space direction="column" :size="8">
          <span class="label">offset = -12</span>
          <mp-avatar-group vertical :offset="-12">
            <mp-avatar image-url="/cat.jpg" alt="用户一" bordered />
            <mp-avatar image-url="/cat2.jpg" alt="用户二" bordered />
            <mp-avatar image-url="/cat.jpg" alt="用户三" bordered />
            <mp-avatar bordered>+2</mp-avatar>
          </mp-avatar-group>
        </mp-space>
        <mp-space direction="column" :size="8">
          <span class="label">offset = -20</span>
          <mp-avatar-group vertical :offset="-20" :size="48">
            <mp-avatar image-url="/cat.jpg" alt="用户一" bordered />
            <mp-avatar image-url="/cat2.jpg" alt="用户二" bordered />
            <mp-avatar color="#00bebe">A</mp-avatar>
          </mp-avatar-group>
        </mp-space>
      </mp-space>
    </section>
  </div>
</template>

<style scoped lang="less">
.demo-comparison {
  display: grid;
  gap: 24px;
  min-width: 0;
  max-width: 100%;
}
.demo-comparison-case {
  min-width: 0;
  max-width: 100%;
}
.demo-comparison-case > h4 {
  margin: 0 0 12px;
  font-size: 14px;
}
html:not([lang='en-US']) .demo-comparison-case > h4 > [lang='en-US'],
html[lang='en-US'] .demo-comparison-case > h4 > [lang='zh-CN'] {
  display: none;
}
.demo-comparison-case--1 {
  .label {
    color: var(--mp-color-text-3);
    font-size: var(--mp-font-size-sm);
  }
}
.demo-comparison-case--2 {
  .label {
    color: var(--mp-color-text-3);
    font-size: var(--mp-font-size-sm);
  }
}
</style>
