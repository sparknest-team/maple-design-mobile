// Package exports use .js and .d.ts for ESM and .cjs and .d.cts for CommonJS.
export default {
  cwd: process.cwd(),
  entry: ['src/index.ts'],
  outDir: 'lib',
  fixedExtension: false,
  target: 'node16',
  dts: { generator: 'tsgo' },
}
