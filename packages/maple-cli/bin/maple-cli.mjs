#!/usr/bin/env node

// This file must exist before the first workspace build so pnpm can link the
// command during a clean install. Compilation still belongs to build:lib.
await import('../lib/node/bin.js')
