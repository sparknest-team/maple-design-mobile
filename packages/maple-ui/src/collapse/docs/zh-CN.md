# 折叠面板

### 介绍

可以折叠和展开的内容区域。示例与 Cedar Design Web 保持一致，布局按移动端换行。`Collapse.Item` 与 `mp-collapse-item` 是同一组件，`app.use(Collapse)` 会同时注册两者。

### 基本使用

通过 `v-model:active-names` 控制展开的面板列表，值始终为数组。

```html
<script setup>
import { ref } from 'vue'

const activeNames = ref(['1'])

function handleChange(val) {
  console.log(val)
}
</script>

<template>
  <mp-collapse v-model:active-names="activeNames" @change="handleChange">
    <mp-collapse-item title="标题" name="1">文本</mp-collapse-item>
    <mp-collapse-item title="标题" name="2">文本</mp-collapse-item>
  </mp-collapse>
</template>
```

### 手风琴模式

使用 `accordion` 开启手风琴模式。此时 `activeNames` 仍为数组，最多包含一项。

```html
<script setup>
import { ref } from 'vue'

const activeNames = ref([])
</script>

<template>
  <mp-collapse v-model:active-names="activeNames" accordion>
    <mp-collapse-item title="标题" name="1">文本</mp-collapse-item>
    <mp-collapse-item title="标题" name="2">文本</mp-collapse-item>
  </mp-collapse>
</template>
```

### 禁用

在 `collapse-item` 上使用 `disabled` 禁用当前面板。

```html
<script setup>
import { ref } from 'vue'

const activeNames = ref([1])
const disabled = ref(false)
</script>

<template>
  <mp-space direction="column" :size="[8, 8]">
    <mp-button @click="disabled = !disabled">
      {{ disabled ? '启用' : '禁用' }}
    </mp-button>
    <mp-collapse v-model:active-names="activeNames">
      <mp-collapse-item title="标题" :name="1" :disabled="disabled">文本</mp-collapse-item>
      <mp-collapse-item title="标题" :name="2" :disabled="disabled">文本</mp-collapse-item>
    </mp-collapse>
  </mp-space>
</template>
```

### 嵌套面板

面板可以多层嵌套。

```html
<script setup>
import { ref } from 'vue'

const activeNames = ref(['1'])
const nestedNames = ref(['1.1'])
</script>

<template>
  <mp-collapse v-model:active-names="activeNames" destroy-on-hide>
    <mp-collapse-item title="标题" name="1">
      <mp-collapse v-model:active-names="nestedNames" destroy-on-hide :elevation="false">
        <mp-collapse-item title="标题" name="1.1">文本</mp-collapse-item>
        <mp-collapse-item title="标题" name="1.2">文本</mp-collapse-item>
      </mp-collapse>
    </mp-collapse-item>
    <mp-collapse-item title="标题" name="2">文本</mp-collapse-item>
  </mp-collapse>
</template>
```

### 无边框模式

通过 `bordered="false"` 隐藏边框。

```html
<mp-collapse :default-active-names="['1']" :bordered="false">
  <mp-collapse-item title="标题" name="1">文本</mp-collapse-item>
  <mp-collapse-item title="标题" name="2">文本</mp-collapse-item>
</mp-collapse>
```

### 分割线

通过 `divider` 控制面板之间的分割线。

```html
<script setup>
import { ref } from 'vue'

const activeNames = ref([])
const divider = ref(true)
</script>

<template>
  <mp-button @click="divider = !divider">
    {{ divider ? '隐藏分割线' : '显示分割线' }}
  </mp-button>
  <mp-collapse v-model:active-names="activeNames" :divider="divider">
    <mp-collapse-item title="标题" name="1">文本</mp-collapse-item>
    <mp-collapse-item title="标题" name="2">文本</mp-collapse-item>
  </mp-collapse>
</template>
```

### 展开间距

通过 `offset` 控制展开面板之间的间距，默认不显示。

```html
<script setup>
import { ref } from 'vue'

const activeNames = ref(['1', '2'])
const offset = ref(true)
</script>

<template>
  <mp-button @click="offset = !offset">
    {{ offset ? '隐藏间距' : '显示间距' }}
  </mp-button>
  <mp-collapse v-model:active-names="activeNames" :offset="offset">
    <mp-collapse-item title="标题" name="1">文本</mp-collapse-item>
    <mp-collapse-item title="标题" name="2">文本</mp-collapse-item>
  </mp-collapse>
</template>
```

### 额外节点

通过 `extra` 设置额外节点。点击 `extra` 区域不会触发展开。

```html
<mp-collapse>
  <mp-collapse-item title="标题" name="1">
    <template #extra>额外</template>
    文本
  </mp-collapse-item>
</mp-collapse>
```

### 展开图标

为展开项自定义展开图标。

```html
<script setup>
import { ref } from 'vue'

const activeNames = ref(['1'])
</script>

<template>
  <mp-collapse v-model:active-names="activeNames">
    <template #expand-icon="{ active }">
      <span>{{ active ? '▼' : '▶' }}</span>
    </template>
    <mp-collapse-item title="标题" name="1">文本</mp-collapse-item>
    <mp-collapse-item title="标题" name="2">文本</mp-collapse-item>
  </mp-collapse>
</template>
```

### 自定义样式

自定义面板样式。

```html
<mp-collapse :default-active-names="['1']" :bordered="false">
  <mp-collapse-item title="标题" name="1" :style="{ borderRadius: '6px', marginBottom: '12px' }">
    文本
  </mp-collapse-item>
</mp-collapse>
```

### 展开图标位置

通过 `expand-icon-position` 设置展开图标位置，默认为左侧。

```html
<script setup>
import { ref } from 'vue'

const activeNames = ref(['1'])
</script>

<template>
  <mp-collapse v-model:active-names="activeNames" expand-icon-position="right">
    <mp-collapse-item title="标题" name="1">文本</mp-collapse-item>
    <mp-collapse-item title="标题" name="2">文本</mp-collapse-item>
  </mp-collapse>
</template>
```

### 隐藏时销毁

使用 `destroy-on-hide` 在面板收起后销毁内容。

```html
<script setup>
import { ref } from 'vue'

const activeNames = ref(['1'])
</script>

<template>
  <mp-collapse v-model:active-names="activeNames" destroy-on-hide>
    <mp-collapse-item title="标题" name="1">文本</mp-collapse-item>
    <mp-collapse-item title="标题" name="2">文本</mp-collapse-item>
  </mp-collapse>
</template>
```

### 切换全部

通过 `toggleAll` 批量展开 / 收起面板。手风琴模式下不可用。

```html
<script setup>
import { ref } from 'vue'

const collapseRef = ref(null)
const activeNames = ref(['2', '4'])

function toggleAll() {
  collapseRef.value.toggleAll({ expand: 'inverse' })
}
</script>

<template>
  <mp-button @click="toggleAll">切换全部</mp-button>
  <mp-collapse ref="collapseRef" v-model:active-names="activeNames">
    <mp-collapse-item title="标题" name="1">文本</mp-collapse-item>
    <mp-collapse-item title="标题" name="2">文本</mp-collapse-item>
    <mp-collapse-item title="标题" disabled name="3">文本</mp-collapse-item>
    <mp-collapse-item title="标题" disabled name="4">文本</mp-collapse-item>
  </mp-collapse>
</template>
```

## API

### 属性

#### Collapse Props

| 参数                         | 说明                                               | 类型                              | 默认值         |
| ---------------------------- | -------------------------------------------------- | --------------------------------- | -------------- |
| `active-names` **(v-model)** | 当前展开面板的 name                                | _(string \| number)[]_            | `-`            |
| `default-active-names`       | 默认展开面板的 name（非受控）                      | _(string \| number)[]_            | `[]`           |
| `accordion`                  | 是否开启手风琴模式                                 | _boolean_                         | `false`        |
| `show-expand-icon`           | 是否显示展开图标                                   | _boolean_                         | `-`            |
| `expand-icon-position`       | 展开图标位置                                       | _'left' \| 'right'_               | `'left'`       |
| `bordered`                   | 是否显示边框                                       | _boolean_                         | `true`         |
| `divider`                    | 是否显示分割线                                     | _boolean_                         | `true`         |
| `offset`                     | 展开面板是否显示间距                               | _boolean_                         | `false`        |
| `destroy-on-hide`            | 是否在隐藏时销毁内容                               | _boolean_                         | `false`        |
| `elevation`                  | 海拔高度，可选值为 `true` `false` 和 `0-24` 的等级 | _string \| number \| boolean_     | `true`         |

#### CollapseItem Props

| 参数               | 说明                                       | 类型               | 默认值         |
| ------------------ | ------------------------------------------ | ------------------ | -------------- |
| `name` **(必填)**  | 面板唯一标识，对应 `activeNames` 中的值    | _string \| number_ | `-`            |
| `title`            | 面板标题                                   | _string_           | `-`            |
| `disabled`         | 是否禁用面板                               | _boolean_          | `false`        |
| `show-expand-icon` | 是否显示展开图标                           | _boolean_          | `true`         |
| `destroy-on-hide`  | 是否在隐藏时销毁内容                       | _boolean_          | `false`        |

### 方法

| 方法名      | 说明                                   | 参数                                | 返回值 |
| ----------- | -------------------------------------- | ----------------------------------- | ------ |
| `toggleAll` | 开启或关闭所有面板（手风琴模式下无效） | `options: CollapseToggleAllOptions` | `-`    |

### CollapseToggleAllOptions

| 参数           | 说明                                                     | 类型                   | 默认值  |
| -------------- | -------------------------------------------------------- | ---------------------- | ------- |
| `expand`       | `'inverse'` 切换全部；`boolean` 控制全部展开或收起       | `'inverse' \| boolean` | `-`     |
| `skipDisabled` | 是否跳过禁用面板                                         | _boolean_              | `false` |

### 事件

#### Collapse Events

| 事件名   | 说明                     | 回调参数                                              |
| -------- | ------------------------ | ----------------------------------------------------- |
| `change` | 展开的面板发生改变时触发 | `activeNames: (string \| number)[]`<br>`ev: Event` |

### 插槽

#### Collapse Slots

| 名称          | 说明           | 参数                                                                      |
| ------------- | -------------- | ------------------------------------------------------------------------- |
| `default`     | 折叠面板的内容 | `-`                                                                       |
| `expand-icon` | 展开图标       | `active: boolean`<br>`disabled: boolean`<br>`position: 'left' \| 'right'` |

#### CollapseItem Slots

| 名称          | 说明     | 参数                                                                      |
| ------------- | -------- | ------------------------------------------------------------------------- |
| `default`     | 面板内容 | `-`                                                                       |
| `title`       | 面板标题 | `-`                                                                       |
| `extra`       | 额外内容 | `-`                                                                       |
| `expand-icon` | 展开图标 | `active: boolean`<br>`disabled: boolean`<br>`position: 'left' \| 'right'` |

### 样式变量

以下为组件使用的 css 变量，可以使用 [StyleProvider 组件](#/zh-CN/style-provider) 进行样式定制。

| 变量名                         | 默认值                             |
| ------------------------------ | ---------------------------------- |
| `--collapse-background`        | `var(--color-fill-3)`              |
| `--collapse-text-color`        | `#232222`                          |
| `--collapse-header-font-size`  | `var(--font-size-lg)`              |
| `--collapse-header-padding`    | `10px 12px`                        |
| `--collapse-content-font-size` | `var(--font-size-md)`              |
| `--collapse-content-padding`   | `0 12px 10px`                      |
| `--collapse-item-margin-top`   | `16px`                             |
| `--collapse-disable-color`     | `#bdbdbd`                          |
| `--collapse-border-top`        | `thin solid var(--color-border-2)` |
| `--collapse-border-width`      | `1px`                              |
| `--collapse-border-color`      | `var(--color-border-2)`            |
| `--collapse-border-radius`     | `4px`                              |
