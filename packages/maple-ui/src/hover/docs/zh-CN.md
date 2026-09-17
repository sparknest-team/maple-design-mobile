# 悬停指令

### 介绍

指针悬停在绑定元素上时进行样式绑定，也可以通过函数获得当前悬停的状态，支持在桌面端或移动端中选择性启用。

### 样式绑定

指针悬停在绑定元素上时进行样式绑定, 离开元素时取消样式绑定。

```demo
../example/demos/style-binding.vue
```

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
<mp-paper v-hover:desktop="{ color: '#fff' }"">HOVER</mp-paper>
```

#### 只在移动端启用

```html
// playground-ignore
<mp-paper v-hover:mobile="{ color: '#fff' }">HOVER</mp-paper>
```
