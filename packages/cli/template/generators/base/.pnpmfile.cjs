// These packages import the JavaScript compiler API. Their TypeScript peer
// otherwise resolves to the application's native tsc, which cannot supply it.
const compilerApiConsumers = new Set([
  '@typescript-eslint/eslint-plugin',
  '@typescript-eslint/parser',
  '@typescript-eslint/typescript-estree',
  '@typescript-eslint/project-service',
  '@typescript-eslint/tsconfig-utils',
  '@typescript-eslint/utils',
  '@typescript-eslint/type-utils',
  'ts-api-utils',
  'vuepress-plugin-md-enhance',
])

exports.hooks = {
  readPackage(pkg) {
    if (compilerApiConsumers.has(pkg.name) && pkg.peerDependencies?.typescript) {
      delete pkg.peerDependencies.typescript
      pkg.dependencies = { ...pkg.dependencies, typescript: '6.0.3' }
    }
    return pkg
  },
}
