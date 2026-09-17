# 列表 List

纯展示型列表。分页加载请组合使用 `InfiniteScroll`。



### basic usage

```demo
../example/demos/basic-usage.vue
```

### manual usage

```demo
../example/demos/manual-usage.vue
```

### states

```demo
../example/demos/states.vue
```
## 基础用法

```html
<mp-list :data="items" size="md" bordered>
  <template #header>联系人</template>
  <template #item="{ item, index }">
    <mp-list-item>
      <template #prefix>{{ index + 1 }}</template>
      {{ item.name }}
      <template #suffix>{{ item.phone }}</template>
    </mp-list-item>
  </template>
  <template #empty>暂无联系人</template>
  <template #footer>共 {{ items.length }} 项</template>
</mp-list>
```

也可以直接传入默认插槽。默认插槽与 `data` 同时存在时，默认插槽优先，`item` 不会被调用。

```html
<mp-list :data="items">
  <mp-list-item>默认插槽内容</mp-list-item>
  <template #item="{ item }">{{ item }}</template>
</mp-list>
```

`loading` 表示整张列表首次加载或刷新，不表示下一页正在加载。空列表加载时不会同时显示空态。

## API

### 属性

| 参数       | 说明                       | 类型                   | 默认值  |
| ---------- | -------------------------- | ---------------------- | ------- |
| `data`     | 用于 `item` 插槽的数据     | `unknown[]`            | `-`     |
| `size`     | 列表项尺寸                 | `'sm' \| 'md' \| 'lg'` | `'md'`  |
| `bordered` | 是否显示外边框             | `boolean`              | `true`  |
| `split`    | 是否显示列表项分割线       | `boolean`              | `true`  |
| `loading`  | 是否处于整表首次加载或刷新 | `boolean`              | `false` |

### 插槽

| 名称      | 说明                        | 参数              |
| --------- | --------------------------- | ----------------- |
| `default` | 手动列表内容，优先于 `data` | `-`               |
| `item`    | 数据项内容                  | `{ item, index }` |
| `header`  | 列表头部                    | `-`               |
| `footer`  | 列表底部                    | `-`               |
| `empty`   | 非加载状态下的空内容        | `-`               |

### ListItem

| 名称      | 说明     |
| --------- | -------- |
| `prefix`  | 前缀内容 |
| `default` | 主内容   |
| `suffix`  | 后缀内容 |

## 样式变量

| 变量名                      | 默认值                     |
| --------------------------- | -------------------------- |
| `--mp-list-background`      | `var(--mp-color-bg-1)`     |
| `--mp-list-border-color`    | `var(--mp-color-border-2)` |
| `--mp-list-border-radius`   | `4px`                      |
| `--mp-list-header-padding`  | `12px 16px`                |
| `--mp-list-footer-padding`  | `12px 16px`                |
| `--mp-list-empty-padding`   | `24px 16px`                |
| `--mp-list-empty-color`     | `var(--mp-color-text-3)`   |
| `--mp-list-loading-padding` | `16px`                     |
| `--mp-list-item-padding-sm` | `8px 12px`                 |
| `--mp-list-item-padding-md` | `12px 16px`                |
| `--mp-list-item-padding-lg` | `16px 20px`                |
| `--mp-list-item-gap`        | `12px`                     |

## 列表项 ListItem

`List` 的展示型列表项，也可单独使用。

### API

### 插槽

| 名称      | 说明     |
| --------- | -------- |
| `prefix`  | 前缀内容 |
| `default` | 主内容   |
| `suffix`  | 后缀内容 |

