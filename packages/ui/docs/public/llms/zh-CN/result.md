<!-- Source: src/result/docs/zh-CN.md; locale: zh-CN; page: /zh-CN/result -->

# 结果

### 介绍

用于向用户展示结果。

## 基础示例

### 基本使用

Next status 循环六种本地结果状态并更新标题/图形，Reset status 恢复 info；按钮不发请求或导航。Result 只展示传入的 status，不根据标题文字推断成功/失败。

Example source: src/result/example/demos/basic-usage.vue

```vue
<script setup lang="ts">
import { computed, ref } from 'vue'

const statuses = ['info', 'success', 'warning', 'danger', 'question', 'empty'] as const
const index = ref(0)
const status = computed(() => statuses[index.value])
</script>

<template>
  <mp-result data-demo-result :status="status" :title="'Result: ' + status" subtitle="Local state preview">
    <template #extra>
      <mp-space wrap>
        <mp-button status="primary" @click="index = (index + 1) % statuses.length">Next status</mp-button>
        <mp-button @click="index = 0">Reset status</mp-button>
      </mp-space>
      <p aria-live="polite">Current status: {{ status }}</p>
    </template>
  </mp-result>
</template>
```

## 内容与展示

### 状态

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `status` | info / success / warning / danger / question / empty / 403 / 404 / 500 | 状态 |
| `title` | 标题 | 状态 |
| `subtitle` | 描述 | 状态 |
<!-- demo-config-notes:end -->

结果状态支持 `info`、`success`、`warning`、`danger`、`question`、`empty`、`403`、`404` 和 `500`。内置图形的入场动画受 `animation` 和系统减少动态效果设置控制。自定义 `icon` 插槽替代内置图形，插槽收到归一化的 `size`，其大小和动画由插槽内容控制。

Example source: src/result/example/demos/type.vue

```vue
<script setup>
import { ref } from 'vue'

const success = ref(false)
const error = ref(false)
const info = ref(false)
const warning = ref(false)
const question = ref(false)
const empty = ref(false)
</script>

<template>
  <mp-space direction="column" size="lg">
    <mp-button status="success" block @click="success = true">成功</mp-button>
    <mp-button status="warning" block @click="warning = true">警告</mp-button>
    <mp-button status="info" block @click="info = true">信息</mp-button>
    <mp-button status="danger" block @click="error = true">错误</mp-button>
    <mp-button color="var(--mp-result-question-color)" text-color="#fff" block @click="question = true">
      疑问
    </mp-button>
    <mp-button color="var(--mp-result-empty-color)" text-color="#fff" block @click="empty = true"> 空值 </mp-button>
  </mp-space>

  <mp-popup v-model:open="success" unstyled>
    <mp-result class="result" status="success" title="成功" subtitle="嗨~ 我是结果页的一段描述~">
      <template #extra>
        <mp-button status="success" @click="success = false">知道了</mp-button>
      </template>
    </mp-result>
  </mp-popup>

  <mp-popup v-model:open="error" unstyled>
    <mp-result class="result" status="danger" title="错误" subtitle="嗨~ 我是结果页的一段描述~">
      <template #extra>
        <mp-button status="danger" @click="error = false">知道了</mp-button>
      </template>
    </mp-result>
  </mp-popup>

  <mp-popup v-model:open="warning" unstyled>
    <mp-result class="result" status="warning" title="警告" subtitle="嗨~ 我是结果页的一段描述~">
      <template #extra>
        <mp-button status="warning" @click="warning = false">知道了</mp-button>
      </template>
    </mp-result>
  </mp-popup>

  <mp-popup v-model:open="info" unstyled>
    <mp-result class="result" status="info" title="信息" subtitle="嗨~ 我是结果页的一段描述~">
      <template #extra>
        <mp-button status="info" @click="info = false">知道了</mp-button>
      </template>
    </mp-result>
  </mp-popup>

  <mp-popup v-model:open="question" unstyled>
    <mp-result class="result" status="question" title="疑问" subtitle="嗨~ 我是结果页的一段描述~">
      <template #extra>
        <mp-button color="var(--mp-result-question-color)" text-color="#fff" @click="question = false"
          >知道了
        </mp-button>
      </template>
    </mp-result>
  </mp-popup>

  <mp-popup v-model:open="empty" unstyled>
    <mp-result class="result" status="empty" title="空值" subtitle="嗨~ 我是结果页的一段描述~">
      <template #extra>
        <mp-button color="var(--mp-result-empty-color)" text-color="#fff" @click="empty = false">知道了 </mp-button>
      </template>
    </mp-result>
  </mp-popup>
</template>

<style scoped>
.result {
  width: 75vmin;
}
</style>
```

## API

### Result Props

| 参数            | 说明                                                              | 类型       | 默认值       |
|---------------|-----------------------------------------------------------------|----------|-----------|
| `status` | info / success / warning / danger / question / empty / 403 / 404 / 500 | _ResultStatus_<br>`'success' \| 'empty' \| 'info' \| 'warning' \| 'danger' \| 'question' \| '403' \| '404' \| '500'` | `info` |
| `title`       | 标题                                                              | _string_ | `-`       |
| `subtitle` | 描述                                                              | _string_ | `-`       |
| `image-size`  | 图片尺寸                                                            | _string \| number_   | `-`  |
| `animation`   | 是否开启状态图形动画                                  | _boolean_ | `true`    |

### Result Slots

| 插槽名                | 说明      | 参数 |
|--------------------|---------| ---- |
| `icon`             | 自定义状态图形 | `{ size?: string }` |
| `title`            | 自定义标题   | `-`  |
| `subtitle`      | 自定义描述   | `-`  |
| `extra`            | 自定义操作区 | `-` |
| `default`          | 附加结果详情 | `-` |

## CSS Variables

<!-- component-css-variables:start -->

通过以下变量定制组件外观。默认值随表中注明的主题或选择器条件变化；变量仅在对应的尺寸、变体和交互状态下生效。

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 默认值／条件 | 影响的样式 |
| --- | --- | --- |
| `--mp-result-background` | `var(--mp-color-bg-white)` | `background-color` |
| `--mp-result-border-radius` | `3px` | `border-radius` |
| `--mp-result-content-margin` | `20px 0 0` | `margin` |
| `--mp-result-danger-border-color` | `rgba(244, 67, 54, 0.3)` | `border-color` |
| `--mp-result-danger-color` | `var(--mp-sys-color-content-danger)` | `fill` |
| `--mp-result-empty-border-color` | `rgba(158, 158, 158, 0.3)` | `border-color` |
| `--mp-result-empty-color` | `#9e9e9e` | `fill` |
| `--mp-result-extra-margin` | `20px 0 0` | `margin` |
| `--mp-result-image-size` | `80px` | `height`, `width` |
| `--mp-result-info-border-color` | `rgba(0, 175, 239, 0.3)` | `border-color` |
| `--mp-result-info-color` | `var(--mp-sys-color-content-info)` | `fill` |
| `--mp-result-padding` | `24px` | `padding` |
| `--mp-result-question-border-color` | `rgba(96, 125, 139, 0.3)` | `border-color` |
| `--mp-result-question-color` | `#607d8b` | `fill` |
| `--mp-result-subtitle-color` | `rgba(0, 0, 0, 0.6)` | `color` |
| `--mp-result-subtitle-font-size` | `14px` | `font-size` |
| `--mp-result-subtitle-line-height` | `1.6` | `line-height` |
| `--mp-result-subtitle-margin` | `10px 0 0` | `margin` |
| `--mp-result-success-border-color` | `rgba(0, 196, 143, 0.3)` | `border-color` |
| `--mp-result-success-color` | `var(--mp-sys-color-content-success)` | `fill` |
| `--mp-result-title-color` | `#444` | `color` |
| `--mp-result-title-font-size` | `32px` | `font-size` |
| `--mp-result-title-font-weight` | `500` | `font-weight` |
| `--mp-result-title-margin` | `15px 0 0` | `margin` |
| `--mp-result-warning-border-color` | `rgba(255, 159, 0, 0.3)` | `border-color` |
| `--mp-result-warning-color` | `var(--mp-sys-color-content-warning)` | `fill` |

</div>

将覆盖设置在组件实际根节点或弹层真实挂载祖先上。例如给该元素添加下列 class，再按需替换变量值：

```css
.component-theme {
  --mp-result-background: var(--mp-color-bg-white);
}
```

显式行内样式及直接写入同一 CSS 属性的 Props 优先于样式表默认值。Teleport 后，普通 CSS 变量按实际挂载位置继承；使用 ThemeProvider 时，请遵循其局部主题与弹层配置规则。局部定制请直接覆盖组件变量；仅修改后代的 system 变量不会重新计算从根继承的组件别名。内部变量不属于公共 API。

<!-- component-css-variables:end -->
