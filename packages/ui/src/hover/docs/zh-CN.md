# 悬停指令

### 介绍

指针悬停在绑定元素上时进行样式绑定，也可以通过函数获得当前悬停的状态，支持在桌面端或移动端中选择性启用。

## 基础示例

### 样式绑定

指针悬停在绑定元素上时进行样式绑定, 离开元素时取消样式绑定。

```demo
../example/demos/style-binding.vue
```

## 交互与控制

### 函数绑定

指针悬停和离开时会触发函数，并携带当前的悬停状态。

```demo
../example/demos/function-binding.vue
```

### 针对不同设备选择性启用

考虑到在不同平台的 `hover` 效果的差异性，悬停指令可以只启用于特定的平台。

#### 只在桌面端启用

```html
// playground-ignore
<mp-paper v-hover:desktop="{ color: '#fff' }">HOVER</mp-paper>
```

#### 只在移动端启用

```html
// playground-ignore
<mp-paper v-hover:mobile="{ color: '#fff' }">HOVER</mp-paper>
```

## HoverOverlay 与辅助函数

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `hovering` | boolean | false | 悬停装饰状态 |
| `focusing` | boolean | false | 焦点装饰状态 |

`useHoverOverlay()` 返回 `hovering` 和 `handleHovering(boolean)`；它可配合指令回调使用。遮层不提供声明事件、插槽或业务实例方法，不接管交互；宿主需建立定位上下文。

## 使用说明

### 动效

对象样式只覆盖传入的属性，离开或停用时恢复这些属性原有的内联值和 `!important` 优先级；动态切换 desktop/mobile 参数会清理旧监听。

## CSS Variables

<!-- component-css-variables:start -->

通过以下变量定制组件外观。默认值随表中注明的主题或选择器条件变化；变量仅在对应的尺寸、变体和交互状态下生效。

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 默认值／条件 | 影响的样式 |
| --- | --- | --- |
| `--mp-hover-overlay-focusing-opacity` | `0.12` | `opacity` |
| `--mp-hover-overlay-opacity` | `0.04` | `opacity` |
| `--mp-hover-transition-duration` | `var(--mp-sys-motion-duration-fast)` | `transition` |

</div>

将覆盖设置在组件实际根节点或弹层真实挂载祖先上。例如给该元素添加下列 class，再按需替换变量值：

```css
.component-theme {
  --mp-hover-overlay-focusing-opacity: 0.12;
}
```

显式行内样式及直接写入同一 CSS 属性的 Props 优先于样式表默认值。Teleport 后，普通 CSS 变量按实际挂载位置继承；使用 ThemeProvider 时，请遵循其局部主题与弹层配置规则。局部定制请直接覆盖组件变量；仅修改后代的 system 变量不会重新计算从根继承的组件别名。内部变量不属于公共 API。

<!-- component-css-variables:end -->

### 动效

HoverOverlay 的透明度过渡遵循 `prefers-reduced-motion: reduce`，减少动态效果时关闭过渡。
