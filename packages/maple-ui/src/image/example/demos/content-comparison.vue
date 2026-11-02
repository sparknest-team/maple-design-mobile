<script setup lang="ts"></script>

<template>
  <div class="demo-comparison">
    <section class="demo-comparison-case demo-comparison-case--1" data-comparison-scene="caption">
      <h4><span lang="zh-CN">标题与描述</span><span lang="en-US">Caption</span></h4>
      <mp-space :size="24" wrap>
        <mp-image width="200" src="/cat.jpg" title="一只猫" description="页脚在图片内侧" />
        <mp-image width="200" src="/cat2.jpg" title="一只猫" description="页脚在图片外侧" footer-position="outer" />
      </mp-space>
    </section>

    <section class="demo-comparison-case demo-comparison-case--2" data-comparison-scene="extra">
      <h4><span lang="zh-CN">底部额外内容</span><span lang="en-US">Extra footer</span></h4>
      <mp-space :size="24" wrap>
        <mp-image width="200" src="/cat.jpg" title="一只猫" description="内侧额外内容">
          <template #extra>
            <span class="extra">Extra</span>
          </template>
        </mp-image>
        <mp-image width="200" src="/cat.jpg" title="一只猫" description="外侧额外内容" footer-position="outer">
          <template #extra>
            <span class="extra extra--outer">Extra</span>
          </template>
        </mp-image>
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
.demo-comparison-case--2 {
  .extra {
    padding: 2px 8px;
    color: #fff;
    font-size: 12px;
    background: rgb(0 0 0 / 45%);
    border-radius: 10px;
  }

  .extra--outer {
    color: currentColor;
    background: var(--mp-color-fill-2);
  }
}
</style>
