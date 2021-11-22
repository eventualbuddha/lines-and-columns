#!/usr/bin/env node

// @ts-check

import esbuild from 'esbuild';

const watch = (
  process.argv.includes('--watch') ||
  process.argv.includes('-w')
);

/**
 * @param {string} message
 * @returns {import('esbuild').WatchMode}
 */
function rebuildLogger(message) {
  return {
    onRebuild() {
      console.log(message)
    }
  }
}

/** @type {import('esbuild').BuildOptions[]} */
const CONFIGS = [
  {
    entryPoints: ['src/index.ts'],
    outfile: 'build/index.mjs',
    format: 'esm'
  },
  {
    entryPoints: ['src/index.ts'],
    outfile: 'build/index.cjs',
    format: 'cjs'
  },
];

for (const { entryPoints, outfile, format } of CONFIGS) {
  esbuild
    .build({
      entryPoints,
      outfile,
      bundle: true,
      tsconfig: 'tsconfig.build.json',
      format,
      target: ['esnext'],
      watch: watch && rebuildLogger(`📦 ${outfile}`),
    })
    .then(() => {
      console.log(`📦 ${outfile}`)
    })
    .catch((error) => {
      console.error(`❌ ${error}`)
      process.exit(1)
    })
}
