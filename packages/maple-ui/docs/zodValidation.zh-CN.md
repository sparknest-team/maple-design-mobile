# Zod 验证

### 介绍

我们在 `3.5.0+` 支持了基于 [Zod](https://zod.dev/) 的表单验证方式，`Zod` 是一个非常强大的数据验证工具，并且对 `Typescript` 十分友好。

### 安装 Zod

为了控制组件库的尺寸，我们不内置 `Zod`，所以需要手动安装。

```shell
# npm
npm i zod -S   

# yarn
yarn add zod    

# pnpm
pnpm add zod
```

### 基本使用

`FormItem` 的 `rules` 属性支持传入一个或多个 `Zod Schema`。
组件将使用该 `Schema` 的规则进行验证，验证失败时将使用其定义的错误信息作为用户提示。

```html
<script setup>
import { reactive, ref } from 'vue'
import { z } from 'zod'

const form = ref(null)
const user = reactive({
  name: '',
  email: '',
  password: '',
  repeatPassword: ''
})

function handleSubmit(valid) {
  console.log(valid)
}
</script>

<template>
  <mp-form ref="form" :model="user" @submit="handleSubmit">
    <mp-space direction="column" size="lg">
      <mp-form-item field="name" :rules="z.string().min(1, '名称不能为空')">
        <mp-input placeholder="名称" v-model="user.name" />
      </mp-form-item>
      <mp-form-item field="email" :rules="z.string().email('邮箱格式有误')">
        <mp-input placeholder="邮箱" v-model="user.email" />
      </mp-form-item>
      <mp-form-item field="password" :rules="z.string().min(6, '密码最少6位')">
        <mp-input type="password" placeholder="密码" v-model="user.password" />
      </mp-form-item>
      <mp-form-item
        field="repeatPassword"
        :rules="[z.string().min(6, '密码最少6位'), (v) => v === user.password || '与密码不一致']"
      >
        <mp-input type="password" placeholder="确认密码" v-model="user.repeatPassword" />
      </mp-form-item>
      <mp-button status="primary" native-type="submit">提交</mp-button>
    </mp-space>
  </mp-form>
</template>
```
