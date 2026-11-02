<script setup lang="ts">
import { computed, proxyRefs as demoProxyRefs, h } from 'vue'

const scene1 = demoProxyRefs(
  (() => {
    const groupOptions = computed(() => [
      {
        type: 'group',
        label: '文件操作',
        children: [
          { label: '新建', value: 'new' },
          { label: '打开', value: 'open' },
        ],
      },
      {
        type: 'group',
        label: '编辑操作',
        children: [
          { label: '复制', value: 'copy' },
          { label: '粘贴', value: 'paste' },
        ],
      },
    ])
    return { groupOptions }
  })(),
)

const scene2 = demoProxyRefs(
  (() => {
    const submenuOptions = computed(() => [
      { label: '首页', value: 'home' },
      {
        label: '产品',
        children: [
          { label: '产品概览', value: 'overview' },
          {
            label: '解决方案',
            children: [
              { label: '企业版', value: 'enterprise' },
              { label: '团队版', value: 'team' },
            ],
          },
        ],
      },
      { label: '关于我们', value: 'about' },
    ])
    return { submenuOptions }
  })(),
)

const scene3 = demoProxyRefs(
  (() => {
    const inlineIcon = (text: string) => h('span', { 'aria-hidden': 'true' }, text)

    const contentOptions = computed(() => [
      { label: '编辑', value: 'edit', icon: inlineIcon('✎'), extra: '⌘ E' },
      {
        label: ({ active }: { active: boolean }) => h('strong', active ? '已选中复制' : '复制'),
        value: 'copy',
        icon: inlineIcon('⧉'),
        extra: '⌘ C',
      },
      { label: '删除', value: 'delete', icon: inlineIcon('⌫'), extra: '⌫', disabled: true },
    ])
    return { inlineIcon, contentOptions }
  })(),
)
</script>

<template>
  <div class="demo-comparison">
    <section class="demo-comparison-case demo-comparison-case--1" data-comparison-scene="group">
      <h4><span lang="zh-CN">选项分组</span><span lang="en-US">Option Group</span></h4>
      <mp-menu :options="scene1.groupOptions">
        <mp-button>选项分组</mp-button>
      </mp-menu>
    </section>

    <section class="demo-comparison-case demo-comparison-case--2" data-comparison-scene="submenu">
      <h4><span lang="zh-CN">多级菜单</span><span lang="en-US">Submenu</span></h4>
      <mp-menu :options="scene2.submenuOptions">
        <mp-button>多级菜单</mp-button>
      </mp-menu>
    </section>

    <section class="demo-comparison-case demo-comparison-case--3" data-comparison-scene="option-content">
      <h4><span lang="zh-CN">自定义选项内容</span><span lang="en-US">Custom Option Content</span></h4>
      <mp-menu :options="scene3.contentOptions">
        <mp-button>自定义选项内容</mp-button>
      </mp-menu>
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
  .menu-example-area {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 160px;
    background-color: var(--mp-color-fill-2);
  }

  .menu-example-footer {
    padding: 8px 12px;
  }
}
.demo-comparison-case--2 {
  .menu-example-area {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 160px;
    background-color: var(--mp-color-fill-2);
  }

  .menu-example-footer {
    padding: 8px 12px;
  }
}
.demo-comparison-case--3 {
  .menu-example-area {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 160px;
    background-color: var(--mp-color-fill-2);
  }

  .menu-example-footer {
    padding: 8px 12px;
  }
}
</style>
