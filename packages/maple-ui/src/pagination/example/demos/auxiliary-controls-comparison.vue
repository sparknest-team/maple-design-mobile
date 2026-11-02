<script setup lang="ts">
import { proxyRefs as demoProxyRefs, ref } from 'vue'

const scene2 = demoProxyRefs(
  (() => {
    const pageSize = ref(10)

    const current = ref(5)
    return { pageSize, current }
  })(),
)
</script>

<template>
  <div class="demo-comparison">
    <section class="demo-comparison-case demo-comparison-case--1" data-comparison-scene="show-total">
      <h4><span lang="zh-CN">自定义总数插槽</span><span lang="en-US">Custom total slot</span></h4>
      <div class="pagination-demo">
        <mp-pagination :total="200" show-total
          ><template #total="{ total }">{{ total }} records</template></mp-pagination
        >
      </div>
    </section>

    <section class="demo-comparison-case demo-comparison-case--2" data-comparison-scene="show-page-size">
      <h4>
        <span lang="zh-CN">每页条数与公共选择器配置</span
        ><span lang="en-US">Page size and shared selector options</span>
      </h4>
      <div class="pagination-demo">
        <mp-pagination
          v-model="scene2.current"
          v-model:page-size="scene2.pageSize"
          :total="200"
          show-page-size
          :page-size-options="[10, 20, 50, 100]"
          :page-size-props="{
            placement: 'bottom-start',
          }"
        />
        <span>Current: {{ scene2.current }} · Page size: {{ scene2.pageSize }}</span>
      </div>
    </section>

    <section class="demo-comparison-case demo-comparison-case--3" data-comparison-scene="show-jumper">
      <h4><span lang="zh-CN">跳转与前后缀插槽</span><span lang="en-US">Jumper and prefix/suffix slots</span></h4>
      <div class="pagination-demo">
        <mp-pagination :total="200" show-jumper :responsive="false">
          <template #jumper-prepend>Go to</template><template #jumper-append>page</template>
        </mp-pagination>
      </div>
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
  .pagination-demo {
    display: grid;
    gap: 16px;
    min-width: 0;
  }
  .pagination-demo-controls {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 12px;
  }
}
.demo-comparison-case--2 {
  .pagination-demo {
    display: grid;
    gap: 16px;
    min-width: 0;
  }
  .pagination-demo-controls {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 12px;
  }
}
.demo-comparison-case--3 {
  .pagination-demo {
    display: grid;
    gap: 16px;
    min-width: 0;
  }
  .pagination-demo-controls {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 12px;
  }
}
</style>
