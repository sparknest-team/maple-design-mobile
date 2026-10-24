import { defineConfig } from '@configurajs/eslint'

export default defineConfig({
  rules: {
    'no-unused-vars': 'off',
    'require-await': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/unified-signatures': 'off',
  },
  overrides: [
    {
      // Utility and resolver package scripts run these tests with node --test.
      files: ['scripts/quality/*.test.mjs', 'scripts/browser/*.test.mjs', 'packages/maple-resolver/test/*.test.mjs'],
      rules: {
        'vitest/no-import-node-test': 'off',
      },
    },
    {
      files: ['packages/maple-ui/src/*/example/**/*.vue'],
      rules: {
        'no-undef': 'error',
      },
    },
  ],
  ignores: [
    // Root-level CLI preview output, like packages/maple-ui/.maple below.
    '.maple/**',
    // Rewritten by generateLibraryEntry; checked by typecheck and API export audit.
    'packages/maple-ui/src/index.ts',
    'packages/maple-ui/src/maple-vue.ts',
    // Generated icons are validated by generate:check and their own typecheck.
    'packages/maple-icons-vue/src/**',
    'packages/maple-icons-vue/es/**',
    'packages/maple-icons-vue/lib/**',
    'packages/maple-icons-vue/types/**',
    'packages/maple-ui/types-generated/**',
    'packages/maple-cli/lib/**',
    'packages/maple-cli/site/**',
    'packages/maple-cli/template/**',
    'packages/maple-cli/client.js',
    'packages/maple-cli/client.d.ts',
    'packages/maple-vite-plugins/lib/**',
    'packages/maple-vscode-extension/dist/**',
    'packages/maple-ui/lib/**',
    'packages/maple-ui/es/**',
    'packages/maple-ui/umd/**',
    'packages/maple-ui/site/**',
    'packages/maple-ui/public/**',
    'packages/maple-ui/coverage/**',
    'packages/maple-ui/highlight/**',
    'packages/maple-ui/types/index.d.ts',
    'packages/maple-ui/types/styleVars.d.ts',
    'packages/maple-ui/src/*/__tests__/__snapshots__/*',
    'packages/maple-ui/.maple/**',
    'packages/maple-ui-playground/public/**',
    'packages/maple-ui-playground/site/**',
    'packages/maple-shared/lib/**',
    'packages/maple-use/lib/**',
    'packages/maple-preset-tailwindcss/lib/**',
    'packages/maple-preset-unocss/lib/**',
    'packages/maple-resolver/lib/**',
    'packages/maple-touch-emulator/iife.js',
  ],
})
