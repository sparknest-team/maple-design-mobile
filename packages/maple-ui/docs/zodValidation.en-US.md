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

The `rules` property of each form component supports passing in one or more `Zod Schema`.
The component will use the rules of the `Schema` for validation, 
and when validation fails, the error message defined in it will be used as a user prompt.

```html
<script setup>
import { ref } from 'vue'
import { z } from 'zod'

const user = ref({
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
  <mp-form @submit="handleSubmit">
    <mp-space direction="column" size="large">
      <mp-input 
        placeholder="Name" 
        :rules="z.string().min(1, 'Name required')" 
        v-model="user.name"
       />
      <mp-input 
        placeholder="Email" 
        :rules="z.string().email('Email format error')" 
        v-model="user.email" 
      />
      <mp-input 
        type="password"
        placeholder="Password" 
        :rules="z.string().min(6, 'Password must be at least 6 characters')"
        v-model="user.password" 
      />
      <mp-input 
        type="password" 
        placeholder="Confirmation Password"
        :rules="[z.string().min(6, 'Confirmation password must be at least 6 characters'), v => v === user.password || 'Does not match password']" 
        v-model="user.repeatPassword" 
      />
      <mp-button type="primary" native-type="submit">Submit</mp-button>
    </mp-space>
  </mp-form>
</template>
```

### Use With Typescript

If you use `Typescript`, define a `Zod Schema` to get both Typescript types and form rules.

```html
<script setup lang="ts">
import { ref } from 'vue'
import { z } from 'zod'

const UserSchema = z.object({
  name: z.string().min(1, 'Name required'),
  email: z.string().email('Email format error'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  repeatPassword: z.string().min(6, 'Confirmation password must be at least 6 characters'),
})

const user = ref<z.infer<typeof UserSchema>>({
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
  <mp-form @submit="handleSubmit">
    <mp-space direction="column" size="large">
      <mp-input 
        placeholder="Name" 
        :rules="UserSchema.shape.name" 
        v-model="user.name"
       />
      <mp-input 
        placeholder="Email" 
        :rules="UserSchema.shape.email" 
        v-model="user.email" 
      />
      <mp-input 
        type="password"
        placeholder="Password" 
        :rules="UserSchema.shape.password"
        v-model="user.password" 
      />
      <mp-input 
        type="password" 
        placeholder="Confirmation Password"
        :rules="[UserSchema.shape.repeatPassword, v => v === user.password || 'Does not match password']" 
        v-model="user.repeatPassword" 
      />
      <mp-button type="primary" native-type="submit">Submit</mp-button>
    </mp-space>
  </mp-form>
</template>
```