# 水波指令

### 介绍

元素点击时生成一个水波扩散的效果。

## 基础示例

### 基本使用

支持触摸、鼠标主键和宿主 Enter / Space。鼠标水波从按下位置扩散，松开或窗口失焦时结束；忽略非主键及触摸产生的兼容鼠标事件。键盘水波从中心扩散，建议使用原生按钮承载交互。

```demo
../example/demos/basic-usage.vue
```

## 外观与状态

### 自定义颜色

```demo
../example/demos/custom-color.vue
```

### 禁用状态

```demo
../example/demos/disabled-status.vue
```

## 内容与展示

### 长时长动效 Token

```demo
../example/demos/motion-token.vue
```

### 样式引入

配置 MapleResolver 的指令解析时会自动引入 `@maple-design/ui/ripple/style`。未使用 resolver、直接注册 Ripple 时，请在应用入口显式引入该样式。指令运行时代码不导入 CSS，以支持服务端包导入。卸载和禁用会取消待执行动画；每个实例独立维护键盘状态。

## 使用说明

### 动效

重复释放不重复排队；禁用／卸载清理所属定时器与直接子波纹，不误删嵌套实例。文档监听绑定挂载时 ownerDocument，跨文档搬迁后重绑不在范围内。Enter／Space 在本宿主触发，仅对应 keyup 或 blur 结束；普通 div 必须自行提供交互语义、键盘能力和可访问名称，v-ripple 本身不提供这些。

## API

### Ripple Options

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `color` | `currentColor` | _string_ | `currentColor` |
| `disabled` | 是否禁用波纹装饰 | _boolean_ | `false` |

## CSS Variables

以下为组件使用的 css 变量，可以使用 [ThemeProvider 组件](#/zh-CN/theme-provider) 进行样式定制。

<!-- component-css-variables:start -->

通过以下变量定制组件外观。默认值随表中注明的主题或选择器条件变化；变量仅在对应的尺寸、变体和交互状态下生效。

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 默认值／条件 | 影响的样式 |
| --- | --- | --- |
| `--mp-ripple-color` | `currentColor` | `background-color` |
| `--mp-ripple-cubic-bezier` | `cubic-bezier(0.68, 0.01, 0.62, 0.6)` | `transition` |
| `--mp-ripple-expand-duration` | `200ms` | `transition` |
| `--mp-ripple-fade-duration` | `140ms` | `transition` |

</div>

将覆盖设置在组件实际根节点或弹层真实挂载祖先上。例如给该元素添加下列 class，再按需替换变量值：

```css
.component-theme {
  --mp-ripple-color: currentColor;
}
```

显式行内样式及直接写入同一 CSS 属性的 Props 优先于样式表默认值。Teleport 后，普通 CSS 变量按实际挂载位置继承；使用 ThemeProvider 时，请遵循其局部主题与弹层配置规则。局部定制请直接覆盖组件变量；仅修改后代的 system 变量不会重新计算从根继承的组件别名。内部变量不属于公共 API。

<!-- component-css-variables:end -->

### 动效

expand-duration 控制 transform 扩散，cubic-bezier 是扩散曲线；fade-duration 控制 opacity 显现／消退（线性）。变量放在指令实际宿主上，由生成的波纹继承；color 选项优先于 ripple-color。两端默认值同为 200ms／140ms。

250ms 是最小展示与淡出后移除等待，不是视觉时长或整个生命周期。运行时读取实际波纹计算后的 duration/delay：淡出不早于创建+250ms 或激活+扩散时长的较晚者；删除等待 max(250ms, 消退时长)。600ms／800ms 覆写不再被截断。0ms／无样式仍保留清理下限，prefers-reduced-motion: reduce 隐藏装饰波纹而不改变宿主业务事件。扩散在创建／激活、消退在淡出开始时采样，不保证任意中途 CSS 改动或自定义 animation。

绑定值类型 `RippleDirectiveValue` 可从组件库根入口或 Ripple 入口导入，包含可选 `color` 和 `disabled`。颜色更新作用于之后创建的波纹；`disabled` 只关闭装饰，不禁用宿主交互。全局 `Context.enableRipple` 关闭时不创建新波纹，已有波纹按原生命周期结束。波纹显示期间会临时设置宿主裁切及必要的定位和层叠样式；最后一个波纹结束、禁用或卸载时恢复指令仍持有的样式，业务期间改写的值保留。坐标支持轴向缩放；旋转或倾斜变换不保证精确。
