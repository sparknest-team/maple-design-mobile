# 常用写法

日常类名速查。接入 Uno / Tailwind、主题 token 怎么挂，见 [原子化 CSS](#/zh-CN/atomic-css)。

- 类名一律带 `mp-`，不提供无前缀别名
- 数值间距 / 宽高：`1 = 1px`，如 `mp-p-8` 为 8px、`mp-h-40` 为 40px
- 状态写在前面：`hover:mp-opacity-80` `focus:mp-border-primary`
- 断点本身不加 `mp-`：`sm:mp-flex` `md:mp-p-24`

UnoCSS 与 Tailwind **类名相同**，项目里二选一配置即可。

### 布局 Layout

| 类型 | 常用类 |
| --- | --- |
| 显示 | `mp-block` `mp-inline-block` `mp-inline-flex` `mp-flex` `mp-grid` `mp-hidden` |
| Flex 方向 | `mp-flex-row` `mp-flex-col` `mp-flex-wrap` |
| 主轴 | `mp-justify-start` `mp-justify-center` `mp-justify-between` `mp-justify-end` |
| 交叉轴 | `mp-items-start` `mp-items-center` `mp-items-stretch` `mp-items-end` |
| 伸缩 | `mp-flex-1` `mp-flex-none` `mp-shrink-0` `mp-grow` |
| Grid | `mp-grid-cols-2` `mp-grid-cols-3` `mp-col-span-2` |

```html
<!-- playground-ignore -->
<div class="mp-flex mp-items-center mp-justify-between mp-gap-8">
  <span>左</span>
  <span>右</span>
</div>
```

### 定位 Position

| 类型 | 常用类 |
| --- | --- |
| 方式 | `mp-relative` `mp-absolute` `mp-fixed` `mp-sticky` `mp-static` |
| 边距 | `mp-inset-0` `mp-top-0` `mp-right-0` `mp-bottom-0` `mp-left-0` |
| 层级 | `mp-z-0` `mp-z-10` `mp-z-20` `mp-z-50` |

`inset` / `top` 等数值同样走间距表：`mp-top-8` 为 `8px`。

### 间距 Spacing

| 类型 | 常用类 |
| --- | --- |
| margin | `mp-m-16` `mp-mt-8` `mp-mx-16` `mp-my-8` `mp-m-auto` `mp-ml-auto` |
| padding | `mp-p-16` `mp-px-12` `mp-py-8` `mp-pt-24` |
| gap | `mp-gap-8` `mp-gap-x-16` `mp-gap-y-12` |

方向：`t` 上 / `r` 右 / `b` 下 / `l` 左 / `x` 左右 / `y` 上下。

### 尺寸 Size

| 类型 | 常用类 |
| --- | --- |
| 宽高 | `mp-w-40` `mp-h-40` `mp-w-full` `mp-h-full` `mp-w-auto` `mp-h-auto` |
| 百分比 | `mp-w-1/2` `mp-w-1/3` `mp-h-1/2` |
| 视口 | `mp-w-screen` `mp-h-screen` `mp-min-h-screen` |
| 约束 | `mp-min-w-0` `mp-max-w-md` `mp-min-h-0` `mp-max-h-full` |

`mp-h-10` 是 **10px**，不是 10%。百分药用 `mp-h-full` 或 `mp-h-1/2`。

### 溢出 Overflow

| 类型 | 常用类 |
| --- | --- |
| overflow | `mp-overflow-hidden` `mp-overflow-auto` `mp-overflow-scroll` `mp-overflow-visible` |
| 轴向 | `mp-overflow-x-auto` `mp-overflow-y-auto` `mp-overflow-x-hidden` |
| 单行省略 | `mp-truncate` |
| 多行省略 | `mp-line-clamp-1` `mp-line-clamp-2` `mp-line-clamp-3` |

### 排版 Typography

| 类型 | 常用类 |
| --- | --- |
| 对齐 | `mp-text-left` `mp-text-center` `mp-text-right` |
| 字号（主题） | `mp-text-xs` `mp-text-sm` `mp-text-md` `mp-text-lg` |
| 字重 | `mp-font-normal` `mp-font-medium` `mp-font-semibold` `mp-font-bold` |
| 行高 | `mp-leading-none` `mp-leading-tight` `mp-leading-normal` |
| 空白 | `mp-whitespace-nowrap` `mp-whitespace-pre-wrap` |
| 换行 | `mp-break-words` `mp-break-all` |

不要和固定工具类的语义文字色 `mp-text-1` … `mp-text-4` 混淆。

### 颜色 Color

主题色只改对应属性，边框需要和宽度类一起用。

| 用途 | 常用类 |
| --- | --- |
| 背景 | `mp-bg-body` `mp-bg-primary` `mp-bg-success` `mp-bg-warning` `mp-bg-danger` `mp-bg-info` `mp-bg-disabled` |
| 文字 | `mp-text-primary` `mp-text-success` `mp-text-white` |
| 边框色 | `mp-border-primary` `mp-border-danger` |

语义层级色（`mp-text-1`、`mp-fill-2`、`mp-color-border-2`、`mp-bg-1`）见 [颜色 Color](#/zh-CN/color)，不走原子化生成。色阶变量见 [色板 Palette](#/zh-CN/palette)。

```html
<!-- playground-ignore -->
<div class="mp-border mp-border-primary">primary border</div>
<button class="mp-bg-primary mp-text-white hover:mp-opacity-80">保存</button>
```

### 边框 Border

| 类型 | 常用类 |
| --- | --- |
| 宽度 | `mp-border` `mp-border-0` `mp-border-2` `mp-border-t` `mp-border-b` |
| 样式 | `mp-border-solid` `mp-border-dashed` `mp-border-none` |

### 圆角 Rounded

| 常用类 | 说明 |
| --- | --- |
| `mp-rounded-none` `mp-rounded-sm` `mp-rounded-md` `mp-rounded-lg` `mp-rounded-xl` `mp-rounded-full` | Uno / TW 标准档 |
| `mp-rounded-t-md` `mp-rounded-l-lg` | 单边圆角 |

### 状态与断点 Variants

| 类型 | 写法 |
| --- | --- |
| 交互 | `hover:mp-opacity-80` `focus:mp-border-primary` `active:mp-opacity-70` `disabled:mp-opacity-40` |
| 断点 | `sm:mp-flex` `md:mp-p-24` `lg:mp-grid-cols-3` `xl:mp-max-w-screen` |

断点宽度：`sm` 768 / `md` 992 / `lg` 1200 / `xl` 1920。

不要写 `mp-bg-${status}` 这种拼接；Uno / TW 只扫描源码里完整出现的类名。

### 不收录

| 能力 | 去哪 |
| --- | --- |
| 海拔阴影 | [海拔 Elevation](#/zh-CN/styles)，preset 已屏蔽 `mp-shadow-*` |
| 语义色层级 | [颜色 Color](#/zh-CN/color) |
| 色阶 | [色板 Palette](#/zh-CN/palette) |
| 安装配置 | [原子化 CSS](#/zh-CN/atomic-css) |
