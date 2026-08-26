# 折叠面板

### 介绍

可以折叠和展开的内容区域。

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

### 隐藏边距

使用 `offset` 属性隐藏边距。

```html
<script setup>
import { ref } from 'vue'

const activeNames = ref(['2'])
</script>

<template>
  <mp-collapse v-model:active-names="activeNames" :offset="false">
    <mp-collapse-item title="标题" name="1">文本</mp-collapse-item>
    <mp-collapse-item title="标题" name="2">文本</mp-collapse-item>
  </mp-collapse>
</template>
```

### 可控的分割线

使用 `divider` 属性控制分割线。

```html
<script setup>
import { ref } from 'vue'

const activeNames = ref([])
const divider = ref(false)
</script>

<template>
  <mp-button @click="divider = !divider">
    {{ divider ? '隐藏分割线' : '显示分割线' }}
  </mp-button>
  <mp-collapse v-model:active-names="activeNames" :divider="divider">
    <mp-collapse-item title="标题" name="1">文本</mp-collapse-item>
    <mp-collapse-item title="标题" name="2">文本</mp-collapse-item>
    <mp-collapse-item title="标题" name="3">文本</mp-collapse-item>
  </mp-collapse>
</template>
```

### 手风琴模式

使用 `accordion` 属性开启手风琴模式。此时 `activeNames` 仍为数组，最多包含一项。

```html
<script setup>
import { ref } from 'vue'

const activeNames = ref([])
</script>

<template>
  <mp-collapse v-model:active-names="activeNames" accordion :offset="false">
    <mp-collapse-item title="标题" name="1">文本</mp-collapse-item>
    <mp-collapse-item title="标题" name="2">文本</mp-collapse-item>
  </mp-collapse>
</template>
```

### 禁用

在 `collapse-item` 上使用 `disabled` 属性禁用当前面板。

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
      <mp-collapse-item title="标题" :name="1" :disabled="disabled">
        文本
      </mp-collapse-item>
      <mp-collapse-item title="标题" :name="2" :disabled="disabled">
        文本
      </mp-collapse-item>
    </mp-collapse>
  </mp-space>
</template>
```

### 自定义内容

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
    <mp-collapse-item title="这是标题" name="1">
      <template #extra>额外</template>
      文本
    </mp-collapse-item>
    <mp-collapse-item name="2">
      <template #title>这是标题</template>
      <template #expand-icon="{ active }">{{ active ? '^^' : 'vv' }}</template>
      这是内容
    </mp-collapse-item>
  </mp-collapse>
</template>
```

### 展开图标位置

使用 `expand-icon-position` 设置展开图标位置。

```html
<script setup>
import { ref } from 'vue'

const activeNames = ref(['1'])
</script>

<template>
  <mp-collapse v-model:active-names="activeNames" expand-icon-position="left">
    <mp-collapse-item title="标题" name="1">文本</mp-collapse-item>
    <mp-collapse-item title="标题" name="2">文本</mp-collapse-item>
  </mp-collapse>
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
      <mp-collapse v-model:active-names="nestedNames" destroy-on-hide :elevation="false" :offset="false">
        <mp-collapse-item title="标题" name="1.1">文本</mp-collapse-item>
        <mp-collapse-item title="标题" name="1.2">文本</mp-collapse-item>
      </mp-collapse>
    </mp-collapse-item>
    <mp-collapse-item title="标题" name="2">文本</mp-collapse-item>
    <mp-collapse-item title="标题" name="3">文本</mp-collapse-item>
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
    <mp-collapse-item title="标题" name="3" :show-expand-icon="false">文本</mp-collapse-item>
  </mp-collapse>
</template>
```

### 切换全部

```html
<script setup>
import { ref } from 'vue'

const collapseRef = ref(null)
const activeNames = ref(['2', '4'])

function toggleAll() {
  collapseRef.value.toggleAll({ expand: 'inverse' })
}

function toggleAllSkipDisabled() {
  collapseRef.value.toggleAll({ expand: 'inverse', skipDisabled: true })
}

function openAll() {
  collapseRef.value.toggleAll({ expand: true })
}
function openAllSkipDisabled() {
  collapseRef.value.toggleAll({ expand: true, skipDisabled: true })
}

function closeAll() {
  collapseRef.value.toggleAll({ expand: false })
}

function closeAllSkipDisabled() {
  collapseRef.value.toggleAll({ expand: false, skipDisabled: true })
}
</script>

<template>
  <mp-button @click="toggleAll" style="margin: 8px">切换全部</mp-button>
  <mp-button @click="toggleAllSkipDisabled" style="margin: 8px">
    切换全部（跳过禁用）
  </mp-button>
  <mp-button @click="openAll" style="margin: 8px">展开全部</mp-button>
  <mp-button @click="openAllSkipDisabled" style="margin: 8px">
    展开全部（跳过禁用）
  </mp-button>
  <mp-button @click="closeAll" style="margin: 8px">收起全部</mp-button>
  <mp-button @click="closeAllSkipDisabled" style="margin: 8px">
    收起全部（跳过禁用）
  </mp-button>

  <mp-collapse v-model:active-names="activeNames" ref="collapseRef">
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

| 参数                         | 说明                                               | 类型                    | 默认值   |
| ---------------------------- | -------------------------------------------------- | ----------------------- | -------- |
| `active-names` **(v-model)** | 当前展开面板的 name                                | _(string \| number)[]_  | `-`      |
| `default-active-names`       | 默认展开面板的 name（非受控）                      | _(string \| number)[]_  | `[]`     |
| `accordion`                  | 是否开启手风琴模式                                 | _boolean_               | `false`  |
| `elevation`                  | 海拔高度，可选值为 `true` `false` 和 `0-24` 的等级 | _string \| number \| boolean_ | `true` |
| `offset`                     | 是否显示边距                                       | _boolean_               | `true`   |
| `divider`                    | 是否显示分割线                                     | _boolean_               | `true`   |
| `expand-icon-position`       | 展开图标位置                                       | _'left' \| 'right'_     | `right`  |
| `show-expand-icon`           | 是否显示展开图标                                   | _boolean_               | `-`      |
| `destroy-on-hide`            | 是否在隐藏时销毁内容                               | _boolean_               | `false`  |

#### CollapseItem Props

| 参数               | 说明                     | 类型               | 默认值         |
| ------------------ | ------------------------ | ------------------ | -------------- |
| `name`             | 唯一标识符，默认为索引值 | _string \| number_ | `index`        |
| `title`            | 面板标题                 | _string_           | `-`            |
| `icon`             | 展开图标名称             | _string_           | `chevron-down` |
| `disabled`         | 是否禁用面板             | _boolean_          | `false`        |
| `show-expand-icon` | 是否显示展开图标         | _boolean_          | `true`         |
| `destroy-on-hide`  | 是否在隐藏时销毁内容     | _boolean_          | `false`        |

### 方法

| 方法名      | 说明               | 参数                                | 返回值 |
| ----------- | ------------------ | ----------------------------------- | ------ |
| `toggleAll` | 开启或关闭所有面板 | `options: CollapseToggleAllOptions` | `-`    |

### CollapseToggleAllOptions

| 参数           | 说明                                                                                         | 类型                   | 默认值  |
| -------------- | -------------------------------------------------------------------------------------------- | ---------------------- | ------- |
| `expand`       | 设置`'inverse'`可切换所有面板的状态；设置`boolean`控制所有面板展开或收起                     | _'inverse' \| boolean_ | `-`     |
| `skipDisabled` | 是否跳过禁用状态的面板                                                                       | _boolean_              | `false` |

### 事件

#### Collapse Events

| 事件名   | 说明           | 回调参数                          |
| -------- | -------------- | --------------------------------- |
| `change` | 切换面板时触发 | `activeNames: (string \| number)[]` |

### 插槽

#### Collapse Slots

| 名称          | 说明           | 参数                                                                 |
| ------------- | -------------- | -------------------------------------------------------------------- |
| `default`     | 折叠面板的内容 | `-`                                                                  |
| `expand-icon` | 展开图标       | `active: boolean`<br>`disabled: boolean`<br>`position: 'left' \| 'right'` |

#### CollapseItem Slots

| 名称          | 说明       | 参数                                                                 |
| ------------- | ---------- | -------------------------------------------------------------------- |
| `default`     | 面板的内容 | `-`                                                                  |
| `title`       | 面板的标题 | `-`                                                                  |
| `extra`       | 额外内容   | `-`                                                                  |
| `expand-icon` | 展开图标   | `active: boolean`<br>`disabled: boolean`<br>`position: 'left' \| 'right'` |

### 样式变量
以下为组件使用的 css 变量，可以使用 [StyleProvider 组件](#/zh-CN/style-provider) 进行样式定制。

| 变量名                         | 默认值                           |
| ------------------------------ | -------------------------------- |
| `--collapse-background`        | `var(--color-fill-3)`                           |
| `--collapse-text-color`        | `#232222`                        |
| `--collapse-header-font-size`  | `var(--font-size-lg)`            |
| `--collapse-header-padding`    | `10px 12px`                      |
| `--collapse-content-font-size` | `var(--font-size-md)`            |
| `--collapse-content-padding`   | `0 12px 10px`                    |
| `--collapse-item-margin-top`   | `16px`                           |
| `--collapse-disable-color`     | `#bdbdbd`                        |
| `--collapse-border-top`        | `thin solid var(--color-border-2)` |
