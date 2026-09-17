# Hover

### Intro

Style binding is performed when the pointer hovers the binding element, and the current hovering state can also be obtained through a function, which supports selective enablement on desktop or mobile.

### Style Binding

The style binding is performed when the pointer hovers over the bound element, and the style binding is canceled when the pointer leaves the element.

```demo
../example/demos/style-binding.vue
```

### Function Binding

The function is triggered when the pointer hovers and leaves, and carries the current hover state.

```demo
../example/demos/function-binding.vue
```

### Selectively Enable For Different Devices

Considering the differences in `hover` effects on different platforms, the hover command can only be enabled on specific platforms.

#### Only Enabled On Desktop

```html
// playground-ignore
<mp-paper v-hover:desktop="{ color: '#fff' }"">HOVER</mp-paper>
```

#### Only Enabled On Mobile

```html
// playground-ignore
<mp-paper v-hover:mobile="{ color: '#fff' }"">HOVER</mp-paper>
```