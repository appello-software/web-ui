import { exec } from 'child_process';
import { babel } from '@rollup/plugin-babel';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import json from '@rollup/plugin-json';
import postcss from 'rollup-plugin-postcss';

import pkg from './package.json' assert { type: 'json' };

function tscAliasPlugin() {
  return {
    name: 'tsc-alias',
    writeBundle: () => {
      return new Promise((resolve, reject) => {
        exec('tsc-alias', function callback(error, stdout, stderr) {
          if (stderr || error) {
            reject(stderr || error);
          } else {
            resolve(stdout);
          }
        });
      });
    },
  };
}


/** @type {import('rollup').RollupOptions} */
const buildConfig = {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.module,
      format: 'esm',
      sourcemap: true,
    },
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
    },
  ],
  plugins: [
    peerDepsExternal(),
    nodeResolve(),
    commonjs(),
    tscAliasPlugin(),
    json(),
    babel({
      exclude: 'node_modules/**',
      presets: ['@babel/preset-env'],
    }),
    typescript({ sourceMap: true }),
    postcss({
      extract: true,
      modules: {
        exportGlobals: true,
        generateScopedName: '[local]_[hash:base64:5]',
      },
      use: ['sass'],
    }),
  ],
};

/** @type {import('rollup').RollupOptions} */
const browserConfig = {
  input: 'dist/index.js',
  output: [
    {
      file: pkg.unpkg,
      format: 'umd',
      name: '@appello/web-ui',
    },
  ],
  plugins: [terser()],
};

export default [buildConfig, browserConfig];
