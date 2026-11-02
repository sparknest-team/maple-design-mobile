<!-- Source: docs/zodValidation.en-US.md; locale: en-US; page: /en-US/zodValidation -->

# Zod Validation

### Intro

We support form validation based on [Zod](https://zod.dev/) in `3.5.0+`.
`Zod` is a very powerful data validation tool and is very friendly to `Typescript`.

### Install Zod

In order to control the size of the component library, we do not build-in `Zod`, so you need to install it manually.

```shell
# npm
npm i zod -S

# yarn
yarn add zod

# pnpm
pnpm add zod
```

### Basic Usage

The `rules` property of `FormItem` supports passing in one or more `Zod Schema`.
The component will use the rules of the `Schema` for validation,
and when validation fails, the error message defined in it will be used as a user prompt.

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
      <mp-form-item field="name" :rules="z.string().min(1, 'Name required')">
        <mp-input placeholder="Name" v-model="user.name" />
      </mp-form-item>
      <mp-form-item field="email" :rules="z.string().email('Email format error')">
        <mp-input placeholder="Email" v-model="user.email" />
      </mp-form-item>
      <mp-form-item field="password" :rules="z.string().min(6, 'Password must be at least 6 characters')">
        <mp-input type="password" placeholder="Password" v-model="user.password" />
      </mp-form-item>
      <mp-form-item
        field="repeatPassword"
        :rules="[
          z.string().min(6, 'Confirmation password must be at least 6 characters'),
          (v) => v === user.password || 'Does not match password',
        ]"
      >
        <mp-input type="password" placeholder="Confirmation Password" v-model="user.repeatPassword" />
      </mp-form-item>
      <mp-button status="primary" native-type="submit">Submit</mp-button>
    </mp-space>
  </mp-form>
</template>
```
