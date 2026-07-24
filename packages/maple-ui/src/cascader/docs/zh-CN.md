# 级联选择器

### 介绍

通过下拉菜单或底部弹窗的形式进行级联选择。

### 基本使用

```html
<script setup>
import { ref } from 'vue'

const value = ref([])
const value2 = ref('')
const value3 = ref([])
const value4 = ref()
const value5 = ref([])

const options = ref([
  {
    label: '浙江省',
    value: 'zhejiang',
    children: [
      {
        label: '杭州市',
        value: 'hangzhou',
        children: [
          { label: '西湖区', value: 'xihu' },
          { label: '拱墅区', value: 'gongshu' },
        ],
      },
      {
        label: '宁波市',
        value: 'ningbo',
      },
    ],
  },
  {
    label: '江苏省',
    value: 'jiangsu',
    children: [
      { label: '南京市', value: 'nanjing' },
      { label: '苏州市', value: 'suzhou' },
    ],
  },
])
</script>

<template>
  <mp-space direction="column" size="large">
    <mp-cascader placeholder="请选择地区" v-model="value" :options="options" />
    <mp-cascader placeholder="非路径模式" v-model="value2" :options="options" :path-mode="false" />
    <mp-cascader placeholder="严格选择模式" v-model="value3" :options="options" check-strictly />
    <mp-cascader placeholder="级联多选" v-model="value5" :options="options" multiple tag />
    <mp-cascader placeholder="Picker 模式" presentation="picker" v-model="value4" :options="options" />
  </mp-space>
</template>
```

### 级联多选

开启 `multiple` 后可选择多个路径，配合 `tag` 以标签形式展示。

```html
<script setup>
import { ref } from 'vue'

const value = ref([])

const options = ref([
  {
    label: '浙江省',
    value: 'zhejiang',
    children: [
      {
        label: '杭州市',
        value: 'hangzhou',
        children: [
          { label: '西湖区', value: 'xihu' },
          { label: '拱墅区', value: 'gongshu' },
        ],
      },
      { label: '宁波市', value: 'ningbo' },
    ],
  },
  {
    label: '江苏省',
    value: 'jiangsu',
    children: [
      { label: '南京市', value: 'nanjing' },
      { label: '苏州市', value: 'suzhou' },
    ],
  },
])
</script>

<template>
  <mp-cascader
    placeholder="请选择地区"
    v-model="value"
    :options="options"
    multiple
    tag
  />
</template>
```

### Picker 模式

单选时与 `mp-picker` 一致：取消 / 确认，确认即写入并关闭。

多选时采用「临时购物车」交互：**取消** 丢弃本次编辑，**添加** 将当前滚轮路径加入已选列表（不关闭），**完成** 才提交并关闭。

```html
<script setup>
import { ref } from 'vue'

const value = ref([])
const multipleValue = ref([])

const options = ref([
  {
    label: '浙江省',
    value: 'zhejiang',
    children: [
      {
        label: '杭州市',
        value: 'hangzhou',
        children: [
          { label: '西湖区', value: 'xihu' },
          { label: '拱墅区', value: 'gongshu' },
        ],
      },
      { label: '宁波市', value: 'ningbo' },
    ],
  },
  {
    label: '江苏省',
    value: 'jiangsu',
    children: [
      { label: '南京市', value: 'nanjing' },
      { label: '苏州市', value: 'suzhou' },
    ],
  },
])
</script>

<template>
  <mp-space direction="column" size="large">
    <mp-cascader
      presentation="picker"
      placeholder="请选择地区"
      v-model="value"
      :options="options"
    />
    <mp-cascader
      presentation="picker"
      placeholder="Picker 多选"
      v-model="multipleValue"
      :options="options"
      multiple
      tag
    />
  </mp-space>
</template>
```

### List 模式

将 `presentation` 设置为 `list`，弹窗内以导航面包屑 + 列表选择。当前级有下划线标识，选中项右侧显示对号。

单选：选到可确认节点后立即提交并关闭。多选：点击可确认节点即可勾选 / 取消勾选（草稿），「完成」提交，「取消」丢弃。

```html
<script setup>
import { ref } from 'vue'

const value = ref([])
const multipleValue = ref([])

const options = ref([
  {
    label: '浙江省',
    value: 'zhejiang',
    children: [
      {
        label: '杭州市',
        value: 'hangzhou',
        children: [
          { label: '西湖区', value: 'xihu' },
          { label: '拱墅区', value: 'gongshu' },
        ],
      },
      { label: '宁波市', value: 'ningbo' },
    ],
  },
  {
    label: '江苏省',
    value: 'jiangsu',
    children: [
      { label: '南京市', value: 'nanjing' },
      { label: '苏州市', value: 'suzhou' },
    ],
  },
])
</script>

<template>
  <mp-space direction="column" size="large">
    <mp-cascader
      presentation="list"
      placeholder="请选择地区"
      v-model="value"
      :options="options"
    />
    <mp-cascader
      presentation="list"
      placeholder="List 多选"
      v-model="multipleValue"
      :options="options"
      multiple
      tag
    />
  </mp-space>
</template>
```

## API

### 属性

#### Cascader Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `v-model` | 绑定的值 | _any \| any[]_ | `-` |
| `options` | 级联选项数据 | _CascaderOption[]_ | `[]` |
| `presentation` | 展示风格，可选值 `menu` `picker` `list` | _string_ | `menu` |
| `show` | 显隐受控 | _boolean_ | `undefined` |
| `label-key` | 作为 label 唯一标识的键名 | _string_ | `label` |
| `value-key` | 作为 value 唯一标识的键名 | _string_ | `value` |
| `children-key` | 作为 children 唯一标识的键名 | _string_ | `children` |
| `field-names` | 自定义字段映射，优先级高于 `labelKey`/`valueKey`/`childrenKey` | _FieldNames_ | `-` |
| `multiple` | 是否开启多选（menu 为面板勾选；picker 为临时购物车：添加 / 完成 / 取消；list 为点击勾选 / 取消 + 完成 / 取消） | _boolean_ | `false` |
| `check-strictly` | 是否允许选中非叶子节点 | _boolean_ | `false` |
| `path-mode` | 返回值为路径数组还是叶子值 | _boolean_ | `true` |
| `filterable` | 是否可搜索 | _boolean_ | `false` |
| `clearable` | 是否可清除 | _boolean_ | `false` |
| `placeholder` | 占位符 | _string_ | `-` |
| `disabled` | 是否禁用 | _boolean_ | `false` |
| `readonly` | 是否只读 | _boolean_ | `false` |
| `loading` | 是否加载中 | _boolean_ | `false` |
| `size` | 选择框尺寸，可选值 `normal` `small` | _string_ | `normal` |
| `variant` | 选择框风格，可选值 `standard` `outlined` | _string_ | `standard` |
| `tag` | 是否使用标签风格（仅多选） | _boolean_ | `false` |
| `separator` | 多选展示分隔符 | _string_ | `,` |
| `close-on-select` | 选中后是否自动关闭（仅 menu 单选模式，多选不会自动关闭） | _boolean_ | `true` |
| `picker-props` | picker 模式透传给 `mp-picker` 的属性 | _Partial\<PickerProps\>_ | `{}` |
| `popup-props` | 透传给弹窗的属性 | _Partial\<PopupProps\>_ | `{}` |

#### CascaderOption

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `label` | 选项的标签 | _string_ | `-` |
| `value` | 选项的值 | _any_ | `-` |
| `disabled` | 是否禁用 | _boolean_ | `-` |
| `children` | 子选项 | _CascaderOption[]_ | `-` |

### 事件

#### Cascader Events

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| `focus` | 聚焦时触发 | `-` |
| `blur` | 失焦时触发 | `-` |
| `click` | 点击时触发 | `event: Event` |
| `clear` | 清除时触发 | `value: any \| any[]` |
| `close` | 关闭时触发 | `value: any \| any[]` |
| `change` | 更新时触发 | `value: any \| any[]` |

### 方法

#### Cascader Methods

| 方法名 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| `focus` | 聚焦 | `-` | `-` |
| `blur` | 失焦 | `-` | `-` |

### 插槽

#### Cascader Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| `selected` | 选择区域的内容 | `-` |
| `option` | 自定义选项内容 | `option: CascaderOption, active: boolean` |
| `prepend-icon` | 前置图标 | `-` |
| `clear-icon` | 清除图标 | `clear: (e: Event) => void` |
| `append-icon` | 后置图标 | `-` |
| `arrow-icon` | 箭头图标 | `focus: boolean, menu-open: boolean` |

### 样式变量

以下为组件使用的 CSS 变量，可以使用 [StyleProvider 组件](#/zh-CN/style-provider) 进行样式定制。

| 变量名 | 默认值 |
| --- | --- |
| `--mp-cascader-panel-background` | `var(--color-surface-container-high)` |
| `--mp-cascader-panel-padding` | `6px 0` |
| `--mp-cascader-panel-max-height` | `278px` |
| `--mp-cascader-panel-border-radius` | `2px` |
| `--mp-cascader-column-width` | `140px` |
| `--mp-cascader-option-height` | `38px` |
| `--mp-cascader-option-padding` | `0 12px` |
| `--mp-cascader-option-font-size` | `16px` |
| `--mp-cascader-option-selected-color` | `var(--mp-color-primary)` |
| `--mp-cascader-option-selected-background` | `var(--mp-color-primary)` |
| `--mp-cascader-option-text-color` | `#555` |
| `--mp-cascader-option-disabled-color` | `var(--mp-color-text-disabled)` |
| `--mp-cascader-option-arrow-size` | `18px` |
| `--mp-cascader-label-font-size` | `16px` |
| `--mp-cascader-arrow-size` | `20px` |
