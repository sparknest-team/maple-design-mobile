import js from '@eslint/js'
import tsParser from '@typescript-eslint/parser'
import vue from 'eslint-plugin-vue'
import globals from 'globals'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['lib/**', 'es/**', 'umd/**', 'site/**', 'highlight/**', 'types/**', 'types-generated/**', '.maple/**', 'docs/.vuepress/.*/**']),
  js.configs.recommended,
  ...vue.configs['flat/essential'],
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  { files: ['**/*.{ts,tsx,vue}'], rules: { 'no-unused-vars': 'off', 'no-redeclare': 'off' } },
  { files: ['**/example/index.vue'], rules: { 'vue/multi-word-component-names': 'off' } },
  { files: ['**/*.{ts,tsx}'], languageOptions: { parser: tsParser } },
  { files: ['**/*.vue'], languageOptions: { parserOptions: { parser: tsParser } } },
])
