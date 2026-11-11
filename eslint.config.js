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
      files: ['scripts/quality/*.test.mjs', 'scripts/browser/*.test.mjs', 'packages/resolver/test/*.test.mjs'],
      rules: {
        'vitest/no-import-node-test': 'off',
      },
    },
    {
      files: ['packages/ui/src/*/example/**/*.vue'],
      rules: {
        'no-undef': 'error',
      },
    },
  ],
  ignores: [
    // Root-level CLI preview output, like packages/ui/.maple below.
    '.maple/**',
    // Rewritten by generateLibraryEntry; checked by typecheck and API export audit.
    'packages/ui/src/index.ts',
    'packages/ui/src/maple-vue.ts',
    // Generated icons are validated by generate:check and their own typecheck.
    'packages/icons/src/**',
    'packages/icons/es/**',
    'packages/icons/lib/**',
    'packages/icons/types/**',
    'packages/ui/types-generated/**',
    'packages/cli/lib/**',
    'packages/cli/site/**',
    'packages/cli/template/**',
    'packages/cli/client.js',
    'packages/cli/client.d.ts',
    'packages/vite-plugins/lib/**',
    'packages/vscode-extension/dist/**',
    'packages/ui/lib/**',
    'packages/ui/es/**',
    'packages/ui/umd/**',
    'packages/ui/site/**',
    'packages/ui/public/**',
    'packages/ui/coverage/**',
    'packages/ui/highlight/**',
    'packages/ui/types/index.d.ts',
    'packages/ui/types/styleVars.d.ts',
    'packages/ui/src/*/__tests__/__snapshots__/*',
    'packages/ui/.maple/**',
    'packages/ui-playground/public/**',
    'packages/ui-playground/site/**',
    'packages/shared/lib/**',
    'packages/use/lib/**',
    'packages/preset-tailwindcss/lib/**',
    'packages/preset-unocss/lib/**',
    'packages/resolver/lib/**',
    'packages/touch-emulator/iife.js',
  ],
})
